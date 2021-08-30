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

  async function validate (value: any) {
    const results = []

    errorMessages.value = []
    isValidating.value = true

    for (const rule of props.rules) {
      if (results.length >= (props.maxErrors || 1)) {
        break
      }

      const handler = typeof rule === 'function' ? rule : () => rule
      const result = await wrapInPromise<ValidationResult>(handler(value?.value || value))

      if (typeof result === 'string') {
        results.push(result)
      }
    }

    errorMessages.value = results
    isValidating.value = false
    isPristine.value = false
  }

  function reset () {
    isPristine.value = true
    errorMessages.value = []
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
