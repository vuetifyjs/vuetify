// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VFieldLabelProps {
  class?: any
  floating?: boolean
  style?: StyleValue
}

export type VFieldLabelDefaultKeys =
  | 'floating'
  | 'style'

export declare const VFieldLabel: VuetifyComponent<
  VFieldLabelProps,
  VFieldLabelDefaultKeys,
  Record<string, any>
>
export type VFieldLabel = InstanceType<typeof VFieldLabel>
