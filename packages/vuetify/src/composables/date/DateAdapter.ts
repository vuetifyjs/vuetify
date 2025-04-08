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
  isAfterDay(value: T, comparing: T): boolean

  isSameDay (date: T, comparing: T): boolean
  isSameMonth (date: T, comparing: T): boolean
  isSameYear(value: T, comparing: T): boolean

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
  getWeekdays (firstDayOfWeek?: number | string): string[]
  getWeek (date: T, firstDayOfWeek?: number | string, firstWeekMinSize?: number): number
  getMonth (date: T): number
  setMonth (date: T, month: number): T
  getDate (date: T): number
  setDate (date: T, day: number): T
  getNextMonth (date: T): T
  getPreviousMonth(date: T): T

  getHours (date: T): number
  setHours (date: T, hours: number): T
  getMinutes (date: T): number
  setMinutes (date: T, minutes: number): T
}
