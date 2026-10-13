// Types
import type { StyleValue } from 'vue'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VItemGroupSlots = {
  default: {
    isSelected: (id: string) => boolean
    select: (id: string, value: boolean) => void
    next: () => void
    prev: () => void
    selected: readonly string[]
  }
}

export interface VItemGroupProps {
  class?: any
  disabled?: boolean
  mandatory?: boolean | 'force'
  max?: number
  modelValue?: any
  multiple?: boolean
  selectedClass?: string
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
}

export type VItemGroupDefaultKeys =
  | 'disabled'
  | 'modelValue'
  | 'multiple'
  | 'selectedClass'
  | 'style'
  | 'tag'

export declare const VItemGroup: VuetifyComponent<
  VItemGroupProps,
  VItemGroupDefaultKeys,
  {
    'update:modelValue': (value: any) => true
  },
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VItemGroupSlots,
  ) => GenericProps<typeof props, typeof slots>
>
export type VItemGroup = InstanceType<typeof VItemGroup>
