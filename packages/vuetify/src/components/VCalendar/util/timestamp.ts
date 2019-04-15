
export const PARSE_REGEX: RegExp = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?([^\d]+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?$/
export const PARSE_TIME: RegExp = /(\d\d?)(:(\d\d?)|)(:(\d\d?)|)/

export const DAYS_IN_MONTH: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_LEAP: number[] = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_MIN = 28
export const DAYS_IN_MONTH_MAX = 31
export const MONTH_MAX = 12
export const MONTH_MIN = 1
export const DAY_MIN = 1
export const DAYS_IN_WEEK = 7
export const MINUTES_IN_HOUR = 60
export const HOURS_IN_DAY = 24
export const FIRST_HOUR = 0

export interface VTimestamp {
  date: string
  time: string
  year: number
  month: number
  day: number
  weekday: number
  hour: number
  minute: number
  hasDay: boolean
  hasTime: boolean
  past: boolean
  present: boolean
  future: boolean
}

export interface VTimeObject {
  hour: number
  minute: number
}

export type VTime = number | string | VTimeObject

export type VTimestampFormatter = (timestamp: VTimestamp, short: boolean) => string

export type VTimestampFormatOptions = (timestamp: VTimestamp, short: boolean) => object

export type VTimestampOperation = (timestamp: VTimestamp) => VTimestamp

export function getStartOfWeek (timestamp: VTimestamp, weekdays: number[], today?: VTimestamp): VTimestamp {
  const start = copyTimestamp(timestamp)
  findWeekday(start, weekdays[0], prevDay)
  updateFormatted(start)
  if (today) {
    updateRelative(start, today, start.hasTime)
  }
  return start
}

export function getEndOfWeek (timestamp: VTimestamp, weekdays: number[], today?: VTimestamp): VTimestamp {
  const end = copyTimestamp(timestamp)
  findWeekday(end, weekdays[weekdays.length - 1])
  updateFormatted(end)
  if (today) {
    updateRelative(end, today, end.hasTime)
  }
  return end
}

export function getStartOfMonth (timestamp: VTimestamp): VTimestamp {
  const start = copyTimestamp(timestamp)
  start.day = DAY_MIN
  updateWeekday(start)
  updateFormatted(start)
  return start
}

export function getEndOfMonth (timestamp: VTimestamp): VTimestamp {
  const end = copyTimestamp(timestamp)
  end.day = daysInMonth(end.year, end.month)
  updateWeekday(end)
  updateFormatted(end)
  return end
}

export function parseTime (input: any): number | false {
  if (typeof input === 'number') {
    // when a number is given, it's minutes since 12:00am
    return input
  } else if (typeof input === 'string') {
    // when a string is given, it's a hh:mm:ss format where seconds are optional
    const parts = PARSE_TIME.exec(input)
    if (!parts) {
      return false
    }
    return parseInt(parts[1]) * 60 + parseInt(parts[3] || 0)
  } else if (typeof input === 'object') {
    // when an object is given, it must have hour and minute
    if (typeof input.hour !== 'number' || typeof input.minute !== 'number') {
      return false
    }
    return input.hour * 60 + input.minute
  } else {
    // unsupported type
    return false
  }
}

export function validateTimestamp (input: any): boolean {
  return !!PARSE_REGEX.exec(input)
}

export function parseTimestamp (input: string, now?: VTimestamp): VTimestamp | null {
  // YYYY-MM-DD hh:mm:ss
  const parts = PARSE_REGEX.exec(input)

  if (!parts) return null

  const timestamp: VTimestamp = {
    date: input,
    time: '',
    year: parseInt(parts[1]),
    month: parseInt(parts[2]),
    day: parseInt(parts[4]) || 1,
    hour: parseInt(parts[6]) || 0,
    minute: parseInt(parts[8]) || 0,
    weekday: 0,
    hasDay: !!parts[4],
    hasTime: !!(parts[6] && parts[8]),
    past: false,
    present: false,
    future: false
  }

  updateWeekday(timestamp)
  updateFormatted(timestamp)

  if (now) {
    updateRelative(timestamp, now, timestamp.hasTime)
  }

  return timestamp
}

export function parseDate (date: Date): VTimestamp {
  return updateFormatted({
    date: '',
    time: '',
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    hasDay: true,
    hasTime: true,
    past: false,
    present: true,
    future: false
  })
}

export function getDayIdentifier (timestamp: VTimestamp): number {
  return timestamp.year * 10000 + timestamp.month * 100 + timestamp.day
}

export function getTimeIdentifier (timestamp: VTimestamp): number {
  return timestamp.hour * 100 + timestamp.minute
}

export function updateRelative (timestamp: VTimestamp, now: VTimestamp, time = false): VTimestamp {
  let a = getDayIdentifier(now)
  let b = getDayIdentifier(timestamp)
  let present = a === b

  if (timestamp.hasTime && time && present) {
    a = getTimeIdentifier(now)
    b = getTimeIdentifier(timestamp)
    present = a === b
  }

  timestamp.past = b < a
  timestamp.present = present
  timestamp.future = b > a

  return timestamp
}

export function updateMinutes (timestamp: VTimestamp, minutes: number, now?: VTimestamp): VTimestamp {
  timestamp.hasTime = true
  timestamp.hour = Math.floor(minutes / MINUTES_IN_HOUR)
  timestamp.minute = minutes % MINUTES_IN_HOUR
  timestamp.time = getTime(timestamp)
  if (now) {
    updateRelative(timestamp, now, true)
  }

  return timestamp
}

export function updateWeekday (timestamp: VTimestamp): VTimestamp {
  timestamp.weekday = getWeekday(timestamp)

  return timestamp
}

export function updateFormatted (timestamp: VTimestamp): VTimestamp {
  timestamp.time = getTime(timestamp)
  timestamp.date = getDate(timestamp)

  return timestamp
}

export function getWeekday (timestamp: VTimestamp): number {
  if (timestamp.hasDay) {
    const _ = Math.floor
    const k = timestamp.day
    const m = ((timestamp.month + 9) % MONTH_MAX) + 1
    const C = _(timestamp.year / 100)
    const Y = (timestamp.year % 100) - (timestamp.month <= 2 ? 1 : 0)

    return (((k + _(2.6 * m - 0.2) - 2 * C + Y + _(Y / 4) + _(C / 4)) % 7) + 7) % 7
  }

  return timestamp.weekday
}

export function isLeapYear (year: number): boolean {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

export function daysInMonth (year: number, month: number) {
  return isLeapYear(year) ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH[month]
}

export function copyTimestamp (timestamp: VTimestamp): VTimestamp {
  const { date, time, year, month, day, weekday, hour, minute, hasDay, hasTime, past, present, future } = timestamp

  return { date, time, year, month, day, weekday, hour, minute, hasDay, hasTime, past, present, future }
}

export function padNumber (x: number, length: number): string {
  let padded = String(x)
  while (padded.length < length) {
    padded = '0' + padded
  }

  return padded
}

export function getDate (timestamp: VTimestamp): string {
  let str = `${padNumber(timestamp.year, 4)}-${padNumber(timestamp.month, 2)}`

  if (timestamp.hasDay) str += `-${padNumber(timestamp.day, 2)}`

  return str
}

export function getTime (timestamp: VTimestamp): string {
  if (!timestamp.hasTime) {
    return ''
  }

  return `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`
}

export function nextMinutes (timestamp: VTimestamp, minutes: number): VTimestamp {
  timestamp.minute += minutes
  while (timestamp.minute > MINUTES_IN_HOUR) {
    timestamp.minute -= MINUTES_IN_HOUR
    timestamp.hour++
    if (timestamp.hour >= HOURS_IN_DAY) {
      nextDay(timestamp)
      timestamp.hour = FIRST_HOUR
    }
  }

  return timestamp
}

export function nextDay (timestamp: VTimestamp): VTimestamp {
  timestamp.day++
  timestamp.weekday = (timestamp.weekday + 1) % DAYS_IN_WEEK
  if (timestamp.day > DAYS_IN_MONTH_MIN && timestamp.day > daysInMonth(timestamp.year, timestamp.month)) {
    timestamp.day = DAY_MIN
    timestamp.month++
    if (timestamp.month > MONTH_MAX) {
      timestamp.month = MONTH_MIN
      timestamp.year++
    }
  }

  return timestamp
}

export function prevDay (timestamp: VTimestamp): VTimestamp {
  timestamp.day--
  timestamp.weekday = (timestamp.weekday + 6) % DAYS_IN_WEEK
  if (timestamp.day < DAY_MIN) {
    timestamp.month--
    if (timestamp.month < MONTH_MIN) {
      timestamp.year--
      timestamp.month = MONTH_MAX
    }
    timestamp.day = daysInMonth(timestamp.year, timestamp.month)
  }

  return timestamp
}

export function relativeDays (timestamp: VTimestamp,
  mover: VTimestampOperation = nextDay, days = 1): VTimestamp {
  while (--days >= 0) mover(timestamp)

  return timestamp
}

export function findWeekday (timestamp: VTimestamp, weekday: number,
  mover: VTimestampOperation = nextDay, maxDays = 6): VTimestamp {
  while (timestamp.weekday !== weekday && --maxDays >= 0) mover(timestamp)

  return timestamp
}

export function getWeekdaySkips (weekdays: number[]): number[] {
  const skips: number[] = [1, 1, 1, 1, 1, 1, 1]
  const filled: number[] = [0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < weekdays.length; i++) {
    filled[weekdays[i]] = 1
  }
  for (let k = 0; k < DAYS_IN_WEEK; k++) {
    let skip = 1
    for (let j = 1; j < DAYS_IN_WEEK; j++) {
      const next = (k + j) % DAYS_IN_WEEK
      if (filled[next]) {
        break
      }
      skip++
    }
    skips[k] = filled[k] * skip
  }

  return skips
}

export function createDayList (start: VTimestamp, end: VTimestamp, now: VTimestamp,
  weekdaySkips: number[], max = 42, min = 0): VTimestamp[] {
  const stop = getDayIdentifier(end)
  const days: VTimestamp[] = []
  let current = copyTimestamp(start)
  let currentIdentifier = 0
  let stopped = currentIdentifier === stop

  if (stop < getDayIdentifier(start)) {
    return days
  }

  while ((!stopped || days.length < min) && days.length < max) {
    currentIdentifier = getDayIdentifier(current)
    stopped = stopped || currentIdentifier === stop
    if (weekdaySkips[current.weekday] === 0) {
      current = nextDay(current)
      continue
    }
    const day = copyTimestamp(current)
    updateFormatted(day)
    updateRelative(day, now)
    days.push(day)
    current = relativeDays(current, nextDay, weekdaySkips[current.weekday])
  }

  return days
}

export function createIntervalList (timestamp: VTimestamp, first: number,
  minutes: number, count: number, now?: VTimestamp): VTimestamp[] {
  const intervals: VTimestamp[] = []

  for (let i = 0; i < count; i++) {
    const mins = (first + i) * minutes
    const int = copyTimestamp(timestamp)
    intervals.push(updateMinutes(int, mins, now))
  }

  return intervals
}

export function createNativeLocaleFormatter (locale: string, getOptions: VTimestampFormatOptions): VTimestampFormatter {
  const emptyFormatter: VTimestampFormatter = (_t, _s) => ''

  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return emptyFormatter
  }

  return (timestamp, short) => {
    try {
      const intlFormatter = new Intl.DateTimeFormat(locale || undefined, getOptions(timestamp, short))
      const time = `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`
      const date = timestamp.date
      return intlFormatter.format(new Date(`${date}T${time}:00+00:00`))
    } catch (e) {
      return ''
    }
  }
}
