// Styles
import './VLayoutItem.sass'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export const VLayoutItem = genericComponent()({
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
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, 'position'),
      elementSize: toRef(props, 'size'),
      layoutSize: toRef(props, 'size'),
      active: toRef(props, 'modelValue'),
      absolute: toRef(props, 'absolute'),
    })

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

export type VLayoutItem = InstanceType<typeof VLayoutItem>
