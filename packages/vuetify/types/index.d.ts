import Vue, { Component, PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions } from 'vue'
import './lib'
import './alacarte'
import './colors'

// Services
import { Application } from '../src/services/application'
import { Breakpoint } from '../src/services/breakpoint'
import { Goto } from '../src/services/goto'
import { Icons } from '../src/services/icons'
import { Lang } from '../src/services/lang'
import { Theme } from '../src/services/theme'

// Service Options
import { VuetifyBreakpointOptions } from './services/breakpoint'
import { VuetifyGoToOptions } from './services/goto'
import { VuetifyIconOptions } from './services/icons'
import { VuetifyLangOptions } from './services/lang'
import { VuetifyThemeOptions } from './services/theme'
import { VuetifyPreset } from './presets'

declare const Vuetify: Vuetify
export default Vuetify
export interface Vuetify {
  new (preset?: Partial<VuetifyPreset>): Vuetify;
  install: PluginFunction<VuetifyUseOptions>
  version: string
}

export type ComponentOrPack = Component & {
  $_vuetify_subcomponents?: Record<string, ComponentOrPack>
}

export interface VuetifyUseOptions {
  transitions?: Record<string, VueConstructor>
  directives?: Record<string, DirectiveOptions>
  components?: Record<string, ComponentOrPack>
}

export interface VuetifyObject extends Vue {
  readonly breakpoint: InstanceType<typeof Breakpoint>
  readonly goTo: <T extends string | number | HTMLElement | Vue>(target: T, options?: VuetifyGoToOptions) => Promise<T>
  application: InstanceType<typeof Application>
  theme: InstanceType<typeof Theme>
  icons: InstanceType<typeof Icons>
  lang: InstanceType<typeof Lang>
  rtl: boolean
}

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: VuetifyObject
  }
}

declare module 'vue/types/options' {
  export interface ComponentOptions<
    V extends Vue,
    Data=DefaultData<V>,
    Methods=DefaultMethods<V>,
    Computed=DefaultComputed,
    PropsDef=PropsDefinition<DefaultProps>,
    Props=DefaultProps> {
    vuetify?: any
  }
}
