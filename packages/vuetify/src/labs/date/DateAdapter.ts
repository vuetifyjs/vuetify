export interface DateAdapter<T> {
  date (value?: any): T | null
  format (date: T, formatString: string): string
  toJsDate (value: T): Date
  parseISO (date: string): T
  toISO (date: T): string

  startOfDay (date: T): T
  endOfDay (date: T): T
  startOfMonth (date: T): T
  endOfMonth (date: T): T
  startOfYear (date: T): T
  endOfYear (date: T): T

  isBefore (date: T, comparing: T): boolean
  isAfter (date: T, comparing: T): boolean
  isEqual (date: T, comparing: T): boolean
  isSameDay (date: T, comparing: T): boolean
  isSameMonth (date: T, comparing: T): boolean
  isValid (date: any): boolean
  isWithinRange (date: T, range: [T, T]): boolean

  addDays (date: T, amount: number): T
  addMonths (date: T, amount: number): T

  getYear (date: T): number
  getNextYear (date: T): T
  setYear (date: T, year: number): T
  getDiff (date: T, comparing: T | string, unit?: string): number
  getWeekArray (date: T): T[][]
  getWeekdays (): string[]
  getMonth (date: T): number
  setMonth (date: T, month: number): T
  getNextMonth (date: T): T
}
