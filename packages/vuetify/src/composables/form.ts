// Utilities
import { inject, provide, ref } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'

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

export function createForm () {
  const items = ref<FormInput[]>([])

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
      items.value = items.value.filter(field => {
        return field.id !== id
      })
    },
    items,
  })

  return { items }
}

export function useForm () {
  return inject(FormKey, null)
}
