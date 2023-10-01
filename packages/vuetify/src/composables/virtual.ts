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
const BUFFER_RATIO = 1 / 3

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
  const startIndex = shallowRef(0)
  const endIndex = shallowRef(0)
  const baseItemHeight = shallowRef(props.itemHeight)
  const itemHeight = computed({
    get: () => parseInt(baseItemHeight.value ?? 0, 10),
    set (val) {
      baseItemHeight.value = val
    },
  })
  const containerRef = ref<HTMLElement>()

  const isItemBeyondContainer = computed(() => containerRef.value && containerRef.value.clientHeight <= itemHeight.value)

  const bufferRatio = computed(() => isItemBeyondContainer.value ? 1 : BUFFER_RATIO)

  const bufferRatioReceprocal = computed(() => 1 / bufferRatio.value)

  const { resizeRef, contentRect } = useResizeObserver()
  watchEffect(() => {
    resizeRef.value = containerRef.value
  })
  const display = useDisplay()

  const sizeMap = new Map<any, number>()
  let sizes = Array.from<number | null>({ length: items.value.length })
  const visibleItems = computed(() => {
    if (endIndex.value > startIndex.value) return Math.ceil((endIndex.value - startIndex.value) * (1 + bufferRatio.value * 2))
    const height = (
      !contentRect.value || containerRef.value === document.documentElement
        ? display.height.value
        : contentRect.value.height
    ) - (offset?.value ?? 0)
    return Math.ceil((height / itemHeight.value) * (1 + bufferRatio.value * 2))
  })

  function handleItemResize (index: number, height: number) {
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
      const offset = sizes[index] || itemHeight.value
      indexOffset += isItemBeyondContainer.value && containerRef.value && index === 0
        ? (offset - containerRef.value.clientHeight)
        : offset
      index++
    }

    return index - 1
  }

  const last = computed(() => Math.min(items.value.length, first.value + visibleItems.value))

  let lastScrollTop = 0
  function handleScroll () {
    if (!containerRef.value || !contentRect.value) return
    const scrollTop = containerRef.value.scrollTop
    const direction = scrollTop < lastScrollTop ? UP : DOWN

    startIndex.value = calculateIndex(scrollTop)
    endIndex.value = startIndex.value
    let endOffset = sizes[startIndex.value]

    while (
      contentRect.value &&
      sizes[endIndex.value] &&
      (endOffset! += sizes[endIndex.value]!) < sizes[startIndex.value]! + contentRect.value.height
    ) {
      endIndex.value++
    }
    const buffer = isItemBeyondContainer.value ? 1 : Math.floor(visibleItems.value / (bufferRatioReceprocal.value + 2))

    if (direction === UP) {
      first.value = clamp(startIndex.value - buffer, 0, items.value.length)
    } else if (direction === DOWN) {
      first.value = clamp(startIndex.value - buffer, 0, items.value.length - visibleItems.value)
    }
    lastScrollTop = scrollTop
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
    itemHeight,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleItemResize,
  }
}
