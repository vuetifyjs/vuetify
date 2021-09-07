// Composables
import { createForm } from '@/composables/form'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

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
    const { items } = createForm()
    const model = useProxiedModel(props, 'modelValue')

    async function submit (e: Event) {
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

    async function reset (e: Event) {
      e.preventDefault()

      items.value.forEach(item => item.reset())
      model.value = null

      emit('reset', e)
    }

    async function clear () {
      items.value.forEach(item => item.clear())
      model.value = null

      emit('clear')
    }

    useRender(() => {
      return (
        <form
          class="v-form"
          novalidate
          onReset={ reset }
          onSubmit={ submit }
        >
          {
            slots.default?.({
              clear,
              items,
              reset,
              submit,
            })
          }
        </form>
      )
    })

    return {
      clear,
      reset,
      submit,
    }
  },
})
