---
meta:
  title: Date picker component
  description: The date picker component is a stand-alone interface that allows the selection of a date, month and year.
  keywords: date pickers, vuetify date picker component, vue date picker component
related:
  - /components/buttons/
  - /components/text-fields/
  - /components/time-pickers/
---

# Date pickers

`v-date-picker` is a fully featured date selection component that lets users select a date, or range of dates.

<entry-ad />

## Usage

Date pickers come in two orientation variations, portrait **(default)** and landscape. By default they are emitting `input` event when the day (for date picker) or month (for month picker), but with **reactive** prop they can update the model even after clicking year/month.

<example file="v-date-picker/usage" />

## API

- [v-date-picker](/api/v-date-picker)

## Caveats

<alert type="warning">

  `v-date-picker` accepts ISO 8601 **date** strings (*YYYY-MM-DD*). For more information regarding ISO 8601 and other standards, visit the official ISO (International Organization for Standardization) [International Standards](https://www.iso.org/standards.html) page.

</alert>

## Examples

### Props

#### Allowed dates

You can specify allowed dates using arrays, objects, and functions.

<example file="v-date-picker/prop-allowed-dates" />

#### Colors

Date picker colors can be set using the **color** and **header-color** props. If **header-color** prop is not provided header will use the **color** prop value.

<example file="v-date-picker/prop-colors" />

#### Elevation

The `v-date-picker` component supports elevation up to a maximum value of 24. For more information on elevations, visit the official [Material Design elevations](https://material.io/design/environment/elevation.html) page.

<example file="v-date-picker/prop-elevation" />

#### Icons

You can override the default icons used in the picker.

<example file="v-date-picker/prop-icons" />

#### Multiple

Date picker can now select multiple dates with the **multiple** prop. If using **multiple** then date picker expects its model to be an array.

<example file="v-date-picker/prop-multiple" />

#### Picker date

You can watch the **picker-date** which is the displayed month/year (depending on the picker type and active view) to perform some action when it changes. This uses the `.sync` modifier.

<example file="v-date-picker/prop-picker-date" />

#### Range

Date picker can select date range with the **range** prop. When using **range** prop date picker expects its model to be an array of length 2 or empty.

<example file="v-date-picker/prop-range" />

#### Readonly

Selecting new date could be disabled by adding **readonly** prop.

<example file="v-date-picker/prop-readonly" />

#### Show current

By default the current date is displayed using outlined button - **show-current** prop allows you to remove the border or select different date to be displayed as the current one.

<example file="v-date-picker/prop-show-current" />

#### Width

You can specify allowed the picker's width or make it full width.

<example file="v-date-picker/prop-width" />

### Events

#### Date buttons

Handle events such as `@click`, `@dblclick`, `@mouseenter`, and more when interacting with *date, month, and year* buttons.

<example file="v-date-picker/event-button-events" />

#### Date events

You can specify events using arrays, objects or functions. To change the default color of the event use **event-color** prop. Your **events** function or object can return an array of colors (material or css) in case you want to display multiple event indicators.

<example file="v-date-picker/event-events" />

### Misc

#### Birthday picker

Starting with year picker by default, restricting dates range and closing the picker menu after selecting the day make the perfect birthday picker.

<example file="v-date-picker/misc-birthday" />

#### Dialog and menu

When integrating a picker into a `v-text-field`, it is recommended to use the **readonly** prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.

Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.

<example file="v-date-picker/misc-dialog-and-menu" />

#### Formatting

If you need to display date in the custom format (different than YYYY-MM-DD) you need to use the formatting function.

<example file="v-date-picker/misc-formatting" />

#### Formatting with external libraries

Formatting dates is possible also with external libs such as Moment.js or date-fns

<example file="v-date-picker/misc-formatting-external-libraries" />

#### Internationalization

The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the **locale** prop, and then set the first day of the week with the **first-day-of-week** prop.

<example file="v-date-picker/misc-internationalization" />

#### Orientation

Date pickers come in two orientation variations, portrait **(default)** and landscape.

<example file="v-date-picker/misc-orientation" />

<backmatter />
