---
emphasized: true
meta:
  nav: Date time inputs
  title: Date time input component
  description: The date time input combines a text field with a date picker and a time picker, and guides typing into a valid date and time.
  keywords: date time input, datetime picker, date time field
related:
  - /components/date-inputs/
  - /components/time-inputs/
  - /components/text-fields/
features:
  label: 'C: VDateTimeInput'
  report: true
  github: /labs/VDateTimeInput/
---

# Date time inputs

The `v-date-time-input` component combines a text field with a date picker and a time picker in a single field.

<PageFeatures />

::: warning

This feature requires [v4.4.0](/getting-started/release-notes/?version=v4.4.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js
import { VDateTimeInput } from 'vuetify/labs/VDateTimeInput'
```

## Usage

The model is a local `YYYY-MM-DDTHH:mm` string, the same as the value of a native `datetime-local` input, whichever [date adapter](/features/dates/) is configured. Typing fills in the separators, and the format hint shows what is left to type.

<ExamplesUsage name="v-date-time-input" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-date-time-input](/api/v-date-time-input/) | Primary component |
| [v-date-picker](/api/v-date-picker/) | Date picker component |
| [v-time-picker](/api/v-time-picker/) | Time picker component |
| [v-text-field](/api/v-text-field/) | Text field component |

<ApiInline hide-links />

## Guide

The `v-date-time-input` component extends [v-text-field](/components/text-fields/). The pickers open one at a time in the same menu, so the field works at phone width. Props for the pickers themselves go through **date-picker-props** and **time-picker-props**.

Clicking the date part of the text opens the date picker, and clicking the time part opens the time picker. From the keyboard, <kbd>Alt</kbd> + <kbd>↓</kbd> opens the picker for the part under the caret, and <kbd>Enter</kbd> commits the typed value.

The first date picked in an empty field moves on to the time picker. Changing the date of a value that is already set keeps its time.

The value is a wall-clock time with no time zone, so it can be passed to `Temporal.PlainDateTime.from()` as is. Time zones are left to the application: `new Date(value)` reads the value in the browser's time zone.

The model also accepts a space in place of `T`, and seconds, which are dropped. A value with `Z`, an offset or a time zone name is a moment in time rather than a wall-clock time. It is rejected with a warning, because only the application knows which time zone to show it in. Convert it first, for example with `zonedDateTime.toPlainDateTime().toString()`.

### Props

#### Default time

Picking or typing only a date fills in **default-time**. When only a time is picked, the date is today.

<ExamplesExample file="v-date-time-input/prop-default-time" />

#### Min and max

**min** and **max** take the same string format as the model. A date without a time means the start of the day for **min** and the end of the day for **max**. The date picker limits the days, and the time picker limits the hours only on the first and the last day. A typed value outside the range is clamped into it.

<ExamplesExample file="v-date-time-input/prop-min-max" />

#### Allowed values

**allowed-dates**, **allowed-hours** and **allowed-minutes** apply to the pickers and to typing. A typed value they reject leaves the model unchanged.

<ExamplesExample file="v-date-time-input/prop-allowed" />

#### Input format

**input-format** sets the order and separator of the date part, and **format** sets the hour cycle. Both follow the current locale by default.

<ExamplesExample file="v-date-time-input/prop-input-format" />

#### Menu

The menu model is `'date'`, `'time'` or `false`. Set it from your own controls to open a specific picker, for example two icon buttons in place of the default calendar icon. Buttons in the **append-inner** slot do not open a picker by themselves.

<ExamplesExample file="v-date-time-input/prop-menu" />

## Examples

### Time zones

Read in the browser's time zone with `new Date(value)`, the value becomes a moment that `Intl.DateTimeFormat` can show in other time zones. The **append-inner** slot stays free for the zone label.

<ExamplesExample file="v-date-time-input/misc-time-zones" />
