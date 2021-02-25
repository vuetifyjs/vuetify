// Utilities
import { toRef, defineComponent, computed } from 'vue'
import { randomHexColor } from '@/util'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Types
import type { Prop } from 'vue'

export default defineComponent({
  name: 'VLayoutItem',

  props: {
    ...makeLayoutItemProps(),
    position: {
      type: String,
      required: true,
    } as Prop<'top' | 'left' | 'right' | 'bottom'>,
  },

  setup (props, { slots }) {
    const styles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      computed(() => props.position ?? 'left'),
      toRef(props, 'size')
    )

    const background = randomHexColor()

    return () => (
      <div
        style={{
          background,
          ...styles.value,
        }}
      >{ slots.default?.() }</div>
    )
  },
})
