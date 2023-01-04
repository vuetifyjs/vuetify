---
nav: Virtual scrollers
meta:
  title: Virtual scroll component
  description: The Virtual scroll component is a container that renders only visible elements. It is useful when you need to display large amounts of uniform data.
  keywords: virtual scroll, vuetify virtual scroll component, vue virtual scroll component, v-virtual-scroll component
related:
  - /components/lists/
---

# Virtual scrollers

The `v-virtual-scroll` component displays a virtual, _infinite_ list. It supports dynamic height and scrolling vertically and is a good alternative to pagination.

----

## Usage

The virtual scroller displays just enough records to fill the viewport and uses the existing component, rehydrating it with new data.

<usage name="v-virtual-scroll" />

<entry />

## Anatomy

The `v-virtual-scroll` component contains only a default slot with no styling options.

| Element / Area | Description |
| - | - |
| 1. Container | The rendered content area from the provided [items](/api/v-virtual-scroll/#props-items) prop |

## API

| Component | Description |
| - | - |
| [v-virtual-scroll](/api/v-virtual-scroll/) | Primary Component |
| [v-virtual-scroll-item](/api/v-virtual-scroll-item) | Wraps content and communicates height to parent |

## Guide

The `v-virtual-scroll` allows you to display thousands of records on a single page without the performance hit of actually showing all of them at once. `v-virtual-scroll` is devoid of styling and pairs well with components such as [v-card](/components/cards/) to provide a better visual experience.

### Props

The `v-virtual-scroll` component has a small API mainly used to configure the root and item height.

#### Height

An initial height value is required in order to calculate which items to display.

The following code snippet is an example of a basic `v-virtual-scroll` component:

```html
<template>
  <v-virtual-scroll :items="items" height="200">
    <template v-slot:default="{ item }">
      Virtual Item {{ item }}
    </template>
  </v-virtual-scroll>
</template>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 1000 }, (k, v) => v + 1)
    })
  }
</script>
```

Alternatively, wrap `v-virtual-scroll` with any element that has a defined height and achieve the same result. The following example uses a regular div with a custom style:

<example file="v-virtual-scroll/prop-height" />

#### Item Height

For uniform lists, it's recommended that you define a specific **item-height**. This value is used for `v-virtual-scroll`'s calculations.

<example file="v-virtual-scroll/prop-item-height" />

If your items are not of a uniform size, omit the **item-height** prop to have `v-virtual-scroll` dynamically calculate each item.

<example file="v-virtual-scroll/prop-dynamic-item-height" />

If the items you are rendering are objects, you must set the **item-key** prop. By default `v-virtual-scroll` looks for the **value** key. This should point to a unique property on the objects.

<example file="v-virtual-scroll/prop-item-key" />

#### Visible items

The `v-virtual-scroll` component renders a set amount of visible items, meant to cover the viewport of the scroller, plus some amount of buffer below and beneath it so that scrolling looks and feels smooth. Modify this value by using the **visible-items** prop.

<example file="v-virtual-scroll/prop-visible-items" />

<alert type="info">

  Depending on the size of the scroll container, the size of the items, and the complexity of what you are rendering, adjusting the **visible-items** might improve the performance of the scrolling.

</alert>

### Examples

The following is a collection of `v-virtual-scroll` examples that demonstrate how different the properties work in an application.

#### User Directory

The v-virtual-scroll component can render an unlimited amount of items by rendering only what it needs to fill the scroller’s viewport.

<example file="v-virtual-scroll/misc-user-directory" />
