// Utilities
import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { convertToUnit } from '@/util'

// Types
import type { CSSProperties, Ref } from 'vue'

interface StickyProps {
  rootEl: Ref<HTMLElement | undefined>
  isSticky: Ref<boolean>
  layoutItemStyles: Ref<CSSProperties>
}

export function useSticky ({ rootEl, isSticky, layoutItemStyles }: StickyProps) {
  const isStuck = shallowRef<boolean | 'top' | 'bottom'>(false)
  const stuckPosition = shallowRef(0)

  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === 'boolean' ? 'top' : isStuck.value
    return [
      isSticky.value ? { top: 'auto', bottom: 'auto', height: undefined } : undefined,
      isStuck.value
        ? { [side]: convertToUnit(stuckPosition.value) }
        : { top: layoutItemStyles.value.top },
    ]
  })

  onMounted(() => {
    watch(isSticky, val => {
      if (val) {
        window.addEventListener('scroll', onScroll, { passive: true })
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    }, { immediate: true })
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', onScroll)
  })

  let lastScrollTop = 0
  function onScroll () {
    const direction = lastScrollTop > window.scrollY ? 'up' : 'down'
    const rect = rootEl.value!.getBoundingClientRect()
    const layoutTop = parseFloat(layoutItemStyles.value.top ?? 0)
    const top = window.scrollY - Math.max(0, stuckPosition.value - layoutTop)
    const bottom =
      rect.height +
      Math.max(stuckPosition.value, layoutTop) -
      window.scrollY -
      window.innerHeight
    const bodyScroll = parseFloat(getComputedStyle(rootEl.value!).getPropertyValue('--v-body-scroll-y')) || 0

    if (rect.height < window.innerHeight - layoutTop) {
      isStuck.value = 'top'
      stuckPosition.value = layoutTop
    } else if (
      (direction === 'up' && isStuck.value === 'bottom') ||
      (direction === 'down' && isStuck.value === 'top')
    ) {
      stuckPosition.value = window.scrollY + rect.top - bodyScroll
      isStuck.value = true
    } else if (direction === 'down' && bottom <= 0) {
      stuckPosition.value = 0
      isStuck.value = 'bottom'
    } else if (direction === 'up' && top <= 0) {
      if (!bodyScroll) {
        stuckPosition.value = rect.top + top
        isStuck.value = 'top'
      } else if (isStuck.value !== 'top') {
        stuckPosition.value = -top + bodyScroll + layoutTop
        isStuck.value = 'top'
      }
    }

    lastScrollTop = window.scrollY
  }

  return { isStuck, stickyStyles }
}
