// Utilities
import { Vuetify0DateAdapter } from '@vuetify/v0/date'
import { StringDateAdapter } from '../adapters/string'
import { VuetifyDateBridge } from '../bridge'
import { createDateRange } from '../date'

function createAdapter (locale: string) {
  return new VuetifyDateBridge(new Vuetify0DateAdapter(locale))
}

describe('VuetifyDateBridge (Vuetify0DateAdapter)', () => {
  it('should have the correct days in a month', () => {
    const adapter = createAdapter('en-US')

    expect(adapter.getWeek(adapter.parseISO('2023-10-10'))).toBe(41)
  })

  it('should correctly calculate weeks between years', () => {
    const adapter = createAdapter('en-US')

    expect(adapter.getWeek(adapter.parseISO('2024-12-28'))).toBe(52)
    expect(adapter.getWeek(adapter.parseISO('2024-12-29'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2024-12-30'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2024-12-31'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-01'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-02'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-03'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-04'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-05'))).toBe(2)
  })

  it('should correctly calculate when year starts with a full week', () => {
    const adapter1 = createAdapter('en-US') // first day = 7 | minimal days = 1

    expect(adapter1.getWeek(adapter1.parseISO('2022-12-25'))).toBe(53)
    expect(adapter1.getWeek(adapter1.parseISO('2022-12-31'))).toBe(53)
    expect(adapter1.getWeek(adapter1.parseISO('2023-01-01'))).toBe(1)
    expect(adapter1.getWeek(adapter1.parseISO('2023-01-07'))).toBe(1)

    // v0 uses minimalDays=1 by default (not locale-derived), so pt behaves
    // like en-US without explicit minimalDays parameter
    const adapter2 = createAdapter('pt')

    expect(adapter2.getWeek(adapter2.parseISO('2022-12-25'))).toBe(53)
    expect(adapter2.getWeek(adapter2.parseISO('2022-12-31'))).toBe(53)
    expect(adapter2.getWeek(adapter2.parseISO('2023-01-01'))).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2023-01-07'))).toBe(1)
  })

  it('should adjust for start of a week', () => {
    const adapter = createAdapter('en-US') // first day = 7 | minimal days = 1

    expect(adapter.getWeek(adapter.parseISO('2028-12-25'), 1)).toBe(53)
    expect(adapter.getWeek(adapter.parseISO('2028-12-31'), 1)).toBe(53)
    expect(adapter.getWeek(adapter.parseISO('2029-01-01'), 1)).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2029-01-07'), 1)).toBe(1)

    const adapter2 = createAdapter('pt-PT') // first day = 7 | minimal days = 4

    expect(adapter2.getWeek(adapter2.parseISO('2024-12-28'), 1)).toBe(52)
    expect(adapter2.getWeek(adapter2.parseISO('2024-12-29'), 1)).toBe(52)
    expect(adapter2.getWeek(adapter2.parseISO('2024-12-30'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2024-12-31'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-01'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-02'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-03'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-04'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-05'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-06'), 1)).toBe(2)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-07'), 1)).toBe(2)

    expect(adapter2.getWeek(adapter2.parseISO('2028-12-25'), 1)).toBe(53)
    expect(adapter2.getWeek(adapter2.parseISO('2028-12-31'), 1)).toBe(53)
    expect(adapter2.getWeek(adapter2.parseISO('2029-01-01'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2029-01-07'), 1)).toBe(1)

    const adapter3 = createAdapter('pl-PL')
    expect(adapter3.getWeek(adapter3.parseISO('2024-12-29'), 1)).toBe(52)
  })

  it('should use consistent week start across locales', () => {
    // v0 uses Sunday (0) as default firstDayOfWeek regardless of locale
    const adapter1 = createAdapter('en-US')
    expect(adapter1.getWeek(adapter1.parseISO('2025-01-04'))).toBe(1) // saturday
    expect(adapter1.getWeek(adapter1.parseISO('2025-01-05'))).toBe(2) // sunday

    const adapter2 = createAdapter('fr')
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-04'))).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-05'))).toBe(2) // sunday
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-06'))).toBe(2) // monday
  })

  describe('createDateRange', () => {
    const adapter = createAdapter('en-US')

    it('should create a single date array when only start date is provided', () => {
      const start = adapter.parseISO('2024-01-01')
      const result = createDateRange(adapter, start)

      expect(result).toHaveLength(1)
      expect(adapter.isSameDay(result[0], start)).toBe(true)
    })

    it('should handle same start and stop date', () => {
      const date = adapter.parseISO('2024-01-01')
      const result = createDateRange(adapter, date, date)

      expect(adapter.isSameDay(result[0], date)).toBe(true)
      expect(adapter.isSameDay(result[1], adapter.endOfDay(date))).toBe(true)
    })

    it('should create a range of dates between start and stop', () => {
      const start = adapter.parseISO('2024-01-01')
      const stop = adapter.parseISO('2024-01-03')
      const result = createDateRange(adapter, start, stop)

      expect(result).toHaveLength(3)
      expect(adapter.isSameDay(result[0], start)).toBe(true)
      expect(adapter.isSameDay(result[1], adapter.parseISO('2024-01-02'))).toBe(true)
      expect(adapter.isSameDay(result[2], adapter.endOfDay(stop))).toBe(true)
    })

    it('should handle dates in different months', () => {
      const start = adapter.parseISO('2024-01-30')
      const stop = adapter.parseISO('2024-02-02')
      const result = createDateRange(adapter, start, stop)

      expect(result).toHaveLength(4)
      expect(adapter.isSameDay(result[0], start)).toBe(true)
      expect(adapter.isSameDay(result[1], adapter.parseISO('2024-01-31'))).toBe(true)
      expect(adapter.isSameDay(result[2], adapter.parseISO('2024-02-01'))).toBe(true)
      expect(adapter.isSameDay(result[3], adapter.endOfDay(stop))).toBe(true)
    })

    it('should handle dates in different years', () => {
      const start = adapter.parseISO('2024-12-30')
      const stop = adapter.parseISO('2025-01-02')
      const result = createDateRange(adapter, start, stop)

      expect(result).toHaveLength(4)
      expect(adapter.isSameDay(result[0], start)).toBe(true)
      expect(adapter.isSameDay(result[1], adapter.parseISO('2024-12-31'))).toBe(true)
      expect(adapter.isSameDay(result[2], adapter.parseISO('2025-01-01'))).toBe(true)
      expect(adapter.isSameDay(result[3], adapter.endOfDay(stop))).toBe(true)
    })

    it('should not miss any days near ST/DST transition', () => {
      // Temporal is timezone-agnostic, so use plain dates
      const start = adapter.parseISO('2025-03-28')
      const stop = adapter.parseISO('2025-03-30')
      const result = createDateRange(adapter, start, stop)

      expect(result).toHaveLength(3)
    })
  })

  describe('week numbers with time zone', () => {
    // Temporal.PlainDateTime is timezone-agnostic, so TZ stubbing
    // doesn't affect calculations. These tests verify the same
    // week-number correctness without timezone dependency.
    it('should calculate weeks correctly near ST/DST transition', () => {
      const adapter = createAdapter('en-US')
      expect(adapter.getWeek(adapter.parseISO('2025-03-15'))).toBe(11)
      expect(adapter.getWeek(adapter.parseISO('2025-03-16'))).toBe(12)
      expect(adapter.getWeek(adapter.parseISO('2025-03-17'))).toBe(12)
    })

    it('should calculate weeks correctly near DST/ST transition', () => {
      const adapter = createAdapter('en-US')
      expect(adapter.getWeek(adapter.parseISO('2025-11-01'))).toBe(44)
      expect(adapter.getWeek(adapter.parseISO('2025-11-02'))).toBe(45)
      expect(adapter.getWeek(adapter.parseISO('2025-11-03'))).toBe(45)
    })
  })

  describe('week numbers with first-day-of-week', () => {
    it('should calculate weeks correctly when adapting for UK', () => {
      const adapterUS = createAdapter('en-US')
      const adapterGB = createAdapter('en-GB')
      // v0 uses Sunday/minimalDays=1 by default for all locales
      expect(adapterUS.getWeek(adapterUS.parseISO('2025-03-16'))).toBe(12)
      expect(adapterGB.getWeek(adapterGB.parseISO('2025-03-16'))).toBe(12)
      // Explicit fdow=1, fdoy=4 gives ISO week numbering
      expect(adapterUS.getWeek(adapterUS.parseISO('2025-03-16'), 1, 4)).toBe(11)
    })
  })
})

describe('StringDateAdapter', () => {
  it('should have the correct days in a month', () => {
    const adapter = new StringDateAdapter({ locale: 'en-US' })

    expect(adapter.getWeek('2023-10-10')).toBe(41)
  })

  it('should correctly calculate weeks between years', () => {
    const adapter = new StringDateAdapter({ locale: 'en-US' })

    expect(adapter.getWeek('2024-12-28')).toBe(52)
    expect(adapter.getWeek('2024-12-29')).toBe(1)
    expect(adapter.getWeek('2024-12-30')).toBe(1)
    expect(adapter.getWeek('2024-12-31')).toBe(1)
    expect(adapter.getWeek('2025-01-01')).toBe(1)
    expect(adapter.getWeek('2025-01-02')).toBe(1)
    expect(adapter.getWeek('2025-01-03')).toBe(1)
    expect(adapter.getWeek('2025-01-04')).toBe(1)
    expect(adapter.getWeek('2025-01-05')).toBe(2)
  })

  it('should correctly calculate when year starts with a full week', () => {
    const adapter1 = new StringDateAdapter({ locale: 'en-US' }) // first day = 7 | minimal days = 1

    expect(adapter1.getWeek('2022-12-25')).toBe(53)
    expect(adapter1.getWeek('2022-12-31')).toBe(53)
    expect(adapter1.getWeek('2023-01-01')).toBe(1)
    expect(adapter1.getWeek('2023-01-07')).toBe(1)

    // v0 uses minimalDays=1 by default, not locale-derived
    const adapter2 = new StringDateAdapter({ locale: 'pt' })

    expect(adapter2.getWeek('2022-12-25')).toBe(53)
    expect(adapter2.getWeek('2022-12-31')).toBe(53)
    expect(adapter2.getWeek('2023-01-01')).toBe(1)
    expect(adapter2.getWeek('2023-01-07')).toBe(1)
  })

  it('should adjust for start of a week', () => {
    const adapter = new StringDateAdapter({ locale: 'en-US' }) // first day = 7 | minimal days = 1

    expect(adapter.getWeek('2028-12-25', 1)).toBe(53)
    expect(adapter.getWeek('2028-12-31', 1)).toBe(53)
    expect(adapter.getWeek('2029-01-01', 1)).toBe(1)
    expect(adapter.getWeek('2029-01-07', 1)).toBe(1)

    const adapter2 = new StringDateAdapter({ locale: 'pt-PT' }) // first day = 7 | minimal days = 4

    expect(adapter2.getWeek('2024-12-28', 1)).toBe(52)
    expect(adapter2.getWeek('2024-12-29', 1)).toBe(52)
    expect(adapter2.getWeek('2024-12-30', 1)).toBe(1)
    expect(adapter2.getWeek('2024-12-31', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-01', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-02', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-03', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-04', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-05', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-06', 1)).toBe(2)
    expect(adapter2.getWeek('2025-01-07', 1)).toBe(2)

    expect(adapter2.getWeek('2028-12-25', 1)).toBe(53)
    expect(adapter2.getWeek('2028-12-31', 1)).toBe(53)
    expect(adapter2.getWeek('2029-01-01', 1)).toBe(1)
    expect(adapter2.getWeek('2029-01-07', 1)).toBe(1)

    const adapter3 = new StringDateAdapter({ locale: 'pl-PL' })
    expect(adapter3.getWeek('2024-12-29', 1)).toBe(52)
  })

  it('should use consistent week start across locales', () => {
    // v0 uses Sunday (0) as default firstDayOfWeek regardless of locale
    const adapter1 = new StringDateAdapter({ locale: 'en-US' })
    expect(adapter1.getWeek('2025-01-04')).toBe(1) // saturday
    expect(adapter1.getWeek('2025-01-05')).toBe(2) // sunday

    const adapter2 = new StringDateAdapter({ locale: 'fr' })
    expect(adapter2.getWeek('2025-01-05')).toBe(2) // sunday — same as en-US
    expect(adapter2.getWeek('2025-01-06')).toBe(2) // monday
  })
})
