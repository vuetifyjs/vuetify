// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { GroupProvide } from '@/composables/group.types'
import type { Variant } from '@/composables/variant.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VBtnToggleSlots = {
  default: DefaultBtnToggleSlot
}

export interface DefaultBtnToggleSlot extends Pick<GroupProvide, BtnToggleSlotProps> {}

export type BtnToggleSlotProps = 'isSelected' | 'select' | 'selected' | 'next' | 'prev'

export interface VBtnToggleProps {
  baseColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  connected?: boolean
  density?: Density
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  divided?: boolean
  elevation?: string | number
  hoverElevation?: string | number
  mandatory?: boolean | 'force'
  max?: number
  modelValue?: any
  multiple?: boolean
  rounded?: string | number | boolean
  selectedClass?: string
  size?: string | number
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  variant?: Variant
}

type VBtnToggleDefaultKeys =
  | 'connected'
  | 'density'
  | 'direction'
  | 'disabled'
  | 'divided'
  | 'modelValue'
  | 'multiple'
  | 'rounded'
  | 'size'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export declare const VBtnToggle: VuetifyComponent<
  VBtnToggleProps,
  VBtnToggleDefaultKeys,
  {
    'update:modelValue': (value: any) => true
  },
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VBtnToggleSlots,
  ) => GenericProps<typeof props, typeof slots>,
  { next: () => void, prev: () => void, select: (id: string, value: boolean) => void }
>
export type VBtnToggle = InstanceType<typeof VBtnToggle>

export {}
