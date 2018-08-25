import { colorToInt, intToHex, colorToHex, RGB } from './colorUtils'
import * as sRGB from './color/transformSRGB'
import * as LAB from './color/transformCIELAB'
import { VuetifyTheme, VuetifyThemeSet, VuetifyThemeItem } from 'types'

interface ParsedThemeItem {
  base?: string
  lighten5?: string
  lighten4?: string
  lighten3?: string
  lighten2?: string
  lighten1?: string
  darken1?: string
  darken2?: string
  darken3?: string
  darken4?: string

  [name: string]: string | undefined
}

interface ParsedThemeSet {
  background?: ParsedThemeItem
  primary?: ParsedThemeItem
  accent?: ParsedThemeItem
  secondary?: ParsedThemeItem
  info?: ParsedThemeItem
  warning?: ParsedThemeItem
  error?: ParsedThemeItem
  success?: ParsedThemeItem

  [name: string]: ParsedThemeItem | undefined
}

class ParsedTheme {
  light: ParsedThemeSet = {};
  dark: ParsedThemeSet = {};

  [name: string]: ParsedThemeSet
}

export function parse (theme: VuetifyTheme): ParsedTheme {
  const parsedTheme = new ParsedTheme()

  for (const key in theme) {
    const value = theme[key]
    parsedTheme[key] = parseSet(value)
  }
  return parsedTheme
}

export function parseSet (themeSet: VuetifyThemeSet): ParsedThemeSet {
  const parsedThemeSet: ParsedThemeSet = {}

  for (const key in themeSet) {
    const value = themeSet[key]
    if (typeof value === 'object') {
      parsedThemeSet[key] = parseItem(value)
    } else {
      if (key === 'background') parsedThemeSet[key] = { base: colorToHex(value) }
      else { parsedThemeSet[key] = genVariations(colorToInt(value)) }
    }
  }

  return parsedThemeSet
}

export function parseItem (themeItem: VuetifyThemeItem): ParsedThemeItem {
  const parsedItem: ParsedThemeItem = {}

  for (const key in themeItem) {
    const value = themeItem[key]
    parsedItem[key] = colorToHex(value)
  }

  return parsedItem
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

export function genStyles (theme: ParsedTheme, cssVar = false, isDark = false): string {
  const themeSet = isDark ? theme.dark : theme.light
  const colors = Object.keys(themeSet)

  if (!colors.length) return ''

  let variablesCss = ''
  let css = ''

  if (typeof themeSet.primary === 'undefined' ||
    typeof themeSet.primary.base === 'undefined') return ''
  const aColor = cssVar ? genColorVariable('primary') : themeSet.primary.base
  css += `a { color: ${aColor}; }`

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i]
    const value = themeSet[name]

    if (typeof value !== 'object' || typeof value.base === 'undefined') continue

    css += genBaseColor(name, cssVar ? genColorVariable(name) : value.base)
    cssVar && (variablesCss += `  ${genColorVariableName(name)}: ${value.base};\n`)

    const variants = Object.keys(value)
    for (let i = 0; i < variants.length; ++i) {
      const variant = variants[i]
      const variantValue = value[variant]
      if (typeof variantValue === 'undefined' || variant === 'base') continue

      css += genVariantColor(name, variant, cssVar ? genColorVariable(name, variant) : variantValue)
      cssVar && (variablesCss += `  ${genColorVariableName(name, variant)}: ${variantValue};\n`)
    }
  }

  if (cssVar) {
    variablesCss = `:root {\n${variablesCss}}\n\n`
  }

  return variablesCss + css
}

export function genVariations (value: RGB): ParsedThemeItem {
  const values: ParsedThemeItem = {
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
