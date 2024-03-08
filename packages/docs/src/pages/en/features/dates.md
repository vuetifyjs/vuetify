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

The following example demonstrates explicitly importing the Vuetify date adapter and passing it to the date options.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VuetifyDateAdapter } from 'vuetify/date/adapters/vuetify'

export default createVuetify({
  date: {
    adapter: VuetifyDateAdapter,
  },
})
```

Within your application, import the **useDate** function and use it to access the date composable.

```html { resource="src/views/Date.vue" }
<script setup>
  import { useDate } from 'vuetify'

  const date = useDate()

  console.log(date.getMonth(new Date('March 1, 2021'))) // 3
</script>
```

::: info

For a list of all supported date adapters, visit the [date-io](https://github.com/dmtrKovalenko/date-io#projects) project repository.

:::

### Format options

The date composable supports the following date formatting options:

* fullDateWithWeekday
* normalDateWithWeekday
* keyboardDate
* monthAndDate
* monthAndYear
* month
* monthShort
* dayOfMonth
* shortDate
* year

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

### Adapter

The built-in date adapter implements a subset of functionality from the [DateIOFormats](https://github.com/dmtrKovalenko/date-io/blob/master/packages/core/IUtils.d.ts) interface. Because of this, it's easy to swap in any date library supported by [date-io](https://github.com/dmtrKovalenko/date-io).

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import LuxonAdapter from "@date-io/luxon"

const luxon = new LuxonAdapter({ locale: "sv" });

export default createVuetify({
  date: {
    adapter: luxon,
  },
})
```

#### Create your own

To create your own date adapter, implement the **DateAdapter** interface:

```ts
import type { DateAdapter } from 'vuetify/labs'

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
