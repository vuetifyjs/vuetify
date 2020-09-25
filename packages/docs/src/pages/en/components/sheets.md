---
meta:
  title: Sheet component
  description: The sheet component is the baseline for many Material Design implementations used in Vuetify.
  keywords: sheets, vuetify sheet component, vue sheet component, paper, material design paper, material design sheets
related:
  - /components/cards/
  - /components/grids/
  - /styles/elevation/
---

# Sheets

The `v-sheet` component is the baseline for numerous components such as [v-card](/components/cards/), [v-toolbar](/components/toolbars/), and more. The available properties form the foundation of Material Design—the concept of paper and elevation (shadows).

<entry-ad />

## Usage

The `v-sheet` component is a transformable piece of _paper_ that provides a basic foundation for Vuetify features. For example, properties such as **rounded** and **shaped** modify the `border-radius` property while **elevation** increase / decreases `box-shadow`.

<usage name="v-sheet" />

## API

- [v-sheet](/api/v-sheet)

## Examples

### Props

#### Elevation

The `v-sheet` component accepts a custom elevation between **0 and 24** (0 is default). The *elevation* property modifies the `box-shadow` property. More information is located in the MD [Elevation Design Specification](https://material.io/design/environment/elevation.html).

<example file="v-sheet/prop-elevation" />

#### Rounded

The **rounded** prop adds a default `border-radius` of _4px_. By default, the `v-sheet` component has no border-radius. Customize the radius's size and location by providing a custom rounded value; e.g. a rounded value of *tr-xl l-pill* equates to *rounded-tr-xl rounded-l-pill*. Additional information is on the [Border Radius](/styles/border-radius/) page.

<example file="v-sheet/prop-rounded" />

#### Color

Sheets and components based on them can have different sizes and colors.

The `v-sheet` component accepts custom [Material Design Color](/styles/colors/) values such as `warning`, `amber darken-3`, and `deep-purple accent`—as well as *rgb, rgba, and hexadecimal* values.

<example file="v-sheet/prop-color" />

<backmatter />
