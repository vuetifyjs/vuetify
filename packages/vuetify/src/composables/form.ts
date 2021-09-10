// Utilities
import { getCurrentInstance, inject, provide, ref } from 'vue'
import { propsFactory } from '@/util'
import { useProxiedModel } from '@/composables/proxiedModel'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'

interface FormProvide {
  register: (
    id: number,
    validate: () => Promise<boolean | null>,
    reset: () => void,
    clear: () => void
  ) => void
  unregister: (id: number) => void
  items: Ref<any[]>
}

interface FormInput {
  id: number
  validate: () => Promise<boolean | null>
  clear: () => void
  reset: () => void
}

export const FormKey: InjectionKey<FormProvide> = Symbol.for('vuetify:form')

export interface FormProps {
  disabled: boolean
  fastFail: boolean
  lazyValidation: boolean
  readonly: boolean
  modelValue: boolean | null
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
  const items = ref<FormInput[]>([])
  const model = useProxiedModel(props, 'modelValue')
  const vm = getCurrentInstance()
  const isValidating = ref(false)

  async function submit (e: Event) {
    e.preventDefault()

    let valid = true
    model.value = null
    isValidating.value = true

    for (const item of items.value) {
      const result = await item.validate()

      if (!result && valid) valid = false
      if (!valid && props.fastFail) break
    }

    model.value = valid
    isValidating.value = false

    vm?.emit('submit', e)
  }

  async function reset (e: Event) {
    e.preventDefault()

    items.value.forEach(item => item.reset())
    model.value = null

    vm?.emit('reset', e)
  }

  async function clear () {
    items.value.forEach(item => item.clear())
    model.value = null

    vm?.emit('clear')
  }

  provide(FormKey, {
    register: (id, validate, reset, clear) => {
      items.value.push({
        id,
        validate,
        reset,
        clear,
      })
    },
    unregister: id => {
      items.value = items.value.filter(item => {
        return item.id !== id
      })
    },
    items,
  })

  return {
    isValidating,
    items,
    submit,
    clear,
    reset,
  }
}

export function useForm () {
  return inject(FormKey, null)
}
