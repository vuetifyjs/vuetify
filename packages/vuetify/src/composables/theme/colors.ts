// Utilities
import {
  createRange,
  darken,
  getLuma,
  lighten,
  mergeDeep,
  parseColor,
  RGBtoHex,
} from '@/util'

// Types
import type { Color } from '@/util'

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

export interface Colors extends BaseColors, OnColors {
  [key: string]: Color
}

interface BaseColors {
  background: Color
  surface: Color
  primary: Color
  secondary: Color
  success: Color
  warning: Color
  error: Color
  info: Color
}

interface OnColors {
  'on-background': Color
  'on-surface': Color
  'on-primary': Color
  'on-secondary': Color
  'on-success': Color
  'on-warning': Color
  'on-error': Color
  'on-info': Color
}

export interface VariationsOptions {
  colors: string[]
  lighten: number
  darken: number
}

export interface InternalThemeDefinition {
  dark: boolean
  colors: Colors
  variables: Record<string, string | number>
}

export type ThemeDefinition = DeepPartial<InternalThemeDefinition>

export interface InternalThemeOptions {
  cspNonce?: string
  isDisabled: boolean
  defaultTheme: 'light' | 'dark' | 'system' | string & {}
  prefix: string
  variations: false | VariationsOptions
  themes: Record<string, InternalThemeDefinition>
  stylesheetId: string
  scope?: string
  scoped: boolean
  utilities: boolean
}

export type ThemeOptions = false | {
  cspNonce?: string
  defaultTheme?: 'light' | 'dark' | 'system' | string & {}
  variations?: false | VariationsOptions
  themes?: Record<string, ThemeDefinition>
  stylesheetId?: string
  scope?: string
  utilities?: boolean
}

export function genDefaults () {
  return {
    defaultTheme: 'system',
    prefix: 'v-',
    variations: { colors: [], lighten: 0, darken: 0 },
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-bright': '#FFFFFF',
          'surface-light': '#EEEEEE',
          'surface-variant': '#424242',
          'on-surface-variant': '#EEEEEE',
          primary: '#1867C0',
          'primary-darken-1': '#1F5592',
          secondary: '#48A9A6',
          'secondary-darken-1': '#018786',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        variables: {
          'border-color': '#000000',
          'border-opacity': 0.12,
          'shadow-color': '#000000',
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 0.60,
          'disabled-opacity': 0.38,
          'idle-opacity': 0.04,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.12,
          'dragged-opacity': 0.08,
          'theme-kbd': '#EEEEEE',
          'theme-on-kbd': '#000000',
          'theme-code': '#F5F5F5',
          'theme-on-code': '#000000',
          'theme-on-dark': '#FFF',
          'theme-on-light': '#000',
          'elevation-overlay-color': 'black',
          'elevation-overlay-opacity-step': '2%',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#212121',
          'surface-bright': '#ccbfd6',
          'surface-light': '#424242',
          'surface-variant': '#c8c8c8',
          'on-surface-variant': '#000000',
          primary: '#2196F3',
          'primary-darken-1': '#277CC1',
          secondary: '#54B6B2',
          'secondary-darken-1': '#48A9A6',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        variables: {
          'border-color': '#FFFFFF',
          'border-opacity': 0.12,
          'shadow-color': '#000000',
          'high-emphasis-opacity': 1,
          'medium-emphasis-opacity': 0.70,
          'disabled-opacity': 0.50,
          'idle-opacity': 0.10,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.16,
          'dragged-opacity': 0.08,
          'theme-kbd': '#424242',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#343434',
          'theme-on-code': '#CCCCCC',
          'theme-on-dark': '#FFF',
          'theme-on-light': '#000',
          'elevation-overlay-color': 'white',
          'elevation-overlay-opacity-step': '2%',
        },
      },
    },
    stylesheetId: 'vuetify-theme-stylesheet',
    scoped: false,
    utilities: true,
  }
}

export function parseThemeOptions (options: ThemeOptions = genDefaults()): InternalThemeOptions {
  const defaults = genDefaults()

  if (!options) return { ...defaults, isDisabled: true } as any

  return mergeDeep(defaults, options) as InternalThemeOptions
}

export function genCssVariables (theme: InternalThemeDefinition, prefix: string) {
  const lightOverlay = theme.dark ? 2 : 1
  const darkOverlay = theme.dark ? 1 : 2

  const variables: string[] = []
  for (const [key, value] of Object.entries(theme.colors)) {
    const rgb = parseColor(value)
    variables.push(`--${prefix}theme-${key}: ${rgb.r},${rgb.g},${rgb.b}` + (rgb.a == null ? '' : `,${rgb.a}`))
    if (!key.startsWith('on-')) {
      variables.push(`--${prefix}theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`)
    }
  }

  for (const [key, value] of Object.entries(theme.variables)) {
    const color = typeof value === 'string' && value.startsWith('#') ? parseColor(value) : undefined
    const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined
    variables.push(`--${prefix}${key}: ${rgb ?? value}`)
  }

  return variables
}

function genVariation (name: string, color: Color, variations: VariationsOptions | false) {
  const object: Record<string, string> = {}
  if (variations) {
    for (const variation of (['lighten', 'darken'] as const)) {
      const fn = variation === 'lighten' ? lighten : darken
      for (const amount of createRange(variations[variation], 1)) {
        object[`${name}-${variation}-${amount}`] = RGBtoHex(fn(parseColor(color), amount))
      }
    }
  }
  return object
}

export function genVariations (colors: InternalThemeDefinition['colors'], variations: VariationsOptions | false) {
  if (!variations) return {}

  let variationColors = {}
  for (const name of variations.colors) {
    const color = colors[name]

    if (!color) continue

    variationColors = {
      ...variationColors,
      ...genVariation(name, color, variations),
    }
  }
  return variationColors
}
