// Types
import type { StyleValue } from 'vue'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VIconBtnSizes = 'x-small' | 'small' | 'default' | 'large' | 'x-large'

export type VIconBtnSlots = {
  default: never
  loader: never
}

export interface VIconBtnProps {
  active?: boolean
  activeColor?: string
  activeIcon?: IconValue
  activeVariant?: Variant
  baseVariant?: Variant
  border?: string | number | boolean
  class?: any
  color?: string
  disabled?: boolean
  elevation?: string | number
  height?: string | number
  hideOverlay?: boolean
  hoverElevation?: string | number
  icon?: IconValue
  iconColor?: string
  iconSize?: string | number
  iconSizes?: [VIconBtnSizes, number][]
  loading?: boolean
  opacity?: string | number
  readonly?: boolean
  rotate?: string | number
  rounded?: string | number | boolean
  size?: string | number
  sizes?: [VIconBtnSizes, number][]
  style?: StyleValue
  tag?: string | JSXComponent
  text?: string | number | boolean
  theme?: string
  tile?: boolean
  variant?: Variant
  width?: string | number
}

export type VIconBtnDefaultKeys =
  | 'active'
  | 'baseVariant'
  | 'disabled'
  | 'hideOverlay'
  | 'iconSizes'
  | 'loading'
  | 'readonly'
  | 'rounded'
  | 'size'
  | 'sizes'
  | 'style'
  | 'tag'
  | 'text'
  | 'tile'
  | 'variant'

export declare const VIconBtn: VuetifyComponent<
  VIconBtnProps,
  VIconBtnDefaultKeys,
  {
    'update:active': (value: boolean) => true
  },
  VIconBtnSlots
>
export type VIconBtn = InstanceType<typeof VIconBtn>
