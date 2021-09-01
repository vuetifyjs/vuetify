// Utilities
import { defineComponent } from '@/util'
import { inject, provide, ref } from 'vue'
import type { InjectionKey, PropType, Ref } from 'vue'
import { useProxiedModel } from '@/composables/proxiedModel'

interface FormProvide {
  register: (
    id: number,
    validate: () => void,
    reset: () => void,
    clear: () => void
  ) => void
  unregister: (id: number) => void
  items: Ref<any[]>
}

export const VuetifyFormKey: InjectionKey<FormProvide> = Symbol.for('vuetify:form')

export function createForm (props: any) {
  const items = ref<any[]>([])

  provide(VuetifyFormKey, {
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
  return inject(VuetifyFormKey, null)
}

export const VForm = defineComponent({
  name: 'VForm',

  props: {
    // disabled: Boolean,
    fastFail: Boolean,
    // lazyValidation: Boolean,
    // readonly: Boolean,
    modelValue: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
  },

  emits: {
    'update:modelValue': (val: boolean) => true as any,
    clear: () => true as any,
    reset: (e: Event) => true as any,
    submit: (e: Event) => true as any,
  },

  setup (props, { emit, slots }) {
    const { items } = createForm(props)
    const model = useProxiedModel(props, 'modelValue')

    async function onSubmit (e: Event) {
      e.preventDefault()

      model.value = null
      let valid = true

      for (const item of items.value) {
        const result = await item.validate()

        if (!result && valid) valid = false
        if (!valid && props.fastFail) break
      }

      model.value = valid

      emit('submit', e)
    }

    async function onReset (e: Event) {
      e.preventDefault()

      items.value.forEach(item => item.reset())
      model.value = null

      emit('reset', e)
    }

    async function onClear () {
      items.value.forEach(item => item.clear())
      model.value = null

      emit('clear')
    }

    return () => (
      <form
        class="v-form"
        novalidate
        onReset={ onReset }
        onSubmit={ onSubmit }
      >
        { slots.default?.({
          items,
          onClear,
        }) }
      </form>
    )
  },
})
