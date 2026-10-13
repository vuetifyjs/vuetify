// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VLayoutItemProps {
  absolute?: boolean
  class?: any
  modelValue?: boolean
  name?: string
  order?: string | number
  position: 'top' | 'left' | 'right' | 'bottom'
  size?: string | number
  style?: StyleValue
}

export type VLayoutItemDefaultKeys =
  | 'absolute'
  | 'modelValue'
  | 'order'
  | 'size'
  | 'style'

export declare const VLayoutItem: VuetifyComponent<
  VLayoutItemProps,
  VLayoutItemDefaultKeys,
  Record<string, any>
>
export type VLayoutItem = InstanceType<typeof VLayoutItem>
