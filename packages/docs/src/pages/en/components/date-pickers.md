---
emphasized: true
meta:
  title: Date pickers
  description: The date picker component is a stand-alone interface that allows the selection of a date, month and year.
  keywords: date pickers, vuetify date picker component, vue date picker component
related:
  - /components/buttons/
  - /features/dates/
  - /components/text-fields/
features:
  github: /components/VDatePicker/
  label: 'C: VDatePicker'
  report: true
  spec: https://material.io/components/date-pickers
---

# Date pickers

`v-date-picker` is a fully featured date selection component that lets users select a date, or range of dates.

![Date picker Entry](https://cdn.vuetifyjs.com/docs/images/components/v-date-picker/v-date-picker-entry.png)

<page-features />

::: success
This feature was introduced in [v3.4.0 (Blackguard)](/getting-started/release-notes/?version=v3.4.0)
:::

## Usage

Date pickers come in two orientation variations, portrait **(default)** and landscape. By default they are emitting `input` event when the day (for date picker) or month (for month picker), but with **reactive** prop they can update the model even after clicking year/month.

<usage name="v-date-picker" />

<entry />

## API

| Component | Description |
| - | - |
| [v-date-picker](/api/v-date-picker/) | Primary Component |

<api-inline hide-links />

The `v-date-picker` component is a stand-alone interface that allows the selection of a date, month and year. This component is built using the [Date composable](/features/dates/).

All date components support the [date-io](https://github.com/dmtrKovalenko/date-io) abstraction layer for date management. By default they will use a built-in adapter that uses the native Date object, but it is possible to use any of the date-io adapters. See the [dates](/features/dates/) page for more information.

```js
import DayJsAdapter from '@date-io/dayjs'

createVuetify({
  date: {
    adapter: DayJsAdapter,
  }
})
```

The components also use the [i18n](/features/internationalization) feature to know which locale should be used for dates. If you are using the built-in date adapter, then everything should work automatically.

If you're not using the built-in date adapter, set up a mapping from the [i18n](/features/internationalization) locale string to the date library locale in the Vuetify options.

```js
import DateFnsAdapter from '@date-io/date-fns'
import enUS from 'date-fns/locale/en-US'
import svSE from 'date-fns/locale/sv'

createVuetify({
  date: {
    adapter: DateFnsAdapter,
    locale: {
      en: enUS,
      sv: svSE,
    },
  },
})
```

Here is an example of switching the locale of the **v-date-picker** component.

<example file="v-date-picker/guide-locale" />

To customize date formatting, provide a `formats` object to the date options. The keys align with the formats documented [here](/features/dates/#format-options). The value can be either a `[DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)` object or a method that returns a string.

::: warning

Keep in mind that the `formats` object is only valid when using the **built-in** date adapter. When using any other [date-io](https://github.com/dmtrKovalenko/date-io) adapter, make sure to follow that library's formatting documentation.

:::

```js
createVuetify({
  date: {
    formats: {
      keyboardDate: { year: 'numeric', month: 'long', day: 'numeric' },
      dayOfMonth: (date, formatString, locale) => date.getDate(),
    }
  }
})
```

## Examples

### Props

#### Elevation

The `v-date-picker` component supports elevation up to a maximum value of 24. For more information on elevations, visit the official [Material Design elevations](https://material.io/design/environment/elevation.html) page.

<example file="v-date-picker/prop-elevation" />

#### Width

You can specify the picker's width or make it full width.

<example file="v-date-picker/prop-width" />

#### Show sibling months

By default days from previous and next months are not visible. They can be displayed using the **show-adjacent-months** prop.

<example file="v-date-picker/prop-show-adjacent-months" />

#### Colors

Date picker colors can be set using the **color** props.

<example file="v-date-picker/prop-colors" />

#### Allowed dates

Specify allowed dates using objects or functions. When using objects, accepts a date string in the format of YYYY-MM-DD. When using functions, accepts a date object as a parameter and should return a boolean.

<example file="v-date-picker/prop-allowed-dates" />
