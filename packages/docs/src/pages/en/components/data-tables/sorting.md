---
nav: Sorting
meta:
  title: Data table - Sorting
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics
  - /components/tables/
---

# Data table - Sorting

Lorem ipsum etc etc

## Examples

### Multi sort

Using the **multi-sort** prop will enable you to sort on multiple columns at the same time. When enabled, you can pass arrays to both **sort-by** and **sort-desc** to programmatically control the sorting, instead of single values.

<example file="v-data-table/prop-multi-sort" />

### External sorting

Sorting can also be controlled externally by using the individual props, or by using the the **options** prop. Remember that you must apply the **.sync** modifier.

<example file="v-data-table/misc-external-sort" />
