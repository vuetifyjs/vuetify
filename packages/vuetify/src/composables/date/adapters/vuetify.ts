// Utilities
import { createRange, padStart } from '@/util'

// Types
import type { DateAdapter } from '../DateAdapter'

type CustomDateFormat = Intl.DateTimeFormatOptions | ((date: Date, formatString: string, locale: string) => string)

function weekInfo (locale: string): { firstDay: number, firstWeekSize: number } | null {
  // https://simplelocalize.io/data/locales/
  // then `new Intl.Locale(...).getWeekInfo()`
  const code = locale.slice(-2).toUpperCase()
  switch (true) {
    case locale === 'GB-alt-variant': {
      return { firstDay: 0, firstWeekSize: 4 }
    }
    case locale === '001': {
      return { firstDay: 1, firstWeekSize: 1 }
    }
    case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(code): {
      return { firstDay: 0, firstWeekSize: 1 }
    }
    case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(code): {
      return { firstDay: 1, firstWeekSize: 1 }
    }
    case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(code): {
      return { firstDay: 1, firstWeekSize: 4 }
    }
    case `AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY`.includes(code): {
      return { firstDay: 6, firstWeekSize: 1 }
    }
    case code === 'MV': {
      return { firstDay: 5, firstWeekSize: 1 }
    }
    case code === 'PT': {
      return { firstDay: 0, firstWeekSize: 4 }
    }
    default: return null
  }
}

function getWeekArray (date: Date, locale: string, firstDayOfWeek?: number) {
  const weeks = []
  let currentWeek = []
  const firstDayOfMonth = startOfMonth(date)
  const lastDayOfMonth = endOfMonth(date)
  const first = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0
  const firstDayWeekIndex = (firstDayOfMonth.getDay() - first + 7) % 7
  const lastDayWeekIndex = (lastDayOfMonth.getDay() - first + 7) % 7

  for (let i = 0; i < firstDayWeekIndex; i++) {
    const adjacentDay = new Date(firstDayOfMonth)
    adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i))
    currentWeek.push(adjacentDay)
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

  for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
    const adjacentDay = new Date(lastDayOfMonth)
    adjacentDay.setDate(adjacentDay.getDate() + i)
    currentWeek.push(adjacentDay)
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

function startOfWeek (date: Date, locale: string, firstDayOfWeek?: number) {
  const day = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0

  const d = new Date(date)
  while (d.getDay() !== day) {
    d.setDate(d.getDate() - 1)
  }
  return d
}

function endOfWeek (date: Date, locale: string) {
  const d = new Date(date)
  const lastDay = ((weekInfo(locale)?.firstDay ?? 0) + 6) % 7
  while (d.getDay() !== lastDay) {
    d.setDate(d.getDate() + 1)
  }
  return d
}

function startOfMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function parseLocalDate (value: string): Date {
  const parts = value.split('-').map(Number)

  // new Date() uses local time zone when passing individual date component values
  return new Date(parts[0], parts[1] - 1, parts[2])
}

const _YYYMMDD = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/

function date (value?: any): Date | null {
  if (value == null) return new Date()

  if (value instanceof Date) return value

  if (typeof value === 'string') {
    let parsed

    if (_YYYMMDD.test(value)) {
      return parseLocalDate(value)
    } else {
      parsed = Date.parse(value)
    }

    if (!isNaN(parsed)) return new Date(parsed)
  }

  return null
}

const sundayJanuarySecond2000 = new Date(2000, 0, 2)

function getWeekdays (locale: string, firstDayOfWeek?: number) {
  const daysFromSunday = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0

  return createRange(7).map(i => {
    const weekday = new Date(sundayJanuarySecond2000)
    weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i)
    return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(weekday)
  })
}

