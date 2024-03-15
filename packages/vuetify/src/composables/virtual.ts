// Composables
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, nextTick, onScopeDispose, ref, shallowRef, watch, watchEffect } from 'vue'
import { clamp, debounce, IN_BROWSER, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

const UP = -1
const DOWN = 1

/** Determines how large each batch of items should be */
const BUFFER_PX = 100

type VirtualProps = {
  itemHeight?: number | string
  height?: number | string
}

export const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null,
  },
  height: [Number, String],
}, 'virtual')

export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>) {
  const display = useDisplay()

  const itemHeight = shallowRef(0)
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0)
  })

  const first = shallowRef(0)
  const last = shallowRef(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(props.height!) || display.height.value) / (itemHeight.value || 16)
  ) || 1)
  const paddingTop = shallowRef(0)
  const paddingBottom = shallowRef(0)

  /** The scrollable element */
  const containerRef = ref<HTMLElement>()
  /** An element marking the top of the scrollable area,
   * used to add an offset if there's padding or other elements above the virtual list */
  const markerRef = ref<HTMLElement>()
  /** markerRef's offsetTop, lazily evaluated */
  let markerOffset = 0

  const { resizeRef, contentRect } = useResizeObserver()
  watchEffect(() => {
    resizeRef.value = containerRef.value
  })
  const viewportHeight = computed(() => {
    return containerRef.value === document.documentElement
      ? display.height.value
      : contentRect.value?.height || parseInt(props.height!) || 0
  })
  /** All static elements have been rendered and we have an assumed item height */
  const hasInitialRender = computed(() => {
    return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value)
  })

  let sizes = Array.from<number | null>({ length: items.value.length })
  let offsets = Array.from<number>({ length: items.value.length })
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

  const unwatch = watch(hasInitialRender, v => {
    if (!v) return
    // First render is complete, update offsets and visible
    // items in case our assumed item height was incorrect

    unwatch()
    markerOffset = markerRef.value!.offsetTop
    updateOffsets.immediate()
    calculateVisibleItems()

    if (!~targetScrollIndex) return

    nextTick(() => {
      IN_BROWSER && window.requestAnimationFrame(() => {
        scrollToIndex(targetScrollIndex)
        targetScrollIndex = -1
      })
    })
  })

  onScopeDispose(() => {
    updateOffsets.clear()
  })

  function handleItemResize (index: number, height: number) {
    const prevHeight = sizes[index]
    const prevMinHeight = itemHeight.value

    itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height

    if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
      sizes[index] = height
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

  watch(viewportHeight, (val, oldVal) => {
    if (oldVal) {
      calculateVisibleItems()
      if (val < oldVal) {
        requestAnimationFrame(() => {
          scrollVelocity = 0
          calculateVisibleItems()
        })
      }
    }
  })

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

    const startPx = Math.max(0, scrollTop - BUFFER_PX)
    const start = clamp(calculateIndex(startPx), 0, items.value.length)

    const endPx = scrollTop + viewportHeight.value + BUFFER_PX
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length)

    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (direction !== UP || start < first.value) &&
      (direction !== DOWN || end > last.value)
    ) {
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

  watch(items, () => {
    sizes = Array.from({ length: items.value.length })
    offsets = Array.from({ length: items.value.length })
    updateOffsets.immediate()
    calculateVisibleItems()
  }, { deep: true })

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
