# VCommandPalette Design Document

> **Architecture Note**: This component uses TSX (TypeScript JSX) syntax following Vuetify's component patterns. All examples and implementation details reflect Vuetify's `genericComponent()`, `propsFactory`, and `useRender()` architecture.

## Overview

`VCommandPalette` is a sophisticated keyboard-driven command interface component that provides users with a searchable, navigable list of available actions. It serves as a unified interface for action discovery and execution, supporting both ActionCore integration and standalone operation with complete prop-based action management.

## Core Architecture

### Component Definition

```typescript
// VCommandPalette.tsx
import { computed, ref, toRef, watch, nextTick } from 'vue'

// Vuetify Components
import { VDialog } from '@/components/VDialog'
import { VCard } from '@/components/VCard'
import { VCardTitle } from '@/components/VCard'
import { VTextField } from '@/components/VTextField'
import { VList } from '@/components/VList'
import { VListItem } from '@/components/VList'
import { VProgressCircular } from '@/components/VProgressCircular'
import { VDivider } from '@/components/VDivider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeTransitionProps } from '@/composables/transition'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeVirtualProps, useVirtual } from '@/composables/virtual'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useDefaults } from '@/composables/defaults'
import { useLocale } from '@/composables/locale'
import { useSsrBoot } from '@/composables/ssrBoot'
import { useStack } from '@/composables/stack'
import { useKeyBindings } from '@/composables/key-bindings'

// ActionCore Integration
import { useActionCoreIntegration } from './composables/useActionCoreIntegration'
import { useSearchOrchestration } from './composables/useSearchOrchestration'
import { useNavigationActions } from './composables/useNavigationActions'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { ActionDefinition, SearchProvider, ApplicationContext, SearchResultItem } from '../types'

// Local interfaces
interface ResultOrderingConfig {
  groupOrder?: string[]  // Order of groups in display
  customOrderFn?: (a: SearchResultItem, b: SearchResultItem, context: ApplicationContext) => number
}

interface SearchConfiguration {
  customOrderFn?: (a: SearchResultItem, b: SearchResultItem, context: ApplicationContext) => number
  timeout?: number
}

interface ProcessedItem {
  type: 'action' | 'search-result'
  action?: ActionDefinition
  result?: SearchResultItem
  title: string
  description?: string
  hotkey?: string
  group?: string
  searchableText: string
}

export const makeVCommandPaletteProps = propsFactory({
  // Model Value
  modelValue: {
    type: Boolean,
    default: false,
  },

  // Display Configuration
  placeholder: {
    type: String,
    default: 'Search commands...',
  },
  title: {
    type: String,
    default: 'Command Palette',
  },
  width: {
    type: [String, Number],
    default: 600,
  },
  closeOnExecute: {
    type: Boolean,
    default: true,
  },

  // ActionCore Control
  useActionCore: {
    type: Boolean,
    default: true,
  },

  // Standalone Action Management
  actions: {
    type: Array as PropType<ActionDefinition[]>,
    default: () => [],
  },
  searchProviders: {
    type: Array as PropType<SearchProvider[]>,
    default: () => [],
  },
  onExecuteAction: {
    type: Function as PropType<(action: ActionDefinition, context?: any) => void | Promise<void>>,
    default: undefined,
  },
  applicationContext: {
    type: Object as PropType<ApplicationContext>,
    default: () => ({}),
  },

  // Configuration
  resultOrdering: {
    type: Object as PropType<ResultOrderingConfig>,
    default: () => ({}),
  },
  searchConfiguration: {
    type: Object as PropType<SearchConfiguration>,
    default: () => ({}),
  },

  ...makeComponentProps(),
  ...makeThemeProps(),
  ...makeDensityProps(),
  ...makeTransitionProps(),
  ...makeFilterProps(),
  ...makeVirtualProps(),
}, 'VCommandPalette')

export const VCommandPalette = genericComponent()({
  name: 'VCommandPalette',

  props: makeVCommandPaletteProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    'action:execute': (action: ActionDefinition, context?: any) => true,
    'search:query': (query: string) => true,
    'navigation:change': (selectedIndex: number) => true,
  },

  setup(props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { t } = useLocale()
    const { ssrBootStyles } = useSsrBoot()
    const { stackStyles } = useStack(toRef(props, 'modelValue'))
    useDefaults()

    // Model value management
    const isVisible = useProxiedModel(props, 'modelValue', props.modelValue)

    // Search input state
    const searchQuery = ref('')
    const searchInput = ref<HTMLInputElement>()

    // Navigation state
    const selectedIndex = ref(0)
    const items = ref<ProcessedItem[]>([])
    // Note: Loading state is managed per search operation via isSearching from useSearchOrchestration

    // ActionCore integration
    const {
      actions: actionCoreActions,
      context: actionCoreContext,
      executeAction: executeActionCoreAction,
      isAvailable: isActionCoreAvailable
    } = useActionCoreIntegration(toRef(props, 'useActionCore'))

    // Search orchestration
    const {
      searchResults,
      isSearching,
      searchProviders: activeSearchProviders,
      executeSearch,
      clearSearch
    } = useSearchOrchestration({
      searchProviders: toRef(props, 'searchProviders'),
      applicationContext: computed(() =>
        isActionCoreAvailable.value ? actionCoreContext.value : props.applicationContext
      ),
      useActionCore: toRef(props, 'useActionCore'),
      searchConfiguration: toRef(props, 'searchConfiguration')
    })

    // Combine actions from different sources
    const allActions = computed(() => {
      const actions: ActionDefinition[] = []

      // Add ActionCore actions if available
      if (isActionCoreAvailable.value && props.useActionCore) {
        actions.push(...actionCoreActions.value)
      }

      // Add prop-provided actions
      if (!props.useActionCore || !isActionCoreAvailable.value) {
        actions.push(...props.actions)
      }

      return actions
    })

    // Process and filter items
    const { filteredItems } = useFilter(props, computed(() => {
      const actionItems = allActions.value.map(action => ({
        type: 'action' as const,
        action,
        title: action.title,
        description: action.description,
        hotkey: action.hotkey,
        group: action.group,
        searchableText: `${action.title} ${action.description || ''}`.toLowerCase()
      }))

      const searchItems = searchResults.value.map(result => ({
        type: 'search-result' as const,
        result,
        title: result.title,
        description: result.description,
        group: result.group,
        searchableText: `${result.title} ${result.description || ''}`.toLowerCase()
      }))

      return [...actionItems, ...searchItems]
    }), searchQuery)

    // Virtual scrolling for performance
    const { containerProps, markerProps, itemProps } = useVirtual(props, filteredItems)

    // Navigation using useKeyBindings
    const {
      bindings: navigationBindings,
      registerContext,
      unregisterContext
    } = useNavigationActions({
      onNavigateUp: () => {
        selectedIndex.value = Math.max(0, selectedIndex.value - 1)
        emit('navigation:change', selectedIndex.value)
      },
      onNavigateDown: () => {
        selectedIndex.value = Math.min(filteredItems.value.length - 1, selectedIndex.value + 1)
        emit('navigation:change', selectedIndex.value)
      },
      onNavigatePageUp: () => {
        selectedIndex.value = Math.max(0, selectedIndex.value - 10)
        emit('navigation:change', selectedIndex.value)
      },
      onNavigatePageDown: () => {
        selectedIndex.value = Math.min(filteredItems.value.length - 1, selectedIndex.value + 10)
        emit('navigation:change', selectedIndex.value)
      },
      onNavigateStart: () => {
        selectedIndex.value = 0
        emit('navigation:change', selectedIndex.value)
      },
      onNavigateEnd: () => {
        selectedIndex.value = filteredItems.value.length - 1
        emit('navigation:change', selectedIndex.value)
      },
      onSelectItem: () => {
        executeSelectedItem()
      },
      onClose: () => {
        closeDialog()
      }
    })

    // Search handling
    const performSearch = useDebounce(async (query: string) => {
      emit('search:query', query)

      if (query.trim()) {
        await executeSearch(query)
      } else {
        clearSearch()
      }

      // Reset selection to first item
      selectedIndex.value = 0
    }, 150)

    watch(searchQuery, performSearch)

    // Item execution
    async function executeSelectedItem() {
      const item = filteredItems.value[selectedIndex.value]
      if (!item) return

      try {
        if (item.type === 'action') {
          await executeAction(item.action)
        } else if (item.type === 'search-result') {
          await executeSearchResult(item.result)
        }

        if (props.closeOnExecute) {
          closeDialog()
        }
      } catch (error) {
        console.error('[VCommandPalette] Failed to execute item:', error)
      }
    }

    async function executeAction(action: ActionDefinition) {
      emit('action:execute', action, actionCoreContext.value)

      if (isActionCoreAvailable.value && props.useActionCore) {
        await executeActionCoreAction(action.id)
      } else if (props.onExecuteAction) {
        await props.onExecuteAction(action, props.applicationContext)
      }
    }

    async function executeSearchResult(result: SearchResultItem) {
      if (result.actionId) {
        // Execute associated action with result context
        const action = allActions.value.find(a => a.id === result.actionId)
        if (action) {
          const context = { ...actionCoreContext.value, searchResult: result }
          emit('action:execute', action, context)

          if (isActionCoreAvailable.value && props.useActionCore) {
            await executeActionCoreAction(action.id, context)
          } else if (props.onExecuteAction) {
            await props.onExecuteAction(action, context)
          }
        }
      } else if (result.onExecute) {
        // Execute custom handler
        await result.onExecute(result, actionCoreContext.value)
      }
    }

    function closeDialog() {
      isVisible.value = false
      searchQuery.value = ''
      selectedIndex.value = 0
      clearSearch()
    }

    // Focus management
    async function focusSearchInput() {
      await nextTick()
      searchInput.value?.focus()
    }

    watch(isVisible, async (visible) => {
      if (visible) {
        registerContext('command-palette-search', {
          element: searchInput,
          allowNavigation: true
        })
        await focusSearchInput()
      } else {
        unregisterContext('command-palette-search')
      }
    })

    // Computed styles
    const dialogStyles = computed(() => ({
      ...ssrBootStyles.value,
      ...stackStyles.value
    }))

    useRender(() => (
      <VDialog
        modelValue={isVisible.value}
        onUpdate:modelValue={(value: boolean) => isVisible.value = value}
        width={props.width}
        transition={props.transition}
        class={[
          'v-command-palette',
          themeClasses.value,
          densityClasses.value,
          props.class,
        ]}
        style={[dialogStyles.value, props.style]}
        persistent
        noClickAnimation
        scrollStrategy="block"
      >
        <VCard>
          {/* Header */}
          {slots.header?.() ?? (
            <VCardTitle class="v-command-palette__header">
              {props.title}
            </VCardTitle>
          )}

          {/* Search Controls */}
          {slots.searchControls?.({
            searchQuery: searchQuery.value,
            onSearch: (query: string) => searchQuery.value = query,
            placeholder: props.placeholder,
            loading: isSearching.value
          }) ?? (
            <div class="v-command-palette__search">
              <VTextField
                ref={searchInput}
                modelValue={searchQuery.value}
                onUpdate:modelValue={(value: string) => searchQuery.value = value}
                placeholder={t(props.placeholder)}
                variant="outlined"
                density={props.density}
                autofocus
                clearable
                hideDetails
                class="v-command-palette__search-input"
                onKeydown={(e: KeyboardEvent) => {
                  // Let useKeyBindings handle navigation
                  navigationBindings.handleKeydown(e)
                }}
              />
              {isSearching.value && (
                <VProgressCircular
                  indeterminate
                  size="20"
                  class="v-command-palette__search-loader"
                />
              )}
            </div>
          )}

          {/* Results List */}
          {slots.listWrapper?.({
            items: filteredItems.value,
            selectedIndex: selectedIndex.value,
            onSelect: executeSelectedItem,
            loading: isSearching.value
          }) ?? (
            <div class="v-command-palette__list" {...containerProps}>
              {filteredItems.value.length > 0 ? (
                <>
                  {slots.loader?.() ?? (
                    isSearching.value && (
                      <div class="v-command-palette__loader">
                        <VProgressCircular indeterminate />
                      </div>
                    )
                  )}

                  <VList {...markerProps}>
                    {filteredItems.value.map((item, index) => (
                      <div key={`${item.type}-${index}`} {...itemProps[index]}>
                        {item.group && index === 0 ||
                         (index > 0 && filteredItems.value[index - 1].group !== item.group) ? (
                          <VDivider class="v-command-palette__group-divider">
                            {item.group}
                          </VDivider>
                        ) : null}

                        {slots.item?.({
                          item,
                          index,
                          selected: index === selectedIndex.value,
                          onExecute: executeSelectedItem
                        }) ?? (
                          <VListItem
                            class={[
                              'v-command-palette__item',
                              {
                                'v-command-palette__item--selected': index === selectedIndex.value,
                                'v-command-palette__item--action': item.type === 'action',
                                'v-command-palette__item--search-result': item.type === 'search-result'
                              }
                            ]}
                            onClick={executeSelectedItem}
                            onMouseenter={() => selectedIndex.value = index}
                          >
                            <div class="v-command-palette__item-content">
                              <div class="v-command-palette__item-title">
                                {highlightMatch(item.title, searchQuery.value)}
                              </div>
                              {item.description && (
                                <div class="v-command-palette__item-description">
                                  {highlightMatch(item.description, searchQuery.value)}
                                </div>
                              )}
                            </div>

                            {item.type === 'action' && item.hotkey && (
                              <VHotKey
                                hotkey={item.hotkey}
                                size="x-small"
                                variant="outlined"
                                class="v-command-palette__item-hotkey"
                              />
                            )}
                          </VListItem>
                        )}
                      </div>
                    ))}
                  </VList>
                </>
              ) : (
                slots['no-results']?.({ query: searchQuery.value }) ?? (
                  <div class="v-command-palette__no-results">
                    {searchQuery.value ?
                      t('No results found for "{query}"', { query: searchQuery.value }) :
                      t('No actions available')
                    }
                  </div>
                )
              )}
            </div>
          )}

          {/* Footer */}
          {slots.footer?.()}
        </VCard>
      </VDialog>
    ))

    return {
      isVisible,
      searchQuery,
      selectedIndex,
      filteredItems,
      executeSelectedItem,
      closeDialog
    }
  },
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>

## Accessibility Implementation Notes

### ARIA Implementation Plan

The VCommandPalette component requires comprehensive ARIA attributes for full accessibility:

1. **Dialog Container**:
   - `role="dialog"`
   - `aria-labelledby` pointing to title element
   - `aria-modal="true"`

2. **Search Input**:
   - `role="combobox"`
   - `aria-expanded` based on results visibility
   - `aria-controls` pointing to results list ID
   - `aria-activedescendant` pointing to currently selected item ID

3. **Results List**:
   - `role="listbox"`
   - `aria-label="Search results"`
   - Unique `id` for aria-controls reference

4. **Individual Items**:
   - `role="option"`
   - `aria-selected` for currently highlighted item
   - Unique `id` for aria-activedescendant reference
   - `aria-describedby` for additional context (description, hotkey)

5. **Live Regions**:
   - `aria-live="polite"` for search result count announcements
   - Status messages for "No results found", loading states

6. **Keyboard Navigation**:
   - All navigation handled via useKeyBindings integration
   - Focus remains on search input while arrow keys navigate list
   - Screen reader announcements for selection changes

These ARIA attributes will be implemented during component development to ensure full screen reader compatibility.
```

