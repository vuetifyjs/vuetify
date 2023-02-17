export interface DateAdapter<TDate> {
  addDays (date: TDate, amount: number): TDate
  date (): TDate
  format (date: TDate, formatString: string): string
  getMonth (date: TDate): number
  getWeek (date: TDate): number
  getWeekArray (month: TDate): TDate[][]
  getYear (date: TDate): number
  isSameDay (date: TDate, comparing: TDate): boolean
  isSameMonth (date: TDate, comparing: TDate): boolean
  isWithinRange (date: TDate, range: [TDate, TDate]): boolean
}
