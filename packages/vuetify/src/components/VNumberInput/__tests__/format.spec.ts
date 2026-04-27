import { formatNumber, parseNumber } from '../format'

interface FormatNumberOptions {
  locale: string
  precision?: number | null
  minFractionDigits?: number | null
  useGrouping: Intl.NumberFormatOptions['useGrouping']
  decimalSeparator: string
  groupSeparator: string
}

const defaults: FormatNumberOptions = {
  locale: 'en-US',
  useGrouping: true,
  decimalSeparator: '.',
  groupSeparator: ',',
}

function opts (overrides: Partial<FormatNumberOptions> = {}): FormatNumberOptions {
  return { ...defaults, ...overrides }
}

describe('format', () => {
  describe('formatNumber', () => {
    it('formats integer with grouping', () => {
      expect(formatNumber(1234567, opts())).toBe('1,234,567')
    })

    it('formats integer without grouping', () => {
      expect(formatNumber(1234567, opts({ useGrouping: false }))).toBe('1234567')
    })

    it('respects precision', () => {
      expect(formatNumber(1.23456, opts({ precision: 2 }))).toBe('1.23')
    })

    it('respects minFractionDigits', () => {
      expect(formatNumber(1.2, opts({ minFractionDigits: 3 }))).toBe('1.200')
    })

    it('caps minFractionDigits to precision', () => {
      expect(formatNumber(1.2, opts({ minFractionDigits: 5, precision: 2 }))).toBe('1.20')
    })

    it('swaps separators by part type without collisions (de-DE → custom)', () => {
      // de-DE uses "." for groups and "," for decimal — swapping by string would collide
      const o = opts({
        locale: 'de-DE',
        decimalSeparator: '.',
        groupSeparator: ',',
      })
      expect(formatNumber(1234567.89, { ...o, precision: 2 })).toBe('1,234,567.89')
    })

    it('uses custom separators distinct from locale defaults', () => {
      const o = opts({
        locale: 'de-DE',
        decimalSeparator: '·',
        groupSeparator: ' ',
      })
      expect(formatNumber(1234.5, { ...o, precision: 1 })).toBe('1 234·5')
    })

    it('normalizes Arabic-Indic digits from locale formatter', () => {
      const result = formatNumber(1234, opts({ locale: 'ar-SA' }))
      expect(result).toBe('1,234')
    })

    it('handles negative numbers', () => {
      expect(formatNumber(-1234.5, opts({ precision: 1 }))).toBe('-1,234.5')
    })

    it('handles zero', () => {
      expect(formatNumber(0, opts())).toBe('0')
    })
  })

  describe('parseNumber', () => {
    it('parses plain integer', () => {
      expect(parseNumber('1234', ',', '.', false)).toBe(1234)
    })

    it('parses grouped integer', () => {
      expect(parseNumber('1,234,567', ',', '.', true)).toBe(1234567)
    })

    it('parses decimal', () => {
      expect(parseNumber('1234.56', ',', '.', false)).toBe(1234.56)
    })

    it('parses grouped decimal', () => {
      expect(parseNumber('1,234.56', ',', '.', true)).toBe(1234.56)
    })

    it('parses negative number', () => {
      expect(parseNumber('-1,234.56', ',', '.', true)).toBe(-1234.56)
    })

    it('parses with custom separators', () => {
      expect(parseNumber('1 234,56', ' ', ',', true)).toBe(1234.56)
    })

    it('does not strip group separator when hasGrouping is false', () => {
      expect(parseNumber('1,234', ',', '.', false)).toBeNaN()
    })

    it('returns NaN for null', () => {
      expect(parseNumber(null, ',', '.', true)).toBeNaN()
    })

    it('returns NaN for undefined', () => {
      expect(parseNumber(undefined, ',', '.', true)).toBeNaN()
    })

    it('parses empty string as 0', () => {
      expect(parseNumber('', ',', '.', true)).toBe(0)
    })
  })
})
