// Composables
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, onMounted, ref, shallowRef, watch, watchEffect } from 'vue'
import {
  clamp,
  createRange,
  propsFactory,
} from '@/util'

// Types
import type { Ref } from 'vue'

const UP = -1
const DOWN = 1

type VirtualProps = {
  itemHeight?: number | string
}

export const makeVirtualProps = propsFactory({
  itemHeight: [Number, String],
}, 'virtual')

export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>, offset?: Ref<number>) {
  const first = shallowRef(0)
  const baseItemHeight = shallowRef(props.itemHeight)
  const itemHeight = computed({
    get: () => parseInt(baseItemHeight.value ?? 0, 10),
    set (val) {
      baseItemHeight.value = val
    },
  })
  const containerRef = ref<HTMLDivElement>()
  const { resizeRef, contentRect } = useResizeObserver()
  watchEffect(() => {
    resizeRef.value = containerRef.value
  })
  const display = useDisplay()

  const sizeMap = new Map<any, number>()
  let sizes = createRange(items.value.length).map(() => itemHeight.value)
  const visibleItems = computed(() => {
    const height = (contentRect.value?.height ?? display.height.value) - (offset?.value ?? 0)
    return itemHeight.value
      ? Math.max(12,
        Math.ceil((height / itemHeight.value) * 1.7 + 1)
      )
      : 12
  })

  function handleItemResize (index: number, height: number) {
    itemHeight.value = Math.max(itemHeight.value, height)
    sizes[index] = height
    sizeMap.set(items.value[index], height)
  }

  function calculateOffset (index: number) {
    return sizes.slice(0, index).reduce((curr, value) => curr + (value || itemHeight.value), 0)
  }

  function calculateMidPointIndex (scrollTop: number) {
    const end = items.value.length

    let middle = 0
    let middleOffset = 0
    while (middleOffset < scrollTop && middle < end) {
      middleOffset += sizes[middle++] || itemHeight.value
    }

    return middle - 1
  }

  let lastScrollTop = 0
  function handleScroll () {
    if (!containerRef.value || !contentRect.value) return

    const height = contentRect.value.height - 56
    const scrollTop = containerRef.value.scrollTop
    const direction = scrollTop < lastScrollTop ? UP : DOWN

    const midPointIndex = calculateMidPointIndex(scrollTop + height / 2)
    const buffer = Math.round(visibleItems.value / 3)
    if (direction === UP && midPointIndex <= first.value + (buffer * 2) - 1) {
      first.value = clamp(midPointIndex - buffer, 0, items.value.length)
    } else if (direction === DOWN && midPointIndex >= first.value + (buffer * 2) - 1) {
      first.value = clamp(midPointIndex - buffer, 0, items.value.length - visibleItems.value)
    }

    lastScrollTop = containerRef.value.scrollTop
  }

  function scrollToIndex (index: number) {
    if (!containerRef.value) return

    const offset = calculateOffset(index)
    containerRef.value.scrollTop = offset
  }

  const allItems = computed(() => items.value.map((item, index) => ({
    raw: item,
    index,
  })))
  const last = computed(() => Math.min(items.value.length, first.value + visibleItems.value))
  const computedItems = computed(() => allItems.value.slice(first.value, last.value))
  const paddingTop = computed(() => calculateOffset(first.value))
  const paddingBottom = computed(() => calculateOffset(items.value.length) - calculateOffset(last.value))

  onMounted(() => {
    if (!itemHeight.value) {
      // If itemHeight prop is not set, then calculate an estimated height from the average of inital items
      itemHeight.value = sizes.slice(first.value, last.value).reduce((curr, height) => curr + height, 0) / (visibleItems.value)
    }
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
    computedItems,
    itemHeight,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleItemResize,
  }
}
