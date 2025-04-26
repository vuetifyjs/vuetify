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

<PageFeatures />

## Usage

The standard data table presumes that the entire data set is available locally. Sorting, pagination, and filtering is supported and done internally by the component itself.

<ExamplesUsage name="v-data-table" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-data-table](/api/v-data-table/) | Primary Component |
| [v-data-table-headers](/api/v-data-table-headers/) | Functional Component used to display Data-table headers |
| [v-data-table-footer](/api/v-data-table-footer/) | Functional Component used to display Data-table footers |
| [v-data-table-row](/api/v-data-table-row/) | Functional Component used to display a single row of a data-table |
| [v-data-table-rows](/api/v-data-table-rows/) | Functional Component used to display all of the rows in a data-table |
| [v-checkbox-btn](/api/v-checkbox-btn/) | Reusable lightweight [v-checkbox](/components/checkboxes) |

<ApiInline hide-links />

### Server side tables

This variant of the data table is meant to be used for very large datasets, where it would be inefficient to load all the data into the client. It supports sorting, filtering, pagination, and selection like a standard data table, but all the logic must be handled externally by your backend or database.

| Component | Description |
| - | - |
| [v-data-table-server](/api/v-data-table-server/) | Primary Component |

Find more information and examples on the [Server side tables](/components/data-tables/server-side-tables) page.

<ExamplesExample file="v-data-table/server" />

### Virtual tables

The virtual variant of the data table relies, like the standard variant, on all data being available locally. But unlike the standard variant it uses virtualization to only render a small portion of the rows. This makes it well suited for displaying large data sets. It supports client-side sorting and filtering, but not pagination.

| Component | Description |
| - | - |
| [v-data-table-virtual](/api/v-data-table-virtual/) | Primary Component |

Find more information and examples on the [Virtual tables](/components/data-tables/virtual-tables) page.

<ExamplesExample file="v-data-table/virtual" />

## Guide

The `v-data-table` component is a simple and powerful table manipulation component. It is perfect for showing large amounts of tabular data.

### Items

Table items can be objects with almost any shape or number of properties. The only requirement is some form of unique identifier if row selection is being utilized.

### Headers

The headers array is the core of the table. It defines which properties to display, their associated labels, how they should be sorted, and what they should look like.
<br>
All properties are optional, but at least one of **title**, **value**, or **key** should be present to display more than just an empty column:

```js
const headers = [
  { title: 'No data, just a label' },
  { key: 'quantity' },
  { value: 'price' },
]
```

Without any headers defined, the table will use all the keys of the first item as headers.

Headers can also be a tree structure with a **children** property to create multi-row header labels with rowspan and colspan calculated automatically.
<br>
Leaf nodes (objects without **children**) will be used as columns for each item.
<br>
Branch nodes (objects with **children**) support all the same sorting and filtering options as leaf nodes, but cannot be used as columns.

<ExamplesExample file="v-data-table/headers-multiple" />

#### Keys and values

The **key** property is used to identify the column in slots, events, filters, and sort functions. It will default to the **value** property if **value** is a string.
<br>
**value** maps the column to a property in the items array. If **value** is not defined it will default to **key**, so key and value are interchangeable in most cases. The exception to this is reserved keys like `data-table-select` and `data-table-expand` which must be defined as **key** to work properly.
<br>
**key** and **value** both support dot notation to access properties of nested objects, and **value** can also be a function to combine multiple properties or do other custom formatting. If **value** is not a string then **key** must be defined.

```js
const items = [
  {
    id: 1,
    name: {
      first: 'John',
      last: 'Doe',
    },
  },
]

const headers = [
  { title: 'First Name', value: 'name.first' },
  { title: 'Last Name', key: 'name.last' },
  {
    title: 'Full Name',
    key: 'fullName',
    value: item => `${item.name.first} ${item.name.last}`,
  },
]
```

#### Sorting, filtering, pagination

See [Data and display](/components/data-tables/data-and-display).

#### Customization

Other options are available for setting **width**, **align**, **fixed**, or pass custom props to the header element with **headerProps** and row cells with **cellProps**.

### Props

There are no shortable of properties available for customizing various aspects of the Data table components.

#### Density

Using the **density** prop you are able to give your data tables an alternate style.

<ExamplesExample file="v-data-table/prop-dense" />

<!-- #### Footer props

The `v-data-table` renders a default footer using the `v-data-footer` component. You can pass props to this component using **footer-props**.

<ExamplesExample file="v-data-table/prop-footer-props" /> -->

#### Hide default header and footer

You can apply the **hide-default-header** and **hide-default-footer** props to remove the default header and footer respectively.

<ExamplesExample file="v-data-table/prop-hide-header-footer" />

#### Selection

The **show-select** prop will render a checkbox in the default header to toggle all rows, and a checkbox for each row.

For more information and examples, see the [selection examples](/components/data-tables/data-and-display/#selection-examples) page.

<ExamplesExample file="v-data-table/prop-row-selection" />

#### Simple checkbox

When wanting to use a checkbox component inside of a slot template in your data tables, use the `v-checkbox-btn` component rather than the `v-checkbox` component.

<ExamplesExample file="v-data-table/slot-simple-checkbox" />

### Slots

#### Header slot

You can use the dynamic slots `header.<key>` to customize only certain columns. `<key>` corresponds to the **key** property in the items found in the **headers** prop.

::: info
There are two built-in slots for customizing both the select (`header.data-table-select`) and expand (`header.data-table-expand`) columns when using **show-select** and **show-expand** props respectively.
:::

<ExamplesExample file="v-data-table/slot-header" />

#### Headers slot

You can also override all the internal headers by using the `headers` slot. Remember that you will have to re-implement any internal functionality like sorting.

<ExamplesExample file="v-data-table/slot-headers" />

#### Item slot

Normally you would use the `item.<key>` slots to render custom markup in specific columns. If you instead need more control over the entire row, you can use the `item` slot.

<ExamplesExample file="v-data-table/slot-item" />

#### Item key slot

You can use the dynamic slots `item.<key>` to customize only certain columns. `<key>` is the name of the **key** property in header items sent to **headers**. So to customize the calories column we're using the `item.calories` slot.

<ExamplesExample file="v-data-table/slot-item-key" />

#### Group header slot

When using the **group-by** prop, you can customize the group header with the `group-header` slot.

<ExamplesExample file="v-data-table/slot-group-header" />

#### Loading slot

The `loading` slot allows you to customize your table's display state when fetching data. In this example we utilize the [v-skeleton-loader](/components/skeleton-loaders) component to display a loading animation.

<ExamplesExample file="v-data-table/slot-loading" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-data-table` component.

### CRUD Actions

`v-data-table` with CRUD actions using a `v-dialog` component for editing each row

<ExamplesExample file="v-data-table/misc-crud" />

### Expandable rows

The **show-expand** prop will render an expand icon on each row. You can customize this with the `item.data-table-expand` slot. The position of this slot can be changed by adding a column with `key: 'data-table-expand'` to the headers array.

You can override the rows expand icon via the `item.data-table-expand` slot. To call upon the expand functionality, pass the slots provided `internalItem` to the `toggleExpand` function and add it to a click handler to perform the expand functionality. You can also check the current state of the rows expansion by passing the `internalItem` to the `isExpanded` function.

Just like selection, row items require a unique property on each item for expansion to work. The default is `id`, but you can use the **item-value** prop to specify a different item property.

<ExamplesExample file="v-data-table/misc-expand" />
