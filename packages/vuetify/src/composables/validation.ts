import { propsFactory, wrapInArray, wrapInPromise } from '@/util'
// Utilities
import type { PropType, Ref } from 'vue'
import { ref, watch } from 'vue'

// Types
export type ValidationRule = string | ((value: any) => string | boolean)
export type ValidationRules = ValidationRule[]
export type ValidationResult = string | boolean | Promise<string | boolean>

export interface ValidationProps {
  errorCount: string | number
  rules: ValidationRules
}

export const makeValidationProps = propsFactory({
  errorCount: {
    type: [Number, String],
    default: 1,
  },
  rules: {
    type: Array as PropType<ValidationRules>,
    default: () => ([]),
  },
})

export function useValidation (props: ValidationProps, value: Ref<any>) {
  const errorMessages = ref<string[]>([])
  const isPristine = ref(true)
  const isValid = ref<null | boolean>(null)
  const isValidating = ref(false)

  watch(isValid, () => isPristine.value = false)

  async function validate () {
    await reset()

    const rules = wrapInArray(props.rules)

    isValidating.value = true
    for (const rule of rules) {
      const handler = typeof rule === 'function' ? rule : () => rule
      const valid = await wrapInPromise<ValidationResult>(handler(value))

      if (valid === true) continue

      isValid.value = !!valid

      if (typeof valid === 'string') {
        errorMessages.value.push(valid)
      }

      if (errorMessages.value.length >= props.errorCount) {
        break
      }
    }
    isValidating.value = false

    isValid.value = errorMessages.value.length === 0
  }

  async function reset () {
    errorMessages.value = []
    isValid.value = null
    isValidating.value = false
  }

  return {
    errorMessages,
    isPristine,
    isValid,
    isValidating,
    reset,
    validate,
  }
}
