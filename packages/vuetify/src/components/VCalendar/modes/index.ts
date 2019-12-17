import { CalendarEventOverlapMode } from 'types'
import { stack } from './stack'
import { column } from './column'

export const CalendarEventOverlapModes: Record<string, CalendarEventOverlapMode> = {
  stack,
  column,
}
