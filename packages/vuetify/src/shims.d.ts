import type { ComponentPublicInstance, FunctionalComponent, VNodeChild } from 'vue'

// @skip-build
import type { DefaultsInstance, DisplayInstance, IconOptions, LocaleInstance, RtlInstance, ThemeInstance } from './framework'

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      $children: {}
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

declare module '@vue/runtime-dom' {
  export interface HTMLAttributes {
    $children?: VNodeChild
  }
  export interface SVGAttributes {
    $children?: VNodeChild
  }
}

declare module '@vue/runtime-core' {
  interface Vuetify {
    defaults: DefaultsInstance
    display: DisplayInstance
    theme: ThemeInstance
    icons: IconOptions
    locale: LocaleInstance & RtlInstance
  }

  export interface ComponentCustomProperties {
    $vuetify: Vuetify
  }

  export interface GlobalComponents {
    // @generate-components
  }
}
