// Composables
import { dateFromLocalizedValue, getWeek } from '../date'

// Utilities
import { describe, expect, it } from '@jest/globals'
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

  describe('dateFromLocalizedValue', () => {
    it.each([
      ['en-US'],
      ['pl'],
      ['sv'],
    ])('should return null when invalid value or unsupported formatString provided', locale => {
      const adapter = new VuetifyDateAdapter({ locale })

      expect(dateFromLocalizedValue(adapter, null, 'keyboardDate')).toBeNull()
      expect(dateFromLocalizedValue(adapter, undefined, 'keyboardDate')).toBeNull()
      expect(dateFromLocalizedValue(adapter, '', 'keyboardDate')).toBeNull()
      expect(dateFromLocalizedValue(adapter, ' ', 'keyboardDate')).toBeNull()
      expect(dateFromLocalizedValue(adapter, '2024-06-01', 'invalid-format')).toBeNull()
      expect(dateFromLocalizedValue(adapter, '2024-06-01', 'fullDate')).toBeNull()
    })

    it.each([
      ['06/01/2024', new Date(2024, 5, 1)],
      ['06/1/2024', new Date(2024, 5, 1)],
      ['6/01/2024', new Date(2024, 5, 1)],
      ['6/1/2024', new Date(2024, 5, 1)],
      ['12/31/2024', new Date(2024, 11, 31)],
      ['01/01/2024', new Date(2024, 0, 1)],
    ])('parse value "%s" into Date when providing valid keyboardDate formatted date string in "en-US" format', (value, expected) => {
      const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

      const result = dateFromLocalizedValue(adapter, value, 'keyboardDate')
      expect(result).not.toBeNull()
      expect(result!.getDate()).toBe(expected.getDate())
      expect(result!.getMonth()).toBe(expected.getMonth())
      expect(result!.getFullYear()).toBe(expected.getFullYear())
    })

    it.each([
      ['06/ab/2024'],
      ['ab/01/2024'],
      ['06/01/abcd'],
      ['06,01,2024'],
      ['06-01-2024'],
      ['01.06.2024'],
      ['/06/2024'],
      ['06/2024'],
      ['01/06/'],
      ['01/06'],
      ['01//2024'],
      ['2024-06-01'],
    ])('return null when providing "%s" value and keyboardDate formatted date string in "en-US" format is expected', value => {
      const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

      const result = dateFromLocalizedValue(adapter, value, 'keyboardDate')
      expect(result).toBeNull()
    })

    it.each([
      ['01.06.2024', new Date(2024, 5, 1)],
      ['1.06.2024', new Date(2024, 5, 1)],
      ['01.6.2024', new Date(2024, 5, 1)],
      ['1.6.2024', new Date(2024, 5, 1)],
      ['31.12.2024', new Date(2024, 11, 31)],
      ['01.01.2024', new Date(2024, 0, 1)],
    ])('parse value "%s" into Date when providing valid keyboardDate formatted date string in "pl" format', (value, expected) => {
      const adapter = new VuetifyDateAdapter({ locale: 'pl' })

      const result = dateFromLocalizedValue(adapter, value, 'keyboardDate')
      expect(result).not.toBeNull()
      expect(result!.getDate()).toBe(expected.getDate())
      expect(result!.getMonth()).toBe(expected.getMonth())
      expect(result!.getFullYear()).toBe(expected.getFullYear())
    })

    it.each([
      ['ab.06.2024'],
      ['01.ab.2024'],
      ['01.06.abcd'],
      ['01,06,2024'],
      ['01-06-2024'],
      ['.06.2024'],
      ['06.2024'],
      ['01.06.'],
      ['01.06'],
      ['01..2024'],
      ['06/01/2024'],
      ['2024-06-01'],
    ])('return null when providing "%s" value and keyboardDate formatted date string in "pl" format is expected', value => {
      const adapter = new VuetifyDateAdapter({ locale: 'pl' })

      const result = dateFromLocalizedValue(adapter, value, 'keyboardDate')
      expect(result).toBeNull()
    })

    it.each([
      ['2024-06-01', new Date(2024, 5, 1)],
      ['2024-06-1', new Date(2024, 5, 1)],
      ['2024-6-01', new Date(2024, 5, 1)],
      ['2024-6-1', new Date(2024, 5, 1)],
      ['2024-12-31', new Date(2024, 11, 31)],
      ['2024-01-01', new Date(2024, 0, 1)],
    ])('parse value "%s" into Date when providing valid keyboardDate formatted date string in "sv" format', (value, expected) => {
      const adapter = new VuetifyDateAdapter({ locale: 'sv' })

      const result = dateFromLocalizedValue(adapter, value, 'keyboardDate')
      expect(result).not.toBeNull()
      expect(result!.getDate()).toBe(expected.getDate())
      expect(result!.getMonth()).toBe(expected.getMonth())
      expect(result!.getFullYear()).toBe(expected.getFullYear())
    })

    it.each([
      ['ab-06-2024'],
      ['01-ab-2024'],
      ['01-06-abcd'],
      ['01,06,2024'],
      ['01/06/2024'],
      ['-06-2024'],
      ['06-2024'],
      ['01-06-'],
      ['01-06'],
      ['01--2024'],
      ['06.01.2024'],
    ])('return null when providing "%s" value and keyboardDate formatted date string in "sv" format is expected', value => {
      const adapter = new VuetifyDateAdapter({ locale: 'sv' })

      const result = dateFromLocalizedValue(adapter, value, 'keyboardDate')
      expect(result).toBeNull()
    })
  })
})
