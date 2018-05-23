import Vue, { PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions } from 'vue'
import { VuetifyLanguage } from './lang'
import './alacarte'

declare const Vuetify: Vuetify
export default Vuetify
export interface Vuetify {
  install: PluginFunction<VuetifyUseOptions>
  version: string
}

export interface VuetifyUseOptions {
  transitions?: VueConstructor
  directives?: DirectiveOptions | DirectiveFunction
  components?: PluginObject<any> | PluginFunction<any>
  /** @see https://vuetifyjs.com/style/theme */
  theme?: Partial<VuetifyTheme> | false
  /**
   * Select a base icon font to use. Note that none of these are included, you must install them yourself
   *
   * md: <a href="https://material.io/icons">material.io</a> (default)
   * mdi: <a href="https://materialdesignicons.com">MDI</a>
   * fa: <a href="https://fontawesome.com/get-started/web-fonts-with-css">FontAwesome 5</a>
   * fa4: <a href="">FontAwesome 4</a> TODO: link
   */
  iconfont?: 'md' | 'mdi' | 'fa' | 'fa4' // TODO: camelCase
  /**
   * Override specific icon names. You can also specify your own custom ones that can then be accessed from v-icon
   *
   * @example &lt;v-icon&gt;$vuetify.icons.(name)&lt;/v-icon&gt;
   */
  icons?: Partial<VuetifyIcons>
  /** @see https://vuetifyjs.com/style/theme#options */
  options?: Partial<VuetifyOptions>
  lang?: Partial<Pick<VuetifyLanguage, 'locales' | 'current'>>
}

export interface VuetifyObject extends Vue {
  readonly breakpoint: VuetifyBreakpoint
  readonly dark: boolean
  application: VuetifyApplication
  theme: VuetifyTheme | false
  icons: VuetifyIcons
  lang: VuetifyLanguage
  options: VuetifyOptions
  goTo: <T extends string | number | HTMLElement | Vue>(target: T, options?: VuetifyGoToOptions) => Promise<T>
  t: VuetifyLanguage['t']
}

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: VuetifyObject
  }
}

export interface VuetifyIcons {
  [name: string]: string

  cancel: string
  close: string
  delete: string
  clear: string
  success: string
  info: string
  warning: string
  error: string
  prev: string
  next: string
  checkboxOn: string
  checkboxOff: string
  checkboxIndeterminate: string
  delimiter: string
  sort: string
  expand: string
  menu: string
  subgroup: string
  dropdown: string
  radioOn: string
  radioOff: string
  edit: string
}

export interface VuetifyApplication {
  bar: number
  bottom: number
  left: number
  right: number
  top: number
}

export interface VuetifyBreakpoint {
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

export type VuetifyThemeItem = string | number

export interface VuetifyTheme {
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
  get: (parsedTheme: VuetifyTheme) => string | null
  set: (parsedTheme: VuetifyTheme, css: string) => void
}

export interface VuetifyOptions {
  themeVariations: string[]
  minifyTheme: ((css: string) => string) | null
  themeCache: VuetifyThemeCache | null
  /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script */
  cspNonce: string | null
}

export type VuetifyGoToEasing =
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

export interface VuetifyGoToOptions {
  duration?: number
  offset?: number
  easing?: VuetifyGoToEasing
}
