---
meta:
  title: Data iterator component
  description: The data iterator component is used for filter and displaying data including sorting, searching, pagination, and selection.
  keywords: data iterators, vuetify data iterator component, vue data iterator component
related:
  - /components/data-tables/
  - /components/simple-tables/
  - /components/toolbars/
---

# Data iterators

The `v-data-iterator` component is used for displaying data, and shares a majority of its functionality with the `v-data-table` component. Features include sorting, searching, pagination, and selection.

<entry-ad />

## Usage

The `v-data-iterator` allows you to customize exactly how to display your data. In this example we are using a grid with cards.

<usage name="v-data-iterator" />

## API

- [v-data-iterator](/api/v-data-iterator)
- [v-data-footer](/api/v-data-footer)

## Examples

### Slots

#### Default

The `v-data-iterator` has internal state for both selection and expansion, just like `v-data-table`. In this example we use the methods `isExpanded` and `expand` available on the default slot.

<example file="v-data-iterator/slot-default" />

#### Header and footer

The `v-data-iterator` has both a header and footer slot for adding extra content.

<example file="v-data-iterator/slot-header-and-footer" />

### Misc

#### Filter

Order, filters and pagination can be controlled externally by using the individual props

<example file="v-data-iterator/misc-filter" />

<backmatter />
