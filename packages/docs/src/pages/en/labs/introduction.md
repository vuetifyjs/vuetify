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

<PageFeatures />

## What is Labs? { id=what-is-labs }

Labs is a new way for developers to use unfinished components in an alpha state.

::: error
Components available through Labs are considered **NOT** production ready and only to be used for testing purposes. Breaking changes will be introduced in patch releases and no support will be provided.
:::

## Usage

Using a Labs component is as simple as importing from `vuetify/labs`. The following example shows how to import and bootstrap `v-picker` in your component:

```html
<template>
  <v-picker />
</template>

<script setup>
  import { VPicker } from 'vuetify/labs/VPicker'
</script>
```

Alternatively you can make the component available globally by importing it in your Vuetify plugin file:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VPicker } from 'vuetify/labs/VPicker'

export default createVuetify({
  components: {
    VPicker,
  },
})
```

When Vuetify instantiates it will register `VPicker` as a usable component within templates.

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

<PromotedEntry />

## Available Components

The following is a list of available and up-and-coming components for use with Labs:

| Component | Description | Min Version |
| - | - | - |
| [v-calendar](/components/calendars/) | A calendar component | [v3.4.9](/getting-started/release-notes/?version=v3.4.9) |
| [v-empty-state](/components/empty-states/) | A component for displaying empty states | [v3.5.7](/getting-started/release-notes/?version=v3.5.7) |
| [v-fab](/components/floating-action-buttons/) | A layout aware [v-btn](/components/buttons/) | [v3.5.7](/getting-started/release-notes/?version=v3.5.7) |
| [v-number-input](/components/number-input/) | A component for numerical data | [v3.5.10](/getting-started/release-notes/?version=v3.5.10) |
| [v-speed-dial](/components/speed-dials/) | A component for display actions | [v3.5.8](/getting-started/release-notes/?version=v3.5.8) |
| [v-sparkline](/components/sparklines/) | A basic data display component | [v3.5.5](/getting-started/release-notes/?version=v3.5.5) |
| [v-time-picker](/components/time-pickers/) | A time-picker component | [v3.5.12](/getting-started/release-notes/?version=v3.5.12) |
| [v-treeview](/components/treeview/) | A treeview component | [v3.5.9](/getting-started/release-notes/?version=v3.5.9) |

::: warning
Lab component APIs are **NOT** finalized and can and will change. You should **EXPECT** for things to break during the course of development.
:::
