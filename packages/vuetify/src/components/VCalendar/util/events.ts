import {
  parseTimestamp,
  getDayIdentifier,
  getTimestampIdentifier,
  OFFSET_TIME,
} from './timestamp'
import { CalendarTimestamp, CalendarEvent, CalendarEventParsed } from 'types'

export function parseEvent (input: CalendarEvent, index: number, startProperty: string, endProperty: string): CalendarEventParsed {
  const start: CalendarTimestamp = parseTimestamp(input[startProperty], true)
  const end: CalendarTimestamp = (input[endProperty] ? parseTimestamp(input[endProperty], true) : start)
  const startIdentifier: number = getDayIdentifier(start)
  const startTimestampIdentifier: number = getTimestampIdentifier(start)
  const endIdentifier: number = getDayIdentifier(end)
  const endOffset: number = start.hasTime ? 0 : 2359
  const endTimestampIdentifier: number = getTimestampIdentifier(end) + endOffset
  const allDay: boolean = !start.hasTime

  return { input, start, startIdentifier, startTimestampIdentifier, end, endIdentifier, endTimestampIdentifier, allDay, index }
}

export function isEventOn (event: CalendarEventParsed, dayIdentifier: number): boolean {
  return dayIdentifier >= event.startIdentifier &&
    dayIdentifier <= event.endIdentifier &&
    dayIdentifier * OFFSET_TIME !== event.endTimestampIdentifier
}

export function isEventStart (event: CalendarEventParsed, day: CalendarTimestamp, dayIdentifier: number, firstWeekday: number): boolean {
  return dayIdentifier === event.startIdentifier || (firstWeekday === day.weekday && isEventOn(event, dayIdentifier))
}

export function isEventOverlapping (event: CalendarEventParsed, startIdentifier: number, endIdentifier: number): boolean {
  return startIdentifier <= event.endIdentifier && endIdentifier >= event.startIdentifier
}
