// Types
import type { VNode } from 'vue'

export type CalendarCategory =
  | string
  | {
    [key: string]: any
    name?: string
    categoryName?: string
  }

export type CalendarCategoryTextFunction = (
  category: CalendarCategory
) => string

export interface CalendarTimestamp {
  date: string
  time: string
  year: number
  month: number
  day: number
  weekday: number
  hour: number
  minute: number
  hasDay: boolean
  hasTime: boolean
  past: boolean
  present: boolean
  future: boolean
  category?: CalendarCategory
}

export type CalendarFormatter = (timestamp: CalendarTimestamp, short: boolean) => string

export interface CalendarEvent {
  [prop: string]: any
}

export interface CalendarEventParsed {
  input: CalendarEvent
  start: CalendarTimestamp
  startIdentifier: number
  startTimestampIdentifier: number
  end: CalendarTimestamp
  endIdentifier: number
  endTimestampIdentifier: number
  allDay: boolean
  index: number
  category: string | false
}

export interface CalendarEventVisual {
  event: CalendarEventParsed
  columnCount: number
  column: number
  left: number
  width: number
}

export interface CalendarDaySlotScope extends CalendarTimestamp {
  outside: boolean
  index: number
  week: CalendarTimestamp[]
  category: CalendarCategory
}

export type CalendarTimeToY = (time: CalendarTimestamp | number | string, clamp?: boolean) => number

export type CalendarTimeDelta = (time: CalendarTimestamp | number | string) => number | false

export interface CalendarDayBodySlotScope extends CalendarDaySlotScope {
  timeToY: CalendarTimeToY
  timeDelta: CalendarTimeDelta
}

export type CalendarEventOverlapMode = (
  events: CalendarEventParsed[],
  firstWeekday: number,
  overlapThreshold: number
) => (
  day: CalendarDaySlotScope,
  dayEvents: CalendarEventParsed[],
  timed: boolean,
  reset: boolean
) => CalendarEventVisual[]

export type CalendarEventColorFunction = (event: CalendarEvent) => string

export type CalendarEventTimedFunction = (event: CalendarEvent) => boolean

export type CalendarEventCategoryFunction = (event: CalendarEvent) => string

export type CalendarEventNameFunction = (event: CalendarEventParsed, timedEvent: boolean) => string | VNode
