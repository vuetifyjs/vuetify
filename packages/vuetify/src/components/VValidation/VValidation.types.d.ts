// Types
import type { ValidateOn, ValidationResult, ValidationState } from '@/composables/validation.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'

export type VValidationSlots = {
  default: ValidationState
}

export interface VValidationProps {
  disabled?: boolean | null
  error?: boolean
  errorMessages?: string | readonly string[] | null
  focused?: boolean
  label?: string
  maxErrors?: string | number
  modelValue?: any
  name?: string
  'onUpdate:focused'?: ((args_0: boolean) => void)
  readonly?: boolean | null
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  validateOn?: ValidateOn
  validationValue?: any
}

export type VValidationDefaultKeys =
  | 'disabled'
  | 'error'
  | 'errorMessages'
  | 'focused'
  | 'maxErrors'
  | 'readonly'
  | 'rules'

export declare const VValidation: VuetifyComponent<
  VValidationProps,
  VValidationDefaultKeys,
  {
    'update:modelValue': (value: any) => true
  },
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: VValidationSlots,
  ) => GenericProps<typeof props, typeof slots>
>
export type VValidation = InstanceType<typeof VValidation>
