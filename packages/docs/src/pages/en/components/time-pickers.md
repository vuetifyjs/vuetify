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

The `v-time-picker` is stand-alone component that can be utilized in many existing Vuetify components. It offers the user a visual representation for selecting the time.

<PageFeatures />

## Usage

Time pickers have the light theme enabled by default.

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

You can specify allowed times using arrays, objects, and functions. You can also specify time step/precision/interval - e.g. 10 minutes.

<ExamplesExample file="v-time-picker/prop-allowed-times" />

#### Scrollable

You can edit time picker's value using mouse wheel.

<ExamplesExample file="v-time-picker/prop-scrollable" />

#### Use seconds

Time picker can have seconds input.

<ExamplesExample file="v-time-picker/prop-use-seconds" />

### Misc

#### Dialog and menu

Due to the flexibility of pickers, you can really dial in the experience exactly how you want it.

<ExamplesExample file="v-time-picker/misc-dialog-and-menu" />
