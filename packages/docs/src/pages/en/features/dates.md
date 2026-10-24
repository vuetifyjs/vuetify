---
meta:
  title: Dates
  description: Vuetify has first party date support that can easily be swapped for another date library
  keywords: date, datepicker, datetime, time, calendar, picker, date library
related:
- /features/blueprints/
- /features/global-configuration/
- /features/treeshaking/
features:
  github: /composables/date/
  label: 'E: date'
  report: true
---

# Dates

Easily hook up date libraries that are used for components such as Date Picker and Calendar that require date functionality.

<PageFeatures />

<PromotedEntry />

## Usage

The date composable provides a shared architecture that is used by components such as date picker and calendar. The default adapter is `V0DateAdapter` from `@vuetify/v0`, built on [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal): date components emit `Temporal.PlainDateTime` values, and strings are read as ISO 8601. It can be swapped out for another date library.

The default adapter needs the Temporal polyfill:

```bash
pnpm add @js-temporal/polyfill
```

Within your application, import the **useDate** function and use it to access the date composable.

```html { resource="src/views/Date.vue" }
<script setup>
  import { useDate } from 'vuetify'

  const date = useDate()

  console.log(date.getMonth(date.date('2021-03-01'))) // 2
</script>
```

::: info

For a list of all supported date adapters, visit the [date-io](https://github.com/dmtrKovalenko/date-io#projects) project repository.

:::

### Format options

The date composable supports the following date formatting options:

| Format Name | Format Output |
| - | - |
| fullDate | "Jan 1, 2024" |
| fullDateWithWeekday | "Tuesday, January 1, 2024" |
| normalDate | "1 January" |
| normalDateWithWeekday | "Wed, Jan 1" |
| shortDate | "Jan 1" |
| year | "2024" |
| month | "January" |
| monthShort | "Jan" |
| monthAndYear | "January 2024" |
| monthAndDate | "January 1" |
| weekday | "Wednesday" |
| weekdayShort | "Wed" |
| dayOfMonth | "1" |
| hours12h | "11" |
| hours24h | "23" |
| minutes | "44" |
| seconds | "00" |
| fullTime | "11:44 PM" for US, "23:44" for Europe |
| fullTime12h | "11:44 PM" |
| fullTime24h | "23:44" |
| fullDateTime | "Jan 1, 2024 11:44 PM" |
| fullDateTime12h | "Jan 1, 2024 11:44 PM" |
| fullDateTime24h | "Jan 1, 2024 23:44" |
| keyboardDate | "02/13/2024" |
| keyboardDateTime | "02/13/2024 23:44" |
| keyboardDateTime12h | "02/13/2024 11:44 PM" |
| keyboardDateTime24h | "02/13/2024 23:44" |

The following example shows how to use the date composable to format a date string:

```html { resource="src/views/Date.vue" }
<script setup>
  import { useDate } from 'vuetify'

  const date = useDate()

  const formatted = date.format('2010-04-13', 'fullDateWithWeekday')

  console.log(formatted) // Tuesday, April 13, 2010
</script>
```

### Custom formats

You can extend available formats by providing definitions matching your adapter capabilities.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'

export default createVuetify({
  date: {
    formats: {
      // for built-in adapter
      weekdayNarrow: { weekday: 'narrow' },
      // for Moment or Day.js
      weekdayNarrow: 'dd',
      // for Luxon or DateFns
      weekdayNarrow: 'EEEEE',
    },
  },
})
```

```js
// use registered key
date.format(adapter.date(), 'weekdayNarrow')
```

Built-in adapter accepts objects that will be passed to Intl.DateTimeFormat.

```js
// works only with built-in adapter
date.format(adapter.date(), { weekday: 'narrow' })
```

## API

| Feature | Description |
| - | - |
| [useDate](/api/use-date/) | The date composable is used by components that require date functionality |

<ApiInline hide-links />

## Adapter

Any date library supported by [date-io](https://github.com/dmtrKovalenko/date-io) can replace the default adapter. Date components then emit that library's date type, e.g. `Date` with date-fns.

::: info

Starting with [v4.3.1](/getting-started/release-notes/?version=v4.3.1), Vuetify computes weeks itself for date-io adapters, which ignore the week arguments, to make **first-day-of-week**, **first-day-of-year** and **weekday-format** work. Remove any patched `startOfWeek` left over from older workarounds; Vuetify trusts an adapter whose `startOfWeek` honors the argument and skips this handling for all week methods.

:::

### Using DateFns

To use DateFns as the date adapter, install the necessary packages:

::: tabs

```bash [pnpm]
pnpm install @date-io/date-fns date-fns
```

```bash [yarn]
yarn add @date-io/date-fns date-fns
```

```bash [npm]
npm install @date-io/date-fns date-fns
```

```bash [bun]
bun install @date-io/date-fns date-fns
```

:::

Then configure Vuetify to use DateFns:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import DateFnsAdapter from "@date-io/date-fns"

export default createVuetify({
  date: {
    adapter: DateFnsAdapter,
  },
})
```

For more information on DateFns, visit the [date-fns](https://date-fns.org/) documentation.

### Using DayJs

To use DayJs as the date adapter, install the necessary packages:

::: tabs

```bash [pnpm]
pnpm install @date-io/dayjs dayjs
```

```bash [yarn]
yarn add @date-io/dayjs dayjs
```

```bash [npm]
npm install @date-io/dayjs dayjs
```

```bash [bun]
bun add @date-io/dayjs dayjs
```

:::

Then configure Vuetify to use DayJs:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import DayJsAdapter from '@date-io/dayjs'
import en from 'dayjs/locale/en'

export default createVuetify({
  date: {
    adapter: DayJsAdapter,
    locale: { en },
  },
})
```

For more information on DayJs, visit the [dayjs](https://day.js.org/) documentation.

### Using Luxon

To use Luxon as the date adapter, install the necessary packages:

::: tabs

```bash [pnpm]
pnpm install @date-io/luxon luxon
```

```bash [yarn]
yarn add @date-io/luxon luxon
```

```bash [npm]
npm install @date-io/luxon luxon
```

```bash [bun]
bun add @date-io/luxon luxon
```

:::

Then configure Vuetify to use Luxon:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import LuxonAdapter from '@date-io/luxon'

export default createVuetify({
  date: {
    adapter: LuxonAdapter,
  },
})
```

For more information on Luxon, visit the [luxon](https://moment.github.io/luxon/) documentation.

### Using Moment

To use Moment as the date adapter, install the necessary packages:

::: tabs

```bash [pnpm]
pnpm install @date-io/moment moment
```

```bash [yarn]
yarn add @date-io/moment moment
```

```bash [npm]
npm install @date-io/moment moment
```

```bash [bun]
bun add @date-io/moment moment
```

:::

Then configure Vuetify to use Moment:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import MomentAdapter from '@date-io/moment'

export default createVuetify({
  date: {
    adapter: MomentAdapter,
  },
})
```

For more information on Moment, visit the [moment](https://momentjs.com/) documentation.

## Typescript

For TypeScript users, an interface is also exposed for [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation):

```ts { resource="src/plugins/vuetify.js" }
export default createVuetify({
  ...
})

declare module 'vuetify' {
  namespace DateModule {
    interface Adapter extends LuxonAdapter {}
  }
}
```

## Localization

The date composable will use the current vuetify [locale](/features/internationalization/) for formatting and getting the first day of the week. These do not always line up perfectly, so a list of aliases can be provided to map language codes to locales. The following configuration will look up `en` keys for translations, but use `en-GB` for date formatting:

```js { resource="src/plugins/vuetify.js" }
export default createVuetify({
  locale: {
    locale: 'en',
  },
  date: {
    locale: {
      en: 'en-GB',
    },
  },
})
```

## Create your own

To create your own date adapter, extend `DateAdapter` from `@vuetify/v0` and implement its methods, see [useDate](https://0.vuetifyjs.com/composables/plugins/use-date). Pass the class or an instance as `adapter`.

Adapters written for Vuetify 4's interface, which take `firstDayOfWeek` as an argument of the week methods, still work but log a deprecation warning.

## Inheritance

You can also extend and override the default adapter using class inheritance:

```ts
import { V0DateAdapter } from '@vuetify/v0/date'
import type { Temporal } from '@js-temporal/polyfill'

export class MyAdapter extends V0DateAdapter {
  sayHello () {
    return `Hello, today is ${this.format(this.date()!, 'fullDateWithWeekday')}`
  }
  override format (date: Temporal.PlainDateTime, formatString: string): string {
    return formatString === 'quarter'
      ? `Q${Math.ceil(date.month / 3)} ${date.year}`
      : super.format(date, formatString)
  }
}
```

```ts { resource="src/plugins/vuetify.js" }
export default createVuetify({
  date: {
    adapter: MyAdapter,
  },
  ...
})

declare module 'vuetify' {
  namespace DateModule {
    interface Adapter extends MyAdapter {}
  }
}
```

## String adapter

Date objects can be inconvenient to work with, especially if you're just passing the value straight to a fetch request. Vuetify also exports a StringDateAdapter that will cause date components to emit strings instead.

```ts { resource="src/plugins/vuetify.js" }
import { StringDateAdapter } from 'vuetify/date/adapters/string'

export default createVuetify({
  date: {
    adapter: StringDateAdapter,
  },
})
```