function format (
  value: Date,
  formatString: string,
  locale: string,
  formats?: Record<string, CustomDateFormat>
): string {
  const newDate = date(value) ?? new Date()
  const customFormat = formats?.[formatString]

  if (typeof customFormat === 'function') {
    return customFormat(newDate, formatString, locale)
  }

  let options: Intl.DateTimeFormatOptions = {}
  switch (formatString) {
    case 'fullDate':
      options = { year: 'numeric', month: 'long', day: 'numeric' }
      break
    case 'fullDateWithWeekday':
      options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      break
    case 'normalDate':
      const day = newDate.getDate()
      const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(newDate)
      return `${day} ${month}`
    case 'normalDateWithWeekday':
      options = { weekday: 'short', day: 'numeric', month: 'short' }
      break
    case 'shortDate':
      options = { month: 'short', day: 'numeric' }
      break
    case 'year':
      options = { year: 'numeric' }
      break
    case 'month':
      options = { month: 'long' }
      break
    case 'monthShort':
      options = { month: 'short' }
      break
    case 'monthAndYear':
      options = { month: 'long', year: 'numeric' }
      break
    case 'monthAndDate':
      options = { month: 'long', day: 'numeric' }
      break
    case 'weekday':
      options = { weekday: 'long' }
      break
    case 'weekdayShort':
      options = { weekday: 'short' }
      break
    case 'dayOfMonth':
      return new Intl.NumberFormat(locale).format(newDate.getDate())
    case 'hours12h':
      options = { hour: 'numeric', hour12: true }
      break
    case 'hours24h':
      options = { hour: 'numeric', hour12: false }
      break
    case 'minutes':
      options = { minute: 'numeric' }
      break
    case 'seconds':
      options = { second: 'numeric' }
      break
    case 'fullTime':
      options = { hour: 'numeric', minute: 'numeric' }
      break
    case 'fullTime12h':
      options = { hour: 'numeric', minute: 'numeric', hour12: true }
      break
    case 'fullTime24h':
      options = { hour: 'numeric', minute: 'numeric', hour12: false }
      break
    case 'fullDateTime':
      options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      break
    case 'fullDateTime12h':
      options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
      break
    case 'fullDateTime24h':
      options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }
      break
    case 'keyboardDate':
      options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      break
    case 'keyboardDateTime':
      options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' }
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ')
    case 'keyboardDateTime12h':
      options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true }
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ')
    case 'keyboardDateTime24h':
      options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false }
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ')
    default:
      options = customFormat ?? { timeZone: 'UTC', timeZoneName: 'short' }
  }

  return new Intl.DateTimeFormat(locale, options).format(newDate)
}

function toISO (adapter: DateAdapter<any>, value: Date) {
  const date = adapter.toJsDate(value)
  const year = date.getFullYear()
  const month = padStart(String(date.getMonth() + 1), 2, '0')
  const day = padStart(String(date.getDate()), 2, '0')

  return `${year}-${month}-${day}`
}

function parseISO (value: string) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

function addMinutes (date: Date, amount: number) {
  const d = new Date(date)
  d.setMinutes(d.getMinutes() + amount)
  return d
}

function addHours (date: Date, amount: number) {
  const d = new Date(date)
  d.setHours(d.getHours() + amount)
  return d
}

function addDays (date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

function addWeeks (date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + (amount * 7))
  return d
}

function addMonths (date: Date, amount: number) {
  const d = new Date(date)
  d.setDate(1)
  d.setMonth(d.getMonth() + amount)
  return d
}

function getYear (date: Date) {
  return date.getFullYear()
}

function getMonth (date: Date) {
  return date.getMonth()
}

function getWeek (date: Date, locale: string, firstDayOfWeek?: number, firstWeekMinSize?: number) {
  const weekInfoFromLocale = weekInfo(locale)
  const weekStart = firstDayOfWeek ?? weekInfoFromLocale?.firstDay ?? 0
  const minWeekSize = firstWeekMinSize ?? weekInfoFromLocale?.firstWeekSize ?? 1
  function firstWeekSize (year: number) {
    const yearStart = new Date(year, 0, 1)
    return 7 - getDiff(yearStart, startOfWeek(yearStart, locale, weekStart), 'days')
  }

  let year = getYear(date)
  const currentWeekEnd = addDays(startOfWeek(date, locale, weekStart), 6)
  if (year < getYear(currentWeekEnd) && firstWeekSize(year + 1) >= minWeekSize) {
    year++
  }

  const yearStart = new Date(year, 0, 1)
  const size = firstWeekSize(year)
  const d1w1 = size >= minWeekSize
    ? addDays(yearStart, size - 7)
    : addDays(yearStart, size)

  return 1 + getDiff(date, d1w1, 'weeks')
}

function getDate (date: Date) {
  return date.getDate()
}

function getNextMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

function getPreviousMonth (date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}

function getHours (date: Date) {
  return date.getHours()
}

function getMinutes (date: Date) {
  return date.getMinutes()
}

function startOfYear (date: Date) {
  return new Date(date.getFullYear(), 0, 1)
}
function endOfYear (date: Date) {
  return new Date(date.getFullYear(), 11, 31)
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

function isAfterDay (date: Date, comparing: Date): boolean {
  return isAfter(startOfDay(date), startOfDay(comparing))
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

function isSameYear (date: Date, comparing: Date) {
  return date.getFullYear() === comparing.getFullYear()
}

function getDiff (date: Date, comparing: Date | string, unit?: string) {
  const d = new Date(date)
  const c = new Date(comparing)

  switch (unit) {
    case 'years':
      return d.getFullYear() - c.getFullYear()
    case 'quarters':
      return Math.floor((d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12) / 4)
    case 'months':
      return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12
    case 'weeks':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24 * 7))
    case 'days':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24))
    case 'hours':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60))
    case 'minutes':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60))
    case 'seconds':
      return Math.floor((d.getTime() - c.getTime()) / 1000)
    default: {
      return d.getTime() - c.getTime()
    }
  }
}

