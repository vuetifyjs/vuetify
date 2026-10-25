// Types
import type { ComponentInternalInstance, Raw, Ref, ShallowRef, StyleValue } from 'vue'
import type { FieldValidationResult, FormField, FormValidationResult, SubmitEventPromise } from '@/composables/form.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { ValidateOn } from '@/composables/validation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VFormSlots = {
  default: {
    errors: FieldValidationResult[]
    isDisabled: boolean
    isReadonly: boolean
    isValidating: boolean
    isValid: boolean | null
    items: FormField[]
    validate: () => Promise<FormValidationResult>
    reset: () => void
    resetValidation: () => void
  }
}

export interface VFormProps {
  class?: any
  disabled?: boolean
  fastFail?: boolean
  modelValue?: boolean | null
  readonly?: boolean
  style?: StyleValue
  validateOn?: ValidateOn
}

type VFormDefaultKeys =
  | 'disabled'
  | 'fastFail'
  | 'modelValue'
  | 'readonly'
  | 'style'
  | 'validateOn'

export declare const VForm: VuetifyComponent<
  VFormProps,
  VFormDefaultKeys,
  {
    'update:modelValue': (val: boolean | null) => true
    submit: (e: SubmitEventPromise) => true
  },
  VFormSlots,
  ForwardRefs<{ errors: Ref<{ id: string | number, errorMessages: string[] }[], FieldValidationResult[] | { id: string | number, errorMessages: string[] }[]>, isDisabled: Readonly<Ref<boolean, boolean>>, isReadonly: Readonly<Ref<boolean, boolean>>, isValidating: ShallowRef<boolean, boolean>, isValid: Ref<boolean | null, boolean | null> & { readonly externalValue: boolean | null }, items: Ref<{ id: string | number, validate: () => Promise<string[]>, reset: () => Promise<void>, resetValidation: () => Promise<void>, vm: Raw<ComponentInternalInstance>, isValid: boolean | null, errorMessages: string[] }[], FormField[] | { id: string | number, validate: () => Promise<string[]>, reset: () => Promise<void>, resetValidation: () => Promise<void>, vm: Raw<ComponentInternalInstance>, isValid: boolean | null, errorMessages: string[] }[]>, validate: () => Promise<{ valid: boolean, errors: { id: string | number, errorMessages: string[] }[] }>, reset: () => void, resetValidation: () => void }, [HTMLFormElement]>
>
export type VForm = InstanceType<typeof VForm>

export {}
