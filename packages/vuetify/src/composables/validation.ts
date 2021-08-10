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
    const promises: Promise<ValidationResult>[] = []
    const resolved: Promise<true> = Promise.resolve(true)

    errorMessages.value = []
    isValidating.value = true

    for (const rule of props.rules) {
      const handler = typeof rule === 'function' ? rule : () => rule

      promises.push(wrapInPromise<ValidationResult>(handler(value?.value || value)))
    }

    // Avoid the need to resolve the last
    // promise for a validation result.
    promises.push(resolved)

    promises.reduce((p, cur, i) => {
      return p.then(result => {
        if (errorMessages.value.length >= (props.maxErrors || 1)) {
          return Promise.resolve(true)
        }

        if (typeof result === 'string') {
          errorMessages.value.push(result)
        }

        return cur
      })
    }, resolved).then(() => {
      isValidating.value = false
      isPristine.value = false
    })
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
