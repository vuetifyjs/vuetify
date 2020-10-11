---
meta:
  title: Color picker component
  description: The color picker component allows users to select a from pre-defined or custom colors using a variety of different inputs and formats.
  keyword: color pickers, vuetify color picker component, vue color picker component
related:
  - /components/menu/
  - /styles/colors/
  - /features/theme/
---

# Color pickers

The `v-color-picker` allows you to select a color using a variety of input methods.

<entry-ad />

## Usage

<usage name="v-color-picker" />

## API

- [v-color-picker](/api/v-color-picker)

## Examples

### Props

#### Canvas

The canvas can be hidden with the `hide-canvas` prop, and you can set its height with the prop `canvas-height`. The size of the selection dot can be controlled with the `dot-size` prop.

<example file="v-color-picker/prop-canvas" />

#### Elevation

Adjust the elevation of the `v-color-picker` component using the **elevation** or **flat** prop. The **flat** is equivalent to setting **elevation** to 0.

<example file="v-color-picker/prop-elevation" />

#### Inputs

The number inputs can be hidden with the `hide-inputs` prop. You can also hide the mode switch icon with the `hide-mode-switch` prop. The mode can also be controlled externally through the `mode` prop.

<example file="v-color-picker/prop-inputs" />

#### Model

The `v-color-picker` uses the `v-model` prop to control the color displayed. It supports hex strings such as **#FF00FF** and **#FF00FF00**, and objects representing **RGBA**, **HSLA** and **HSVA** values.

<example file="v-color-picker/prop-model" />

#### Swatches

Using the `show-swatches` prop you can display an array of color swatches that users can pick from. It is also possible to customize what colors are shown using the `swatches` prop. This prop accepts a two-dimensional array, where the first dimension defines a column, and second dimension defines the swatches from top to bottom by providing rgba hex strings. You can also set the max height of the swatches section with the `swatches-max-height` prop.

<example file="v-color-picker/prop-swatches" />

<backmatter />
