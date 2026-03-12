# Breakpoints Refactor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Vuetify's hand-rolled breakpoint computation in `display.ts` with `createBreakpoints()` from `@vuetify/v0`.

**Architecture:** `createDisplay` calls v0's `createBreakpoints()` for all breakpoint state, adds platform detection on top. `useDisplay()` stays unchanged as the public API. Single file change.

**Tech Stack:** Vue 3, @vuetify/v0 (createBreakpoints, useWindowEventListener), TypeScript

**Spec:** `docs/superpowers/specs/2026-03-12-breakpoints-refactor-design.md`

---

## Chunk 1: Implementation

### Task 1: Refactor `display.ts`

**Files:**
- Modify: `packages/vuetify/src/composables/display.ts`

- [ ] **Step 1: Update imports**

Replace the top of `display.ts`. Remove `reactive`, `onScopeDispose`, `watchEffect`, `toRefs` from vue imports (no longer needed). Remove `mergeDeep` (no longer needed — v0 handles defaults). Keep `SUPPORTS_TOUCH` (still used by `getPlatform`). Add v0 imports.

```ts
// Composables
import { createBreakpoints, useWindowEventListener } from '@vuetify/v0'

// Utilities
import { computed, inject, readonly, shallowRef, toRef } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'
import { IN_BROWSER, SUPPORTS_TOUCH } from '@/util/globals'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { BreakpointName } from '@vuetify/v0'
```

- [ ] **Step 2: Update type aliases and `DisplayInstance`**

Replace the type section. `DisplayBreakpoint` becomes an alias to v0's `BreakpointName`. Add `xxlAndUp` and `xxlAndDown` to `DisplayInstance`. Keep `breakpoints` const and `Breakpoint` type for VCol compat.

```ts
export const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'] as const // no xs

export type Breakpoint = typeof breakpoints[number]

export type DisplayBreakpoint = BreakpointName

export type DisplayThresholds = {
  [key in DisplayBreakpoint]: number
}

export interface DisplayProps {
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
}

export interface DisplayOptions {
  mobileBreakpoint?: number | DisplayBreakpoint
  thresholds?: Partial<DisplayThresholds>
}

export type SSROptions = boolean | {
  clientWidth: number
  clientHeight?: number
}

export interface DisplayPlatform {
  android: boolean
  ios: boolean
  cordova: boolean
  electron: boolean
  chrome: boolean
  edge: boolean
  firefox: boolean
  opera: boolean
  win: boolean
  mac: boolean
  linux: boolean
  touch: boolean
  ssr: boolean
}

export interface DisplayInstance {
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
  height: Ref<number>
  width: Ref<number>
  mobile: Ref<boolean>
  mobileBreakpoint: Ref<number | DisplayBreakpoint>
  platform: Ref<DisplayPlatform>
  thresholds: Ref<DisplayThresholds>

  /** @internal */
  ssr: boolean

  update (): void
}
```

**What's deleted:**
- `InternalDisplayOptions` interface — no longer needed
- `defaultDisplayOptions` object — v0 owns defaults
- `parseDisplayOptions` function — v0 handles merging

**What's preserved (do not delete):**
- `DisplaySymbol` declaration (line 84 in current file) — must remain between types and `getPlatform`

- [ ] **Step 3: Delete helper functions, keep `getPlatform` and `DisplaySymbol`**

Delete `getClientWidth` and `getClientHeight` functions entirely. Keep `getPlatform` exactly as-is (lines 114-150 of current file). Keep `DisplaySymbol` (line 84) — it sits between the type block and `getPlatform`.

- [ ] **Step 4: Rewrite `createDisplay`**

Replace the entire `createDisplay` function body:

