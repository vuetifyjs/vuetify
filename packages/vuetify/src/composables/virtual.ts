// Composables
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { InjectionKey, computed, inject, onMounted, provide, shallowRef, watch } from 'vue'
import {
  clamp,
  propsFactory,
  refElement,
} from '@/util'

// Types
import type { Ref } from 'vue'

const UP = -1
const DOWN = 1

type VirtualProps = {
  itemHeight?: number | string
}

export interface Virtual {
  key: string
}

export type VirtualProvide<T> = {
  containerRef: Ref<any>
  virtualItems: Ref<{ key: number | string, item: T }[]>
  itemHeight: Ref<number>
  paddingTop: Ref<number>
  paddingBottom: Ref<number>
  scrollToIndex: (index: number) => void
  handleScroll: () => void
  handleItemResize: (key: string | number, height: number) => void
}

type KeyFn<T> = (item: T, index: number) => string | number

export const VirtualSymbol: InjectionKey<{ handleItemResize: (id: string | number, height: number) => void }> = Symbol.for('vuetify:virtual')

export const makeVirtualProps = propsFactory({
  itemHeight: [Number, String],
}, 'virtual')

export function useVirtualItem () {
  const virtual = inject(VirtualSymbol)

  if (!virtual) {
    throw new Error('VVirtualScrollItem should only be used inside VVirtualScroll')
  }

  return virtual
}

export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>, offset?: Ref<number>, keyFn: KeyFn<T> = (_, index) => index): VirtualProvide<T> {
  const first = shallowRef(0)
  const baseItemHeight = shallowRef(props.itemHeight)
  const itemHeight = computed({
    get: () => parseInt(baseItemHeight.value ?? 0, 10),
    set (val) {
      baseItemHeight.value = val
    },
  })
  const keyedItems = computed(() => items.value.map((item, index) => ({ key: keyFn(item, index), item })))
  const { resizeRef: containerRef, contentRect } = useResizeObserver()
  const display = useDisplay()

  const sizeMap = new Map<string | number, number>()

  const visibleItems = computed(() => {
    const height = (contentRect.value?.height ?? display.height.value) - (offset?.value ?? 0)
    return itemHeight.value
      ? Math.max(12,
        Math.ceil((height / itemHeight.value) * 1.7 + 1)
      )
      : 12
  })

  function handleItemResize (id: number | string, height: number) {
    itemHeight.value = Math.max(itemHeight.value, height)
    sizeMap.set(id, height)
  }

  function calculateOffset (index: number) {
    return keyedItems.value.slice(0, index).reduce((curr, item, i) => curr + (sizeMap.get(item.key) || itemHeight.value), 0)
  }

  function calculateMidPointIndex (scrollTop: number) {
    const end = keyedItems.value.length

    let middle = 0
    let middleOffset = 0
    while (middleOffset < scrollTop && middle < end) {
      middleOffset += sizeMap.get(keyedItems.value[middle++].key) || itemHeight.value
    }

    return middle - 1
  }

  let lastScrollTop = 0
  function handleScroll () {
    if (!containerRef.value || !contentRect.value) return
    const el = refElement(containerRef.value)

    const height = contentRect.value.height - 56
    const scrollTop = el.scrollTop
    const direction = scrollTop < lastScrollTop ? UP : DOWN

    const midPointIndex = calculateMidPointIndex(scrollTop + height / 2)
    const buffer = Math.round(visibleItems.value / 3)
    if (direction === UP && midPointIndex <= first.value + (buffer * 2) - 1) {
      first.value = clamp(midPointIndex - buffer, 0, items.value.length)
    } else if (direction === DOWN && midPointIndex >= first.value + (buffer * 2) - 1) {
      first.value = clamp(midPointIndex - buffer, 0, items.value.length - visibleItems.value)
    }

    lastScrollTop = el.scrollTop
  }

  function scrollToIndex (index: number) {
    if (!containerRef.value) return
    const el = refElement(containerRef.value)

    const offset = calculateOffset(index)
    el.scrollTop = offset
  }

  const last = computed(() => Math.min(keyedItems.value.length, first.value + visibleItems.value))
  const virtualItems = computed(() => keyedItems.value.slice(first.value, last.value))
  const paddingTop = computed(() => calculateOffset(first.value))
  const paddingBottom = computed(() => calculateOffset(keyedItems.value.length) - calculateOffset(last.value))

  onMounted(() => {
    if (!itemHeight.value) {
      // If itemHeight prop is not set, then calculate an estimated height from the average of inital items
      itemHeight.value = virtualItems.value.reduce<number>((curr, item) => curr + (sizeMap.get(item.key) || itemHeight.value), 0) / (visibleItems.value)
    }
  })

  watch(() => keyedItems.value.length, () => {
    sizeMap.forEach((_, key) => {
      const index = keyedItems.value.findIndex(item => item.key === key)
      if (index === -1) {
        sizeMap.delete(key)
      }
    })
  })

  provide(VirtualSymbol, { handleItemResize })

  return {
    containerRef,
    virtualItems,
    itemHeight,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleItemResize,
  }
}
