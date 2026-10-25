// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VDividerProps {
  class?: any
  color?: string
  contentOffset?: string | number | (string | number)[]
  gradient?: boolean
  inset?: boolean
  length?: string | number
  opacity?: string | number
  style?: StyleValue
  theme?: string
  thickness?: string | number
  variant?: 'dotted' | 'dashed' | 'solid' | 'double'
  vertical?: boolean
}

type VDividerDefaultKeys =
  | 'gradient'
  | 'inset'
  | 'style'
  | 'variant'
  | 'vertical'

export declare const VDivider: VuetifyComponent<
  VDividerProps,
  VDividerDefaultKeys,
  Record<string, any>
>
export type VDivider = InstanceType<typeof VDivider>

export {}