function setHours (date: Date, count: number) {
  const d = new Date(date)
  d.setHours(count)
  return d
}

function setMinutes (date: Date, count: number) {
  const d = new Date(date)
  d.setMinutes(count)
  return d
}

function setMonth (date: Date, count: number) {
  const d = new Date(date)
  d.setMonth(count)
  return d
}

function setDate (date: Date, day: number) {
  const d = new Date(date)
  d.setDate(day)
  return d
}

function setYear (date: Date, year: number) {
  const d = new Date(date)
  d.setFullYear(year)
  return d
}

function startOfDay (date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
}

function endOfDay (date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
}

export class VuetifyDateAdapter implements DateAdapter<Date> {
  locale: string
  formats?: Record<string, CustomDateFormat>

  constructor (options: { locale: string, formats?: Record<string, CustomDateFormat> }) {
    this.locale = options.locale
    this.formats = options.formats
  }

  date (value?: any) {
    return date(value)
  }

  toJsDate (date: Date) {
    return date
  }

  toISO (date: Date): string {
    return toISO(this, date)
  }

  parseISO (date: string) {
    return parseISO(date)
  }

  addMinutes (date: Date, amount: number) {
    return addMinutes(date, amount)
  }

  addHours (date: Date, amount: number) {
    return addHours(date, amount)
  }

  addDays (date: Date, amount: number) {
    return addDays(date, amount)
  }

  addWeeks (date: Date, amount: number) {
    return addWeeks(date, amount)
  }

  addMonths (date: Date, amount: number) {
    return addMonths(date, amount)
  }

  getWeekArray (date: Date, firstDayOfWeek?: number | string) {
    return getWeekArray(date, this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined)
  }

  startOfWeek (date: Date, firstDayOfWeek?: number | string): Date {
    return startOfWeek(date, this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined)
  }

  endOfWeek (date: Date): Date {
    return endOfWeek(date, this.locale)
  }

  startOfMonth (date: Date) {
    return startOfMonth(date)
  }

  endOfMonth (date: Date) {
    return endOfMonth(date)
  }

  format (date: Date, formatString: string) {
    return format(date, formatString, this.locale, this.formats)
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

  isAfterDay (date: Date, comparing: Date) {
    return isAfterDay(date, comparing)
  }

  isBefore (date: Date, comparing: Date) {
    return !isAfter(date, comparing) && !isEqual(date, comparing)
  }

  isSameDay (date: Date, comparing: Date) {
    return isSameDay(date, comparing)
  }

  isSameMonth (date: Date, comparing: Date) {
    return isSameMonth(date, comparing)
  }

  isSameYear (date: Date, comparing: Date) {
    return isSameYear(date, comparing)
  }

  setMinutes (date: Date, count: number) {
    return setMinutes(date, count)
  }

  setHours (date: Date, count: number) {
    return setHours(date, count)
  }

  setMonth (date: Date, count: number) {
    return setMonth(date, count)
  }

  setDate (date: Date, day: number): Date {
    return setDate(date, day)
  }

  setYear (date: Date, year: number) {
    return setYear(date, year)
  }

  getDiff (date: Date, comparing: Date | string, unit?: string) {
    return getDiff(date, comparing, unit)
  }

  getWeekdays (firstDayOfWeek?: number | string) {
    return getWeekdays(this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined)
  }

  getYear (date: Date) {
    return getYear(date)
  }

  getMonth (date: Date) {
    return getMonth(date)
  }

  getWeek (date: Date, firstDayOfWeek?: number | string, firstWeekMinSize?: number) {
    return getWeek(date, this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined, firstWeekMinSize)
  }

  getDate (date: Date) {
    return getDate(date)
  }

  getNextMonth (date: Date) {
    return getNextMonth(date)
  }

  getPreviousMonth (date: Date) {
    return getPreviousMonth(date)
  }

  getHours (date: Date) {
    return getHours(date)
  }

  getMinutes (date: Date) {
    return getMinutes(date)
  }

  startOfDay (date: Date) {
    return startOfDay(date)
  }

  endOfDay (date: Date) {
    return endOfDay(date)
  }

  startOfYear (date: Date) {
    return startOfYear(date)
  }

  endOfYear (date: Date) {
    return endOfYear(date)
  }
}
