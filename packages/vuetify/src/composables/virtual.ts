// Composables
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { InjectionKey, computed, onMounted, provide, ref, shallowRef, watch, watchEffect } from 'vue'
import {
  clamp,
  propsFactory,
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
  virtualItems: Ref<T[]>
  itemHeight: Ref<number>
  paddingTop: Ref<number>
  paddingBottom: Ref<number>
  scrollToIndex: (index: number) => void
  handleScroll: () => void
  handleItemResize: (id: string | number, height: number) => void
}

export const VirtualSymbol: InjectionKey<{ handleItemResize: (id: string | number, height: number) => void }> = Symbol.for('vuetify:virtual')

export const makeVirtualProps = propsFactory({
  itemHeight: [Number, String],
}, 'virtual')

export function useVirtual <T extends Virtual> (props: VirtualProps, items: Ref<readonly T[]>, offset?: Ref<number>, hasKey?: true): VirtualProvide<T>
export function useVirtual <T> (props: VirtualProps, items: Ref<readonly T[]>, offset?: Ref<number>, hasKey?: false): VirtualProvide<T>
export function useVirtual <T extends Virtual> (props: VirtualProps, items: Ref<readonly T[]>, offset?: Ref<number>, hasKey?: boolean): VirtualProvide<T> {
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

  const sizeMap = new Map<string | number, number>()
  let keys = items.value.map((item, index) => hasKey ? item.key : index)
  console.log(keys)
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
    return items.value.slice(0, index).reduce((curr, item, i) => curr + (sizeMap.get(hasKey ? item.key : i) || itemHeight.value), 0)
  }

  function calculateMidPointIndex (scrollTop: number) {
    const end = items.value.length

    let middle = 0
    let middleOffset = 0
    while (middleOffset < scrollTop && middle < end) {
      const key = keys[middle++]
      middleOffset += sizeMap.get(key) || itemHeight.value
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

  const last = computed(() => Math.min(items.value.length, first.value + visibleItems.value))
  const virtualItems = computed(() => items.value.slice(first.value, last.value))
  const paddingTop = computed(() => calculateOffset(first.value))
  const paddingBottom = computed(() => calculateOffset(items.value.length) - calculateOffset(last.value))

  onMounted(() => {
    if (!itemHeight.value) {
      // If itemHeight prop is not set, then calculate an estimated height from the average of inital items
      itemHeight.value = keys.slice(first.value, last.value).reduce<number>((curr, key) => curr + (sizeMap.get(key) || itemHeight.value), 0) / (visibleItems.value)
    }
  })

  watch(() => items.value.length, () => {
    keys = items.value.map(item => item.key)
    sizeMap.forEach((_, key) => {
      const index = items.value.findIndex((item, index) => hasKey ? item.key === key : index === key)
      if (index === -1) {
        sizeMap.delete(key)
      } else {
        sizeMap.set(key, itemHeight.value)
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
