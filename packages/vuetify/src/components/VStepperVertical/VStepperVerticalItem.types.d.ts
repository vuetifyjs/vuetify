// Types
import type { StyleValue } from 'vue'
import type { StepperItemSlot, ValidationRule } from '@/components/VStepper/VStepperItem.types'
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VStepperVerticalItemSlots<T = any> = {
  default: StepperItemSlot<T>
  icon: StepperItemSlot<T>
  subtitle: StepperItemSlot<T>
  title: StepperItemSlot<T>
  text: StepperItemSlot<T>
  prev: StepperVerticalItemActionSlot<T>
  next: StepperVerticalItemActionSlot<T>
  actions: StepperVerticalItemActionSlot<T>
}

export type StepperVerticalItemActionSlot<T = any> = StepperItemSlot<T> & {
  next: () => void
  prev: () => void
}

export interface VStepperVerticalItemProps {
  bgColor?: string
  class?: any
  collapseIcon?: IconValue
  color?: string
  complete?: boolean
  completeIcon?: IconValue
  disabled?: boolean
  eager?: boolean
  editable?: boolean
  editIcon?: IconValue
  elevation?: string | number
  error?: boolean
  errorIcon?: IconValue
  expandIcon?: IconValue
  focusable?: boolean
  height?: string | number
  hideActions?: boolean
  hover?: boolean
  hoverElevation?: string | number
  icon?: IconValue
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  readonly?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  rules?: readonly ValidationRule[]
  selectedClass?: string
  static?: boolean
  style?: StyleValue
  subtitle?: string
  tag?: string | JSXComponent
  text?: string
  tile?: boolean
  title?: string
  value?: any
  width?: string | number
}

export type VStepperVerticalItemDefaultKeys =
  | 'collapseIcon'
  | 'complete'
  | 'completeIcon'
  | 'disabled'
  | 'eager'
  | 'editable'
  | 'editIcon'
  | 'error'
  | 'errorIcon'
  | 'expandIcon'
  | 'focusable'
  | 'hideActions'
  | 'hover'
  | 'readonly'
  | 'ripple'
  | 'rounded'
  | 'rules'
  | 'static'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VStepperVerticalItem: VuetifyComponent<
  VStepperVerticalItemProps,
  VStepperVerticalItemDefaultKeys,
  {
    'click:next': () => true
    'click:prev': () => true
    'click:finish': () => true
  },
  VStepperVerticalItemSlots
>
export type VStepperVerticalItem = InstanceType<typeof VStepperVerticalItem>
