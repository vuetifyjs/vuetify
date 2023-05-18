---
nav: Virtual tables
meta:
  title: Data table - Virtual tables
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics/
  - /components/data-tables/server-side-tables/
  - /components/tables/
---

# Data table - Virtual tables

The v-data-table-virtual component relies on all data being available locally. But unlike the standard data-table it uses virtualization to only render a small portion of the rows. This makes it well suited for displaying large data sets. It supports sorting and filtering, but not pagination.

## Examples

### Basic example

<example file="v-data-table/virtual" />
