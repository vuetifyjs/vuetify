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
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  transition?: boolean | { duration?: string | number | undefined }
  width?: string | number
}

export type VProgressCircularDefaultKeys =
  | 'modelValue'
  | 'reveal'
  | 'rotate'
  | 'rounded'
  | 'size'
  | 'style'
  | 'tag'
  | 'transition'
  | 'width'

export declare const VProgressCircular: VuetifyComponent<
  VProgressCircularProps,
  VProgressCircularDefaultKeys,
  Record<string, any>,
  VProgressCircularSlots
>
export type VProgressCircular = InstanceType<typeof VProgressCircular>
