---
meta:
  nav: Selects
  title: Select component
  description: The select component provides a list of options that a user can make selections from.
  keywords: selects, vuetify select component, vue select component
related:
  - /components/autocompletes/
  - /components/combobox/
  - /components/forms/
features:
  label: 'C: VSelect'
  report: true
  github: /components/VSelect/
  spec: https://m2.material.io/components/text-fields
---

# Selects

Select fields components are used for collecting user provided information from a list of options.

<PageFeatures />

## Usage

<ExamplesUsage name="v-select" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-select](/api/v-select/) | Primary Component |
| [v-autocomplete](/api/v-autocomplete/) | A select component that allows for advanced filtering |
| [v-combobox](/api/v-combobox/) | A select component that allows for filtering and custom values |

<ApiInline hide-links />

## Caveats

::: error

When using objects for the **items** prop, you must associate **item-title** and **item-value** with existing properties on your objects. These values are defaulted to **title** and **value** and can be changed.

:::

## Guide

The `v-select` component is meant to be a direct replacement for a standard `<select>` element. It is commonly used with [v-form](/components/forms/) and other inputs & controls.

### Props

All form inputs have a massive API that make it super easy to configure everything just the way you want it.

#### Density

You can use **density** prop to adjust vertical spacing within the component.

<ExamplesExample file="v-select/prop-dense" />

#### Multiple

The **multiple** prop allows for multiple selections.

<ExamplesExample file="v-select/prop-multiple" />

#### Chips

Display selected items as chips with the **chips** prop.

<ExamplesExample file="v-select/prop-chips" />

#### Readonly

You can use the **readonly** prop on `v-select` which will prevent a user from changing its value.

<ExamplesExample file="v-select/prop-readonly" />

#### Disabled

Applying the **disabled** prop to a `v-select` will prevent a user from interacting with the component.

<ExamplesExample file="v-select/prop-disabled" />

#### Custom title and value

You can specify the specific properties within your items array that correspond to the title and value fields. By default, this is **title** and **value**. In this example we also use the **return-object** prop which will return the entire object of the selected item on selection.

<ExamplesExample file="v-select/prop-custom-title-and-value" />

#### Menu props

Custom props can be passed directly to `v-menu` using **menu-props** prop. In this example a scrim as added to the select and the menu closes when you scroll.

<ExamplesExample file="v-select/prop-menu-props" />

#### Custom item props

`item-title` and `item-value` are provided for convenience, and additional props can be passed to list items either through the **item** slot (see below) or with the **itemProps** prop.
Similar to title and value, it has a default value of `"props"`, which will pass everything in the `props` key of each item object to the list item.

```js
const items = [
  {
    title: 'John',
    props: { subtitle: 'Engineering' },
  },
]
```

`:item-props="true"` will use the entire item object as props. This overrides `item-title` and `item-value`.

```js
const items = [
  {
    title: 'John',
    subtitle: 'Engineering',
  },
]
```

Or a custom transform function can be passed to `itemProps` to generate the props for each item.

<ExamplesExample file="v-select/prop-item-props" />

See the [VListItem API](/api/v-list-item/) for a list of available props.

### Slots

The `v-select` component offers slots that make it easy to customize the output of certain parts of the component. This includes the **prepend** and **append** slots, the **selection** slot, and the **no-data** slot.

#### Item

The item slot is used to change how items are rendered in the list. It provides `item`, an [InternalItem](/api/v-select/#slots-item) object containing the transformed item-title and item-value; and `props`, an object containing the props and events that would normally be bound to the list item.

<ExamplesExample file="v-select/slot-item" />

#### Append and prepend item

The `v-select` component can be optionally expanded with prepended and appended items. This is perfect for customized **select-all** functionality.

<ExamplesExample file="v-select/slot-append-and-prepend-item" />

#### Selection

The **selection** slot can be used to customize the way selected values are shown in the input. This is great when you don't want the selection to occupy multiple lines.

<ExamplesExample file="v-select/slot-selection" />
