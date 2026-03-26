// Utilities
import { isUndefined } from '@vuetify/v0/utilities'
import { consoleWarn } from '@/util'

// Types
import type { DateAdapter as V0DateAdapter } from '@vuetify/v0/composables'

/**
 * Vuetify's public-facing DateAdapter interface.
 * Accepts `number | string` for firstDayOfWeek params (legacy contract).
 * v0's DateAdapter uses `number` only.
 */
export interface DateAdapter<T = unknown> {
  date (value?: any): T | null
  format (date: T, formatString: string): string
  toJsDate (value: T): Date
  parseISO (date: string): T
  toISO (date: T): string

  startOfDay (date: T): T
  endOfDay (date: T): T
  startOfWeek (date: T, firstDayOfWeek?: number | string): T
  endOfWeek (date: T): T
  startOfMonth (date: T): T
  endOfMonth (date: T): T
  startOfYear (date: T): T
  endOfYear (date: T): T

  isAfter (date: T, comparing: T): boolean
  isAfterDay (date: T, comparing: T): boolean

  isSameDay (date: T, comparing: T): boolean
  isSameMonth (date: T, comparing: T): boolean
  isSameYear (date: T, comparing: T): boolean

  isBefore (date: T, comparing: T): boolean
  isEqual (date: T, comparing: T): boolean
  isValid (date: any): boolean
  isWithinRange (date: T, range: [T, T]): boolean

  addMinutes (date: T, amount: number): T
  addHours (date: T, amount: number): T
  addDays (date: T, amount: number): T
  addWeeks (date: T, amount: number): T
  addMonths (date: T, amount: number): T

  getYear (date: T): number
  setYear (date: T, year: number): T
  getDiff (date: T, comparing: T | string, unit?: string): number
  getWeekArray (date: T, firstDayOfWeek?: number | string): T[][]
  getWeekdays (firstDayOfWeek?: number | string, weekdayFormat?: 'long' | 'short' | 'narrow'): string[]
  getWeek (date: T, firstDayOfWeek?: number | string, firstDayOfYear?: number | string): number
  getMonth (date: T): number
  setMonth (date: T, month: number): T
  getDate (date: T): number
  setDate (date: T, day: number): T
  getNextMonth (date: T): T
  getPreviousMonth (date: T): T

  getHours (date: T): number
  setHours (date: T, hours: number): T
  getMinutes (date: T): number
  setMinutes (date: T, minutes: number): T
}

function calculateWeekWithFirstDayOfYear<T> (
  adapter: V0DateAdapter<T>,
  date: T,
  weekStart: number,
  firstDayOfYear: number,
): number {
  const firstDayOfYearOffset = (7 + firstDayOfYear - weekStart) % 7

  function startOfWeek (d: T): T {
    return adapter.startOfWeek(d, weekStart)
  }

  function addDays (d: T, amount: number): T {
    return adapter.addDays(d, amount)
  }

  function yearStartWeekdayOffset (year: number): number {
    return (7 + adapter.toJsDate(adapter.date(new Date(year, 0, 1))!).getDay() - weekStart) % 7
  }

  const currentWeekStart = startOfWeek(date)
  const currentWeekEnd = addDays(currentWeekStart, 6)

  let year = adapter.getYear(currentWeekStart)
  if (year < adapter.getYear(currentWeekEnd) && yearStartWeekdayOffset(year + 1) <= firstDayOfYearOffset) {
    year++
  }

  const yearStart = adapter.date(new Date(year, 0, 1))!
  const offset = yearStartWeekdayOffset(year)
  const d1w1 = offset <= firstDayOfYearOffset
    ? addDays(yearStart, -offset)
    : addDays(yearStart, 7 - offset)

  return 1 + adapter.getDiff(adapter.endOfDay(currentWeekStart), adapter.startOfDay(d1w1), 'weeks')
}

/**
 * Bridges v0's DateAdapter to Vuetify's public DateAdapter interface.
 *
 * The only translation needed is `number | string` → `number` for
 * firstDayOfWeek/firstDayOfYear params, and the Vuetify-specific
 * `getWeek(date, firstDayOfWeek, firstDayOfYear)` overload which
 * v0 doesn't support directly.
 */
export class VuetifyDateBridge<T> implements DateAdapter<T> {
  constructor (public readonly adapter: V0DateAdapter<T>) {}

  // ============================================
  // Translated methods — coerce string → number
  // ============================================

  startOfWeek (date: T, firstDayOfWeek?: number | string): T {
    return this.adapter.startOfWeek(date, toNumber(firstDayOfWeek))
  }

  getWeekArray (date: T, firstDayOfWeek?: number | string): T[][] {
    return this.adapter.getWeekArray(date, toNumber(firstDayOfWeek))
  }

