// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, ref, shallowRef, unref, watch, onScopeDispose } from 'vue'
import { useId } from 'vue'

// Types
import type { Ref } from 'vue'
import { log } from '../utils'
import { commandPaletteNavigationActions as baseNavigationActions } from '../utils/commandPaletteNavigationActions'
import type { VTextField } from '@/components/VTextField' // For searchInputRef type
import type { ActionContext, ActionCorePublicAPI, ActionDefinition } from '@/labs/VActionCore'
import { VCommandPaletteCustomItem, VCommandPaletteSearchFunction } from '../components/VCommandPalette/VCommandPalette' // Import new types

// Types from VCommandPalette.tsx
export interface PaletteLevel<T extends ActionDefinition | VCommandPaletteCustomItem = ActionDefinition | VCommandPaletteCustomItem> {
  id: string | number
  title?: string | Ref<string>
  actions: Readonly<T[]> // Ensure T[] is readonly
  parentAction?: T
}

export interface UseCommandPaletteCoreProps {
  modelValue: boolean
  'onUpdate:modelValue': ((value: boolean) => void) | undefined
  closeOnExecute?: boolean
  // placeholder?: string // Placeholder is a direct prop for the search input component
  // --- New Agnostic Mode Props ---
  items?: VCommandPaletteCustomItem[]
  searchFunction?: VCommandPaletteSearchFunction
  keymapNavigateDown?: string
  keymapNavigateUp?: string
  keymapSelectItem?: string
  keymapNavigateBackOrClose?: string
  // --- End New Agnostic Mode Props ---
}

// Define the structure of what the hosting component's setup function will emit
type CommandPaletteEmit = {
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:list'): void // For tests
  (e: 'item-activated', item: VCommandPaletteCustomItem): void // For agnostic mode
}

// Define the type for the list component ref, assuming it will have a scrollToItem method
export interface CommandPaletteListRef extends HTMLElement {
  scrollToItem: (index: number) => void
}

