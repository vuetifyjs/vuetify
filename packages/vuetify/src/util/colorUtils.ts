import { consoleWarn } from './console'
import { chunk, padEnd } from './helpers'
import { toXYZ } from './color/transformSRGB'

export type ColorInt = number
export type XYZ = [number, number, number]
export type LAB = [number, number, number]
export type HSV = { h: number, s: number, v: number }
export type HSVA = HSV & { a: number }
export type RGB = { r: number, g: number, b: number }
export type RGBA = RGB & { a: number }
export type HSL = { h: number, s: number, l: number }
export type HSLA = HSL & { a: number }
export type Hex = string
export type Hexa = string
export type Color = string | number | {}

export function colorToInt (color: Color): ColorInt {
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

export function intToHex (color: ColorInt): string {
  let hexColor: string = color.toString(16)

  if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor

  return '#' + hexColor
}

export function colorToHex (color: Color): string {
  return intToHex(colorToInt(color))
}

/**
 * Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color HSVA color as an array [0-360, 0-1, 0-1, 0-1]
 */
export function HSVAtoRGBA (hsva: HSVA): RGBA {
  const { h, s, v, a } = hsva
  const f = (n: number) => {
    const k = (n + (h / 60)) % 6
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  }

  const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255))

  return { r: rgb[0], g: rgb[1], b: rgb[2], a }
}

/**
 * Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color RGBA color as an array [0-255, 0-255, 0-255, 0-1]
 */
export function RGBAtoHSVA (rgba: RGBA): HSVA {
  if (!rgba) return { h: 0, s: 1, v: 1, a: 1 }

  const r = rgba.r / 255
  const g = rgba.g / 255
  const b = rgba.b / 255
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
  const hsv = [h, s, max]

  return { h: hsv[0], s: hsv[1], v: hsv[2], a: rgba.a }
}

export function HSVAtoHSLA (hsva: HSVA): HSLA {
  const { h, s, v, a } = hsva

  const l = v - (v * s / 2)

  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l)

  return { h, s: sprime, l, a }
}

export function HSLAtoHSVA (hsl: HSLA): HSVA {
  const { h, s, l, a } = hsl

  const v = l + s * Math.min(l, 1 - l)

  const sprime = v === 0 ? 0 : 2 - (2 * l / v)

  return { h, s: sprime, v, a }
}

export function RGBAtoCSS (rgba: RGBA): string {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
}

export function RGBtoCSS (rgba: RGBA): string {
  return RGBAtoCSS({ ...rgba, a: 1 })
}

export function RGBAtoHex (rgba: RGBA): Hex {
  const toHex = (v: number) => {
    const h = Math.round(v).toString(16)
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase()
  }

  return `#${[
    toHex(rgba.r),
    toHex(rgba.g),
    toHex(rgba.b),
    toHex(Math.round(rgba.a * 255)),
  ].join('')}`
}

export function HexToRGBA (hex: Hex): RGBA {
  const rgba = chunk(hex.slice(1), 2).map((c: string) => parseInt(c, 16))

  return {
    r: rgba[0],
    g: rgba[1],
    b: rgba[2],
    a: Math.round((rgba[3] / 255) * 100) / 100,
  }
}

export function HexToHSVA (hex: Hex): HSVA {
  const rgb = HexToRGBA(hex)
  return RGBAtoHSVA(rgb)
}

export function HSVAtoHex (hsva: HSVA): Hex {
  return RGBAtoHex(HSVAtoRGBA(hsva))
}

export function parseHex (hex: string): Hex {
  if (hex.startsWith('#')) {
    hex = hex.slice(1)
  }

  hex = hex.replace(/([^0-9a-f])/gi, 'F')

  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('')
  }

  if (hex.length === 6) {
    hex = padEnd(hex, 8, 'F')
  } else {
    hex = padEnd(padEnd(hex, 6), 8, 'F')
  }

  return `#${hex}`.toUpperCase().substr(0, 9)
}

export function RGBtoInt (rgba: RGBA): ColorInt {
  return (rgba.r << 16) + (rgba.g << 8) + rgba.b
}

/**
 * Returns the contrast ratio (1-21) between two colors.
 *
 * @param c1 First color
 * @param c2 Second color
 */
export function contrastRatio (c1: RGBA, c2: RGBA): number {
  const [, y1] = toXYZ(RGBtoInt(c1))
  const [, y2] = toXYZ(RGBtoInt(c2))

  return (Math.max(y1, y2) + 0.05) / (Math.min(y1, y2) + 0.05)
}
