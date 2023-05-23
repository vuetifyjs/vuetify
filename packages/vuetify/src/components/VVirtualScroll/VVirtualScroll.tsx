// Styles
import './VVirtualScroll.sass'

// Components
import { VVirtualScrollItem } from './VVirtualScrollItem'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeVirtualProps, useVirtual } from '@/composables/virtual'

// Utilities
import { ref, toRef } from 'vue'
import {
  convertToUnit,
  genericComponent,
  propsFactory,
  useRender,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export interface VVirtualScrollSlot<T> {
  item: T
  index: number
}

export const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array as PropType<readonly unknown[]>,
    default: () => ([]),
  },

  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'VVirtualScroll')

export const VVirtualScroll = genericComponent<new <T>(
  props: {
    items?: readonly T[]
  },
  slots: {
    default: VVirtualScrollSlot<T>
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VVirtualScroll',

  props: makeVVirtualScrollProps(),

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)
    const {
      containerRef,
      handleScroll,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      virtualItems,
    } = useVirtual(props, toRef(props, 'items'), ref(0), false)

    useRender(() => (
      <div
        ref={ containerRef }
        class={[
          'v-virtual-scroll',
          props.class,
        ]}
        onScroll={ handleScroll }
        style={[
          dimensionStyles.value,
          props.style,
        ]}
      >
        <div
          class="v-virtual-scroll__container"
          style={{
            paddingTop: convertToUnit(paddingTop.value),
            paddingBottom: convertToUnit(paddingBottom.value),
          }}
        >
          { virtualItems.value.map((item, index) => (
            <VVirtualScrollItem
              key={ index }
              id={ index }
              dynamicHeight={ !props.itemHeight }
            >
              { slots.default?.({ item, index }) }
            </VVirtualScrollItem>
          ))}
        </div>
      </div>
    ))

    return {
      scrollToIndex,
    }
  },
})

export type VVirtualScroll = InstanceType<typeof VVirtualScroll>
