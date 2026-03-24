# v0 Locale Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Vuetify's internal locale/RTL implementation with @vuetify/v0 composables, making v0 the runtime source of truth while Vuetify remains a thin configuration layer.

**Architecture:** v0's `createLocale()` owns message storage (tokens), locale selection, translation (`t()`), number formatting (`n()`), and fallback resolution. v0's `createRtl()` owns reactive RTL boolean state. Vuetify wraps these with `$vuetify.` prefix stripping, per-locale RTL mapping, CSS class generation, and its existing `LocaleSymbol` provide/inject contract. The consumer-facing API (`t`, `n`, `current`, `isRtl`, `rtlClasses`, `decimalSeparator`) stays identical.

**Tech Stack:** Vue 3, @vuetify/v0 ^0.1.9, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-16-v0-locale-integration-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Rewrite | `packages/vuetify/src/composables/locale.ts` | Core composable — create, provide, use locale + RTL backed by v0 |
| Delete | `packages/vuetify/src/locale/adapters/vuetify.ts` | Replaced by v0's `Vuetify0LocaleAdapter` |
| Rewrite | `packages/vuetify/src/locale/adapters/vue-i18n.ts` | Thin wrapper that creates v0 locale with `VueI18nLocaleAdapter` |
| No change | `packages/vuetify/src/framework.ts` | `createLocale(options.locale)` call stays identical |
| No change | `packages/vuetify/src/components/VLocaleProvider/VLocaleProvider.tsx` | `provideLocale(props)` call stays identical |
| Modify | `packages/vuetify/src/types.ts` | Update exported types to match new interfaces |
| No change | `packages/vuetify/src/locale/*.ts` | Language pack files unchanged |
| No change | `packages/vuetify/src/locale/index.ts` | Re-exports unchanged |
| No change | All consumer components | `useLocale()` and `useRtl()` return types stay compatible |

---

## Task 1: Rewrite the core locale composable

**Files:**
- Rewrite: `packages/vuetify/src/composables/locale.ts`
- Delete: `packages/vuetify/src/locale/adapters/vuetify.ts`

This is the central change. Replace `createLocale`, `provideLocale`, `useLocale`, `createRtl`, `provideRtl`, `useRtl` with v0-backed implementations.

- [ ] **Step 1: Rewrite `packages/vuetify/src/composables/locale.ts`**

The new file delegates to v0 for locale selection, token storage, translation, and RTL state. Vuetify adds: `$vuetify.` prefix stripping, per-locale RTL map, `rtlClasses` computation, `LocaleSymbol` DI contract.

**Design notes:**
- Root `createLocale` stores the full messages ref on the provided data via `_messages` so `provideLocale` can inherit them for scoped contexts. Without this, `<VLocaleProvider locale="ar">` would have zero tokens.
- `provideLocale` does NOT create a `v0Rtl` instance — `provideRtl` already computes RTL from the map. Only the root needs the v0 RTL bridge.
- v0 plugin installation (`createLocalePlugin`/`createRtlPlugin`) is deferred to a follow-up — not needed for the refactor since all Vuetify components use `LocaleSymbol` injection.

