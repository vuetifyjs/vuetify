// Utilities
import { nextTick, shallowRef, toValue, watch } from 'vue'
import { focusableChildren, getActiveElement } from '@/util'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { VList } from '@/components/VList'
import type { VTextField } from '@/components/VTextField'
import type { VVirtualScroll } from '@/components/VVirtualScroll'
import type { ListItem } from '@/composables/list-items'

function isNavigable (item: ListItem | undefined) {
  return !!item && item.type !== 'divider' && item.type !== 'subheader' && !item.props?.disabled
}

function findNavigableIndex (items: readonly ListItem[], from: number, step: 1 | -1) {
  const count = items.length
  for (let offset = 0; offset < count; offset++) {
    const index = ((from + offset * step) % count + count) % count
    if (isNavigable(items[index])) return index
  }
  return -1
}

export function useScrolling (
  listRef: Ref<VList | undefined>,
  textFieldRef: Ref<VTextField | undefined>,
  virtualScrollRef: Ref<VVirtualScroll | undefined>,
  displayItems: MaybeRefOrGetter<readonly ListItem[]>,
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

  function getListEl () {
    return listRef.value?.$el as HTMLElement | undefined
  }

  function findItemEl (index: number) {
    return getListEl()?.querySelector<HTMLElement>(`[aria-posinset="${index + 1}"]`) ?? null
  }

  async function focusItem (index: number) {
    if (index < 0) return false

    let el = findItemEl(index)
    if (!el) {
      virtualScrollRef.value?.scrollToIndex(index)
      await nextTick()
      await finishScrolling()
      const deadline = performance.now() + 500
      while (!el && performance.now() < deadline) {
        await new Promise(resolve => requestAnimationFrame(resolve))
        el = findItemEl(index)
      }
    }

    el?.focus({ preventScroll: true })
    return !!el
  }

  async function focusFirstItem () {
    const index = findNavigableIndex(toValue(displayItems), 0, 1)
    if (!await focusItem(index)) listRef.value?.focus('first')
  }

  async function focusLastItem () {
    const items = toValue(displayItems)
    const index = findNavigableIndex(items, items.length - 1, -1)
    if (!await focusItem(index)) listRef.value?.focus('last')
  }

  async function focusAdjacentItem (from: number, step: 1 | -1) {
    return focusItem(findNavigableIndex(toValue(displayItems), from + step, step))
  }

  function onListKeydownCapture (e: KeyboardEvent) {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return

    const el = getListEl()
    const active = getActiveElement() as HTMLElement | null
    if (!el || !active || !el.contains(active)) return

    const focusable = focusableChildren(el)
    const atEdge = active === (e.key === 'ArrowUp' ? focusable[0] : focusable.at(-1))
    if (!atEdge) return

    const position = Number(active.getAttribute('aria-posinset'))
    if (!position) return

    const step = e.key === 'ArrowUp' ? -1 as const : 1 as const
    const index = findNavigableIndex(toValue(displayItems), position - 1 + step, step)
    if (index < 0) return

    e.preventDefault()
    e.stopImmediatePropagation()
    focusItem(index)
  }

  async function onListKeydown (e: KeyboardEvent) {
    if (e.key === 'Tab') {
      textFieldRef.value?.focus()
      return
    }

    if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      e.stopImmediatePropagation()
      await (e.key === 'Home' ? focusFirstItem() : focusLastItem())
      return
    }

    if (e.key !== 'PageDown' && e.key !== 'PageUp') return
    const el = getListEl()
    if (!el) return

    await finishScrolling()

    const children = el.querySelectorAll(':scope > :not(.v-virtual-scroll__spacer)')

    if (e.key === 'PageDown') {
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

  return {
    listEvents: {
      onScrollPassive: onListScroll,
      onKeydownCapture: onListKeydownCapture,
      onKeydown: onListKeydown,
    } as Record<string, Function>, // typescript doesn't know about vue's event merging
    focusItem,
    focusFirstItem,
    focusLastItem,
    focusAdjacentItem,
  }
}
