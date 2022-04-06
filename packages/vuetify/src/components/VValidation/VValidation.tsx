// Composables
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { defineComponent } from '@/util'

export const VValidation = defineComponent({
  name: 'VValidation',

  props: {
    ...makeValidationProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const validation = useValidation(props, 'validation')

    return () => slots.default?.(validation)
  },
})
