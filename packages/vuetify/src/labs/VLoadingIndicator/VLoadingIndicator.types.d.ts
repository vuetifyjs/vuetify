// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export interface VLoadingIndicatorProps {
  class?: any
  color?: string
  contained?: boolean
  shapeSize?: string | number
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
}

export type VLoadingIndicatorDefaultKeys =
  | 'contained'
  | 'size'
  | 'style'
  | 'tag'

export declare const VLoadingIndicator: VuetifyComponent<
  VLoadingIndicatorProps,
  VLoadingIndicatorDefaultKeys,
  Record<string, any>
>
export type VLoadingIndicator = InstanceType<typeof VLoadingIndicator>
