// Utilities
import { getWeek } from '@/util/dateTimeUtils'

// Types
import type { DateAdapter } from './date-adapter'

export default class DateFnsAdapter implements DateAdapter<Date> {
  getWeek (date: Date) {
    return getWeek(date)
  }
}
