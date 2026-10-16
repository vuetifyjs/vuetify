---
paths: ['packages/vuetify/src/composables/**']
---

# Shared Composables

Shared composables are used by many components — a signature or reactivity slip spreads everywhere. Component-specific logic belongs in a local composable next to the component (see `components.md`).

## Reuse first

Grep `src/composables` and `src/util` before adding one. `@vuetify/v0` enters through `src/util/v0.ts`: import from `@/util`, and add new v0 exports to that file instead of importing `@vuetify/v0` at call sites.

## Prop-driven shape

Most composables. Props factory plus a `use` function taking `props` and the component name:

```ts
// Utilities
import { computed } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
export interface ExampleProps {
  example?: boolean | string
}

// Composables
export const makeExampleProps = propsFactory({
  example: [Boolean, String],
}, 'example')

export function useExample (
  props: ExampleProps,
  name = getCurrentInstanceName(),
) {
  const exampleClasses = computed(() => props.example ? `${name}--example` : [])

  return { exampleClasses }
}
```

- Take `props` or `MaybeRefOrGetter`, read with `toValue` inside `computed`/`toRef`. Never destructure props in the signature
- Return a plain object of refs, never `reactive`. Prefix names with the composable (`exampleClasses`, `exampleStyles`) — components destructure several side by side
- Modifier classes follow `${name}--x`

## Plugin shape

Global services (display, theme, locale). `createExample(options)` is called from `framework.ts`, provided under an `InjectionKey`, and `useExample()` injects it:

```ts
export const ExampleSymbol: InjectionKey<ExampleInstance> = Symbol.for('vuetify:example')

export function useExample () {
  const example = inject(ExampleSymbol)

  if (!example) throw new Error('[Vuetify] Could not find example injection')

  return example
}
```

## Instance, scope, SSR

- `getCurrentInstance('useExample')` from `@/util` when the composable needs the vm — the name ends up in the error
- `useToggleScope(source, fn)` for effects that should only exist while something is active
- Remove listeners and observers in `onScopeDispose`
- Guard browser APIs with `IN_BROWSER` / `SUPPORTS_*` from `@/util/globals`

## Public API

- `composables/index.ts` is public — exports there are documented by api-generator
- Internal code imports `@/composables/example`, never the barrel
- New exposed members of a public composable go in `packages/docs/src/data/new-in.json`
- Changing the return shape or arguments of a public composable is breaking — `next` branch
- Props coming from a shared composable are described once in `packages/api-generator/src/locale/en/example.json`, not in each component's file

## Tests

Unit project: `composables/__tests__/example.spec.ts`. See the `tests` skill.
