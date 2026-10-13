// Types
import type { ComputedRef, Ref, StyleValue } from 'vue'
import type { VMessageSlot } from '@/components/VMessages/VMessages.types'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { ValidationAlias } from '@/composables/rules/rules.types'
import type { ValidateOn, ValidationRule } from '@/composables/validation.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ClassValue } from '@/util/shared.types'

export interface VInputProps<T = any> {
  appendIcon?: IconValue
  baseColor?: string
  centerAffix?: boolean
  class?: ClassValue
  color?: string
  density?: Density
  detailsActive?: boolean
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean | null
  error?: boolean
  errorMessages?: string | readonly string[] | null
  focused?: boolean
  glow?: boolean
  hideDetails?: boolean | 'auto'
  hideSpinButtons?: boolean
  hint?: string
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  label?: string
  maxErrors?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  minWidth?: string | number
  modelValue?: T
  name?: string
  'onClick:append'?: (event: MouseEvent) => void
  'onClick:prepend'?: (event: MouseEvent) => void
  'onUpdate:focused'?: (value: boolean) => void
  persistentHint?: boolean
  prependIcon?: IconValue
  readonly?: boolean | null
  rules?: readonly (ValidationRule | ValidationAlias)[]
  style?: StyleValue
  theme?: string
  validateOn?: ValidateOn
  validationValue?: any
  width?: string | number
}

export type VInputDefaultKeys =
  | 'centerAffix'
  | 'density'
  | 'detailsActive'
  | 'direction'
  | 'disabled'
  | 'error'
  | 'errorMessages'
  | 'focused'
  | 'glow'
  | 'hideSpinButtons'
  | 'indentDetails'
  | 'maxErrors'
  | 'messages'
  | 'persistentHint'
  | 'readonly'
  | 'rules'
  | 'style'

export interface VInputSlot {
  id: ComputedRef<string>
  messagesId: ComputedRef<string | undefined>
  isDirty: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isPristine: Ref<boolean>
  isValid: ComputedRef<boolean | null>
  isValidating: Ref<boolean>
  hasDetails: Ref<boolean>
  reset: () => void
  resetValidation: () => void
  validate: () => void
}

export type VInputSlots = {
  default: VInputSlot
  prepend: VInputSlot
  append: VInputSlot
  details: VInputSlot
  message: VMessageSlot
}

export type VInputExposed = {
  reset: () => Promise<void>
  resetValidation: () => Promise<void>
  validate: (silent?: boolean) => Promise<string[]>
  isValid: ComputedRef<boolean | null>
  errorMessages: ComputedRef<string[]>
}

export declare const VInput: VuetifyComponent<
  VInputProps,
  VInputDefaultKeys,
  { 'update:modelValue': (value: any) => true },
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: VInputSlots,
  ) => GenericProps<typeof props, typeof slots>,
  VInputExposed
>
export type VInput = InstanceType<typeof VInput>
