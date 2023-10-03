// Composables
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, nextTick, ref, shallowRef, watch, watchEffect } from 'vue'
import {
  clamp,
  createRange,
  propsFactory,
} from '@/util'

// Types
import type { Ref } from 'vue'

const UP = -1
const DOWN = 1
const BUFFER_RATIO = 1 / 3

type VirtualProps = {
  itemHeight?: number | string
}

export const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null,
  },
}, 'virtual')

export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>, offset?: Ref<number>) {
  const display = useDisplay()

  const itemHeight = shallowRef(0)
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0)
  })

  const first = shallowRef(0)
  const last = shallowRef(itemHeight.value ? display.height.value / itemHeight.value : 1)

  const containerRef = ref<HTMLElement>()
  const { resizeRef, contentRect } = useResizeObserver()
  watchEffect(() => {
    resizeRef.value = containerRef.value
  })
  const unwatch = watch(() => !!(containerRef.value && contentRect.value && itemHeight.value), v => {
    if (!v) return
    unwatch()
    requestAnimationFrame(calculateVisibleItems)
  })

  const sizeMap = new Map<any, number>()
  let sizes = Array.from<number | null>({ length: items.value.length })

  function getSize (index: number) {
    return sizes[index] || itemHeight.value
  }

  function handleItemResize (index: number, height: number) {
    if (!itemHeight.value) itemHeight.value = height
    else itemHeight.value += (height - getSize(index)) / sizes.length
    sizes[index] = height
    sizeMap.set(items.value[index], height)
  }

  function calculateOffset (index: number) {
    return sizes.slice(0, index)
      .reduce((acc, val) => acc! + (val || itemHeight.value), 0)!
  }

  function calculateIndex (scrollTop: number) {
    const end = items.value.length

    let index = 0
    let indexOffset = 0
    while (indexOffset < scrollTop && index <= end) {
      indexOffset += getSize(index)
      index++
    }

    return Math.max(0, index - 1)
  }

  let lastScrollTop = 0
  let scrollVelocity = 0
  function getScrollVelocity (scrollTop: number) {
    const val = scrollTop - lastScrollTop
    lastScrollTop = scrollTop
    if (
      (val && Math.sign(val) !== Math.sign(scrollVelocity)) ||
      Math.abs(val) > Math.abs(scrollVelocity)
    ) return scrollVelocity = val

    scrollVelocity -= scrollVelocity / 10
    scrollVelocity += val / 10

    return scrollVelocity
  }

  let raf = -1
  function calculateVisibleItems () {
    cancelAnimationFrame(raf)
    if (!containerRef.value || !contentRect.value) return
    const scrollTop = containerRef.value.scrollTop
    const scrollVelocity = getScrollVelocity(scrollTop)
    const direction = Math.sign(scrollVelocity)

    if (Math.abs(scrollVelocity) > contentRect.value.height) {
      // We aren't rendering fast enough to keep up anyway, so don't bother
      raf = requestAnimationFrame(calculateVisibleItems)
      return
    }

    const bufferPx = contentRect.value.height * BUFFER_RATIO
    const scrollBuffer = Math.min(contentRect.value.height, Math.abs(scrollVelocity) * 2)

    const startPx = Math.max(0, scrollTop - bufferPx - (direction === UP ? scrollBuffer : 0))
    const start = clamp(calculateIndex(startPx), 0, items.value.length)
    const startOffset = scrollTop - calculateOffset(start)
    let end = start
    let endOffset = getSize(start)
    const endPx = startOffset + endOffset + contentRect.value.height + bufferPx + (direction === DOWN ? scrollBuffer : 0)
    do {
      endOffset += getSize(end++)
    } while (endOffset < endPx && end < items.value.length)

    end = clamp(end, 0, items.value.length)

    if (start === first.value && end === last.value) return

    const bufferOverflow = direction === UP
      ? Math.abs(calculateOffset(start) - calculateOffset(first.value))
      : Math.abs(calculateOffset(end) - calculateOffset(last.value))

    if (bufferOverflow > bufferPx || start === 0 || end === items.value.length) {
      first.value = start
      last.value = end
    }
  }

  function scrollToIndex (index: number) {
    if (!containerRef.value) return

    const offset = calculateOffset(index)
    containerRef.value.scrollTop = offset
  }

  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index) => ({
      raw: item,
      index: index + first.value,
    }))
  })
  const paddingTop = computed(() => calculateOffset(first.value))
  const paddingBottom = computed(() => calculateOffset(items.value.length) - calculateOffset(last.value))

  watch(() => items.value.length, () => {
    sizes = createRange(items.value.length).map(() => itemHeight.value)
    sizeMap.forEach((height, item) => {
      const index = items.value.indexOf(item)
      if (index === -1) {
        sizeMap.delete(item)
      } else {
        sizes[index] = height
      }
    })
  })

  return {
    containerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    calculateVisibleItems,
    handleItemResize,
  }
}
