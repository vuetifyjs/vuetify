---
nav: Virtual scrollers
meta:
  title: Virtual scroll component
  description: The Virtual scroll component is a container that renders only visible elements. It is useful when you need to display large amounts of uniform data.
  keywords: virtual scroll, vuetify virtual scroll component, vue virtual scroll component, v-virtual-scroll component
related:
  - /components/lists/
  - /components/data-tables/virtual-tables/
  - /components/combobox/
---

# Virtual scrollers

The `v-virtual-scroll` component displays a virtual, _infinite_ list. It supports dynamic height and scrolling vertically and is a good alternative to pagination.

![Virtual scroll Entry](https://cdn.vuetifyjs.com/docs/images/components/v-virtual-scroll/v-virtual-scroll-entry.png)

----

## Usage

The virtual scroller displays just enough records to fill the viewport and uses the existing component, rehydrating it with new data.

<usage name="v-virtual-scroll" />

<entry />

## API

| Component | Description |
| - | - |
| [v-virtual-scroll](/api/v-virtual-scroll/) | Primary Component |
| [v-virtual-scroll-item](/api/v-virtual-scroll-item/) | Wraps content and communicates height to parent |

<api-inline hide-links />

## Anatomy

The `v-virtual-scroll` component contains only a default slot with no styling options. It is typically used with large collections of [v-list-item](/components/lists/)s.

![Virtual scroll Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-virtual-scroll/v-virtual-scroll-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The rendered content area from the provided **items** prop |

## Guide

The `v-virtual-scroll` allows you to display thousands of records on a single page without the performance hit of actually showing all of them at once. `v-virtual-scroll` is devoid of styling and pairs well with components such as [v-card](/components/cards/) to provide a better visual experience.

### Props

The `v-virtual-scroll` component has a small API mainly used to configure the root and item height.

#### Height

The `v-virtual-scroll` component does not have any initial height set on itself.

The following code snippet uses the **height** prop:

<example file="v-virtual-scroll/prop-height" />

Another way of making sure that the component has height is to place it inside an element with `display: flex`.

<example file="v-virtual-scroll/prop-height-parent" />

#### Item Height

For lists where the item height is static and uniform for all items, it's recommended that you define a specific **item-height**. This value is used for `v-virtual-scroll`'s calculations.

<example file="v-virtual-scroll/prop-item-height" />

If your items are not of a uniform size, omit the **item-height** prop to have `v-virtual-scroll` dynamically calculate each item.

<example file="v-virtual-scroll/prop-dynamic-item-height" />

### Examples

The following is a collection of `v-virtual-scroll` examples that demonstrate how different the properties work in an application.

#### User Directory

The v-virtual-scroll component can render an large amount of items by rendering only what it needs to fill the scroller’s viewport.

<example file="v-virtual-scroll/misc-user-directory" />
