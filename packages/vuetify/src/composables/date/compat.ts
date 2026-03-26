// Utilities
import { consoleWarn } from '@/util'

// Types
import type { DateAdapter } from '@vuetify/v0'

/**
 * Wraps old Vuetify-style custom adapters (param-based firstDayOfWeek signatures)
 * to satisfy v0's DateAdapter interface.
 *
 * Legacy adapters pass firstDayOfWeek as a method parameter.
 * v0's interface uses a property-based approach instead.
 * This class bridges the gap by reading the property and forwarding it as a param.
 */
export class LegacyDateAdapterCompat<T> implements DateAdapter<T> {
  locale?: string
  firstDayOfWeek?: number

  constructor (private legacy: any) {
    consoleWarn(
      'Custom date adapters should implement @vuetify/v0\'s DateAdapter interface. ' +
      'Param-based firstDayOfWeek signatures are deprecated and will be removed in a future version.'
    )
    this.locale = legacy.locale
    this.firstDayOfWeek = legacy.firstDayOfWeek ?? 0
  }

  // ============================================
  // Translated methods
  // v0 uses property-based firstDayOfWeek,
  // legacy adapters expect it as a parameter
  // ============================================

  startOfWeek (date: T): T {
    return this.legacy.startOfWeek(date, this.firstDayOfWeek)
  }

  endOfWeek (date: T): T {
    return this.legacy.endOfWeek(date)
  }

  getWeekArray (date: T): T[][] {
    return this.legacy.getWeekArray(date, this.firstDayOfWeek)
  }

  getWeekdays (format?: string): string[] {
    return this.legacy.getWeekdays(this.firstDayOfWeek, format)
  }

  // v0's minimalDays has no equivalent in legacy adapters (they use firstDayOfYear instead).
  // Silently ignored — legacy adapters only support firstDayOfWeek-based week calculation.
  getWeek (date: T, _minimalDays?: number): number {
    return this.legacy.getWeek(date, this.firstDayOfWeek)
  }

  // ============================================
  // Construction & Conversion — passthrough
  // ============================================

  date (value?: unknown): T | null {
    return this.legacy.date(value)
  }

  toJsDate (value: T): Date {
    return this.legacy.toJsDate(value)
  }

  parseISO (date: string): T {
    return this.legacy.parseISO(date)
  }

  toISO (date: T): string {
    return this.legacy.toISO(date)
  }

  isValid (date: unknown): date is T {
    return this.legacy.isValid(date)
  }

  // ============================================
  // Formatting — passthrough
  // ============================================

  format (date: T, formatString: string): string {
    return this.legacy.format(date, formatString)
  }

  // ============================================
  // Navigation — passthrough
  // ============================================

  startOfDay (date: T): T {
    return this.legacy.startOfDay(date)
  }

  endOfDay (date: T): T {
    return this.legacy.endOfDay(date)
  }

  startOfMonth (date: T): T {
    return this.legacy.startOfMonth(date)
  }

  endOfMonth (date: T): T {
    return this.legacy.endOfMonth(date)
  }

  startOfYear (date: T): T {
    return this.legacy.startOfYear(date)
  }

  endOfYear (date: T): T {
    return this.legacy.endOfYear(date)
  }

  // ============================================
  // Arithmetic — passthrough
  // ============================================

  addMinutes (date: T, amount: number): T {
    return this.legacy.addMinutes(date, amount)
  }

  addHours (date: T, amount: number): T {
    return this.legacy.addHours(date, amount)
  }

  addDays (date: T, amount: number): T {
    return this.legacy.addDays(date, amount)
  }

  addWeeks (date: T, amount: number): T {
    return this.legacy.addWeeks(date, amount)
  }

  addMonths (date: T, amount: number): T {
    return this.legacy.addMonths(date, amount)
  }

  // ============================================
  // Comparison — passthrough
  // ============================================

  isAfter (date: T, comparing: T): boolean {
    return this.legacy.isAfter(date, comparing)
  }

  isAfterDay (date: T, comparing: T): boolean {
    return this.legacy.isAfterDay(date, comparing)
  }

  isBefore (date: T, comparing: T): boolean {
    return this.legacy.isBefore(date, comparing)
  }

  isEqual (date: T, comparing: T): boolean {
    return this.legacy.isEqual(date, comparing)
  }

  isSameDay (date: T, comparing: T): boolean {
    return this.legacy.isSameDay(date, comparing)
  }

  isSameMonth (date: T, comparing: T): boolean {
    return this.legacy.isSameMonth(date, comparing)
  }

  isSameYear (date: T, comparing: T): boolean {
    return this.legacy.isSameYear(date, comparing)
  }

  isWithinRange (date: T, range: [T, T]): boolean {
    return this.legacy.isWithinRange(date, range)
  }

  // ============================================
  // Getters — passthrough
  // ============================================

  getYear (date: T): number {
    return this.legacy.getYear(date)
  }

