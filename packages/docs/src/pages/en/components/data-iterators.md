---
emphasized: true
nav: Data iterators
meta:
  title: Data iterator component
  description: The data iterator component is used for filter and displaying data including sorting, searching, pagination, and selection.
  keywords: data iterators, vuetify data iterator component, vue data iterator component
related:
  - /components/data-tables/basics/
  - /components/simple-tables/
  - /components/toolbars/
---

# Data iterators

The `v-data-iterator` component is used for displaying arbitrary data, and shares a majority of its functionality with the `v-data-table` component. Features include sorting, searching, pagination, and selection.

![Data iterator Entry](https://cdn.vuetifyjs.com/docs/images/components/v-data-iterator/v-data-iterator-entry.png){ placeholder=true }

----

## Usage

The `v-data-iterator` allows you to customize exactly how to display your data. In this example we are using a grid with cards.

<usage name="v-data-iterator" />

<entry />

## API

| Component                                | Description       |
|------------------------------------------|-------------------|
| [v-data-iterator](/api/v-data-iterator/) | Primary Component |

<api-inline hide-links />

## Anatomy

The recommended placement of elements inside of a `v-data-iterator` are:

* Place a [v-toolbar](/components/toolbars/) or similar component above the main content
* Place content after the header
* Place a [v-pagination](/components/paginations/) below the main content

![Data iterator Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-data-iterator/v-data-iterator-entry.png){ placeholder=true }

| Element / Area | Description |
| - | - |
| 1. Container | The container is the root element of the component |
| 2. Header (optional) | The header is used to display a title and actions |
| 3. Footer (optional) | The footer is used to display pagination |

## Guide

The `v-data-iterator` component is used for displaying data, and shares a majority of its functionality with the `v-data-table` component. Features include sorting, searching, pagination, and selection.

The following code snippet is an example of a basic `v-data-iterator` component:

```html
<v-data-iterator :items="[1, 2, 3, 4, 5]">
  <template v-slot:default="{ items }">
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :title="`Item ${i}`"
    ></v-list-item>
  </template>
</v-data-iterator>
```

## Examples

### Slots

#### Default

The `v-data-iterator` has internal state for both selection and expansion, just like `v-data-table`. In this example we use the methods `isExpanded` and `toggleExpand` available on the default slot.

<example file="v-data-iterator/slot-default" />

#### Header and footer

The `v-data-iterator` has both a **header** and **footer** slot for adding extra content.

<example file="v-data-iterator/slot-header-and-footer" />

### Misc

#### Controllable props

Sorting, filters and pagination can be controlled externally by using the individual props

<example file="v-data-iterator/misc-filter" />