## ActionCore Integration

### Optional Integration Composable

```typescript
// composables/useActionCoreIntegration.ts
import { computed, inject, ref } from 'vue'
import type { Ref } from 'vue'
import { ActionCoreKey } from '../ActionCore'

export function useActionCoreIntegration(useActionCore: Ref<boolean>) {
  const actionCore = inject(ActionCoreKey, null)

  const isAvailable = computed(() =>
    useActionCore.value && actionCore !== null
  )

  const actions = computed(() => {
    if (!isAvailable.value) return []

    return actionCore.getVisibleActions().filter(action =>
      action.enabled && !action.isNavigationAction
    )
  })

  const context = computed(() => {
    if (!isAvailable.value) return {}
    return actionCore.getApplicationContext()
  })

  async function executeAction(actionId: string, context?: any) {
    if (!isAvailable.value) {
      throw new Error('ActionCore not available')
    }

    return actionCore.executeAction(actionId, context)
  }

  return {
    isAvailable,
    actions,
    context,
    executeAction
  }
}
```

### Search Orchestration Composable

```typescript
// composables/useSearchOrchestration.ts
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { SearchProvider, ApplicationContext, SearchConfiguration } from '../types'

export function useSearchOrchestration({
  searchProviders,
  applicationContext,
  useActionCore,
  searchConfiguration
}: {
  searchProviders: Ref<SearchProvider[]>
  applicationContext: Ref<ApplicationContext>
  useActionCore: Ref<boolean>
  searchConfiguration: Ref<SearchConfiguration>
}) {
  const searchResults = ref<SearchResultItem[]>([])
  const isSearching = ref(false)
  const activeQuery = ref('')

  // Get active search providers based on context
  const activeSearchProviders = computed(() => {
    const providers = [...searchProviders.value]

    // Add ActionCore-managed providers if available
    if (useActionCore.value && actionCore) {
      // Get providers registered globally or by components via ActionCore
      providers.push(...actionCore.getActiveSearchProviders())
    }

    return providers.filter(provider =>
      !provider.contextFilter ||
      provider.contextFilter(applicationContext.value)
    )
  })

  async function executeSearch(query: string) {
    if (!query.trim()) {
      clearSearch()
      return
    }

    activeQuery.value = query
    isSearching.value = true

    try {
      const searchPromises = activeSearchProviders.value.map(async provider => {
        try {
          const results = await provider.search(query, applicationContext.value)
          return results.map(result => ({
            ...result,
            providerId: provider.id,
            providerTitle: provider.title
          }))
        } catch (error) {
          console.warn(`[VCommandPalette] Search provider "${provider.id}" failed:`, error)
          return []
        }
      })

      const providerResults = await Promise.allSettled(searchPromises)
      const allResults = providerResults
        .filter((result): result is PromiseFulfilledResult<SearchResultItem[]> =>
          result.status === 'fulfilled'
        )
        .flatMap(result => result.value)

      // Apply result ordering configuration
      searchResults.value = orderSearchResults(allResults, searchConfiguration.value)
    } finally {
      isSearching.value = false
    }
  }

  function clearSearch() {
    searchResults.value = []
    activeQuery.value = ''
    isSearching.value = false
  }

  function orderSearchResults(
    results: SearchResultItem[],
    config: SearchConfiguration
  ): SearchResultItem[] {
    // Apply resultOrdering configuration (passed via searchConfiguration)
    const ordering = props.resultOrdering

    return results.sort((a, b) => {
      // Custom ordering function from resultOrdering prop takes highest precedence
      if (ordering.customOrderFn) {
        return ordering.customOrderFn(a, b, applicationContext.value)
      }

      // Secondary custom ordering from search configuration
      if (config.customOrderFn) {
        return config.customOrderFn(a, b, applicationContext.value)
      }

      // Group-based ordering if specified in resultOrdering
      if (ordering.groupOrder && a.group !== b.group) {
        const aGroupIndex = ordering.groupOrder.indexOf(a.group || '')
        const bGroupIndex = ordering.groupOrder.indexOf(b.group || '')
        if (aGroupIndex !== bGroupIndex) {
          return (aGroupIndex === -1 ? Infinity : aGroupIndex) - (bGroupIndex === -1 ? Infinity : bGroupIndex)
        }
      }

      // Default ordering logic
      if (a.relevanceScore !== b.relevanceScore) {
        return (b.relevanceScore || 0) - (a.relevanceScore || 0)
      }

      return a.title.localeCompare(b.title)
    })
  }

  // Re-search when context changes significantly
  watch(applicationContext, (newContext, oldContext) => {
    if (activeQuery.value && hasSignificantContextChange(newContext, oldContext)) {
      executeSearch(activeQuery.value)
    }
  }, { deep: true })

  return {
    searchResults: computed(() => searchResults.value),
    isSearching: computed(() => isSearching.value),
    searchProviders: activeSearchProviders,
    executeSearch,
    clearSearch
  }
}

function hasSignificantContextChange(
  newContext: ApplicationContext,
  oldContext: ApplicationContext
): boolean {
  // Define what constitutes a significant context change
  return (
    newContext.currentView !== oldContext.currentView ||
    newContext.selectedItems !== oldContext.selectedItems ||
    newContext.userPermissions !== oldContext.userPermissions
  )
}
```