```ts
// Utilities
import { computed, inject, provide, ref, shallowRef, toRef, watch } from 'vue'
import { createLocale as createV0Locale, createRtl as createV0Rtl } from '@vuetify/v0'

// Locales
import en from '@/locale/en'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { LocaleContext, RtlContext } from '@vuetify/v0'

export interface LocaleMessages {
  [key: string]: LocaleMessages | string
}

export interface LocaleOptions {
  decimalSeparator?: string
  messages?: Record<string, LocaleMessages>
  locale?: string
  fallback?: string
  adapter?: LocaleInstance
}

export interface LocaleInstance {
  current: Ref<string>
  t: (key: string, ...params: unknown[]) => string
  n: (value: number) => string
  decimalSeparator: Ref<string>
}

export interface RtlOptions {
  rtl?: Record<string, boolean>
}

export interface RtlProps {
  rtl?: boolean
}

export interface RtlInstance {
  isRtl: Ref<boolean>
  rtl: Ref<Record<string, boolean>>
  rtlClasses: Ref<string>
}

// Internal: carried on provided data so provideLocale can inherit messages
interface InternalLocaleData {
  _messages: Record<string, LocaleMessages>
}

export const LocaleSymbol: InjectionKey<LocaleInstance & RtlInstance> = Symbol.for('vuetify:locale')
export const RtlSymbol: InjectionKey<RtlInstance> = Symbol.for('vuetify:rtl')

const LANG_PREFIX = '$vuetify.'

function genDefaults () {
  return {
    af: false,
    ar: true,
    bg: false,
    ca: false,
    ckb: false,
    cs: false,
    de: false,
    el: false,
    en: false,
    es: false,
    et: false,
    fa: true,
    fi: false,
    fr: false,
    hr: false,
    hu: false,
    he: true,
    id: false,
    it: false,
    ja: false,
    km: false,
    ko: false,
    lv: false,
    lt: false,
    nl: false,
    no: false,
    pl: false,
    pt: false,
    ro: false,
    ru: false,
    sk: false,
    sl: false,
    srCyrl: false,
    srLatn: false,
    sv: false,
    th: false,
    tr: false,
    az: false,
    uk: false,
    vi: false,
    zhHans: false,
    zhHant: false,
  }
}

function createLocaleInstance (
  v0Locale: LocaleContext,
  options?: { decimalSeparator?: string }
): LocaleInstance {
  const current = computed({
    get: () => v0Locale.selectedId.value ?? 'en',
    set: v => v0Locale.select(v),
  })

  function t (key: string, ...params: unknown[]): string {
    const stripped = key.startsWith(LANG_PREFIX) ? key.slice(LANG_PREFIX.length) : key
    return v0Locale.t(stripped, ...params)
  }

  function n (value: number): string {
    return v0Locale.n(value)
  }

  const decimalSeparator = toRef(() => {
    if (options?.decimalSeparator) return options.decimalSeparator
    const formatted = n(0.1)
    return formatted.includes(',') ? ',' : '.'
  })

  return {
    current,
    t,
    n,
    decimalSeparator,
  }
}

function createRtlInstance (
  locale: LocaleInstance,
  rtlMap: Ref<Record<string, boolean>>,
  v0Rtl: RtlContext
): RtlInstance {
  // Bridge: when locale changes, update v0 RTL from per-locale map
  watch(() => locale.current.value, current => {
    v0Rtl.isRtl.value = rtlMap.value[current] ?? false
  }, { immediate: true })

  return {
    isRtl: v0Rtl.isRtl,
    rtl: rtlMap,
    rtlClasses: toRef(() => `v-locale--is-${v0Rtl.isRtl.value ? 'rtl' : 'ltr'}`),
  }
}

// --- Public API ---

export function createLocale (options?: LocaleOptions & RtlOptions) {
  // If a custom adapter (e.g. vue-i18n) is passed, use it directly
  if (options?.adapter) {
    const rtl = createRtlFromAdapter(options.adapter, options)
    return { ...options.adapter, ...rtl }
  }

  const messages = { en, ...options?.messages }
  const defaultLocale = options?.locale ?? 'en'
  const fallback = options?.fallback ?? 'en'

  const v0Locale = createV0Locale({
    default: defaultLocale,
    fallback,
    messages,
  })

  const v0Rtl = createV0Rtl({
    default: false,
    // Pass null to prevent v0 from managing document dir attribute —
    // Vuetify manages this via VApp's rtlClasses
    target: null,
  })

  const rtlMap = ref<Record<string, boolean>>(options?.rtl ?? genDefaults())
  const locale = createLocaleInstance(v0Locale, options)
  const rtl = createRtlInstance(locale, rtlMap, v0Rtl)

  return { ...locale, ...rtl, _messages: messages } as LocaleInstance & RtlInstance & InternalLocaleData
}

function createRtlFromAdapter (adapter: LocaleInstance, options?: RtlOptions): RtlInstance {
  const rtl = ref<Record<string, boolean>>(options?.rtl ?? genDefaults())
  const isRtl = computed(() => rtl.value[adapter.current.value] ?? false)

  return {
    isRtl,
    rtl,
    rtlClasses: toRef(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  }
}

export function useLocale () {
  const locale = inject(LocaleSymbol)

  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance')

  return locale
}

export function provideLocale (props: LocaleOptions & RtlProps) {
  const parent = inject(LocaleSymbol)

  if (!parent) throw new Error('[Vuetify] Could not find injected locale instance')

  // If the parent is using a custom adapter (e.g. vue-i18n), delegate to its provide
  if ('provide' in parent && typeof (parent as any).provide === 'function') {
    const i18n = (parent as any).provide(props)
    const rtl = provideRtl(i18n, parent.rtl, props)
    const data = { ...i18n, ...rtl }
    provide(LocaleSymbol, data)
    return data
  }

  // Inherit root messages, merge with any child-provided overrides
  const parentMessages = (parent as any)._messages ?? {}
  const messages = props.messages
    ? { ...parentMessages, [props.locale ?? parent.current.value]: props.messages }
    : parentMessages

  const v0Locale = createV0Locale({
    default: props.locale ?? parent.current.value,
    fallback: props.fallback ?? 'en',
    messages,
  })

  const locale = createLocaleInstance(v0Locale, props)
  const rtl = provideRtl(locale, parent.rtl, props)

  const data = { ...locale, ...rtl, _messages: messages } as LocaleInstance & RtlInstance & InternalLocaleData
  provide(LocaleSymbol, data)
  return data
}

function provideRtl (locale: LocaleInstance, rtl: RtlInstance['rtl'], props: RtlProps): RtlInstance {
  const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false)

  return {
    isRtl,
    rtl,
    rtlClasses: toRef(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  }
}

export function useRtl () {
  const locale = inject(LocaleSymbol)

  if (!locale) throw new Error('[Vuetify] Could not find injected rtl instance')

  return { isRtl: locale.isRtl, rtlClasses: locale.rtlClasses }
}
```

