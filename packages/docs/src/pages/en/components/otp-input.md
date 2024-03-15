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

![Otp input Entry](https://cdn.vuetifyjs.com/docs/images/components/v-otp-input/v-otp-input-entry.png)

<PageFeatures />

::: success
This feature was introduced in [v3.4.0 (Blackguard)](/introduction/roadmap/#v3-4-blackguard)
:::

## Usage

Here we display a list of settings that could be applied within an application.

<ExamplesUsage name="v-otp-input" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-otp-input](/api/v-otp-input/) | Primary Component |

<ApiInline hide-links />

## Anatomy

The `v-otp-input` component is a collection of [v-field](/api/v-field/) components that combine to create a single input.

![Otp input Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-otp-input/v-otp-input-anatomy.png "OTP input Anatomy")

| Element / Area | Description |
| - | - |
| 1. Container | The OTP input container holds a number of `v-field` components  |
| 2. Field | The `v-field` component is used to create a single input field |

## Guide

The `v-otp-input` component is a collection of `v-field` components that combine to create a single input. It is used to validate a one-time password (OTP) that is sent to the user via email or SMS.

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

#### Loader

The `loader` prop displays a loader when the `v-otp-input` component is in a loading state. When complete, emits a `finish` event.

<ExamplesExample file="v-otp-input/prop-loader" />

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

### Divider

The following example is a detailed example of a `v-otp-input` component used with a divider.

<ExamplesExample file="v-otp-input/misc-divider" />
