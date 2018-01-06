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
    // TODO: more string formats
    const c = color.substring(1)
    rgb = parseInt(c, 16)
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color.constructor.name} instead`)
  }

  if (rgb < 0) {
    consoleWarn(`Colors cannot be negative: '${color}'`)
    rgb = 0
  } else if (rgb > 0xffffff) {
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
  return '#' + color.toString(16).padStart(6, '0')
}
