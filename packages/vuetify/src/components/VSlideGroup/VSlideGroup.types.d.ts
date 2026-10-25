// Types
import type { ComputedRef, Ref, ShallowRef, StyleValue } from 'vue'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { GroupProvide } from '@/composables/group.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VSlideGroupEdge = 'start' | 'end'

export type VSlideGroupSlots = {
  default: SlideGroupSlot
  prev: SlideGroupSlot
  next: SlideGroupSlot
}

export type VSlideGroupTarget = 'prev' | 'next'
  | { by: string | number }
  | { index: number }

export interface SlideGroupSlot {
  next: GroupProvide['next']
  prev: GroupProvide['prev']
  select: GroupProvide['select']
  isSelected: GroupProvide['isSelected']
}

export interface VSlideGroupProps {
  centerActive?: boolean
  class?: any
  contentClass?: any
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
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
}

type VSlideGroupDefaultKeys =
  | 'centerActive'
  | 'direction'
  | 'disabled'
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

export declare const VSlideGroup: VuetifyComponent<
  VSlideGroupProps,
  VSlideGroupDefaultKeys,
  {
    'update:modelValue': (value: any) => true
    edge: (side: VSlideGroupEdge) => true
  },
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VSlideGroupSlots,
  ) => GenericProps<typeof props, typeof slots>,
  { selected: Ref<readonly string[], readonly string[]>, slide: (target: VSlideGroupTarget) => void, scrollOffset: ShallowRef<number, number>, focus: (location?: 'next' | 'prev' | 'first' | 'last' | undefined) => void, hasPrev: ComputedRef<boolean>, hasNext: ComputedRef<boolean>, hasOverflow: ShallowRef<boolean, boolean> }
>
export type VSlideGroup = InstanceType<typeof VSlideGroup>

export {}
