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
  focusableChildren,
  genericComponent,
  getCurrentInstance,
  getScrollParent,
  propsFactory,
  useRender,
} from '@/util'
import { getNextElement } from '@/util/helpers'

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
      calculateVisibleItems,
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems,
    } = useVirtual(props, toRef(props, 'items'))

    async function focus (location: 'next' | 'prev' | 'first' | 'last' | number) {
      if (!containerRef.value) return

      function resolveIndex (container: HTMLElement, location: 'next' | 'prev' | 'first' | 'last' | number) {
        let index, shouldScroll
        if (typeof (location) === 'number') {
          index = location
          shouldScroll = true
        } else {
          const focusable = focusableChildren(container)
          if ((location === 'prev' || location === 'next') && !getNextElement(focusable, location)) {
            const effectiveLocation = location === 'next' ? 'first' : 'last'
            if (effectiveLocation === 'first') {
              index = 0
              shouldScroll = true
            } else {
              index = props.items.length - 1
              shouldScroll = true
            }
          } else {
            shouldScroll = false
            const currentElementIndex = Number((document.activeElement as HTMLElement).dataset?.itemIndex)
            if (Number.isNaN(currentElementIndex)) {
              index = 0
            } else {
              index = location === 'prev'
                ? currentElementIndex - 1
                : currentElementIndex + 1
            }
          }
        }

        return {
          index,
          shouldScroll,
        }
      }

      const { index, shouldScroll } = resolveIndex(containerRef.value, location)

      if (shouldScroll) {
        scrollToIndex(index)
      }

      // TODO: allow only one loop
      const started = performance.now()
      await new Promise(resolve => setTimeout(resolve, 100)); // wait for VMenu render
      (function findAndFocus () {
        window.requestAnimationFrame(() => {
          const listItemElement = containerRef.value?.querySelector(`[data-item-index='${index}']`) as HTMLElement
          if (!listItemElement && performance.now() < started + 3000) {
            findAndFocus()
          } else {
            listItemElement.focus()
          }
        })
      })()
    }

    useToggleScope(() => props.renderless, () => {
      function handleListeners (add = false) {
        const method = add ? 'addEventListener' : 'removeEventListener'

        if (containerRef.value === document.documentElement) {
          document[method]('scroll', handleScroll, { passive: true })
          document[method]('scrollend', handleScrollend)
        } else {
          containerRef.value?.[method]('scroll', handleScroll, { passive: true })
          containerRef.value?.[method]('scrollend', handleScrollend)
        }
      }

      onMounted(() => {
        containerRef.value = getScrollParent(vm.vnode.el as HTMLElement, true)
        handleListeners(true)
      })
      onScopeDispose(handleListeners)
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
          <div ref={ markerRef } class="v-virtual-scroll__spacer" style={{ paddingTop: convertToUnit(paddingTop.value) }} />
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
          onScrollPassive={ handleScroll }
          onScrollend={ handleScrollend }
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

    return {
      calculateVisibleItems,
      focus,
    }
  },
})

export type VVirtualScroll = InstanceType<typeof VVirtualScroll>
