// Composables
import { VuetifyDateAdapter } from '@/composables/date/adapters/vuetify'

// Types
import type { DateAdapter } from '@/composables/date'

type CustomDateFormat = Intl.DateTimeFormatOptions | ((date: string, formatString: string, locale: string) => string)

export class StringDateAdapter implements DateAdapter<string> {
  base: VuetifyDateAdapter

  constructor (options: { locale: string, formats?: Record<string, CustomDateFormat> }) {
    this.base = new VuetifyDateAdapter({
      locale: options.locale,
      formats: options.formats && Object.fromEntries(
        Object.entries(options.formats).map(([k, v]) => {
          return [
            k,
            typeof v === 'function'
              ? (date, ...args) => v(this.base.toISO(date), ...args)
              : v,
          ]
        })
      ),
    })
  }

  addDays (date: string, amount: number): string {
    return this.base.toISO(
      this.base.addDays(this.base.date(date)!, amount)
    )
  }

  addHours (date: string, amount: number): string {
    return this.base.toISO(
      this.base.addHours(this.base.date(date)!, amount)
    )
  }

  addMinutes (date: string, amount: number): string {
    return this.base.toISO(
      this.base.addMinutes(this.base.date(date)!, amount)
    )
  }

  addMonths (date: string, amount: number): string {
    return this.base.toISO(
      this.base.addMonths(this.base.date(date)!, amount)
    )
  }

  addWeeks (date: string, amount: number): string {
    return this.base.toISO(
      this.base.addWeeks(this.base.date(date)!, amount)
    )
  }

  date (value?: any): string | null {
    return this.base.toISO(
      this.base.date(value)!
    )
  }

  endOfDay (date: string): string {
    return this.base.toISO(
      this.base.endOfDay(this.base.date(date)!)
    )
  }

  endOfMonth (date: string): string {
    return this.base.toISO(
      this.base.endOfMonth(this.base.date(date)!)
    )
  }

  endOfWeek (date: string): string {
    return this.base.toISO(
      this.base.endOfWeek(this.base.date(date)!)
    )
  }

  endOfYear (date: string): string {
    return this.base.toISO(
      this.base.endOfYear(this.base.date(date)!)
    )
  }

  format (date: string, formatString: string): string {
    return this.base.format(
      this.base.date(date)!,
      formatString
    )
  }

  getDate (date: string): number {
    return this.base.getDate(this.base.date(date)!)
  }

  getDiff (date: string, comparing: string, unit?: string): number {
    return this.base.getDiff(this.base.date(date)!, comparing, unit)
  }

  getHours (date: string): number {
    return this.base.getHours(this.base.date(date)!)
  }

  getMinutes (date: string): number {
    return this.base.getMinutes(this.base.date(date)!)
  }

  getMonth (date: string): number {
    return this.base.getMonth(this.base.date(date)!)
  }

  getNextMonth (date: string): string {
    return this.base.toISO(
      this.base.getNextMonth(this.base.date(date)!)
    )
  }

  getPreviousMonth (date: string): string {
    return this.base.toISO(
      this.base.getPreviousMonth(this.base.date(date)!)
    )
  }

  getWeekArray (date: string, firstDayOfWeek?: number | string): string[][] {
    return this.base.getWeekArray(
      this.base.date(date)!,
      firstDayOfWeek,
    ).map(week => {
      return week.map(day => {
        return this.base.toISO(day)
      })
    })
  }

  getWeekdays (firstDayOfWeek?: number | string): string[] {
    return this.base.getWeekdays(firstDayOfWeek)
  }

  getYear (date: string): number {
    return this.base.getYear(this.base.date(date)!)
  }

  isAfter (date: string, comparing: string): boolean {
    return this.base.isAfter(
      this.base.date(date)!,
      this.base.date(comparing)!,
    )
  }

  isAfterDay (date: string, comparing: string): boolean {
    return this.base.isAfterDay(
      this.base.date(date)!,
      this.base.date(comparing)!,
    )
  }

  isBefore (date: string, comparing: string): boolean {
    return this.base.isBefore(
      this.base.date(date)!,
      this.base.date(comparing)!,
    )
  }

  isEqual (date: string, comparing: string): boolean {
    return this.base.isEqual(
      this.base.date(date)!,
      this.base.date(comparing)!,
    )
  }

  isSameDay (date: string, comparing: string): boolean {
    return this.base.isSameDay(
      this.base.date(date)!,
      this.base.date(comparing)!,
    )
  }

  isSameMonth (date: string, comparing: string): boolean {
    return this.base.isSameMonth(
      this.base.date(date)!,
      this.base.date(comparing)!,
    )
  }

  isSameYear (date: string, comparing: string): boolean {
    return this.base.isSameYear(
      this.base.date(date)!,
      this.base.date(comparing)!,
    )
  }

  isValid (date: any): boolean {
    return this.base.isValid(date)
  }

  isWithinRange (date: string, range: [string, string]): boolean {
    return this.base.isWithinRange(
      this.base.date(date)!,
      [this.base.date(range[0])!, this.base.date(range[1])!],
    )
  }

  parseISO (date: string): string {
    return this.base.toISO(this.base.parseISO(date))
  }

  setDate (date: string, day: number): string {
    return this.base.toISO(
      this.base.setDate(this.base.date(date)!, day)
    )
  }

  setHours (date: string, hours: number): string {
    return this.base.toISO(
      this.base.setHours(this.base.date(date)!, hours)
    )
  }

  setMinutes (date: string, minutes: number): string {
    return this.base.toISO(
      this.base.setMinutes(this.base.date(date)!, minutes)
    )
  }

  setMonth (date: string, month: number): string {
    return this.base.toISO(
      this.base.setMonth(this.base.date(date)!, month)
    )
  }

  setYear (date: string, year: number): string {
    return this.base.toISO(
      this.base.setYear(this.base.date(date)!, year)
    )
  }

  startOfDay (date: string): string {
    return this.base.toISO(
      this.base.startOfDay(this.base.date(date)!)
    )
  }

  startOfMonth (date: string): string {
    return this.base.toISO(
      this.base.startOfMonth(this.base.date(date)!)
    )
  }

  startOfWeek (date: string, firstDayOfWeek?: number | string): string {
    return this.base.toISO(
      this.base.startOfWeek(this.base.date(date)!, firstDayOfWeek)
    )
  }

  startOfYear (date: string): string {
    return this.base.toISO(
      this.base.startOfYear(this.base.date(date)!)
    )
  }

  toISO (date: string): string {
    return this.base.toISO(
      this.base.date(date)!
    )
  }

  toJsDate (value: string): Date {
    return this.base.date(value)!
  }
}