- [ ] **Step 2: Delete the old Vuetify adapter**

```bash
rm packages/vuetify/src/locale/adapters/vuetify.ts
```

The `createVuetifyAdapter` function is no longer needed — v0's `Vuetify0LocaleAdapter` handles translation and number formatting internally.

- [ ] **Step 3: Verify the build compiles**

```bash
cd packages/vuetify && pnpm build:lib 2>&1 | head -20
```

Expected: No import errors for `@/locale/adapters/vuetify`. All components importing `useLocale` / `useRtl` should compile since the return types are compatible.

- [ ] **Step 4: Run the existing locale tests**

```bash
cd packages/vuetify && pnpm test:unit -- --run src/locale/__tests__/index.spec.ts
```

Expected: PASS — these tests check language pack exports and structure, not the adapter.

- [ ] **Step 5: Commit**

```bash
git add packages/vuetify/src/composables/locale.ts
git add packages/vuetify/src/locale/adapters/vuetify.ts
git commit -m "refactor(locale): replace Vuetify adapter with v0 createLocale/createRtl

Vuetify's locale composable now delegates to @vuetify/v0 for:
- Message storage (tokens) and translation (t())
- Number formatting (n())
- Fallback locale resolution
- RTL boolean state

Vuetify remains responsible for:
- $vuetify. prefix stripping
- Per-locale RTL map (ar, fa, he → true)
- CSS class generation (v-locale--is-rtl/ltr)
- LocaleSymbol provide/inject contract

BREAKING CHANGE: LocaleInstance.provide() and .name removed.
LocaleInstance.fallback and .messages removed from public type.
Nested contexts use provideLocale() or VLocaleProvider."
```

---

## Task 2: Update the vue-i18n adapter

**Files:**
- Rewrite: `packages/vuetify/src/locale/adapters/vue-i18n.ts`

The vue-i18n adapter needs to return a `LocaleInstance` that Vuetify's `createLocale` can consume via the `adapter` option. v0 ships its own `VueI18nLocaleAdapter`, but Vuetify's adapter wraps vue-i18n at a higher level — it needs to satisfy the `LocaleInstance` interface (`current`, `t`, `n`, `decimalSeparator`) plus extra properties (`provide`, `messages`, `fallback`, `name`) used for scope nesting.

- [ ] **Step 1: Rewrite the vue-i18n adapter**

