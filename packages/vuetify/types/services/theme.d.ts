export interface Theme {
  dark: boolean
  disable: boolean
  default: string | false
  options: {
    /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script */
    cspNonce?: string | null
    customProperties?: boolean
    minifyTheme?: ((css: string) => string) | null
    themeCache?: VuetifyThemeCache
  }
  themes: {
    dark: Partial<VuetifyThemeVariant>
    light: Partial<VuetifyThemeVariant>
  }
}

export interface VuetifyThemes {
  dark: VuetifyThemeVariant
  light: VuetifyThemeVariant
}

export interface VuetifyThemeVariant {
  [name: string]: VuetifyThemeItem | string | number | undefined

  primary: VuetifyThemeItem
  secondary: VuetifyThemeItem
  accent: VuetifyThemeItem
  info: VuetifyThemeItem
  warning: VuetifyThemeItem
  error: VuetifyThemeItem
  success: VuetifyThemeItem
  anchor?: string | number
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

export type VuetifyThemeItem = Partial<VuetifyParsedThemeItem> | string | number | undefined
