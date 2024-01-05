---
emphasized: true
meta:
  title: Number Input
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

# Number Input

The VNumberInput extends the standard HTML number-type input, ensuring style consistency across browsers as a replacement for `<input type="number">`

![Otp input Entry](https://cdn.vuetifyjs.com/docs/images/components/v-otp-input/v-otp-input-entry.png)

<page-features />

::: success
This feature requires [v3.5.0](/introduction/roadmap/#v3-5)
:::

## Usage

Here we display a list of settings that could be applied within an application.

<usage name="v-number-input" />

<entry />

## API

| Component | Description |
| - | - |
| [v-number-input](/api/v-number-input/) | Primary Component |

<api-inline hide-links />

## Guide

The `v-number-input` component is built upon the `v-field` and `v-input` components. It is used as a replacement for `<input type="number">`, accepting numeric values from the user.

### Props

The `v-number-input` component has support for most of `v-field`'s props and is follows the same design patterns as other inputs.

#### Control-variant

The `control-variant` prop offers an easy way to customize steppers button layout. The following values are valid options: **default**, **stacked** and **split**.

<example file="v-number-input/prop-control-variant" />

#### Control-reverse

The `control-reverse` prop automatically changes the stepper buttons' position to the opposite side for both the default and stacked control variants.

<example file="v-number-input/prop-control-reverse" />

#### Hide-input

The `hide-input` prop hides the input field, allowing only the stepper buttons to be visible. These stepper buttons follow a stacked control-variant layout.

<example file="v-number-input/prop-hide-input" />

#### Inset

The `inset` prop adjusts the style of the stepper buttons by reducing the size of the button dividers.

<example file="v-number-input/prop-inset" />