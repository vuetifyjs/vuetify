---
nav: Server side tables
meta:
  title: Data table - Server side tables
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics/
  - /components/data-tables/virtual-tables/
  - /components/tables/
---

# Data table - Server side tables

Server-side Data tables are used for showing data coming from an API.

<entry />

## Examples

### Server-side paginate and sort

To use data from an API, listen to the **@update:options** event to know when to fetch new data. Use the **loading** prop to display a progress bar while fetching the data.

<example file="v-data-table/misc-server-side-paginate-and-sort" />

### Server-side search

If you need to support search functionality, use the **search** prop to let the table know when new search input is available. Since the table does not actually do any filtering on its own, the **search** input does not need to be the actual value being searched for. In this example we have multiple values searchable, so we just make sure to set **search** to _anything_ when we need to fetch new data.

<example file="v-data-table/server-search" />

### Loading

You can use the **loading** prop to indicate that data in the table is currently loading. If there is no data in the table, a loading message will also be displayed. This message can be customized using the **loading-text** prop or the `loading` slot.

<example file="v-data-table/prop-loading" />
