// Utilities
import { createRange, isNullOrUndefined, isString } from '@/util'

// Adapters
import { weekInfo } from './vuetify'

// Types
import type { DateInstance } from '../date'

export function withWeekFallback (adapter: DateInstance, locales: Record<string, string>): DateInstance {
  // TODO: replace with toPlainDate when adopting Temporal
  function toUTCDate (date: unknown) {
    return new Date(Date.UTC(adapter.getYear(date), adapter.getMonth(date), adapter.getDate(date)))
  }

  function getWeekday (date: unknown) {
    return toUTCDate(date).getUTCDay()
  }

  function getLocale (): string | undefined {
    const code: string | undefined = isString(adapter.locale) ? adapter.locale : adapter.locale?.code
    return code && (locales[code] ?? new Intl.Locale(code).maximize().toString())
  }

  const ownFirstDay = getWeekday(adapter.startOfWeek(adapter.date()))
  const probe = (ownFirstDay + 1) % 7 // 2nd day of the week
  if (getWeekday(adapter.startOfWeek(adapter.date(), probe)) === probe) {
    return adapter // adapter is fine, bail
  }

  function startOfWeek (date: unknown, firstDayOfWeek?: number | string) {
    if (isNullOrUndefined(firstDayOfWeek)) return adapter.startOfWeek(date)

    const offset = (getWeekday(date) - Number(firstDayOfWeek) + 7) % 7
    return adapter.addDays(adapter.startOfDay(date), -offset)
  }

  function getWeekArray (date: unknown, firstDayOfWeek?: number | string) {
    if (isNullOrUndefined(firstDayOfWeek)) return adapter.getWeekArray(date)

    const end = adapter.endOfMonth(date)
    const weeks = []
    let start = startOfWeek(adapter.startOfMonth(date), firstDayOfWeek)
    while (adapter.isBefore(start, end)) {
      const weekStart = start
      weeks.push(createRange(7).map(day => adapter.addDays(weekStart, day)))
      start = adapter.addDays(start, 7)
    }
    return weeks
  }

  function getWeekdays (firstDayOfWeek?: number | string, weekdayFormat?: 'long' | 'short' | 'narrow') {
    const start = startOfWeek(adapter.date(), firstDayOfWeek)
    const days = createRange(7).map(day => adapter.addDays(start, day))

    switch (weekdayFormat) {
      case 'long': return days.map(day => adapter.format(day, 'weekday'))
      case 'short': return days.map(day => adapter.format(day, 'weekdayShort'))
      case 'narrow': {
        // date-io has no unified name for narrow format, so we need a fallback to Intl
        const formatter = new Intl.DateTimeFormat(getLocale(), { weekday: 'narrow', timeZone: 'UTC' })
        return days.map(day => formatter.format(toUTCDate(day)))
      }
    }

    const names = adapter.getWeekdays()
    const shift = (getWeekday(start) - getWeekday(adapter.startOfWeek(adapter.date())) + 7) % 7
    return [...names.slice(shift), ...names.slice(0, shift)]
  }

  function getWeek (date: unknown, firstDayOfWeek?: number | string, firstDayOfYear?: number | string) {
    if (isNullOrUndefined(firstDayOfWeek) && isNullOrUndefined(firstDayOfYear)) return adapter.getWeek(date)

    const start = startOfWeek(date, firstDayOfWeek)
    const locale = getLocale()
    const minWeekSize = isNullOrUndefined(firstDayOfYear)
      ? (locale && weekInfo(locale)?.firstWeekSize) || 1
      : 7 - (Number(firstDayOfYear) - getWeekday(start) + 7) % 7
    const anchor = toUTCDate(adapter.addDays(start, 7 - minWeekSize))
    const year = anchor.getUTCFullYear()
    const dayOfYear = (anchor.getTime() - Date.UTC(year, 0, 1)) / 864e5
    return Math.floor(dayOfYear / 7) + 1
  }

  const overrides = new Map<PropertyKey, Function>([
    ['startOfWeek', startOfWeek],
    ['getWeekArray', getWeekArray],
    ['getWeekdays', getWeekdays],
    ['getWeek', getWeek],
  ])

  return new Proxy(adapter, {
    get: (target, key, receiver) => overrides.get(key) ?? Reflect.get(target, key, receiver),
  })
}
