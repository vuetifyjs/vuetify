// Composables
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { ref, shallowRef, watch } from 'vue'
import { createVirtual, getPropertyFromItem, IN_BROWSER, isNumber, isString, propsFactory } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { SelectItemKey } from '@/util'

/** Pixel buffer useVirtual used to keep around the viewport. createVirtual counts rows. */
const BUFFER_PX = 100

type VirtualProps = {
  itemHeight: number | string | null | undefined
  itemKey: SelectItemKey
  height: number | string | undefined
}

export type ScrollToPosition = 'start' | 'center' | 'end'

export const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null,
  },
  itemKey: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: null,
  },
  height: [Number, String],
}, 'virtual')

export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>) {
  const display = useDisplay()
  const markerRef = ref<HTMLElement>()

  // push/splice keep the array reference. createVirtual only watches that reference.
  const list = shallowRef(items.value)
  watch(items, value => {
    list.value = value
  })
  watch(() => items.value.length, () => {
    list.value = items.value.slice()
  })

  const row = Number.parseFloat(String(props.itemHeight || 0))
  const parsedHeight = Number.parseInt(String(props.height))
  const fixedHeight = Number.isFinite(parsedHeight) && parsedHeight > 0
  // A list with no height prop, such as a select menu, still needs a viewport
  // or the first window stays empty. The screen height is that estimate.
  const viewport = fixedHeight ? parsedHeight : (display.height.value || 0)
  const virtual = createVirtual(list, {
    itemHeight: props.itemHeight,
    height: viewport || undefined,
    overscan: Math.ceil(BUFFER_PX / (row || 16)),
    marker: markerRef,
    itemKey: props.itemKey
      ? (item, index) => {
        const key = getPropertyFromItem(item, props.itemKey, index)
        return isString(key) || isNumber(key) ? key : index
      }
      : undefined,
    ownElement: false,
  })

  // createVirtual places its window from the scroll element, which the render
  // assigns. A stand-in applies the viewport during setup so the first frame
  // is already filled, including on the server.
  if (viewport) {
    virtual.element.value = { scrollTop: 0, scrollHeight: 0 } as HTMLElement
    virtual.scrollTo(0)
    virtual.element.value = undefined
  }

  // createVirtual keeps the scroll position it computed from the estimate.
  // A menu opens before the rows or the scrollport have been measured, so the
  // last request is replayed once both have arrived.
  let aim: { index: number, block: ScrollToPosition } | undefined
  let corrected = false
  let sawRow = row > 0
  let viewportReady = false
  let frame = 0

  function scrollTarget (index: number, block: ScrollToPosition) {
    virtual.scrollTo(index, { block })
    // createVirtual adds the marker offset for every block. On a list that
    // offset is the padding, which leaves a centered row one padding high.
    if (block === 'end') return

    const node = virtual.element.value
    const marker = markerRef.value
    if (!node || !marker) return

    node.scrollTop -= marker.offsetTop
  }

  function replay () {
    if (corrected || !aim || !sawRow || !viewportReady) return

    const node = virtual.element.value
    if (!node || node.clientHeight <= 0) return

    corrected = true
    const next = aim
    aim = undefined
    scrollTarget(next.index, next.block)
  }

  function arm () {
    if (!IN_BROWSER || corrected || !aim) return

    const token = ++frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (token !== frame) return
        replay()
      })
    })
  }

  function scrollToIndex (index: number, position: ScrollToPosition = 'start') {
    const last = items.value.length - 1
    if (last < 0) return

    let target = index < 0 ? 0 : index
    let block = position
    // An index of `length` is the offset after the last row.
    if (index >= items.value.length) {
      target = last
      block = position === 'start' ? 'end' : position
    }

    if (!corrected) {
      aim = { index: target, block }
      arm()
    }
    scrollTarget(target, block)
  }

  function handleItemResize (index: number, height: number) {
    virtual.resize(index, height)
    if (height <= 0) return

    sawRow = true
    arm()
  }

  useResizeObserver(virtual.element, entries => {
    const height = entries[0]?.contentRect.height ?? 0
    if (height <= 0) return
    // The screen-height seed is taller than a menu. A measurement that large
    // is the unclamped content, and scrolling against it sticks.
    if (!fixedHeight && viewport > 0 && height >= viewport) return

    viewportReady = true
    arm()
  })

  return {
    calculateVisibleItems: virtual.scroll,
    containerRef: virtual.element,
    markerRef,
    computedItems: virtual.items,
    paddingTop: virtual.offset,
    paddingBottom: virtual.size,
    scrollToIndex,
    handleScroll: virtual.scroll,
    handleScrollend: virtual.scrollend,
    handleItemResize,
  }
}
