// Styles
import './VLayoutItem.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVLayoutItemProps = propsFactory({
  position: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 300,
  },
  modelValue: Boolean,

  ...makeComponentProps(),
  ...makeLayoutItemProps(),
}, 'v-layout-item')

export const VLayoutItem = genericComponent()({
  name: 'VLayoutItem',

  props: makeVLayoutItemProps(),

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
          props.class,
        ]}
        style={[
          layoutItemStyles.value,
          props.style,
        ]}
      >
        { slots.default?.() }
      </div>
    )
  },
})

export type VLayoutItem = InstanceType<typeof VLayoutItem>
