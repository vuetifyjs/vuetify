---
emphasized: true
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
  github: /labs/VOtpInput/
  report: true
---

# OTP Input

The OTP input is used for MFA procedure of authenticating users by a one-time password.

![Otp input Entry](https://cdn.vuetifyjs.com/docs/images/components/v-otp-input/v-otp-input-entry.png){ height=300 }

<page-features />

::: warning

This feature requires [v3.3.11](/getting-started/release-notes/?version=v3.3.11)

:::

## Usage

Here we display a list of settings that could be applied within an application.

<usage name="v-otp-input" />

<entry />

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VOtpInput } from 'vuetify/labs/VOtpInput'

export default createVuetify({
  components: {
    VOtpInput,
  },
})
```

## API

| Component | Description |
| - | - |
| [v-otp-input](/api/v-otp-input/) | Primary Component |

<api-inline hide-links />

## Anatomy

The `v-otp-input` component is a collection of [v-field](/api/v-field/) components that combine to create a single input.

![Otp input Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-otp-input/v-otp-input-anatomy.png "OTP input Anatomy")

| Element / Area | Description |
| - | - |
| 1. Container | The OTP input container holds a number of `v-field` components  |
| 2. Field | The `v-field` component is used to create a single input field |

## Guide

### Props

#### Dark theme

Applied dark theme, listen to value fill to affect button component.

<example file="v-otp-input/prop-dark" />

#### Finish event

You can easily compose a loader to process the OTP input when completed insertion.

<example file="v-otp-input/misc-loading" />

#### Hidden input

The entered value can be hidden with `type="password"`

<example file="v-otp-input/prop-type" />