The adapter continues to wrap vue-i18n directly (not via v0's adapter), since it needs to preserve vue-i18n's full feature set (pluralization, linked messages, datetime formatting) and its own scope nesting via `useI18n({ useScope: 'local' })`.

```ts
// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { toRef, watch } from 'vue'

// Types
import type { Ref } from 'vue'
import type { I18n, useI18n } from 'vue-i18n'
import type { LocaleInstance, LocaleMessages, LocaleOptions } from '@/composables/locale'

type VueI18nAdapterParams = {
  i18n: I18n<any, {}, {}, string, false>
  useI18n: typeof useI18n
}

function useProvided <T> (props: any, prop: string, provided: Ref<T>) {
  const internal = useProxiedModel(props, prop)

  internal.value = props[prop] ?? provided.value

  watch(provided, v => {
    if (props[prop] == null) {
      internal.value = v
    }
  })

  return internal as Ref<T>
}

function inferDecimalSeparator (format: (v: number) => string) {
  return format(0.1).includes(',') ? ',' : '.'
}

function createProvideFunction (data: {
  current: Ref<string>
  fallback: Ref<string>
  messages: Ref<LocaleMessages>
  useI18n: typeof useI18n
}) {
  return (props: LocaleOptions): LocaleInstance => {
    const current = useProvided(props, 'locale', data.current)
    const fallback = useProvided(props, 'fallback', data.fallback)
    const messages = useProvided(props, 'messages', data.messages)

    const i18n = data.useI18n({
      locale: current.value,
      fallbackLocale: fallback.value,
      messages: messages.value as any,
      useScope: 'local',
      legacy: false,
      inheritLocale: false,
    })

    watch(current, v => {
      i18n.locale.value = v
    })

    return {
      name: 'vue-i18n',
      current,
      fallback,
      messages,
      decimalSeparator: toRef(() => props.decimalSeparator ?? inferDecimalSeparator(i18n.n)),
      t: (key: string, ...params: unknown[]) => i18n.t(key, params),
      n: i18n.n,
      provide: createProvideFunction({ current, fallback, messages, useI18n: data.useI18n }),
    }
  }
}

export function createVueI18nAdapter ({ i18n, useI18n }: VueI18nAdapterParams): LocaleInstance {
  const current = i18n.global.locale
  const fallback = i18n.global.fallbackLocale as Ref<any>
  const messages = i18n.global.messages

  return {
    name: 'vue-i18n',
    current,
    fallback,
    messages,
    decimalSeparator: toRef(() => inferDecimalSeparator(i18n.global.n)),
    t: (key: string, ...params: unknown[]) => i18n.global.t(key, params),
    n: i18n.global.n,
    provide: createProvideFunction({ current, fallback, messages, useI18n }),
  }
}
```

**Key difference from current:** The `LocaleInstance` interface no longer requires `name`, `fallback`, `messages`, or `provide`. The vue-i18n adapter keeps these as extra properties since it uses them for scope nesting — the core `provideLocale` detects the `provide` method via duck-typing and delegates to it.

- [ ] **Step 2: Verify build**

```bash
cd packages/vuetify && pnpm build:lib 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add packages/vuetify/src/locale/adapters/vue-i18n.ts
git commit -m "refactor(locale): update vue-i18n adapter for new LocaleInstance interface"
```

---

## Task 3: Update exported types

**Files:**
- Modify: `packages/vuetify/src/types.ts`

- [ ] **Step 1: Update type exports**

The `LocaleInstance` interface no longer has `messages`, `provide`, or `name` as required fields in the public type. Verify the export in `types.ts` still works:

```ts
export type { LocaleInstance, LocaleMessages, RtlInstance, LocaleOptions, RtlOptions } from '@/composables/locale'
```

This line doesn't need to change — it re-exports from the composable which we've already updated. Just verify it compiles.

- [ ] **Step 2: Run typecheck**

```bash
cd packages/vuetify && pnpm tsc --noEmit --pretty 2>&1 | tail -20
```

Expected: No type errors from consumers using `useLocale()` — the return type (`LocaleInstance & RtlInstance`) has `t`, `n`, `current`, `isRtl`, `rtlClasses`, `decimalSeparator` which all existing consumers destructure.

- [ ] **Step 3: Commit if types.ts needed changes**

Only commit if changes were required. Skip if no changes needed.

---

## Task 4: Integration verification

- [ ] **Step 1: Run the full unit test suite**

```bash
cd packages/vuetify && pnpm test:unit -- --run 2>&1 | tail -30
```

Check for failures related to locale, translation, RTL, or `VLocaleProvider`.

- [ ] **Step 2: Run lint**

```bash
cd packages/vuetify && pnpm lint 2>&1 | tail -20
```

- [ ] **Step 3: Spot-check translation behavior**

Verify that v0's token flattening correctly handles Vuetify's nested message format. The language packs use nested objects like:

```ts
{ dataTable: { sortBy: 'Sort by' } }
```

v0's `createTokens` flattens these to `en.dataTable.sortBy`. The adapter looks up `${locale}.${key}` — so `t('dataTable.sortBy')` resolves to `en.dataTable.sortBy`. This should work, but verify by checking a component that uses `t()` with a nested key.

- [ ] **Step 4: Verify VLocaleProvider still works**

`VLocaleProvider` calls `provideLocale(props)` — unchanged. The new `provideLocale` creates a scoped v0 locale instance. Verify that nested locale providers correctly override the parent's locale.

- [ ] **Step 5: Verify non-prefixed key behavior**

Current behavior: keys without `$vuetify.` are treated as raw templates with positional param interpolation. The new code strips the prefix if present, then delegates to v0's `t()`. For non-prefixed keys, v0 will look them up as tokens (which won't exist) and return the key after interpolation. Verify this works correctly.

- [ ] **Step 6: Final commit with any fixes**

```bash
git add -u
git commit -m "fix(locale): address integration issues from v0 migration"
```

Only if fixes were needed. Skip if everything passed.
