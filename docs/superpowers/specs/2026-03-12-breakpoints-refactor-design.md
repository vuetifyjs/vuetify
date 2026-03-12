# Breakpoints Refactor: Delegate to @vuetify/v0

**Date:** 2026-03-12
**Status:** Draft
**Approach:** A — Thin Wrapper

## Goal

Replace Vuetify's hand-rolled breakpoint computation in `display.ts` with `createBreakpoints()` from `@vuetify/v0`. Vuetify's `useDisplay()` becomes a thin wrapper that delegates breakpoint state to v0 and layers platform detection on top.

## Motivation

- Eliminate duplicated breakpoint logic between Vuetify and v0
- Single source of truth for breakpoint computation
- v0's implementation uses individual `shallowRef`s (better perf than `reactive` + `toRefs`)
- Gains `xxlAndUp` and `xxlAndDown` for free

## Scope

### In scope

- Refactor `createDisplay` to use `createBreakpoints()` from v0
- Update `DisplayInstance` type to reflect v0's ref types
- Type alias `DisplayBreakpoint` to v0's `BreakpointName`
- Keep `useDisplay()` API stable for all consumers

### Out of scope

- Platform detection (`getPlatform`) — stays in Vuetify, not moving to v0
- Migrating components to call `useBreakpoints()` directly (future work)
- Installing v0's `createBreakpointsPlugin` (using raw factory instead)

## Architecture

```
framework.ts
  └── createDisplay(options, ssr)
        ├── createBreakpoints(mapped options)  ← v0 (breakpoint state + update)
        └── getPlatform(ssr)                   ← Vuetify (UA detection)
```

`useDisplay()` injects `DisplaySymbol` as before, adds component-level `mobile`/`mobileBreakpoint` prop override and `displayClasses`.

## Detailed Changes

### `display.ts`

**Deleted:**

- `getClientWidth()` / `getClientHeight()` helpers — v0 handles window dimensions
- The `watchEffect` block (~40 lines) that computes `xs`/`sm`/.../`xxl`, all `AndUp`/`AndDown` variants, `name`, and `mobile`
- The manual `window.addEventListener('resize', ...)` and its `onScopeDispose` cleanup — replaced by v0's `useWindowEventListener`
- The `defaultDisplayOptions` object (thresholds/mobileBreakpoint defaults) — v0 owns these defaults now

**Kept:**

- `getPlatform(ssr)` — UA/platform detection (not in v0)
- `parseDisplayOptions` — can be simplified or removed since v0's `createBreakpoints` has identical defaults. If kept, avoid double-merging defaults (Vuetify merges, then v0 merges again). Simplest: pass `options?.thresholds` and `options?.mobileBreakpoint` directly to `createBreakpoints` and let v0 handle defaults.
- `DisplaySymbol` injection key
- `useDisplay(props, name)` — injects display, computes component-level `mobile` override + `displayClasses`
- `makeDisplayProps` — props factory for `mobile`/`mobileBreakpoint`
- Type exports: `DisplayBreakpoint`, `DisplayThresholds`, `DisplayProps`, `DisplayOptions`, `DisplayInstance`

**New `createDisplay` implementation:**

```ts
import { createBreakpoints, useWindowEventListener } from '@vuetify/v0'

export function createDisplay(options?: DisplayOptions, ssr?: SSROptions): DisplayInstance {
  const { thresholds, mobileBreakpoint } = parseDisplayOptions(options)

  const ssrOptions = typeof ssr === 'object'
    ? { clientWidth: ssr.clientWidth, clientHeight: ssr.clientHeight }
    : undefined

  const breakpoint = createBreakpoints({
    mobileBreakpoint,
    breakpoints: thresholds,
    ssr: ssrOptions,
  })

  const platform = shallowRef(getPlatform(ssr))

  function update() {
    breakpoint.update()
    platform.value = getPlatform()
  }

  // v0's raw createBreakpoints() does NOT set up resize listeners or
  // flush initial values — that's the plugin's job. We must do both.
  if (IN_BROWSER) {
    breakpoint.update() // flush real viewport dimensions immediately

    useWindowEventListener('resize', () => breakpoint.update(), { passive: true })
  }

  return {
    // Breakpoint state from v0
    xs: breakpoint.xs,
    sm: breakpoint.sm,
    md: breakpoint.md,
    lg: breakpoint.lg,
    xl: breakpoint.xl,
    xxl: breakpoint.xxl,
    smAndUp: breakpoint.smAndUp,
    mdAndUp: breakpoint.mdAndUp,
    lgAndUp: breakpoint.lgAndUp,
    xlAndUp: breakpoint.xlAndUp,
    smAndDown: breakpoint.smAndDown,
    mdAndDown: breakpoint.mdAndDown,
    lgAndDown: breakpoint.lgAndDown,
    xlAndDown: breakpoint.xlAndDown,
    name: breakpoint.name,
    width: breakpoint.width,
    height: breakpoint.height,

    // New from v0
    xxlAndUp: breakpoint.xxlAndUp,
    xxlAndDown: breakpoint.xxlAndDown,

    // Vuetify-owned
    mobile: breakpoint.isMobile,
    mobileBreakpoint: toRef(() => mobileBreakpoint),
    platform: readonly(platform),
    thresholds: toRef(() => thresholds),

    update,
    // Keep Vuetify's ssr semantics (true when SSR was configured, even on client)
    // v0's breakpoint.ssr is only true on the server. useHydration depends on this
    // being true on the client when SSR mode is active.
    ssr: !!ssr,
  }
}
```

