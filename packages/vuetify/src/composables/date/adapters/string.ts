import { Vuetify0DateAdapter } from '@vuetify/v0/date'

// Types
import type { DateAdapter } from '@vuetify/v0/composables'

export class StringDateAdapter implements DateAdapter<string> {
  private base: Vuetify0DateAdapter

  get locale () { return this.base.locale }
  set locale (v: string) { this.base.locale = v }
  get firstDayOfWeek () { return this.base.firstDayOfWeek }
  set firstDayOfWeek (v: number) { this.base.firstDayOfWeek = v }

  constructor (options?: { locale?: string }) {
    this.base = new Vuetify0DateAdapter(options?.locale)
  }

  private toBase (value: string) { return this.base.parseISO(value) }
  private fromBase (value: any): string { return this.base.toISO(value) }

  // ============================================
  // Construction & Conversion
  // ============================================

  date (value?: unknown): string | null {
    const result = this.base.date(value)
    return result ? this.fromBase(result) : null
  }

  toJsDate (value: string): Date {
    return this.base.toJsDate(this.toBase(value))
  }

  parseISO (date: string): string {
    return this.fromBase(this.base.parseISO(date))
  }

  toISO (date: string): string {
    return this.fromBase(this.toBase(date))
  }

  parse (value: string, format: string): string | null {
    const result = this.base.parse(value, format)
    return result ? this.fromBase(result) : null
  }

  isValid (date: unknown): date is string {
    return this.base.isValid(date)
  }

  isNull (value: string | null): value is null {
    return this.base.isNull(value as any)
  }

  // ============================================
  // Locale & Formatting
  // ============================================

  getCurrentLocaleCode (): string {
    return this.base.getCurrentLocaleCode()
  }

  is12HourCycleInCurrentLocale (): boolean {
    return this.base.is12HourCycleInCurrentLocale()
  }

  format (date: string, formatString: string): string {
    return this.base.format(this.toBase(date), formatString)
  }

  formatByString (date: string, formatString: string): string {
    return this.base.formatByString(this.toBase(date), formatString)
  }

  getFormatHelperText (format: string): string {
    return this.base.getFormatHelperText(format)
  }

  formatNumber (numberToFormat: string): string {
    return this.base.formatNumber(numberToFormat)
  }

  getMeridiemText (ampm: 'am' | 'pm'): string {
    return this.base.getMeridiemText(ampm)
  }

  // ============================================
  // Navigation - Start/End boundaries
  // ============================================

  startOfDay (date: string): string {
    return this.fromBase(this.base.startOfDay(this.toBase(date)))
  }

  endOfDay (date: string): string {
    return this.fromBase(this.base.endOfDay(this.toBase(date)))
  }

  startOfWeek (date: string): string {
    return this.fromBase(this.base.startOfWeek(this.toBase(date)))
  }

  endOfWeek (date: string): string {
    return this.fromBase(this.base.endOfWeek(this.toBase(date)))
  }

  startOfMonth (date: string): string {
    return this.fromBase(this.base.startOfMonth(this.toBase(date)))
  }

  endOfMonth (date: string): string {
    return this.fromBase(this.base.endOfMonth(this.toBase(date)))
  }

  startOfYear (date: string): string {
    return this.fromBase(this.base.startOfYear(this.toBase(date)))
  }

  endOfYear (date: string): string {
    return this.fromBase(this.base.endOfYear(this.toBase(date)))
  }

  // ============================================
  // Arithmetic
  // ============================================

  addSeconds (date: string, amount: number): string {
    return this.fromBase(this.base.addSeconds(this.toBase(date), amount))
  }

  addMinutes (date: string, amount: number): string {
    return this.fromBase(this.base.addMinutes(this.toBase(date), amount))
  }

  addHours (date: string, amount: number): string {
    return this.fromBase(this.base.addHours(this.toBase(date), amount))
  }

  addDays (date: string, amount: number): string {
    return this.fromBase(this.base.addDays(this.toBase(date), amount))
  }

  addWeeks (date: string, amount: number): string {
    return this.fromBase(this.base.addWeeks(this.toBase(date), amount))
  }

  addMonths (date: string, amount: number): string {
    return this.fromBase(this.base.addMonths(this.toBase(date), amount))
  }

  addYears (date: string, amount: number): string {
    return this.fromBase(this.base.addYears(this.toBase(date), amount))
  }

  // ============================================
  // Comparison
  // ============================================

  isAfter (date: string, comparing: string): boolean {
    return this.base.isAfter(this.toBase(date), this.toBase(comparing))
  }

  isAfterDay (date: string, comparing: string): boolean {
    return this.base.isAfterDay(this.toBase(date), this.toBase(comparing))
  }

