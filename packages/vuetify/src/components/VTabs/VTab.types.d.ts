// Types
import type { StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { VBtn, VBtnSlots } from '@/components/VBtn/VBtn.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VTabProps {
  activeColor?: string
  appendIcon?: IconValue
  baseColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  elevation?: string | number
  exact?: boolean
  fixed?: boolean
  height?: string | number
  hideSlider?: boolean
  hoverElevation?: string | number
  href?: string
  icon?: boolean | IconValue
  inset?: boolean
  loading?: string | boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  prependIcon?: IconValue
  readonly?: boolean
  replace?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  selectedClass?: string
  size?: string | number
  sliderColor?: string
  sliderTransition?: 'shift' | 'grow' | 'fade'
  sliderTransitionDuration?: string | number
  sliderVariant?: 'primary' | 'secondary'
  slim?: boolean
  spaced?: 'start' | 'end' | 'both'
  stacked?: boolean
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string | number | boolean
  theme?: string
  tile?: boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  value?: any
  variant?: Variant
  width?: string | number
}

export type VTabDefaultKeys =
  | 'density'
  | 'direction'
  | 'disabled'
  | 'exact'
  | 'fixed'
  | 'hideSlider'
  | 'inset'
  | 'readonly'
  | 'replace'
  | 'ripple'
  | 'rounded'
  | 'selectedClass'
  | 'size'
  | 'sliderVariant'
  | 'slim'
  | 'stacked'
  | 'style'
  | 'tag'
  | 'text'
  | 'tile'
  | 'variant'

export declare const VTab: VuetifyComponent<
  VTabProps,
  VTabDefaultKeys,
  Record<string, any>,
  VBtnSlots,
  ForwardRefs<{}, [VBtn]>
>
export type VTab = InstanceType<typeof VTab>
