---
meta:
  title: Date range pickers
  description: The date range picker component lets users select a start and end date with adjacent calendars or vertically scrolling months.
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

The `v-date-range-picker` component lets users select a contiguous date range. It renders two synchronized `v-date-picker` panels side-by-side, or a single column of months with the **scrollable** prop.

<page-features />

::: warning

This feature requires [v4.1.0](/getting-started/release-notes/?version=v4.1.0)

:::

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

The component shares a range selection across its calendars. In the two-panel layout, it forces `multiple="range"`, hides each panel's header, and keeps the right panel one month ahead of the left. Use **independent-months** to navigate the two panels independently.

### Props

#### Scrollable

The **scrollable** prop displays months in a single column that scrolls vertically, following the Material Design 3 mobile date range picker layout. Month and year labels scroll with their calendars, while the weekday row remains visible. The **min** and **max** props limit the available dates. The **independent-months** prop applies only to the two-panel layout.

Use a [v-dialog](/components/dialogs/) to present the picker as a modal. The example below opens from a readonly text field and makes the dialog fullscreen on mobile; **scrollable** controls the calendar layout independently of the dialog's fullscreen presentation.

<ExamplesExample file="v-date-range-picker/prop-scrollable" />

### Misc

#### Presets sidebar

A common pattern is to pair the range picker with a list of presets (last 7 days, this month, etc.). Compose them in a flex container — the picker stays self-contained and the list drives the range externally.

<ExamplesExample file="v-date-range-picker/misc-presets" />

#### Full layout

You can easily achieve typical layout with a presets sidebar and a footer with readonly inputs.

<ExamplesExample file="v-date-range-picker/misc-full-layout" />
