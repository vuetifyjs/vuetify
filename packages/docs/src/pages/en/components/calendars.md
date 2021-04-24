---
meta:
  title: Calendar component
  description: The calendar component is a clean and simple adaptation to the popular Google Calendar application.
  keywords: calendars, vuetify calendar component, vue calendar component
  related:
  - /components/date-pickers
  - /components/time-pickers
  - /components/cards
---

# Calendars

The `v-calendar` component is used to display information in a daily, weekly, monthly, or category view. The daily view has slots for all day or timed elements, and the weekly and monthly view has a slot for each day. The category view has a slot for each category in the day and timed sections based on the categories given or the categories in the given events. Optionally you can pass in an array of events and they will be rendered over the appropriate days and times.

<entry-ad />

## Usage

A calendar has a type and a value which determines what type of calendar is shown over what span of time. This shows the bare minimum configuration, an array of events with **name**, **start** and **end** properties. **end** is optional, it defaults to the **start**. If the **start** has a time it's considered a timed event and will be shown accordingly in the day views. An event can span multiple days and will be rendered accordingly.

<example file="v-calendar/usage" />

## API

- [v-calendar](/api/v-calendar)
- [v-calendar-daily](/api/v-calendar-daily)
- [v-calendar-monthly](/api/v-calendar-monthly)
- [v-calendar-weekly](/api/v-calendar-weekly)

<!-- ## Sub-components

### v-calendar-daily

v-calendar-daily description

### v-calendar-monthly

v-calendar-monthly description

### v-calendar-weekly

v-calendar-weekly description -->

## Examples

### Props

#### Type category

This is an example of an event calendar with a **type** of `category` that allows you to compare two schedules side-by-side.

<example file="v-calendar/prop-type-category" />

#### Type day

This is an example of calendar with content in each interval slot and a **type** of `day`.

<example file="v-calendar/prop-type-day" />

#### Type week

This is an example of an event calendar with all-day and timed events with a **type** of `week`.

<example file="v-calendar/prop-type-week" />

### Events

#### Click

This is an example of a planner with additional event handlers and external components controlling the display of the calendar.

<example file="v-calendar/event-click" />

### Slots

#### Day

Slots allow you to define the content for each day, time interval for the daily views, and various labels.

<example file="v-calendar/slot-day" />

#### Day body

Using the `day-body` slot you can customize the calendar content for the day. In this example we added a line for the current time.

<example file="v-calendar/slot-day-body" />

### Misc

#### Drag and drop

This is an example of an event calendar where you can drag events, extend their length, and create events.

<example file="v-calendar/misc-drag-and-drop" />

<backmatter />
