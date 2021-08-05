// Utilities
import { propsFactory, wrapInPromise } from '@/util'
import { ref, unref, watch } from 'vue'

// Types
import type { MaybeRef } from '@/util/helpers'
import type { PropType } from 'vue'

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

export function useValidation (props: ValidationProps, value: MaybeRef<any>) {
  const errorMessages = ref<string[]>([])
  const isPristine = ref(true)
  const isValid = ref<null | boolean>(null)
  const isValidating = ref(false)
  const errorCount = ref(0)
  const unwrefed = unref(value)

  watch(isValid, () => isPristine.value = false)

  async function validate () {
    await reset()

    isValidating.value = true
    for (const rule of props.rules) {
      const handler = typeof rule === 'function' ? rule : () => rule
      const valid = await wrapInPromise<ValidationResult>(handler(unwrefed.value))

      if (valid === true) continue

      errorCount.value += 1

      if (typeof valid === 'string') {
        errorMessages.value.push(valid)
      }

      if (errorCount.value >= (props.errorCount || 1)) {
        break
      }
    }
    isValid.value = errorCount.value > 0
    isValidating.value = false

    isValid.value = errorMessages.value.length === 0
  }

  async function reset () {
    errorCount.value = 0
    errorMessages.value = []
    isValid.value = null
  }

  return {
    errorCount,
    errorMessages,
    isPristine,
    isValid,
    isValidating,
    reset,
    validate,
  }
}
