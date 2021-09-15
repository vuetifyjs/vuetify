// Styles
import './VLayoutItem.sass'

// Composables
import { makeActiveProps, useActive } from '@/composables/active'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Utilities
import { toRef } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VLayoutItem',

  props: {
    position: {
      type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 300,
    },

    ...makeActiveProps(),
    ...makeLayoutItemProps(),
  },

  setup (props, { slots }) {
    const { activeClasses } = useActive(props, 'v-layout-item')
    const styles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      toRef(props, 'position'),
      toRef(props, 'size'),
      toRef(props, 'size'),
      toRef(props, 'active')
    )

    return () => (
      <div
        class={[
          'v-layout-item',
          {
            'v-layout-item--absolute': props.absolute,
          },
          activeClasses.value,
        ]}
        style={ styles.value }
      >
        { slots.default?.() }
      </div>
    )
  },
})
