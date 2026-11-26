---
meta:
  nav: Time pickers
  title: Time picker component
  description: The time picker component is a stand-alone interface that allows the selection of hours and minutes in AM/PM and 24hr formats.
  keywords: time pickers, vuetify time picker component, vue time picker component
related:
  - /components/buttons/
  - /components/date-pickers/
  - /components/text-fields/
features:
  github: /components/VTimePicker/
  label: 'C: VTimePicker'
  report: true
  spec: https://m3.material.io/components/time-pickers
---

# Time pickers

The `v-time-picker` component lets users type a time or pick it on a clock dial. Set `variant="input"` to hide the dial and keep only the fields.

<PageFeatures />

## Usage

<ExamplesUsage name="v-time-picker" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-time-picker](/api/v-time-picker/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Allowed times

**allowed-hours**, **allowed-minutes** and **allowed-seconds** take an array of values or a function. Use a function for steps, such as every 10 minutes.

<ExamplesExample file="v-time-picker/prop-allowed-times" />

#### Scrollable

**scrollable** lets users change the value with the mouse wheel over the clock. Set it to `"controls"` to scroll the fields above the clock instead.

<ExamplesExample file="v-time-picker/prop-scrollable" />

#### Use seconds

**use-seconds** adds seconds to the picker and to the model.

<ExamplesExample file="v-time-picker/prop-use-seconds" />

### Misc

#### Dialog and menu

For an input, open the picker from a **readonly** text field with [v-menu](/components/menus/) or [v-dialog](/components/dialogs/). [v-time-input](/components/time-inputs/) covers the common case in one component with the field user can type or paste into.

<ExamplesExample file="v-time-picker/misc-dialog-and-menu" />
