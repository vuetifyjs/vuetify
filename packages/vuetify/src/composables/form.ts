// Utilities
import { computed, inject, provide, ref, watch } from 'vue'
import { useProxiedModel } from '@/composables/proxiedModel'
import { consoleWarn, propsFactory } from '@/util'

// Types
import type { ComputedRef, InjectionKey, PropType, Ref } from 'vue'

export interface FormProvide {
  register: (
    id: number | string,
    validate: () => Promise<string[]>,
    reset: () => void,
    resetValidation: () => void,
    isValid: Ref<boolean | null>,
  ) => void
  unregister: (id: number | string) => void
  items: Ref<FormField[]>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isValidating: Ref<boolean>
}

interface FormField {
  id: number | string
  validate: () => Promise<string[]>
  reset: () => void
  resetValidation: () => void
  isValid: boolean | null
}

interface FormValidationResult {
  id: number | string
  errorMessages: string[]
}

export const FormKey: InjectionKey<FormProvide> = Symbol.for('vuetify:form')

export interface FormProps {
  disabled: boolean
  fastFail: boolean
  lazyValidation: boolean
  readonly: boolean
  modelValue: boolean | null
  'onUpdate:modelValue': ((val: boolean | null) => void) | undefined
}

export const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  lazyValidation: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
})

export function createForm (props: FormProps) {
  const model = useProxiedModel(props, 'modelValue')

  const isDisabled = computed(() => props.disabled)
  const isReadonly = computed(() => props.readonly)
  const isValidating = ref(false)
  const items = ref<FormField[]>([])
  const errorMessages = ref<FormValidationResult[]>([])

  async function validate () {
    const results = []
    let valid = true

    errorMessages.value = []
    isValidating.value = true

    for (const item of items.value) {
      const itemErrorMessages = await item.validate()

      if (itemErrorMessages.length > 0) {
        valid = false

        results.push({
          id: item.id,
          errorMessages: itemErrorMessages,
        })
      }

      if (!valid && props.fastFail) break
    }

    errorMessages.value = results
    isValidating.value = false

    return { valid, errorMessages: errorMessages.value }
  }

  function reset () {
    items.value.forEach(item => item.reset())
    model.value = null
  }

  function resetValidation () {
    items.value.forEach(item => item.resetValidation())
    errorMessages.value = []
    model.value = null
  }

  watch(items, () => {
    let valid = null

    if (items.value.some(item => item.isValid === false)) {
      valid = false
    } else if (items.value.every(item => item.isValid === true)) {
      valid = true
    }

    model.value = valid
  }, {
    deep: true,
  })

  provide(FormKey, {
    register: (id, validate, reset, resetValidation, isValid) => {
      if (items.value.some(item => item.id === id)) {
        consoleWarn(`Duplicate input name "${id}"`)
      }

      items.value.push({
        id,
        validate,
        reset,
        resetValidation,
        isValid: isValid as unknown as boolean | null, // TODO: Better way to type this unwrapping?
      })
    },
    unregister: id => {
      items.value = items.value.filter(item => {
        return item.id !== id
      })
    },
    isDisabled,
    isReadonly,
    isValidating,
    items,
  })

  return {
    errorMessages,
    isDisabled,
    isReadonly,
    isValidating,
    items,
    validate,
    reset,
    resetValidation,
  }
}

export function useForm () {
  return inject(FormKey, null)
}
