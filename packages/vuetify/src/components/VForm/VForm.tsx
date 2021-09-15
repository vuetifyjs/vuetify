// Composables
import { createForm, makeFormProps } from '@/composables/form'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VForm = defineComponent({
  name: 'VForm',

  props: {
    ...makeFormProps(),
  },

  emits: {
    'update:modelValue': (val: boolean) => true as any,
    resetValidation: () => true as any,
    reset: (e: Event) => true as any,
    submit: (e: Event) => true as any,
  },

  setup (props, { slots }) {
    const form = createForm(props)

    useRender(() => ((
      <form
        class="v-form"
        novalidate
        onReset={ form.reset }
        onSubmit={ form.submit }
      >
        { slots.default?.(form) }
      </form>
    )))

    return form
  },
})
