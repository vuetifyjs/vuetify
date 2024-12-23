---
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

# Date inputs

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

The `v-date-input` component is a replacement for the standard date input. It provides a clean interface for selecting dates and shows detailed selection information.

### Props

The `v-date-input` component extends the [v-text-field](/components/text-fields/) and [v-date-picker](/components/date-pickers/) component; and supports all of their props.

#### Model

The default model value is a Date object, but is displayed as formatted text in the input..

<ExamplesExample file="v-date-input/prop-model" />

#### Multiple

Using the **multiple** prop, the default model value is an empty array.

<ExamplesExample file="v-date-input/prop-multiple" />

#### Range

Using the multiple prop with a value of **range**, select 2 dates to select them and all the dates between them.

<ExamplesExample file="v-date-input/prop-multiple-range" />

#### Calendar icon

You can move the calendar icon within the input or entirely by utilizing the **prepend-icon** and **prepend-inner-icon** properties.

<ExamplesExample file="v-date-input/prop-prepend-icon" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-date-input` component.

### Passenger

In this example, the `v-date-input` component is used to select a date of birth.

<ExamplesExample file="v-date-input/misc-passenger" />
