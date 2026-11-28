// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VProgressCircularSlots = {
  default: { value: number }
}

export interface VProgressCircularProps {
  bgColor?: string
  class?: any
  color?: string
  indeterminate?: boolean | 'disable-shrink'
  modelValue?: string | number
  reveal?: boolean | { duration?: number | undefined }
  rotate?: string | number
  rounded?: boolean
  shape?: 'flat' | 'wavy'
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  transition?: boolean | { duration?: string | number | undefined }
  variant?: 'split'
  width?: string | number
}

type VProgressCircularDefaultKeys =
  | 'modelValue'
  | 'reveal'
  | 'rotate'
  | 'rounded'
  | 'shape'
  | 'size'
  | 'style'
  | 'tag'
  | 'transition'
  | 'variant'
  | 'width'

export declare const VProgressCircular: VuetifyComponent<
  VProgressCircularProps,
  VProgressCircularDefaultKeys,
  Record<string, any>,
  VProgressCircularSlots
>
export type VProgressCircular = InstanceType<typeof VProgressCircular>

export {}
