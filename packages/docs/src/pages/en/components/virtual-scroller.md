---
meta:
  title: Virtual scroller component,
  description: The Virtual scroll component is a container that renders only visible elements. It is useful when in need to display large amount of uniform data.,
  keywords: virtual scroll, vuetify virtual scroll component, vue virtual scroll component, v-virtual-scroll component
related:
  - /components/lists/
  - /components/data-tables/
  - /components/data-iterators/
---

# Virtual scroller

The `v-virtual-scroll` component displays a virtual, _infinite_ list. It supports dynamic height and scrolling vertically.

<entry-ad />

## Usage

The virtual scroller displays just enough records to fill the viewport and uses the existing component, rehydrating it with new data.

<usage name="v-virtual-scroll" />

## API

- [v-virtual-scroll](/api/v-virtual-scroll)

## Caveats

<alert type="info">

We are in the process of integrating the `v-virtual-scroll` component into existing features and components. If you are interested in helping, please reach out to **John Leider** in the [Discord Community](https://community.vuetifyjs.com).

</alert>

## Examples

### Props

#### Bench

By default the `v-virtual-scroll` does not pre-render additional items outside of the viewport. Using the `bench` prop will have the scroller render additional items as **padding**. It is **recommended** to keep this number as low as possible for the best possible performance.

<example file="v-virtual-scroll/prop-bench" />

### Misc

#### User directory

The `v-virtual-scroll` component can render an unlimited amount of items by rendering only what it needs to fill the scroller's viewport.

<example file="v-virtual-scroll/misc-user-directory" />

<backmatter />