### Navigation Actions Composable

```typescript
// composables/useNavigationActions.ts
import { onMounted, onUnmounted } from 'vue'
import { useKeyBindings } from '@/composables/key-bindings'

export function useNavigationActions({
  onNavigateUp,
  onNavigateDown,
  onNavigatePageUp,
  onNavigatePageDown,
  onNavigateStart,
  onNavigateEnd,
  onSelectItem,
  onClose
}: NavigationHandlers) {
  const { registerBinding, unregisterBinding, registerContext, unregisterContext } = useKeyBindings()

  const navigationBindings = [
    { keys: 'ArrowUp', handler: onNavigateUp },
    { keys: 'ArrowDown', handler: onNavigateDown },
    { keys: 'PageUp', handler: onNavigatePageUp },
    { keys: 'PageDown', handler: onNavigatePageDown },
    { keys: 'Home', handler: onNavigateStart },
    { keys: 'End', handler: onNavigateEnd },
    { keys: 'Enter', handler: onSelectItem },
    { keys: 'Escape', handler: onClose }
  ]

  onMounted(() => {
    navigationBindings.forEach(binding => {
      registerBinding(binding.keys, binding.handler, {
        context: 'command-palette',
        description: `Navigate command palette: ${binding.keys}`
      })
    })
  })

  onUnmounted(() => {
    navigationBindings.forEach(binding => {
      unregisterBinding(binding.keys)
    })
  })

  return {
    bindings: {
      handleKeydown: (event: KeyboardEvent) => {
        // Key handling is managed by useKeyBindings registration
        // This provides a hook for additional key handling if needed
      }
    },
    registerContext,
    unregisterContext
  }
}
```

