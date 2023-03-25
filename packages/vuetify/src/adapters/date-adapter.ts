export interface DateAdapter<Date> {
  date (value?: any): Date | null
  format (date: Date, formatString: string): string
  parse (date: string, formatString: string): Date

  startOfMonth (date: Date): Date
  endOfMonth (date: Date): Date
  startOfYear (date: Date): Date
  endOfYear (date: Date): Date

  isBefore (date: Date, comparing: Date): boolean
  isAfter (date: Date, comparing: Date): boolean
  isEqual (date: Date, comparing: Date): boolean
  isSameDay (date: Date, comparing: Date): boolean
  isSameMonth (date: Date, comparing: Date): boolean
  isValid (date: any): boolean
  isWithinRange (date: Date, range: [Date, Date]): boolean

  addDays (date: Date, amount: number): Date
  addMonths (date: Date, amount: number): Date

  getYear (date: Date): number
  setYear (date: Date, year: number): Date
  getDiff (date: Date, comparing: Date | string, unit?: string): number
  getWeek (date: Date): number
  getWeekArray (month: Date, includeAdjacentMonths?: boolean): (Date | null)[][]
  getWeekdays (options?: { weekday: 'long' | 'short'}): string[]
  getMonth (date: Date): number
}
