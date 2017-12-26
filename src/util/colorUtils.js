import * as transformSRGB from './color/transformSRGB'

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
    throw new RangeError(`Colors cannot be negative: '${color}'`)
  } else if (rgb > 0xffffff) {
    throw new RangeError(`'${color}' is not a valid rgb color`)
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

/**
 * Calculate the relative luminance of a given color
 * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
 *
 * @param {string|number} color - An rgb color number between 0x0 and 0xffffff, or a hex color string
 * @returns {number}
 */
export function getLuma (color) {
  const rgb = colorToInt(color)

  return transformSRGB.toXYZ(rgb)[1]
}

/**
 * @see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function getContrast (l1, l2) {
  const light = Math.max(l1, l2)
  const dark = Math.min(l1, l2)
  return (light + 0.05) / (dark + 0.05)
}
