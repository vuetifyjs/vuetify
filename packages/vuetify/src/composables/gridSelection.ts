// Composables
import { useVirtualFocus } from '@/composables/virtualFocus'

// Utilities
import { computed, shallowRef, watch } from 'vue'

// Types
import type { MaybeRefOrGetter } from 'vue'

export type GridDirection = 'up' | 'down' | 'left' | 'right'

export function keyToDirection (key: string): GridDirection | null {
  switch (key) {
    case 'ArrowUp': return 'up'
    case 'ArrowDown': return 'down'
    case 'ArrowLeft': return 'left'
    case 'ArrowRight': return 'right'
    default: return null
  }
}

export interface GridSelectionItem<T extends string | number> {
  value: T
  isDisabled?: boolean
}

export interface GridSelectionOptions<T extends string | number> {
  items: () => GridSelectionItem<T>[]
  columns: MaybeRefOrGetter<number>
  initialValue: (current: T | undefined) => T | undefined
  itemAttribute: string
  onSelect: (value: T) => void
  onNavigation?: (direction: GridDirection, e: KeyboardEvent, currentValue: T | undefined) => boolean
  onHighlight?: (value: T | undefined) => void
  onEscape?: () => void
}

export function useGridSelection<T extends string | number> ({
  items,
  columns,
  initialValue,
  itemAttribute,
  onSelect,
  onNavigation,
  onHighlight,
  onEscape,
}: GridSelectionOptions<T>) {
  const hasFocusIn = shallowRef(false)
  const containerEl = shallowRef<HTMLElement>()

  const virtualFocus = useVirtualFocus(
    () => items().map(item => ({
      id: item.value,
      disabled: item.isDisabled,
      el: () => containerEl.value?.querySelector<HTMLElement>(`[${itemAttribute}="${item.value}"]`),
    })),
    {
      control: containerEl,
      columns,
    }
  )

  if (onHighlight) {
    watch(virtualFocus.highlightedId, id => onHighlight(id as T | undefined))
  }

  function onFocusin (e: FocusEvent) {
    const grid = containerEl.value
    if (!grid || grid.contains(e.relatedTarget as Node)) return

    hasFocusIn.value = true

    const initial = initialValue(virtualFocus.highlightedId.value as T | undefined)
    if (initial != null) virtualFocus.highlight(initial)
    virtualFocus.focusHighlighted()
  }

  function onFocusout (e: FocusEvent) {
    if (containerEl.value?.contains(e.relatedTarget as Node)) return

    hasFocusIn.value = false
    virtualFocus.clear()
  }

  function onActivate () {
    const id = virtualFocus.highlightedId.value as T | undefined
    if (id == null) return

    const item = items().find(x => x.value === id)

    if (item && !item.isDisabled) {
      onSelect(id)
    }
  }

  function selectItem (value: T) {
    virtualFocus.highlight(value)
    virtualFocus.focusHighlighted()

    onSelect(value)
  }

  function focusItem (value: T) {
    virtualFocus.highlight(value)
    if (virtualFocus.highlightedId.value == null) virtualFocus.first()
    virtualFocus.focusHighlighted()
  }

  function onContainerKeydown (e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onEscape?.()
      return
    }

    if ((e.key === 'Enter' || e.key === ' ') && virtualFocus.highlightedId.value != null) {
      e.preventDefault()
      onActivate()
      return
    }

    const direction = keyToDirection(e.key)
    if (direction && onNavigation?.(direction, e, virtualFocus.highlightedId.value as T | undefined)) return

    virtualFocus.onKeydown(e)
    virtualFocus.focusHighlighted()
  }

  const containerProps = computed(() => ({
    ref: (el: any) => containerEl.value = el as HTMLElement ?? undefined,
    tabindex: hasFocusIn.value ? -1 : 0,
    onKeydown: onContainerKeydown,
    onFocusin,
    onFocusout,
  }))

  return {
    containerProps,
    containerEl,
    selectItem,
    focusItem,
    clear: virtualFocus.clear,
  }
}
