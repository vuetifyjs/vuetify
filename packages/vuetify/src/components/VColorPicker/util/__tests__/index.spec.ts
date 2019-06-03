import { parseColor } from '../'

const red = {
  alpha: 1,
  hex: '#FF0000',
  hexa: '#FF0000FF',
  hsla: { h: 0, s: 1, l: 0.5, a: 1 },
  hsva: { h: 0, s: 1, v: 1, a: 1 },
  hue: 0,
  rgba: { r: 255, g: 0, b: 0, a: 1 },
}

describe('VColorPicker/util/parseColor', () => {
  it('should return default color if nothing is passed', () => {
    expect(parseColor(undefined)).toEqual(red)
    expect(parseColor(null)).toEqual(red)
  })

  it('should parse hex string', () => {
    expect(parseColor('#FF00FF').hexa).toEqual('#FF00FFFF')
    expect(parseColor('FF00FF05').hexa).toEqual('#FF00FF05')
  })

  it('should try to parse color if invalid hex string passed', () => {
    expect(parseColor('#00gi').hex).toEqual('#00FF00')
    expect(parseColor('#00gi').hexa).toEqual('#00FF00FF')
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
