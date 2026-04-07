// Utilities
import { Vuetify0DateAdapter } from '@vuetify/v0/date'
import { StringDateAdapter } from '../adapters/string'
import { VuetifyDateBridge } from '../bridge'
import { createDateRange } from '../date'

// Types
import type { Temporal } from '@js-temporal/polyfill'

type PlainDateTime = Temporal.PlainDateTime

function createAdapter (locale: string): VuetifyDateBridge<PlainDateTime> {
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

    const adapter2 = createAdapter('pt') // first day = 7 | minimal days = 4

    expect(adapter2.getWeek(adapter2.parseISO('2022-12-25'))).toBe(52)
    expect(adapter2.getWeek(adapter2.parseISO('2022-12-31'))).toBe(52)
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

    expect(adapter2.getWeek(adapter2.parseISO('2028-12-25'), 1)).toBe(52)
    expect(adapter2.getWeek(adapter2.parseISO('2028-12-31'), 1)).toBe(52)
    expect(adapter2.getWeek(adapter2.parseISO('2029-01-01'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2029-01-07'), 1)).toBe(1)

    const adapter3 = createAdapter('pl-PL')
    expect(adapter3.getWeek(adapter3.parseISO('2024-12-29'), 1)).toBe(52)
  })

  it('should adjust fallback to week start from locale', () => {
    const adapter1 = createAdapter('en-US')
    expect(adapter1.getWeek(adapter1.parseISO('2025-01-04'))).toBe(1) // saturday
    expect(adapter1.getWeek(adapter1.parseISO('2025-01-05'))).toBe(2) // sunday

    const adapter2 = createAdapter('fr')
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-05'))).toBe(1) // sunday
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-06'))).toBe(2) // monday
  })

  describe('createDateRange', () => {
    const adapter = createAdapter('en-US')

    function range (...args: Parameters<typeof createDateRange>): PlainDateTime[] {
      return createDateRange(...args) as PlainDateTime[]
    }

    it('should create a single date array when only start date is provided', () => {
      const start = adapter.parseISO('2024-01-01')
      const result = range(adapter, start)

      expect(result).toHaveLength(1)
      expect(adapter.toISO(result[0])).toBe('2024-01-01')
    })

    it('should handle same start and stop date', () => {
      const date = adapter.parseISO('2024-01-01')
      const result = range(adapter, date, date)

      expect(adapter.toISO(result[0])).toBe('2024-01-01')
      expect(adapter.isSameDay(result[1], adapter.endOfDay(date))).toBe(true)
    })

    it('should create a range of dates between start and stop', () => {
      const start = adapter.parseISO('2024-01-01')
      const stop = adapter.parseISO('2024-01-03')
      const result = range(adapter, start, stop)

      expect(result).toHaveLength(3)
      expect(adapter.toISO(result[0])).toBe('2024-01-01')
      expect(adapter.toISO(result[1])).toBe('2024-01-02')
      expect(adapter.isSameDay(result[2], adapter.endOfDay(stop))).toBe(true)
    })

    it('should handle dates in different months', () => {
      const start = adapter.parseISO('2024-01-30')
      const stop = adapter.parseISO('2024-02-02')
      const result = range(adapter, start, stop)

      expect(result).toHaveLength(4)
      expect(adapter.toISO(result[0])).toBe('2024-01-30')
      expect(adapter.toISO(result[1])).toBe('2024-01-31')
      expect(adapter.toISO(result[2])).toBe('2024-02-01')
      expect(adapter.isSameDay(result[3], adapter.endOfDay(stop))).toBe(true)
    })

    it('should handle dates in different years', () => {
      const start = adapter.parseISO('2024-12-30')
      const stop = adapter.parseISO('2025-01-02')
      const result = range(adapter, start, stop)

      expect(result).toHaveLength(4)
      expect(adapter.toISO(result[0])).toBe('2024-12-30')
      expect(adapter.toISO(result[1])).toBe('2024-12-31')
      expect(adapter.toISO(result[2])).toBe('2025-01-01')
      expect(adapter.isSameDay(result[3], adapter.endOfDay(stop))).toBe(true)
    })
  })

  describe('week numbers with first-day-of-week', () => {
    it('should calculate weeks correctly when adapting for UK', () => {
      const adapterUS = createAdapter('en-US')
      const adapterGB = createAdapter('en-GB')
      expect(adapterUS.getWeek(adapterUS.parseISO('2025-03-16'))).toBe(12)
      expect(adapterGB.getWeek(adapterGB.parseISO('2025-03-16'))).toBe(11)
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

    const adapter2 = new StringDateAdapter({ locale: 'pt' }) // first day = 7 | minimal days = 4

    expect(adapter2.getWeek('2022-12-25')).toBe(52)
    expect(adapter2.getWeek('2022-12-31')).toBe(52)
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

    expect(adapter2.getWeek('2028-12-25', 1)).toBe(52)
    expect(adapter2.getWeek('2028-12-31', 1)).toBe(52)
    expect(adapter2.getWeek('2029-01-01', 1)).toBe(1)
    expect(adapter2.getWeek('2029-01-07', 1)).toBe(1)

    const adapter3 = new StringDateAdapter({ locale: 'pl-PL' })
    expect(adapter3.getWeek('2024-12-29', 1)).toBe(52)
  })

  it('should adjust fallback to week start from locale', () => {
    const adapter1 = new StringDateAdapter({ locale: 'en-US' })
    expect(adapter1.getWeek('2025-01-04')).toBe(1) // saturday
    expect(adapter1.getWeek('2025-01-05')).toBe(2) // sunday

    const adapter2 = new StringDateAdapter({ locale: 'fr' })
    expect(adapter2.getWeek('2025-01-05')).toBe(1) // sunday
    expect(adapter2.getWeek('2025-01-06')).toBe(2) // monday
  })
})
