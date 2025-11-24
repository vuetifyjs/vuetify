/**
 * useCommandPaletteNavigation Composable
 *
 * Manages selection state for the command palette.
 * Keyboard navigation is now handled by VList in 'track' mode.
 */

// Utilities
import { computed, ref, watch } from 'vue'

// Types
import type { ComputedRef, Ref } from 'vue'
import type { VCommandPaletteItem } from '../types'

// Internal
import { isSelectableItem } from '../types'

export interface UseCommandPaletteNavigationOptions {
  filteredItems: ComputedRef<VCommandPaletteItem[]>
  onItemClick: (item: VCommandPaletteItem, event: KeyboardEvent | MouseEvent) => void
}

export interface UseCommandPaletteNavigationReturn {
  selectedIndex: Ref<number>
  activeDescendantId: ComputedRef<string | undefined>
  getSelectedItem: () => VCommandPaletteItem | undefined
  executeSelected: (event: KeyboardEvent | MouseEvent) => void
  reset: () => void
  setSelectedIndex: (index: number) => void
}

/**
 * Composable for managing command palette selection state
 *
 * VList handles keyboard navigation in 'track' mode.
 * This composable manages the selected index and execution logic.
 */
export function useCommandPaletteNavigation (
  options: UseCommandPaletteNavigationOptions
): UseCommandPaletteNavigationReturn {
  const selectedIndex = ref(-1)

  /**
   * Get the active descendant ID for accessibility
   * Returns the ID of the currently selected item
   */
  const activeDescendantId = computed(() => {
    const selectedItem = options.filteredItems.value[selectedIndex.value]
    if (selectedItem && isSelectableItem(selectedItem)) {
      return `v-command-palette-item-${selectedIndex.value}`
    }
    return undefined
  })

  /**
   * Auto-select first item when items change
   */
  watch(() => options.filteredItems.value.length, newLength => {
    if (newLength > 0 && selectedIndex.value === -1) {
      selectedIndex.value = 0
    } else if (newLength === 0) {
      selectedIndex.value = -1
    } else if (selectedIndex.value >= newLength) {
      selectedIndex.value = newLength - 1
    }
  }, { immediate: true })

  /**
   * Get the currently selected item
   */
  function getSelectedItem (): VCommandPaletteItem | undefined {
    return options.filteredItems.value[selectedIndex.value]
  }

  /**
   * Execute the currently selected item
   */
  function executeSelected (event: KeyboardEvent | MouseEvent) {
    const item = getSelectedItem()
    if (item) {
      options.onItemClick(item, event)
    }
  }

  /**
   * Reset navigation state
   * Called when palette opens
   */
  function reset () {
    selectedIndex.value = -1
  }

  /**
   * Set selected index directly
   * Called by VList when keyboard navigation occurs
   */
  function setSelectedIndex (index: number) {
    selectedIndex.value = index
  }

  return {
    selectedIndex,
    activeDescendantId,
    getSelectedItem,
    executeSelected,
    reset,
    setSelectedIndex,
  }
}
