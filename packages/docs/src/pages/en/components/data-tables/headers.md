---
nav: Headers
meta:
  title: Data table - Headers
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics/
  - /components/selects/
  - /components/tables/
---

# Data table - Headers

Headers are used to define the columns of the table.

<entry />

## TODO:

- Headers is the entire section above body (but below top), possibly multiple rows
- Columns are addressable (has key) and show data and/or other rendered content. Is always a 1-dimensional array.

## Examples

### Column slot

You can use the dynamic slots `column.<key>` to customize only certain columns. `<key>` corresponds to the **key** property in the items found in the **headers** prop.

<example file="v-data-table/slot-header" />

### Headers slot

You can also override all the internal headers by using the `headers` slot. Remember that you will have to re-implement any internal functionality like sorting.

<example file="v-data-table/slot-headers" />