  isAfterMonth (date: string, comparing: string): boolean {
    return this.base.isAfterMonth(this.toBase(date), this.toBase(comparing))
  }

  isAfterYear (date: string, comparing: string): boolean {
    return this.base.isAfterYear(this.toBase(date), this.toBase(comparing))
  }

  isBefore (date: string, comparing: string): boolean {
    return this.base.isBefore(this.toBase(date), this.toBase(comparing))
  }

  isBeforeDay (date: string, comparing: string): boolean {
    return this.base.isBeforeDay(this.toBase(date), this.toBase(comparing))
  }

  isBeforeMonth (date: string, comparing: string): boolean {
    return this.base.isBeforeMonth(this.toBase(date), this.toBase(comparing))
  }

  isBeforeYear (date: string, comparing: string): boolean {
    return this.base.isBeforeYear(this.toBase(date), this.toBase(comparing))
  }

  isEqual (date: string, comparing: string): boolean {
    return this.base.isEqual(this.toBase(date), this.toBase(comparing))
  }

  isSameDay (date: string, comparing: string): boolean {
    return this.base.isSameDay(this.toBase(date), this.toBase(comparing))
  }

  isSameMonth (date: string, comparing: string): boolean {
    return this.base.isSameMonth(this.toBase(date), this.toBase(comparing))
  }

  isSameYear (date: string, comparing: string): boolean {
    return this.base.isSameYear(this.toBase(date), this.toBase(comparing))
  }

  isSameHour (date: string, comparing: string): boolean {
    return this.base.isSameHour(this.toBase(date), this.toBase(comparing))
  }

  isWithinRange (date: string, range: [string, string]): boolean {
    return this.base.isWithinRange(
      this.toBase(date),
      [this.toBase(range[0]), this.toBase(range[1])],
    )
  }

  // ============================================
  // Getters
  // ============================================

  getYear (date: string): number {
    return this.base.getYear(this.toBase(date))
  }

  getMonth (date: string): number {
    return this.base.getMonth(this.toBase(date))
  }

  getDate (date: string): number {
    return this.base.getDate(this.toBase(date))
  }

  getHours (date: string): number {
    return this.base.getHours(this.toBase(date))
  }

  getMinutes (date: string): number {
    return this.base.getMinutes(this.toBase(date))
  }

  getSeconds (date: string): number {
    return this.base.getSeconds(this.toBase(date))
  }

  getDiff (date: string, comparing: string, unit?: string): number {
    return this.base.getDiff(this.toBase(date), this.toBase(comparing), unit)
  }

  getWeek (date: string, minimalDays?: number): number {
    return this.base.getWeek(this.toBase(date), minimalDays)
  }

  getDaysInMonth (date: string): number {
    return this.base.getDaysInMonth(this.toBase(date))
  }

  // ============================================
  // Setters
  // ============================================

  setYear (date: string, year: number): string {
    return this.fromBase(this.base.setYear(this.toBase(date), year))
  }

  setMonth (date: string, month: number): string {
    return this.fromBase(this.base.setMonth(this.toBase(date), month))
  }

  setDate (date: string, day: number): string {
    return this.fromBase(this.base.setDate(this.toBase(date), day))
  }

  setHours (date: string, hours: number): string {
    return this.fromBase(this.base.setHours(this.toBase(date), hours))
  }

  setMinutes (date: string, minutes: number): string {
    return this.fromBase(this.base.setMinutes(this.toBase(date), minutes))
  }

  setSeconds (date: string, seconds: number): string {
    return this.fromBase(this.base.setSeconds(this.toBase(date), seconds))
  }

  // ============================================
  // Calendar Utilities
  // ============================================

  getWeekdays (weekdayFormat?: 'long' | 'short' | 'narrow'): string[] {
    return this.base.getWeekdays(weekdayFormat)
  }

  getWeekArray (date: string): string[][] {
    return this.base.getWeekArray(this.toBase(date)).map(week =>
      week.map(day => this.fromBase(day))
    )
  }

  getMonthArray (date: string): string[] {
    return this.base.getMonthArray(this.toBase(date)).map(d => this.fromBase(d))
  }

  getYearRange (start: string, end: string): string[] {
    return this.base.getYearRange(this.toBase(start), this.toBase(end)).map(d => this.fromBase(d))
  }

  // ============================================
  // Month Navigation
  // ============================================

  getNextMonth (date: string): string {
    return this.fromBase(this.base.getNextMonth(this.toBase(date)))
  }

  getPreviousMonth (date: string): string {
    return this.fromBase(this.base.getPreviousMonth(this.toBase(date)))
  }

  // ============================================
  // Utility
  // ============================================

  mergeDateAndTime (date: string, time: string): string {
    return this.fromBase(this.base.mergeDateAndTime(this.toBase(date), this.toBase(time)))
  }
}
