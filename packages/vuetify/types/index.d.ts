import Vue, { Component, PluginFunction, VueConstructor, DirectiveOptions } from 'vue'
import './lib'
import './alacarte'
import './colors'

// Services
import { Application } from './services/application'
import { Breakpoint } from './services/breakpoint'
import { Icons } from './services/icons'
import { Lang } from './services/lang'
import { Theme } from './services/theme'

// Service Options
import { GoToOptions } from './services/goto'
import { VuetifyPreset } from './presets'

declare const Vuetify: Vuetify
export default Vuetify
export interface Vuetify {
  install: PluginFunction<VuetifyUseOptions>
  version: string
  framework: Framework
  new (preset?: Partial<VuetifyPreset>): Vuetify
}

export type ComponentOrPack = Component & {
  $_vuetify_subcomponents?: Record<string, ComponentOrPack>
}

export interface VuetifyUseOptions {
  transitions?: Record<string, VueConstructor>
  directives?: Record<string, DirectiveOptions>
  components?: Record<string, ComponentOrPack>
}

export interface Framework {
  readonly breakpoint: Breakpoint
  readonly goTo: <T extends string | number | HTMLElement | Vue>(target: T, options?: GoToOptions) => Promise<T>
  application: Application
  theme: Theme
  icons: Icons
  lang: Lang
  rtl: boolean
}

declare module 'vue/types/vue' {
  export interface Vue {
    $vuetify: Framework
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
    vuetify?: Vuetify
  }
}
