---
nav: Introduction
meta:
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

<alert type="error">

Components available through Labs are considered **NOT** production ready and only to be used for testing purposes. Breaking changes will be introduced in patch releases and no support will be provided.

</alert>

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

| Component | Description |
| - | - |
| **Data table** | [Basics](/components/data-tables/basics/) - [Headers](/components/data-tables/headers/) - [Sorting](/components/data-tables/sorting/) - [Pagination](/components/data-tables/pagination/) - [Filtering](/components/data-tables/filtering/) - [Grouping](/components/data-tables/grouping/) |
| [v-data-table](/api/v-data-table/) | Primary Component |
| [v-data-table-server](/api/v-data-table-server/) | Data table component for handling data from a remote server |
| [v-data-table-virtual](/api/v-data-table-virtual/) | Data table component for handling large amounts of rows |
| [v-data-table-row](/api/v-data-table-row/) | Data table reusable row component |
| [v-data-table-rows](/api/v-data-table-rows/) | Data table reusable rows component |
| [v-data-table-column](/api/v-data-table-column/) | Data table reusable column component |
| **Skeleton loader** | [Usage](/components/skeleton-loaders/) |
| [v-skeleton-loader](/api/v-skeleton-loader/) | Primary Component |
| **Infinite scroll** | [Usage](/components/infinite-scroller/) |
| [v-infinite-scroll](/api/v-infinite-scroll/) | Primary Component |
| **Bottom sheet** | [Usage](/components/bottom-sheets/) |
| [v-bottom-sheet](/api/v-bottom-sheet/) | Primary Component |

### Up Next

| Component | Release Target |
| - | - |
| v-infinite-scroll | April 2023 |
| v-calendar | ~~Q1~~* Q2 2023 |
| v-date-picker | Q2 2023 |

<small>*Q1 2023 was the original target, but due to the complexity of the component, it has been pushed back to Q2 2023.</small>

<alert type="warning">

Lab component APIs are **NOT** finalized and can and will change. You should **EXPECT** for things to break during the course of development.

</alert>
