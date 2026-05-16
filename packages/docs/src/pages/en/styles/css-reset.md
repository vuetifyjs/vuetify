---
emphasized: true
meta:
  title: CSS Reset
  description: Vuetify applies a minimal CSS reset to normalize browser inconsistencies.
  keywords: css reset, vuetify css reset
related:
  - /styles/colors/
  - /styles/text-and-typography/
  - /features/sass-variables/
---

# CSS Reset

Minimal base styles for Vuetify projects.

<PageFeatures />

<PromotedEntry />

## Bootstrapping

Vuetify applies a minimal CSS reset to normalize browser inconsistencies while keeping the footprint small.

::: warning
  The Vuetify style reset is applied globally and affects default elements such as `button` and `input`. This also includes anything located outside of the [v-app](/components/application) component.
:::

It can be disabled with [sass variables](/features/sass-variables/#sass-variables) by setting `$reset: false`, but you may have to manually reset some styles for components to display correctly.

## Reset Features

Below is a list of styles applied by the reset:

- Apply `box-sizing: border-box` in all elements.
- Reset `margin` in `html` and `body`.
- Specify `background-repeat: no-repeat` in all elements and pseudo elements.
- Inherit `text-decoration` and `vertical-align` to `::before` and `::after`.
- Reset `border-radius` in input elements.
- Specify font inheritance of form elements.
- Apply `cursor: pointer` to button elements.
- Apply `tab-size: 4` in `html`.
- Style `cursor` by aria attributes.
- Minor consitency improvements for search and number inputs.

For a complete list of all applied styles, see the [reset stylesheet](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/styles/generic/_reset.scss).
