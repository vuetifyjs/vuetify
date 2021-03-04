// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Utilities
import { toRef, defineComponent, computed } from 'vue'

// Types
import type { Prop } from 'vue'

export default defineComponent({
  name: 'VLayoutItem',

  props: {
    position: {
      type: String,
      required: true,
    } as Prop<'top' | 'right' | 'bottom' | 'left'>,
    ...makeLayoutItemProps(),
    size: {
      type: Number,
      default: 100
    },
  },

  setup (props, { slots }) {
    const styles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      computed(() => props.position ?? 'left'),
      toRef(props, 'size')
    )

    return () => (
      <div style={ styles.value }>
        { slots.default?.() }
      </div>
    )
  },
})
