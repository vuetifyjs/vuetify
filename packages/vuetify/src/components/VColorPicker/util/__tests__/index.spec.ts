import { extractColor, parseColor } from '../'

import type { HSVA } from '@/util'

const red = { h: 0, s: 1, v: 1, a: 1 }

describe('VColorPicker Utils', () => {
  describe('Parse color', () => {
    it('should return null if nothing is passed', () => {
      expect(parseColor(undefined)).toBeNull()
      expect(parseColor(null)).toBeNull()
    })

    it('should parse hex string', () => {
      expect(parseColor('#FF00FF')).toEqual(expect.objectContaining({
        h: expect.any(Number),
        s: expect.any(Number),
        v: expect.any(Number),
        a: 1,
      }))
      expect(parseColor('FF00FF00')).toEqual(expect.objectContaining({
        h: expect.any(Number),
        s: expect.any(Number),
        v: expect.any(Number),
        a: 0,
      }))
    })

    it('should parse rgb object', () => {
      const rgb = { r: 128, g: 128, b: 0 }
      expect(parseColor(rgb)).toEqual(expect.objectContaining({
        h: expect.any(Number),
        s: expect.any(Number),
        v: expect.any(Number),
        a: 1,
      }))

      const rgba = { r: 128, g: 0, b: 255, a: 0.2 }
      expect(parseColor(rgba)).toEqual(expect.objectContaining({
        h: expect.any(Number),
        s: expect.any(Number),
        v: expect.any(Number),
        a: 0.2,
      }))
    })

    it('should parse hsl object', () => {
      const hsl = { h: 220, s: 0.5, l: 1 }
      expect(parseColor(hsl)).toEqual(expect.objectContaining({
        h: expect.any(Number),
        s: expect.any(Number),
        v: expect.any(Number),
        a: 1,
      }))

      const hsla = { h: 220, s: 0.5, l: 1, a: 0.4 }
      expect(parseColor(hsla)).toEqual(expect.objectContaining({
        h: expect.any(Number),
        s: expect.any(Number),
        v: expect.any(Number),
        a: 0.4,
      }))
    })

    it('should parse hsv object', () => {
      const hsv = { h: 220, s: 0.5, v: 1 }
      expect(parseColor(hsv)).toEqual(expect.objectContaining({
        h: expect.any(Number),
        s: expect.any(Number),
        v: expect.any(Number),
        a: 1,
      }))

      const hsva = { h: 220, s: 0.5, v: 1, a: 0.4 }
      expect(parseColor(hsva)).toEqual(expect.objectContaining({
        h: expect.any(Number),
        s: expect.any(Number),
        v: expect.any(Number),
        a: 0.4,
      }))
    })
  })

  describe('Extract color', () => {
    const cases = [
      [red, null, '#FF0000'],
      [red, '#FF0000', '#FF0000'],
      [red, '#FF0000FF', '#FF0000'],
      [{ ...red, a: 0.5 }, '#FF000000', '#FF000080'],
      [red, { r: 255, g: 0, b: 0 }, { r: 255, g: 0, b: 0 }],
      [red, { r: 255, g: 0, b: 0, a: 0 }, { r: 255, g: 0, b: 0, a: 1 }],
      [red, { h: 0, s: 1, l: 0.5 }, { h: 0, s: 1, l: 0.5 }],
      [red, { h: 0, s: 1, l: 0.5, a: 1 }, { h: 0, s: 1, l: 0.5, a: 1 }],
      [red, { h: 0, s: 1, v: 1 }, { h: 0, s: 1, v: 1 }],
      [red, { h: 0, s: 1, v: 1, a: 0.5 }, { h: 0, s: 1, v: 1, a: 1 }],
      [red, undefined, '#FF0000'],
    ]

    it.each(cases)('When given %p and %p, extractColor util should return %p',
      (color: HSVA, input: any, result: any) => {
        expect(extractColor(color, input)).toEqual(result)
      })
  })
})
