---
emphasized: true
meta:
  nav: Date inputs
  title: Date input component
  description: The date input is a specialized input that provides a clean interface for selecting dates, showing detailed selection information.
  keywords: date input, date picker, date field
related:
  - /components/date-pickers/
  - /components/text-fields/
  - /components/menus/
features:
  label: 'C: VDateInput'
  report: true
  github: /labs/VDateInput/
---

# File inputs

The `v-date-input` component combines a text field with a date picker. It is meant to be a direct replacement for a standard date input.

<PageFeatures />

::: warning

This feature requires [v3.6.0](/getting-started/release-notes/?version=v3.6.0)

:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VDateInput } from 'vuetify/labs/VDateInput'

export default createVuetify({
  components: {
    VDateInput,
  },
})
```

## Usage

At its core, the `v-date-input` component is a basic container that extends [v-text-field](/components/text-fields).

<ExamplesUsage name="v-date-input" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-date-input](/api/v-date-input/) | Primary component |
| [v-date-picker](/api/v-date-picker/) | Date picker component |
| [v-text-field](/api/v-text-field/) | Text field component |

<ApiInline hide-links />

## Guide

Coming soon
