import { colorToInt, intToHex, colorToHex, RGB } from './colorUtils'
import * as sRGB from './color/transformSRGB'
import * as LAB from './color/transformCIELAB'
import { VuetifyTheme } from 'vuetify/types'
import colors from './colors'

interface ParsedThemeItem {
  base: string
  lighten5: string
  lighten4: string
  lighten3: string
  lighten2: string
  lighten1: string
  darken1: string
  darken2: string
  darken3: string
  darken4: string

  [name: string]: string
}

interface ParsedTheme {
  [name: string]: ParsedThemeItem
}

export function parse (theme: VuetifyTheme | Record<string, number | string>, isItem = false): ParsedTheme {
  const colors = Object.keys(theme)
  const parsedTheme: any = {}

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i]
    const value = theme[name]

    if (isItem) {
      if (name === 'base' || name.startsWith('lighten') || name.startsWith('darken')) {
        parsedTheme[name] = colorToHex(value)
      }
    } else if (typeof value === 'object') {
      parsedTheme[name] = parse(value, true)
    } else {
      parsedTheme[name] = genVariations(name, colorToInt(value))
    }
  }

  return parsedTheme
}

/**
 * Generate the CSS for a base color (.primary)
 */
const genBaseColor = (name: string, value: string): string => {
  return `
.${name} {
  background-color: ${value} !important;
  border-color: ${value} !important;
}
.${name}--text {
  color: ${value} !important;
  caret-color: ${value} !important;
}`
}

/**
 * Generate the CSS for a variant color (.primary.darken-2)
 */
const genVariantColor = (name: string, variant: string, value: string): string => {
  const [type, n] = variant.split(/(\d)/, 2)
  return `
.${name}.${type}-${n} {
  background-color: ${value} !important;
  border-color: ${value} !important;
}
.${name}--text.text--${type}-${n} {
  color: ${value} !important;
  caret-color: ${value} !important;
}`
}

const genColorVariableName = (name: string, variant = 'base'): string => `--v-${name}-${variant}`

const genColorVariable = (name: string, variant = 'base'): string => `var(${genColorVariableName(name, variant)})`

export function genStyles (theme: ParsedTheme, cssVar = false): string {
  const colors = Object.keys(theme)

  if (!colors.length) return ''

  let variablesCss = ''
  let css = ''

  const aColor = cssVar ? genColorVariable('primary') : theme.primary.base
  css += `a { color: ${aColor}; }`

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i]
    const value = theme[name]

    if (typeof value !== 'object') continue

    css += genBaseColor(name, cssVar ? genColorVariable(name) : value.base)
    cssVar && (variablesCss += `  ${genColorVariableName(name)}: ${value.base};\n`)

    const variants = Object.keys(value)
    for (let i = 0; i < variants.length; ++i) {
      const variant = variants[i]
      const variantValue = value[variant]
      if (variant === 'base') continue

      css += genVariantColor(name, variant, cssVar ? genColorVariable(name, variant) : variantValue)
      cssVar && (variablesCss += `  ${genColorVariableName(name, variant)}: ${variantValue};\n`)
    }
  }

  if (cssVar) {
    variablesCss = `:root {\n${variablesCss}}\n\n`
  }

  return variablesCss + css
}

export function genVariations (name: string, value: RGB): Record<string, string> {
  const values: Record<string, string> = {
    base: intToHex(value)
  }

  for (let i = 5; i > 0; --i) {
    values[`lighten${i}`] = intToHex(lighten(value, i))
  }

  for (let i = 1; i <= 4; ++i) {
    values[`darken${i}`] = intToHex(darken(value, i))
  }

  return values
}

export function lighten (value: RGB, amount: number): RGB {
  const lab = LAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] + amount * 10
  return sRGB.fromXYZ(LAB.toXYZ(lab))
}

export function darken (value: RGB, amount: number): RGB {
  const lab = LAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] - amount * 10
  return sRGB.fromXYZ(LAB.toXYZ(lab))
}

export function extractCssColor (color: string, theme: VuetifyTheme): string {
  const parts = color.trim().match(/^([^\s]+)(\s+(lighten|darken)-?([1-5]))?$/) || [null, null, null, null]

  const [, colorName, , variant, num] = parts
  const variantName = variant ? `${variant}${num}` : 'base'

  if (!colorName) {
    throw new TypeError(`Invalid color: ${color}`)
  }

  if (colorName in colors) {
    const colorDef = (colors as any)[colorName]

    if (!colorDef[variantName]) {
      throw new TypeError(`Invalid color: ${color}`)
    }

    return colorDef[variantName]
  }

  if (colorName in theme) {
    const themeDef = theme[colorName] as Record<string, string> | string

    if (typeof themeDef === 'object') {
      if (!themeDef[variantName]) {
        throw new TypeError(`Invalid color: ${color}`)
      }

      return themeDef[variantName]
    }

    if (!variant) {
      return themeDef
    }

    if (variant === 'lighten') {
      return intToHex(lighten(colorToInt(themeDef), Number(num)))
    } else if (variant === 'darken') {
      return intToHex(darken(colorToInt(themeDef), Number(num)))
    }

    throw new TypeError(`Invalid color: ${color}`)
  }

  return color
}
