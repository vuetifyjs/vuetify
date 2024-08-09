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
interface _GlobalComponents {
  // @generate-components
}
declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
  export interface GlobalComponents extends _GlobalComponents {}
}

declare module '@vue/runtime-dom' {
  export interface HTMLAttributes {
    $children?: VNodeChild
  }
  export interface SVGAttributes {
    $children?: VNodeChild
  }
  export interface GlobalComponents extends _GlobalComponents {}
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
  export interface GlobalComponents extends _GlobalComponents {}
}
