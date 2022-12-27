---
nav: Filtering
meta:
  title: Data table - Filtering
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics
  - /components/tables/
---

# Data table - Filtering

Lorem ipsum etc etc

## Examples

### Search

The data table exposes a **search** prop that allows you to filter your data.

<example file="v-data-table/prop-search" />

<!-- ### Filterable

You can easily disable specific columns from being included when searching through table rows by setting the property **filterable** to false on the header item(s). In the example below the dessert name column is no longer searchable.

<example file="v-data-table/prop-filterable" /> -->

### Custom filter

You can override the default filtering used with **search** prop by supplying a function to the **custom-filter** prop. If you need to customize the filtering of a specific column, you can supply a function to the **filter** property on header items. The signature is `(value: any, search: string | null, item: any) => boolean`. This function will always be run even if **search** prop has not been provided. Thus you need to make sure to exit early with a value of `true` if filter should not be applied.

<example file="v-data-table/prop-custom-filter" />