  getWeekdays (firstDayOfWeek?: number | string, weekdayFormat?: 'long' | 'short' | 'narrow'): string[] {
    return this.adapter.getWeekdays(toNumber(firstDayOfWeek), weekdayFormat)
  }

  getWeek (date: T, firstDayOfWeek?: number | string, firstDayOfYear?: number | string): number {
    const fdow = toNumber(firstDayOfWeek)
    const fdoy = toNumber(firstDayOfYear)

    if (!isUndefined(fdoy)) {
      const weekStart = fdow ?? 0
      return calculateWeekWithFirstDayOfYear(this.adapter, date, weekStart, fdoy)
    }

    return this.adapter.getWeek(date, fdow)
  }

  // ============================================
  // Passthrough methods
  // ============================================

  date (value?: any): T | null {
    return this.adapter.date(value)
  }

  format (date: T, formatString: string): string {
    return this.adapter.format(date, formatString)
  }

  toJsDate (value: T): Date {
    return this.adapter.toJsDate(value)
  }

  parseISO (date: string): T {
    return this.adapter.parseISO(date)
  }

  toISO (date: T): string {
    return this.adapter.toISO(date)
  }

  startOfDay (date: T): T {
    return this.adapter.startOfDay(date)
  }

  endOfDay (date: T): T {
    return this.adapter.endOfDay(date)
  }

  endOfWeek (date: T): T {
    return this.adapter.endOfWeek(date)
  }

  startOfMonth (date: T): T {
    return this.adapter.startOfMonth(date)
  }

  endOfMonth (date: T): T {
    return this.adapter.endOfMonth(date)
  }

  startOfYear (date: T): T {
    return this.adapter.startOfYear(date)
  }

  endOfYear (date: T): T {
    return this.adapter.endOfYear(date)
  }

  isAfter (date: T, comparing: T): boolean {
    return this.adapter.isAfter(date, comparing)
  }

  isAfterDay (date: T, comparing: T): boolean {
    return this.adapter.isAfterDay(date, comparing)
  }

  isSameDay (date: T, comparing: T): boolean {
    return this.adapter.isSameDay(date, comparing)
  }

  isSameMonth (date: T, comparing: T): boolean {
    return this.adapter.isSameMonth(date, comparing)
  }

  isSameYear (date: T, comparing: T): boolean {
    return this.adapter.isSameYear(date, comparing)
  }

  isBefore (date: T, comparing: T): boolean {
    return this.adapter.isBefore(date, comparing)
  }

  isEqual (date: T, comparing: T): boolean {
    return this.adapter.isEqual(date, comparing)
  }

  isValid (date: any): boolean {
    return this.adapter.isValid(date)
  }

  isWithinRange (date: T, range: [T, T]): boolean {
    return this.adapter.isWithinRange(date, range)
  }

  addMinutes (date: T, amount: number): T {
    return this.adapter.addMinutes(date, amount)
  }

  addHours (date: T, amount: number): T {
    return this.adapter.addHours(date, amount)
  }

  addDays (date: T, amount: number): T {
    return this.adapter.addDays(date, amount)
  }

  addWeeks (date: T, amount: number): T {
    return this.adapter.addWeeks(date, amount)
  }

  addMonths (date: T, amount: number): T {
    return this.adapter.addMonths(date, amount)
  }

  getYear (date: T): number {
    return this.adapter.getYear(date)
  }

  setYear (date: T, year: number): T {
    return this.adapter.setYear(date, year)
  }

  getDiff (date: T, comparing: T | string, unit?: string): number {
    return this.adapter.getDiff(date, comparing, unit)
  }

  getMonth (date: T): number {
    return this.adapter.getMonth(date)
  }

  setMonth (date: T, month: number): T {
    return this.adapter.setMonth(date, month)
  }

  getDate (date: T): number {
    return this.adapter.getDate(date)
  }

  setDate (date: T, day: number): T {
    return this.adapter.setDate(date, day)
  }

  getNextMonth (date: T): T {
    return this.adapter.getNextMonth(date)
  }

  getPreviousMonth (date: T): T {
    return this.adapter.getPreviousMonth(date)
  }

  getHours (date: T): number {
    return this.adapter.getHours(date)
  }

  setHours (date: T, hours: number): T {
    return this.adapter.setHours(date, hours)
  }

  getMinutes (date: T): number {
    return this.adapter.getMinutes(date)
  }

  setMinutes (date: T, minutes: number): T {
    return this.adapter.setMinutes(date, minutes)
  }
}

function toNumber (value: number | string | undefined): number | undefined {
  if (isUndefined(value)) return undefined
  const n = Number(value)
  if (!Number.isInteger(n) || n < 0 || n > 6) {
    consoleWarn('Invalid firstDayOfWeek, expected discrete number in range [0-6]')
    return Math.max(0, Math.min(6, Math.round(n) || 0))
  }
  return n
}
