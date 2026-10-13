// Types
import type { ComponentInternalInstance, Raw } from 'vue'

export interface SubmitEventPromise extends SubmitEvent, Promise<FormValidationResult> {}

export interface FieldValidationResult {
  id: number | string
  errorMessages: string[]
}

export interface FormField {
  id: number | string
  validate: () => Promise<string[]>
  reset: () => Promise<void>
  resetValidation: () => Promise<void>
  vm: Raw<ComponentInternalInstance>
  isValid: boolean | null
  errorMessages: string[]
}

export interface FormValidationResult {
  valid: boolean
  errors: FieldValidationResult[]
}
