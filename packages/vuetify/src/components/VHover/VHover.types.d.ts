// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VHoverSlots = {
  default: {
    isHovering: boolean | null
    props: Record<string, unknown>
  }
}

export interface VHoverProps {
  closeDelay?: string | number
  disabled?: boolean
  modelValue?: boolean
  openDelay?: string | number
}

type VHoverDefaultKeys =
  | 'disabled'
  | 'modelValue'

export declare const VHover: VuetifyComponent<
  VHoverProps,
  VHoverDefaultKeys,
  {
    'update:modelValue': (value: boolean) => true
  },
  VHoverSlots
>
export type VHover = InstanceType<typeof VHover>

export {}
