---
emphasized: true
meta:
  nav: Snackbar Queue
  title: Snackbar Queue component
  description: test
  keywords: test
related:
  - /components/buttons/
  - /components/snackbars/
  - /components/defaults-providers/
features:
  github: /components/VSnackbarQueue/
  label: 'C: VSnackbarQueue'
  report: true
  spec: https://m3.material.io/components/snackbar
---

# Snackbar Queue

The `v-snackbar-queue` component is used to display a sequence of messages to the user.

<PageFeatures />

<DocIntroduced version="3.8.0" />

## Usage

Messages are passed as an array of strings to `v-model`, when a message is displayed it will be removed from the start of the array.

<ExamplesUsage name="v-snackbar-queue" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-snackbar-queue](/api/v-snackbar-queue/) | Primary Component |
| [v-snackbar](/api/v-snackbar/) | The actual Snackbar Component |

<ApiInline hide-links />

## Examples

::: info
Some examples below use the **contained** prop and direct **z-index** values to keep snackbars scoped within the example preview. In a real application you typically don't need either — snackbars render in the application overlay by default.
:::

### Props

#### Total visible

The **total-visible** prop controls how many snackbars are shown simultaneously, stacked vertically with automatic offset. The **display-strategy** prop determines what happens when the queue exceeds this limit: `"hold"` (default) pauses the queue until a visible slot opens, while `"overflow"` immediately shows new messages and dismisses the oldest ones. Enable the **collapsed** prop to visually compress the stack into a single snackbar with a counter badge.

<ExamplesExample file="v-snackbar-queue/prop-total-visible" />

#### Transition

Use the **transition** prop to change the enter/leave animation. If you pass CSS-based animation with suffix `*-auto` (e.g. `"slide-auto"`, `"scroll-auto"`) the effective transition will be location-aware. To present it more clearly, the example below uses custom "bouncy-slide" transition.

<ExamplesExample file="v-snackbar-queue/prop-transition" />

### Misc

#### Promise

Messages can include a **promise** property along with **success** and **error** callbacks. The snackbar shows a loading state until the promise resolves or rejects, then updates accordingly.

<ExamplesExample file="v-snackbar-queue/misc-promise" />

### Additional props

Snackbar props can be set either on the queue to apply to all messages:

```html
<v-snackbar-queue timeout="2000" color="error" />
```

Or individual messages as objects:

```js
queue.push({
  text: text.value,
  timeout: 2000,
  color: 'error',
})
```

### Global state

You can use pinia or vuex to display messages from any component:

```js { resource="stores/messages.js" }
export const useMessagesStore = defineStore('messages', () => {
  const queue = ref([])
  function add (message) {
    queue.push(message)
  }

  return { queue, add }
})
```

```html { resource="App.vue" }
<template>
  <v-app>
    <router-view></router-view>

    <v-snackbar-queue v-model="messages.queue"></v-snackbar-queue>
  </v-app>
</template>

<script setup>
  const messages = useMessagesStore()
</script>
```

```html { resource="pages/error.vue" }
<script setup>
  const messages = useMessagesStore()

  function onError (err) {
    messages.add({ text: err.message, color: 'error' })
  }
</script>
```
