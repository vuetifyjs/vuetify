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
    size: {
      type: [Number, String],
      default: 300,
    },
    position: {
      type: String,
      required: true,
    } as Prop<'top' | 'left' | 'right' | 'bottom'>,
  },

  setup (props, { slots }) {
    const styles = useLayoutItem(props.name, computed(() => props.position ?? 'left'), toRef(props, 'size'))

    const background = randomHexColor()

    return () => <div
      style={{
        position: 'absolute',
        background,
        transition: 'all 0.3s ease-in-out',
        ...styles.value,
      }}
    >{ slots.default?.() }</div>
  },
})
