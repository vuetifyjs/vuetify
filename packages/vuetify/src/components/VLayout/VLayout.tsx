// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import { createLayout } from '@/composables/layout'

// Types
import type { Prop } from 'vue'

export default defineComponent({
  name: 'VLayout',

  props: makeProps({
    layout: {
      type: Array,
      default: () => ([]),
    } as Prop<string[]>,
    overlaps: {
      type: Array,
      default: () => ([])
    } as Prop<string[]>,
    fullHeight: Boolean,
  }),

  setup (props, { slots }) {
    createLayout(props)

    return () =>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flex: '1 1 auto',
          height: props.fullHeight ? '100vh' : undefined,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >{ slots.default?.() }</div>
  },
})
