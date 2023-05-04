// Composables
import { useForm } from '@/composables/form'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useToggleScope } from '@/composables/toggleScope'
import { makeFocusProps } from '@/composables/focus'

// Utilities
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'
import { getCurrentInstanceName, getUid, propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { MaybeRef } from '@/util'

export type ValidationResult = string | boolean
export type ValidationRule =
  | ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

type ValidateOnValue = 'blur' | 'input' | 'submit'

export interface ValidationProps {
  disabled: boolean
  error: boolean
  errorMessages: string | string[]
  focused: boolean
  maxErrors: string | number
  name: string | undefined
  label: string | undefined
  readonly: boolean
  rules: ValidationRule[]
  modelValue: any
  'onUpdate:modelValue': ((val: any) => void) | undefined
  validateOn?: ValidateOnValue | `${ValidateOnValue} lazy` | `lazy ${ValidateOnValue}` | 'lazy'
  validationValue: any
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
  label: String,
  readonly: Boolean,
  rules: {
    type: Array as PropType<ValidationRule[]>,
    default: () => ([]),
  },
  modelValue: null,
  validateOn: String as PropType<ValidationProps['validateOn']>,
  validationValue: null,

  ...makeFocusProps(),
}, 'validation')

export function useValidation (
  props: ValidationProps,
  name = getCurrentInstanceName(),
  id: MaybeRef<string | number> = getUid(),
) {
  const model = useProxiedModel(props, 'modelValue')
  const validationModel = computed(() => props.validationValue === undefined ? model.value : props.validationValue)
  const form = useForm()
  const internalErrorMessages = ref<string[]>([])
  const isPristine = ref(true)
  const isDirty = computed(() => !!(
    wrapInArray(model.value === '' ? null : model.value).length ||
    wrapInArray(validationModel.value === '' ? null : validationModel.value).length
  ))
  const isDisabled = computed(() => !!(props.disabled || form?.isDisabled.value))
  const isReadonly = computed(() => !!(props.readonly || form?.isReadonly.value))
  const errorMessages = computed(() => {
    return props.errorMessages.length
      ? wrapInArray(props.errorMessages).slice(0, Math.max(0, +props.maxErrors))
      : internalErrorMessages.value
  })
  const isValid = computed(() => {
    return !(props.error || errorMessages.value.length)
  })
  const isValidating = ref(false)
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: !isPristine.value && !isValid.value,
      [`${name}--dirty`]: isDirty.value,
      [`${name}--disabled`]: isDisabled.value,
      [`${name}--readonly`]: isReadonly.value,
    }
  })

  const uid = computed(() => props.name ?? unref(id))

  onBeforeMount(() => {
    form?.register({
      id: uid.value,
      validate,
      reset,
      resetValidation,
    })
  })

  onBeforeUnmount(() => {
    form?.unregister(uid.value)
  })

  const validateOn = computed(() => {
    const value = (props.validateOn ?? form?.validateOn.value)

    if (value === 'lazy') return 'input lazy'

    return value || 'input'
  })

  onMounted(() => {
    // If there are no rules, default to valid
    form?.update(uid.value, !props.rules.length, [])

    validate(validateOn.value.includes('lazy'))
  })

  useToggleScope(() => validateOn.value.includes('input'), () => {
    watch(validationModel, () => {
      if (validationModel.value != null) {
        validate()
      } else if (props.focused) {
        const unwatch = watch(() => props.focused, val => {
          if (!val) validate()

          unwatch()
        })
      }
    })
  })

  useToggleScope(() => validateOn.value.includes('blur'), () => {
    watch(() => props.focused, val => {
      if (!val) validate()
    })
  })

  watch(isValid, () => {
    form?.update(uid.value, isValid.value, errorMessages.value)
  })

  function reset () {
    resetValidation()
    model.value = null
  }

  function resetValidation () {
    isPristine.value = true
  }

  async function validate (silent = false) {
    const results = []

    isValidating.value = true

    for (const rule of props.rules) {
      if (results.length >= +(props.maxErrors ?? 1)) {
        break
      }

      const handler = typeof rule === 'function' ? rule : () => rule
      const result = await handler(validationModel.value)

      if (result === true) continue

      if (typeof result !== 'string') {
        // eslint-disable-next-line no-console
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`)

        continue
      }

      results.push(result)
    }

    internalErrorMessages.value = results
    isValidating.value = false
    isPristine.value = silent

    return internalErrorMessages.value
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
