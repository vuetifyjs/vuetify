// Utilities
import { computed, ref, watch } from 'vue'
import { useGroup, useGroupItem } from './group'
import { useResizeObserver } from './resizeObserver'

// Types
import type { InjectionKey } from 'vue'
import type { GroupItemProps, GroupProps, GroupProvide } from './group'
import { useRtl } from '.'

export const VSlideGroupSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-slide-group')

function bias (val: number) {
  const c = 0.501
  const x = Math.abs(val)
  return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1))
}

function calculateUpdatedOffset ({
  selectedElement,
  containerSize,
  contentSize,
  isRtl,
  currentScrollOffset,
  isHorizontal,
}: {
  selectedElement: HTMLElement
  containerSize: number
  contentSize: number
  isRtl: boolean
  currentScrollOffset: number
  isHorizontal: boolean
}): number {
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop
  const adjustedOffsetStart = isRtl ? (contentSize - offsetStart - clientSize) : offsetStart

  if (isRtl) {
    currentScrollOffset = -currentScrollOffset
  }

  const totalSize = containerSize + currentScrollOffset
  const itemOffset = clientSize + adjustedOffsetStart
  const additionalOffset = clientSize * 0.4

  if (adjustedOffsetStart <= currentScrollOffset) {
    currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0)
  } else if (totalSize <= itemOffset) {
    currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize)
  }

  return isRtl ? -currentScrollOffset : currentScrollOffset
}

export function calculateCenteredOffset ({
  selectedElement,
  containerSize,
  contentSize,
  isRtl,
  isHorizontal,
}: {
  selectedElement: HTMLElement
  containerSize: number
  contentSize: number
  isRtl: boolean
  isHorizontal: boolean
}): number {
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop

  if (isRtl) {
    const offsetCentered = contentSize - offsetStart - clientSize / 2 - containerSize / 2
    return -Math.min(contentSize - containerSize, Math.max(0, offsetCentered))
  } else {
    const offsetCentered = offsetStart + clientSize / 2 - containerSize / 2
    return Math.min(contentSize - containerSize, Math.max(0, offsetCentered))
  }
}

export function useSlideGroup (
  props: GroupProps & {
    direction?: 'vertical' | 'horizontal'
    centerActive?: boolean | undefined
  },
  injectKey: InjectionKey<GroupProvide> = VSlideGroupSymbol
) {
  const { isRtl } = useRtl()
  const group = useGroup(props, injectKey)
  const isOverflowing = ref(false)
  const scrollOffset = ref(0)
  const containerSize = ref(0)
  const contentSize = ref(0)
  const contentRef = ref<HTMLElement | undefined>()
  const isHorizontal = computed(() => props.direction === 'horizontal')

  const { resizeRef: containerRef } = useResizeObserver(() => {
    const sizeProperty = isHorizontal.value ? 'clientWidth' : 'clientHeight'

    containerSize.value = containerRef.value?.[sizeProperty] ?? 0
    contentSize.value = contentRef.value?.[sizeProperty] ?? 0

    isOverflowing.value = containerSize.value + 1 < contentSize.value
  })

  watch(group.selected, selected => {
    if (!selected.length || !contentRef.value) return

    const index = group.items.value.findIndex(item => item.id === selected[0])

    // TODO: Is this too naive? Should we store element references in group composable?
    const selectedElement = contentRef.value.children[index] as HTMLElement

    if (index === 0 || !isOverflowing.value) {
      scrollOffset.value = 0
    } else if (props.centerActive) {
      scrollOffset.value = calculateCenteredOffset({
        selectedElement,
        containerSize: containerSize.value,
        contentSize: contentSize.value,
        isRtl: isRtl.value,
        isHorizontal: isHorizontal.value,
      })
    } else if (isOverflowing.value) {
      scrollOffset.value = calculateUpdatedOffset({
        selectedElement,
        containerSize: containerSize.value,
        contentSize: contentSize.value,
        isRtl: isRtl.value,
        currentScrollOffset: scrollOffset.value,
        isHorizontal: isHorizontal.value,
      })
    }
  })

  const disableTransition = ref(false)

  let startTouch = 0
  let startOffset = 0
  let firstMove = true

  function onTouchstart (e: TouchEvent) {
    const sizeProperty = isHorizontal.value ? 'clientX' : 'clientY'
    startOffset = scrollOffset.value
    startTouch = e.touches[0][sizeProperty]
    disableTransition.value = true
  }

  function onTouchmove (e: TouchEvent) {
    if (!isOverflowing.value) return

    const sizeProperty = isHorizontal.value ? 'clientX' : 'clientY'
    scrollOffset.value = startOffset + startTouch - e.touches[0][sizeProperty]
  }

  function onTouchend (e: TouchEvent) {
    const maxScrollOffset = contentSize.value - containerSize.value

    if (isRtl.value) {
      if (scrollOffset.value > 0 || !isOverflowing.value) {
        scrollOffset.value = 0
      } else if (scrollOffset.value <= -maxScrollOffset) {
        scrollOffset.value = -maxScrollOffset
      }
    } else {
      if (scrollOffset.value < 0 || !isOverflowing.value) {
        scrollOffset.value = 0
      } else if (scrollOffset.value >= maxScrollOffset) {
        scrollOffset.value = maxScrollOffset
      }
    }

    disableTransition.value = false
    firstMove = true
  }

  const containerListeners = {
    onTouchend,
    onTouchmove,
    onTouchstart,
  }

  const contentStyles = computed(() => {
    const scrollAmount = scrollOffset.value <= 0
      ? bias(-scrollOffset.value)
      : scrollOffset.value > contentSize.value - containerSize.value
        ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value)
        : -scrollOffset.value

    return {
      transform: `translate${isHorizontal.value ? 'X' : 'Y'}(${scrollAmount}px)`,
      transition: disableTransition.value ? 'none' : '',
      willChange: disableTransition.value ? 'transform' : '',
    }
  })

  return { ...group, containerRef, contentRef, contentStyles, containerListeners }
}

export function useSlideGroupItem (props: GroupItemProps, injectKey: InjectionKey<GroupProvide> = VSlideGroupSymbol) {
  return useGroupItem(props, injectKey)
}
