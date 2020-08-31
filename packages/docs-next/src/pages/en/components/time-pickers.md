---
meta:
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

<entry-ad />

## Usage

Time pickers have the light theme enabled by default.

<usage name="v-time-picker" />

## API

- [v-time-picker](/api/v-time-picker)

## Examples

### Props

#### Allowed times

You can specify allowed times using arrays, objects, and functions. You can also specify time step/precision/interval - e.g. 10 minutes.

<example file="v-time-picker/prop-allowed-times" />

#### AMPM in title

You can move AM/PM switch to picker's title.

<example file="v-time-picker/prop-ampm-in-title" />

#### Colors

Time picker colors can be set using the `color` and `header-color` props. If `header-color` prop is not provided  header will use the `color` prop value."

<example file="v-time-picker/prop-color" />

#### Disabled

You can't interact with disabled picker.

<example file="v-time-picker/prop-disabled" />

#### Elevation

Emphasize the `v-time-picker` component by providing an **elevation** from 0 to 24. Elevation modifies the `box-shadow` css property.

<example file="v-time-picker/prop-elevation" />

#### Format

A time picker can be switched to 24hr format. Note that the `format` prop defines only the way the picker is displayed, picker's value (model) is always in 24hr format.

<example file="v-time-picker/prop-format" />

#### No title

You can remove picker's title.

<example file="v-time-picker/prop-no-title" />

#### Range

This is an example of joining pickers together using `min` and `max` prop.

<example file="v-time-picker/prop-range" />

#### Read-only

Read-only picker behaves same as disabled one, but looks like default one.

<example file="v-time-picker/prop-readonly" />

#### Scrollable

You can edit time picker's value using mouse wheel.

<example file="v-time-picker/prop-scrollable" />

#### Use seconds

Time picker can have seconds input.

<example file="v-time-picker/prop-use-seconds" />

#### Width

You can specify allowed the picker's width or make it full width.

<example file="v-time-picker/prop-width" />

### Misc

#### Dialog and menu

Due to the flexibility of pickers, you can really dial in the experience exactly how you want it.

<example file="v-time-picker/misc-dialog-and-menu" />

<backmatter />
