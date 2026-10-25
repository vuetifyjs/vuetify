// Types
import type { Component, StyleValue, TransitionProps } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VFabProps {
  absolute?: boolean
  active?: boolean
  activeColor?: string
  app?: boolean
  appear?: boolean
  appendIcon?: IconValue
  baseColor?: string
  block?: boolean
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  exact?: boolean
  extended?: boolean
  flat?: boolean
  height?: string | number
  hoverElevation?: string | number
  href?: string
  icon?: boolean | IconValue
  layout?: boolean
  loading?: string | boolean
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: boolean
  name?: string
  offset?: boolean
  order?: string | number
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prependIcon?: IconValue
  readonly?: boolean
  replace?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  selectedClass?: string
  size?: string | number
  slim?: boolean
  stacked?: boolean
  style?: StyleValue
  symbol?: any
  tag?: string | JSXComponent
  text?: string | number | boolean
  theme?: string
  tile?: boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  value?: any
  variant?: Variant
  width?: string | number
}

type VFabDefaultKeys =
  | 'absolute'
  | 'active'
  | 'app'
  | 'appear'
  | 'block'
  | 'density'
  | 'disabled'
  | 'exact'
  | 'extended'
  | 'flat'
  | 'layout'
  | 'modelValue'
  | 'offset'
  | 'order'
  | 'readonly'
  | 'replace'
  | 'ripple'
  | 'rounded'
  | 'size'
  | 'slim'
  | 'stacked'
  | 'style'
  | 'symbol'
  | 'tag'
  | 'text'
  | 'tile'
  | 'transition'
  | 'variant'

export declare const VFab: VuetifyComponent<
  VFabProps,
  VFabDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
  }
>
export type VFab = InstanceType<typeof VFab>

export {}
