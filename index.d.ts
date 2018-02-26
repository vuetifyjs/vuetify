import 'vuetify/src/util/helpers'
import 'vuetify/src/util/colors'
import Vue, { PluginFunction } from 'vue'

declare class Vuetify {
  static install: PluginFunction<never>
}

declare interface VuetifyApplication {
  bar: number
  bottom: number
  left: number
  right: number
  top: number
}

declare interface VuetifyBreakpoint {
  height: number
  lg: boolean
  lgAndDown: boolean
  lgAndUp: boolean
  lgOnly: boolean
  md: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  mdOnly: boolean
  name: string
  sm: boolean
  smAndDown: boolean
  smAndUp: boolean
  smOnly: boolean
  width: number
  xl: boolean
  xlOnly: boolean
  xs: boolean
  xsOnly: boolean
}

declare interface VuetifyTheme {
  primary: VuetifyThemeItem
  accent: VuetifyThemeItem
  secondary: VuetifyThemeItem
  info: VuetifyThemeItem
  warning: VuetifyThemeItem
  error: VuetifyThemeItem
  success: VuetifyThemeItem

  [name: string]: VuetifyThemeItem
}

declare type VuetifyThemeItem = string | number

declare interface VuetifyThemeCache {
  get: (parsedTheme: VuetifyTheme) => string | null
  set: (parsedTheme: VuetifyTheme, css: string) => void
}

declare interface VuetifyOptions {
  themeVariations?: string[]
  minifyTheme?: (css: string) => string
  themeCache?: VuetifyThemeCache
}

declare type VuetifyGoToEasing =
  ((t: number) => number) |
  'linear' |
  'easeInQuad' |
  'easeOutQuad' |
  'easeInOutQuad' |
  'easeInCubic' |
  'easeOutCubic' |
  'easeInOutCubic' |
  'easeInQuart' |
  'easeOutQuart' |
  'easeInOutQuart' |
  'easeInQuint' |
  'easeOutQuint' |
  'easeInOutQuint'

declare interface VuetifyGoToOptions {
  duration?: number
  offset?: number
  easing?: VuetifyGoToEasing
}

declare interface VuetifyObject {
  application: VuetifyApplication
  breakpoint: VuetifyBreakpoint
  dark: boolean
  theme: VuetifyTheme
  options: VuetifyOptions
  goTo: (target: string | number | HTMLElement | Vue, options?: VuetifyGoToOptions) => void
}

declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: VuetifyObject
  }
}

export default Vuetify
