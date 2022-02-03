import type { ComponentPublicInstance, FunctionalComponent } from 'vue'

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      $children
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

declare module '@vue/runtime-dom' {
  import type { VNodeChild } from '@vue/runtime-core'

  export interface HTMLAttributes {
    $children?: VNodeChild
  }
  export interface SVGAttributes {
    $children?: VNodeChild
  }
}

declare module '@vue/runtime-core' {
  // @skip-build
  import type { DefaultsInstance, DisplayInstance, IconOptions, LocaleAdapter, RtlInstance, ThemeInstance } from './framework'

  interface Vuetify {
    defaults: DefaultsInstance
    display: DisplayInstance
    theme: ThemeInstance
    icons: IconOptions
    locale: LocaleAdapter
    rtl: RtlInstance
  }

  export interface ComponentCustomProperties {
    $vuetify: Vuetify
  }

  export interface GlobalComponents {
    // @generate-components
  }
}
