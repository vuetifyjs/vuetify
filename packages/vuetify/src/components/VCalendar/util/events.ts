import {
  parseTimestamp,
  getDayIdentifier,
  getTimestampIdentifier,
} from './timestamp'
import { CalendarTimestamp, CalendarEvent } from 'types'

export interface VEventParsed {
  input: CalendarEvent
  start: CalendarTimestamp
  startIdentifier: number
  startTimestampIdentifier: number
  end: CalendarTimestamp
  endIdentifier: number
  endTimestampIdentifier: number
  allDay: boolean
  index: number
}

export function parseEvent (input: CalendarEvent, index: number, startProperty: string, endProperty: string): VEventParsed {
  if (!(startProperty in input)) {
    throw new Error('The ' + startProperty + ' property is required on all events to be a valid timestamp in the format YYYY-MM-DD or YYYY-MM-DD hh:mm')
  }

  const start: CalendarTimestamp = parseTimestamp(input[startProperty]) as CalendarTimestamp
  const end: CalendarTimestamp = (input[endProperty] ? parseTimestamp(input[endProperty]) : start) as CalendarTimestamp
  const startIdentifier: number = getDayIdentifier(start)
  const startTimestampIdentifier: number = getTimestampIdentifier(start)
  const endIdentifier: number = getDayIdentifier(end)
  const endTimestampIdentifier: number = getTimestampIdentifier(end)
  const allDay: boolean = !start.hasTime

  return { input, start, startIdentifier, startTimestampIdentifier, end, endIdentifier, endTimestampIdentifier, allDay, index }
}

export function isEventOn (event: VEventParsed, dayIdentifier: number): boolean {
  return dayIdentifier >= event.startIdentifier && dayIdentifier <= event.endIdentifier
}

export function isEventOverlapping (event: VEventParsed, startIdentifier: number, endIdentifier: number): boolean {
  return startIdentifier <= event.endIdentifier && endIdentifier >= event.startIdentifier
}
