import { parseColor } from '../'

const red = {
  alpha: 1,
  hex: ['FF', '00', '00', 'FF'],
  hsla: [0, 1, 0.5, 1],
  hsva: [0, 1, 1, 1],
  hue: 0,
  rgba: [255, 0, 0, 1]
}

describe('VColorPicker/util/parseColor', () => {
  it('should return default color if nothing is passed', () => {
    expect(parseColor(undefined)).toEqual(red)
    expect(parseColor(null)).toEqual(red)
  })

  it('should parse hex string', () => {
    expect(parseColor('#FF00FF').hex).toEqual(['FF', '00', 'FF', 'FF'])
    expect(parseColor('FF00FF05').hex).toEqual(['FF', '00', 'FF', '05'])
  })

  it('should try to parse color if invalid hex string passed', () => {
    expect(parseColor('#00gi').hex).toEqual(['00', 'FF', '00', 'FF'])
  })

  it('should parse rgb object', () => {
    const rgb = { r: 128, g: 128, b: 0 }
    expect(parseColor(rgb).rgba).toEqual([128, 128, 0, 1])

    const rgba = { r: 128, g: 0, b: 255, a: 0.2 }
    expect(parseColor(rgba).rgba).toEqual([128, 0, 255, 0.2])
  })

  it('should parse hsl object', () => {
    const hsl = { h: 220, s: 0.5, l: 1 }
    expect(parseColor(hsl).hsla).toEqual([220, 0.5, 1, 1])

    const hsla = { h: 220, s: 0.5, l: 1, a: 0.4 }
    expect(parseColor(hsla).hsla).toEqual([220, 0.5, 1, 0.4])
  })

  it('should parse hsv object', () => {
    const hsv = { h: 220, s: 0.5, v: 1 }
    expect(parseColor(hsv).hsva).toEqual([220, 0.5, 1, 1])

    const hsva = { h: 220, s: 0.5, v: 1, a: 0.4 }
    expect(parseColor(hsva).hsva).toEqual([220, 0.5, 1, 0.4])
  })

  it('should return default color if object is unknown', () => {
    const foo = { x: 0, y: 10, z: 100 }
    expect(parseColor(foo)).toEqual(red)
  })
})
