// Types
import type { StyleValue } from 'vue'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { IconValue } from '@/composables/icons.types'
import type { Variant } from '@/composables/variant.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, ValueComparator } from '@/util/shared.types'

export type VChipGroupSlots = {
  default: {
    isSelected: (id: string) => boolean
    select: (id: string, value: boolean) => void
    next: () => void
    prev: () => void
    selected: readonly string[]
  }
}

export interface VChipGroupProps {
  baseColor?: string
  centerActive?: boolean
  class?: any
  color?: string
  column?: boolean
  contentClass?: any
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  filter?: boolean
  gap?: string | number
  mandatory?: boolean | 'force'
  max?: number
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  modelValue?: any
  multiple?: boolean
  nextIcon?: IconValue
  padding?: string | number | (string | number)[]
  prevIcon?: IconValue
  scrollDistance?: string | number
  scrollSnap?: 'start' | 'end' | 'center'
  scrollToActive?: boolean
  selectedClass?: string
  showArrows?: string | boolean
  style?: StyleValue
  symbol?: any
  tag?: string | JSXComponent
  theme?: string
  valueComparator?: ValueComparator
  variant?: Variant
}

type VChipGroupDefaultKeys =
  | 'centerActive'
  | 'column'
  | 'direction'
  | 'disabled'
  | 'filter'
  | 'mobile'
  | 'modelValue'
  | 'multiple'
  | 'nextIcon'
  | 'prevIcon'
  | 'scrollDistance'
  | 'scrollToActive'
  | 'selectedClass'
  | 'style'
  | 'symbol'
  | 'tag'
  | 'valueComparator'
  | 'variant'

export declare const VChipGroup: VuetifyComponent<
  VChipGroupProps,
  VChipGroupDefaultKeys,
  {
    'update:modelValue': (value: any) => true
  },
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VChipGroupSlots,
  ) => GenericProps<typeof props, typeof slots>
>
export type VChipGroup = InstanceType<typeof VChipGroup>

export {}
