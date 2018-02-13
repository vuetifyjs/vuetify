import { consoleWarn } from './console'

/**
 * @param {string|number} color
 * @returns {number}
 */
export function colorToInt (color) {
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
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color.constructor.name} instead`)
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

/**
 * @param {number} color
 * @returns {string}
 */
export function intToHex (color) {
  color = color.toString(16)

  if (color.length < 6) color = '0'.repeat(6 - color.length) + color

  return '#' + color
}