## Search Provider System

### Search Provider Interface

```typescript
// types/SearchProvider.ts
export interface SearchProvider {
  id: string
  title: string
  description?: string
  icon?: string
  priority?: number

  search(query: string, context: ApplicationContext): Promise<SearchResultItem[]>

  // Optional context filtering
  contextFilter?(context: ApplicationContext): boolean
}

export interface SearchResultItem {
  id: string
  title: string
  description?: string
  icon?: string
  group?: string
  relevanceScore?: number

  // Action execution
  actionId?: string // Execute existing action with this result as context
  onExecute?(result: SearchResultItem, context: ApplicationContext): Promise<void>

  // Additional metadata
  metadata?: Record<string, any>
  providerId?: string
  providerTitle?: string
}
```

### Example Search Providers

```typescript
// examples/FileSearchProvider.ts
export class FileSearchProvider implements SearchProvider {
  id = 'files'
  title = 'Files'
  description = 'Search project files'
  priority = 10

  async search(query: string, context: ApplicationContext): Promise<SearchResultItem[]> {
    // Implementation would search files
    const files = await searchFiles(query, context.currentProject)

    return files.map(file => ({
      id: `file-${file.path}`,
      title: file.name,
      description: file.path,
      group: 'Files',
      relevanceScore: calculateRelevance(query, file.name),
      actionId: 'file.open',
      metadata: { filePath: file.path }
    }))
  }

  contextFilter(context: ApplicationContext): boolean {
    return !!context.currentProject
  }
}

// examples/UserSearchProvider.ts
export class UserSearchProvider implements SearchProvider {
  id = 'users'
  title = 'Team Members'
  priority = 5

  async search(query: string, context: ApplicationContext): Promise<SearchResultItem[]> {
    const users = await searchUsers(query, context.organizationId)

    return users.map(user => ({
      id: `user-${user.id}`,
      title: user.displayName,
      description: user.email,
      group: 'Team',
      relevanceScore: calculateRelevance(query, user.displayName),
      onExecute: async (result, context) => {
        // Custom execution logic
        await showUserProfile(user.id)
      },
      metadata: { userId: user.id }
    }))
  }
}
```

