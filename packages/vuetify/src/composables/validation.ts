// Utilities
import { consoleWarn, propsFactory, wrapInPromise } from '@/util'
import { computed, ref } from 'vue'

// Types
import type { PropType, Ref } from 'vue'

export type ValidationResult = string | true | Promise<string | true>
export type ValidationRule = string | ((value: any) => ValidationResult)

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

export function useValidation (props: ValidationProps, value: Ref<any>) {
  const errorMessages = ref<string[]>([])
  const isPristine = ref(true)
  const isValid = computed(() => isPristine.value ? null : errorMessages.value.length === 0)
  const isValidating = ref(false)

  async function validate () {
    errorMessages.value = []
    isValidating.value = true
    for (const rule of props.rules) {
      const handler = typeof rule === 'function' ? rule : () => rule
      const valid = await wrapInPromise<ValidationResult>(handler(value.value))

      if (valid === true) continue

      /* istanbul ignore if */
      if (typeof valid !== 'string') {
        consoleWarn(`${valid} is not a valid value. Rule functions should return boolean true or a string.`)
      }

      if (errorMessages.value.push(valid) >= (props.maxErrors || 1)) {
        break
      }
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
