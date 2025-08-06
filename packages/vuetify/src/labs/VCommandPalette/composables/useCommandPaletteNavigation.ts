/**
 * useCommandPaletteNavigation Composable
 *
 * Purpose: This composable encapsulates all keyboard navigation logic for the
 * command palette. It handles arrow key navigation, item selection, back navigation,
 * and maintains proper selection state across different item types and filtering.
 *
 * Why it exists as a separate composable:
 * - Separates navigation concerns from rendering logic
 * - Provides reusable navigation behavior for custom layouts
 * - Handles complex selection logic across groups, parents, and regular items
 * - Manages keyboard event handling in a centralized way
 * - Enables easier testing of navigation behavior in isolation
 *
 * Scope justification: Navigation logic is complex enough to warrant separation,
 * involving multiple reactive dependencies, keyboard event handling, and state
 * management that would clutter the main component if inline.
 */

// Composables
import { useHotkey } from '@/composables/hotkey'
import { transformItems } from '@/composables/list-items'

// Utilities
import { computed, shallowRef, watch } from 'vue'

// Types
import type { ComputedRef, Ref } from 'vue'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'

/**
 * Configuration options for the navigation composable
 * Provides all necessary dependencies and callbacks
 */
export interface UseCommandPaletteNavigationOptions {
  filteredItems: Ref<VuetifyListItem[]> // Current filtered/visible items
  search: Ref<string> // Current search query
  navigationStack: Ref<Array<{ items: any[], selected: number }>> // Navigation history
  currentItems: Ref<any[]> // Current level items (before filtering)
  itemTransformationProps: ComputedRef<any> // Props for transforming raw items
  onItemClick: (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) => void // Item execution callback
  onClose: () => void // Close callback
}

/**
 * Main navigation composable function
 * Returns reactive navigation state and control functions
 */
