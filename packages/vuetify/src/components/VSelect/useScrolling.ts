// Utilities
import { nextTick, shallowRef, toValue, watch } from 'vue'
import { focusableChildren, getActiveElement } from '@/util'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { VList } from '@/components/VList'
import type { VTextField } from '@/components/VTextField'
import type { VVirtualScroll } from '@/components/VVirtualScroll'

type ItemLike = { type?: string }

function isFocusableItem (item: ItemLike | undefined) {
  return !item?.type || item.type === 'item'
}

/** Next/prev focusable entry in displayItems, wrapping at ends */
function findFocusableIndex (
  items: readonly ItemLike[],
  from: number,
  dir: 1 | -1,
): number {
  const len = items.length
  if (!len) return -1
  let i = from
  for (let n = 0; n < len; n++) {
    if (i < 0) i = len - 1
    else if (i >= len) i = 0
    if (isFocusableItem(items[i])) return i
    i += dir
  }
  return -1
}

export function useScrolling (
  listRef: Ref<VList | undefined>,
  textFieldRef: Ref<VTextField | undefined>,
  virtualScrollRef?: Ref<VVirtualScroll | undefined>,
  displayItems?: MaybeRefOrGetter<readonly ItemLike[]>,
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

  function listEl () {
    return listRef.value?.$el as HTMLElement | undefined
  }

  function items () {
    return displayItems ? toValue(displayItems) : []
  }

  async function scrollAndFocusIndex (index: number) {
    const vs = virtualScrollRef?.value
    const el = listEl()
    if (!vs || !el || index < 0) return false

    vs.scrollToIndex(index)
    await nextTick()
    await finishScrolling()

    // aria-posinset matches displayItems index + 1 (slots for dividers/subheaders)
    const targetPos = String(index + 1)
    const deadline = performance.now() + 500
    while (performance.now() < deadline) {
      const target = el.querySelector(`[aria-posinset="${targetPos}"]`) as HTMLElement | null
      if (target) {
        target.focus()
        return true
      }
      await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return false
  }

  /** Virtual list only mounts a window — wrap/step at edges via aria-posinset (#18383) */
  async function onVirtualEdgeArrow (e: KeyboardEvent) {
    const vs = virtualScrollRef?.value
    const el = listEl()
    if (!vs || !el) return false

    const focusable = focusableChildren(el)
    if (!focusable.length) return false

    const active = getActiveElement() as HTMLElement | null
    if (!active || !focusable.includes(active)) return false

    const atStart = active === focusable[0]
    const atEnd = active === focusable.at(-1)
    if (!atStart && !atEnd) return false

    const pos = Number(active.getAttribute('aria-posinset'))
    if (!pos) return false

    const list = items()
    if (!list.length) return false

    const currentIndex = pos - 1
    let targetIndex = -1
    if (e.key === 'ArrowUp' && atStart) {
      targetIndex = findFocusableIndex(list, currentIndex - 1, -1)
    } else if (e.key === 'ArrowDown' && atEnd) {
      targetIndex = findFocusableIndex(list, currentIndex + 1, 1)
    }
    if (targetIndex < 0) return false

    e.preventDefault()
    e.stopImmediatePropagation()
    await scrollAndFocusIndex(targetIndex)
    return true
  }

  // Capture: only edge arrows — must run before VList wraps within the window
  async function onListKeydownCapture (e: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      await onVirtualEdgeArrow(e)
    }
  }

  // Bubble: Tab / page / home / end (same phase as before — don't steal Tab from focus groups)
  async function onListKeydown (e: KeyboardEvent) {
    if (e.key === 'Tab') {
      textFieldRef.value?.focus()
      return
    }

    if (!['PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) return
    const el = listEl()
    if (!el) return

    if (virtualScrollRef?.value && (e.key === 'Home' || e.key === 'End')) {
      const list = items()
      const targetIndex = list.length
        ? findFocusableIndex(list, e.key === 'Home' ? 0 : list.length - 1, e.key === 'Home' ? 1 : -1)
        : -1
      if (targetIndex >= 0) {
        e.preventDefault()
        e.stopImmediatePropagation()
        await scrollAndFocusIndex(targetIndex)
        return
      }
    }

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

  async function focusLastItem (itemCount?: number) {
    const list = items()
    if (list.length) {
      const idx = findFocusableIndex(list, list.length - 1, -1)
      if (idx >= 0 && await scrollAndFocusIndex(idx)) return
    }
    const count = itemCount || Number(listEl()?.querySelector('[aria-setsize]')?.getAttribute('aria-setsize')) || 0
    if (count > 0 && await scrollAndFocusIndex(count - 1)) return
    listRef.value?.focus('last')
  }

  async function focusFirstItem () {
    const list = items()
    if (list.length) {
      const idx = findFocusableIndex(list, 0, 1)
      if (idx >= 0 && await scrollAndFocusIndex(idx)) return
    }
    if (!(await scrollAndFocusIndex(0))) {
      listRef.value?.focus('first')
    }
  }

  async function focusItemAtIndex (index: number) {
    if (index < 0) return
    if (!(await scrollAndFocusIndex(index))) {
      listRef.value?.focus(index)
    }
  }

  return {
    onScrollPassive: onListScroll,
    onKeydownCapture: onListKeydownCapture,
    onKeydown: onListKeydown,
    focusLastItem,
    focusFirstItem,
    focusItemAtIndex,
  }
}
