// Utilities
import { describe, expect, it } from '@jest/globals'
import { APCAcontrast } from '../color/APCA'
import * as transformCIELAB from '../color/transformCIELAB'
import * as transformSRGB from '../color/transformSRGB'
import {
  classToHex,
  getContrast,
  getLuma,
  isCssColor,
  parseColor,
  parseGradient,
} from '../colorUtils'

const colors = {
  red: {
    base: '#ff0000',
    lighten1: '#ff6666',
  },
}
const currentTheme = { primary: '#1976d2' }

describe('isCssColor', () => {
  it('should return true if css color is passed', () => {
    expect(isCssColor('#ff0000')).toBeTruthy()
    expect(isCssColor('#fff')).toBeTruthy()
    expect(isCssColor('rgb(255, 255, 255)')).toBeTruthy()
    expect(isCssColor('rgba(255, 0, 0, 0.8)')).toBeTruthy()
    expect(isCssColor('var(--my-color)')).toBeTruthy()
  })

  it('should return false if non-css color is passed', () => {
    expect(isCssColor('red')).toBeFalsy()
    expect(isCssColor('primary')).toBeFalsy()
  })
})

describe('parseColor', () => {
  it('should convert a hex string to a number', () => {
    expect(parseColor('#123456')).toEqual({ r: 0x12, g: 0x34, b: 0x56, a: undefined })
    expect(parseColor('#abc')).toEqual({ r: 0xaa, g: 0xbb, b: 0xcc, a: undefined })
    expect(parseColor('876543')).toEqual({ r: 0x87, g: 0x65, b: 0x43, a: undefined })
    expect(parseColor('669')).toEqual({ r: 0x66, g: 0x66, b: 0x99, a: undefined })
    expect(parseColor('fff')).toEqual({ r: 0xff, g: 0xff, b: 0xff, a: undefined })
  })

  it('should parse a CSS color string', () => {
    expect(parseColor('rgb(255, 0, 0)')).toEqual({ r: 255, g: 0, b: 0, a: undefined })
    expect(parseColor('rgba(255, 0, 0, 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
    expect(parseColor('hsl(100, 50%, 25%)')).toEqual({ r: 53, g: 96, b: 32, a: undefined })
    expect(parseColor('hsla(100, 50%, 25%, 0.5)')).toEqual({ r: 53, g: 96, b: 32, a: 0.5 })
  })

  it('should parse rgb object', () => {
    const rgb = { r: 128, g: 128, b: 0 }
    expect(parseColor(rgb)).toEqual(expect.objectContaining({
      r: expect.any(Number),
      g: expect.any(Number),
      b: expect.any(Number),
    }))

    const rgba = { r: 128, g: 0, b: 255, a: 0.2 }
    expect(parseColor(rgba)).toEqual(expect.objectContaining({
      r: expect.any(Number),
      g: expect.any(Number),
      b: expect.any(Number),
      a: 0.2,
    }))
  })

  it('should parse hsl object', () => {
    const hsl = { h: 220, s: 0.5, l: 1 }
    expect(parseColor(hsl)).toEqual(expect.objectContaining({
      r: expect.any(Number),
      g: expect.any(Number),
      b: expect.any(Number),
    }))

    const hsla = { h: 220, s: 0.5, l: 1, a: 0.4 }
    expect(parseColor(hsla)).toEqual(expect.objectContaining({
      r: expect.any(Number),
      g: expect.any(Number),
      b: expect.any(Number),
      a: 0.4,
    }))
  })

  it('should parse hsv object', () => {
    const hsv = { h: 220, s: 0.5, v: 1 }
    expect(parseColor(hsv)).toEqual(expect.objectContaining({
      r: expect.any(Number),
      g: expect.any(Number),
      b: expect.any(Number),
    }))

    const hsva = { h: 220, s: 0.5, v: 1, a: 0.4 }
    expect(parseColor(hsva)).toEqual(expect.objectContaining({
      r: expect.any(Number),
      g: expect.any(Number),
      b: expect.any(Number),
      a: 0.4,
    }))
  })

  it('should reject invalid formats', async () => {
    // @ts-expect-error
    expect(() => parseColor([]))
      .toThrow('Invalid color: Array\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number')
    // @ts-expect-error
    expect(() => parseColor(() => {}))
      .toThrow('Invalid color: () => {}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number')

    parseColor(-1)
    parseColor('#1000000')
    parseColor('#13')
    parseColor('#6')
    parseColor('red')

    expect(`'-1' is not a valid hex color`).toHaveBeenTipped()
    expect(`'#1000000' is not a valid hex(a) color`).toHaveBeenTipped()
    expect(`'#13' is not a valid hex(a) color`).toHaveBeenTipped()
    expect(`'#6' is not a valid hex(a) color`).toHaveBeenTipped()
    expect(`'red' is not a valid hex(a) color`).toHaveBeenTipped()
  })
})

describe('classToHex', () => {
  it('should convert a color class string to a hex string', () => {
    expect(classToHex('red', colors, currentTheme)).toBe('#ff0000')
    expect(classToHex('red lighten-1', colors, currentTheme)).toBe('#ff6666')
    expect(classToHex('primary', colors, currentTheme)).toBe('#1976d2')
  })
})

describe('transformSRGB', () => {
  it('should convert sRGB to XYZ', () => {
    expect(transformSRGB.toXYZ({ r: 0, g: 0, b: 0 })).toEqual([0, 0, 0])
    expect(transformSRGB.toXYZ({ r: 0xff, g: 0xff, b: 0xff })).toEqual([0.9505, 1, 1.0890])
    expect(transformSRGB.toXYZ({ r: 0xfc, g: 0xfb, b: 0xf4 })).toEqual(closeTo([0.909712, 0.962215, 0.993659], 6))
    expect(transformSRGB.toXYZ({ r: 0x45, g: 0xa0, b: 0x81 })).toEqual(closeTo([0.189875, 0.279918, 0.251711], 6))
    expect(transformSRGB.toXYZ({ r: 0x19, g: 0x19, b: 0x95 })).toEqual(closeTo([0.061733, 0.030719, 0.287013], 6))
    expect(transformSRGB.toXYZ({ r: 0xcd, g: 0x66, b: 0x00 })).toEqual(closeTo([0.299282, 0.224819, 0.027620], 6))
  })

  it('should convert XYZ to sRGB', () => {
    expect(transformSRGB.fromXYZ([0, 0, 0])).toEqual({ r: 0, g: 0, b: 0, a: undefined })
    expect(transformSRGB.fromXYZ([0.9505, 1, 1.0890])).toEqual({ r: 0xff, g: 0xff, b: 0xff, a: undefined })
    expect(transformSRGB.fromXYZ([0.909712, 0.962215, 0.993659])).toEqual({ r: 0xfc, g: 0xfb, b: 0xf4, a: undefined })
    expect(transformSRGB.fromXYZ([0.189875, 0.279918, 0.251711])).toEqual({ r: 0x45, g: 0xa0, b: 0x81, a: undefined })
    expect(transformSRGB.fromXYZ([0.061733, 0.030719, 0.287013])).toEqual({ r: 0x19, g: 0x19, b: 0x95, a: undefined })
    expect(transformSRGB.fromXYZ([0.299282, 0.224819, 0.027620])).toEqual({ r: 0xcd, g: 0x66, b: 0x00, a: undefined })
  })
})

describe('transformCIELAB', () => {
  it('should convert LAB to XYZ', () => {
    expect(transformCIELAB.toXYZ([0, 0, 0])).toEqual([0, 0, 0])
    expect(transformCIELAB.toXYZ([100, 0.0053, -0.0104])).toEqual(closeTo([0.9505, 1, 1.0890], 4))
    expect(transformCIELAB.toXYZ([98.5202, -0.8731, 3.4542])).toEqual(closeTo([0.909713, 0.962215, 0.99366], 6))
    expect(transformCIELAB.toXYZ([59.8813, -34.7853, 8.0829])).toEqual(closeTo([0.189875, 0.279918, 0.251711], 6))
    expect(transformCIELAB.toXYZ([20.3296, 44.3917, -65.5991])).toEqual(closeTo([0.061733, 0.030719, 0.287014], 6))
    expect(transformCIELAB.toXYZ([54.5346, 36.1321, 62.8465])).toEqual(closeTo([0.299282, 0.224819, 0.027620], 6))
  })

  it('should convert XYZ to LAB', () => {
    expect(transformCIELAB.fromXYZ([0, 0, 0])).toEqual([0, 0, 0])
    expect(transformCIELAB.fromXYZ([0.9505, 1, 1.0890])).toEqual(closeTo([100, 0.0053, -0.0104], 4))
    expect(transformCIELAB.fromXYZ([0.909712, 0.962215, 0.993659])).toEqual(closeTo([98.5202, -0.8731, 3.4542], 4))
    expect(transformCIELAB.fromXYZ([0.189875, 0.279918, 0.251711])).toEqual(closeTo([59.8813, -34.7853, 8.0829], 4))
    expect(transformCIELAB.fromXYZ([0.061733, 0.030719, 0.287014])).toEqual(closeTo([20.3296, 44.3917, -65.5991], 4))
    expect(transformCIELAB.fromXYZ([0.299282, 0.224819, 0.027620])).toEqual(closeTo([54.5346, 36.1321, 62.8465], 4))
  })
})

describe('parseGradient', () => {
  it('should replace colors with their valid forms', () => {
    expect(
      parseGradient('to top, red lighten-1, rgba(#000, .8)', colors, currentTheme)
    ).toBe('to top, #ff6666, rgba(0,0,0, .8)')
    expect(
      parseGradient('to top, #fff, primary', colors, currentTheme)
    ).toBe('to top, #fff, #1976d2')
    expect(
      parseGradient('to top, var(--foo), rgba(#0000, .6)', colors, currentTheme)
    ).toBe('to top, var(--foo), rgba(0,0,0, .6)')
  })
})

describe('getContrast', () => {
  it.each([
    ['#000000', '#000000', 1],
    ['#FFFFFF', '#000000', 21],
    ['#FF0000', '#000000', 5.252],
    ['#EEEEEE', '#333333', 10.88977979803735],
    ['#111111', '#222222', 1.1868686010078233],
  ])('given %s and %s, should return contrast ratio value of %d', (first, second, ratio) => {
    expect(getContrast(first, second)).toEqual(ratio)
  })

  it.each([
    ['#FFFFFF', '#000000', 21],
    ['#000000', '#FFFFFF', 21],
    ['#EEEEEE', '#333333', 10.88977979803735],
    ['#333333', '#EEEEEE', 10.88977979803735],
  ])('should not care which order colors are checked', (first, second, ratio) => {
    expect(getContrast(first, second)).toEqual(ratio)
  })
})

describe('getLuma', () => {
  it('should return the Luma of a color', () => {
    expect(getLuma('#45a081')).toBeCloseTo(0.279918, 6)
    expect(getLuma('#191995')).toBeCloseTo(0.030719, 6)
    expect(getLuma('#cd6600')).toBeCloseTo(0.224819, 6)
    expect(getLuma(0)).toBe(0)
    expect(getLuma(0xffffff)).toBe(1)
  })
})

describe('APCAcontrast', () => {
  it.each([
    ['#888', '#fff', 66.89346308821438],
    ['#aaa', '#000', -60.438571788907524],
    ['#def', '#123', -98.44863435731264],
    ['#123', '#234', 1.276075977788573],
  ])('%s on %s', (text, bg, expected) => {
    expect(APCAcontrast(parseColor(text), parseColor(bg))).toBe(expected)
  })
})

function closeTo (arr: number[], precision = 3) {
  return arr.map(n => expect.closeTo(n, precision))
}
