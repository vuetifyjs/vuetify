---
meta:
  nav: Mask inputs
  title: Mask input component
  description: The mask input component is a input component for masking input values.
  keywords: mask, vuetify mask input, vue mask input
features:
  label: 'C: VMaskInput'
  report: true
  github: /labs/VMaskInput/
---

# Mask Inputs

The `v-mask-input` component allows you to enforce a format on user input according to specific patterns. This is particularly useful for fields like phone numbers, credit cards, dates, and other formatted data.

<PageFeatures />

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VMaskInput } from 'vuetify/labs/VMaskInput'

export default createVuetify({
  components: {
    VMaskInput,
  },
})
```

## Usage

At its core, the `v-mask-input` is a wrapper around [v-text-field](/components/text-fields).

<ExamplesUsage name="v-mask-input" />

## API

| Component | Description |
| - | - |
| [v-mask-input](/api/v-mask-input/) | Primary Component |
| [useMask](/api/use-mask/) | Masking composable |

<ApiInline hide-links />

### Guide

Masks are created using a combination of special tokens that define the allowed characters and their formatting. Each token represents a specific type of character input.

### Available Tokens

| Token | Description |
|-------|-------------|
| # | Any digit |
| A | Any capital letter |
| a | Any small letter |
| N | Any capital alphanumeric character |
| n | Any small alphanumeric character |
| X | Any special symbol (-!$%^&*()_+ &#124;~=`{}[]:";'<>?,./\) or space |

### Built-in Masks

Vuetify includes several pre-configured masks for common use cases:

| Name | Pattern | Example |
|------------|------------|---------|
| credit-card | #### - #### - #### - #### | 1234 - 5678 - 9012 - 3456 |
| date | ##/##/#### | 12/31/2024 |
| date-time | ##/##/#### ##:## | 12/31/2024 23:59 |
| iso-date | ####-##-## | 2024-12-31 |
| iso-date-time | ####-##-## ##:## | 2024-12-31 23:59 |
| phone | (###) ### - #### | (123) 456 - 7890 |
| social | ###-##-#### | 123-45-6789 |
| time | ##:## | 23:59 |
| time-with-seconds | ##:##:## | 23:59:59 |

### useMask composable

The `useMask` composable provides a set of methods for working with masks.

```js
  import { useMask } from 'vuetify'

  const mask = useMask({ mask: '####-####' })

  mask.mask('12345678') // 1234-5678
  mask.unmask('1234-5678') // 12345678
  mask.isValid('abc') // false
  mask.isValid('1234') // true
  mask.isComplete('1234') // false
  mask.isComplete('1234-5678') // true
```

### Examples

#### Using Built in Masks

You can use the built-in masks by simply referencing their name. This is an example of a **phone** mask.

<ExamplesExample file="v-mask-input/phone" />

#### Using Custom Masks

You can create custom masks using the available tokens. This will create a mask that accepts 3 letters followed by 3 numbers (e.g., "ABC-123").

<ExamplesExample file="v-mask-input/custom-mask" />

#### Using Custom Tokens

You can also define custom tokens for more specific input requirements:

<ExamplesExample file="v-mask-input/custom-token" />

#### IP Address

This example shows how to create a mask for IP addresses with validation:

<ExamplesExample file="v-mask-input/ip-address" />

#### Credit Card Form

A complete credit card form example with validation:

<ExamplesExample file="v-mask-input/credit-card-form" />
