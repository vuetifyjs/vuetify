// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VColProps {
  alignSelf?: 'start' | 'end' | 'center' | 'auto' | 'baseline' | 'stretch'
  class?: any
  cols?: string | number | boolean
  lg?: string | number | boolean
  md?: string | number | boolean
  offset?: string | number
  offsetLg?: string | number
  offsetMd?: string | number
  offsetSm?: string | number
  offsetXl?: string | number
  offsetXxl?: string | number
  order?: string | number
  orderLg?: string | number
  orderMd?: string | number
  orderSm?: string | number
  orderXl?: string | number
  orderXxl?: string | number
  sm?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  xl?: string | number | boolean
  xxl?: string | number | boolean
}

type VColDefaultKeys =
  | 'alignSelf'
  | 'cols'
  | 'lg'
  | 'md'
  | 'offset'
  | 'offsetLg'
  | 'offsetMd'
  | 'offsetSm'
  | 'offsetXl'
  | 'offsetXxl'
  | 'order'
  | 'orderLg'
  | 'orderMd'
  | 'orderSm'
  | 'orderXl'
  | 'orderXxl'
  | 'sm'
  | 'style'
  | 'tag'
  | 'xl'
  | 'xxl'

export declare const VCol: VuetifyComponent<
  VColProps,
  VColDefaultKeys,
  Record<string, any>
>
export type VCol = InstanceType<typeof VCol>

export {}
