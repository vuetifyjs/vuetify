---
emphasized: true
meta:
  title: Number inputs
  description: The Number input component is used for ...
  keywords: Number, vuetify number input component, vue number component
related:
  - /components/inputs/
  - /components/text-fields/
  - /components/forms/
features:
  label: 'C: VNumberInput'
  github: /components/VNumberInput/
  report: true
---

# Number inputs

The VNumberInput extends the standard HTML number-type input, ensuring style consistency across browsers as a replacement for `<input type="number">`

<page-features />

<DocIntroduced version="3.8.0" />

## Usage

Here we display a list of settings that could be applied within an application.

<ExamplesUsage name="v-number-input" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-number-input](/api/v-number-input/) | Primary Component |

<ApiInline hide-links />

## Caveats

::: warning
**v-number-input** is designed for simple numeric input usage. It has limitations with very long integers and highly precise decimal arithmetic due to JavaScript number precision issues:

- For integers, **v-model** is restricted within [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) and [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) to ensure precision is not lost.

- To cope with JavaScript floating-point issues (e.g. 0.1 + 0.2 === 0.30000000000000004), Vuetify's internal logic uses **toFixed()** with the maximum number of decimal places between v-model and step. If accurate arbitrary-precision decimal arithmetic is required, consider working with strings using [decimal.js](https://github.com/MikeMcl/decimal.js) and  [v-text-field](/components/text-fields) instead.
:::

## Guide

The `v-number-input` component is built upon the `v-field` and `v-input` components. It is used as a replacement for `<input type="number">`, accepting numeric values from the user.

### Props

The `v-number-input` component has support for most of `v-field`'s props and is follows the same design patterns as other inputs.

#### Control-variant

The `control-variant` prop offers an easy way to customize steppers button layout. The following values are valid options: **default**, **stacked**, **split** and **hidden**.

<ExamplesExample file="v-number-input/prop-control-variant" />

#### Reverse

The `reverse` prop automatically changes the stepper buttons' position to the opposite side for both the default and stacked control variants.

<ExamplesExample file="v-number-input/prop-reverse" />

#### Hide-input

The `hide-input` prop hides the input field, allowing only the stepper buttons to be visible. These stepper buttons follow a stacked control-variant layout.

<ExamplesExample file="v-number-input/prop-hide-input" />

#### Inset

The `inset` prop adjusts the style of the stepper buttons by reducing the size of the button dividers.

<ExamplesExample file="v-number-input/prop-inset" />

#### Min/Max

The `min` and `max` props specify the minimum and maximum values accepted by v-number-input, behaving identically to the native min and max attributes for `<input type="number">`.

<ExamplesExample file="v-number-input/prop-min-max" />

#### Step

The `step` prop behaves the same as the `step` attribute in the `<input type="number">`, it defines the incremental steps for adjusting the numeric value.

<ExamplesExample file="v-number-input/prop-step" />

#### Precision

The `precision` prop enforces strict precision. It is expected to be an integer value in range between `0` and `15`. Input will prevent user from typing or pasting an invalid value.

<ExamplesExample file="v-number-input/prop-precision" />
