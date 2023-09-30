// Composables
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, ref, shallowRef, watch, watchEffect } from 'vue'
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
  itemHeight: {
    type: [Number, String],
    default: 48,
  },
}, 'virtual')

export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>, offset?: Ref<number>) {
  const first = shallowRef(0)
  const itemHeight = parseInt(props.itemHeight ?? 0, 10)
  const containerRef = ref<HTMLElement>()
  const { resizeRef, contentRect } = useResizeObserver()
  watchEffect(() => {
    resizeRef.value = containerRef.value
  })
  const display = useDisplay()

  const sizeMap = new Map<any, number>()
  const averageItemHeight = shallowRef(itemHeight)
  let sizes = Array.from<number | null>({ length: items.value.length }).map(() => averageItemHeight.value)
  const visibleItems = computed(() => {
    const height = (
      !contentRect.value || containerRef.value === document.documentElement
        ? display.height.value
        : contentRect.value.height
    ) - (offset?.value ?? 0)
    return Math.ceil((height / averageItemHeight.value) * 1.7 + 1)
  })

  function handleItemResize (index: number, height: number) {
    const removeSize = (sizes[index] ?? itemHeight)
    const addSize = height
    if (removeSize === addSize) return
    averageItemHeight.value = averageItemHeight.value + ((addSize - removeSize) / sizes.length)
    sizes[index] = height
    sizeMap.set(items.value[index], height)
  }

  function calculateOffset (index: number) {
    return sizes.slice(0, index)
      .reduce((acc, val) => acc! + (val || averageItemHeight.value), 0)!
  }

  function calculateMidPointIndex (scrollTop: number) {
    const end = items.value.length

    let middle = 0
    let middleOffset = 0
    while (middleOffset < scrollTop && middle < end) {
      middleOffset += sizes[middle++] || averageItemHeight.value
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
    const firstIndex = midPointIndex - buffer
    const lastIndex = first.value + (buffer * 2) - 1
    if (direction === UP && midPointIndex <= lastIndex) {
      first.value = clamp(firstIndex, 0, items.value.length)
    } else if (direction === DOWN && midPointIndex >= lastIndex) {
      first.value = clamp(firstIndex, 0, items.value.length - visibleItems.value)
    }

    lastScrollTop = scrollTop
  }

  function scrollToIndex (index: number) {
    if (!containerRef.value || !contentRect.value) return

    const offset = calculateOffset(index)
    containerRef.value.scrollTop = Math.max(0, offset - (contentRect.value.height / 2))
  }

  const last = computed(() => Math.min(items.value.length, first.value + visibleItems.value))
  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index) => ({
      raw: item,
      index: index + first.value,
    }))
  })
  const paddingTop = computed(() => calculateOffset(first.value))
  const paddingBottom = computed(() => calculateOffset(items.value.length) - calculateOffset(last.value))

  watch(() => items.value.length, () => {
    sizes = createRange(items.value.length).map(() => averageItemHeight.value)
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
