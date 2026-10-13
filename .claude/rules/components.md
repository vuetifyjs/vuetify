---
paths: ['packages/vuetify/src/components/**', 'packages/vuetify/src/labs/**']
---

# Components

## Direction

The `.tsx` file holds markup, coordination and light logic. Heavy logic (data shaping, selection rules, calculations) goes into local composables next to the component, and later moves to `@vuetify/v0`. Logic in a plain function is testable without mounting. Follow this for new components and when a change grows an existing component's `setup`.

## Anatomy

```
components/VExample/
├── VExample.tsx
├── VExample.sass
├── _variables.scss
├── example.ts          # local composable: useExample(props)
├── index.ts
└── __tests__/
```

Sub-components (`VExampleItem`, `VExampleGroup`) live in the same folder and share its `index.ts`. Local composables are not exported from `index.ts`.

## Skeleton

```tsx
export const makeVExampleProps = propsFactory({
  label: String,
  modelValue: Boolean,
  items: {
    type: Array as PropType<readonly ExampleItem[]>,
    default: () => ([]),
  },

  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VExample')

export const VExample = genericComponent<VExampleSlots>()({
  name: 'VExample',

  props: makeVExampleProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const model = useProxiedModel(props, 'modelValue')

    useRender(() => (
      <props.tag
        class={['v-example', themeClasses.value, props.class]}
        style={ props.style }
      >
        { slots.default?.() ?? props.label }
      </props.tag>
    ))

    return {}
  },
})
```

- `genericComponent` applies global and `VDefaultsProvider` defaults — don't call `useDefaults` in a component
- `useProxiedModel` for every v-model, controlled or not
- Prop type assertions go inline: `type: X as PropType<…>`
- No utility classes (`d-flex`, `ma-2`, `text-center`) in component markup — users can disable or override utilities. Style through the component's own `.sass`

## Passing props down

Composables and children need the reactive source, not a snapshot. An unwrapped value is read once in `setup` and never updates.

```ts
// ❌ reads once
useTextColor(props.color)
provideDefaults({ VExampleItem: { color: props.color } })

// ✅
useTextColor(() => props.color)
useDensity(props)
provideDefaults({ VExampleItem: { color: toRef(() => props.color) } })
```

Forward props to a wrapped component with its `filterProps`:

```tsx
const fieldProps = VExampleField.filterProps(props)
// …
<VExampleField { ...fieldProps } />
```

## Parent ↔ child

- `provide`/`inject` with an exported `Symbol.for('vuetify:v-example-group')` key, never a string
- Selection between parent and items: `useGroup` / `useGroupItem` before building anything new
- Pushing props to nested components: `provideDefaults` or `<VDefaultsProvider>`

## Adding a prop

- `packages/docs/src/data/new-in.json` — add `"propName": "<next minor>"` under the component (`props`, `slots`, `events` or `exposed`)
- `packages/api-generator/src/locale/en/VExample.json` — description. Props from a shared composable go in that composable's file (`border.json`, `elevation.json`). Don't restate the default, the API table already shows it
- Docs example when the prop needs one: `packages/docs/src/examples/v-example/prop-<name>.vue`, referenced from the page with `<ExamplesExample file="v-example/prop-<name>" />`

## Adding a component

New components start in labs.

- `src/labs/VExample/` with the anatomy above
- `src/labs/VExample/index.ts` — **components only**. Re-exporting composables, utils or types from a component barrel breaks api-generator
- `src/labs/components.ts` — `export * from './VExample'`
- New translation keys in **every** `src/locale/*.ts` — recent commits ship real translations, not English copies
- `packages/api-generator/src/locale/en/VExample.json`
- Docs:
  - page in `packages/docs/src/pages/en/components/`
  - examples in `packages/docs/src/examples/v-example/`: `usage.vue`, `prop-*`, `slot-*`, `event-*`, `misc-*`
  - `packages/docs/src/data/nav.json`
  - `packages/docs/src/data/page-to-api.json`
  - list it in `packages/docs/src/pages/en/labs/introduction.md`
