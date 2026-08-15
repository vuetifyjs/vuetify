// Utilities
import { shallowRef, toValue, watch } from 'vue'
import { focusableChildren, getActiveElement } from '@/util'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { VList } from '@/components/VList'
import type { VTextField } from '@/components/VTextField'
import type { VVirtualScroll } from '@/components/VVirtualScroll'
import type { ListItem } from '@/composables/list-items'

function isNavigable (item: ListItem | undefined) {
  return !!item &&
    item.type !== 'divider' &&
    item.type !== 'subheader' &&
    !item.props?.disabled
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
  options: {
    selectedIndex?: () => number
    headerEl?: () => HTMLElement | undefined
    menuContentEl?: () => HTMLElement | undefined
  } = {},
) {
  const isScrolling = shallowRef(false)
  let scrollTimeout: number
  let focusToken = 0
  let pendingOpenStep: 1 | -1 | null = null

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

  async function focusItem (index: number, scroll = true) {
    if (index < 0) return false

    if (!scroll) {
      const mounted = findItemEl(index)
      mounted?.focus({ preventScroll: true })
      return !!mounted
    }

    const token = ++focusToken
    const listEl = getListEl()
    // Park focus on the list before the window moves, otherwise unmounting the
    // focused item drops focus to <body> and useFocusRepair closes the menu.
    if (listEl?.contains(getActiveElement())) {
      listEl.focus({ preventScroll: true })
    }

    virtualScrollRef.value?.scrollToIndex(index)

    let el = findItemEl(index)
    const deadline = performance.now() + 500
    while (!el && performance.now() < deadline) {
      await new Promise(resolve => requestAnimationFrame(resolve))
      if (token !== focusToken) return true
      el = findItemEl(index)
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

  function focusAdjacentItem (from: number, step: 1 | -1) {
    return focusItem(findNavigableIndex(toValue(displayItems), from + step, step))
  }

  /** ArrowUp/ArrowDown pressed while focus is still on the field. */
  function focusFromActivator (step: 1 | -1) {
    const selected = options.selectedIndex?.() ?? -1
    if (selected >= 0) return focusAdjacentItem(selected, step)

    if (step === 1) {
      const header = options.headerEl?.()
      const firstInHeader = header && focusableChildren(header)[0]
      if (firstInHeader) return firstInHeader.focus()
    }

    // An empty list can't take focus, so the header/footer are the only way in.
    if (findNavigableIndex(toValue(displayItems), 0, 1) < 0) {
      const content = options.menuContentEl?.()
      const children = content ? focusableChildren(content) : []
      const el = step === 1 ? children[0] : children.at(-1)
      return el?.focus()
    }

    return step === 1 ? focusFirstItem() : focusLastItem()
  }

  /**
   * ArrowUp/ArrowDown on the field: open the menu and move into the list.
   * Returns true when focus moved, false when it was armed for the transition.
   */
  function onActivatorKeydown (e: KeyboardEvent, menu: Ref<boolean>) {
    const step = e.key === 'ArrowDown' ? 1 as const : e.key === 'ArrowUp' ? -1 as const : null
    if (!step) return false

    const wasOpen = menu.value
    menu.value = true

    if (getListEl()?.contains(getActiveElement())) return false

    if (!wasOpen) {
      setPendingFocus(step)
      return false
    }

    e.stopImmediatePropagation()
    focusFromActivator(step)
    return true
  }

  /** Arrow key opened the menu — the list only exists once the transition ends. */
  function setPendingFocus (step: 1 | -1 | null) {
    pendingOpenStep = step
  }

  function flushPendingFocus () {
    if (!pendingOpenStep) return false
    const step = pendingOpenStep
    pendingOpenStep = null
    focusFromActivator(step)
    return true
  }

  function onListKeydownCapture (e: KeyboardEvent) {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return

    const listEl = getListEl()
    const active = getActiveElement() as HTMLElement | null
    if (!listEl || !active || !listEl.contains(active)) return

    const itemEl = active.closest('[aria-posinset]') as HTMLElement | null
    if (!itemEl || !listEl.contains(itemEl)) return

    const mounted = listEl.querySelectorAll('[aria-posinset]')
    const atEdge = itemEl === (e.key === 'ArrowUp' ? mounted[0] : mounted[mounted.length - 1])
    if (!atEdge) return

    const position = Number(itemEl.getAttribute('aria-posinset'))
    if (!position) return

    const step = e.key === 'ArrowUp' ? -1 as const : 1 as const
    const index = findNavigableIndex(toValue(displayItems), position - 1 + step, step)
    if (index < 0 || index === position - 1) return

    e.preventDefault()
    e.stopImmediatePropagation()
    void focusItem(index)
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
    const list = getListEl()
    if (!list) return

    await finishScrolling()

    const children = list.querySelectorAll(':scope > :not(.v-virtual-scroll__spacer)')

    if (e.key === 'PageDown') {
      const top = list.getBoundingClientRect().top
      for (const child of children) {
        if (child.getBoundingClientRect().top >= top) {
          (child as HTMLElement).focus()
          break
        }
      }
    } else {
      const bottom = list.getBoundingClientRect().bottom
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
    focusFromActivator,
    onActivatorKeydown,
    setPendingFocus,
    flushPendingFocus,
  }
}
