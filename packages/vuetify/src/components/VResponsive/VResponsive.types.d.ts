// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VResponsiveSlots = {
  default: never
  additional: never
}

export interface VResponsiveProps {
  aspectRatio?: string | number
  class?: any
  contentClass?: any
  height?: string | number
  inline?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  style?: StyleValue
  width?: string | number
}

type VResponsiveDefaultKeys =
  | 'inline'
  | 'style'

export declare const VResponsive: VuetifyComponent<
  VResponsiveProps,
  VResponsiveDefaultKeys,
  Record<string, any>,
  VResponsiveSlots
>
export type VResponsive = InstanceType<typeof VResponsive>

export {}
