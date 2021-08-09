/* eslint-disable no-labels */
// Utilities
import { computed, ref } from 'vue'
import { propsFactory, wrapInPromise } from '@/util'

// Types
import type { PropType } from 'vue'

export type ValidationResult = string | true
export type ValidationRule = string | ((value: any) => ValidationResult) | Promise<ValidationResult>

export interface ValidationProps {
  maxErrors?: string | number
  rules: ValidationRule[]
}

export const makeValidationProps = propsFactory({
  maxErrors: {
    type: [Number, String],
    default: 1,
  },
  rules: {
    type: Array as PropType<ValidationRule[]>,
    default: () => ([]),
  },
})

export function useValidation (props: ValidationProps) {
  const errorMessages = ref<string[]>([])
  const isPristine = ref(true)
  const isValid = computed(() => isPristine.value ? null : errorMessages.value.length === 0)
  const isValidating = ref(false)

  function validate (value: any) {
    errorMessages.value = []
    isValidating.value = true

    for (const rule of props.rules) {
      const handler = typeof rule === 'function' ? rule : () => rule
      const valid = wrapInPromise<ValidationResult>(handler(value?.value || value))

      if (errorMessages.value.length >= (props.maxErrors || 1)) {
        break
      }

      valid.then(result => {
        if (result === true) return

        errorMessages.value.push(result)
      })
    }

    isValidating.value = false
    isPristine.value = false
  }

  function reset () {
    isPristine.value = true
    errorMessages.value = []
  }

  return {
    errorCount: errorMessages.value.length,
    errorMessages,
    isPristine,
    isValid,
    isValidating,
    reset,
    validate,
  }
}
