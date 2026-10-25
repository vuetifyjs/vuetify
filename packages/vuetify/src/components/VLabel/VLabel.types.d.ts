// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VLabelProps {
  class?: any
  onClick?: ((args_0: MouseEvent) => void)
  style?: StyleValue
  text?: string
  theme?: string
}

type VLabelDefaultKeys =
  | 'style'

export declare const VLabel: VuetifyComponent<
  VLabelProps,
  VLabelDefaultKeys,
  Record<string, any>
>
export type VLabel = InstanceType<typeof VLabel>

export {}