export function useCommandPaletteCore (
  props: UseCommandPaletteCoreProps,
  actionCore: ActionCorePublicAPI | null | undefined,
  emit: CommandPaletteEmit,
  // Refs to be passed from the component using this composable
  searchInputRef: Ref<InstanceType<typeof VTextField> | null>,
  listRef: Ref<CommandPaletteListRef | null>
) {
  // Reactive flag whether the palette is visible (controlled by v-model)
  const isActive: Ref<boolean> = useProxiedModel(props, 'modelValue')

  const searchText = ref('')
  const selectedIndex = ref(0)
  const listId = ref(useId()) // Changed to ref(useId())
  const isLoadingSubItems = ref(false)
  const actionStack = shallowRef<PaletteLevel<ActionDefinition | VCommandPaletteCustomItem>[]>([])

  // --- Agnostic Mode ---
  const isUsingActionCore = computed(() => !!actionCore && !props.items)
  const currentRootItems = computed(() => {
    if (isUsingActionCore.value || !props.items) return []
    return props.items
  })

  // --- Computeds for UI ---
  const currentLevel = computed<PaletteLevel<ActionDefinition | VCommandPaletteCustomItem>>(() => {
    return actionStack.value[actionStack.value.length - 1] || { id: 'root', title: 'Root', actions: [] }
  })

  const currentLevelTitle = computed(() => unref(currentLevel.value.title))
  const isRootLevel = computed(() => actionStack.value.length <= 1)
  const currentParentAction = computed(() => currentLevel.value.parentAction)

  // Initialize the action stack (e.g., on mount or when palette opens)
  const initializeStack = async () => {
    isLoadingSubItems.value = true
    try {
      let rootActions: Readonly<(ActionDefinition | VCommandPaletteCustomItem)[]> = []
      if (isUsingActionCore.value && actionCore) {
        // Filter out actions marked as paletteHidden for the root level
        rootActions = actionCore.allActions.value.filter(action => !action.meta?.paletteHidden)
      } else if (props.items) {
        rootActions = props.items
      }
      actionStack.value = [{ id: 'root', title: 'All Commands', actions: rootActions }]
    } catch (error) {
      console.error('[VCommandPaletteCore] Failed to initialize action stack:', error)
      actionStack.value = [{ id: 'root', title: 'Error Loading', actions: [] }]
    } finally {
      isLoadingSubItems.value = false
      selectedIndex.value = 0 // Reset selection
    }
  }

  // Actions to be filtered and displayed (current level's actions)
  const actionsForCurrentLevel = computed(() => {
    return currentLevel.value.actions || []
  })

  // Filtered actions based on search text
  const filteredActions = computed(() => {
    const source = actionsForCurrentLevel.value
    const search = searchText.value.trim().toLowerCase()

    if (props.searchFunction) {
      return props.searchFunction(source, searchText.value, isUsingActionCore.value ? 'actionCore' : 'customItems')
    }

    if (!search) return source

    return source.filter((itemOrAction: ActionDefinition | VCommandPaletteCustomItem) => {
      const item = itemOrAction as any // Allow access to common properties
      const title = unref(item.title)?.toLowerCase() || ''
      const subtitle = unref((item as any).subtitle)?.toLowerCase() // Subtitle might not exist on ActionDefinition directly
      const keywords = Array.isArray(item.keywords)
        ? item.keywords.join(' ').toLowerCase()
        : typeof item.keywords === 'string' ? item.keywords.toLowerCase() : ''

      return title.includes(search) ||
             (subtitle && subtitle.includes(search)) ||
             (keywords && keywords.includes(search))
    })
  })

  // Group and sort actions
  const groupedAndSortedActions = computed(() => {
    const items = filteredActions.value
    const grouped: Record<string, (ActionDefinition | VCommandPaletteCustomItem)[]> = {}
    const ungrouped: (ActionDefinition | VCommandPaletteCustomItem)[] = []

    for (const item of items) {
      if (item.group) {
        if (!grouped[item.group]) grouped[item.group] = []
        grouped[item.group].push(item)
      } else {
        ungrouped.push(item)
      }
    }

    const result: (ActionDefinition | VCommandPaletteCustomItem | { isHeader: true, title: string, id: string })[] = []
    // const groupOrder = actionCore?.groupOrder?.value // Removed groupOrder for now
    const sortedGroupNames = Object.keys(grouped).sort((a, b) => a.localeCompare(b)) // Fallback sorting

    for (const groupName of sortedGroupNames) {
      result.push({ isHeader: true, title: groupName, id: `header-${groupName}` })
      // Sort items within the group by their order prop, then title
      const sortedGroupItems = grouped[groupName].sort((a, b) => {
        const orderA = a.order ?? Infinity
        const orderB = b.order ?? Infinity
        if (orderA !== orderB) return orderA - orderB
        return (unref(a.title) ?? '').localeCompare(unref(b.title) ?? '')
      })
      result.push(...sortedGroupItems)
    }

    // Add ungrouped items, sorted by their order prop, then title
    const sortedUngroupedItems = ungrouped.sort((a, b) => {
      const orderA = a.order ?? Infinity
      const orderB = b.order ?? Infinity
      if (orderA !== orderB) return orderA - orderB
      return (unref(a.title) ?? '').localeCompare(unref(b.title) ?? '')
    })
    result.push(...sortedUngroupedItems)

    return result
  })

  // Active descendant for ARIA
  const activeDescendantId = computed(() => {
    if (selectedIndex.value < 0 || selectedIndex.value >= groupedAndSortedActions.value.length) {
      return undefined
    }
    const item = groupedAndSortedActions.value[selectedIndex.value]
    return item ? getItemHtmlId(item, selectedIndex.value) : undefined
  })

  // --- Item Activation & Navigation ---
  const navigateToSubItems = async (parentItem: ActionDefinition | VCommandPaletteCustomItem) => {
    if (!parentItem.subItems || typeof parentItem.subItems !== 'function') return

    isLoadingSubItems.value = true
    try {
      const context = isUsingActionCore.value && actionCore
        ? (actionCore as any).getContext(parentItem.id as string) || {}
        : {}

      const subItemsResult = await parentItem.subItems(context)
      const subItemsArray = Array.isArray(subItemsResult) ? subItemsResult : []

      actionStack.value = [
        ...actionStack.value,
        {
          id: parentItem.id,
          title: unref(parentItem.title),
          actions: subItemsArray as Readonly<(ActionDefinition | VCommandPaletteCustomItem)[]>, // Ensure type match
          parentAction: parentItem,
        },
      ]
      searchText.value = '' // Clear search for new level
      selectedIndex.value = 0
    } catch (error) {
      console.error(`[VCommandPaletteCore] Error loading subItems for ${parentItem.id}:`, error)
      // Optionally, push an error state level or revert to parent
    } finally {
      isLoadingSubItems.value = false
      emit('update:list') // Notify that the list has changed
    }
  }

  const navigateBack = async () => {
    if (actionStack.value.length > 1) {
      actionStack.value = actionStack.value.slice(0, -1)
      searchText.value = ''
      selectedIndex.value = 0
      await nextTick() // Ensure UI updates before focusing or scrolling
      focusSearchInput()
      emit('update:list')
    } else {
      // At root level, close the palette
      isActive.value = false
    }
  }

  const handleItemActivated = async (itemOrAction: ActionDefinition | VCommandPaletteCustomItem) => {
    const item = itemOrAction // Alias for clarity

    if (item.disabled === true || (typeof item.disabled === 'object' && item.disabled?.value === true)) {
      return // Do nothing if disabled
    }

    if (item.subItems && typeof item.subItems === 'function') {
      await navigateToSubItems(item)
    } else {
      // Execute action or handler
      if (isUsingActionCore.value && actionCore && 'id' in item && typeof item.id === 'string' && !props.items) { // Check !props.items for ActionDef
        await actionCore.executeAction(item.id, { trigger: 'command-palette', actionId: item.id } as ActionContext)
      } else if ('handler' in item && typeof item.handler === 'function') {
        // It's a VCommandPaletteCustomItem with a handler
        await item.handler(item as VCommandPaletteCustomItem)
      } else if ('onSelect' in item && typeof item.onSelect === 'function') {
         // It's a VCommandPaletteCustomItem with onSelect
        await item.onSelect(item as VCommandPaletteCustomItem)
      } else if (!isUsingActionCore.value) {
        // Agnostic mode, no handler/onSelect, emit event
        emit('item-activated', item as VCommandPaletteCustomItem)
      }

      if (props.closeOnExecute) {
        isActive.value = false
      }
    }
  }

  // --- Keyboard Navigation Handlers (Agnostic and ActionCore modes) ---
  const navigationActionHandlers = {
    navigateDown: () => {
      if (groupedAndSortedActions.value.length === 0) return
      selectedIndex.value = (selectedIndex.value + 1) % groupedAndSortedActions.value.length
      scrollToSelected()
    },
    navigateUp: () => {
      if (groupedAndSortedActions.value.length === 0) return
      selectedIndex.value = (selectedIndex.value - 1 + groupedAndSortedActions.value.length) % groupedAndSortedActions.value.length
      scrollToSelected()
    },
    selectItem: async () => {
      if (selectedIndex.value < 0 || selectedIndex.value >= groupedAndSortedActions.value.length) return
      const item = groupedAndSortedActions.value[selectedIndex.value]
      if (item && !('isHeader' in item)) { // Make sure it's not a header
        await handleItemActivated(item as ActionDefinition | VCommandPaletteCustomItem)
      }
    },
    navigateBackOrClose: async () => {
      if (!isRootLevel.value) {
        await navigateBack()
      } else {
        isActive.value = false
      }
    },
    // Placeholder for other potential actions like PageUp, PageDown, GoToFirst, GoToLast
  }

  // --- Palette Navigation Actions Configuration (for ActionCore or Footer Display) ---
  const configuredPaletteNavigationActions = computed(() => {
    if (isUsingActionCore.value && actionCore) {
      // Use ActionCore's built-in palette navigation actions
      // These will be registered globally by ActionCore if keybindings are provided
      return baseNavigationActions.map(navAction => ({
        ...navAction,
        // Override handler to use our local navigation logic
        handler: async (ctx: ActionContext) => {
          if (navAction.id === 'palette.down') navigationActionHandlers.navigateDown()
          else if (navAction.id === 'palette.up') navigationActionHandlers.navigateUp()
          else if (navAction.id === 'palette.select') await navigationActionHandlers.selectItem()
          else if (navAction.id === 'palette.back') await navigationActionHandlers.navigateBackOrClose()
          // Potentially other default navigation actions if added
        },
        // Ensure canExecute respects palette's active state
        canExecute: (ctx: ActionContext) => isActive.value && (navAction.canExecute ? navAction.canExecute(ctx) : true),
      }))
    } else {
      // Provide static definitions for display in agnostic mode (e.g., in footer)
      // These are not registered as global hotkeys by default in this mode.
      return [
        { id: 'internal.down', title: 'Navigate Down', hotkeyDisplay: props.keymapNavigateDown, handler: navigationActionHandlers.navigateDown, order: 1 },
        { id: 'internal.up', title: 'Navigate Up', hotkeyDisplay: props.keymapNavigateUp, handler: navigationActionHandlers.navigateUp, order: 2 },
        { id: 'internal.select', title: 'Select Item', hotkeyDisplay: props.keymapSelectItem, handler: navigationActionHandlers.selectItem, order: 3 },
        { id: 'internal.back', title: 'Back/Close', hotkeyDisplay: props.keymapNavigateBackOrClose, handler: navigationActionHandlers.navigateBackOrClose, order: 4 },
      ]
    }
  })

  // --- Global Keydown Listener for Agnostic Mode Navigation ---
  const handleAgnosticKeyDown = (event: KeyboardEvent) => {
    if (!isActive.value || isUsingActionCore.value) return // Only run if active and not using ActionCore for nav

    // Prevent default for navigation keys if they are handled and palette is focused
    // This requires careful consideration of where focus is (input vs list)
    // For now, basic matching:
    let handled = false
    if (event.key === props.keymapNavigateDown) {
      navigationActionHandlers.navigateDown()
      handled = true
    } else if (event.key === props.keymapNavigateUp) {
      navigationActionHandlers.navigateUp()
      handled = true
    } else if (event.key === props.keymapSelectItem) {
      navigationActionHandlers.selectItem() // is async, but keydown handler is sync
      handled = true
    } else if (event.key === props.keymapNavigateBackOrClose) {
      navigationActionHandlers.navigateBackOrClose() // is async
      handled = true
    }

    if (handled) {
      // Only preventDefault if the input itself shouldn't handle it (e.g. ArrowUp/Down in text)
      // This is tricky. runInTextInputMatches is from ActionCore, we need a simpler check or assume
      // that if the palette is open, these keys are for the palette.
      // A more robust solution would check if event.target is the search input.
      const targetIsSearchInput = searchInputRef.value && searchInputRef.value.$el.contains(event.target as Node)
      const shouldRunInTextInput = targetIsSearchInput && ['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)

      if(!shouldRunInTextInput) { // Basic check, improve if needed
         event.preventDefault()
         event.stopPropagation()
      }
    }
  }

  // --- Effects ---
  // Watch for external changes to modelValue (v-model)
  watch(() => props.modelValue, (newValue) => {
    isActive.value = newValue
  })

  // When palette visibility changes
  watch(isActive, async (newVal, oldVal) => {
    emit('update:modelValue', newVal) // Emit back to parent for v-model
    if (newVal) {
      await initializeStack() // Re-initialize or load root actions
      await nextTick() // Ensure DOM is updated
      focusSearchInput()
      // Register keydown listener for agnostic mode if palette becomes active
      if (!isUsingActionCore.value) {
        document.addEventListener('keydown', handleAgnosticKeyDown, true) // Use capture phase
      }
    } else {
      // Reset state when closing
      searchText.value = ''
      selectedIndex.value = 0
      actionStack.value = [] // Clear stack fully
      // Remove keydown listener when palette closes
      if (!isUsingActionCore.value) {
        document.removeEventListener('keydown', handleAgnosticKeyDown, true)
      }
    }
  })

  // Watch for changes in ActionCore's actions if using it and palette is active
  watch(() => actionCore?.allActions.value, (newActions, oldActions) => {
    if (isActive.value && isUsingActionCore.value && newActions !== oldActions) {
      log('debug', 'CommandPaletteCore', 'ActionCore actions changed, re-initializing stack.');
      // Only re-initialize if at the root level to avoid disrupting sub-item navigation
      if (isRootLevel.value) {
        initializeStack()
      }
    }
  }, { deep: true }) // deep watch might be intensive if allActions is large and changes frequently

  // Reset selection when search text changes or list of actions changes
  watch([searchText, actionsForCurrentLevel], () => {
    selectedIndex.value = 0
    // Do not auto-scroll here as it can be jarring while typing. Scroll on explicit navigation.
    emit('update:list')
  })

  // --- Utility Functions ---
  const focusSearchInput = () => {
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }

  const getItemHtmlId = (itemInput: ActionDefinition | VCommandPaletteCustomItem | { isHeader: true, title: string, id: string }, index: number): string => {
    const item = itemInput as any // Allow access to common properties
    if (item.isHeader) {
      return `${unref(listId)}-header-${item.id}-${index}`
    }
    // Use item.id which should be present on both ActionDefinition and VCommandPaletteCustomItem
    return `${unref(listId)}-item-${item.id}-${index}`
  }

  const scrollToSelected = async () => {
    await nextTick() // Ensure DOM has rendered with new selection
    if (listRef.value && selectedIndex.value >= 0) {
      listRef.value.scrollToItem(selectedIndex.value)
    }
  }

  // Cleanup global listener on scope dispose
  onScopeDispose(() => {
    if (!isUsingActionCore.value) {
      document.removeEventListener('keydown', handleAgnosticKeyDown, true)
    }
  })

  // --- Exposed API ---
  return {
    // Reactive State
    isActive,
    searchText,
    selectedIndex,
    listId,
    isLoadingSubItems,
    actionStack, // For advanced slot usage or debugging

    // Computed Properties
    currentLevelTitle,
    isRootLevel,
    currentParentAction,
    groupedAndSortedActions,
    activeDescendantId,

    // Methods
    handleItemActivated, // Generalized
    navigateBack,
    getItemHtmlId,
    focusSearchInput,
    scrollToSelected, // For direct manipulation if needed

    // Agnostic mode related
    isUsingActionCore,
    currentRootItems, // Expose for empty state checks etc.

    // Navigation actions (reactive, depends on mode)
    navigationActions: configuredPaletteNavigationActions,
    actionCoreInstance: actionCore, // Expose the instance if available
  }
}
