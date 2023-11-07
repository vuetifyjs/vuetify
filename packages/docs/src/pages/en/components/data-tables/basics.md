---
meta:
  nav: Basics
  title: Data table component
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/paginations/
  - /components/tables/
  - /components/lists/
features:
  github: /components/VDataTable/
  label: 'C: VDataTable'
  report: true
  spec: https://m2.material.io/components/data-tables
---

# Data tables

The `v-data-table` component is used for displaying tabular data. Features include sorting, searching, pagination, grouping, and row selection.

<page-features />

## Usage

The standard data table presumes that the entire data set is available locally. Sorting, pagination, and filtering is supported and done internally by the component itself.

<usage name="v-data-table" />

<entry />

## API

| Component | Description |
| - | - |
| [v-data-table](/api/v-data-table/) | Primary Component |
| [v-data-table-footer](/api/v-data-table-footer/) | Functional Component used to display Data-table headers |
| [v-checkbox-btn](/api/v-checkbox-btn/) | Reusable lightweight [v-checkbox](/components/checkboxes) |

<api-inline hide-links />

### Server side tables

This variant of the data table is meant to be used when the data set you are displaying comes directly from a server, and you don't want to load all rows at mount. Sorting, pagination, and filtering is supported, but none of it is handled by the component. Instead it is meant to be handled by the server.

Find more information and examples on the [Server side tables](/components/data-tables/server-side-tables) page.

<example file="v-data-table/server" />

### Virtual tables

The virtual variant of the data table relies, like the standard variant, on all data being available locally. But unlike the standard variant it uses virtualization to only render a small portion of the rows. This makes it well suited for displaying large data sets. It supports sorting and filtering, but not pagination.

Find more information and examples on the [Virtual tables](/components/data-tables/virtual-tables) page.

<example file="v-data-table/virtual" />

## Guide

The `v-data-table` component is a simple and powerful table manipulation component. It is perfect for showing large amounts of tabular data.

### Props

There are no shortable of properties available for customizing various aspects of the Data table components.

#### Density

Using the **dense** prop you are able to give your data tables an alternate style.

<example file="v-data-table/prop-dense" />

<!-- #### Footer props

The `v-data-table` renders a default footer using the `v-data-footer` component. You can pass props to this component using **footer-props**.

<example file="v-data-table/prop-footer-props" /> -->

<!-- #### Hide default header and footer

You can apply the **hide-default-header** and **hide-default-footer** props to remove the default header and footer respectively.

<example file="v-data-table/prop-hide-header-footer" /> -->

#### Selection

The **show-select** prop will render a checkbox in the default header to toggle all rows, and a checkbox for each row.

For more information and examples, see the [selection](/components/data-tables/selection) page.

<example file="v-data-table/prop-row-selection" />

#### Simple checkbox

When wanting to use a checkbox component inside of a slot template in your data tables, use the `v-checkbox-btn` component rather than the `v-checkbox` component. The `v-checkbox-btn` component is used internally and will respect header alignment.

<example file="v-data-table/slot-simple-checkbox" />

### Slots

#### Column slot

You can use the dynamic slots `column.<key>` to customize only certain columns. `<key>` corresponds to the **key** property in the items found in the **headers** prop.

::: info

There are two built-in slots for customizing both the select (`column.data-table-select`) and expand (`column.data-table-expand`) columns when using **show-select** and **show-expand** props respectively.

:::

<example file="v-data-table/slot-header" />

#### Headers slot

You can also override all the internal headers by using the `headers` slot. Remember that you will have to re-implement any internal functionality like sorting.

<example file="v-data-table/slot-headers" />

#### Item slot

Normally you would use the `item.<key>` slots to render custom markup in specific columns. If you instead need more control over the entire row, you can use the `item` slot.

<example file="v-data-table/slot-item" />

#### Item key slot

You can use the dynamic slots `item.<key>` to customize only certain columns. `<key>` is the name of the **key** property in header items sent to **headers**. So to customize the calories column we're using the `item.calories` slot.

<example file="v-data-table/slot-item-key" />

#### Group header slot

When using the **group-by** prop, you can customize the group header with the `group-header` slot.

<example file="v-data-table/slot-group-header" />

## Headers and columns

In Data table components, **headers** and **columns** serve unique purposes. You supply **headers** to the component as either a single or double array, defining one or more header rows. Whereas **columns** represent a single array extracted from the final row of headers, denoting the actual columns in the table.

For example, the following code snippet is a basic header array:

```javascript
const headers = [
  {
    text: 'Pyramid',
    align: 'start',
    sortable: false,
    value: 'name'
  },
  { text: 'Location', value: 'location' },
  { text: 'Height (m)', value: 'height' },
  { text: 'Base (m)', value: 'base' },
  { text: 'Volume (cu m)', value: 'volume' },
  { text: 'Construction Date', value: 'constructionDate' },
]
```

Consider the following `data-table` with multi-row headers utilizing `colspan` and `rowspan` attributes. The **Properties** header isn't included in the **columns** array since it's not in the last row. Conversely, **Dessert (100g serving)** is included because it extends across both rows with `rowspan`.

<example file="v-data-table/headers-multiple" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-data-table` component.

### CRUD Actions

`v-data-table` with CRUD actions using a `v-dialog` component for editing each row

<example file="v-data-table/misc-crud" />

### Expandable rows

The **show-expand** prop will render an expand icon on each row. You can customize this with the `item.data-table-expand` slot. The position of this slot can be changed by adding a column with `key: 'data-table-expand'` to the headers array.

Just like selection, row items require a unique property on each item for expansion to work. The default is `id`, but you can use the **item-value** prop to specify a different item property.

<example file="v-data-table/misc-expand" />
