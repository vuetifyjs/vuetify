// Composables
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { defineComponent } from '@/util'

export const VValidation = defineComponent({
  name: 'VValidation',

  props: {
    ...makeValidationProps(),
  },

  setup (props, { slots }) {
    const validation = useValidation(props)

    return () => slots.default?.(validation)
  },
})
