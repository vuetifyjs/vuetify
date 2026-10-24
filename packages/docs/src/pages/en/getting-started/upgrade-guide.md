---
meta:
  nav: Upgrade guide
  title: Upgrade guide
  description: Detailed instructions on how to upgrade Vuetify from v4 to v5
  keywords: migration, upgrade, releases, upgrading vuetify, v5
related:
  - /introduction/roadmap/
  - /introduction/long-term-support/
  - /introduction/enterprise-support/
---

# Upgrade Guide

This page contains a detailed list of breaking changes and the steps required to upgrade your application from Vuetify 4 to Vuetify 5.

<PageFeatures />

## Date

The date system now uses `@vuetify/v0` under the hood. `useDate()` keeps its API.

### Temporal polyfill

The default adapter is built on [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal). Install the polyfill:

```bash
pnpm add @js-temporal/polyfill
```

### Default date type changed

The default adapter uses `Temporal.PlainDateTime` instead of `Date`. Date components emit `Temporal.PlainDateTime`, also when `v-model` holds a `Date`. Months are 1-based, and `new Date(value)` throws:

```diff
- const year = modelValue.getFullYear()
- const month = modelValue.getMonth() + 1
+ const year = modelValue.year
+ const month = modelValue.month
```

To keep `Date` values, use a date-io adapter such as `@date-io/date-fns`, see [Dates](/features/dates/).

### Strings are parsed as ISO 8601

String values must be ISO 8601. Other formats are no longer read through `new Date()`, so a `v-model` like `'12/25/2025'` shows as empty:

```diff
- <v-date-input model-value="12/25/2025" />
+ <v-date-input model-value="2025-12-25" />
```

### Week start follows CLDR

The first day of the week and the minimal days of week 1 come from the region of the resolved locale. A locale without a region takes its most likely one, e.g. `zh` resolves to China and weeks start on Monday, where Vuetify 4 fell back to Sunday. Map short codes to the region you need:

```ts
createVuetify({
  date: {
    locale: { zh: 'zh-TW' },
  },
})
```

### Built-in adapter removed

`vuetify/date/adapters/vuetify` is gone. Extend `V0DateAdapter` instead:

```diff
- import { VuetifyDateAdapter } from 'vuetify/date/adapters/vuetify'
+ import { V0DateAdapter } from '@vuetify/v0/date'
```

With `StringDateAdapter`, functions in `formats` receive a `Date` instead of an ISO string.

### Custom adapters

date-io adapters (date-fns, dayjs, luxon, moment) keep working, including `first-day-of-week`, `first-day-of-year` and `weekday-format`.

Other custom adapters should implement `DateAdapter` from `@vuetify/v0`. Adapters written against Vuetify 4's interface still work, with a deprecation warning. The differences:

- `firstDayOfWeek` is a property of the adapter instead of an argument of `startOfWeek`, `getWeekArray` and `getWeekdays`
- `getWeek(date, minimalDays?)` takes the minimal days of week 1 instead of `firstDayOfWeek` and `firstDayOfYear`
- `isNull` is renamed to `isNullish`, and `parse`, `formatByString`, `getFormatHelperText`, `formatNumber` and `getMeridiemText` are required

### Injection symbols deprecated

Use `useDate()` instead of injecting `DateAdapterSymbol` or `DateOptionsSymbol`. `DateOptionsSymbol` now provides the date options as passed to `createVuetify`, without the default locale map.
