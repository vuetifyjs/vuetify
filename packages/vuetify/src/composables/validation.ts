// Composables
import { useForm } from '@/composables/form'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { getCurrentInstanceName, getUid, propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

export type ValidationResult = string | true
export type ValidationRule =
  | ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

export interface ValidationProps {
  disabled: boolean
  error: boolean
  errorMessages: string | string[]
  maxErrors: string | number
  name: string | undefined
  readonly: boolean
  rules: ValidationRule[]
  modelValue: any
  'onUpdate:modelValue': ((val: any) => void) | undefined
}

export const makeValidationProps = propsFactory({
  disabled: Boolean,
  error: Boolean,
  errorMessages: {
    type: [Array, String] as PropType<string | string[]>,
    default: () => ([]),
  },
  maxErrors: {
    type: [Number, String],
    default: 1,
  },
  name: String,
  readonly: Boolean,
  rules: {
    type: Array as PropType<ValidationRule[]>,
    default: () => ([]),
  },
  modelValue: null,
})

export function useValidation (
  props: ValidationProps,
  name = getCurrentInstanceName(),
) {
  const model = useProxiedModel(props, 'modelValue')
  const form = useForm()
  const errorMessages = ref<string[]>([])
  const isPristine = ref(true)
  const isDirty = computed(() => wrapInArray(model.value || []).length > 0)
  const isDisabled = computed(() => !!(props.disabled || form?.isDisabled.value))
  const isReadonly = computed(() => !!(props.readonly || form?.isReadonly.value))
  const isValid = computed(() => {
    if (
      props.error ||
      props.errorMessages?.length ||
      errorMessages.value.length
    ) return false

    return isPristine.value ? null : true
  })
  const isValidating = ref(false)
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid.value === false,
      [`${name}--dirty`]: isDirty.value,
      [`${name}--disabled`]: isDisabled.value,
      [`${name}--readonly`]: isReadonly.value,
    }
  })

  const uid = computed(() => props.name ?? getUid())

  onBeforeMount(() => {
    form?.register(uid.value, validate, reset, resetValidation)
  })

  onBeforeUnmount(() => {
    form?.unregister(uid.value)
  })

  function reset () {
    resetValidation()
    model.value = null
  }

  function resetValidation () {
    isPristine.value = true
    errorMessages.value = []
  }

  async function validate () {
    const results = []

    errorMessages.value = []
    isValidating.value = true

    for (const rule of props.rules) {
      if (results.length >= (props.maxErrors || 1)) {
        break
      }

      const handler = typeof rule === 'function' ? rule : () => rule
      const result = await handler(model.value)

      if (result === true) continue

      if (typeof result !== 'string') {
        // eslint-disable-next-line no-console
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`)

        continue
      }

      results.push(result)
    }

    errorMessages.value = results
    isValidating.value = false
    isPristine.value = false

    return errorMessages.value
  }

  return {
    errorMessages,
    isDirty,
    isDisabled,
    isReadonly,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate,
    validationClasses,
  }
}
