---
meta:
  title: Data table component
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-iterators/
  - /components/simple-tables/
  - /components/lists/
---

# Data tables

The `v-data-table` component is used for displaying tabular data. Features include sorting, searching, pagination, content-editing, and row selection.

<promoted-ad slug="vuetify-lux-admin-pro" />

## Usage

The standard data-table will by default render your data as simple rows.

<example file="v-data-table/usage" />

## API

- [v-data-table](/api/v-data-table)
- [v-data-table-header](/api/v-data-table-header)
- [v-data-footer](/api/v-data-footer)
- [v-edit-dialog](/api/v-edit-dialog)
- [v-simple-checkbox](/api/v-simple-checkbox)

<!-- ## Sub-components

### v-data-table-header

v-data-table-header description

### v-data-footer

v-data-footer description

### v-edit-dialog

v-edit-dialog description

### v-simple-checkbox

v-simple-checkbox description -->

## Examples

### Props

#### Custom filter

You can override the default filtering used with **search** prop by supplying a function to the **custom-filter** prop. If you need to customize the filtering of a specific column, you can supply a function to the **filter** property on header items. The signature is `(value: any, search: string | null, item: any) => boolean`. This function will always be run even if **search** prop has not been provided. Thus you need to make sure to exit early with a value of `true` if filter should not be applied.

<example file="v-data-table/prop-custom-filter" />

#### Dense

Using the **dense** prop you are able to give your data tables an alternate style.

<example file="v-data-table/prop-dense" />

#### Filterable

You can easily disable specific columns from being included when searching through table rows by setting the property **filterable** to false on the header item(s). In the example below the dessert name column is no longer searchable.

<example file="v-data-table/prop-filterable" />

#### Footer props

The `v-data-table` renders a default footer using the `v-data-footer` component. You can pass props to this component using **footer-props**.

<example file="v-data-table/prop-footer-props" />

#### Grouping

Using the **group-by** and **group-desc** props you can group rows on an item property. The **show-group-by** prop will show a group button in the default header. You can use the **groupable** property on header items to disable the group button.

<example file="v-data-table/prop-grouping" />

#### Hide default header and footer

You can apply the **hide-default-header** and **hide-default-footer** props to remove the default header and footer respectively.

<example file="v-data-table/prop-hide-header-footer" />

#### Loading

You can use the **loading** prop to indicate that data in the table is currently loading. If there is no data in the table, a loading message will also be displayed. This message can be customized using the **loading-text** prop or the `loading` slot.

<example file="v-data-table/prop-loading" />

#### Multi sort

Using the **multi-sort** prop will enable you to sort on multiple columns at the same time. When enabled, you can pass arrays to both **sort-by** and **sort-desc** to programmatically control the sorting, instead of single values.

<example file="v-data-table/prop-multi-sort" />

#### Row selection

The **show-select** prop will render a checkbox in the default header to toggle all rows, and a checkbox for each default row. You can customize these with the slots `header.data-table-select` and `item.data-table-select` respectively. You can also switch between allowing multiple selected rows at the same time or just one with the **single-select** prop.

<example file="v-data-table/prop-row-selection" />

#### Search

The data table exposes a **search** prop that allows you to filter your data.

<example file="v-data-table/prop-search" />

### Slots

The `v-data-table` provides a large number of slots for customizing the table. This example showcases some of these slots and what you can do with each. It is important to note some slot (eg: `item`/`body`/`header`) will completely takes over the internal rendering of the component which will require you to re-implement functionalities such as selection and expansion. Some slots will override each other such as: `body` > `item` > `item.<name>` and `header`/`header.<name>`.

<example file="v-data-table/slot-main" />

#### Header

You can use the dynamic slots `header.<name>` to customize only certain columns. `<name>` is the name of the `value` property in the corresponding header item sent to **headers**.

<example file="v-data-table/slot-header" />

#### Item

You can use the dynamic slots `item.<name>` to customize only certain columns. `<name>` is the name of the `value` property in the corresponding header item sent to **headers**. So to customize the calories column we're using the `item.calories` slot.

<example file="v-data-table/slot-item" />

#### Simple checkbox

When wanting to use a checkbox component inside of a slot template in your data tables, use the `v-simple-checkbox` component rather than the `v-checkbox` component. The `v-simple-checkbox` component is used internally and will respect header alignment.

<example file="v-data-table/slot-simple-checkbox" />

### Misc

#### CRUD Actions

`v-data-table` with CRUD actions using a `v-dialog` component for editing each row

<example file="v-data-table/misc-crud" />

#### Edit dialog

The `v-edit-dialog` component can be used for editing data directly within a `v-data-table`. You can block the closing of the `v-edit-dialog` when clicked outside by adding the **persistent** prop.

<example file="v-data-table/misc-edit-dialog" />

#### Expandable rows

The **show-expand** prop will render an expand icon on each default row. You can customize this with the `item.data-table-expand` slot. The position of this slot can be customized by adding a column with `value: 'data-table-expand'` to the headers array. You can also switch between allowing multiple expanded rows at the same time or just one with the **single-expand** prop. The expanded rows are available on the synced prop `expanded.sync`

<example file="v-data-table/misc-expand" />

#### External pagination

Pagination can be controlled externally by using the individual props, or by using the **options** prop. Remember that you must apply the **.sync** modifier.

<example file="v-data-table/misc-external-paginate" />

#### External sorting

Sorting can also be controlled externally by using the individual props, or by using the the **options** prop. Remember that you must apply the **.sync** modifier.

<example file="v-data-table/misc-external-sort" />

#### Server-side paginate and sort

If you're loading data already paginated and sorted from a backend, you can use the **server-items-length** prop. Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the available events (`update:page`, `update:sortBy`, `update:options`, etc) to know when to request new pages from your backend. Use the **loading** prop to display a progress bar while fetching data.

<example file="v-data-table/misc-server-side-paginate-and-sort" />

<backmatter />
