// Styles
import './VVirtualScroll.sass'

// Components
import { VVirtualScrollItem } from './VVirtualScrollItem'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useToggleScope } from '@/composables/toggleScope'
import { makeVirtualProps, useVirtual } from '@/composables/virtual'

// Utilities
import { onMounted, onScopeDispose, toRef } from 'vue'
import {
  convertToUnit,
  genericComponent,
  getCurrentInstance,
  getScrollParent,
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
  inline: Boolean,

  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'v-virtual-scroll')

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
    const vm = getCurrentInstance('VVirtualScroll')
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

    useToggleScope(() => props.inline, () => {
      onMounted(() => {
        containerRef.value = getScrollParent(vm.ctx.$el as HTMLElement)
        containerRef.value?.addEventListener('scroll', handleScroll)
      })
      onScopeDispose(() => {
        containerRef.value?.removeEventListener('scroll', handleScroll)
      })
    })

    useRender(() => {
      const children = computedItems.value.map(item => (
        <VVirtualScrollItem
          key={ item.index }
          dynamicHeight={ !props.itemHeight }
          onUpdate:height={ height => handleItemResize(item.index, height) }
        >
          { slots.default?.({ item: item.raw, index: item.index }) }
        </VVirtualScrollItem>
      ))

      return props.inline ? (
        <>
          <div class="v-virtual-scroll__spacer" style={{ paddingTop: convertToUnit(paddingTop.value) }} />
          { children }
          <div class="v-virtual-scroll__spacer" style={{ paddingBottom: convertToUnit(paddingBottom.value) }} />
        </>
      ) : (
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
            { children }
          </div>
        </div>
      )
    })

    return {
      scrollToIndex,
    }
  },
})

export type VVirtualScroll = InstanceType<typeof VVirtualScroll>