  getMonth (date: T): number {
    return this.legacy.getMonth(date)
  }

  getDate (date: T): number {
    return this.legacy.getDate(date)
  }

  getHours (date: T): number {
    return this.legacy.getHours(date)
  }

  getMinutes (date: T): number {
    return this.legacy.getMinutes(date)
  }

  getDiff (date: T, comparing: T | string, unit?: string): number {
    return this.legacy.getDiff(date, comparing, unit)
  }

  // ============================================
  // Setters — passthrough
  // ============================================

  setYear (date: T, year: number): T {
    return this.legacy.setYear(date, year)
  }

  setMonth (date: T, month: number): T {
    return this.legacy.setMonth(date, month)
  }

  setDate (date: T, day: number): T {
    return this.legacy.setDate(date, day)
  }

  setHours (date: T, hours: number): T {
    return this.legacy.setHours(date, hours)
  }

  setMinutes (date: T, minutes: number): T {
    return this.legacy.setMinutes(date, minutes)
  }

  // ============================================
  // Month Navigation — passthrough
  // ============================================

  getNextMonth (date: T): T {
    return this.legacy.getNextMonth(date)
  }

  getPreviousMonth (date: T): T {
    return this.legacy.getPreviousMonth(date)
  }

  // ============================================
  // v0-only methods — stubs for methods legacy
  // adapters don't have
  // ============================================

  private unsupported (method: string): never {
    throw new Error(
      `${method}() is not available on legacy date adapters. ` +
      `Migrate to @vuetify/v0's DateAdapter interface.`
    )
  }

  parse (value: string, format: string): T | null {
    return this.legacy.parse?.(value, format) ?? this.unsupported('parse')
  }

  isNull (value: T | null): value is null {
    return this.legacy.isNull?.(value) ?? (value === null)
  }

  getCurrentLocaleCode (): string {
    return this.legacy.getCurrentLocaleCode?.() ?? this.locale ?? 'en-US'
  }

  is12HourCycleInCurrentLocale (): boolean {
    return this.legacy.is12HourCycleInCurrentLocale?.() ?? false
  }

  formatByString (date: T, formatString: string): string {
    return this.legacy.formatByString?.(date, formatString) ?? this.unsupported('formatByString')
  }

  getFormatHelperText (format: string): string {
    return this.legacy.getFormatHelperText?.(format) ?? this.unsupported('getFormatHelperText')
  }

  formatNumber (numberToFormat: string): string {
    return this.legacy.formatNumber?.(numberToFormat) ?? this.unsupported('formatNumber')
  }

  getMeridiemText (ampm: 'am' | 'pm'): string {
    return this.legacy.getMeridiemText?.(ampm) ?? this.unsupported('getMeridiemText')
  }

  addSeconds (date: T, amount: number): T {
    return this.legacy.addSeconds?.(date, amount) ?? this.unsupported('addSeconds')
  }

  addYears (date: T, amount: number): T {
    return this.legacy.addYears?.(date, amount) ?? this.unsupported('addYears')
  }

  isAfterMonth (date: T, comparing: T): boolean {
    return this.legacy.isAfterMonth?.(date, comparing) ?? this.unsupported('isAfterMonth')
  }

  isAfterYear (date: T, comparing: T): boolean {
    return this.legacy.isAfterYear?.(date, comparing) ?? this.unsupported('isAfterYear')
  }

  isBeforeDay (date: T, comparing: T): boolean {
    return this.legacy.isBeforeDay?.(date, comparing) ?? this.unsupported('isBeforeDay')
  }

  isBeforeMonth (date: T, comparing: T): boolean {
    return this.legacy.isBeforeMonth?.(date, comparing) ?? this.unsupported('isBeforeMonth')
  }

  isBeforeYear (date: T, comparing: T): boolean {
    return this.legacy.isBeforeYear?.(date, comparing) ?? this.unsupported('isBeforeYear')
  }

  isSameHour (date: T, comparing: T): boolean {
    return this.legacy.isSameHour?.(date, comparing) ?? this.unsupported('isSameHour')
  }

  getSeconds (date: T): number {
    return this.legacy.getSeconds?.(date) ?? this.unsupported('getSeconds')
  }

  setSeconds (date: T, seconds: number): T {
    return this.legacy.setSeconds?.(date, seconds) ?? this.unsupported('setSeconds')
  }

  getDaysInMonth (date: T): number {
    return this.legacy.getDaysInMonth?.(date) ?? this.unsupported('getDaysInMonth')
  }

  getMonthArray (date: T): T[] {
    return this.legacy.getMonthArray?.(date) ?? this.unsupported('getMonthArray')
  }

  getYearRange (start: T, end: T): T[] {
    return this.legacy.getYearRange?.(start, end) ?? this.unsupported('getYearRange')
  }

  mergeDateAndTime (date: T, time: T): T {
    return this.legacy.mergeDateAndTime?.(date, time) ?? this.unsupported('mergeDateAndTime')
  }
}
