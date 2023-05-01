// Styles
import './VVirtualScroll.sass'

// Components
import { VVirtualScrollItem } from './VVirtualScrollItem'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeVirtualProps, useVirtual } from '@/composables/virtual'

// Utilities
import {
  convertToUnit,
  genericComponent,
  useRender,
} from '@/util'

// Types
import type { GenericProps } from '@/util'
import { toRef } from 'vue'

export interface VVirtualScrollSlot<T> {
  item: T
  index: number
}

export const VVirtualScroll = genericComponent<new <T>(props: {
  items?: readonly T[]
}) => GenericProps<typeof props, {
  default: [VVirtualScrollSlot<T>]
}>>()({
  name: 'VVirtualScroll',

  props: {
    ...makeVirtualProps(),
    ...makeComponentProps(),
    ...makeDimensionProps(),
  },

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)
    const {
      containerRef,
      handleScroll,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems,
    } = useVirtual(props, toRef(props, 'items'))

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
          { computedItems.value.map(item => (
            <VVirtualScrollItem
              key={ item.index }
              dynamicHeight={ !props.itemHeight }
              onUpdate:height={ height => handleItemResize(item.index, height) }
            >
              { slots.default?.({ item: item.raw, index: item.index }) }
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
