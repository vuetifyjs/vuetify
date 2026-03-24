# v0 Locale Integration Design

## Overview

Migrate Vuetify's locale and RTL system to use `@vuetify/v0` composables as the runtime baseline. Vuetify becomes a thin configuration layer providing language packs and per-locale RTL defaults, while v0 owns message resolution, RTL state, number formatting, decimal separators, and the adapter pattern.

## Architecture

### Layers

**v0 (runtime — source of truth):**

- `createLocale()` — message storage (tokens), locale selection (createSingle), translation (`t()`), number formatting (`n()`), decimal separator inference
- `createRtl()` — reactive boolean direction state, `dir` attribute management via adapter
- `createLocalePlugin()` / `createRtlPlugin()` — Vue plugin installation for DI context
- `LocaleAdapter` — adapter interface for i18n provider integration (including vue-i18n)
- `Locale` provider component — scoped locale + RTL context for subtrees

**Vuetify (configuration + thin wrapper):**

- 48 language packs registered as v0 token messages
- Per-locale RTL map (`ar: true`, `fa: true`, `he: true`, etc.)
- `$vuetify.` prefix stripping before delegating to v0's `t()`
- `rtlClasses` computed ref (`v-locale--is-rtl` / `v-locale--is-ltr`)
- Bridge: watches v0 locale selection, updates v0 RTL from per-locale map
- `LocaleSymbol` provide/inject for Vuetify component consumption
- `VLocaleProvider` wrapping v0's `Locale` component with Vuetify CSS classes

**RTL layering:** v0 manages the document-level `dir` attribute via `Vuetify0RtlAdapter`. Vuetify manages component-level CSS classes (`v-locale--is-rtl` / `v-locale--is-ltr`). These two layers are intentionally independent — a `VLocaleProvider` subtree can have a different direction class than the document `dir` attribute.

## Initialization

In `createVuetify()`:

1. Create v0 locale instance with Vuetify's message packs:
   ```ts
   const v0Locale = createLocale({
     default: options.locale ?? 'en',
     messages: { en, ...options.messages },
   })
   ```

   Vuetify stores the fallback locale separately (not part of v0's `LocaleOptions`):
   ```ts
   const fallbackLocale = shallowRef(options.fallback ?? 'en')
   ```

2. Create v0 RTL instance:
   ```ts
   const v0Rtl = createRtl({
     default: rtlMap[options.locale ?? 'en'] ?? false,
   })
   ```

3. Bridge locale → RTL with `immediate: true` to cover initial state:
   ```ts
   watch(v0Locale.selectedId, locale => {
     v0Rtl.isRtl.value = rtlMap[locale] ?? false
   }, { immediate: true })
   ```

4. Compute Vuetify CSS classes:
   ```ts
   const rtlClasses = toRef(() =>
     `v-locale--is-${v0Rtl.isRtl.value ? 'rtl' : 'ltr'}`
   )
   ```

5. Provide combined object via `LocaleSymbol`

6. Install v0 plugins (`createLocalePlugin`, `createRtlPlugin`) so v0's context is also available directly

## Translation Signature Bridging

### Problem

Vuetify's `t()` uses positional params: `t(key: string, ...params: unknown[])` with `{0}`, `{1}` placeholders.

v0's `t()` uses named params: `t(key: string, params?: Record<string, unknown>, fallback?: string)`.

Components call Vuetify's `t()` like:
```ts
t(props.pageText, startIndex + 1, stopIndex, itemsLength)
// where pageText = '$vuetify.dataFooter.pageText' → '{0}-{1} of {2}'
```

### Solution

Vuetify's wrapper `t()` strips the prefix and passes positional args directly:

```ts
function t(key: string, ...params: unknown[]): string {
  const stripped = key.startsWith('$vuetify.') ? key.slice(9) : key
  return v0Locale.t(stripped, params.length ? params : undefined)
}
```

v0's `t()` calls `toArray(params)` then spreads as `adapter.t(template, ...args)`. The adapter's positional regex (`/\{(\d+)\}/g`) matches `{0}`, `{1}`, etc. against the spread args. Passing an array of positional values works correctly at runtime.

**Type note:** v0's `t()` type declares `params` as `Record<string, unknown>`, but the runtime handles arrays via `toArray()`. v0 should widen the type to `Record<string, unknown> | unknown[]` — listed as a v0 prerequisite.

**Non-prefixed keys:** When a key doesn't start with `$vuetify.`, it's treated as a raw template string (current behavior preserved). The wrapper passes it through to v0's `t()` which interpolates params directly.

## Fallback Locale Resolution

### Problem

v0's `createLocale()` does not implement automatic fallback locale lookup. When a token path like `fr.dataTable.itemsPerPageText` is missing, v0 returns the raw key. Vuetify relies on fallback to English for untranslated keys.

### Solution — v0 Prerequisite

v0 must implement fallback locale resolution: when `{current}.{key}` is not found, automatically try `{fallback}.{key}` before returning the raw key. This is listed as a v0 prerequisite.

If v0's fallback implementation is not ready in time, Vuetify's wrapper can temporarily implement the fallback chain by doing a direct token lookup for the fallback locale (avoiding reactive side-effects from `select()`):

```ts
function t(key: string, ...params: unknown[]): string {
  const stripped = key.startsWith('$vuetify.') ? key.slice(9) : key
  const args = params.length ? params : undefined

  const result = v0Locale.t(stripped, args)

  // If v0 returned the raw key (not found), try fallback via direct token lookup
  if (result === stripped && fallbackLocale.value !== v0Locale.selectedId.value) {
    const fallbackPath = `${fallbackLocale.value}.${stripped}`
    const fallbackMessage = v0Tokens.get(fallbackPath)?.value
    if (isString(fallbackMessage)) {
      return v0Adapter.t(fallbackMessage, ...params)
    }
  }

  return result
}
```

This requires holding references to the v0 tokens and adapter instances, but avoids mutating `selectedId` (which would trigger watchers and reactivity side-effects).

**Note:** v0's `resolve()` function already supports cross-locale token references (`{en.some.key}`), which could be leveraged in message templates as a partial workaround. The proper fix is v0 supporting fallback natively.

## Message Resolution Flow

```
component calls t('$vuetify.dataTable.itemsPerPageText', 1, 10, 100)
  → Vuetify wrapper strips '$vuetify.' prefix → 'dataTable.itemsPerPageText'
  → Vuetify wrapper passes positional args → [1, 10, 100]
  → v0 locale.t('dataTable.itemsPerPageText', [1, 10, 100])
  → v0 looks up token: '{currentLocale}.dataTable.itemsPerPageText'
  → (if missing, v0 tries '{fallbackLocale}.dataTable.itemsPerPageText')
  → v0 adapter interpolates {0}, {1}, {2} from positional args
  → '1-10 of 100' returned
```

## Consumer Composables

### useLocale()

Thin wrapper — injects `LocaleSymbol`, returns combined locale + RTL context:

```ts
function useLocale() {
  const locale = inject(LocaleSymbol)
  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance')
  return locale
}
```

**Consumer-facing API:** `const { t, n, current, isRtl, rtlClasses } = useLocale()`

- `t` — Vuetify's wrapped `t()` with `$vuetify.` prefix handling and positional param conversion
- `n` — delegates to v0's `n()`
- `current` — writable computed aliased from v0's `selectedId`:
  ```ts
  const current = computed({
    get: () => v0Locale.selectedId.value,
    set: v => v0Locale.select(v),
  })
  ```
  v0's `selectedId` is a read-only computed, so writes go through `select()`.
- `isRtl` — from v0's RTL context
- `rtlClasses` — Vuetify-computed CSS class string
- `decimalSeparator` — from v0's locale context (or Vuetify-computed interim, see "Decimal Separator" section)

### useRtl()

Thin wrapper — injects `LocaleSymbol`, returns `{ isRtl, rtlClasses }`.

### provideLocale()

Retained as a thin wrapper. Creates a scoped v0 locale + RTL context pair, computes `rtlClasses`, and provides the combined object via `LocaleSymbol`. Used internally by `VLocaleProvider` and available for renderless composable patterns. Will migrate to wrap v0's `Locale` component when it ships.

## vue-i18n Adapter

Moves to v0 as a `LocaleAdapter` implementation. Vuetify re-exports or provides a thin wrapper for `$vuetify.` prefix handling. User-facing config stays the same:

```ts
const vuetify = createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
})
```

For initial implementation, Vuetify can keep a compatibility shim wrapping v0's adapter until the v0 adapter fully ships.

## VLocaleProvider

### Target state

Migrates to v0 as a `Locale` provider component. Vuetify wraps it as `VLocaleProvider` adding:

- `v-locale-provider` CSS class
- `v-locale--is-rtl` / `v-locale--is-ltr` class
- Per-locale RTL map lookup on locale prop change

### Interim implementation

Until v0 ships the `Locale` component, `VLocaleProvider` creates scoped v0 contexts directly:

1. Creates a new `createLocale()` instance with the provider's props (locale, messages)
2. Creates a new `createRtl()` with direction from per-locale RTL map (or explicit `rtl` prop)
3. Watches scoped locale selection → updates scoped RTL from per-locale map
4. Provides both scoped v0 contexts and Vuetify's `LocaleSymbol` with the scoped values + `rtlClasses`

Each `VLocaleProvider` instance maintains its own locale→RTL bridge watcher, independent of the root bridge.

## Breaking Changes

- `LocaleInstance` type changes internally (backed by v0 refs)
- `LocaleInstance.provide()` method removed — `provideLocale()` replaces this (see below)
- `provideLocale()` retained as thin wrapper — creates scoped v0 locale + RTL contexts, provides via `LocaleSymbol`. Used internally by `VLocaleProvider`. Will migrate to wrap v0's `Locale` component when it ships.
- `messages: Ref<LocaleMessages>` removed from public API — messages are managed by v0's token system; consumers register messages via `createVuetify()` options
- `fallback: Ref<string>` removed from public API — fallback is configured at creation time, not mutated at runtime
- `rtl: Ref<Record<string, boolean>>` (per-locale RTL map) removed from public API — the map is Vuetify-internal; consumers use `isRtl` (boolean) and `rtlClasses` (string). `VLocaleProvider` uses the internal map for locale→RTL lookup.
- `RtlSymbol` deprecated — RTL state is accessed via `LocaleSymbol` (current behavior) or v0's `useRtl()` directly
- `decimalSeparator` type changes from `ShallowRef<string>` to `Ref<string>` (computed) — unlikely to break consumers in practice
- `LocaleInstance.name` field (`'vuetify'` / `'vue-i18n'`) removed — adapter identity is a v0 concern
- vue-i18n adapter import path may change
- Consumer-facing destructured API (`t`, `n`, `current`, `isRtl`, `rtlClasses`, `decimalSeparator`) remains stable

## Decimal Separator

v0 must expose `decimalSeparator` on `LocaleContext` (inferred from `Intl.NumberFormat` based on current locale). Vuetify's wrapper passes it through:

```ts
const { decimalSeparator } = useLocale()
```

Listed as a v0 prerequisite. If not ready, Vuetify's wrapper computes it temporarily:

```ts
const decimalSeparator = toRef(() => {
  const formatted = v0Locale.n(0.1)
  return formatted.includes(',') ? ',' : '.'
})
```

## v0 Prerequisites

These must land in v0 before or alongside the Vuetify migration:

1. `useRtl` composable — **done** (v0.1.7)
2. Fallback locale resolution in `createLocale` — needed (try fallback locale when key not found in current)
3. Widen `t()` params type from `Record<string, unknown>` to `Record<string, unknown> | unknown[]` — needed
4. Decimal separator inference on `LocaleContext` — needed
5. vue-i18n `LocaleAdapter` implementation — needed
6. `Locale` provider component — needed (interim: Vuetify creates scoped contexts directly)

## Vuetify Responsibilities (post-migration)

- Ship 48 language message files
- Map locale codes to RTL defaults
- Strip `$vuetify.` prefix and convert positional params in `t()` wrapper
- Generate `v-locale--is-rtl` / `v-locale--is-ltr` CSS classes
- Alias `current` from v0's `selectedId`
- Wrap v0's `Locale` as `VLocaleProvider` with Vuetify styling
- Bridge locale selection → RTL state via per-locale map
