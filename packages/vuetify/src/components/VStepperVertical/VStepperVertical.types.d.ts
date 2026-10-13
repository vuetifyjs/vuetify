// Types
import type { StyleValue } from 'vue'
import type { VStepperSlot } from '@/components/VStepper/VStepper.types'
import type { StepperItem, StepperItemSlot } from '@/components/VStepper/VStepperItem.types'
import type { StepperVerticalItemActionSlot } from '@/components/VStepperVertical/VStepperVerticalItem.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, SelectItemKey } from '@/util/shared.types'

export type VStepperVerticalSlots<T> = {
  actions: StepperVerticalItemActionSlot<T>
  default: VStepperSlot & { step: T }
  icon: StepperItemSlot<T>
  title: StepperItemSlot<T>
  subtitle: StepperItemSlot<T>
  prev: StepperVerticalItemActionSlot<T>
  next: StepperVerticalItemActionSlot<T>
} & {
  [key: `header-item.${string}`]: StepperItemSlot<T>
  [key: `item.${string}`]: StepperItemSlot<T>
}

export interface VStepperVerticalProps {
  altLabels?: boolean
  bgColor?: string
  class?: any
  collapseIcon?: IconValue
  color?: string
  completeIcon?: IconValue
  disabled?: boolean
  eager?: boolean
  editable?: boolean
  editIcon?: IconValue
  elevation?: string | number
  errorIcon?: IconValue
  expandIcon?: IconValue
  flat?: boolean
  focusable?: boolean
  gap?: string | number
  hideActions?: boolean
  hover?: boolean
  itemProps?: SelectItemKey
  items?: readonly StepperItem[]
  itemTitle?: SelectItemKey
  itemValue?: SelectItemKey
  mandatory?: boolean | 'force'
  max?: number
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  modelValue?: any
  multiple?: boolean
  nextText?: string
  noDivider?: boolean
  nonLinear?: boolean
  prevText?: string
  readonly?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean | (string | number)[]
  selectedClass?: string
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  variant?: 'default' | 'inset' | 'accordion' | 'popout'
}

export type VStepperVerticalDefaultKeys =
  | 'altLabels'
  | 'collapseIcon'
  | 'disabled'
  | 'eager'
  | 'editable'
  | 'expandIcon'
  | 'flat'
  | 'focusable'
  | 'hideActions'
  | 'hover'
  | 'itemProps'
  | 'items'
  | 'itemTitle'
  | 'itemValue'
  | 'mandatory'
  | 'mobile'
  | 'modelValue'
  | 'multiple'
  | 'nextText'
  | 'noDivider'
  | 'nonLinear'
  | 'prevText'
  | 'readonly'
  | 'ripple'
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'
  | 'variant'

export declare const VStepperVertical: VuetifyComponent<
  VStepperVerticalProps,
  VStepperVerticalDefaultKeys,
  {
    'update:modelValue': (val: any) => true
  },
  new <T = number>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: VStepperVerticalSlots<T>,
  ) => GenericProps<typeof props, typeof slots>
>
export type VStepperVertical = InstanceType<typeof VStepperVertical>
