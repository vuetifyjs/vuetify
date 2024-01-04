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

#### Focus-all

The `autofocus` prop automatically focuses the first element in the `v-otp-input` component.

<example file="v-otp-input/prop-focus-all" />

#### Error

The `error` prop puts the `v-otp-input` into an error state. This is useful for displaying validation errors.

<example file="v-otp-input/prop-error" />

#### Variants

The `v-otp-input` component supports the same variants as `v-field`, `v-text-field` and other inputs.

<example file="v-otp-input/prop-variant" />

#### Loader

The `loader` prop displays a loader when the `v-otp-input` component is in a loading state. When complete, emits a `finish` event.

<example file="v-otp-input/prop-loader" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-otp-input` component.

### Card variants

The following example is a detailed example of a `v-otp-input` component used within a card.

<example file="v-otp-input/misc-card" />

### Mobile text

The following example is a detailed example of a `v-otp-input` component used with mobile text.

<example file="v-otp-input/misc-mobile" />

### Verify account

The following example is a detailed example of a `v-otp-input` component used to verify a user's account.

<example file="v-otp-input/misc-verify" />

### Divider

The following example is a detailed example of a `v-otp-input` component used with a divider.

<example file="v-otp-input/misc-divider" />
