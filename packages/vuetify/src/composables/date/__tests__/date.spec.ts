// Composables
import { getDateFromStringDate, getWeek } from '../date'

// Utilities
import { VuetifyDateAdapter } from '../adapters/vuetify'

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

    expect(getWeek(adapter, adapter.date('2023-10-10'))).toBe(41)
  })

  describe('getDateFromStringDate', () => {
    it('should parse date with YYYY-MM-DD format', () => {
      const date = getDateFromStringDate('2025-12-21', 'YYYY-MM-DD')
      expect(date).toBeInstanceOf(Date)
      expect(date?.getFullYear()).toBe(2025)
      expect(date?.getMonth()).toBe(11) // December is 11 (0-based)
      expect(date?.getDate()).toBe(21)
    })

    it('should parse date with DD/MM/YYYY format', () => {
      const date = getDateFromStringDate('21/12/2025', 'DD/MM/YYYY')
      expect(date).toBeInstanceOf(Date)
      expect(date?.getFullYear()).toBe(2025)
      expect(date?.getMonth()).toBe(11)
      expect(date?.getDate()).toBe(21)
    })

    it('should parse date with MM.DD.YYYY format', () => {
      const date = getDateFromStringDate('12.21.2025', 'MM.DD.YYYY')
      expect(date).toBeInstanceOf(Date)
      expect(date?.getFullYear()).toBe(2025)
      expect(date?.getMonth()).toBe(11)
      expect(date?.getDate()).toBe(21)
    })

    it('should return null for invalid date string', () => {
      expect(getDateFromStringDate('2025-13-21', 'YYYY-MM-DD')).toBeNull() // Invalid month
      expect(getDateFromStringDate('2025-12-32', 'YYYY-MM-DD')).toBeNull() // Invalid day
      expect(getDateFromStringDate('2025-12-21', 'YYYY-MM-DD')).not.toBeNull() // Valid date
    })

    it('should return null for malformed date string', () => {
      expect(getDateFromStringDate('2025-12', 'YYYY-MM-DD')).toBeNull() // Missing day
      expect(getDateFromStringDate('12-21', 'YYYY-MM-DD')).toBeNull() // Missing year
      expect(getDateFromStringDate('2025-12-21', 'YYYY-MM')).toBeNull() // Format doesn't match
    })

    it('should handle different separators in the same format', () => {
      const formats = ['YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD']
      const dateStrings = ['2025-12-21', '2025/12/21', '2025.12.21']

      formats.forEach((format, index) => {
        const date = getDateFromStringDate(dateStrings[index], format)
        expect(date).toBeInstanceOf(Date)
        expect(date?.getFullYear()).toBe(2025)
        expect(date?.getMonth()).toBe(11)
        expect(date?.getDate()).toBe(21)
      })
    })
  })
})
