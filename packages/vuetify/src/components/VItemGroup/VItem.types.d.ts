// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VItemSlots = {
  default: {
    isSelected: boolean | undefined
    selectedClass: boolean | (string | undefined)[] | undefined
    select: ((value: boolean) => void) | undefined
    toggle: (() => void) | undefined
    value: unknown
    disabled: boolean | undefined
  }
}

export interface VItemProps {
  disabled?: boolean
  selectedClass?: string
  value?: any
}

type VItemDefaultKeys =
  | 'disabled'

export declare const VItem: VuetifyComponent<
  VItemProps,
  VItemDefaultKeys,
  {
    'group:selected': (val: { value: boolean }) => true
  },
  VItemSlots
>
export type VItem = InstanceType<typeof VItem>

export {}
