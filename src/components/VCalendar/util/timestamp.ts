
let PARSE_REGEX: RegExp = /^(\d{1,4})-(\d{1,2})(-(\d{1,2}))?([^\d]+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?$/

let DAYS_IN_MONTH: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let DAYS_IN_MONTH_LEAP: number[] = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let DAYS_IN_MONTH_MIN: number = 28
let MONTH_MAX: number = 12
let MONTH_MIN: number = 1
let DAY_MIN: number = 1
let DAYS_IN_WEEK: number = 7
let MINUTES_IN_HOUR: number = 60
let HOURS_IN_DAY: number = 24
let FIRST_HOUR: number = 0

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

export type VTimestampFormatter<R> = (timestamp: VTimestamp, short: boolean) => R

export function validateTimestamp (input: any): boolean {
  return !!PARSE_REGEX.exec(input)
}

export function parseTimestamp (input: string, now?: Date): VTimestamp | null {
  // YYYY-MM-DD hh:mm:ss
  let parts = PARSE_REGEX.exec(input)

  if (!parts) {
    return null
  }

  let timestamp: VTimestamp = {
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

export function getDayIdentifier (timestamp: VTimestamp): number {
  return timestamp.year * 1000000 + timestamp.month * 100 + (timestamp.day || 1)
}

export function updateRelative (timestamp: VTimestamp, now: Date, time: boolean = false): VTimestamp {
  let a = now.getFullYear() * 1000000 + (now.getMonth() + 1) * 100 + (now.getDate())
  let b = getDayIdentifier(timestamp)
  let present = a === b

  if (timestamp.hasTime && time && present) {
    a = now.getHours() * 100 + now.getMinutes()
    b = timestamp.hour * 100 + timestamp.minute
    present = a === b
  }

  timestamp.past = b < a
  timestamp.present = present
  timestamp.future = b > a

  return timestamp
}

export function updateMinutes (timestamp: VTimestamp, minutes: number, now?: Date): VTimestamp {
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
    let _ = Math.floor
    let k = timestamp.day
    let m = ((timestamp.month + 9) % MONTH_MAX) + 1
    let C = _(timestamp.year / 100)
    let Y = (timestamp.year % 100) - (timestamp.month <= 2 ? 1 : 0)

    return (k + _(2.6 * m - 0.2) - 2 * C + Y + _(Y / 4) + _(C / 4)) % 7
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
  let { date, time, year, month, day, weekday, hour, minute, hasDay, hasTime, past, present, future } = timestamp
  return { date, time, year, month, day, weekday, hour, minute, hasDay, hasTime, past, present, future }
}

export function floorTimestamp (timestamp: VTimestamp): VTimestamp {
  timestamp.hour = 0
  timestamp.minute = 0
  return timestamp
}

export function padNumber (x: number, length: number): string {
  let padded = String(x)
  while (padded.length < length) {
    padded = '0' + padded
  }
  return padded
}

export function getDate (timestamp: VTimestamp): string {
  if (timestamp.hasDay) {
    return `${padNumber(timestamp.year, 4)}-${padNumber(timestamp.month, 2)}-${padNumber(timestamp.day, 2)}`
  } else {
    return `${padNumber(timestamp.year, 4)}-${padNumber(timestamp.month, 2)}`
  }
}

export function getTime (timestamp: VTimestamp): string {
  if (timestamp.hasTime) {
    return `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`
  } else {
    return ''
  }
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
  timestamp.weekday = ((timestamp.weekday || 0) + 1) % DAYS_IN_WEEK
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

export function nextDays (timestamp: VTimestamp, days: number = 1): VTimestamp {
  while (days--) nextDay(timestamp)
  return timestamp
}

export function prevDay (timestamp: VTimestamp): VTimestamp {
  timestamp.day--
  timestamp.weekday = ((timestamp.weekday || 0) + 6) % DAYS_IN_WEEK
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

export function getWeekdaySkips (weekdays: number[]): number[] {
  let skips: number[] = [1, 1, 1, 1, 1, 1, 1]
  let filled: number[] = [0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < weekdays.length; i++) {
    filled[weekdays[i]] = 1
  }
  for (let k = 0; k < DAYS_IN_WEEK; k++) {
    let skip = 1
    for (let j = 1; j < DAYS_IN_WEEK; j++) {
      let next = (k + j) % DAYS_IN_WEEK
      if (filled[next]) {
        break
      }
      skip++
    }
    skips[k] = skip
  }
  return skips
}

export function createDayList (start: VTimestamp, end: VTimestamp, now: Date, weekdaySkips: number[]): VTimestamp[] {
  let current = copyTimestamp(start)
  let stop = getDayIdentifier(end)
  let currentIdentifier = 0
  let days: VTimestamp[] = []

  while (currentIdentifier !== stop) {
    currentIdentifier = getDayIdentifier(current)
    let day = copyTimestamp(current)
    updateFormatted(day)
    updateRelative(day, now)
    days.push(day)
    current = nextDays(current, weekdaySkips[current.weekday])
  }

  return days
}

export function createIntervalList (timestamp: VTimestamp, first: number, minutes: number, count: number, now?: Date): VTimestamp[] {
  let intervals: VTimestamp[] = []

  for (let i = 0; i < count; i++) {
    let mins: number = (first + i) * minutes
    let int: VTimestamp = copyTimestamp(timestamp)
    int.hasTime = true
    int.hour = Math.floor(mins / MINUTES_IN_HOUR)
    int.minute = mins % MINUTES_IN_HOUR
    int.time = getTime(int)
    if (now) {
      updateRelative(int, now, true)
    }
    intervals.push(int)
  }

  return intervals
}

export function createNativeLocaleFormatter (locale: string, getOptions: VTimestampFormatter<object>): VTimestampFormatter<string> {
  let emptyFormatter: VTimestampFormatter<string> = (t, s) => ''

  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return emptyFormatter
  }

  return (timestamp, short) => {
    try {
      const intlFormatter = new Intl.DateTimeFormat(locale || undefined, getOptions(timestamp, short))
      let time = `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`
      let date = timestamp.date
      return intlFormatter.format(new Date(`${date}T${time}:00+00:00`))
    } catch (e) {
      window.console.log(e)
      return ''
    }
  }
}
