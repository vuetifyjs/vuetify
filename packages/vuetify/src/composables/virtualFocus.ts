// Utilities
import { onScopeDispose, shallowRef, toValue } from 'vue'

// Types
import type { MaybeRefOrGetter, ShallowRef } from 'vue'

interface VirtualFocusItem {
  id: string | number
  disabled?: MaybeRefOrGetter<boolean>
  el?: MaybeRefOrGetter<HTMLElement | null | undefined>
}

interface VirtualFocusOptions {
  /** Element that retains DOM focus and receives aria-activedescendant */
  control: MaybeRefOrGetter<HTMLElement | null | undefined>
  /** Arrow key mapping — ignored when `columns` is set (grid uses all 4 arrows) */
  orientation?: 'horizontal' | 'vertical' | 'both'
  circular?: boolean
  /**
   * Column count for grid navigation. Left/Right step ±1, Up/Down step ±columns,
   * Home/End go to row start/end, Ctrl+Home/End go to first/last overall.
   */
  columns?: MaybeRefOrGetter<number>
  onHighlight?: (id: string | number) => void
}

export interface VirtualFocusReturn {
  highlightedId: ShallowRef<string | number | undefined>
  highlight: (id: string | number) => void
  focusHighlighted: () => void
  clear: () => void
  next: () => void
  prev: () => void
  first: () => void
  last: () => void
  onKeydown: (e: KeyboardEvent) => void
}

// pulled from v0, should be replaced by direct v0 import in v5.0
// the only change was adapting to jsDOM by adding `?` in `el.scrollIntoView?.({ block: 'nearest' })`
export function useVirtualFocus (
  items: () => VirtualFocusItem[],
  options: VirtualFocusOptions,
): VirtualFocusReturn {
  const { control, orientation = 'vertical', circular = false, columns: _columns, onHighlight } = options

  const highlightedId = shallowRef<string | number | undefined>()
  let previousEl: HTMLElement | null = null

  function applyHighlight (id: string | number): boolean {
    const item = items().find(i => i.id === id)
    if (!item?.el) return false

    const el = toValue(item.el)
    if (!el) return false

    const controlEl = toValue(control)
    if (controlEl) {
      const itemId = el.getAttribute('id')
      if (itemId) controlEl.setAttribute('aria-activedescendant', itemId)
    }

    if (previousEl) delete previousEl.dataset.highlighted
    el.dataset.highlighted = ''
    previousEl = el

    el.scrollIntoView?.({ block: 'nearest' })
    onHighlight?.(id)
    return true
  }

  function mod (n: number, i: number) {
    return ((i % n) + n) % n
  }

  function indexOf (id: string | number) {
    return items().findIndex(item => item.id === id)
  }

  function go (id: string | number) {
    highlightedId.value = id
    applyHighlight(id)
  }

  function step (stride: number) {
    const all = items()
    if (!all.length) return

    const current = highlightedId.value == null ? -1 : indexOf(highlightedId.value)
    const dir = stride > 0 ? 1 : -1
    const abs = Math.abs(stride)
    const maxHops = Math.ceil(all.length / abs)
    let index = current + stride
    let hops = 0

    if (circular) {
      index = mod(all.length, index)
    } else if (index < 0 || index >= all.length) {
      return
    }

    while (hops < maxHops) {
      const item = all[index]
      if (item && !toValue(item.disabled)) { go(item.id); return }
      hops++
      index = circular ? mod(all.length, index + stride) : index + (dir * abs)
      if (!circular && (index < 0 || index >= all.length)) return
    }
  }

  function first () {
    const item = items().find(i => !toValue(i.disabled))
    if (item) go(item.id)
  }

  function last () {
    const item = [...items()].reverse().find(i => !toValue(i.disabled))
    if (item) go(item.id)
  }

  function rowFirst () {
    const cols = toValue(_columns) ?? 0
    if (!cols) return first()
    const all = items()
    const cur = highlightedId.value == null ? 0 : Math.max(0, indexOf(highlightedId.value))
    const start = cur - (cur % cols)
    for (let i = start; i < Math.min(start + cols, all.length); i++) {
      if (!toValue(all[i]?.disabled)) { go(all[i]!.id); return }
    }
  }

  function rowLast () {
    const cols = toValue(_columns) ?? 0
    if (!cols) return last()
    const all = items()
    const cur = highlightedId.value == null ? 0 : Math.max(0, indexOf(highlightedId.value))
    const start = cur - (cur % cols)
    const end = Math.min(start + cols, all.length)
    for (let i = end - 1; i >= start; i--) {
      if (!toValue(all[i]?.disabled)) { go(all[i]!.id); return }
    }
  }

  function highlight (id: string | number) {
    const prev = highlightedId.value
    highlightedId.value = id
    if (!applyHighlight(id)) highlightedId.value = prev
  }

  function focusHighlighted () {
    if (highlightedId.value == null) return
    const item = items().find(i => i.id === highlightedId.value)
    if (!item?.el) return
    toValue(item.el)?.focus()
  }

  function clear () {
    highlightedId.value = undefined
    toValue(control)?.removeAttribute('aria-activedescendant')
    if (previousEl) {
      delete previousEl.dataset.highlighted
      previousEl = null
    }
  }

  function isRtl (e: KeyboardEvent) {
    const el = e.currentTarget as HTMLElement | null
    return el ? getComputedStyle(el).direction === 'rtl' : false
  }

  function onKeydown (e: KeyboardEvent) {
    const cols = toValue(_columns)
    const rtl = isRtl(e)

    if (cols) {
      switch (e.key) {
        case 'ArrowRight': e.preventDefault(); step(rtl ? -1 : 1); break
        case 'ArrowLeft': e.preventDefault(); step(rtl ? 1 : -1); break
        case 'ArrowDown': e.preventDefault(); step(cols); break
        case 'ArrowUp': e.preventDefault(); step(-cols); break
        case 'Home': e.preventDefault(); e.ctrlKey ? first() : rowFirst(); break
        case 'End': e.preventDefault(); e.ctrlKey ? last() : rowLast(); break
      }
      return
    }

    const prevKeys: string[] = []
    const nextKeys: string[] = []
    if (orientation === 'vertical' || orientation === 'both') {
      prevKeys.push('ArrowUp'); nextKeys.push('ArrowDown')
    }
    if (orientation === 'horizontal' || orientation === 'both') {
      prevKeys.push(rtl ? 'ArrowRight' : 'ArrowLeft')
      nextKeys.push(rtl ? 'ArrowLeft' : 'ArrowRight')
    }

    if (prevKeys.includes(e.key)) {
      e.preventDefault()
      step(-1)
    } else if (nextKeys.includes(e.key)) {
      e.preventDefault()
      step(1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      first()
    } else if (e.key === 'End') {
      e.preventDefault()
      last()
    }
  }

  onScopeDispose(clear)

  return {
    highlightedId,
    highlight,
    focusHighlighted,
    clear,
    next: () => step(1),
    prev: () => step(-1),
    first,
    last,
    onKeydown,
  }
}
