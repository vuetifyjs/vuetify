import { computed, ref, watch, nextTick, unref, shallowRef, type Ref } from 'vue'
import { useProxiedModel } from '@/composables/proxiedModel'
import { type ActionCorePublicAPI, type ActionDefinition } from '@/labs/action-core'
import { useId } from 'vue'
import type { VTextField } from '@/components/VTextField' // For searchInputRef type
import { isHeaderItem, defaultGroupPriorities, UNGROUPED_PRIORITY, UNGROUPED_TITLE, isPromise, log } from '../utils'

// Types from VCommandPalette.tsx
export interface PaletteLevel { // Exporting PaletteLevel
  parentAction?: ActionDefinition
  actions: readonly ActionDefinition[]
  title?: string
}

export interface UseCommandPaletteCoreProps {
  modelValue: boolean
  'onUpdate:modelValue': ((value: boolean) => void) | undefined
  closeOnExecute?: boolean
  // placeholder?: string // Placeholder is a direct prop for the search input component
}

// Define the structure of what the hosting component's setup function will emit
type CommandPaletteEmit = {
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:list'): void // For tests
}

// Define the type for the list component ref, assuming it will have a scrollToItem method
export interface CommandPaletteListRef extends HTMLElement {
  scrollToItem: (index: number) => void
}