```ts
export function createDisplay (options?: DisplayOptions, ssr?: SSROptions): DisplayInstance {
  const ssrOptions = typeof ssr === 'object'
    ? { clientWidth: ssr.clientWidth, clientHeight: ssr.clientHeight }
    : undefined

  const breakpoint = createBreakpoints({
    mobileBreakpoint: options?.mobileBreakpoint,
    breakpoints: options?.thresholds,
    ssr: ssrOptions,
  })

  const platform = shallowRef(getPlatform(ssr))

  function update () {
    breakpoint.update()
    platform.value = getPlatform()
  }

  if (IN_BROWSER) {
    breakpoint.update()

    useWindowEventListener('resize', () => breakpoint.update(), { passive: true })
  }

  // v0 returns Readonly<ShallowRef<T>> which doesn't satisfy Ref<T> at the
  // type level (Readonly removes the setter). ShallowRef extends Ref at runtime
  // so the cast is safe. DisplayInstance keeps Ref<T> to avoid public API break.
  type R<T> = Ref<T>
  const r = <T>(v: unknown) => v as R<T>

  return {
    xs: r<boolean>(breakpoint.xs),
    sm: r<boolean>(breakpoint.sm),
    md: r<boolean>(breakpoint.md),
    lg: r<boolean>(breakpoint.lg),
    xl: r<boolean>(breakpoint.xl),
    xxl: r<boolean>(breakpoint.xxl),
    smAndUp: r<boolean>(breakpoint.smAndUp),
    mdAndUp: r<boolean>(breakpoint.mdAndUp),
    lgAndUp: r<boolean>(breakpoint.lgAndUp),
    xlAndUp: r<boolean>(breakpoint.xlAndUp),
    smAndDown: r<boolean>(breakpoint.smAndDown),
    mdAndDown: r<boolean>(breakpoint.mdAndDown),
    lgAndDown: r<boolean>(breakpoint.lgAndDown),
    xlAndDown: r<boolean>(breakpoint.xlAndDown),
    xxlAndUp: r<boolean>(breakpoint.xxlAndUp),
    xxlAndDown: r<boolean>(breakpoint.xxlAndDown),
    name: r<DisplayBreakpoint>(breakpoint.name),
    height: r<number>(breakpoint.height),
    width: r<number>(breakpoint.width),
    mobile: r<boolean>(breakpoint.isMobile),
    mobileBreakpoint: toRef(() => options?.mobileBreakpoint ?? 'lg'), // 'lg' matches v0's default
    platform: readonly(platform) as Ref<DisplayPlatform>,
    thresholds: toRef(() => breakpoint.breakpoints as DisplayThresholds),
    update,
    ssr: !!ssr,
  }
}
```

- [ ] **Step 5: Verify `useDisplay` and `makeDisplayProps` are unchanged**

These two functions at the bottom of the file should remain exactly as they are. No edits needed. Confirm they still reference the correct types and imports (`computed`, `inject`, `toRef`, `DisplaySymbol`, `getCurrentInstanceName`, `propsFactory`).

- [ ] **Step 6: Commit**

```bash
git add packages/vuetify/src/composables/display.ts
git commit -m "refactor: migrate display composable to v0 createBreakpoints"
```

## Chunk 2: Verification

### Task 2: Type check

- [ ] **Step 1: Run lint/typecheck**

```bash
cd packages/vuetify && pnpm lint
```

Expected: No type errors. The `Readonly<ShallowRef<T>>` → `Ref<T>` casts are already handled in the return object via the `r()` helper.

- [ ] **Step 2: Fix any remaining type issues and commit if needed**

```bash
git add packages/vuetify/src/composables/display.ts
git commit -m "refactor: fix type issues from breakpoints migration"
```

### Task 3: Run tests

- [ ] **Step 1: Run display browser tests**

```bash
cd packages/vuetify && pnpm test:browser -- --testPathPattern display
```

Expected: All existing tests pass. The tests check:
- Breakpoint calculation at various viewport sizes (Galaxy S5, iPhone 6, iPad, etc.)
- Custom threshold override (`thresholds: { sm: 400 }`)
- Mobile breakpoint string config (`mobileBreakpoint: 'lg'`)

Key: Tests use `page.viewport()` to trigger resize → the `useWindowEventListener('resize', ...)` must fire `breakpoint.update()` for values to react.

- [ ] **Step 2: Run full test suite**

```bash
cd packages/vuetify && pnpm test:unit
```

Expected: No regressions in components using `useDisplay`.

- [ ] **Step 3: Commit if test fixes were needed**

```bash
git add -u
git commit -m "fix: adjust display tests for v0 breakpoints migration"
```

### Task 4: Final verification checklist

- [ ] **Step 1: Verify no consumer files changed**

```bash
git diff --name-only HEAD~3
```

Expected: Only `packages/vuetify/src/composables/display.ts` (and possibly `packages/vuetify/package.json` for the v0 version bump).

- [ ] **Step 2: Review the diff**

```bash
git diff HEAD~3 -- packages/vuetify/src/composables/display.ts
```

Confirm:
- `getClientWidth`, `getClientHeight` deleted
- `defaultDisplayOptions`, `parseDisplayOptions`, `InternalDisplayOptions` deleted
- `watchEffect` block deleted
- `reactive`, `toRefs`, `onScopeDispose` removed from vue imports
- `mergeDeep` removed from util imports
- `createBreakpoints`, `useWindowEventListener` imported from `@vuetify/v0`
- `BreakpointName` type imported from `@vuetify/v0`
- `xxlAndUp`, `xxlAndDown` added to `DisplayInstance`
- `getPlatform` untouched
- `useDisplay` untouched
- `makeDisplayProps` untouched
