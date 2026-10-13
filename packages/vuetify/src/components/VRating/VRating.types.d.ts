// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VRatingSlots = {
  item: VRatingItemSlot
  'item-label': VRatingItemLabelSlot
}

export type VRatingItemSlot = {
  value: number
  index: number
  isFilled: boolean
  isHovered: boolean
  icon: IconValue
  color?: string
  activeColor?: string
  props: Record<string, unknown>
  rating: number
}

export type VRatingItemLabelSlot = {
  value: number
  index: number
  label?: string
}

export interface VRatingProps {
  activeColor?: string
  class?: any
  clearable?: boolean
  color?: string
  density?: Density
  disabled?: boolean
  emptyIcon?: IconValue
  fullIcon?: IconValue
  halfIncrements?: boolean
  hover?: boolean
  iconSize?: string | number
  itemAriaLabel?: string
  itemLabelPosition?: string
  itemLabels?: string[]
  length?: string | number
  modelValue?: string | number
  name?: string
  readonly?: boolean
  ripple?: boolean
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
}

export type VRatingDefaultKeys =
  | 'clearable'
  | 'density'
  | 'disabled'
  | 'emptyIcon'
  | 'fullIcon'
  | 'halfIncrements'
  | 'hover'
  | 'itemAriaLabel'
  | 'itemLabelPosition'
  | 'length'
  | 'modelValue'
  | 'readonly'
  | 'ripple'
  | 'size'
  | 'style'
  | 'tag'

export declare const VRating: VuetifyComponent<
  VRatingProps,
  VRatingDefaultKeys,
  {
    'update:modelValue': (value: string | number) => true
  },
  VRatingSlots
>
export type VRating = InstanceType<typeof VRating>
