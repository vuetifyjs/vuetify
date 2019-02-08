import { Theme } from '../../src/services/theme'

export interface VuetifyThemeService {
  new (options?: VuetifyThemeOptions): Theme
}

export interface VuetifyThemeOptions {
  options: {
    /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script */
    cspNonce?: string | null
    customProperties?: boolean
    minifyTheme?: ((css: string) => string) | null
    themeCache?: VuetifyThemeCache
  }
  dark?: boolean
  disable?: boolean
  default?: string | false
  themes?: VuetifyTheme | undefined
}

export interface VuetifyTheme {
  [name: string]: VuetifyThemeVariant
}

export interface VuetifyThemeVariant {
  [name: string]: VuetifyThemeItem

  primary: VuetifyThemeItem
  accent: VuetifyThemeItem
  secondary: VuetifyThemeItem
  info: VuetifyThemeItem
  warning: VuetifyThemeItem
  error: VuetifyThemeItem
  success: VuetifyThemeItem
}

export interface VuetifyThemeCache {
  get: (parsedTheme: VuetifyParsedTheme) => string | null
  set: (parsedTheme: VuetifyParsedTheme, css: string) => void
}

export interface VuetifyParsedTheme {
  [name: string]: VuetifyParsedThemeItem
}

export interface VuetifyParsedThemeItem {
  [name: string]: string

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
}

export type VuetifyThemeItem = VuetifyParsedThemeItem | string