**Key lifecycle notes:**

1. v0's `createBreakpoints()` initializes all refs to `0`/`xs` defaults on the client (it only uses SSR values on the server). We call `breakpoint.update()` immediately after construction to flush real viewport dimensions.

2. The resize listener uses `useWindowEventListener` from v0, which handles cleanup automatically on scope disposal.

3. `ssr` is set to `!!ssr` (Vuetify's semantics) rather than `breakpoint.ssr` (v0's semantics). Vuetify's `useHydration` depends on `ssr` being `true` on the client when SSR mode was configured. v0's `breakpoint.ssr` is only `true` on the server.

4. **SSR hydration note:** The current implementation preserves SSR-provided dimensions until mount via `getClientWidth(ssr)` which returns SSR values when `ssr` is truthy on the client. With v0, calling `breakpoint.update()` immediately reads real viewport dimensions. This is acceptable because `framework.ts` already calls `display.update()` after mount/suspense-resolve for the same purpose — the window between construction and mount is negligible since `createDisplay` runs during `createVuetify()` (before any component mounts).

### `DisplayInstance` type

The interface keeps `Ref<T>` types to avoid a public API type break. Internally, v0 returns `Readonly<ShallowRef<T>>` which is assignable to `Ref<T>` at runtime (both have `.value`), but `Readonly<ShallowRef<T>>` does not satisfy `Ref<T>` at the TypeScript level because `Ref<T>` includes a setter. We keep the interface as `Ref<T>` and the implementation naturally satisfies it since `ShallowRef<T> extends Ref<T>`.

```ts
import type { BreakpointName } from '@vuetify/v0'

export type DisplayBreakpoint = BreakpointName

export interface DisplayInstance {
  // Breakpoints (delegated to v0 internally)
  xs: Ref<boolean>
  sm: Ref<boolean>
  md: Ref<boolean>
  lg: Ref<boolean>
  xl: Ref<boolean>
  xxl: Ref<boolean>
  smAndUp: Ref<boolean>
  mdAndUp: Ref<boolean>
  lgAndUp: Ref<boolean>
  xlAndUp: Ref<boolean>
  smAndDown: Ref<boolean>
  mdAndDown: Ref<boolean>
  lgAndDown: Ref<boolean>
  xlAndDown: Ref<boolean>
  xxlAndUp: Ref<boolean>
  xxlAndDown: Ref<boolean>
  name: Ref<DisplayBreakpoint>
  width: Ref<number>
  height: Ref<number>

  // Vuetify-owned
  mobile: Ref<boolean>
  mobileBreakpoint: Ref<number | DisplayBreakpoint>
  platform: Ref<DisplayPlatform>
  thresholds: Ref<DisplayThresholds>

  /** @internal */
  ssr: boolean

  update(): void
}
```

**Note on `shims.d.ts`:** The Options API `$vuetify.display` type uses `UnwrapNestedRefs<DisplayInstance>`. Since we keep `Ref<T>` in the interface, `UnwrapNestedRefs` behavior is unchanged — all ref properties unwrap to their value types as before.

### `framework.ts`

Minimal changes:

- `createDisplay` call stays in the same location (inside `effectScope`)
- Options mapping unchanged — `options.display` and `options.ssr` passed through
- SSR hydration hooks remain — `display.update()` delegates to v0's `breakpoint.update()` + platform re-detect
- `$vuetify.display` in Options API mixin stays as-is

### Type aliasing

```ts
// In display.ts
import type { BreakpointName } from '@vuetify/v0'

export type DisplayBreakpoint = BreakpointName
export type Breakpoint = Exclude<DisplayBreakpoint, 'xs'>  // kept for VCol

export const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'] as const  // kept for VCol prop generation
```

### Files untouched

All consumer components continue calling `useDisplay()` with no import or usage changes:

