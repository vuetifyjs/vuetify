import { parseColor, extractColor } from '../'

const red = {
  alpha: 1,
  hex: '#FF0000',
  hexa: '#FF0000FF',
  hsla: { h: 0, s: 1, l: 0.5, a: 1 },
  hsva: { h: 0, s: 1, v: 1, a: 1 },
  hue: 0,
  rgba: { r: 255, g: 0, b: 0, a: 1 },
}

describe('VColorPicker Utils', () => {
  describe('Parse color', () => {
    it('should return default color if nothing is passed', () => {
      expect(parseColor(undefined)).toEqual(red)
      expect(parseColor(null)).toEqual(red)
    })

    it('should parse hex string', () => {
      expect(parseColor('#FF00FF').hexa).toEqual('#FF00FFFF')
      expect(parseColor('FF00FF05').hexa).toEqual('#FF00FF05')
    })

    it('should try to parse color if invalid hex string passed', () => {
      expect(parseColor('#00gi').hex).toEqual('#0000FF')
      expect(parseColor('#00gi').hexa).toEqual('#0000FFFF')
    })

    it('should parse rgb object', () => {
      const rgb = { r: 128, g: 128, b: 0 }
      expect(parseColor(rgb).rgba).toEqual({ ...rgb, a: 1 })

      const rgba = { r: 128, g: 0, b: 255, a: 0.2 }
      expect(parseColor(rgba).rgba).toEqual(rgba)
    })

    it('should parse hsl object', () => {
      const hsl = { h: 220, s: 0.5, l: 1 }
      expect(parseColor(hsl).hsla).toEqual({ ...hsl, a: 1 })

      const hsla = { h: 220, s: 0.5, l: 1, a: 0.4 }
      expect(parseColor(hsla).hsla).toEqual(hsla)
    })

    it('should parse hsv object', () => {
      const hsv = { h: 220, s: 0.5, v: 1 }
      expect(parseColor(hsv).hsva).toEqual({ ...hsv, a: 1 })

      const hsva = { h: 220, s: 0.5, v: 1, a: 0.4 }
      expect(parseColor(hsva).hsva).toEqual(hsva)
    })

    it('should return default color if object is unknown', () => {
      const foo = { x: 0, y: 10, z: 100 }
      expect(parseColor(foo)).toEqual(red)
    })
  })

  describe('Extract color', () => {
    it('should return the color object if the input is null', () => {
      expect(extractColor(red, null)).toEqual(red)
    })

    it('should return HEX color value if the input is a string and has a length of 7', () => {
      expect(extractColor(red, '#FF0000')).toEqual(red.hex)
    })

    it('should return HEXA color value if the input is a string and has a length greater than 7', () => {
      expect(extractColor(red, '#FF0000FF')).toEqual(red.hexa)
    })

    it('should return RGB value if the input is an RBG object with no alpha', () => {
      expect(extractColor(red, { r: 255, g: 0, b: 0 })).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should return RGBA value if the input is an RBG object with alpha', () => {
      expect(extractColor(red, { r: 255, g: 0, b: 0, a: 0 })).toEqual(red.rgba)
    })

    it('should return HSL value if the input is an HSL object with no alpha', () => {
      expect(extractColor(red, { h: 0, s: 1, l: 0.5 })).toEqual({ h: 0, s: 1, l: 0.5 })
    })

    it('should return HSLA value if the input is an HSL object with alpha', () => {
      expect(extractColor(red, { h: 0, s: 1, l: 0.5, a: 1 })).toEqual(red.hsla)
    })

    it('should return HSV value if the input is an HSV object with no alpha', () => {
      expect(extractColor(red, { h: 0, s: 1, v: 1 })).toEqual({ h: 0, s: 1, v: 1 })
    })

    it('should return HSVA value if the input is an HSV object with alpha', () => {
      expect(extractColor(red, { h: 0, s: 1, v: 1, a: 0.5 })).toEqual({ h: 0, s: 1, v: 1, a: 1 })
    })

    it('should return the color object if an invalid input is passed', () => {
      expect(extractColor(red, undefined)).toEqual(red)
      expect(extractColor(red)).toEqual(red)
      expect(extractColor(red, true)).toEqual(red)
    })
  })
})
