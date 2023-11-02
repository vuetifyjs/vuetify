// Utilities
import { describe, expect, it } from '@jest/globals'
import { extractColor } from '../'

const red = { h: 0, s: 1, v: 1, a: 1 }

describe('VColorPicker Utils', () => {
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
    ] as const

    it.each(cases)('When given %p and %p, extractColor util should return %p', (...args) => {
      const [color, input, result] = args
      expect(extractColor(color, input)).toEqual(result)
    })
  })
})
