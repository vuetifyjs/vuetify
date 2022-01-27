// Styles
import './VLayoutItem.sass'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export const VLayoutItem = defineComponent({
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
    modelValue: Boolean,
    ...makeLayoutItemProps(),
  },

  setup (props, { slots }) {
    const { layoutItemStyles } = useLayoutItem(
      props.name,
      computed(() => parseInt(props.priority, 10)),
      toRef(props, 'position'),
      toRef(props, 'size'),
      toRef(props, 'size'),
      toRef(props, 'modelValue')
    )

    return () => (
      <div
        class={[
          'v-layout-item',
        ]}
        style={ layoutItemStyles.value }
      >
        { slots.default?.() }
      </div>
    )
  },
})
