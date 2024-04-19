// Utilities
import { shallowRef, watch } from 'vue'
import { IN_BROWSER } from '@/util'

// Types
import type { Ref } from 'vue'
import type { VList } from '@/components/VList'
import type { VTextField } from '@/components/VTextField'
import type { VVirtualScroll } from '@/components/VVirtualScroll/VVirtualScroll'
import type { ListItem } from '@/composables/list-items'

export function useScrolling (
  listRef: Ref<VList | undefined>,
  textFieldRef: Ref<VTextField | undefined>,
  virtualScrollRef: Ref<VVirtualScroll | undefined>,
  displayItems: Ref<ListItem[]>
) {
  const isScrolling = shallowRef(false)
  let scrollTimeout: number
  function onListScroll (e: Event) {
    cancelAnimationFrame(scrollTimeout)
    isScrolling.value = true
    scrollTimeout = requestAnimationFrame(() => {
      scrollTimeout = requestAnimationFrame(() => {
        isScrolling.value = false
      })
    })
  }
  async function finishScrolling () {
    await new Promise(resolve => requestAnimationFrame(resolve))
    await new Promise(resolve => requestAnimationFrame(resolve))
    await new Promise(resolve => requestAnimationFrame(resolve))
    await new Promise<void>(resolve => {
      if (isScrolling.value) {
        const stop = watch(isScrolling, () => {
          stop()
          resolve()
        })
      } else resolve()
    })
  }
  async function onListKeydown (e: KeyboardEvent) {
    if (e.key === 'ArrowUp' && listRef.value?.focusedIndex === 0) {
      IN_BROWSER && requestAnimationFrame(() => {
        virtualScrollRef.value?.scrollToIndex(displayItems.value.length - 1)?.then(() => {
          listRef.value?.focus('last')
        })
      })
    }

    if (e.key === 'ArrowDown' && listRef.value?.focusedIndex === 'last') {
      IN_BROWSER && requestAnimationFrame(() => {
        virtualScrollRef.value?.scrollToIndex(0)?.then(() => {
          listRef.value?.focus('first')
        })
      })
    }

    if (e.key === 'Tab') {
      textFieldRef.value?.focus()
    }

    if (!['PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) return
    const el: HTMLElement = listRef.value?.$el
    if (!el) return

    if (e.key === 'Home' || e.key === 'End') {
      el.scrollTo({
        top: e.key === 'Home' ? 0 : el.scrollHeight,
        behavior: 'smooth',
      })
    }

    await finishScrolling()

    const children = el.querySelectorAll(':scope > :not(.v-virtual-scroll__spacer)')

    if (e.key === 'PageDown' || e.key === 'Home') {
      const top = el.getBoundingClientRect().top
      for (const child of children) {
        if (child.getBoundingClientRect().top >= top) {
          (child as HTMLElement).focus()
          break
        }
      }
    } else {
      const bottom = el.getBoundingClientRect().bottom
      for (const child of [...children].reverse()) {
        if (child.getBoundingClientRect().bottom <= bottom) {
          (child as HTMLElement).focus()
          break
        }
      }
    }
  }

  return { onListScroll, onListKeydown }
}
