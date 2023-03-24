---
nav: Color pickers
meta:
  title: Color picker component
  description: The color picker component allows users to select a from pre-defined or custom colors using a variety of different inputs and formats.
  keywords: color pickers, vuetify color picker component, vue color picker component
related:
  - /components/menus/
  - /styles/colors/
  - /features/theme/
---

# Color pickers

The `v-color-picker` allows you to select a color using a variety of input methods.

## Usage

<usage name="v-color-picker" />

<entry />

## API

| Component | Description |
| - | - |
| [v-color-picker](/api/v-color-picker/) | Primary component |

<api-inline hide-links />

## Examples

### Props

#### Customizing the look of the picker

There are a number of props available to help you customize the component by hiding or showing the various parts of the picker. You can independently hide the canvas, the sliders, and the inputs. You can also show a collection of swatches.

<example file="v-color-picker/prop-canvas" />

#### Elevation

Adjust the elevation of the `v-color-picker` component using the **elevation** or **flat** prop. The **flat** is equivalent to setting **elevation** to 0.

<example file="v-color-picker/prop-elevation" />

#### Mode

You can specify which input modes are available to your users with the `modes` prop. If you only set a single mode, then the mode toggle will automatically be hidden. You can also control the current mode with the `mode` v-model.

<example file="v-color-picker/prop-mode" />

#### Model

The `v-color-picker` uses the `v-model` prop to control the color displayed. It supports hex strings such as **#FF00FF** and **#FF00FF00**, and objects representing **RGBA**, **HSLA** and **HSVA** values. The component will try to emit the color in the same format that was provided. If the value is null, then the `v-color-picker` will default to emitting hex colors.

<example file="v-color-picker/prop-model" />

#### Swatches

Using the `show-swatches` prop you can display an array of color swatches that users can pick from. It is also possible to customize what colors are shown using the `swatches` prop. This prop accepts a two-dimensional array, where the first dimension defines a column, and second dimension defines the swatches from top to bottom by providing rgba hex strings. You can also set the max height of the swatches section with the `swatches-max-height` prop.

<example file="v-color-picker/prop-swatches" />
