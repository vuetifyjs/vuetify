// Composables
import { createForm, makeFormProps } from '@/composables/form'

// Utilities
import { ref } from 'vue'
import { defineComponent, useRender } from '@/util'

export const VForm = defineComponent({
  name: 'VForm',

  props: {
    ...makeFormProps(),
  },

  emits: {
    'update:modelValue': (val: boolean | null) => true,
    submit: (e: Event) => true,
  },

  setup (props, { slots, emit }) {
    const form = createForm(props)
    const formRef = ref<HTMLFormElement>()

    function onReset (e: Event) {
      e.preventDefault()
      form.reset()
    }

    function onSubmit (e: Event) {
      e.preventDefault()
      form.validate().then(({ valid }) => {
        if (valid) {
          emit('submit', e)
        }
      })
    }

    useRender(() => ((
      <form
        ref={ formRef }
        class="v-form"
        novalidate
        onReset={ onReset }
        onSubmit={ onSubmit }
      >
        { slots.default?.(form) }
      </form>
    )))

    return form
  },
})

export type VForm = InstanceType<typeof VForm>
