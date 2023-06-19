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

## Headers and columns

In all of the data-table components, we differentiate between **headers** and **columns**. When you use a data-table component, you provide it with **headers**, which is either a 1- or 2-dimensional array of items describing one or more rows of headers in the table. The **columns** of a data-table component are a subset of the headers, but is always a 1-dimensional array, and consists of those items that are part of the last row.

Here is a data-table that uses multiple rows of headers to make use of the colspan and rowspan features. The **Properties** cell is not part of the **columns** array, because it is not a part of the last row, while the **Dessert (100g serving)** cell is, because it used **rowspan** to span both rows.

<example file="v-data-table/headers-multiple" />

## Examples

### Column slot

You can use the dynamic slots `column.<key>` to customize only certain columns. `<key>` corresponds to the **key** property in the items found in the **headers** prop.

<alert type="info">

  There are two built-in slots for customizing both the select (`column.data-table-select`) and expand (`column.data-table-expand`) columns when using **show-select** and **show-expand** props respectively.

</alert>

<example file="v-data-table/slot-header" />

### Headers slot

You can also override all the internal headers by using the `headers` slot. Remember that you will have to re-implement any internal functionality like sorting.

<example file="v-data-table/slot-headers" />
