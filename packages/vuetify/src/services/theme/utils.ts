import { keys } from '../../util/helpers'
import { colorToInt, intToHex, colorToHex, ColorInt } from '../../util/colorUtils'
import * as sRGB from '../../util/color/transformSRGB'
import * as LAB from '../../util/color/transformCIELAB'
import {
  VuetifyParsedTheme,
  VuetifyThemeItem,
} from 'vuetify/types/services/theme'

export function parse (
  theme: Record<string, VuetifyThemeItem>,
  isItem = false,
  variations = true,
): VuetifyParsedTheme {
  const { anchor, ...variant } = theme
  const colors = Object.keys(variant)
  const parsedTheme: any = {}

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i]
    const value = theme[name]

    if (value == null) continue

    if (!variations) {
      parsedTheme[name] = { base: intToHex(colorToInt(value)) }
    } else if (isItem) {
      /* istanbul ignore else */
      if (name === 'base' || name.startsWith('lighten') || name.startsWith('darken')) {
        parsedTheme[name] = colorToHex(value)
      }
    } else if (typeof value === 'object') {
      parsedTheme[name] = parse(value, true, variations)
    } else {
      parsedTheme[name] = genVariations(name, colorToInt(value))
    }
  }

  if (!isItem) {
    parsedTheme.anchor = anchor || parsedTheme.base || parsedTheme.primary.base
  }

  return parsedTheme
}

/**
 * Generate the CSS for a base color (.primary)
 */
const genBaseColor = (name: string, value: string): string => {
  return `
.v-application .${name} {
  background-color: ${value} !important;
  border-color: ${value} !important;
}
.v-application .${name}--text {
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
.v-application .${name}.${type}-${n} {
  background-color: ${value} !important;
  border-color: ${value} !important;
}
.v-application .${name}--text.text--${type}-${n} {
  color: ${value} !important;
  caret-color: ${value} !important;
}`
}

const genColorVariableName = (name: string, variant = 'base'): string => `--v-${name}-${variant}`

const genColorVariable = (name: string, variant = 'base'): string => `var(${genColorVariableName(name, variant)})`

export function genStyles (theme: VuetifyParsedTheme, cssVar = false): string {
  const { anchor, ...variant } = theme
  const colors = Object.keys(variant)

  if (!colors.length) return ''

  let variablesCss = ''
  let css = ''

  const aColor = cssVar ? genColorVariable('anchor') : anchor
  css += `.v-application a { color: ${aColor}; }`
  cssVar && (variablesCss += `  ${genColorVariableName('anchor')}: ${anchor};\n`)

  for (let i = 0; i < colors.length; ++i) {
    const name = colors[i]
    const value = theme[name]

    css += genBaseColor(name, cssVar ? genColorVariable(name) : value.base)
    cssVar && (variablesCss += `  ${genColorVariableName(name)}: ${value.base};\n`)

    const variants = keys(value)
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

export function genVariations (name: string, value: ColorInt): Record<string, string> {
  const values: Record<string, string> = {
    base: intToHex(value),
  }

  for (let i = 5; i > 0; --i) {
    values[`lighten${i}`] = intToHex(lighten(value, i))
  }

  for (let i = 1; i <= 4; ++i) {
    values[`darken${i}`] = intToHex(darken(value, i))
  }

  return values
}

export function lighten (value: ColorInt, amount: number): ColorInt {
  const lab = LAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] + amount * 10
  return sRGB.fromXYZ(LAB.toXYZ(lab))
}

export function darken (value: ColorInt, amount: number): ColorInt {
  const lab = LAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] - amount * 10
  return sRGB.fromXYZ(LAB.toXYZ(lab))
}
