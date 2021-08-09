// Styles
import './VValidate.sass'

// Composables
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { defineComponent } from '@/util'
import { useProxiedModel } from '@/composables/proxiedModel'

export default defineComponent({
  name: 'VValidate',

  props: {
    modelValue: { required: false },

    ...makeValidationProps(),
  },

  setup (props, { slots }) {
    const modelValue = useProxiedModel(props, 'modelValue')
    const { errorMessages, validate, reset } = useValidation(props)

    return () => slots.default?.({
      errorMessages,
      validate,
      reset,
      modelValue,
    })
  },
})
