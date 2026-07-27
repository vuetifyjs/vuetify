// Types
import { column } from './column'
import { stack } from './stack'
import type { CalendarEventOverlapMode } from '../types'

export const CalendarEventOverlapModes: Record<string, CalendarEventOverlapMode> = {
  stack,
  column,
}
