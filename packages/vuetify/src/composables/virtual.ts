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

export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>) {
  const display = useDisplay()

  const itemHeight = shallowRef(0)
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0)
  })

  const first = shallowRef(0)
  const last = shallowRef(display.height.value / (itemHeight.value || 16))

  const containerRef = ref<HTMLElement>()
  const markerRef = ref<HTMLElement>()
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
  let markerOffset = 0
  function handleScroll () {
    if (!containerRef.value || !markerRef.value) return

    const scrollTop = containerRef.value.scrollTop
    const scrollTime = performance.now()
    const scrollDeltaT = scrollTime - lastScrollTime

    if (scrollDeltaT > 500) {
      scrollVelocity = 0

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

  let raf = -1
  function calculateVisibleItems () {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(_calculateVisibleItems)
  }
  function _calculateVisibleItems () {
    if (!containerRef.value || !viewportHeight.value) return
    const scrollTop = lastScrollTop - markerOffset
    const direction = Math.sign(scrollVelocity)

    const bufferPx = viewportHeight.value * BUFFER_RATIO
    const scrollBuffer = Math.min(viewportHeight.value, Math.abs(scrollVelocity) * 2)

    const startPx = Math.max(0, scrollTop - bufferPx - (direction === UP ? scrollBuffer : 0))
    const start = clamp(calculateIndex(startPx), 0, items.value.length)

    const endPx = scrollTop + getSize(start) + viewportHeight.value + bufferPx + (direction === DOWN ? scrollBuffer : 0)
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length)

    if (start === first.value && end === last.value) return

    const bufferOverflow = direction === UP
      ? Math.abs(calculateOffset(start) - calculateOffset(first.value))
      : Math.abs(calculateOffset(end) - calculateOffset(last.value))

    if (bufferOverflow > bufferPx || start <= 0 || end >= items.value.length) {
      first.value = start
      last.value = end
    }
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
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
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
