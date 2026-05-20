---
emphasized: true
meta:
  title: Date range pickers
  description: The date range picker component lets users select a start and end date across two adjacent months.
  keywords: date range picker, vuetify date range picker, vue date range picker
related:
  - /components/date-pickers/
  - /components/date-inputs/
  - /components/month-pickers/
features:
  label: 'C: VDateRangePicker'
  github: /labs/VDateRangePicker/
  report: true
---

# Date range pickers

The `v-date-range-picker` component renders two synchronized `v-date-picker` panels side-by-side, letting users select a contiguous date range across two months at once.

<page-features />

<DocIntroduced version="4.1.0" />

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js
import { VDateRangePicker } from 'vuetify/labs/VDateRangePicker'
```

## Usage

The model value is an array of two dates. Clicking a date sets the start; the next click sets the end. Clicking again starts a new range.

<ExamplesUsage name="v-date-range-picker" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-date-range-picker](/api/v-date-range-picker/) | Primary Component |
| [v-date-picker](/api/v-date-picker/) | Underlying calendar panel |

<ApiInline hide-links />

## Guide

The component is a thin wrapper around two `v-date-picker` instances. It forces `multiple="range"`, hides each panel's header, and keeps the right panel one month ahead of the left.

### Misc

#### Presets sidebar

A common pattern is to pair the range picker with a list of presets (last 7 days, this month, etc.). Compose them in a flex container — the picker stays self-contained and the list drives the range externally.

<ExamplesExample file="v-date-range-picker/misc-presets" />

#### Full layout

You can easily achieve typical layout with a presets sidebar and a footer with readonly inputs.

<ExamplesExample file="v-date-range-picker/misc-full-layout" />
