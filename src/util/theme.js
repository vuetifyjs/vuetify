import { colorToInt, intToHex, getLuma } from './colorUtils'
import * as sRGB from './color/transformSRGB'
import * as LAB from './color/transformCIELAB'

/**
 * @param {object} theme
 * @returns {object}
 */
export function parse (theme) {
  const colors = Object.keys(theme)
  const parsedTheme = {}

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i]
    const value = theme[name]

    parsedTheme[name] = parseItem(value)
  }

  return parsedTheme
}

/**
 * @param {{ color: number, text: number } | string | number} item
 * @returns {{ color: number, text: number }}
 */
export function parseItem (item) {
  let color
  let text

  if (typeof item === 'string' || typeof item === 'number') {
    color = colorToInt(item)
    text = getLuma(color) > 0.18 ? 0x0 : 0xffffff
  } else {
    color = colorToInt(item.color)
    text = text && colorToInt(text)
  }

  return {
    color,
    text: text != null ? text : getLuma(color) > 0.18 ? 0x0 : 0xffffff
  }
}

export function genVariations (name, value) {
  const values = Array(10)
  values[0] = genBaseColor(name, value.color, value.text)

  for (let i = 1, n = 5; i <= 5; ++i, --n) {
    values[i] = genVariantColor(name, lighten(value.color, n), value.text, 'lighten', n)
  }

  for (let i = 1; i <= 4; ++i) {
    values[i + 5] = genVariantColor(name, darken(value.color, i), value.text, 'darken', i)
  }
  return values
}

function lighten (value, amount) {
  const lab = LAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] + amount * 10
  return sRGB.fromXYZ(LAB.toXYZ(lab))
}

function darken (value, amount) {
  const lab = LAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] - amount * 10
  return sRGB.fromXYZ(LAB.toXYZ(lab))
}

/**
 * Generate the CSS for a base color (.primary)
 *
 * @param {string} name - The color name
 * @param {string|number} value - The color value
 * @param {string|number} text - The ideal text color if used as a background
 * @returns {string}
 */
const genBaseColor = (name, value, text) => {
  value = intToHex(value)
  text = intToHex(text)
  return `
.${name} {
  background-color: ${value} !important;
  border-color: ${value} !important;
  color: ${text};
}
.${name}--text {
  color: ${value} !important;
}
.${name}--text input,
.${name}--text textarea {
  caret-color: ${value} !important;
}
.${name}--after::after {
  background: ${value} !important;
}`
}

/**
 * Generate the CSS for a variant color (.primary.darken-2)
 *
 * @param {string} name - The color name
 * @param {string|number} value - The color value
 * @param {string|number} text - The ideal text color if used as a background
 * @param {string} type - The variant type (darken/lighten)
 * @param {number} n - The darken/lighten step number
 * @returns {string}
 */
const genVariantColor = (name, value, text, type, n) => {
  value = intToHex(value)
  text = intToHex(text)
  return `
.${name}.${type}-${n} {
  background-color: ${value} !important;
  border-color: ${value} !important;
  color: ${text};
}
.${name}--text.text--${type}-${n} {
  color: ${value} !important;
}
.${name}--text.text--${type}-${n} input,
.${name}--text.text--${type}-${n} textarea {
  caret-color: ${value} !important;
}
.${name}.${type}-${n}--after::after {
  background: ${value} !important;
}`
}
