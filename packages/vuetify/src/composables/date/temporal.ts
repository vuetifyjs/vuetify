// Utilities
import { consoleError, createRange } from '@/util'

export type TemporalDate = Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime

export function parsePlainDate (value?: string | Temporal.PlainDate | null): Temporal.PlainDate | null {
  if (!value) return null
  try {
    return Temporal.PlainDate.from(value)
  } catch (err) {
    consoleError(err as any)
  }
  return null
}

// export function date (value?: any): TemporalDate | null {
//   try {
//     return Temporal.ZonedDateTime.from(value)
//   } catch (err) {
//     try {
//       return Temporal.PlainDateTime.from(value)
//     } catch (err) {
//       try {
//         return Temporal.PlainDate.from(value)
//       } catch (err) {
//         consoleError(err as any)
//       }
//     }
//   }
//   return null
// }
// export function format (date: TemporalDate, formatString: string): string {}
export function format (
  value: TemporalDate,
  formatString: string,
  locale = 'en',
  // formats?: Record<string, CustomDateFormat>
): string {
  // const customFormat = formats?.[formatString]
  //
  // if (typeof customFormat === 'function') {
  //   return customFormat(newDate, formatString, locale)
  // }

  let options: Intl.DateTimeFormatOptions = {}
  switch (formatString) {
    case 'fullDate':
      options = { year: 'numeric', month: 'short', day: 'numeric' }
      break
    case 'fullDateWithWeekday':
      options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      break
    case 'normalDate':
      const day = value.day
      const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(value)
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
      return new Intl.NumberFormat(locale).format(value.day)
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
      return new Intl.DateTimeFormat(locale, options).format(value).replace(/, /g, ' ')
    case 'keyboardDateTime12h':
      options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true }
      return new Intl.DateTimeFormat(locale, options).format(value).replace(/, /g, ' ')
    case 'keyboardDateTime24h':
      options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false }
      return new Intl.DateTimeFormat(locale, options).format(value).replace(/, /g, ' ')
    default:
      options = /* customFormat ?? */ { timeZone: 'UTC', timeZoneName: 'short' }
  }

  return new Intl.DateTimeFormat(locale, options).format(value)
}
export function toJsDate (value: TemporalDate): Date {
  return new Date(value.toString())
}
export function parseISO (date: string): Temporal.PlainDate {
  return Temporal.PlainDate.from(date)
}
// export function toISO (date: TemporalDate): string {}

export function startOfDay<T extends TemporalDate> (date: T): T {
  if (date instanceof Temporal.PlainDate) return date
  return date.with({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  }) as T
}
export function endOfDay<T extends TemporalDate> (date: T): T {
  if (date instanceof Temporal.PlainDate) return date
  return date.with({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
    microsecond: 999,
    nanosecond: 999,
  }) as T
}
export function startOfWeek<T extends TemporalDate> (date: T, locale: string, firstDayOfWeek: number | string): T {
  const distance = Number(firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 1) - date.dayOfWeek

  return startOfDay(
    date.subtract({ days: distance < 0 ? date.daysInWeek + distance : distance })
  ) as T
}
export function startOfMonth<T extends TemporalDate> (date: T): T {
  return date.with({
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  }) as T
}
export function endOfMonth<T extends TemporalDate> (date: T): T {
  return date.with({
    day: date.daysInMonth,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
    microsecond: 999,
    nanosecond: 999,
  }) as T
}
export function startOfYear<T extends TemporalDate> (date: T): T {
  return date.with({
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  }) as T
}
export function endOfYear<T extends TemporalDate> (date: T): T {
  return date.with({
    month: 1,
    day: date.daysInYear,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
    microsecond: 999,
    nanosecond: 999,
  }) as T
}

export function isAfter (date: TemporalDate, comparing: TemporalDate): boolean {
  return date.since(comparing).sign === 1
}
export function isBefore (date: TemporalDate, comparing: TemporalDate): boolean {
  return date.since(comparing).sign === -1
}
export function isEqual (date: TemporalDate, comparing: TemporalDate): boolean {
  return date.since(comparing).sign === 0
}

// export function isValid (date: any): boolean {}