export function useCommandPaletteNavigation (options: UseCommandPaletteNavigationOptions) {
  const {
    filteredItems,
    search,
    navigationStack,
    currentItems,
    itemTransformationProps,
    onItemClick,
    // onClose is available but not used directly (handled at parent level)
  } = options

  // Current selected index (-1 means no selection)
  const selectedIndex = shallowRef(-1)

  /**
   * Calculates the total number of selectable items in the current view.
   * This includes items within groups and parent items (but not their children when collapsed).
   *
   * Complex logic handles different item types:
   * - Regular items: count as 1
   * - Parent items: count as 1 + number of children
   * - Group items: count only their children (group header is not selectable)
   */
  const selectableItemsCount = computed(() => {
    let count = 0
    filteredItems.value.forEach(item => {
      if (item.raw?.type === 'parent') {
        // Parent items are selectable themselves; their children are not visible/selectable until navigated into
        count += 1
      } else if (item.raw?.type === 'group') {
        // Only children are selectable, not the group header
        const children = item.raw.children || []
        count += children.length
      } else {
        // Regular item
        count += 1
      }
    })
    return count
  })

  /**
   * Generates the aria-activedescendant ID for the currently selected item.
   * This is used for accessibility to announce the selected item to screen readers.
   *
   * Note: This is a simplified version that will be overridden by VCommandPaletteList
   * which has the correct flattened item mapping logic.
   */
  const activeDescendantId = computed(() => {
    if (selectedIndex.value === -1) return undefined
    return `command-palette-item-${selectedIndex.value}`
  })

  /**
   * Auto-select the first item when items change or when the component mounts
   * This ensures there's always a selection when items are available
   */
  watch(selectableItemsCount, newCount => {
    if (newCount > 0 && selectedIndex.value === -1) {
      selectedIndex.value = 0
    }
  }, { immediate: true })

  /**
   * Reset selection when filtered items change to ensure it stays within bounds
   * Also auto-selects first item when filtered results change
   */
  watch(filteredItems, () => {
    const maxIndex = selectableItemsCount.value - 1
    if (selectedIndex.value > maxIndex) {
      selectedIndex.value = maxIndex >= 0 ? maxIndex : -1
    }
    // Auto-select first item when filtered results change
    if (selectedIndex.value === -1 && selectableItemsCount.value > 0) {
      selectedIndex.value = 0
    }
  })

  /**
   * Moves selection up, wrapping to the last item if at the first
   * Provides circular navigation for better UX
   */
  function moveSelectionUp () {
    const maxIndex = selectableItemsCount.value - 1
    if (maxIndex < 0) return // No items to select
    selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : maxIndex
  }

  /**
   * Moves selection down, wrapping to the first item if at the last
   * Provides circular navigation for better UX
   */
  function moveSelectionDown () {
    const maxIndex = selectableItemsCount.value - 1
    if (maxIndex < 0) return // No items to select
    selectedIndex.value = selectedIndex.value < maxIndex ? selectedIndex.value + 1 : 0
  }

  /**
   * Executes the currently selected item
   * Handles the case where no item is selected by auto-selecting the first
   */
  function executeSelectedItem (event: KeyboardEvent) {
    if (selectedIndex.value < 0) {
      if (selectableItemsCount.value > 0) {
        selectedIndex.value = 0
      } else {
        return // No items to execute
      }
    }

    // Find the item at the selected index
    const selectedItem = getItemAtIndex(selectedIndex.value)
    if (selectedItem) {
      onItemClick(selectedItem, event)
    }
  }

  /**
   * Helper function to get the item at a specific selectable index
   * Handles the complex mapping between flat selection index and hierarchical items
   *
   * This is one of the most complex parts of the navigation system, as it needs
   * to map a simple numeric index to items that may be nested within groups or parents.
   */
  function getItemAtIndex (targetIndex: number) {
    let selectableCount = 0

    for (const item of filteredItems.value) {
      const raw = item.raw
      if (raw?.type === 'parent') {
        // Parent item itself
        if (selectableCount === targetIndex) {
          return item
        }
        // Children are not selectable in this view; move to next item
        selectableCount += 1
      } else if (raw?.type === 'group') {
        // Groups themselves are not selectable, only their children
        const children = raw.children || []
        if (selectableCount + children.length > targetIndex) {
          const childIndex = targetIndex - selectableCount
          const child = children[childIndex]
          // Transform the raw child into a VuetifyListItem
          const [transformedChild] = transformItems(itemTransformationProps.value, [child])
          return transformedChild
        }
        selectableCount += children.length
      } else {
        // Regular item
        if (selectableCount === targetIndex) {
          return item
        }
        selectableCount += 1
      }
    }

    return null // Item not found
  }

  /**
   * Navigates back in the navigation stack
   * Restores the previous level's items and selection state
   */
  function navigateBack () {
    if (navigationStack.value.length > 0) {
      const previousFrame = navigationStack.value.pop()
      if (previousFrame) {
        currentItems.value = previousFrame.items
        selectedIndex.value = previousFrame.selected
      }
    }
  }

  // Register keyboard navigation hotkeys
  // These are active whenever the command palette is open

  // Arrow key navigation
  useHotkey('arrowup', e => {
    e.preventDefault() // Prevent default browser behavior
    moveSelectionUp()
  }, { inputs: true }) // Allow in input fields

  useHotkey('arrowdown', e => {
    e.preventDefault() // Prevent default browser behavior
    moveSelectionDown()
  }, { inputs: true }) // Allow in input fields

  // Enter key to execute selected item
  useHotkey('enter', e => {
    e.preventDefault() // Prevent form submission
    executeSelectedItem(e)
  }, { inputs: true }) // Allow in input fields

  // Backspace for navigation (only when search is empty)
  useHotkey('backspace', e => {
    if (search.value) return // Let the search input handle backspace
    e.preventDefault() // Prevent browser back navigation
    navigateBack()
  }, { inputs: true, preventDefault: false }) // Conditional preventDefault

  // Note: Escape key handling is done at the main VCommandPalette level
  // to properly respect the persistent prop

  /**
   * Updates the selected index (used for hover events)
   * Allows mouse interaction to change keyboard selection
   */
  function setSelectedIndex (index: number) {
    selectedIndex.value = index
  }

  /**
   * Resets the navigation state
   * Used when the palette closes or items change
   */
  function reset () {
    selectedIndex.value = -1
    navigationStack.value = []
    search.value = ''
  }

  // Return the public API
  return {
    selectedIndex,
    activeDescendantId,
    selectableItemsCount,
    setSelectedIndex,
    reset,
    moveSelectionUp,
    moveSelectionDown,
    executeSelectedItem,
    navigateBack,
  }
}
