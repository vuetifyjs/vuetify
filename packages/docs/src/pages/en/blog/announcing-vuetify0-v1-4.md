---
layout: blog
meta:
  title: Announcing Vuetify0 v1.4
  description: Vuetify0 v1.4 adds a headless TimePicker and createCalendar, and useDate now works without an adapter and handles non-Gregorian calendars.
  keywords: Vuetify0 v1.4, TimePicker, createTimePicker, createCalendar, useDate, V0DateAdapter, @vuetify/v0
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# Announcing Vuetify0 v1.4

Vuetify0 v1.4 is out. It adds [TimePicker](https://0.vuetifyjs.com/components/forms/time-picker) and [createCalendar](https://0.vuetifyjs.com/composables/forms/create-calendar), and [useDate](https://0.vuetifyjs.com/composables/plugins/use-date) now works without an adapter.

![Hero image for the Vuetify0 v1.4 release](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1-4/announcing-vuetify0-v1-4-hero.png "Vuetify0 v1.4 hero image"){ height=112 }

🖊️ John Leider • 📅 November 20th, 2026

<PromotedEntry />

---

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

## Table of Contents

- [Before you update](#before-you-update)
- [TimePicker](#timepicker)
- [createCalendar](#createcalendar)
- [useDate](#usedate)
- [The rest](#the-rest)

---

## Before you update { #before-you-update }

- **Using `V0DateAdapter` with a locale like `fa-IR`?** Without the new `calendar` option, formatting is now always Gregorian. Before, month names and years came out in the locale's default calendar while the date fields stayed Gregorian. Pass `calendar` (for example `'persian'`) to read, compute, and format in that calendar ([#1110](https://github.com/vuetifyjs/0/pull/1110)).

TimePicker, createTimePicker, and createCalendar ship as `preview`: feature-complete and documented, but their APIs may still change in a minor release, with every change in the release notes. The [Maturity Matrix](https://0.vuetifyjs.com/roadmap#maturity-matrix) lists the current level for everything.

## TimePicker

[TimePicker](https://0.vuetifyjs.com/components/forms/time-picker) edits a time as separate hour, minute, and optional second fields ([#1161](https://github.com/vuetifyjs/0/pull/1161)). The pieces are `TimePicker.Root`, `TimePicker.Hour`, `TimePicker.Minute`, `TimePicker.Second`, `TimePicker.Period`, `TimePicker.Description`, `TimePicker.Error`, and `TimePicker.HiddenInput`.

```html
<script setup lang="ts">
  import { TimePicker } from '@vuetify/v0'
  import { shallowRef } from 'vue'

  const value = shallowRef<string | null>('09:30')
</script>

<template>
  <TimePicker.Root v-model="value">
    <TimePicker.Hour v-slot="{ text }">{{ text || '—' }}</TimePicker.Hour>
    <span aria-hidden="true">:</span>
    <TimePicker.Minute v-slot="{ text }">{{ text || '—' }}</TimePicker.Minute>
  </TimePicker.Root>
</template>
```

The model is a 24-hour `HH:mm` string, or `HH:mm:ss` with `seconds`. It stays null until every enabled field has a value. `hour-cycle="h12"` adds the AM/PM field and shows the hour as 1–12, while the model stays 24-hour.

Each field is a spinbutton driven by Arrow keys, PageUp/PageDown, Home/End, and Backspace. Fields do not take typed digits.

`hour-step`, `minute-step`, and `second-step` keep each field on multiples of its step, and `min` and `max` bound the complete time. `minute-step="15"` with `min="10:07"` starts at `10:15`.

Validation works like v0's other form controls (`required`, `rules`, `validateOn`), and `name` submits the time through `TimePicker.HiddenInput`.

Underneath is [createTimePicker](https://0.vuetifyjs.com/composables/forms/create-time-picker). Use it directly when you want your own markup.

```ts
import { createTimePicker } from '@vuetify/v0'
import { shallowRef } from 'vue'

const value = shallowRef<string | null>(null)
const time = createTimePicker({ value, minuteStep: 15 })

time.commit('hour', 9)
time.commit('minute', 58)
time.value.value // '09:45'. commit snaps to the step and stops at the field's max instead of wrapping.

time.step('minute')
time.value.value // '09:00'. A step wraps past the end of the field.

time.grid('minute') // { min: 0, max: 45, step: 15 }
```

`step` moves a field by a signed number of intervals and wraps. `commit` snaps a field to its step without wrapping. `grid` reports the range and step a field can show. `input` exposes the createInput validation state.

## createCalendar

[createCalendar](https://0.vuetifyjs.com/composables/forms/create-calendar) is a Gregorian month grid with single and range selection ([#1116](https://github.com/vuetifyjs/0/pull/1116)).

```ts
import { createCalendar } from '@vuetify/v0'

const calendar = createCalendar({
  month: '2026-08',
  min: '2026-08-10',
  disabled: iso => iso === '2026-08-15',
})

calendar.select('2026-08-12')
calendar.month.value.weeks // six weeks of days
calendar.today() // pages to today and keeps the selection; selectToday() selects it
```

`mode` can be a ref, and changing it clears the selection. Days outside `min` and `max` are disabled, and `disabled` takes a list or a predicate. Paging stops at year 0000 and 9999. On the public surface a month is `YYYY-MM` and a day is `YYYY-MM-DD`.

Inside a component, the grid borrows the adapter, locale, and week start from an installed date plugin. Without one, it creates its own `V0PlainDateAdapter`. Pass `adapter` to skip the plugin. `firstDayOfWeek` overrides the week start for one grid.

## useDate

**No adapter required** ([#1086](https://github.com/vuetifyjs/0/pull/1086)). [useDate()](https://0.vuetifyjs.com/composables/plugins/use-date) no longer needs a plugin inside a component. It falls back to a plain JavaScript `Date`.

**A name for the default** ([#1122](https://github.com/vuetifyjs/0/pull/1122)). The default adapter is `V0PlainDateAdapter`. `PlainDateAdapter` still imports that class.

**Non-Gregorian calendars** ([#1110](https://github.com/vuetifyjs/0/pull/1110)). `V0DateAdapter` takes a `calendar` option, and the adapter reads, computes, and formats dates in that calendar. ISO strings and `Date` values stay Gregorian.

```ts
import { V0DateAdapter } from '@vuetify/v0/date'

const adapter = new V0DateAdapter('fa-IR', { calendar: 'persian' })
```

`V0DateAdapter` needs the optional `@js-temporal/polyfill` peer, which v0 uses for calendars other than `iso8601` until V8 implements calendar duration math. The `iso8601` path keeps the runtime's Temporal.

## The rest

**Kanban** ([#1136](https://github.com/vuetifyjs/0/pull/1136)). A pointer drag now sets `data-target` on the column and list under the pointer, and `data-drop` on the card the drop line is anchored to. Keyboard moves set the same attributes. The board context exposes `pointer` and `aim` for that hover.

**createOverflow** ([#1147](https://github.com/vuetifyjs/0/pull/1147)). `measure(index, source)` accepts a width in pixels as well as an element, and returns the width it recorded. An item that moves to another index can keep the width it had while visible. Breadcrumbs and Overflow use this, so removing an item no longer leaves its width behind, and the ellipsis matches a fresh mount of the remaining items.

**useLocale** ([#1161](https://github.com/vuetifyjs/0/pull/1161)). `locale.n()` now formats numbers on the server the same way as in the browser. Before, a locale with its own digits, such as `ar-EG`, rendered `7` on the server and `٧` on the client and failed hydration. A locale id `Intl.NumberFormat` does not accept, such as `en_US`, returns the bare number with a development warning instead of throwing.

The [full release notes](https://0.vuetifyjs.com/releases?version=v1.4.0) list every change. The [getting started guide](https://0.vuetifyjs.com/introduction/getting-started) covers setup.

- **Documentation:** [0.vuetifyjs.com](https://0.vuetifyjs.com)
- **TimePicker:** [components/forms/time-picker](https://0.vuetifyjs.com/components/forms/time-picker)
- **createCalendar:** [composables/forms/create-calendar](https://0.vuetifyjs.com/composables/forms/create-calendar)
- **Release:** [v1.4.0](https://0.vuetifyjs.com/releases?version=v1.4.0)
- **GitHub:** [vuetifyjs/0](https://github.com/vuetifyjs/0)

---

::: warning

**Vuetify needs your support.** Open Collective is how we fund the team that builds releases like this one. If your team relies on Vuetify, point your organization at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider).

:::
