// Composables
import { makeActiveProps, useActive } from '@/composables/active'
import { makeDelayProps, useDelay } from '@/composables/delay'

// Utilities
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VHover',

  props: {
    disabled: Boolean,

    ...makeActiveProps(),
    ...makeDelayProps(),
  },

  emits: {
    'update:active': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { isActive, activeClasses } = useActive(props, 'v-hover')
    const { runOpenDelay, runCloseDelay } = useDelay(props, value => !props.disabled && (isActive.value = value))

    return () => slots.default?.({
      isActive,
      props: {
        class: [activeClasses.value],
        onMouseenter: runOpenDelay,
        onMouseleave: runCloseDelay,
      },
    })
  },
})
