---
nav: Filtering
meta:
  title: Data table - Filtering
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics/
  - /components/data-tables/pagination/
  - /components/tables/
---

# Data table - Filtering

Data table filtering is key feature that allows users to quickly find the data they are looking for.

<entry />

## Examples

### Search

The data table exposes a **search** prop that allows you to filter your data.

<example file="v-data-table/prop-search" />

<!-- ### Filterable

You can easily disable specific columns from being included when searching through table rows by setting the property **filterable** to false on the header item(s). In the example below the dessert name column is no longer searchable.

<example file="v-data-table/prop-filterable" /> -->

### Custom filter

You can override the default filtering used with the **search** prop by supplying a function to the **custom-filter** prop. You can see the signature of the function below.

```ts
(value: string, query: string, item?: any) => boolean | number | [number, number] | [number, number][]
```

In the example below, the custom filter will only match inputs that are in completely in upper case.

<example file="v-data-table/prop-custom-filter" />
