// Types
import type { CalendarDaySlotScope, CalendarEventParsed } from '@/components/VCalendar/types.types'

export type VDailyEventsMap = {
  [date: string]: {
    parent: HTMLElement
    more: HTMLElement | null
    events: HTMLElement[]
  }
}

export interface VEventScopeInput {
  eventParsed: CalendarEventParsed
  day: CalendarDaySlotScope
  start: boolean
  end: boolean
  timed: boolean
}
