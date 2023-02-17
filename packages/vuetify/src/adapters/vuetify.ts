// Utilities
import { getWeek } from '@/util/dateTimeUtils'

// Types
import type { DateAdapter } from './date-adapter'

export default class DateFnsAdapter implements DateAdapter<Date> {
  getDate (date: Date) {
    return date.getDate()
  }

  getDay (date: Date) {
    return date.getDay()
  }

  getWeek (date: Date) {
    return getWeek(date)
  }

  getDays (date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth() - 1
    const d = new Date(year, month)
    const days = []

    while (d.getMonth() === month) {
      days.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }

    return days
  }

  getMonth (date: Date) {
    return date.getMonth()
  }

  getYear (date: Date) {
    return date.getFullYear()
  }

  isSameDay (d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }
}
