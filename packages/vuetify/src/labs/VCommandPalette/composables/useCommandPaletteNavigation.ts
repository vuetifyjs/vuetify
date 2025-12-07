// Utilities
import { readonly, ref, shallowRef, watch } from 'vue'

// Types
import type { ComputedRef, Ref } from 'vue'
import type { VCommandPaletteItem } from '../types'
import { isActionItem } from '../types'

export interface UseCommandPaletteNavigationOptions {
  filteredItems: ComputedRef<VCommandPaletteItem[]>
  onItemClick: (item: VCommandPaletteItem, event: KeyboardEvent | MouseEvent) => void
}

export interface UseCommandPaletteNavigationReturn {
  selectedIndex: Readonly<Ref<number>>
  getSelectedItem: () => VCommandPaletteItem | undefined
  executeSelected: (event: KeyboardEvent | MouseEvent) => void
  reset: () => void
  setSelectedIndex: (index: number) => void
}

function getItemKey (item: VCommandPaletteItem): string | undefined {
  if (!isActionItem(item)) return undefined
  return item.value !== undefined ? String(item.value) : item.title
}

function findFirstSelectableIndex (items: VCommandPaletteItem[]): number {
  return items.findIndex(item => isActionItem(item))
}

export function useCommandPaletteNavigation (
  options: UseCommandPaletteNavigationOptions
): UseCommandPaletteNavigationReturn {
  const selectedIndex = ref(0)
  const selectedItemKey = shallowRef<string | undefined>(undefined)

  watch(() => options.filteredItems.value, (newItems, oldItems) => {
    if (newItems.length === 0) {
      selectedIndex.value = -1
      selectedItemKey.value = undefined
      return
    }

    if (selectedItemKey.value !== undefined) {
      const newIndex = newItems.findIndex(item =>
        isActionItem(item) && getItemKey(item) === selectedItemKey.value
      )
      if (newIndex !== -1) {
        selectedIndex.value = newIndex
        return
      }
    }

    const firstSelectableIndex = findFirstSelectableIndex(newItems)
    if (firstSelectableIndex !== -1) {
      selectedIndex.value = firstSelectableIndex
      selectedItemKey.value = getItemKey(newItems[firstSelectableIndex])
      return
    }

    selectedIndex.value = 0
    selectedItemKey.value = undefined
  }, { immediate: true })

  function getSelectedItem (): VCommandPaletteItem | undefined {
    return options.filteredItems.value[selectedIndex.value]
  }

  function executeSelected (event: KeyboardEvent | MouseEvent) {
    const item = getSelectedItem()
    if (item) {
      options.onItemClick(item, event)
    }
  }

  function reset () {
    const items = options.filteredItems.value

    if (items.length === 0) {
      selectedIndex.value = -1
      selectedItemKey.value = undefined
      return
    }

    const firstSelectableIndex = findFirstSelectableIndex(items)
    if (firstSelectableIndex !== -1) {
      selectedIndex.value = firstSelectableIndex
      selectedItemKey.value = getItemKey(items[firstSelectableIndex])
      return
    }

    selectedIndex.value = 0
    selectedItemKey.value = undefined
  }

  function setSelectedIndex (index: number) {
    // Ignore VList's reset to -1 when we have items - we manage selection on filter changes
    if (index === -1 && options.filteredItems.value.length > 0) {
      return
    }
    selectedIndex.value = index
    const item = options.filteredItems.value[index]
    selectedItemKey.value = item ? getItemKey(item) : undefined
  }

  return {
    selectedIndex: readonly(selectedIndex),
    getSelectedItem,
    executeSelected,
    reset,
    setSelectedIndex,
  }
}
