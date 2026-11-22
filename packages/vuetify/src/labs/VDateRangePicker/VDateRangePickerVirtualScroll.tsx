// Styles
import '../../components/VVirtualScroll/VVirtualScroll.sass'

// Components
import { VVirtualScrollItem } from '@/components/VVirtualScroll/VVirtualScrollItem'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeDateRangePickerVirtualProps, useDateRangePickerVirtual } from './virtual'

// Utilities
import { toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export const makeVDateRangePickerVirtualScrollProps = propsFactory({
  items: {
    type: Array as PropType<readonly unknown[]>,
    default: () => ([]),
  },

  ...makeDateRangePickerVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'VDateRangePickerVirtualScroll')

export const VDateRangePickerVirtualScroll = genericComponent<new <T>(
  props: {
    items?: readonly T[]
  },
  slots: {
    default: { item: T, index: number }
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDateRangePickerVirtualScroll',

  props: makeVDateRangePickerVirtualScrollProps(),

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)
    const {
      containerRef,
      markerRef,
      onScroll,
      onScrollEnd,
      onItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems,
    } = useDateRangePickerVirtual(props, toRef(() => props.items))

    useRender(() => {
      const children = computedItems.value.map(item => (
        <VVirtualScrollItem
          key={ item.key }
          onUpdate:height={ height => onItemResize(item.index, height) }
        >
          { () => slots.default?.({ item: item.raw, index: item.index }) }
        </VVirtualScrollItem>
      ))

      return (
        <div
          ref={ containerRef }
          class={[
            'v-virtual-scroll',
            props.class,
          ]}
          onScrollPassive={ onScroll }
          onScrollend={ onScrollEnd }
          style={[
            dimensionStyles.value,
            props.style,
          ]}
        >
          <div
            ref={ markerRef }
            class="v-virtual-scroll__container"
            style={{
              paddingTop: convertToUnit(paddingTop.value),
              paddingBottom: convertToUnit(paddingBottom.value),
            }}
          >
            { children }
          </div>
        </div>
      )
    })

    return { scrollToIndex }
  },
})

export type VDateRangePickerVirtualScroll = InstanceType<typeof VDateRangePickerVirtualScroll>
