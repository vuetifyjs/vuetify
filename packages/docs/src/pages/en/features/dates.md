---
meta:
  title: Dates
  description: Vuetify has first party date support that can easily be swapped for another date library
  keywords: date, datepicker, datetime, time, calendar, picker, date library
related:
- /features/blueprints/
- /features/global-configuration/
- /features/treeshaking/
---

# Dates

Easily hook up date libraries that are used for components that require date functionality.

<entry />

## Usage

The date composable provides a shared architecture that is used by components such as date picker and calendar. The default implementation is built using the native Date object, but can be swapped out for another date library. The following example shows the default behavior of the date composable. If no other date adapter is given, the default Vuetify one is used.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import VuetifyDateAdapter from 'vuetify/adapters'

export default createVuetify({
  date: {
    adapter: VuetifyDateAdapter,
  },
})
```

### Adapter

The built in date adapter implements a subset of functionality from the [DateIOFormats](https://github.com/dmtrKovalenko/date-io/blob/master/packages/core/IUtils.d.ts) interface. Because of this, it's easy to swap in any date library supported by [date-io](https://github.com/dmtrKovalenko/date-io).

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

### API

#### Interface

```ts
export interface DateAdapter<Date> {
  setLocale (locale: string): void

  date (value?: any): Date | null
  format (date: Date, formatString: string): string

  startOfMonth (date: Date): Date
  endOfMonth (date: Date): Date
  startOfYear (date: Date): Date
  endOfYear (date: Date): Date

  isAfter (date: Date, comparing: Date): boolean
  isEqual (date: Date, comparing: Date): boolean
  isSameDay (date: Date, comparing: Date): boolean
  isSameMonth (date: Date, comparing: Date): boolean
  isValid (date: any): boolean
  isWithinRange (date: Date, range: [Date, Date]): boolean

  addDays (date: Date, amount: number): Date
  addMonths (date: Date, amount: number): Date

  getYear (date: Date): number
  setYear (date: Date, year: number): Date
  getDiff (date: Date, comparing: Date | string, unit?: string): number
  getWeek (date: Date): number
  getWeekArray (date: Date): (Date | null)[][]
  getWeekdays (): string[]
  getMonth (date: Date): number
}
```
