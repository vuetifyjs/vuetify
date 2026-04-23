---
meta:
  title: OTP Input
  description: The OTP input component is used for MFA authentication via input field.
  keywords: OTP, MFA, vuetify OTP input component, vue OTP component
related:
  - /components/inputs/
  - /components/text-fields/
  - /components/forms/
features:
  label: 'C: VOtpInput'
  github: /components/VOtpInput/
  report: true
---

# OTP Input

The OTP input is used for MFA procedure of authenticating users by a one-time password.

<PageFeatures />

## Usage

Here we display a list of settings that could be applied within an application.

<ExamplesUsage name="v-otp-input" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-otp-input](/api/v-otp-input/) | Primary Component |
| [v-otp-field](/api/v-otp-field/) | Sub-component used to render an individual OTP character field |
| [v-otp-group](/api/v-otp-group/) | Sub-component used to group fields together, with optional merged styling |
| [v-otp-separator](/api/v-otp-separator/) | Sub-component used to display a visual separator between fields or groups |

<ApiInline hide-links />

## Anatomy

The `v-otp-input` component uses a single hidden input element for keyboard interaction, and renders visual [v-field](/api/v-field/) components for each character slot.

![Otp input Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-otp-input/v-otp-input-anatomy.png "OTP input Anatomy")

| Element / Area | Description |
| - | - |
| 1. Container | The OTP input container holds the visual fields and the hidden input element  |
| 2. Field | A `v-field` component representing a single character slot |

## Guide

The `v-otp-input` component is used to validate a one-time password (OTP) that is sent to the user via email or SMS. It renders a configurable number of character fields and handles keyboard navigation, paste, and autofill automatically.

The following code snippet is an example of a basic `v-otp-input` component.

```html
<v-otp-input></v-otp-input>
```

### Props

The `v-otp-input` component has support for most of `v-field`'s props and is follows the same design patterns as other inputs.

#### Length

The `length` prop determines the number of `v-field` components that are rendered. The default value is `6`.

<ExamplesExample file="v-otp-input/prop-length" />

#### Focus-all

The `autofocus` prop automatically focuses the first element in the `v-otp-input` component.

<ExamplesExample file="v-otp-input/prop-focus-all" />

#### Error

The `error` prop puts the `v-otp-input` into an error state. This is useful for displaying validation errors.

<ExamplesExample file="v-otp-input/prop-error" />

#### Variants

The `v-otp-input` component supports the same variants as `v-field`, `v-text-field` and other inputs.

<ExamplesExample file="v-otp-input/prop-variant" />

#### Masked

Using `masked` prop you can hide the entered characters. It is similar to a `type="password"`, but makes it possible to also restrict characters to digits with `type="number"`.

<ExamplesExample file="v-otp-input/prop-masked" />

#### Loader

The `loader` prop displays a loader when the `v-otp-input` component is in a loading state. When complete, emits a `finish` event.

<ExamplesExample file="v-otp-input/prop-loader" />

#### Merged

The `merged` prop renders all fields in a single connected group with shared elevation and border radius. Fields are joined visually without gaps between them.

<ExamplesExample file="v-otp-input/prop-merged" />

#### Pattern

The `pattern` prop restricts which characters are accepted. It supports preset values (`numeric`, `alpha`, `alphanumeric`) or a custom `RegExp`. When `type="number"` is set, the pattern defaults to `numeric` automatically.

<ExamplesExample file="v-otp-input/prop-pattern" />

### Slots

#### Divider

The `divider` slot allows you to customize the separator content between fields. It receives the divider `index` as a slot prop. You can also use the `divider` string prop for simple text separators.

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-otp-input` component.

### Card variants

The following example is a detailed example of a `v-otp-input` component used within a card.

<ExamplesExample file="v-otp-input/misc-card" />

### Mobile text

The following example is a detailed example of a `v-otp-input` component used with mobile text.

<ExamplesExample file="v-otp-input/misc-mobile" />

### Verify account

The following example is a detailed example of a `v-otp-input` component used to verify a user's account.

<ExamplesExample file="v-otp-input/misc-verify" />

### Dividers

Using the `divider` prop or the `#divider` slot, you can add visual separators between each field. The slot variant supports any content, such as icons.

<ExamplesExample file="v-otp-input/misc-divider" />

### Custom layout

Using the `v-otp-field`, `v-otp-group`, and `v-otp-separator` sub-components, you can build custom layouts. Groups can be individually merged, and separators accept any content through their default slot.

<ExamplesExample file="v-otp-input/misc-custom-layout" />
