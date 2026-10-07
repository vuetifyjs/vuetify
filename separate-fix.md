# VToolbar: slot invoked outside of the render function

Any VToolbar or VAppBar with an `#extension` slot logs this in dev, with or without SSR:

```
[Vue warn]: Slot "extension" invoked outside of the render function: this will not track dependencies used in the slot.
  at <VToolbar class="v-app-bar" ...>
```

It comes from the setup in `packages/vuetify/src/components/VToolbar/VToolbar.tsx`:

```ts
const isExtended = shallowRef(props.extended === null ? !!(slots.extension?.()) : props.extended)
```

The render function already recomputes it from the real slot output before anything reads the heights:

```ts
const extension = slots.extension?.()
isExtended.value = props.extended === null ? !!extension : props.extended
```

So the initial value only needs a guess. Check whether the slot exists instead of calling it:

```ts
const isExtended = shallowRef(props.extended ?? !!slots.extension)
```

When the slot exists but renders nothing (`v-if` false inside it), the initial value is `true` and render corrects it to `false`. Nothing reads `extensionHeight` before the first render: VAppBar reads it through the VToolbar ref, which is only set after mount, and it falls back to `useToolbarHeight` until then.

Repro: an app bar with `<template #extension>`. It's case 15 in the layout SSR playground (`c15-bar-0`).

Base: `master`. It's a dev-only warning and the change has no visual effect.
