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

::: success
This feature was introduced in [v3.4.0 (Blackguard)](/getting-started/release-notes/?version=v3.4.0)
:::

## Usage

The date composable provides a shared architecture that is used by components such as date picker and calendar. The default implementation is built using the native Date object, but can be swapped out for another date library. If no other date adapter is given, the default Vuetify one is used.

Within your application, import the **useDate** function and use it to access the date composable.

```html { resource="src/views/Date.vue" }
<script setup>
  import { useDate } from 'vuetify'

  const date = useDate()

  console.log(date.getMonth(new Date('March 1, 2021'))) // 2
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

## API

| Feature | Description |
| - | - |
| [useDate](/api/use-date/) | The date composable is used by components that require date functionality |

<ApiInline hide-links />

## Adapter

The built-in date adapter implements a subset of functionality from the [DateIOFormats](https://github.com/dmtrKovalenko/date-io/blob/master/packages/core/IUtils.d.ts) interface. Because of this, it's easy to swap in any date library supported by [date-io](https://github.com/dmtrKovalenko/date-io).

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
import { enUS } from 'date-fns/locale'

export default createVuetify({
  date: {
    adapter: DayJsAdapter,
    locale: { en: enUS },
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

To create your own date adapter, implement the **DateAdapter** interface:

```ts
import type { DateAdapter } from 'vuetify'

export interface DateAdapter<TDate> {
  date (value?: any): TDate | null
  format (date: TDate, formatString: string): string
  toJsTDate (value: TDate): TDate
  parseISO (date: string): TDate
  toISO (date: TDate): string

  startOfDay (date: TDate): TDate
  endOfDay (date: TDate): TDate
  startOfMonth (date: TDate): TDate
  endOfMonth (date: TDate): TDate
  startOfYear (date: TDate): TDate
  endOfYear (date: TDate): TDate

  isBefore (date: TDate, comparing: TDate): boolean
  isAfter (date: TDate, comparing: TDate): boolean
  isEqual (date: TDate, comparing: TDate): boolean
  isSameDay (date: TDate, comparing: TDate): boolean
  isSameMonth (date: TDate, comparing: TDate): boolean
  isValid (date: any): boolean
  isWithinRange (date: TDate, range: [TDate, TDate]): boolean

  addDays (date: TDate, amount: number): TDate
  addMonths (date: TDate, amount: number): TDate

  getYear (date: TDate): number
  setYear (date: TDate, year: number): TDate
  getDiff (date: TDate, comparing: TDate | string, unit?: string): number
  getWeekArray (date: TDate): TDate[][]
  getWeekdays (): string[]
  getMonth (date: TDate): number
  setMonth (date: TDate, month: number): TDate
  getNextMonth (date: TDate): TDate
}
```
