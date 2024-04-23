---
emphasized: true
meta:
  nav: Time pickers
  title: Time picker component
  description: The time picker component is a stand-alone interface that allows the selection of hours and minutes in AM/PM and 24hr formats.
  keywords: time pickers, vuetify time picker component, vue time picker component
related:
  - /components/buttons/
  - /components/date-pickers/
  - /components/text-fields/
---

# Time pickers

The `v-time-picker` is stand-alone component that can be utilized in many existing Vuetify components. It offers the user a visual representation for selecting the time.

<PageFeatures />

::: warning

This feature requires [v3.5.12](/getting-started/release-notes/?version=v3.5.12)

:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VTimePicker } from 'vuetify/labs/VTimePicker'

export default createVuetify({
  components: {
    VTimePicker,
  },
})
```

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

#### Colors

Time picker colors can be set using the `color` and `header-color` props. If `header-color` prop is not provided  header will use the `color` prop value."

<ExamplesExample file="v-time-picker/prop-color" />

#### Disabled

You can't interact with disabled picker.

<ExamplesExample file="v-time-picker/prop-disabled" />

#### Elevation

Emphasize the `v-time-picker` component by providing an **elevation** from 0 to 24. Elevation modifies the `box-shadow` css property.

<ExamplesExample file="v-time-picker/prop-elevation" />

#### Format

A time picker can be switched to 24hr format. Note that the `format` prop defines only the way the picker is displayed, picker's value (model) is always in 24hr format.

<ExamplesExample file="v-time-picker/prop-format" />

#### No header

You can remove picker's header.

<ExamplesExample file="v-time-picker/prop-hide-header" />

#### Range

This is an example of joining pickers together using `min` and `max` prop.

<ExamplesExample file="v-time-picker/prop-range" />

#### Read-only

Read-only picker behaves same as disabled one, but looks like default one.

<ExamplesExample file="v-time-picker/prop-readonly" />

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
