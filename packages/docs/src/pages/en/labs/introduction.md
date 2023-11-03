---
meta:
  nav: Introduction
  title: Introduction to Labs
  description: A collection of in-development components for testing purposes before final release
  keywords: labs
related:
  - /getting-started/installation/
  - /getting-started/browser-support/
  - /introduction/sponsors-and-backers/
---

# Vuetify Labs

Experiment and use in-development components before they're released.

![Labs Entry](https://cdn.vuetifyjs.com/docs/images/entry/labs-entry.png)

----

<entry />

## What is Labs? { id=what-is-labs }

Labs is a new way for developers to use unfinished components in an alpha state.

::: error
Components available through Labs are considered **NOT** production ready and only to be used for testing purposes. Breaking changes will be introduced in patch releases and no support will be provided.
:::

## Usage

Using a Labs component is as simple as importing from `vuetify/labs`. The following example shows how to import and bootstrap `v-data-table` in your component:

```html
<template>
  <v-data-table />
</template>

<script setup>
  import { VDataTable } from 'vuetify/labs/VDataTable'
</script>
```

Alternatively you can make the component available globally by importing it in your Vuetify plugin file:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default createVuetify({
  components: {
    VDataTable,
  },
})
```

When Vuetify instantiates it will register `VDataTable` as a usable component within templates.

If you wish to install all available Vuetify components use the following code snippet:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'

export default createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
})
```

<promoted slug="vuetify-discord" />

## Available Components

The following is a list of available and up-and-coming components for use with Labs:

| Component | Description | Min Version |
| - | - | - |

### Up Next

| Component | Release Target |
| - | - |
| v-calendar | ~~Q1~~ ~~Q2~~ Soon™️ 2023 |

::: warning
Lab component APIs are **NOT** finalized and can and will change. You should **EXPECT** for things to break during the course of development.
:::
