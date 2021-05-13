// Styles
import './VLayoutItem.sass'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Utilities
import { defineComponent, toRef } from 'vue'
import { makeProps } from '@/util'

// Types
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VLayoutItem',

  props: makeProps({
    position: {
      type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 300,
    },
    modelValue: Boolean,
    ...makeLayoutItemProps(),
  }),

  setup (props, { slots }) {
    const styles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      toRef(props, 'position'),
      toRef(props, 'size'),
      toRef(props, 'size'),
      toRef(props, 'modelValue')
    )

    return () => (
      <div class='v-layout-item' style={ styles.value }>
        { slots.default?.() }
      </div>
    )
  },
})
