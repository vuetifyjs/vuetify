// Composables
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VValidate',

  props: {
    ...makeValidationProps(),
  },

  setup (props, { slots }) {
    return () => slots.default?.({
      ...useValidation(props),
    })
  },
})
