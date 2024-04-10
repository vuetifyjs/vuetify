// Utilities
import { describe, expect, it } from '@jest/globals'
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
    let instance = new VuetifyDateAdapter({ locale: 'en-us' })

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
