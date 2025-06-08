// Composables
import { createDate } from '../date'
import { createLocale } from '@/composables/locale'

// Utilities
import { StringDateAdapter } from '../adapters/string'
import { VuetifyDateAdapter } from '../adapters/vuetify'

// Types
import type { IUtils } from '@date-io/core/IUtils'
import type { DateAdapter } from '../DateAdapter'

function expectAssignable<T, T2 extends T = T> (value: T2): void {}

describe('date', () => {
  it('types', () => {
    // Cannot define properties that don't exist in date-io
    expectAssignable<DateAdapter>({} as IUtils<Date, string>)
    // @ts-expect-error Can implement a subset of date-io
    expectAssignable<IUtils<Date>>({} as DateAdapter)
  })
})

describe('VuetifyDateAdapter', () => {
  it('should have the correct days in a month', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(adapter.getWeek(new Date('2023-10-10'))).toBe(41)
  })

  it('should correctly calculate weeks between years', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(adapter.getWeek(new Date('2024-12-28'))).toBe(52)
    expect(adapter.getWeek(new Date('2024-12-29'))).toBe(1)
    expect(adapter.getWeek(new Date('2024-12-30'))).toBe(1)
    expect(adapter.getWeek(new Date('2024-12-31'))).toBe(1)
    expect(adapter.getWeek(new Date('2025-01-01'))).toBe(1)
    expect(adapter.getWeek(new Date('2025-01-02'))).toBe(1)
    expect(adapter.getWeek(new Date('2025-01-03'))).toBe(1)
    expect(adapter.getWeek(new Date('2025-01-04'))).toBe(1)
    expect(adapter.getWeek(new Date('2025-01-05'))).toBe(2)
  })

  it('should correctly calculate when year starts with a full week', () => {
    const adapter1 = new VuetifyDateAdapter({ locale: 'en-US' }) // first day = 7 | minimal days = 1

    expect(adapter1.getWeek(new Date('2022-12-25'))).toBe(53)
    expect(adapter1.getWeek(new Date('2022-12-31'))).toBe(53)
    expect(adapter1.getWeek(new Date('2023-01-01'))).toBe(1)
    expect(adapter1.getWeek(new Date('2023-01-07'))).toBe(1)

    const adapter2 = new VuetifyDateAdapter({ locale: 'pt' }) // first day = 7 | minimal days = 4

    expect(adapter2.getWeek(new Date('2022-12-25'))).toBe(52)
    expect(adapter2.getWeek(new Date('2022-12-31'))).toBe(52)
    expect(adapter2.getWeek(new Date('2023-01-01'))).toBe(1)
    expect(adapter2.getWeek(new Date('2023-01-07'))).toBe(1)
  })

  it('should adjust for start of a week', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' }) // first day = 7 | minimal days = 1

    expect(adapter.getWeek(new Date('2028-12-25'), 1)).toBe(53)
    expect(adapter.getWeek(new Date('2028-12-31'), 1)).toBe(53)
    expect(adapter.getWeek(new Date('2029-01-01'), 1)).toBe(1)
    expect(adapter.getWeek(new Date('2029-01-07'), 1)).toBe(1)

    const adapter2 = new VuetifyDateAdapter({ locale: 'pt-PT' }) // first day = 7 | minimal days = 4

    expect(adapter2.getWeek(new Date('2024-12-28'), 1)).toBe(52)
    expect(adapter2.getWeek(new Date('2024-12-29'), 1)).toBe(52)
    expect(adapter2.getWeek(new Date('2024-12-30'), 1)).toBe(1)
    expect(adapter2.getWeek(new Date('2024-12-31'), 1)).toBe(1)
    expect(adapter2.getWeek(new Date('2025-01-01'), 1)).toBe(1)
    expect(adapter2.getWeek(new Date('2025-01-02'), 1)).toBe(1)
    expect(adapter2.getWeek(new Date('2025-01-03'), 1)).toBe(1)
    expect(adapter2.getWeek(new Date('2025-01-04'), 1)).toBe(1)
    expect(adapter2.getWeek(new Date('2025-01-05'), 1)).toBe(1)
    expect(adapter2.getWeek(new Date('2025-01-06'), 1)).toBe(2)
    expect(adapter2.getWeek(new Date('2025-01-07'), 1)).toBe(2)

    expect(adapter2.getWeek(new Date('2028-12-25'), 1)).toBe(52)
    expect(adapter2.getWeek(new Date('2028-12-31'), 1)).toBe(52)
    expect(adapter2.getWeek(new Date('2029-01-01'), 1)).toBe(1)
    expect(adapter2.getWeek(new Date('2029-01-07'), 1)).toBe(1)

    const adapter3 = new VuetifyDateAdapter({ locale: 'pl-PL' })
    expect(adapter3.getWeek(new Date('2024-12-29'), 1)).toBe(52)
  })

  it('should adjust fallback to week start from locale', () => {
    const adapter1 = new VuetifyDateAdapter({ locale: 'en-US' })
    expect(adapter1.getWeek(new Date('2025-01-04'))).toBe(1) // saturday
    expect(adapter1.getWeek(new Date('2025-01-05'))).toBe(2) // sunday

    const adapter2 = new VuetifyDateAdapter({ locale: 'fr' })
    expect(adapter2.getWeek(new Date('2025-01-05'))).toBe(1) // sunday
    expect(adapter2.getWeek(new Date('2025-01-06'))).toBe(2) // monday
  })

  describe('createDateRange', () => {
    const { instance: vuetifyDate } = createDate(undefined, createLocale())

    it('should create a single date array when only start date is provided', () => {
      const start = new Date('2024-01-01')
      const result = vuetifyDate.createDateRange(start)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(start)
    })

    it('should handle same start and stop date', () => {
      const date = new Date('2024-01-01')
      const result = vuetifyDate.createDateRange(date, date)

      expect(result[0]).toEqual(date)
      expect(result[1]).toEqual(vuetifyDate.endOfDay(date))
    })

    it('should create a range of dates between start and stop', () => {
      const start = new Date('2024-01-01')
      const stop = new Date('2024-01-03')
      const result = vuetifyDate.createDateRange(start, stop)

      expect(result).toHaveLength(3)
      expect(result[0]).toEqual(start)
      expect(result[1]).toEqual(new Date('2024-01-02'))
      expect(result[2]).toEqual(vuetifyDate.endOfDay(stop))
    })

    it('should handle dates in different months', () => {
      const start = new Date('2024-01-30')
      const stop = new Date('2024-02-02')
      const result = vuetifyDate.createDateRange(start, stop)

      expect(result).toHaveLength(4)
      expect(result[0]).toEqual(start)
      expect(result[1]).toEqual(new Date('2024-01-31'))
      expect(result[2]).toEqual(new Date('2024-02-01'))
      expect(result[3]).toEqual(vuetifyDate.endOfDay(stop))
    })

    it('should handle dates in different years', () => {
      const start = new Date('2024-12-30')
      const stop = new Date('2025-01-02')
      const result = vuetifyDate.createDateRange(start, stop)

      expect(result).toHaveLength(4)
      expect(result[0]).toEqual(start)
      expect(result[1]).toEqual(new Date('2024-12-31'))
      expect(result[2]).toEqual(new Date('2025-01-01'))
      expect(result[3]).toEqual(vuetifyDate.endOfDay(stop))
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