## Visual Design and Styling

### Component Styles

```scss
.v-command-palette {
  .v-dialog__content {
    align-items: flex-start;
    padding-top: 10vh;
  }

  .v-card {
    overflow: hidden;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }
}

.v-command-palette__header {
  padding: 16px 16px 8px;
  border-bottom: 1px solid rgb(var(--v-theme-outline));
  background: rgb(var(--v-theme-surface));
}

.v-command-palette__search {
  position: relative;
  padding: 8px 16px 16px;
  background: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgb(var(--v-theme-outline));

  .v-command-palette__search-input {
    .v-field__input {
      font-size: 1.1rem;
      padding: 12px 16px;
    }
  }

  .v-command-palette__search-loader {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: -4px;
  }
}

.v-command-palette__list {
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
}

.v-command-palette__group-divider {
  margin: 8px 0 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.0892857143em;
  color: rgb(var(--v-theme-on-surface-variant));

  &::before {
    opacity: 0.38;
  }
}

.v-command-palette__item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 0;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgb(var(--v-theme-surface-variant));
  }

  &--selected {
    background: rgb(var(--v-theme-primary-container));
    color: rgb(var(--v-theme-on-primary-container));
  }

  &--action {
    .v-command-palette__item-title {
      font-weight: 500;
    }
  }

  &--search-result {
    .v-command-palette__item-title {
      font-weight: 400;
    }
  }
}

.v-command-palette__item-content {
  flex: 1;
  min-width: 0;
}

.v-command-palette__item-title {
  font-size: 0.875rem;
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .v-command-palette__highlight {
    background: rgb(var(--v-theme-secondary-container));
    color: rgb(var(--v-theme-on-secondary-container));
    padding: 0 2px;
    border-radius: 2px;
    font-weight: 600;
  }
}

.v-command-palette__item-description {
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(var(--v-theme-on-surface-variant));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
}

.v-command-palette__item-hotkey {
  margin-left: 12px;
  flex-shrink: 0;
}

.v-command-palette__no-results {
  padding: 32px 16px;
  text-align: center;
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 0.875rem;
}

.v-command-palette__loader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

// Density variants
.v-command-palette--density-compact {
  .v-command-palette__item {
    padding: 6px 12px;
  }

  .v-command-palette__search {
    padding: 6px 12px 12px;

    .v-command-palette__search-input .v-field__input {
      padding: 8px 12px;
    }
  }
}

.v-command-palette--density-comfortable {
  .v-command-palette__item {
    padding: 10px 20px;
  }

  .v-command-palette__search {
    padding: 10px 20px 20px;

    .v-command-palette__search-input .v-field__input {
      padding: 14px 20px;
    }
  }
}
```

