---
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
  spec: https://m2.material.io/components/date-pickers
---

# Date pickers

`v-date-picker` is a fully featured date selection component that lets users select a date.

![Date picker Entry](https://cdn.vuetifyjs.com/docs/images/components/v-date-picker/v-date-picker-entry.png)

<PageFeatures />

::: success

This feature was introduced in [v3.4.0 (Blackguard)](/getting-started/release-notes/?version=v3.4.0)

:::

## Usage

Date pickers come in two orientation variations, portrait **(default)** and landscape. By default they are emitting `input` event when the day (for date picker) or month (for month picker), but with **reactive** prop they can update the model even after clicking year/month.

<ExamplesUsage name="v-date-picker" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-date-picker](/api/v-date-picker/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-date-picker` component is a stand-alone interface that allows the selection of a date, month and year. This component is built using the [Date composable](/features/dates/).

All date components support the [date-io](https://github.com/dmtrKovalenko/date-io) abstraction layer for date management. By default they will use a built-in adapter that uses the native Date object, but it is possible to use any of the date-io adapters. See the [dates](/features/dates/) page for more information.

```js
import DayJsAdapter from '@date-io/dayjs'

createVuetify({
  date: {
    adapter: DayJsAdapter,
  },
})
```

### Props

The `v-date-picker` component supports multiple props for configuring dates that can be selected, date formats, translations and more.

#### Elevation

The `v-date-picker` component supports elevation up to a maximum value of 24. For more information on elevations, visit the official [Material Design elevations](https://material.io/design/environment/elevation.html) page.

<ExamplesExample file="v-date-picker/prop-elevation" />

#### Width

You can specify the picker's width or make it full width.

<ExamplesExample file="v-date-picker/prop-width" />

#### Show sibling months

By default days from previous and next months are not visible. They can be displayed using the **show-adjacent-months** prop.

<ExamplesExample file="v-date-picker/prop-show-adjacent-months" />

#### Colors

Date picker colors can be set using the **color** props.

<ExamplesExample file="v-date-picker/prop-colors" />

#### Allowed dates

Specify allowed dates using objects or functions. When using objects, accepts a date string in the format of YYYY-MM-DD. When using functions, accepts a date object as a parameter and should return a boolean.

<ExamplesExample file="v-date-picker/prop-allowed-dates" />

### Internationalization

Vuetify components can localize date formats by utilizing the [i18n](/features/internationalization) feature. This determines the appropriate locale for date display. When the default date adapter is in use, localization is managed automatically.

For those not using the default date adapter, you need to create a mapping between the i18n locale string and your chosen date library's locale. This can be done in the Vuetify options as shown below:

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

### Parsing dates

It's recommended that you use the [Date composable](/features/dates/) for parsing and formatting when working with string dates. The following example uses the parseISO function to convert a string date to a Date object.

```js
import { useDate } from 'vuetify'

const adapter = useDate()
const date = '2023-11-30'

console.log(new Date(date)) // Wed Nov 29 2023 18:00:00 GMT-0600
console.log(adapter.parseISO(date)) // Thu Nov 30 2023 00:00:00 GMT-0600
```

Using this function ensures that the date is parsed correctly regardless of the user's timezone.
