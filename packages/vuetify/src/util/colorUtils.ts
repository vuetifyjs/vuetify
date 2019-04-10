import { consoleWarn } from './console'

export type RGB = number
export type XYZ = [number, number, number]
export type LAB = [number, number, number]
export type HSVA = [number, number, number, number]
export type RGBA = [number, number, number, number]
export type Color = string | number | {}

export function colorToInt (color: Color): RGB {
  let rgb

  if (typeof color === 'number') {
    rgb = color
  } else if (typeof color === 'string') {
    let c = color[0] === '#' ? color.substring(1) : color
    if (c.length === 3) {
      c = c.split('').map(char => char + char).join('')
    }
    if (c.length !== 6) {
      consoleWarn(`'${color}' is not a valid rgb color`)
    }
    rgb = parseInt(c, 16)
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`)
  }

  if (rgb < 0) {
    consoleWarn(`Colors cannot be negative: '${color}'`)
    rgb = 0
  } else if (rgb > 0xffffff || isNaN(rgb)) {
    consoleWarn(`'${color}' is not a valid rgb color`)
    rgb = 0xffffff
  }

  return rgb
}

export function intToHex (color: RGB): string {
  let hexColor: string = color.toString(16)

  if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor

  return '#' + hexColor
}

export function colorToHex (color: Color): string {
  return intToHex(colorToInt(color))
}

/**
 * Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV#RGB_to_HSL_and_HSV
 *
 * @param color HSVA color as an array [0-360, 0-1, 0-1, 0-1]
 */
export function HSVAtoRGBA (color: HSVA): RGBA {
  const [h, s, v] = color
  const f = (n: number) => {
    const k = (n + (h / 60)) % 6
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  }

  const hsv = [f(5), f(3), f(1)].map(v => v * 255)

  return [...hsv, color[3]] as RGBA
}

export function RGBAtoHSVA (color: RGBA): HSVA {
  const [r, g, b] = color.map(v => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0

  if (max !== min) {
    if (max === r) {
      h = 60 * (0 + ((g - b) / (max - min)))
    } else if (max === g) {
      h = 60 * (2 + ((b - r) / (max - min)))
    } else if (max === b) {
      h = 60 * (4 + ((r - g) / (max - min)))
    }
  }

  if (h < 0) h = h + 360

  const s = max === 0 ? 0 : (max - min) / max

  return [h, s, max, color[3]]
}

export function RGBAtoInt (rgba: RGBA): number {
  return (rgba[0] << 24) + (rgba[1] << 16) + (rgba[2] << 8) + rgba[3]
}
