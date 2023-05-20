---
nav: Basics
meta:
  title: Data table component
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/paginations/
  - /components/tables/
  - /components/lists/
---

# Data tables

The `v-data-table` component is used for displaying tabular data. Features include sorting, searching, pagination, grouping, and row selection.

## Usage

There are three variants of the data table available depending on your requirements.

<entry />

### v-data-table

The standard data table presumes that the entire data set is available locally. Sorting, pagination, and filtering is supported and done internally by the component itself.

<example file="v-data-table/usage" />

### v-data-table-server

This variant of the data table is meant to be used when the data set you are displaying comes directly from a server, and you don't want to load all rows at mount. Sorting, pagination, and filtering is supported, but none of it is handled by the component. Instead it is meant to be handled by the server.

You can find more information and examples [here](/components/data-tables/server-side-tables).

<example file="v-data-table/server" />

### v-data-table-virtual

The virtual variant of the data table relies, like the standard variant, on all data being available locally. But unlike the standard variant it uses virtualization to only render a small portion of the rows. This makes it well suited for displaying large data sets. It supports sorting and filtering, but not pagination.

You can find more information and examples [here](/components/data-tables/virtual-tables).

<example file="v-data-table/virtual" />

## API

| Component | Description |
| - | - |
| [v-data-table](/api/v-data-table/) | Primary Component |
| [v-data-table-server](/api/v-data-table-server/) | Specialized Data-table for displaying results from a server |
| [v-data-table-virtual](/api/v-data-table-virtual/) | Data-table with built in row virtualization |
| [v-data-table-footer](/api/v-data-table-footer/) | Functional Component used to display Data-table headers |
| [v-checkbox-btn](/api/v-checkbox-btn/) | Reusable lightweight [v-checkbox](/components/checkboxes) |

<api-inline hide-links />

## Examples

### Props

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

#### Item

You can use the dynamic slots `item.<key>` to customize only certain columns. `<key>` is the name of the **key** property in header items sent to **headers**. So to customize the calories column we're using the `item.calories` slot.

<example file="v-data-table/slot-item-key" />

#### Simple checkbox

When wanting to use a checkbox component inside of a slot template in your data tables, use the `v-checkbox-btn` component rather than the `v-checkbox` component. The `v-checkbox-btn` component is used internally and will respect header alignment.

<example file="v-data-table/slot-simple-checkbox" />

### Misc

#### CRUD Actions

`v-data-table` with CRUD actions using a `v-dialog` component for editing each row

<example file="v-data-table/misc-crud" />

<!-- #### Edit dialog

The `v-edit-dialog` component can be used for editing data directly within a `v-data-table`. You can block the closing of the `v-edit-dialog` when clicked outside by adding the **persistent** prop.

<example file="v-data-table/misc-edit-dialog" /> -->

#### Expandable rows

The **show-expand** prop will render an expand icon on each row. You can customize this with the `item.data-table-expand` slot. The position of this slot can be changed by adding a column with `key: 'data-table-expand'` to the headers array.

Just like selection, row items require a unique property on each item for expansion to work. The default is `id`, but you can use the **item-value** prop to specify a different item property.

<!-- You can also switch between allowing multiple expanded rows at the same time or just one with the **single-expand** prop. The expanded rows are available on the synced prop `expanded.sync`.  -->

<example file="v-data-table/misc-expand" />
