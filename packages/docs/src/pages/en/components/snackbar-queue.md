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
  spec: https://m2.material.io/components/snackbars
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
