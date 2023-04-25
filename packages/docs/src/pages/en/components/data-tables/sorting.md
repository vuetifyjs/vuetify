---
nav: Sorting
meta:
  title: Data table - Sorting
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics/
  - /components/tables/
---

# Data table - Sorting

Data tables can sort rows by a column value.

<entry />

## Examples

### Basic sorting

The sorting of your table can be controlled by the **sort-by** prop. This prop takes an array of objects, where each object has a **key** and **order** property, describing how the table is to be sorted.

The **key** corresponds to a column defined in the **headers** array, and **order** is either the string `'asc'` or `'desc'` indicating the order in which the items are sorted.

Unless you are using the **multi-sort** prop seen below, this array will almost always just have a single object in it.

<example file="v-data-table/prop-sort-by" />

### Multi sort

Using the **multi-sort** prop will enable you to sort on multiple columns at the same time.

<example file="v-data-table/prop-multi-sort" />
