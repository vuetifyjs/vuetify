// Composables
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { GenericProps } from '@/util'

export type VValidationSlots = {
  default: ReturnType<typeof useValidation>
}

export const VValidation = genericComponent<new <T>(
  props: {
    modelValue?: T | null
    'onUpdate:modelValue'?: (value: T | null) => void
  },
  slots: VValidationSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VValidation',

  props: makeValidationProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const validation = useValidation(props, 'validation')

    return () => slots.default?.(validation)
  },
})

export type VValidation = InstanceType<typeof VValidation>
