import { consoleWarn } from './console'

export type RGB = number
export type XYZ = [number, number, number]
export type LAB = [number, number, number]

// TODO: remove with TS 3.0
type unknown = string | number | symbol | boolean | object | null | undefined

export function colorToInt (color: unknown): RGB {
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
