import { colorToInt, intToHex, RGB } from './colorUtils'
import * as sRGB from './color/transformSRGB'
import * as LAB from './color/transformCIELAB'
import { VuetifyTheme } from 'types'

export function parse (theme: VuetifyTheme): VuetifyTheme {
  const colors = Object.keys(theme)
  const parsedTheme: any = {}

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i]
    const value = theme[name]

    parsedTheme[name] = colorToInt(value)
  }

  return parsedTheme
}

/**
 * Generate the CSS for a base color (.primary)
 */
export const genBaseColor = (name: string, value: RGB): string => {
  const rgb = intToHex(value)
  return `
.${name} {
  background-color: ${rgb} !important;
  border-color: ${rgb} !important;
}
.${name}--text {
  color: ${rgb} !important;
}
.${name}--text input,
.${name}--text textarea {
  caret-color: ${rgb} !important;
}`
}

/**
 * Generate the CSS for a variant color (.primary.darken-2)
 */
export const genVariantColor = (name: string, value: RGB, type: 'darken' | 'lighten', n: number): string => {
  const rgb = intToHex(value)
  return `
.${name}.${type}-${n} {
  background-color: ${rgb} !important;
  border-color: ${rgb} !important;
}
.${name}--text.text--${type}-${n} {
  color: ${rgb} !important;
}
.${name}--text.text--${type}-${n} input,
.${name}--text.text--${type}-${n} textarea {
  caret-color: ${rgb} !important;
}`
}

export function genVariations (name: string, value: RGB): RGB[] {
  const values = Array(10)
  values[0] = genBaseColor(name, value)

  for (let i = 1, n = 5; i <= 5; ++i, --n) {
    values[i] = genVariantColor(name, lighten(value, n), 'lighten', n)
  }

  for (let i = 1; i <= 4; ++i) {
    values[i + 5] = genVariantColor(name, darken(value, i), 'darken', i)
  }

  return values
}

function lighten (value: RGB, amount: number): RGB {
  const lab = LAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] + amount * 10
  return sRGB.fromXYZ(LAB.toXYZ(lab))
}

function darken (value: RGB, amount: number): RGB {
  const lab = LAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] - amount * 10
  return sRGB.fromXYZ(LAB.toXYZ(lab))
}
