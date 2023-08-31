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
| **Bottom sheet** | [Usage](/components/bottom-sheets/) | [v3.3.0 (Icarus)](/getting-started/release-notes/?version=v3.3.0) |
| [v-bottom-sheet](/api/v-bottom-sheet/) | Primary Component | |
| **Data iterators** | [Usage](/components/data-itterators/) | [v3.3.0 (Icarus)](/getting-started/release-notes/?version=v3.3.0) |
| [v-data-iterator](/api/v-data-iterator/) | Primary Component | |
| **Data table** | [Basics](/components/data-tables/basics/) - [Headers](/components/data-tables/headers/) - [Sorting](/components/data-tables/sorting/) - [Pagination](/components/data-tables/pagination/) - [Filtering](/components/data-tables/filtering/) - [Grouping](/components/data-tables/grouping/) | [v3.1.0 (Valkyrie)](/getting-started/release-notes/?version=v3.1.0) |
| [v-data-table](/api/v-data-table/) | Primary Component | |
| [v-data-table-server](/api/v-data-table-server/) | Data table component for handling data from a remote server | |
| [v-data-table-virtual](/api/v-data-table-virtual/) | Data table component for handling large amounts of rows | |
| [v-data-table-row](/api/v-data-table-row/) | Data table reusable row component | |
| [v-data-table-rows](/api/v-data-table-rows/) | Data table reusable rows component | |
| [v-data-table-column](/api/v-data-table-column/) | Data table reusable column component | |
| **Dates** | [Usage](/features/dates/) | [v3.2.0 (Orion)](/getting-started/release-notes/?version=v3.2.0) |
| [useDate](/api/use-date/) | The date composable is used by components that require date functionality | |
| **Date picker** | [Usage](/components/date-pickers/) | [v3.3.4 (Icarus)](/getting-started/release-notes/?version=v3.3.4) |
| [v-date-picker](/api/v-date-picker/) | Primary Component | |
| **Infinite scroll** | [Usage](/components/infinite-scroller/) | [v3.2.0 (Orion)](/getting-started/release-notes/?version=v3.2.0) |
| [v-infinite-scroll](/api/v-infinite-scroll/) | Primary Component | |
| **OTP input** | [Usage](/components/otp-input/) | [v3.3.11 (Icarus)](/getting-started/release-notes/?version=v3.3.11) |
| [v-otp-input](/api/v-otp-input/) | Primary Component | |
| **Skeleton loader** | [Usage](/components/skeleton-loaders/) | [v3.2.0 (Orion)](/getting-started/release-notes/?version=v3.2.0) |
| [v-skeleton-loader](/api/v-skeleton-loader/) | Primary Component | |
| **Steppers** | [Usage](/components/steppers/) | [v3.3.11 (Icarus)](/getting-started/release-notes/?version=v3.3.11) |
| [v-stepper](/api/v-stepper/) | Primary Component | |
| [v-stepper-header](/api/v-stepper-header/) | Container for stepper items | |
| [v-stepper-item](/api/v-stepper-item/) | Primary Component | |
| [v-stepper-window](/api/v-stepper-window/) | Window container for stepper window items | |
| [v-stepper-window-item](/api/v-stepper-window-item/) | Items for stepper window | |

### Up Next

| Component | Release Target |
| - | - |
| v-calendar | ~~Q1~~* Q2 2023 |

<small>*Q1 2023 was the original target, but due to the complexity of the component, it has been pushed back to Q2 2023.</small>

::: warning
Lab component APIs are **NOT** finalized and can and will change. You should **EXPECT** for things to break during the course of development.
:::
