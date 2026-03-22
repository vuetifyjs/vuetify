---
meta:
  title: Month pickers
  description: The month picker component allows users to select a specific month and year.
  keywords: month picker, vuetify month picker component, vue month picker component
related:
  - /components/date-pickers/
  - /components/date-inputs/
features:
  label: 'C: VMonthPicker'
  github: /labs/VMonthPicker/
  report: true
---

# Month pickers

The `v-month-picker` component is a standalone picker that allows users to select a month and year combination.

<page-features />

<DocIntroduced version="4.0.4" />

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js
import { VMonthPicker } from 'vuetify/labs/VMonthPicker'
```

## Usage

At its core, the month picker allows selecting a specific month and year. The model value is a string in `YYYY-MM` format.

<ExamplesUsage name="v-month-picker" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-month-picker](/api/v-month-picker/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-month-picker` component is built on top of `v-picker` and reuses internal date picker sub-components for rendering month and year views.

### Props

#### Allowed months

The `allowed-months` prop restricts which months can be selected. It accepts an array of month numbers (0-11) or a function that returns a boolean.

<ExamplesExample file="v-month-picker/prop-allowed-months" />

#### Multiple and range

The `multiple` prop enables selecting more than one month. Set it to `true` for arbitrary multi-select or `'range'` for range selection where the first and last clicks define the range boundaries. In range mode, the months between the endpoints receive a tinted background.

<ExamplesExample file="v-month-picker/prop-multiple-range" />

#### Min and max

The `min` and `max` props restrict the selectable range. Both accept strings in `YYYY-MM` format.

<ExamplesExample file="v-month-picker/prop-min-max" />
