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
- The manual `window.addEventListener('resize', ...)` and its `onScopeDispose` cleanup
- The `defaultDisplayOptions` object (thresholds/mobileBreakpoint defaults) — v0 owns these defaults now

**Kept:**

- `getPlatform(ssr)` — UA/platform detection (not in v0)
- `parseDisplayOptions` — simplified to map Vuetify's `DisplayOptions` to v0's `BreakpointsOptions`
- `DisplaySymbol` injection key
- `useDisplay(props, name)` — injects display, computes component-level `mobile` override + `displayClasses`
- `makeDisplayProps` — props factory for `mobile`/`mobileBreakpoint`
- Type exports: `DisplayBreakpoint`, `DisplayThresholds`, `DisplayProps`, `DisplayOptions`, `DisplayInstance`

**New `createDisplay` implementation:**

```ts
import { createBreakpoints } from '@vuetify/v0'
import type { BreakpointsContext } from '@vuetify/v0'

export function createDisplay(options?: DisplayOptions, ssr?: SSROptions): DisplayInstance {
  const { thresholds, mobileBreakpoint } = parseDisplayOptions(options)

  const bp = createBreakpoints({
    mobileBreakpoint,
    breakpoints: thresholds,
    ssr: typeof ssr === 'object' ? { clientWidth: ssr.clientWidth, clientHeight: ssr.clientHeight } : undefined,
  })

  const platform = shallowRef(getPlatform(ssr))

  function update() {
    bp.update()
    platform.value = getPlatform()
  }

  if (IN_BROWSER) {
    window.addEventListener('resize', () => bp.update(), { passive: true })
    // Platform doesn't change on resize, only on SSR→client transition
  }

  return {
    // Breakpoint state from v0
    xs: bp.xs,
    sm: bp.sm,
    md: bp.md,
    lg: bp.lg,
    xl: bp.xl,
    xxl: bp.xxl,
    smAndUp: bp.smAndUp,
    mdAndUp: bp.mdAndUp,
    lgAndUp: bp.lgAndUp,
    xlAndUp: bp.xlAndUp,
    smAndDown: bp.smAndDown,
    mdAndDown: bp.mdAndDown,
    lgAndDown: bp.lgAndDown,
    xlAndDown: bp.xlAndDown,
    name: bp.name,
    width: bp.width,
    height: bp.height,

    // New from v0
    xxlAndUp: bp.xxlAndUp,
    xxlAndDown: bp.xxlAndDown,

    // Vuetify-owned
    mobile: bp.isMobile,
    mobileBreakpoint: toRef(() => mobileBreakpoint),
    platform: readonly(platform),
    thresholds: toRef(() => thresholds),

    update,
    ssr: bp.ssr,
  }
}
```

**Note:** The resize listener setup may need adjustment. v0's `createBreakpoints` does NOT set up its own resize listener (that's in the plugin's `setup` callback). So Vuetify must still call `bp.update()` on resize. The current `onScopeDispose` cleanup pattern should be preserved.

### `DisplayInstance` type

```ts
import type { BreakpointName } from '@vuetify/v0'

export type DisplayBreakpoint = BreakpointName

export interface DisplayInstance {
  // From v0 — Readonly<ShallowRef<boolean>>
  xs: Readonly<ShallowRef<boolean>>
  sm: Readonly<ShallowRef<boolean>>
  md: Readonly<ShallowRef<boolean>>
  lg: Readonly<ShallowRef<boolean>>
  xl: Readonly<ShallowRef<boolean>>
  xxl: Readonly<ShallowRef<boolean>>
  smAndUp: Readonly<ShallowRef<boolean>>
  mdAndUp: Readonly<ShallowRef<boolean>>
  lgAndUp: Readonly<ShallowRef<boolean>>
  xlAndUp: Readonly<ShallowRef<boolean>>
  smAndDown: Readonly<ShallowRef<boolean>>
  mdAndDown: Readonly<ShallowRef<boolean>>
  lgAndDown: Readonly<ShallowRef<boolean>>
  xlAndDown: Readonly<ShallowRef<boolean>>
  xxlAndUp: Readonly<ShallowRef<boolean>>
  xxlAndDown: Readonly<ShallowRef<boolean>>
  name: Readonly<ShallowRef<DisplayBreakpoint>>
  width: Readonly<ShallowRef<number>>
  height: Readonly<ShallowRef<number>>

  // Vuetify-owned
  mobile: Readonly<ShallowRef<boolean>>
  mobileBreakpoint: Ref<number | DisplayBreakpoint>
  platform: Readonly<ShallowRef<DisplayPlatform>>
  thresholds: Ref<DisplayThresholds>

  /** @internal */
  ssr: boolean

  update(): void
}
```

### `framework.ts`

Minimal changes:

- `createDisplay` call stays in the same location (inside `effectScope`)
- Options mapping unchanged — `options.display` and `options.ssr` passed through
- SSR hydration hooks remain — `display.update()` delegates to v0's `bp.update()` + platform re-detect
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

## Type Compatibility

| Property | Before | After | `.value` compat? |
|----------|--------|-------|-------------------|
| `xs`–`xxl` | `Ref<boolean>` | `Readonly<ShallowRef<boolean>>` | Yes |
| `smAndUp`–`xlAndDown` | `Ref<boolean>` | `Readonly<ShallowRef<boolean>>` | Yes |
| `name` | `Ref<DisplayBreakpoint>` | `Readonly<ShallowRef<DisplayBreakpoint>>` | Yes |
| `width`, `height` | `Ref<number>` | `Readonly<ShallowRef<number>>` | Yes |
| `mobile` | Computed `Ref<boolean>` | `Readonly<ShallowRef<boolean>>` | Yes |
| `platform` | `Ref<DisplayPlatform>` | `Readonly<ShallowRef<DisplayPlatform>>` | Yes |
| `xxlAndUp`, `xxlAndDown` | N/A | `Readonly<ShallowRef<boolean>>` | New addition |

`Readonly<ShallowRef<T>>` satisfies `Ref<T>` for read access. No consumer breakage.

## Risks

1. **Resize listener ownership:** v0's raw `createBreakpoints()` does NOT set up a resize listener. Vuetify must call `bp.update()` on resize. If this is missed, breakpoints won't react to window resizes.

2. **SSR initial values:** v0's `createBreakpoints` handles SSR initial values when `ssr` option is provided. Vuetify's `SSROptions` type (`boolean | { clientWidth, clientHeight? }`) needs to be mapped to v0's `{ clientWidth, clientHeight? }` format — the `boolean` case maps to no SSR options.

3. **`mobileBreakpoint` prop override:** `useDisplay` computes a local `mobile` that can override the global one based on component props. This logic stays in Vuetify and is unaffected — it reads `display.width` and `display.thresholds` which are still available.

4. **Test coverage:** The existing `display.spec.browser.ts` tests `createDisplay` directly. These tests should pass with minimal changes since the API surface is the same.

## Verification Plan

1. `pnpm lint` in packages/vuetify — type checking passes
2. `pnpm test:unit` — existing display tests pass
3. `pnpm test:browser` — component tests involving breakpoints pass
4. Manual: resize browser, verify breakpoint classes update on VNavigationDrawer, VDataTable
