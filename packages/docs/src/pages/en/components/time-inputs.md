---
emphasized: true
meta:
  nav: Time inputs
  title: Time input component
  description: The time input combines a text field with a time picker and guides typing into a valid time.
  keywords: time input, time picker, time field
related:
  - /components/time-pickers/
  - /components/date-inputs/
  - /components/text-fields/
features:
  label: 'C: VTimeInput'
  report: true
  github: /labs/VTimeInput/
---

# Time inputs

The `v-time-input` component combines a text field with a time picker. It is meant to be a direct replacement for a native time input.

<PageFeatures />

::: warning

This feature requires [v4.3.0](/getting-started/release-notes/?version=v4.3.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js
import { VTimeInput } from 'vuetify/labs/VTimeInput'
```

## Usage

The model is a 24-hour `HH:mm` string, or `HH:mm:ss` with **use-seconds**. Typing fills in the separators, and the format hint shows what is left to type.

<ExamplesUsage name="v-time-input" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-time-input](/api/v-time-input/) | Primary component |
| [v-time-picker](/api/v-time-picker/) | Time picker component |
| [v-text-field](/api/v-text-field/) | Text field component |

<ApiInline hide-links />

## Guide

The `v-time-input` component extends [v-text-field](/components/text-fields/) and [v-time-picker](/components/time-pickers/), and supports their props. Props that conflict with the text field, such as `variant`, go to the picker through **picker-props**.

On desktop the picker shows its digital fields, on mobile the clock. When the menu is open on mobile, tapping the input a second time enables typing.

### Props

#### Format

Without the **format** prop, the hour cycle follows the current locale. In 12-hour mode, type `a` or `p` anywhere in the field to set the period.

<ExamplesExample file="v-time-input/prop-format" />

#### Allowed times

**min** and **max** clamp a typed time into range. A time rejected by **allowed-hours**, **allowed-minutes** or **allowed-seconds** leaves the model unchanged.

<ExamplesExample file="v-time-input/prop-allowed-times" />

## Examples

### Localized period

The period label comes from the locale messages and is placed where the locale reads it, in front of the digits in Korean, Chinese and Japanese.

<ExamplesExample file="v-time-input/misc-locale" />
