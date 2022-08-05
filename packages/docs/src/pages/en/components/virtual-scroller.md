---
nav: Virtual scrollers
meta:
  title: Virtual scroll component
  description: The Virtual scroll component is a container that renders only visible elements. It is useful when you need to display large amounts of uniform data.
  keywords: virtual scroll, vuetify virtual scroll component, vue virtual scroll component, v-virtual-scroll component
related:
  - /components/lists/
  - /components/data-tables/
  - /components/data-iterators/
---

# Virtual scrollers

The `v-virtual-scroll` component displays a virtual, _infinite_ list. It supports dynamic height and scrolling vertically.

<entry />

## Usage

The virtual scroller displays just enough records to fill the viewport and uses the existing component, rehydrating it with new data.

<usage name="v-virtual-scroll" />

## API

<api-inline />

## Examples

### Props

#### Dynamic item height

If your items are not of a uniform size, you can use the **dynamic-item-height** prop. Keep in mind that you will still need to specify an initial, estimated, **item-height**.

<example file="v-virtual-scroll/prop-dynamic-item-height" />

If the items you are rendering are objects, you will additionally need to set the **item-key** prop. This should point to a unique property on the objects.

<example file="v-virtual-scroll/prop-item-key" />

#### Visible items

The `v-virtual-scroll` renders a set amount of visible items, meant to cover the viewport of the scroller, plus some amount of buffer below and beneath it so that scrolling looks and feels smooth. This amount can be changed with the **visible-items** prop.

Depending on the size of the scroll container, the size of the items, and the complexity of what you are rendering, adjusting the **visible-items** might improve the performance of the scrolling.

<example file="v-virtual-scroll/prop-visible-items" />

<backmatter />
