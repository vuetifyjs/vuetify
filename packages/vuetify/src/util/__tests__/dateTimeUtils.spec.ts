import { weekNumber } from '../dateTimeUtils'

describe('/util/dateTimeUtils.ts', () => {
  test.each([
    [2010, 0, 1, 1, 4, 53],
    [2016, 0, 1, 0, 4, 53],
    [2006, 0, 1, 1, 4, 52],
    [2005, 11, 31, 0, 4, 52],
    [2006, 0, 1, 0, 4, 1],
    [2017, 0, 1, 0, 4, 1],
    [2019, 11, 31, 0, 4, 1],
    [2020, 0, 1, 0, 4, 1],
    [2020, 0, 1, 1, 4, 1],
    [2020, 0, 8, 0, 4, 2],
    [2020, 0, 8, 1, 4, 2],
    [2020, 1, 1, 2, 4, 5],
    // ISO 8601 (first day of week Monday, First week of year must contain a thurstday)
    [2012, 0, 1, 1, 4, 52],
    // American locale (first day of week Sunday, 1 Jan determines first week)
    [2012, 0, 1, 0, 0, 1],
  ])('should return correct weeknumber', (year, month, day, firstDayOfWeek, localFirstDayOfYear, week) => {
    expect(weekNumber(year, month, day, firstDayOfWeek, localFirstDayOfYear)).toBe(week)
  })
})
