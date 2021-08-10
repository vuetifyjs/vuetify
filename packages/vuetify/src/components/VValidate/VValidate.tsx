// Styles
import './VValidate.sass'

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
    const {
      errorMessages,
      isValid,
      isValidating,
      reset,
      validate,
    } = useValidation(props)

    return () => slots.default?.({
      errorMessages,
      isValid,
      isValidating,
      reset,
      validate,
    })
  },
})
