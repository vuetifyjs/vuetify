---
emphasized: true
meta:
  nav: Calendars
  title: Calendar component
  description: The calendar component is a clean and simple adaptation to the popular Google Calendar application.
  keywords: calendars, vuetify calendar component, vue calendar component
related:
  - /components/date-pickers/
  - /features/dates/
  - /components/cards/
features:
  github: /labs/VCalendar/
  label: 'C: VCalendar'
  report: true
---

# Calendars

The `v-calendar` component is used to display information in a daily, weekly, monthly. The daily view has slots for all day or timed elements, and the weekly and monthly view has a slot for each day.

<PageFeatures />

::: warning
This feature requires [v3.4.9](/getting-started/release-notes/?version=v3.4.9)
:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VCalendar } from 'vuetify/labs/VCalendar'

export default createVuetify({
  components: {
    VCalendar,
  },
})
```

## Usage

A calendar has a type and a value which determines what type of calendar is shown over what span of time. This shows the bare minimum configuration, an array of events with **title**, **start** and **end** properties. **end** is optional, it defaults to the **start**. If the **start** has a time it's considered a timed event and will be shown accordingly in the day views. An event can span multiple days and will be rendered accordingly.

<ExamplesExample file="v-calendar/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-calendar](/api/v-calendar/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-calendar` component in Vuetify offers a versatile solution for building various calendar interfaces. It's designed to be highly customizable, catering to a wide range of applications from simple date pickers to complex event calendars.

### Props

The `v-calendar` component is equipped with a range of props that allow you to tailor its functionality and appearance to your specific requirements. This section will provide an overview of the available properties, offering insights into their usage and impact on the calendar's behavior and presentation.

#### Type month

This is a calendar with the type of `month`

<ExamplesExample file="v-calendar/prop-type-month" />

#### Type week

This is a calendar with the type of `week`

<ExamplesExample file="v-calendar/prop-type-week" />

#### Type day

This is a calendar with the type of `day`

<ExamplesExample file="v-calendar/prop-type-day" />
