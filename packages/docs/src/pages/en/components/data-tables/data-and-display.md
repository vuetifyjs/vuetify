---
meta:
  nav: Data and Display
  title: Data table - Data and Display
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics/
  - /components/paginations/
  - /components/tables/
---

# Data and Display

Data table filtering is key feature that allows users to quickly find the data they are looking for.

<PromotedEntry />

## Filtering examples

These examples demonstrate various ways that you can utilize the **search** prop to filter results.

### Search

The data table exposes a **search** prop that allows you to filter your data.

<ExamplesExample file="v-data-table/prop-search" />

### Filterable

You can easily disable specific columns from being included when searching through table rows by setting the property **filterable** to false on the header item(s). In the example below the dessert name column is no longer searchable.

<ExamplesExample file="v-data-table/prop-filterable" />

### Custom filter

You can override the default filtering used with the **search** prop by supplying a function to the **custom-filter** prop. You can see the signature of the function below.

```ts
(value: string, query: string, item?: any) => boolean | number | [number, number] | [number, number][]
```

In the example below, the custom filter will only match inputs that are in completely in upper case.

<ExamplesExample file="v-data-table/prop-custom-filter" />

## Pagination examples

Pagination is used to split up large amounts of data into smaller chunks.

### External pagination

Pagination can be controlled externally by using the individual props, or by using the **options** prop. Remember that you must apply the **.sync** modifier.

<ExamplesExample file="v-data-table/misc-external-paginate" />

## Selection examples

Selection allows you to select/deselect rows and retrieve information about which rows have been selected.

### Item value

For the selection feature to work, the data table must be able to differentiate each row in the data set. This is done using the **item-value** prop. It designates a property on the item that should contain a unique value. By default the property it looks for is `id`.

You can also supply a function, if for example the unique value needs to be a composite of several properties. The function receives each item as its first argument.

<ExamplesExample file="v-data-table/prop-item-value" />

### Selected values

The current selection of the data-table can be accessed through the **v-model** prop. The array will consist of the unique values found in the property you set using the **item-value** prop (or the value returned by the function you passed). You can use **return-object** prop if you want the array to consist of the actual objects instead.

<ExamplesExample file="v-data-table/prop-return-object" />

<PromotedEntry />

### Selectable rows

Use the **item-selectable** prop to designate a property on your items that controls if the item should be selectable or not.

<ExamplesExample file="v-data-table/prop-item-selectable" />

### Select strategies

Data-tables support three different select strategies.

|Strategy|Description|
|-|-|
|`'single'`|Only a single row can be selected. The select all checkbox in the header is not shown|
|`'page'`|Multiple rows can be selected. Clicking on the select all checkbox in the header selects all (selectable) rows on the current page|
|`'all'`|Multiple rows can be selected. Clicking on the select all checkbox in the header selects all (selectable) rows in the entire data set|

<ExamplesExample file="v-data-table/prop-select-strategy" />

## Sorting examples

Data tables can sort rows by a column value.

<PromotedEntry />

### Basic sorting

The sorting of your table can be controlled by the **sort-by** prop. This prop takes an array of objects, where each object has a **key** and **order** property, describing how the table is to be sorted.

The **key** corresponds to a column defined in the **headers** array, and **order** is either the string `'asc'` or `'desc'` indicating the order in which the items are sorted.

Unless you are using the **multi-sort** prop seen below, this array will almost always just have a single object in it.

<ExamplesExample file="v-data-table/prop-sort-by" />

### Multi sort

Using the **multi-sort** prop will enable you to sort on multiple columns at the same time.

<ExamplesExample file="v-data-table/prop-multi-sort" />

### Sort by raw

::: success

This feature was introduced in [v3.5.0 (Polaris)](/getting-started/release-notes/?version=v3.5.0)

:::

Using a *sortRaw* key in your headers object gives you access to all values on the item. This is useful if you want to sort by a value that is not displayed in the table or a combination of multiple values.

<ExamplesExample file="v-data-table/prop-headers-sort-raw" />
