// Utilities
import { computed, ref, shallowRef } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

export const makeDataTableVirtualProps = propsFactory({
  visibleItems: {
    type: [String, Number],
    default: 20,
  },
  itemHeight: {
    type: [String, Number],
    default: 52,
  },
}, 'virtual')

type VirtualProps = {
  itemHeight: string | number
  visibleItems: string | number
}

const UP = -1
const DOWN = 1

// TODO: Replace this with composable from v-virtual-scroll
export function useVirtual (props: VirtualProps, items: Ref<any[]>) {
  const startIndex = shallowRef(0)
  const itemHeight = computed(() => parseInt(props.itemHeight, 10))
  const visibleItems = computed(() => parseInt(props.visibleItems, 10))
  const containerRef = ref<HTMLDivElement>()
  const isScrolling = shallowRef(false)

  function calculateOffset (index: number) {
    return index * itemHeight.value
  }

  function calculateMidPointIndex (scrollTop: number) {
    let start = 0
    let end = items.value.length

    while (start <= end) {
      const middle = start + Math.floor((end - start) / 2)
      const middleOffset = calculateOffset(middle)

      if (middleOffset === scrollTop) {
        return middle
      } else if (middleOffset < scrollTop) {
        start = middle + 1
      } else if (middleOffset > scrollTop) {
        end = middle - 1
      }
    }

    return start
  }

  let lastScrollTop = 0
  let scrollTimeout: any
  function handleScroll () {
    if (!containerRef.value) return

    isScrolling.value = true
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      isScrolling.value = false
    }, 100)

    const scrollTop = containerRef.value.scrollTop
    const direction = scrollTop < lastScrollTop ? UP : DOWN

    const midPointIndex = calculateMidPointIndex(scrollTop)

    const buffer = Math.round(visibleItems.value / 3)
    if (direction === UP && midPointIndex <= startIndex.value) {
      startIndex.value = Math.max(midPointIndex - buffer, 0)
    } else if (direction === DOWN && midPointIndex >= startIndex.value + (buffer * 2)) {
      startIndex.value = Math.min(Math.max(0, midPointIndex - buffer), items.value.length - visibleItems.value)
    }

    lastScrollTop = containerRef.value.scrollTop
  }

  const stopIndex = computed(() => Math.min(items.value.length, startIndex.value + visibleItems.value))
  const paddingTop = computed(() => calculateOffset(startIndex.value))
  const paddingBottom = computed(() => calculateOffset(items.value.length) - calculateOffset(stopIndex.value))

  return {
    startIndex,
    stopIndex,
    paddingTop,
    paddingBottom,
    handleScroll,
    containerRef,
    itemHeight,
    isScrolling,
  }
}
