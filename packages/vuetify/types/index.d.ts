import Vue, { Component, PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions } from 'vue'
import { VuetifyLangOptions as VuetifyLanguage } from './services/lang'
import './lib'
import './alacarte'
import './colors'
import { VuetifyThemeOptions } from 'vuetify/types/services/theme'

declare const Vuetify: Vuetify
export default Vuetify
export interface Vuetify {
  install: PluginFunction<VuetifyUseOptions>
  version: string
}

export type ComponentOrPack = Component & { $_vuetify_subcomponents?: Record<string, ComponentOrPack> }

export interface VuetifyUseOptions {
  transitions?: Record<string, VueConstructor>
  directives?: Record<string, DirectiveOptions>
  components?: Record<string, ComponentOrPack>
}

export interface VuetifyObject extends Vue {
  readonly breakpoint: Readonly<VuetifyBreakpoint>
  readonly goTo: <T extends string | number | HTMLElement | Vue>(target: T, options?: VuetifyGoToOptions) => Promise<T>
  application: VuetifyApplication
  dark: boolean
  icons: VuetifyIcons
  lang: VuetifyLanguage
  rtl: boolean
  theme: VuetifyThemeOptions
}

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: VuetifyObject
  }
}

export type VuetifyIconComponent = {
  component: Component | string
  props?: object
}
export type VuetifyIcon = string | VuetifyIconComponent

export interface VuetifyIcons {
  [name: string]: VuetifyIcon

  complete: VuetifyIcon
  cancel: VuetifyIcon
  close: VuetifyIcon
  delete: VuetifyIcon
  clear: VuetifyIcon
  success: VuetifyIcon
  info: VuetifyIcon
  warning: VuetifyIcon
  error: VuetifyIcon
  prev: VuetifyIcon
  next: VuetifyIcon
  checkboxOn: VuetifyIcon
  checkboxOff: VuetifyIcon
  checkboxIndeterminate: VuetifyIcon
  delimiter: VuetifyIcon
  sort: VuetifyIcon
  expand: VuetifyIcon
  menu: VuetifyIcon
  subgroup: VuetifyIcon
  dropdown: VuetifyIcon
  radioOn: VuetifyIcon
  radioOff: VuetifyIcon
  edit: VuetifyIcon
  ratingEmpty: VuetifyIcon
  ratingFull: VuetifyIcon
  ratingHalf: VuetifyIcon
}

export interface VuetifyApplication {
  bar: number
  bottom: number
  footer: number
  left: number
  right: number
  top: number
  register (uid: number, target: string, value: number): void
  unregister (uid: number, target: string): void
  update (target: string): void
}

export interface VuetifyBreakpointThresholds {
  xs: number
  sm: number
  md: number
  lg: number
}

export interface VuetifyBreakpointOptions {
  thresholds: VuetifyBreakpointThresholds
  scrollbarWidth: number
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
  thresholds: VuetifyBreakpointThresholds
  scrollbarWidth: number
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
