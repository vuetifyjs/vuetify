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

Lorem ipsum etc etc

## Examples

### Server-side paginate and sort

If you're loading data already paginated and sorted from a backend, you can use the **server-items-length** prop. Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the available events (`update:page`, `update:sortBy`, `update:options`, etc) to know when to request new pages from your backend. Use the **loading** prop to display a progress bar while fetching data.

<example file="v-data-table/misc-server-side-paginate-and-sort" />

### Loading

You can use the **loading** prop to indicate that data in the table is currently loading. If there is no data in the table, a loading message will also be displayed. This message can be customized using the **loading-text** prop or the `loading` slot.

<example file="v-data-table/prop-loading" />
