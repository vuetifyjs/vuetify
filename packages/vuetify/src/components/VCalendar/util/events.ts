import {
  VTimestamp,
  parseTimestamp,
  getDayIdentifier,
  getTimestampIdentifier,
} from './timestamp'

export interface VEventInput {
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

export function parseEvent (input: VEventInput, index: number, startProperty: string, endProperty: string): VEventParsed {
  if (!(startProperty in input)) {
    throw new Error('The ' + startProperty + ' property is required on all events to be a valid timestamp in the format YYYY-MM-DD or YYYY-MM-DD hh:mm')
  }

  const start: VTimestamp = parseTimestamp(input[startProperty]) as VTimestamp
  const end: VTimestamp = (input[endProperty] ? parseTimestamp(input[endProperty]) : start) as VTimestamp
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
