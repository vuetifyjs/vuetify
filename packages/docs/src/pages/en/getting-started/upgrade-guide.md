---
emphasized: true
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

The date system now uses `@vuetify/v0` under the hood. The consumer API (`useDate()`) is unchanged for most users.

### Default date type changed

The default adapter now uses `Temporal.PlainDateTime` instead of native `Date`. If your code handles date values from VDatePicker or VCalendar model values, update accordingly:

```diff
- const year = modelValue.getFullYear()
+ const year = modelValue.year
```

### Locale-derived week settings removed

The default adapter no longer automatically derives `firstDayOfWeek` from the locale. All locales default to Sunday (0). Pass `firstDayOfWeek` explicitly to week-related methods if you need locale-specific behavior:

```ts
adapter.startOfWeek(date, 1) // Monday
adapter.getWeekArray(date, 1)
```

### Format differences

- `toISO()` now returns `"YYYY-MM-DDTHH:mm:ss"` (includes time) instead of `"YYYY-MM-DD"`
- `getWeekdays()` defaults to `'short'` format (`Sun`, `Mon`) instead of `'narrow'` (`S`, `M`)
- Time formats include seconds (`13:00:00` instead of `13:00`)

### Custom adapter migration

Custom adapters must implement `@vuetify/v0`'s `DateAdapter<T>` interface. Old adapters are auto-detected and wrapped with a deprecation warning. Key signature changes:

- `getWeek(date, firstDayOfWeek?, minimalDays?)` — third parameter is now `minimalDays` (minimum days in first week) instead of `firstDayOfYear`
- Several new methods required: `parse`, `isNull`, `formatByString`, `getFormatHelperText`, `formatNumber`, `getMeridiemText`, and others

### Third-party adapters

Date library adapters (luxon, dayjs, date-fns) will be shipped by `@vuetify/v0`:

```diff
- import { VuetifyLuxonAdapter } from 'vuetify/date/adapters/luxon'
+ import { LuxonDateAdapter } from '@vuetify/v0/date'
```

### Direct symbol injection deprecated

Use `useDate()` instead of injecting `DateAdapterSymbol` directly.
