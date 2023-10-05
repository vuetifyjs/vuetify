// Composables
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, nextTick, onScopeDispose, ref, shallowRef, watch, watchEffect } from 'vue'
import {
  clamp,
  createRange,
  debounce,
  propsFactory,
  SUPPORTS_SCROLLEND,
} from '@/util'

// Types
import type { Ref } from 'vue'

const UP = -1
const DOWN = 1
const BUFFER_PX = 100

type VirtualProps = {
  itemHeight?: number | string
}

export const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null,
  },
}, 'virtual')

export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>) {
  const display = useDisplay()

  const itemHeight = shallowRef(0)
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0)
  })

  const first = shallowRef(0)
  const last = shallowRef(Math.ceil(display.height.value / (itemHeight.value || 16) || 1))
  const paddingTop = shallowRef(0)
  const paddingBottom = shallowRef(0)

  const containerRef = ref<HTMLElement>()
  const markerRef = ref<HTMLElement>()
  let markerOffset = 0

  const { resizeRef, contentRect } = useResizeObserver()
  watchEffect(() => {
    resizeRef.value = containerRef.value
  })
  const viewportHeight = computed(() => {
    return containerRef.value === document.documentElement
      ? display.height.value
      : contentRect.value?.height || 0
  })

  const sizeMap = new Map<any, number>()
  let sizes = Array.from<number | null>({ length: items.value.length })
  const offsets = Array.from<number>({ length: items.value.length })
  const updateTime = shallowRef(0)
  let targetScrollIndex = -1

  function getSize (index: number) {
    return sizes[index] || itemHeight.value
  }

  const updateOffsets = debounce(() => {
    const start = performance.now()
    offsets[0] = 0
    const length = items.value.length
    for (let i = 1; i <= length - 1; i++) {
      offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1)
    }
    updateTime.value = Math.max(updateTime.value, performance.now() - start)
  }, updateTime)

  const unwatch = watch(() => !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value), v => {
    if (!v) return
    unwatch()
    markerOffset = markerRef.value!.offsetTop
    updateOffsets.immediate()
    calculateVisibleItems()

    if (~targetScrollIndex) {
      nextTick(() => {
        requestAnimationFrame(() => {
          scrollToIndex(targetScrollIndex)
          targetScrollIndex = -1
        })
      })
    }
  })
  watch(viewportHeight, (val, oldVal) => {
    oldVal && calculateVisibleItems()
  })

  onScopeDispose(() => {
    updateOffsets.clear()
  })

  function handleItemResize (index: number, height: number) {
    const prevMinHeight = itemHeight.value
    if (!itemHeight.value) itemHeight.value = height
    else itemHeight.value = Math.min(itemHeight.value, height)
    const prevHeight = sizes[index]
    if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
      sizes[index] = height
      sizeMap.set(items.value[index], height)
      updateOffsets()
    }
  }

  function calculateOffset (index: number) {
    index = clamp(index, 0, items.value.length - 1)
    return offsets[index] || 0
  }

  function calculateIndex (scrollTop: number) {
    return binaryClosest(offsets, scrollTop)
  }

  let lastScrollTop = 0
  let scrollVelocity = 0
  let lastScrollTime = 0
  function handleScroll () {
    if (!containerRef.value || !markerRef.value) return

    const scrollTop = containerRef.value.scrollTop
    const scrollTime = performance.now()
    const scrollDeltaT = scrollTime - lastScrollTime

    if (scrollDeltaT > 500) {
      scrollVelocity = Math.sign(scrollTop - lastScrollTop)

      // Not super important, only update at the
      // start of a scroll sequence to avoid reflows
      markerOffset = markerRef.value.offsetTop
    } else {
      scrollVelocity = scrollTop - lastScrollTop
    }

    lastScrollTop = scrollTop
    lastScrollTime = scrollTime

    calculateVisibleItems()
  }
  function handleScrollend () {
    if (!containerRef.value || !markerRef.value) return

    scrollVelocity = 0
    lastScrollTime = 0

    calculateVisibleItems()
  }

  let raf = -1
  function calculateVisibleItems () {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(_calculateVisibleItems)
  }
  function _calculateVisibleItems () {
    if (!containerRef.value || !viewportHeight.value) return
    const scrollTop = lastScrollTop - markerOffset
    const direction = Math.sign(scrollVelocity)

    const scrollOffset = SUPPORTS_SCROLLEND ? scrollVelocity : 0

    const startPx = Math.max(0, scrollTop - BUFFER_PX + scrollOffset)
    const start = clamp(calculateIndex(startPx), 0, items.value.length)

    const endPx = scrollTop + getSize(start) + viewportHeight.value + BUFFER_PX + scrollOffset
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length)

    if (
      (direction === UP && start >= first.value) ||
      (direction === DOWN && end <= last.value)
    ) return

    const topOverflow = calculateOffset(first.value) - calculateOffset(start)
    const bottomOverflow = calculateOffset(end) - calculateOffset(last.value)
    const bufferOverflow = Math.max(topOverflow, bottomOverflow)

    if (bufferOverflow > BUFFER_PX) {
      first.value = start
      last.value = end
    } else {
      // Only update the side that's reached its limit if there's still buffer left
      if (start <= 0) first.value = start
      if (end >= items.value.length) last.value = end
    }

    paddingTop.value = calculateOffset(first.value)
    paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value)
  }

  function scrollToIndex (index: number) {
    const offset = calculateOffset(index)
    if (!containerRef.value || (index && !offset)) {
      targetScrollIndex = index
    } else {
      containerRef.value.scrollTop = offset
    }
  }

  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index) => ({
      raw: item,
      index: index + first.value,
    }))
  })

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
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleScrollend,
    handleItemResize,
  }
}

// https://gist.github.com/robertleeplummerjr/1cc657191d34ecd0a324
function binaryClosest (arr: ArrayLike<number>, val: number) {
  let high = arr.length - 1
  let low = 0
  let mid = 0
  let item = null
  let target = -1

  if (arr[high]! < val) {
    return high
  }

  while (low <= high) {
    mid = (low + high) >> 1
    item = arr[mid]!

    if (item > val) {
      high = mid - 1
    } else if (item < val) {
      target = mid
      low = mid + 1
    } else if (item === val) {
      return mid
    } else {
      return low
    }
  }

  return target
}
