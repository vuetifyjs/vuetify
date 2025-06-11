// Composables
import { useHotkey } from '@/composables/hotkey'
import { transformItems } from '@/composables/list-items'

// Utilities
import { computed, ref, watch } from 'vue'

// Types
import type { ComputedRef, Ref } from 'vue'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'

export interface UseCommandPaletteNavigationOptions {
  filteredItems: Ref<VuetifyListItem[]>
  search: Ref<string>
  navigationStack: Ref<Array<{ items: any[], selected: number }>>
  currentItems: Ref<any[]>
  itemTransformationProps: ComputedRef<any>
  onItemClick: (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) => void
  onClose: () => void
}

export function useCommandPaletteNavigation (options: UseCommandPaletteNavigationOptions) {
  const {
    filteredItems,
    search,
    navigationStack,
    currentItems,
    itemTransformationProps,
    onItemClick,

  } = options

  const selectedIndex = ref(-1)

  /**
   * Calculates the total number of selectable items in the current view.
   * This includes items within groups and parent items (but not their children when collapsed).
   */
  const selectableItemsCount = computed(() => {
    let count = 0
    filteredItems.value.forEach(item => {
      if (item.raw?.type === 'parent') {
        const children = item.raw.children || []
        count += 1 + children.length
      } else if (item.raw?.type === 'group') {
        const children = item.raw.children || []
        count += children.length
      } else {
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
   */
  watch(selectableItemsCount, newCount => {
    if (newCount > 0 && selectedIndex.value === -1) {
      selectedIndex.value = 0
    }
  }, { immediate: true })

  /**
   * Reset selection when filtered items change to ensure it stays within bounds
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
   */
  function moveSelectionUp () {
    const maxIndex = selectableItemsCount.value - 1
    if (maxIndex < 0) return
    selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : maxIndex
  }

  /**
   * Moves selection down, wrapping to the first item if at the last
   */
  function moveSelectionDown () {
    const maxIndex = selectableItemsCount.value - 1
    if (maxIndex < 0) return
    selectedIndex.value = selectedIndex.value < maxIndex ? selectedIndex.value + 1 : 0
  }

  /**
   * Executes the currently selected item
   */
  function executeSelectedItem (event: KeyboardEvent) {
    if (selectedIndex.value < 0) {
      if (selectableItemsCount.value > 0) {
        selectedIndex.value = 0
      } else {
        return
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
   */
  function getItemAtIndex (targetIndex: number) {
    let selectableCount = 0

    for (const item of filteredItems.value) {
      const raw = item.raw
      if (raw?.type === 'parent') {
        if (selectableCount === targetIndex) {
          return item
        }
        const children = raw.children || []
        const childrenStart = selectableCount + 1
        const childrenEnd = childrenStart + children.length - 1
        if (targetIndex >= childrenStart && targetIndex <= childrenEnd) {
          const childIndex = targetIndex - childrenStart
          const child = children[childIndex]
          const [transformedChild] = transformItems(itemTransformationProps.value, [child])
          return transformedChild
        }
        selectableCount += 1 + children.length
      } else if (raw?.type === 'group') {
        const children = raw.children || []
        if (selectableCount + children.length > targetIndex) {
          const childIndex = targetIndex - selectableCount
          const child = children[childIndex]
          const [transformedChild] = transformItems(itemTransformationProps.value, [child])
          return transformedChild
        }
        selectableCount += children.length
      } else {
        if (selectableCount === targetIndex) {
          return item
        }
        selectableCount += 1
      }
    }

    return null
  }

  /**
   * Navigates back in the navigation stack
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
  useHotkey('arrowup', e => {
    e.preventDefault()
    moveSelectionUp()
  }, { inputs: true })

  useHotkey('arrowdown', e => {
    e.preventDefault()
    moveSelectionDown()
  }, { inputs: true })

  useHotkey('enter', e => {
    e.preventDefault()
    executeSelectedItem(e)
  }, { inputs: true })

  useHotkey('backspace', e => {
    if (search.value) return // Let the search input handle backspace
    e.preventDefault()
    navigateBack()
  }, { inputs: true, preventDefault: false })

  // Note: Escape key handling is done at the main VCommandPalette level
  // to properly respect the persistent prop

  /**
   * Updates the selected index (used for hover events)
   */
  function setSelectedIndex (index: number) {
    selectedIndex.value = index
  }

  /**
   * Resets the navigation state
   */
  function reset () {
    selectedIndex.value = -1
    navigationStack.value = []
    search.value = ''
  }

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
