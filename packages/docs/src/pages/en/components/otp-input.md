---
disabled: true
meta:
  title: OTP Input component
  description: The OTP input component is used for MFA authentication via input field.
  keywords: OTP, MFA, vuetify OTP input component, vue OTP component
related:
  - /components/inputs/
  - /components/text-fields/
  - /components/forms/
---

# OTP Input

The OTP input is used for MFA procedure of authenticating users by a one-time password.

<entry />

## Usage

Here we display a list of settings that could be applied within an application.

<usage name="v-otp-input" />

## API

- [v-otp-input](/api/v-otp-input)

## Examples

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
