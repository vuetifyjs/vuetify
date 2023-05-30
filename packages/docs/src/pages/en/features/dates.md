---
emphasized: false
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

The date composable provides a shared architecture that is used by components such as date picker and calendar. The default implementation is built using the native Date object, but can be swapped out for another date library. If no other date adapter is given, the default Vuetify one is used.

The following example demonstrates explicitly importing the Vuetify date adapter and passing it to the date options.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VuetifyDateAdapter } from 'vuetify/labs/date/adapters/vuetify'

export default createVuetify({
  date: {
    adapter: VuetifyDateAdapter,
  },
})
```

Within your application, import the **useDate** function and use it to access the date composable.

```html { resource="src/views/Date.vue" }
<script>
  import { useDate } from 'vuetify/labs/date'

  export default {
    setup () {
      const date = useDate()

      console.log(date.getMonth(new Date('March 1, 2021'))) // 3
    },
  }
</script>
```

<alert type="info">

For a list of all supported date adapters, visit the [date-io](https://github.com/dmtrKovalenko/date-io#projects) project repository.

</alert>

### Format options

The date composable supports the following date formatting options:

* fullDateWithWeekday
* normalDateWithWeekday
* keyboardDate
* monthAndDate
* monthAndYear

The following example shows how to use the date composable to format a date string:

```html { resource="src/views/Date.vue" }
<script>
  import { useDate } from 'vuetify/labs/date'

  export default {
    setup () {
      const date = useDate()

      const formatted = date.format('2010-04-13 00:00:00', 'fullDateWithWeekday')

      console.log(formatted) // Tuesday, April 13, 2010
    },
  }
</script>
```

## API

| Feature | Description |
| - | - |
| [useDate](/api/use-date/) | The date composable is used by components that require date functionality |

<api-inline hide-links />

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

export interface DateAdapter<Date> {
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
