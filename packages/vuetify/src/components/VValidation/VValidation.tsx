// Composables
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { GenericSlot } from '@/util'

export const VValidation = genericComponent<new () => {
  $props: GenericSlot
}>()({
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

export type VValidation = InstanceType<typeof VValidation>