export function isSameDay (date: TemporalDate, comparing: TemporalDate): boolean {
  return date.day === comparing.day && isSameMonth(date, comparing)
}
export function isSameMonth (date: TemporalDate, comparing: TemporalDate): boolean {
  return date.month === comparing.month && isSameYear(date, comparing)
}
export function isSameYear (date: TemporalDate, comparing: TemporalDate): boolean {
  return date.year === comparing.year
}
export function isWithinRange (date: TemporalDate, range: readonly [TemporalDate, TemporalDate]): boolean {
  return date.since(range[0]).sign !== -1 && date.until(range[1]).sign !== -1
}

export function getWeekArray (
  date: TemporalDate,
  locale: string,
  firstDayOfWeek?: number | string
): Temporal.PlainDate[][] {
  const weeks: Temporal.PlainDate[][] = []
  let currentWeek: Temporal.PlainDate[] = []
  const firstDayOfMonth = startOfMonth(date)
  const lastDayOfMonth = endOfMonth(date)
  const first = Number(firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 1)
  const firstDayWeekIndex = (firstDayOfMonth.dayOfWeek - first + 7) % 7
  const lastDayWeekIndex = (lastDayOfMonth.dayOfWeek - first + 7) % 7

  // Adjacent month last days
  for (let i = 0; i < firstDayWeekIndex; i++) {
    currentWeek.push(
      Temporal.PlainDate.from(firstDayOfMonth).subtract({
        days: firstDayWeekIndex - i,
      })
    )
  }

  // Current month days
  for (let i = 1; i <= lastDayOfMonth.day; i++) {
    currentWeek.push(
      Temporal.PlainDate.from(date).with({ day: i })
    )

    // If the current week has 7 days, add it to the weeks array and start a new week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  // Adjacent month first days
  for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
    currentWeek.push(
      Temporal.PlainDate.from(lastDayOfMonth).add({
        days: i,
      })
    )
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

const sundayJanuarySecond2000 = Temporal.PlainDate.from('2000-01-02')
export function getWeekdays (locale: string, firstDayOfWeek?: number, weekdayFormat?: 'long' | 'short' | 'narrow') {
  const daysFromSunday = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 1
  const formatter = new Intl.DateTimeFormat(locale, { weekday: weekdayFormat ?? 'narrow' })

  return createRange(7).map(i => {
    return formatter.format(
      sundayJanuarySecond2000.add({ days: daysFromSunday + i })
    )
  })
}
export function getWeek (date: TemporalDate, locale: string, firstDayOfWeek?: number, firstWeekMinSize?: number): number {
  // TODO: is there actually demand for other-than-iso week numbers?
  return date.weekOfYear!
}

// Not needed
// export function addMinutes (date: TemporalDate, amount: number): TemporalDate {}
// export function addHours (date: TemporalDate, amount: number): TemporalDate {}
// export function addDays (date: TemporalDate, amount: number): TemporalDate {}
// export function addWeeks (date: TemporalDate, amount: number): TemporalDate {}
// export function addMonths (date: TemporalDate, amount: number): TemporalDate {}

// export function getYear (date: TemporalDate): number {}
// export function setYear (date: TemporalDate, year: number): TemporalDate {}
// export function getDiff (date: TemporalDate, comparing: TemporalDate | string, unit?: string): number {}
// export function getMonth (date: TemporalDate): number {}
// export function setMonth (date: TemporalDate, month: number): TemporalDate {}
// export function getDate (date: TemporalDate): number {}
// export function setDate (date: TemporalDate, day: number): TemporalDate {}
// export function getHours (date: TemporalDate): number {}
// export function setHours (date: TemporalDate, hours: number): TemporalDate {}
// export function getMinutes (date: TemporalDate): number {}
// export function setMinutes (date: TemporalDate, minutes: number): TemporalDate {}

// Use Temporal.PlainYearMonth
// export function getNextMonth (date: TemporalDate): TemporalDate {}
// export function getPreviousMonth (date: TemporalDate): TemporalDate {}

function weekInfo (locale: string): { firstDay: number, firstWeekSize: number } | null {
  // https://simplelocalize.io/data/locales/
  // then `new Intl.Locale(...).getWeekInfo()`
  const code = locale.slice(-2).toUpperCase()
  switch (true) {
    case locale === 'GB-alt-variant': {
      return { firstDay: 7, firstWeekSize: 4 }
    }
    case locale === '001': {
      return { firstDay: 1, firstWeekSize: 1 }
    }
    case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(code): {
      return { firstDay: 7, firstWeekSize: 1 }
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
      return { firstDay: 7, firstWeekSize: 4 }
    }
    default: return null
  }
}
