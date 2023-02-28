// Types
import type { DateAdapter } from './date-adapter'

function getWeekArray (date: Date) {
  const weeks = []
  let currentWeek = []
  const firstDayOfMonth = startOfMonth(date)
  const lastDayOfMonth = endOfMonth(date)

  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    currentWeek.push(null)
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const day = new Date(date.getFullYear(), date.getMonth(), i)

    // Add the day to the current week
    currentWeek.push(day)

    // If the current week has 7 days, add it to the weeks array and start a new week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  for (let i = currentWeek.length; i < 7; i++) {
    currentWeek.push(null)
  }

  weeks.push(currentWeek)

  return weeks
}

function startOfMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function date (value?: any): Date | null {
  if (value == null) return null

  if (value instanceof Date) return value

  if (typeof value === 'string') {
    const parsed = Date.parse(value)

    if (!isNaN(parsed)) return new Date(parsed)
  }

  return null
}

function getWeekdays () {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

function format (value: Date, formatString: string): string {
  const date = new Date(value)
  const options = {
    weekday: getWeekdays(),
    shortWeekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    month: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December',
    ],
    shortMonth: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }

  switch (formatString) {
    case 'fullDateWithWeekday':
      return `${options.weekday[date.getDay()]}, ${date.getDate()} ${options.month[date.getMonth()]} ${date.getFullYear()}`
    case 'normalDateWithWeekday':
      return `${options.shortWeekday[date.getDay()]}, ${date.getDate()} ${options.shortMonth[date.getMonth()]} ${date.getFullYear()}`
    case 'keyboardDate':
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate()}/${date.getFullYear()}`
    case 'monthAndDate':
      return `${options.month[date.getMonth()]} ${date.getDate()}`
    case 'monthAndYear':
      return `${options.month[date.getMonth()]} ${date.getFullYear()}`
    default:
      return date.toLocaleDateString()
  }
}

function addDays (date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

function addMonths (date: Date, amount: number) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + amount)
  return d
}

function getYear (date: Date) {
  return date.getFullYear()
}

function getMonth (date: Date) {
  return date.getMonth()
}

function startOfYear (date: Date) {
  return new Date(date.getFullYear(), 0, 1)
}
function endOfYear (date: Date) {
  return new Date(date.getFullYear(), 11, 31)
}

function getMondayOfFirstWeekOfYear (year: number) {
  return new Date(year, 0, 1)
}

// https://stackoverflow.com/questions/274861/how-do-i-calculate-the-week-number-given-a-date/275024#275024
export function getWeek (date: Date) {
  let year = date.getFullYear()
  let d1w1 = getMondayOfFirstWeekOfYear(year)

  if (date < d1w1) {
    year = year - 1
    d1w1 = getMondayOfFirstWeekOfYear(year)
  } else {
    const tv = getMondayOfFirstWeekOfYear(year + 1)
    if (date >= tv) {
      year = year + 1
      d1w1 = tv
    }
  }

  const diffTime = Math.abs(date.getTime() - d1w1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.floor(diffDays / 7) + 1
}

function isWithinRange (date: Date, range: [Date, Date]) {
  return isAfter(date, range[0]) && isBefore(date, range[1])
}

function isValid (date: any) {
  const d = new Date(date)

  return d instanceof Date && !isNaN(d.getTime())
}

function isAfter (date: Date, comparing: Date) {
  return date.getTime() > comparing.getTime()
}

function isBefore (date: Date, comparing: Date) {
  return date.getTime() < comparing.getTime()
}

function isEqual (date: Date, comparing: Date) {
  return date.getTime() === comparing.getTime()
}

function isSameDay (date: Date, comparing: Date) {
  return date.getDate() === comparing.getDate() &&
    date.getMonth() === comparing.getMonth() &&
    date.getFullYear() === comparing.getFullYear()
}

function isSameMonth (date: Date, comparing: Date) {
  return date.getMonth() === comparing.getMonth() &&
    date.getFullYear() === comparing.getFullYear()
}

function getDiff (date: Date, comparing: Date | string, unit?: string) {
  const d = new Date(date)
  const c = new Date(comparing)

  if (unit === 'month') {
    return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12
  }

  return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24))
}

function setYear (date: Date, year: number) {
  const d = new Date(date)
  d.setFullYear(year)
  return d
}

export default class DateFnsAdapter implements DateAdapter<Date> {
  date (value?: any) {
    return date(value)
  }

  addDays (date: Date, amount: number) {
    return addDays(date, amount)
  }

  addMonths (date: Date, amount: number) {
    return addMonths(date, amount)
  }

  getWeekArray (date: Date) {
    return getWeekArray(date)
  }

  startOfMonth (date: Date) {
    return startOfMonth(date)
  }

  endOfMonth (date: Date) {
    return endOfMonth(date)
  }

  format (date: Date, formatString: string) {
    return format(date, formatString)
  }

  isEqual (date: Date, comparing: Date) {
    return isEqual(date, comparing)
  }

  isValid (date: any) {
    return isValid(date)
  }

  isWithinRange (date: Date, range: [Date, Date]) {
    return isWithinRange(date, range)
  }

  isAfter (date: Date, comparing: Date) {
    return isAfter(date, comparing)
  }

  isSameDay (date: Date, comparing: Date) {
    return isSameDay(date, comparing)
  }

  isSameMonth (date: Date, comparing: Date) {
    return isSameMonth(date, comparing)
  }

  setYear (date: Date, year: number) {
    return setYear(date, year)
  }

  getDiff (date: Date, comparing: Date | string, unit?: string) {
    return getDiff(date, comparing, unit)
  }

  getWeek (date: Date) {
    return getWeek(date)
  }

  getWeekdays () {
    return getWeekdays()
  }

  getYear (date: Date) {
    return getYear(date)
  }

  getMonth (date: Date) {
    return getMonth(date)
  }

  startOfYear (date: Date) {
    return startOfYear(date)
  }

  endOfYear (date: Date) {
    return endOfYear(date)
  }
}
