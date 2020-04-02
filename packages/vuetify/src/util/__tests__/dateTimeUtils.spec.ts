import { weekNumber } from '../dateTimeUtils'

describe('/util/dateTimeUtils.ts', () => {
  it('should return correct weeknumber', () => {
    expect(weekNumber(2010, 0, 1, 1, 4)).toBe(53)
    expect(weekNumber(2016, 0, 1, 0, 4)).toBe(53)

    expect(weekNumber(2006, 0, 1, 1, 4)).toBe(52)
    expect(weekNumber(2005, 11, 31, 0, 4)).toBe(52)

    expect(weekNumber(2006, 0, 1, 0, 4)).toBe(1)
    expect(weekNumber(2017, 0, 1, 0, 4)).toBe(1)
    expect(weekNumber(2019, 11, 31, 0, 4)).toBe(1)
    expect(weekNumber(2020, 0, 1, 0, 4)).toBe(1)
    expect(weekNumber(2020, 0, 1, 1, 4)).toBe(1)

    expect(weekNumber(2020, 0, 8, 0, 4)).toBe(2)
    expect(weekNumber(2020, 0, 8, 1, 4)).toBe(2)

    expect(weekNumber(2018, 1, 1, 2, 4)).toBe(5)

    // ISO 8601 (first day of week Monday, First week of year must contain a thurstday)
    expect(weekNumber(2012, 0, 1, 1, 4)).toBe(52)
    // American locale (first day of week Sunday, 1 Jan determines first week)
    expect(weekNumber(2012, 0, 1, 0, 0)).toBe(1)
  })
})
