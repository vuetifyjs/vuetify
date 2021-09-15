// Composables
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { defineComponent, getCurrentInstance } from '@/util'

export const VValidation = defineComponent({
  name: 'VValidation',

  props: {
    ...makeValidationProps(),
  },

  setup (props, { slots }) {
    const vm = getCurrentInstance('v-validation')
    const validation = useValidation(props, 'validation', vm)

    return () => slots.default?.(validation)
  },
})
