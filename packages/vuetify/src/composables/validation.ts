// Composables
import { makeFocusProps } from '@/composables/focus'
import { useForm } from '@/composables/form'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref, shallowRef, unref, watch } from 'vue'
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
  disabled: boolean | null
  error: boolean
  errorMessages: string | readonly string[]
  focused: boolean
  maxErrors: string | number
  name: string | undefined
  label: string | undefined
  readonly: boolean | null
  rules: readonly ValidationRule[]
  modelValue: any
  'onUpdate:modelValue': ((val: any) => void) | undefined
  validateOn?: ValidateOnValue | `${ValidateOnValue} lazy` | `lazy ${ValidateOnValue}` | 'lazy'
  validationValue: any
}

export const makeValidationProps = propsFactory({
  disabled: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String] as PropType<string | readonly string[]>,
    default: () => ([]),
  },
  maxErrors: {
    type: [Number, String],
    default: 1,
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  rules: {
    type: Array as PropType<readonly ValidationRule[]>,
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
  const isPristine = shallowRef(true)
  const isDirty = computed(() => !!(
    wrapInArray(model.value === '' ? null : model.value).length ||
    wrapInArray(validationModel.value === '' ? null : validationModel.value).length
  ))
  const isDisabled = computed(() => !!(props.disabled ?? form?.isDisabled.value))
  const isReadonly = computed(() => !!(props.readonly ?? form?.isReadonly.value))
  const errorMessages = computed(() => {
    return props.errorMessages.length
      ? wrapInArray(props.errorMessages).slice(0, Math.max(0, +props.maxErrors))
      : internalErrorMessages.value
  })
  const validateOn = computed(() => {
    let value = (props.validateOn ?? form?.validateOn.value) || 'input'
    if (value === 'lazy') value = 'input lazy'
    const set = new Set(value?.split(' ') ?? [])

    return {
      blur: set.has('blur') || set.has('input'),
      input: set.has('input'),
      submit: set.has('submit'),
      lazy: set.has('lazy'),
    }
  })
  const isValid = computed(() => {
    if (props.error || props.errorMessages.length) return false
    if (!props.rules.length) return true
    if (isPristine.value) {
      return internalErrorMessages.value.length || validateOn.value.lazy ? null : true
    } else {
      return !internalErrorMessages.value.length
    }
  })
  const isValidating = shallowRef(false)
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid.value === false,
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

  onMounted(async () => {
    if (!validateOn.value.lazy) {
      await validate(true)
    }
    form?.update(uid.value, isValid.value, errorMessages.value)
  })

  useToggleScope(() => validateOn.value.input, () => {
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

  useToggleScope(() => validateOn.value.blur, () => {
    watch(() => props.focused, val => {
      if (!val) validate()
    })
  })

  watch(isValid, () => {
    form?.update(uid.value, isValid.value, errorMessages.value)
  })

  function reset () {
    model.value = null
    nextTick(resetValidation)
  }

  function resetValidation () {
    isPristine.value = true
    if (!validateOn.value.lazy) {
      validate(true)
    } else {
      internalErrorMessages.value = []
    }
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
