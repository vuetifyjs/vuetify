/* eslint-disable local-rules/sort-imports */

import 'vue/jsx'
import type { UnwrapNestedRefs, VNodeChild } from 'vue'

// These already exist in scope in the final bundle
// @skip-build
import type {
  DateInstance,
  DefaultsInstance,
  DisplayInstance,
  IconOptions,
  LocaleInstance,
  RtlInstance,
  ThemeInstance,
} from './framework'

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      $children: {}
    }
  }
}

declare module 'vue' {
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
  export interface HTMLAttributes {
    $children?: VNodeChild
  }
  export interface SVGAttributes {
    $children?: VNodeChild
  }
  export interface GlobalComponents {
    // @generate-components
  }
}