- `VBanner.tsx` — `useDisplay` + `makeDisplayProps`
- `VNavigationDrawer.tsx` — `useDisplay` + `makeDisplayProps`
- `VStepper.tsx` — `useDisplay` + `makeDisplayProps`
- `VSlideGroup.tsx` — `useDisplay` + `makeDisplayProps`
- `VDataTableRow.tsx` — `useDisplay` + `makeDisplayProps`
- `VDataTableHeaders.tsx` — `useDisplay` + `makeDisplayProps`
- `VDataTableRows.tsx` — `useDisplay` + `makeDisplayProps`
- `VDateInput.tsx` — `useDisplay` + `makeDisplayProps`
- `VPagination.tsx` — `useDisplay` (width only)
- `VTextarea.tsx` — `useDisplay` (platform only)
- `VEmptyState.tsx` — `useDisplay`
- `VParallax.tsx` — `useDisplay` (height only)
- `VVideo.tsx` — `useDisplay`
- `virtual.ts` — `useDisplay`
- `hydration.ts` — `useDisplay().ssr`
- `VCol.ts` — `breakpoints` constant + `Breakpoint` type
- `composables/index.ts` — re-exports `useDisplay`
- `types.ts` — re-exports `DisplayBreakpoint`, `DisplayInstance`, `DisplayThresholds`
- `shims.d.ts` — `UnwrapNestedRefs<DisplayInstance>` (unchanged since `DisplayInstance` keeps `Ref<T>` types)
- `display.spec.browser.ts` — tests `createDisplay` directly
- `display-components.spec.browser.tsx` — imports `DisplayBreakpoint` type

## Type Compatibility

The `DisplayInstance` interface keeps `Ref<T>` types — no public API type break. The internal implementation uses v0's `Readonly<ShallowRef<T>>`, which at runtime has `.value` and works identically. Since `ShallowRef<T> extends Ref<T>` in Vue's type system, the implementation satisfies the interface. The `readonly()` wrapper is not reflected in `DisplayInstance`'s types — consumers can still read `.value` but cannot write (enforced at runtime by v0's `readonly()`, not by the type).

| Property | Interface type | Runtime type | Breaking? |
|----------|---------------|--------------|-----------|
| `xs`–`xxl` | `Ref<boolean>` | `Readonly<ShallowRef<boolean>>` | No |
| `smAndUp`–`xlAndDown` | `Ref<boolean>` | `Readonly<ShallowRef<boolean>>` | No |
| `name` | `Ref<DisplayBreakpoint>` | `Readonly<ShallowRef<BreakpointName>>` | No |
| `width`, `height` | `Ref<number>` | `Readonly<ShallowRef<number>>` | No |
| `mobile` | `Ref<boolean>` | `Readonly<ShallowRef<boolean>>` | No |
| `platform` | `Ref<DisplayPlatform>` | `Readonly<ShallowRef<DisplayPlatform>>` | No |
| `xxlAndUp`, `xxlAndDown` | `Ref<boolean>` | `Readonly<ShallowRef<boolean>>` | Addition |

## Risks & Mitigations

1. **Resize listener ownership:** v0's raw `createBreakpoints()` does NOT set up a resize listener (that's in the plugin's `setup` callback). Vuetify must call `breakpoint.update()` on resize. **Mitigated:** Spec code uses `useWindowEventListener` from v0, which handles cleanup automatically.

2. **Initial value flush:** v0's `createBreakpoints()` initializes all refs to `0`/`xs` on the client. Without an immediate `breakpoint.update()` call, breakpoints are wrong until the first resize. **Mitigated:** Spec code calls `breakpoint.update()` immediately after construction when `IN_BROWSER`.

3. **SSR semantics divergence:** v0's `breakpoint.ssr` is `!IN_BROWSER && !!ssr` (server-only). Vuetify's `useHydration` expects `display.ssr` to be `true` on the client when SSR mode is configured. **Mitigated:** Return `ssr: !!ssr` instead of `breakpoint.ssr`.

4. **SSR initial values:** Vuetify's `SSROptions` type (`boolean | { clientWidth, clientHeight? }`) maps to v0's `{ clientWidth, clientHeight? }`. The `boolean` case (SSR enabled without dimensions) maps to `undefined` — v0 will use zero defaults, same as current behavior.

5. **`mobileBreakpoint` prop override:** `useDisplay` computes a component-level `mobile` override via props. Unaffected — it reads `display.width` and `display.thresholds` which are still available.

6. **Test coverage:** Existing `display.spec.browser.ts` tests `createDisplay` directly. Tests should pass since the API surface is preserved. May need minor adjustments if tests assert on internal reactive structure.

## Verification Plan

1. `pnpm lint` in packages/vuetify — type checking passes
2. `pnpm test:unit` — existing display tests pass
3. `pnpm test:browser` — component tests involving breakpoints pass
4. Manual: resize browser, verify breakpoint classes update on VNavigationDrawer, VDataTable