export function useCommandPaletteCore(
  props: UseCommandPaletteCoreProps,
  actionCore: ActionCorePublicAPI | null | undefined,
  emit: CommandPaletteEmit,
  // Refs to be passed from the component using this composable
  searchInputRef: Ref<InstanceType<typeof VTextField> | null>,
  listRef: Ref<CommandPaletteListRef | null>
) {
  // Reactive flag whether the palette is visible (controlled by v-model)
  const isActive: Ref<boolean> = useProxiedModel(props, 'modelValue');

  // Flag to detect if we're in a test environment – currently unused but kept for future debug logs
  const isTestEnvironment = typeof window !== 'undefined' && window.navigator?.userAgent?.includes('Node.js') || false;

  const searchText = ref('')
  const selectedIndex = ref(0)
  const listId = useId() // Used for ARIA linking
  const isLoadingSubItems = ref(false)
  const actionStack = shallowRef<PaletteLevel[]>([])

  const currentLevel = computed<PaletteLevel | undefined>(() => actionStack.value[actionStack.value.length - 1])
  const currentParentAction = computed(() => currentLevel.value?.parentAction)
  const currentLevelTitle = computed(() => unref(currentParentAction.value?.title) || currentLevel.value?.title || 'Commands')
  const isRootLevel = computed(() => actionStack.value.length <= 1)

  const initializeStack = () => {
    if (actionCore && isActive.value) {
      actionStack.value = [{
        actions: actionCore.allActions.value.filter((action: ActionDefinition) => !action.meta?.paletteHidden),
        title: 'Commands',
      }]
      searchText.value = ''
      selectedIndex.value = 0 // Reset index when stack re-initializes
    }
  }

  watch(() => actionCore?.allActions.value, initializeStack, { immediate: true, deep: true })

  watch(isActive, (val, oldVal) => {
    if (val && !oldVal) { // Became active
      initializeStack()
      focusSearchInput()
    } else if (!val && oldVal) { // Became inactive
      searchText.value = '' // Clear search on close
    }
  })

  const filteredActions = computed(() => {
    const actionsToFilter = currentLevel.value?.actions ?? []
    const query = searchText.value.toLowerCase().trim()
    if (!query) return actionsToFilter

    return actionsToFilter.filter(action => {
      const titleValue = unref(action.title)
      const titleMatch = titleValue.toLowerCase().includes(query)
      let keywordMatch = false
      if (action.keywords) {
        if (typeof action.keywords === 'string') {
          keywordMatch = action.keywords.toLowerCase().includes(query)
        } else {
          keywordMatch = action.keywords.some(k => k.toLowerCase().includes(query))
        }
      }
      return titleMatch || keywordMatch
    })
  })

  const groupedAndSortedActions = computed(() => {
    const groups: Record<string, ActionDefinition[]> = {}
    const ungrouped: ActionDefinition[] = []
    const validActions = filteredActions.value.filter(action => action && typeof action === 'object' && 'id' in action && !isHeaderItem(action))

    validActions.forEach(actionDef => {
      const groupName = actionDef.group
      if (groupName) {
        if (!groups[groupName]) groups[groupName] = []
        groups[groupName].push(actionDef)
      } else {
        ungrouped.push(actionDef)
      }
    })

    const sortedGroupNames = Object.keys(groups).sort((a, b) => {
      const priorityA = defaultGroupPriorities[a] ?? UNGROUPED_PRIORITY
      const priorityB = defaultGroupPriorities[b] ?? UNGROUPED_PRIORITY
      if (priorityA !== priorityB) return priorityA - priorityB
      return a.localeCompare(b)
    })

    const result: ({ isHeader: true; title: string; id: string } | ActionDefinition)[] = []
    sortedGroupNames.forEach(groupName => {
      result.push({ isHeader: true, title: groupName, id: `group-header-${groupName}` })
      groups[groupName].sort((a, b) => {
        const orderA = a.order ?? Infinity
        const orderB = b.order ?? Infinity
        if (orderA !== orderB) return orderA - orderB
        return unref(a.title).localeCompare(unref(b.title))
      }).forEach(action => result.push(action))
    })

    if (ungrouped.length > 0) {
      if (Object.keys(groups).length > 0) {
        result.push({ isHeader: true, title: UNGROUPED_TITLE, id: `group-header-${UNGROUPED_TITLE}` })
      }
      ungrouped.sort((a, b) => {
        const orderA = a.order ?? Infinity
        const orderB = b.order ?? Infinity
        if (orderA !== orderB) return orderA - orderB
        return unref(a.title).localeCompare(unref(b.title))
      }).forEach(action => result.push(action))
    }
    return result
  })

  watch(groupedAndSortedActions, async () => {
    const firstActionIndex = groupedAndSortedActions.value.findIndex(item => item && !isHeaderItem(item))
    selectedIndex.value = firstActionIndex >= 0 ? firstActionIndex : 0
    await nextTick()
    emit('update:list')
  }, { deep: true, immediate: true })

  const getItemHtmlId = (itemInput: ActionDefinition | { isHeader: true; title: string; id: string }, index: number): string => {
    if (isHeaderItem(itemInput)) {
      return `${listId}-${itemInput.id}-${index}` // Headers now have own ID
    }
    const action = itemInput as ActionDefinition
    return `${listId}-item-${action.id}-${index}`
  }

  const activeDescendantId = computed(() => {
    if (
      isActive.value &&
      groupedAndSortedActions.value.length > 0 &&
      selectedIndex.value >= 0 &&
      selectedIndex.value < groupedAndSortedActions.value.length
    ) {
      const item = groupedAndSortedActions.value[selectedIndex.value]
      if (item && !isHeaderItem(item)) {
        return getItemHtmlId(item, selectedIndex.value)
      }
    }
    return undefined
  })

  async function executeCoreAction(action: ActionDefinition) {
    if (!actionCore) return
    try {
      await actionCore.executeAction(action.id, { trigger: 'command-palette' })
      if (props.closeOnExecute) {
        isActive.value = false
        emit('update:modelValue', false)
      }
    } catch (err) {
      log('error', 'CommandPaletteCore', `execute action "${action.id}"`, err)
    }
  }

  async function navigateToSubItems(action: ActionDefinition) {
    if (!action.subItems || typeof action.subItems !== 'function') return

    isLoadingSubItems.value = true
    try {
      const rawSubActions = action.subItems({})
      let subActionsResult

      if (isPromise(rawSubActions)) {
        subActionsResult = await rawSubActions
      } else {
        subActionsResult = rawSubActions
      }

      const subActions = (Array.isArray(subActionsResult) ? subActionsResult : []).filter((subAct: ActionDefinition) => !subAct.meta?.paletteHidden)

      actionStack.value = [...actionStack.value, {
        parentAction: action,
        actions: subActions,
        title: unref(action.title), // Carry title for the level
      }]
      searchText.value = ''
      selectedIndex.value = 0
      await nextTick()
      focusSearchInput() // Use the helper function for consistent focus handling
    } catch (err) {
      log('error', 'CommandPaletteCore', `load subItems for "${action.id}"`, err)
    } finally {
      isLoadingSubItems.value = false
    }
  }

  async function handleItemActivated(action: ActionDefinition) {
    if (action.subItems && typeof action.subItems === 'function') {
      await navigateToSubItems(action)
    } else {
      await executeCoreAction(action)
    }
  }

  async function navigateBack() {
    if (!isRootLevel.value) {
      actionStack.value = actionStack.value.slice(0, -1)
      searchText.value = ''
      selectedIndex.value = 0
      await nextTick()
      focusSearchInput() // Use the helper function for consistent focus handling
    }
  }

  async function scrollToSelected() {
    await nextTick()
    const currentItem = groupedAndSortedActions.value[selectedIndex.value]
    if (currentItem && !isHeaderItem(currentItem)) {
      if (listRef.value && typeof listRef.value.scrollToItem === 'function') {
        listRef.value.scrollToItem(selectedIndex.value)
      } else {
        log('debug', 'CommandPaletteCore', 'listRef or scrollToItem not available')
      }
    }
  }

  async function handleKeydown(event: KeyboardEvent) {
    const items = groupedAndSortedActions.value
    if ((!items || items.length === 0) && event.key === 'Escape') {
      if (!isRootLevel.value) {
        await navigateBack()
      } else {
        isActive.value = false
      }
      return
    }
    if (!items || items.length === 0) return;

    let newIndex = selectedIndex.value
    const BATCH_SIZE = 5

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      do {
        newIndex = (newIndex + 1)
        if (newIndex >= items.length) newIndex = 0
      } while (items.length > 1 && isHeaderItem(items[newIndex]) && newIndex !== selectedIndex.value)
      selectedIndex.value = newIndex
      await scrollToSelected()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      do {
        newIndex = (newIndex - 1 + items.length)
        newIndex %= items.length
      } while (items.length > 1 && isHeaderItem(items[newIndex]) && newIndex !== selectedIndex.value)
      selectedIndex.value = newIndex
      await scrollToSelected()
    } else if (event.key === 'PageDown') {
      event.preventDefault()
      for (let i = 0; i < BATCH_SIZE; i++) {
        let tempIndex = newIndex
        do {
          tempIndex = (tempIndex + 1)
          if (tempIndex >= items.length) tempIndex = items.length - 1
        } while (items.length > 1 && isHeaderItem(items[tempIndex]) && tempIndex !== newIndex && tempIndex < items.length - 1)
        if (tempIndex === newIndex && i > 0) break
        newIndex = tempIndex
        if (newIndex >= items.length - 1) break
      }
      selectedIndex.value = newIndex
      await scrollToSelected()
    } else if (event.key === 'PageUp') {
      event.preventDefault()
      for (let i = 0; i < BATCH_SIZE; i++) {
        let tempIndex = newIndex
        do {
          tempIndex = (tempIndex - 1 + items.length)
          tempIndex %= items.length
        } while (items.length > 1 && isHeaderItem(items[tempIndex]) && tempIndex !== newIndex && tempIndex > 0)
        if (tempIndex === newIndex && i > 0) break
        newIndex = tempIndex
        if (newIndex <= 0) break
      }
      selectedIndex.value = newIndex
      await scrollToSelected()
    } else if (event.key === 'Home') {
      event.preventDefault()
      newIndex = 0
      while (items.length > 1 && isHeaderItem(items[newIndex]) && newIndex < items.length - 1) {
        newIndex++
      }
      selectedIndex.value = newIndex
      await scrollToSelected()
    } else if (event.key === 'End') {
      event.preventDefault()
      newIndex = items.length - 1
      while (items.length > 1 && isHeaderItem(items[newIndex]) && newIndex > 0) {
        newIndex--
      }
      selectedIndex.value = newIndex
      await scrollToSelected()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const currentItem = items[selectedIndex.value]
      if (currentItem && !isHeaderItem(currentItem)) {
        await handleItemActivated(currentItem as ActionDefinition)
      }
    } else if (event.key === 'Escape') {
      event.preventDefault()
      if (!isRootLevel.value) {
        await navigateBack()
      } else {
        isActive.value = false
        emit('update:modelValue', false)
      }
    }
  }

  const focusSearchInput = () => {
    nextTick(() => {
      try {
        if (searchInputRef.value && typeof searchInputRef.value.focus === 'function') {
          searchInputRef.value.focus();
        } else {
          log('debug', 'CommandPaletteCore', 'search input not available or focus is not a function')
        }
      } catch (err) {
        log('debug', 'CommandPaletteCore', 'focus error', err)
      }
    });
  }

  return {
    // Reactive State
    isActive,
    searchText,
    selectedIndex,
    listId,
    isLoadingSubItems,
    actionStack, // Could be useful for breadcrumbs if exposed

    // Computed Properties
    currentLevelTitle,
    isRootLevel,
    currentParentAction, // For header slot
    groupedAndSortedActions,
    activeDescendantId,

    // Methods
    handleItemActivated, // For VCommandPaletteList to call on item click
    navigateBack,        // For VCommandPaletteHeader to call
    handleKeydown,       // For the main palette div
    getItemHtmlId,       // For VCommandPaletteList to use for item IDs
    focusSearchInput,    // To be called by orchestrator on open
    scrollToSelected,    // Potentially for orchestrator if list doesn't expose it directly
  }
}
