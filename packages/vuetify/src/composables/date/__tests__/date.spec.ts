// Utilities
import { VuetifyDateAdapter } from '../adapters/vuetify'
import { parseDateString } from '../date'

// Types
import type { IUtils } from '@date-io/core/IUtils'
import type { DateAdapter } from '../DateAdapter'

function expectAssignable<T, T2 extends T = T> (value: T2): void {}

describe('date.ts', () => {
  // Cannot define properties that don't exist in date-io
  expectAssignable<DateAdapter>({} as IUtils<Date, string>)
  // @ts-expect-error Can implement a subset of date-io
  expectAssignable<IUtils<Date>>({} as DateAdapter)

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

  describe('parseDateString', () => {
    it('should parse date with YYYY-MM-DD format', () => {
      const date = parseDateString('2025-12-21', 'YYYY-MM-DD')
      expect(date).not.toBeNull()
      expect(date?.year).toBe(2025)
      expect(date?.month).toBe(12)
      expect(date?.day).toBe(21)
    })

    it('should parse date with DD/MM/YYYY format', () => {
      const date = parseDateString('21/12/2025', 'DD/MM/YYYY')
      expect(date).not.toBeNull()
      expect(date?.year).toBe(2025)
      expect(date?.month).toBe(12)
      expect(date?.day).toBe(21)
    })

    it('should parse date with MM.DD.YYYY format', () => {
      const date = parseDateString('12.21.2025', 'MM.DD.YYYY')
      expect(date).not.toBeNull()
      expect(date?.year).toBe(2025)
      expect(date?.month).toBe(12)
      expect(date?.day).toBe(21)
    })

    it('should return null for invalid date string', () => {
      expect(parseDateString('2025-13-21', 'YYYY-MM-DD')).toBeNull() // Invalid month
      expect(parseDateString('2025-12-32', 'YYYY-MM-DD')).toBeNull() // Invalid day
      expect(parseDateString('2025-12-21', 'YYYY-MM-DD')).not.toBeNull() // Valid date
    })

    it('should return null for malformed date string', () => {
      expect(parseDateString('2025-12', 'YYYY-MM-DD')).toBeNull() // Missing day
      expect(parseDateString('12-21', 'YYYY-MM-DD')).toBeNull() // Missing year
      expect(parseDateString('2025-12-21', 'YYYY-MM')).toBeNull() // Format doesn't match
    })

    it('should handle different separators in the same format', () => {
      const formats = ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD']
      const dateStrings = ['2025-12-21', '2025/12/21', '2025.12.21']

      formats.forEach((format, index) => {
        const date = parseDateString(dateStrings[index], format)
        expect(date).not.toBeNull()
        expect(date?.year).toBe(2025)
        expect(date?.month).toBe(12)
        expect(date?.day).toBe(21)
      })
    })
  })
})
