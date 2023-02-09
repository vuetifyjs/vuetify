// Composables
import { makeDelayProps, useDelay } from '@/composables/delay'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { GenericSlot } from '@/util'

export const VHover = genericComponent<new () => {
  $props: GenericSlot
}>()({
  name: 'VHover',

  props: {
    disabled: Boolean,
    modelValue: {
      type: Boolean,
      default: undefined,
    },

    ...makeDelayProps(),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isHovering = useProxiedModel(props, 'modelValue')
    const { runOpenDelay, runCloseDelay } = useDelay(props, value => !props.disabled && (isHovering.value = value))

    return () => slots.default?.({
      isHovering: isHovering.value,
      props: {
        onMouseenter: runOpenDelay,
        onMouseleave: runCloseDelay,
      },
    })
  },
})

export type VHover = InstanceType<typeof VHover>
