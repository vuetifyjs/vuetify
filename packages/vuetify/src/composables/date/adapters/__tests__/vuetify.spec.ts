// Utilities
import timezoneMock from 'timezone-mock'
import { VuetifyDateAdapter } from '../vuetify'

// Types
import type { TimeZone } from 'timezone-mock'

describe('vuetify date adapter', () => {
  it('returns weekdays based on locale', () => {
    let instance = new VuetifyDateAdapter({ locale: 'en-us' })

    expect(instance.getWeekdays()).toStrictEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S'])

    instance = new VuetifyDateAdapter({ locale: 'sv-se' })

    expect(instance.getWeekdays()).toStrictEqual(['M', 'T', 'O', 'T', 'F', 'L', 'S'])
  })

  it('formats dates', () => {
    let instance = new VuetifyDateAdapter({ locale: 'en-gb' })
    expect(instance.format(new Date(2000, 0, 1, 13), 'fullTime')).toBe('13:00')

    instance = new VuetifyDateAdapter({ locale: 'en-us' })
    expect(instance.format(new Date(2000, 0, 1, 13), 'fullTime')).toBe('1:00 PM')
    expect(instance.format(new Date(2000, 0, 1, 13), 'fullTime12h')).toBe('1:00 PM')
    expect(instance.format(new Date(2000, 0, 1, 13), 'fullTime24h')).toBe('13:00')

    // These don't match the date-io spec
    expect(instance.format(new Date(2000, 0, 1, 13), 'fullDateTime')).toBe('Jan 1, 2000, 1:00 PM')
    expect(instance.format(new Date(2000, 0, 1, 13), 'fullDateTime12h')).toBe('Jan 1, 2000, 1:00 PM')
    expect(instance.format(new Date(2000, 0, 1, 13), 'fullDateTime24h')).toBe('Jan 1, 2000, 13:00')

    const keyboardDateTime12hFormat = '01/01/2000 1:00 PM'
    expect(instance.format(new Date(2000, 0, 1, 13), 'keyboardDateTime')).toBe(keyboardDateTime12hFormat)
    expect(instance.format(new Date(2000, 0, 1, 13), 'keyboardDateTime12h')).toBe(keyboardDateTime12hFormat)
    expect(instance.format(new Date(2000, 0, 1, 13), 'keyboardDateTime24h')).toBe('01/01/2000 13:00')

    expect(instance.format(new Date(2000, 0, 1), 'fullDateWithWeekday')).toBe('Saturday, January 1, 2000')

    instance = new VuetifyDateAdapter({ locale: 'sv-SE' })

    expect(instance.format(new Date(2000, 0, 1), 'fullDateWithWeekday')).toBe('lördag 1 januari 2000')
  })

  it.each([
    'UTC',
    'US/Pacific',
    'Europe/London',
    'Brazil/East',
    'Australia/Adelaide',
    'Etc/GMT-2',
    'Etc/GMT-4',
    'Etc/GMT+4',
  ])('handles timezone %s when parsing date without time', timezone => {
    // locale option here has no impact on timezone
    const instance = new VuetifyDateAdapter({ locale: 'en-us' })

    const str = '2001-01-01'

    timezoneMock.register(timezone as TimeZone)

    const date = instance.date(str)

    expect(date?.getFullYear()).toBe(2001)
    expect(date?.getDate()).toBe(1)
    expect(date?.getMonth()).toBe(0)

    timezoneMock.unregister()
  })

  describe('isAfterDay', () => {
    const dateUtils = new VuetifyDateAdapter({ locale: 'en-us' })

    it.each([
      [new Date('2024-01-02'), new Date('2024-01-01'), true],
      [new Date('2024-02-29'), new Date('2024-02-28'), true],
      [new Date('2024-01-01'), new Date('2024-01-01'), false],
      [new Date('2024-01-01'), new Date('2024-01-02'), false],
    ])('returns %s when comparing %s and %s', (date, comparing, expected) => {
      expect(dateUtils.isAfterDay(date, comparing)).toBe(expected)
    })
  })

  // TODO: why do these only fail locally
  describe.todo('getPreviousMonth', () => {
    const dateUtils = new VuetifyDateAdapter({ locale: 'en-us' })

    it.each([
      [new Date('2024-03-15'), new Date('2024-02-01'), '2024-03-15 -> 2024-02-01'],
      [new Date('2024-01-01'), new Date('2023-12-01'), '2024-01-01 -> 2023-12-01'],
      [new Date('2025-01-31'), new Date('2024-12-01'), '2025-01-31 -> 2024-12-01'],
      [new Date('2024-02-29'), new Date('2024-01-01'), '2024-02-29 -> 2024-01-01 (Leap Year)'],
      [new Date('2023-03-01'), new Date('2023-02-01'), '2023-03-01 -> 2023-02-01'],
    ])('correctly calculates the first day of the previous month: %s', (date, expected) => {
      const result = dateUtils.getPreviousMonth(date)
      expect(result.getFullYear()).toBe(expected.getFullYear())
      expect(result.getMonth()).toBe(expected.getMonth())
      expect(result.getDate()).toBe(expected.getDate())
    })
  })

  // TODO: why do these only fail locally
  describe.todo('isSameYear', () => {
    const dateUtils = new VuetifyDateAdapter({ locale: 'en-us' })

    it.each([
      [new Date('2024-01-01'), new Date('2024-12-31'), true],
      [new Date('2024-06-15'), new Date('2024-11-20'), true],
      [new Date('2023-01-01'), new Date('2024-01-01'), false],
      [new Date('2024-12-31'), new Date('2025-01-01'), false],
      [new Date('2024-07-07'), new Date('2023-07-07'), false],
    ])('returns %s when comparing %s and %s', (date1, date2, expected) => {
      expect(dateUtils.isSameYear(date1, date2)).toBe(expected)
    })
  })

  it('returns correct start of week', () => {
    let instance = new VuetifyDateAdapter({ locale: 'en-US' })

    let date = instance.startOfWeek(new Date(2024, 3, 10, 12, 0, 0))

    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(3)
    expect(date?.getDate()).toBe(7)
    expect(date?.getDay()).toBe(0)

    instance = new VuetifyDateAdapter({ locale: 'sv-SE' })

    date = instance.startOfWeek(new Date(2024, 3, 10, 12, 0, 0))

    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(3)
    expect(date?.getDate()).toBe(8)
    expect(date?.getDay()).toBe(1)
  })

  it('returns correct end of week', () => {
    let instance = new VuetifyDateAdapter({ locale: 'en-US' })

    let date = instance.endOfWeek(new Date(2024, 3, 10, 12, 0, 0))

    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(3)
    expect(date?.getDate()).toBe(13)
    expect(date?.getDay()).toBe(6)

    instance = new VuetifyDateAdapter({ locale: 'sv-SE' })

    date = instance.endOfWeek(new Date(2024, 3, 10, 12, 0, 0))

    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(3)
    expect(date?.getDate()).toBe(14)
    expect(date?.getDay()).toBe(0)
  })
})
