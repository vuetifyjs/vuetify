---
nav: Introduction
meta:
  title: Introduction to Labs
  description: A collection of in-development components for testing purposes before final release
  keywords: labs
related:
  - /getting-started/installation/
  - /getting-started/browser-support/
  - /components/all/
---

# Vuetify Labs

Experiment and use in-development components before they're released.

![Labs Entry](https://cdn.vuetifyjs.com/docs/images/entry/labs-entry.png)

----

## What is Labs? {id=what-is-labs}

Labs is a new way for developers to use unfinished components in an alpha state.

<alert type="error">

Components available through Labs are considered **NOT** production ready and only to be used for testing purposes. Breaking changes will be introduced in patch releases and no support will be provided.

</alert>

## Usage

Using a Labs component is as simple as importing from `vuetify/labs`. The following example shows how to import and bootstrap the `v-data-table` component with your Vuetify instance:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default createVuetify({
  components: {
    VDataTable,
  }
})
```

When Vuetify instantiates it will register `VDataTable` as a usable component within templates. This also allows you to define [Global Default](/features/global-configuration/) properties.

The following example configures the default values for the **fixedHeader** and **noDataText** props:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default createVuetify({
  components: {
    VDataTable,
  }
  defaults: {
    VDataTable: {
      fixedHeader: true,
      noDataText: 'Results not found',
    },
  },
})
```

If you wish to install all Labs components, use the following code snippet:

```js { resource="src/plugins/vuetify.js"}
import { createVuetify } from 'vuetify'
import * as labs from 'vuetify/labs/components'

export default createVuetify({
  components: {
    ...labs,
  }
})
```

<promoted slug="vuetify-discord" />

## Available Components

The following is a list of available and up-and-coming components for use with Labs:

### Data Table

| Component | Description |
| - | - |
| v-data-table | Primary Component |
| v-data-table-server | Data table component for handling data from a remote server |
| v-data-table-virtual | Data table component for handling large amounts of rows |
| v-data-table-row | ... |
| v-data-table-rows | ... |
| v-data-table-column | ... |

### Up Next

| Component | Release Target |
| - | --: |
| v-date-picker | Q2 2023 |
| v-calendar | Q1 2023

<alert type="warning">

Lab component APIs are **NOT** finalized and can and will change. You should **EXPECT** for things to break during the course of development.

</alert>
