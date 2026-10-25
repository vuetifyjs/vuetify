// Types
import type { StyleValue } from 'vue'
import type { StepperItem, StepperItemSlot } from '@/components/VStepper/VStepperItem.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { IconValue } from '@/composables/icons.types'
import type { Anchor } from '@/util/anchor.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, SelectItemKey } from '@/util/shared.types'

export type VStepperSlots = {
  actions: VStepperSlot
  default: VStepperSlot
  header: StepperItem
  'header-item': StepperItemSlot
  icon: StepperItemSlot
  title: StepperItemSlot
  subtitle: StepperItemSlot
  item: StepperItem
  prev: never
  next: never
} & {
  [key: `header-item.${string}`]: StepperItemSlot
  [key: `item.${string}`]: StepperItem
}

export type VStepperSlot = {
  prev: () => void
  next: () => void
}

export interface VStepperProps {
  altLabels?: boolean
  bgColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  completeIcon?: IconValue
  disabled?: boolean
  editable?: boolean
  editIcon?: IconValue
  elevation?: string | number
  errorIcon?: IconValue
  flat?: boolean
  height?: string | number
  hideActions?: boolean
  hoverElevation?: string | number
  itemProps?: SelectItemKey
  items?: readonly StepperItem[]
  itemTitle?: SelectItemKey
  itemValue?: SelectItemKey
  location?: Anchor | null
  mandatory?: boolean | 'force'
  max?: number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  modelValue?: any
  multiple?: boolean
  nextText?: string
  nonLinear?: boolean
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  prevText?: string
  rounded?: string | number | boolean
  selectedClass?: string
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  width?: string | number
}

type VStepperDefaultKeys =
  | 'altLabels'
  | 'disabled'
  | 'editable'
  | 'flat'
  | 'hideActions'
  | 'itemProps'
  | 'items'
  | 'itemTitle'
  | 'itemValue'
  | 'mandatory'
  | 'mobile'
  | 'modelValue'
  | 'multiple'
  | 'nextText'
  | 'nonLinear'
  | 'prevText'
  | 'rounded'
  | 'selectedClass'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VStepper: VuetifyComponent<
  VStepperProps,
  VStepperDefaultKeys,
  {
    'update:modelValue': (v: unknown) => true
  },
  new <TModel>(
    props: {
      modelValue?: TModel
      'onUpdate:modelValue'?: (value: TModel) => void
    },
    slots: VStepperSlots
  ) => GenericProps<typeof props, typeof slots>,
  { prev: () => void, next: () => void }
>
export type VStepper = InstanceType<typeof VStepper>

export {}
