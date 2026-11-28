// Types
import type { StyleValue } from 'vue'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VStepperWindowItemProps {
  class?: any
  disabled?: boolean
  eager?: boolean
  reverseTransition?: string | boolean
  selectedClass?: string
  style?: StyleValue
  transition?: string | boolean
  value?: any
}

type VStepperWindowItemDefaultKeys =
  | 'disabled'
  | 'eager'
  | 'reverseTransition'
  | 'style'
  | 'transition'

export declare const VStepperWindowItem: VuetifyComponent<
  VStepperWindowItemProps,
  VStepperWindowItemDefaultKeys,
  Record<string, any>
>
export type VStepperWindowItem = InstanceType<typeof VStepperWindowItem>

export {}
