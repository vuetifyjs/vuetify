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
import type { PropType, Ref } from 'vue'
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
  renderless: Boolean,

  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'VVirtualScroll')

export const VVirtualScroll = genericComponent<new <T, Renderless extends boolean = false>(
  props: {
    items?: readonly T[]
    renderless?: Renderless
  },
  slots: {
    default: VVirtualScrollSlot<T> & (Renderless extends true ? {
      itemRef: Ref<HTMLElement | undefined>
    } : {})
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
      scrollToItem,
      paddingTop,
      paddingBottom,
      computedItems,
    } = useVirtual(props, toRef(props, 'items'))

    useToggleScope(() => props.renderless, () => {
      onMounted(() => {
        containerRef.value = getScrollParent(vm.vnode.el as HTMLElement, true)
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
          renderless={ props.renderless }
          onUpdate:height={ height => handleItemResize(item.index, height) }
        >
          { slotProps => slots.default?.({ item: item.raw, index: item.index, ...slotProps }) }
        </VVirtualScrollItem>
      ))

      return props.renderless ? (
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
      scrollToItem,
    }
  },
})

export type VVirtualScroll = InstanceType<typeof VVirtualScroll>
