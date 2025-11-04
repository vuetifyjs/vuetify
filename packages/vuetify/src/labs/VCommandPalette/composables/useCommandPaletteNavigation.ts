/**
 * useCommandPaletteNavigation Composable
 *
 * Manages keyboard navigation and selection state for the command palette.
 * Provides arrow key navigation, tab support, and enter to execute.
 */

// Composables
import { useHotkey } from '@/composables/hotkey'

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
  isScopeActive: () => boolean
}

export interface UseCommandPaletteNavigationReturn {
  selectedIndex: Ref<number>
  activeDescendantId: ComputedRef<string | undefined>
  moveSelectionUp: () => void
  moveSelectionDown: () => void
  getSelectedItem: () => VCommandPaletteItem | undefined
  executeSelected: (event: KeyboardEvent | MouseEvent) => void
  reset: () => void
  setSelectedIndex: (index: number) => void
}

/**
 * Composable for managing command palette keyboard navigation
 *
 * Handles arrow key navigation, tab support, and item execution.
 * Navigation updates occur only for selectable items (skips subheaders/dividers).
 * The search input retains focus while navigation is visual.
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
  watch(() => options.filteredItems, newLength => {
    if (newLength > 0 && selectedIndex.value === -1) {
      selectedIndex.value = 0
    } else if (newLength === 0) {
      selectedIndex.value = -1
    } else if (selectedIndex.value >= newLength) {
      selectedIndex.value = newLength - 1
    }
  }, { immediate: true })

  /**
   * Move selection up with wrapping
   * Skips non-selectable items (subheaders, dividers)
   */
  function moveSelectionUp () {
    const maxIndex = options.filteredItems.value.length - 1
    if (maxIndex < 0) return

    let nextIndex = selectedIndex.value - 1
    if (nextIndex < 0) {
      nextIndex = maxIndex
    }

    // Skip non-selectable items going backwards
    while (nextIndex >= 0 && nextIndex !== selectedIndex.value) {
      if (isSelectableItem(options.filteredItems.value[nextIndex])) {
        selectedIndex.value = nextIndex
        return
      }
      nextIndex--
      if (nextIndex < 0) {
        nextIndex = maxIndex
      }
    }
  }

  /**
   * Move selection down with wrapping
   * Skips non-selectable items (subheaders, dividers)
   */
  function moveSelectionDown () {
    const maxIndex = options.filteredItems.value.length - 1
    if (maxIndex < 0) return

    let nextIndex = selectedIndex.value + 1
    if (nextIndex > maxIndex) {
      nextIndex = 0
    }

    // Skip non-selectable items going forwards
    while (nextIndex <= maxIndex && nextIndex !== selectedIndex.value) {
      if (isSelectableItem(options.filteredItems.value[nextIndex])) {
        selectedIndex.value = nextIndex
        return
      }
      nextIndex++
      if (nextIndex > maxIndex) {
        nextIndex = 0
      }
    }
  }

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
   * Called when palette opens or filter changes
   */
  function reset () {
    selectedIndex.value = -1
  }

  /**
   * Set selected index directly
   */
  function setSelectedIndex (index: number) {
    selectedIndex.value = index
  }

  /**
   * Register keyboard shortcuts
   * Only active when palette is focused
   */
  useHotkey('arrowup', e => {
    if (options.isScopeActive()) {
      e.preventDefault()
      moveSelectionUp()
    }
  }, { inputs: true })

  useHotkey('arrowdown', e => {
    if (options.isScopeActive()) {
      e.preventDefault()
      moveSelectionDown()
    }
  }, { inputs: true })

  useHotkey('tab', e => {
    if (options.isScopeActive()) {
      e.preventDefault()
      moveSelectionDown()
    }
  }, { inputs: true })

  useHotkey('shift+tab', e => {
    if (options.isScopeActive()) {
      e.preventDefault()
      moveSelectionUp()
    }
  }, { inputs: true })

  useHotkey('enter', e => {
    if (options.isScopeActive()) {
      e.preventDefault()
      const item = getSelectedItem()
      if (item) {
        executeSelected(e)
      }
    }
  }, { inputs: true })

  return {
    selectedIndex,
    activeDescendantId,
    moveSelectionUp,
    moveSelectionDown,
    getSelectedItem,
    executeSelected,
    reset,
    setSelectedIndex,
  }
}
