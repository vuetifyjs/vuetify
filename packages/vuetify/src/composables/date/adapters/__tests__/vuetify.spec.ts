// Utilities
import { Vuetify0DateAdapter } from '@vuetify/v0/date'
import { VuetifyDateBridge } from '../../bridge'

function createAdapter (locale: string) {
  return new VuetifyDateBridge(new Vuetify0DateAdapter(locale))
}

describe('vuetify date adapter (via VuetifyDateBridge)', () => {
  it('returns weekdays based on locale', () => {
    let instance = createAdapter('en-us')

    // v0 defaults to 'short' format
    expect(instance.getWeekdays()).toStrictEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    // Narrow format matches the old behavior
    expect(instance.getWeekdays(undefined, 'narrow')).toStrictEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S'])

    instance = createAdapter('sv-se')

    expect(instance.getWeekdays(undefined, 'narrow')).toStrictEqual(['S', 'M', 'T', 'O', 'T', 'F', 'L'])
  })

  it('formats dates', () => {
    let instance = createAdapter('en-gb')
    // v0 includes seconds in time formats
    expect(instance.format(instance.date(new Date(2000, 0, 1, 13))!, 'fullTime')).toBe('13:00:00')

    instance = createAdapter('en-us')
    expect(instance.format(instance.date(new Date(2000, 0, 1, 13))!, 'fullTime')).toBe('1:00:00 PM')
    expect(instance.format(instance.date(new Date(2000, 0, 1, 13))!, 'fullTime12h')).toBe('1:00:00 PM')
    expect(instance.format(instance.date(new Date(2000, 0, 1, 13))!, 'fullTime24h')).toBe('13:00:00')

    expect(instance.format(instance.date(new Date(2000, 0, 1, 13))!, 'fullDateTime')).toBe('Saturday, January 1, 2000 at 1:00 PM')

    expect(instance.format(instance.date(new Date(2000, 0, 1, 13))!, 'keyboardDateTime')).toBe('01/01/2000, 1:00 PM')
    expect(instance.format(instance.date(new Date(2000, 0, 1, 13))!, 'keyboardDateTime12h')).toBe('01/01/2000, 1:00 PM')
    expect(instance.format(instance.date(new Date(2000, 0, 1, 13))!, 'keyboardDateTime24h')).toBe('01/01/2000, 13:00')

    expect(instance.format(instance.date(new Date(2000, 0, 1))!, 'fullDateWithWeekday')).toBe('Saturday, January 1, 2000')

    instance = createAdapter('sv-SE')

    expect(instance.format(instance.date(new Date(2000, 0, 1))!, 'fullDateWithWeekday')).toBe('lördag 1 januari 2000')
  })

  it('handles parsing date without time', () => {
    // Temporal.PlainDateTime is timezone-agnostic
    const instance = createAdapter('en-us')

    const str = '2001-01-01'
    const date = instance.date(str)

    expect(date).not.toBeNull()
    expect(instance.getYear(date!)).toBe(2001)
    expect(instance.getDate(date!)).toBe(1)
    expect(instance.getMonth(date!)).toBe(0)
  })

  describe('isAfterDay', () => {
    const dateUtils = createAdapter('en-us')

    it.each([
      ['2024-01-02', '2024-01-01', true],
      ['2024-02-29', '2024-02-28', true],
      ['2024-01-01', '2024-01-01', false],
      ['2024-01-01', '2024-01-02', false],
    ])('returns %s when comparing %s and %s', (dateStr, comparingStr, expected) => {
      expect(dateUtils.isAfterDay(
        dateUtils.parseISO(dateStr),
        dateUtils.parseISO(comparingStr),
      )).toBe(expected)
    })
  })

  // TODO: why do these only fail locally
  describe.todo('getPreviousMonth', () => {
    const dateUtils = createAdapter('en-us')

    it.each([
      ['2024-03-15', '2024-02-01', '2024-03-15 -> 2024-02-01'],
      ['2024-01-01', '2023-12-01', '2024-01-01 -> 2023-12-01'],
      ['2025-01-31', '2024-12-01', '2025-01-31 -> 2024-12-01'],
      ['2024-02-29', '2024-01-01', '2024-02-29 -> 2024-01-01 (Leap Year)'],
      ['2023-03-01', '2023-02-01', '2023-03-01 -> 2023-02-01'],
    ])('correctly calculates the first day of the previous month: %s', (dateStr, expectedStr) => {
      const result = dateUtils.getPreviousMonth(dateUtils.parseISO(dateStr))
      const expected = dateUtils.parseISO(expectedStr)
      expect(dateUtils.getYear(result)).toBe(dateUtils.getYear(expected))
      expect(dateUtils.getMonth(result)).toBe(dateUtils.getMonth(expected))
      expect(dateUtils.getDate(result)).toBe(dateUtils.getDate(expected))
    })
  })

  // TODO: why do these only fail locally
  describe.todo('isSameYear', () => {
    const dateUtils = createAdapter('en-us')

    it.each([
      ['2024-01-01', '2024-12-31', true],
      ['2024-06-15', '2024-11-20', true],
      ['2023-01-01', '2024-01-01', false],
      ['2024-12-31', '2025-01-01', false],
      ['2024-07-07', '2023-07-07', false],
    ])('returns %s when comparing %s and %s', (date1Str, date2Str, expected) => {
      expect(dateUtils.isSameYear(
        dateUtils.parseISO(date1Str),
        dateUtils.parseISO(date2Str),
      )).toBe(expected)
    })
  })

  it('returns correct start of week', () => {
    // v0 defaults to Sunday (0) as first day of week
    let instance = createAdapter('en-US')

    let date = instance.startOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!)

    let jsDate = instance.toJsDate(date)
    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(7)
    expect(jsDate.getDay()).toBe(0)

    // sv-SE without explicit fdow also defaults to Sunday
    instance = createAdapter('sv-SE')

    date = instance.startOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!)

    jsDate = instance.toJsDate(date)
    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(7)
    expect(jsDate.getDay()).toBe(0)

    // With explicit fdow=1 (Monday), sv-SE gets Monday-based weeks
    date = instance.startOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!, 1)

    jsDate = instance.toJsDate(date)
    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(8)
    expect(jsDate.getDay()).toBe(1)
  })

  it('returns correct end of week', () => {
    let instance = createAdapter('en-US')

    let date = instance.endOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!)

    let jsDate = instance.toJsDate(date)
    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(13)
    expect(jsDate.getDay()).toBe(6)

    // v0 defaults to Sunday-based weeks for all locales
    instance = createAdapter('sv-SE')

    date = instance.endOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!)

    jsDate = instance.toJsDate(date)
    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(13)
    expect(jsDate.getDay()).toBe(6)
  })
})
