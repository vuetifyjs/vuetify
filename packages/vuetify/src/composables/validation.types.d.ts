// Types
import type { ComputedRef, ShallowRef } from 'vue'

export type ValidationResult = string | boolean

export type ValidationRule =
  | ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

type ValidateOnValue = 'blur' | 'input' | 'submit' | 'invalid-input'

export type ValidateOn =
  | ValidateOnValue
  | `${ValidateOnValue} lazy`
  | `${ValidateOnValue} eager`
  | `lazy ${ValidateOnValue}`
  | `eager ${ValidateOnValue}`
  | 'lazy'
  | 'eager'

export type ValidationState = {
  errorMessages: ComputedRef<string[]>
  isDirty: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isPristine: ShallowRef<boolean>
  isValid: ComputedRef<boolean | null>
  isValidating: ShallowRef<boolean>
  reset: () => Promise<void>
  resetValidation: () => Promise<void>
  validate: (silent?: boolean) => Promise<string[]>
  validationClasses: ComputedRef<Record<string, boolean>>
}

export {}
