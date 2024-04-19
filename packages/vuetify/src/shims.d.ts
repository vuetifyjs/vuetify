/* eslint-disable local-rules/sort-imports */

import 'vue/jsx'
import type { FunctionalComponent, UnwrapNestedRefs, VNodeChild } from 'vue'

// @skip-build
import type { ComponentPublicInstance } from 'vue'

// @skip-build
import type { DateInstance, DefaultsInstance, DisplayInstance, IconOptions, LocaleInstance, RtlInstance, ThemeInstance } from './framework'

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
    display: UnwrapNestedRefs<DisplayInstance>
    theme: UnwrapNestedRefs<ThemeInstance>
    icons: IconOptions
    locale: UnwrapNestedRefs<LocaleInstance & RtlInstance>
    date: DateInstance
  }

  export interface ComponentCustomProperties {
    $vuetify: Vuetify
  }

  export interface GlobalComponents {
    // @generate-components
  }
}
