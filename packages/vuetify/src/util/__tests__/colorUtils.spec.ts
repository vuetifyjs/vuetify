import {
  classToHex,
  colorToInt,
  intToHex,
  isCssColor,
  parseGradient,
} from '../colorUtils'
import * as transformSRGB from '../color/transformSRGB'
import * as transformCIELAB from '../color/transformCIELAB'

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

describe('colorToInt', () => {
  it('should convert a hex string to a number', () => {
    expect(colorToInt('#123456')).toBe(0x123456)
    expect(colorToInt('#abc')).toBe(0xaabbcc)
    expect(colorToInt('876543')).toBe(0x876543)
    expect(colorToInt('669')).toBe(0x666699)
    expect(colorToInt('fff')).toBe(0xffffff)
  })

  it('should keep existing numbers', () => {
    expect(colorToInt(0xabcdef)).toBe(0xabcdef)
  })

  it('should reject invalid formats', async () => {
    expect(() => colorToInt([])).toThrow('Colors can only be numbers or strings, recieved Array instead')
    expect(() => colorToInt(() => {})).toThrow('Colors can only be numbers or strings, recieved Function instead')

    colorToInt(-1)
    colorToInt('#1000000')
    colorToInt('#13')
    colorToInt('#6')
    colorToInt('red')

    expect(`Colors cannot be negative: '-1'`).toHaveBeenTipped()
    expect(`'#1000000' is not a valid rgb color`).toHaveBeenTipped()
    expect(`'#13' is not a valid rgb color`).toHaveBeenTipped()
    expect(`'#6' is not a valid rgb color`).toHaveBeenTipped()
    expect(`'red' is not a valid rgb color`).toHaveBeenTipped()
  })
})

describe('classToHex', () => {
  it('should convert a color class string to a hex string', () => {
    expect(classToHex('red', colors, currentTheme)).toBe('#ff0000')
    expect(classToHex('red lighten-1', colors, currentTheme)).toBe('#ff6666')
    expect(classToHex('primary', colors, currentTheme)).toBe('#1976d2')
  })
})

// TODO
describe('intToHex', () => {
  it('should convert', () => {
    expect(intToHex(0)).toBe('#000000')
    expect(intToHex(0xffffff)).toBe('#ffffff')
  })
})

describe('transformSRGB', () => {
  it('should convert sRGB to XYZ', () => {
    expect(transformSRGB.toXYZ(0)).toEqual([0, 0, 0])
    expect(transformSRGB.toXYZ(0xffffff)).toEqual([0.9505, 1, 1.0890])
    expect(transformSRGB.toXYZ(0xfcfbf4)).toEqualCloseTo([0.909712, 0.962215, 0.993659], 6)
    expect(transformSRGB.toXYZ(0x45a081)).toEqualCloseTo([0.189875, 0.279918, 0.251711], 6)
    expect(transformSRGB.toXYZ(0x191995)).toEqualCloseTo([0.061733, 0.030719, 0.287013], 6)
    expect(transformSRGB.toXYZ(0xcd6600)).toEqualCloseTo([0.299282, 0.224819, 0.027620], 6)
  })

  it('should convert XYZ to sRGB', () => {
    expect(transformSRGB.fromXYZ([0, 0, 0])).toBe(0)
    expect(transformSRGB.fromXYZ([0.9505, 1, 1.0890])).toBe(0xffffff)
    expect(transformSRGB.fromXYZ([0.909712, 0.962215, 0.993659])).toBe(0xfcfbf4)
    expect(transformSRGB.fromXYZ([0.189875, 0.279918, 0.251711])).toBe(0x45a081)
    expect(transformSRGB.fromXYZ([0.061733, 0.030719, 0.287013])).toBe(0x191995)
    expect(transformSRGB.fromXYZ([0.299282, 0.224819, 0.027620])).toBe(0xcd6600)
  })
})

describe('transformCIELAB', () => {
  it('should convert LAB to XYZ', () => {
    expect(transformCIELAB.toXYZ([0, 0, 0])).toEqual([0, 0, 0])
    expect(transformCIELAB.toXYZ([100, 0.0053, -0.0104])).toEqualCloseTo([0.9505, 1, 1.0890], 4)
    expect(transformCIELAB.toXYZ([98.5202, -0.8731, 3.4542])).toEqualCloseTo([0.909713, 0.962215, 0.99366], 6)
    expect(transformCIELAB.toXYZ([59.8813, -34.7853, 8.0829])).toEqualCloseTo([0.189875, 0.279918, 0.251711], 6)
    expect(transformCIELAB.toXYZ([20.3296, 44.3917, -65.5991])).toEqualCloseTo([0.061733, 0.030719, 0.287014], 6)
    expect(transformCIELAB.toXYZ([54.5346, 36.1321, 62.8465])).toEqualCloseTo([0.299282, 0.224819, 0.027620], 6)
  })

  it('should convert XYZ to LAB', () => {
    expect(transformCIELAB.fromXYZ([0, 0, 0])).toEqual([0, 0, 0])
    expect(transformCIELAB.fromXYZ([0.9505, 1, 1.0890])).toEqualCloseTo([100, 0.0053, -0.0104], 4)
    expect(transformCIELAB.fromXYZ([0.909712, 0.962215, 0.993659])).toEqualCloseTo([98.5202, -0.8731, 3.4542], 4)
    expect(transformCIELAB.fromXYZ([0.189875, 0.279918, 0.251711])).toEqualCloseTo([59.8813, -34.7853, 8.0829], 4)
    expect(transformCIELAB.fromXYZ([0.061733, 0.030719, 0.287014])).toEqualCloseTo([20.3296, 44.3917, -65.5991], 4)
    expect(transformCIELAB.fromXYZ([0.299282, 0.224819, 0.027620])).toEqualCloseTo([54.5346, 36.1321, 62.8465], 4)
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

expect.extend({
  toEqualCloseTo (received, expected, precision = 3) {
    const getType = item => item.constructor.name.toLowerCase()

    function round (obj) {
      switch (getType(obj)) {
        case 'array':
          return obj.map(round)

        case 'object':
          return Object.keys(obj).reduce((acc, key) => {
            acc[key] = round(obj[key])
            return acc
          }, {})

        case 'number':
          return +obj.toFixed(precision)

        default:
          return obj
      }
    }

    expect(round(received)).toEqual(expected)

    return { pass: true }
  },
})
