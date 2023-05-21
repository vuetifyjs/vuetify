---
nav: Selection
meta:
  title: Data table - Selection
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics/
  - /components/tables/
---

# Data table - Selection

## Item value

For the selection feature to work, the data table must be able to differentiate each row in the data set. This is done using the **item-value** prop. It designates a property on the item that should contain a unique value. By default the property it looks for is `id`.

You can also supply a function, if for example the unique value needs to be a composite of several properties. The function receives each item as its first argument.

<example file="v-data-table/prop-item-value" />

## Selected values

The current selection of the data-table can be accessed through the **v-model** prop. The array will consist of the unique values found in the property you set using the **item-value** prop (or the value returned by the function you passed). You can use **return-object** prop if you want the array to consist of the actual objects instead.

<example file="v-data-table/prop-return-object" />

<entry />

## Examples

### Selectable rows

Use the **item-selectable** prop to designate a property on your items that controls if the item should be selectable or not.

<example file="v-data-table/prop-item-selectable" />

### Select strategies

Data-tables support three different select strategies.

|Strategy|Description|
|-|-|
|`'single'`|Only a single row can be selected. The select all checkbox in the header is not shown|
|`'page'`|Multiple rows can be selected. Clicking on the select all checkbox in the header selects all (selectable) rows on the current page|
|`'all'`|Multiple rows can be selected. Clicking on the select all checkbox in the header selects all (selectable) rows in the entire data set|

<example file="v-data-table/prop-select-strategy" />