## Helper Functions

### Search Highlighting

```typescript
function highlightMatch(text: string, query: string): VNode | string {
  if (!query.trim()) return text

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ?
      <span class="v-command-palette__highlight">{part}</span> :
      part
  )
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
```

### Debounce Utility

```typescript
function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
```

## Integration Examples

### ActionCore Integration

```tsx
import { VCommandPalette } from '@/labs/VActionCore'

export default function ActionCoreExample() {
  const isOpen = ref(false)

  return (
    <div>
      {/* ActionCore integration (automatic) */}
      <VCommandPalette
        modelValue={isOpen.value}
        onUpdate:modelValue={(value) => isOpen.value = value}
        onAction:execute={(action, context) => {
          console.log('Action executed:', action.id, context)
        }}
      />

      {/* Custom configuration */}
      <VCommandPalette
        modelValue={isOpen.value}
        onUpdate:modelValue={(value) => isOpen.value = value}
        placeholder="Search actions and files..."
        title="Quick Actions"
        width={700}
        density="comfortable"
      />
    </div>
  )
}
```

### Standalone Operation

```tsx
import { VCommandPalette } from '@/labs/VActionCore'

export default function StandaloneExample() {
  const isOpen = ref(false)

  const actions = [
    {
      id: 'save',
      title: 'Save File',
      description: 'Save the current file',
      hotkey: 'Ctrl+S',
      group: 'File'
    },
    {
      id: 'open',
      title: 'Open File',
      description: 'Open a file',
      hotkey: 'Ctrl+O',
      group: 'File'
    }
  ]

  const searchProviders = [
    new FileSearchProvider(),
    new UserSearchProvider()
  ]

  const applicationContext = {
    currentProject: 'my-project',
    currentFile: 'index.ts',
    selectedItems: [],
    userPermissions: ['read', 'write']
  }

  async function handleExecuteAction(action, context) {
    console.log('Executing action:', action.id, context)

    switch (action.id) {
      case 'save':
        await saveCurrentFile()
        break
      case 'open':
        await openFileDialog()
        break
    }
  }

  return (
    <VCommandPalette
      modelValue={isOpen.value}
      onUpdate:modelValue={(value) => isOpen.value = value}
      useActionCore={false}
      actions={actions}
      searchProviders={searchProviders}
      applicationContext={applicationContext}
      onExecuteAction={handleExecuteAction}
    />
  )
}
```

### Custom Slots

```tsx
export default function CustomSlotsExample() {
  return (
    <VCommandPalette modelValue={isOpen.value}>
      {{
        header: () => (
          <div class="custom-header">
            <h2>Custom Command Interface</h2>
            <p>Type to search actions and content</p>
          </div>
        ),

        item: ({ item, selected, onExecute }) => (
          <div
            class={['custom-item', { 'custom-item--selected': selected }]}
            onClick={onExecute}
          >
            <div class="custom-item__icon">
              {item.type === 'action' ? '⚡' : '🔍'}
            </div>
            <div class="custom-item__content">
              <div class="custom-item__title">{item.title}</div>
              <div class="custom-item__description">{item.description}</div>
            </div>
          </div>
        ),

        'no-results': ({ query }) => (
          <div class="custom-no-results">
            <h3>No matches found</h3>
            <p>Try a different search term or check out our <a href="/help">help guide</a></p>
          </div>
        )
      }}
    </VCommandPalette>
  )
}
```

This design provides a comprehensive, flexible command palette that integrates seamlessly with ActionCore while supporting complete standalone operation, extensive customization, and powerful search capabilities.
