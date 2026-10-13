// Types
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type StepperItem = string | Record<string, any>

export type ValidationRule = () => string | boolean

export type VStepperItemSlots<T = any> = {
  default: StepperItemSlot<T>
  icon: StepperItemSlot<T>
  title: StepperItemSlot<T>
  subtitle: StepperItemSlot<T>
}

export type StepperItemSlot<T = any> = {
  canEdit: boolean
  hasError: boolean
  hasCompleted: boolean
  title?: string | number
  subtitle?: string | number
  step: T
}

export interface VStepperItemProps {
  color?: string
  complete?: boolean
  completeIcon?: IconValue
  disabled?: boolean
  editable?: boolean
  editIcon?: IconValue
  error?: boolean
  errorIcon?: IconValue
  icon?: IconValue
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rules?: readonly ValidationRule[]
  selectedClass?: string
  subtitle?: string
  title?: string
  value?: any
}

export type VStepperItemDefaultKeys =
  | 'complete'
  | 'completeIcon'
  | 'disabled'
  | 'editable'
  | 'editIcon'
  | 'error'
  | 'errorIcon'
  | 'ripple'
  | 'rules'

export declare const VStepperItem: VuetifyComponent<
  VStepperItemProps,
  VStepperItemDefaultKeys,
  {
    'group:selected': (val: { value: boolean }) => true
  },
  VStepperItemSlots
>
export type VStepperItem = InstanceType<typeof VStepperItem>
