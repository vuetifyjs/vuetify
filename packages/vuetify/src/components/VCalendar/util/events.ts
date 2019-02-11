
import {
  VTimestamp,
  parseTimestamp,
  getDayIdentifier,
  getTimestampIdentifier
} from './timestamp'

export interface VEventInput {
  start: string
  end?: string
  [prop: string]: any
}

export interface VEventParsed {
  input: VEventInput
  start: VTimestamp
  startIdentifier: number
  startTimestampIdentifier: number
  end: VTimestamp
  endIdentifier: number
  endTimestampIdentifier: number
  allDay: boolean
  index: number
}

export function parseEvent (input: VEventInput, index: number): VEventParsed {
  const start: VTimestamp = parseTimestamp(input.start)
  const end: VTimestamp = input.end ? parseTimestamp(input.end) : start
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
