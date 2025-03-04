---
meta:
  nav: Density and sizing
  title: Density and sizing
  description: Density and sizing
  keywords: density, sizing
related:
  - /components/buttons/
  - /components/chips/
  - /components/lists/
---

# Density and sizing

The **size** and **density** props are used to reduce the overall space a component takes up, and sometimes font-size, height, padding, and margins.

<PageFeatures />

<PromotedEntry />

## Guide

The **size** and **density** props are used to reduce the overall space a component takes up, and sometimes font-size, height, padding, and margins.

### Size

This property reduces or increases the vertical and horizontal width a component takes up, as well as font-size.

- x-small
- small
- default
- large
- x-large

**Example**

The following example shows the size for various components:

<ExamplesExample file="concepts/size" preview />

### Density

Reduces vertical padding and sometimes font size. Square/round components like icons will also reduce horizontal padding.

- default
- comfortable
- compact

**Example**

The following example shows the density for various components:

<ExamplesExample file="concepts/density" preview />

::: warning

Not all components have a default transition that animates height when changing density.

:::

### Combined

Combine the **size** and **density** props to easily change the overall size of a component.

**Example**

The following example shows the size and density for various components:

<ExamplesExample file="concepts/density-and-size" preview />
