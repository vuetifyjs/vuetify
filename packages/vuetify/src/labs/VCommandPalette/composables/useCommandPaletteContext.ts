/**
 * useCommandPaletteContext Composable
 *
 * Purpose: This composable provides a context system for custom command palette
 * layouts. It enables communication between the main VCommandPalette component
 * and custom item components (VCommandPaletteItem, VCommandPaletteItems) while
 * maintaining proper accessibility and navigation state.
 *
 * Why it exists as a separate composable:
 * - Enables custom layouts while maintaining accessibility compliance
 * - Provides a clean API for item registration and state management
 * - Separates context logic from component rendering logic
 * - Allows for future extensibility (grid layouts, different navigation modes)
 * - Follows Vue's provide/inject pattern for component communication
 *
 * Scope justification: While this adds complexity, it's necessary to support
 * custom layouts without breaking accessibility or navigation. The alternative
 * would be forcing all users into the default list layout, reducing flexibility.
 */

// Utilities
import { computed, inject, provide, shallowRef } from 'vue'

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue'

/**
 * Represents a registered command palette item
 * Used for tracking items in custom layouts
 */
export interface CommandPaletteItem {
  id: string // Unique identifier for the item
  element: Ref<HTMLElement | undefined> // Reference to the DOM element
  data: any // The raw item data
}

/**
 * Context interface that defines the API available to child components
 * Provides all necessary functions and state for custom layouts
 */
export interface VCommandPaletteContext {
  registerItem: (id: string, element: Ref<HTMLElement | undefined>, data: any) => void
  unregisterItem: (id: string) => void
  selectedIndex: Ref<number> // Current selected item index
  navigationMode: Ref<'list' | 'grid'> // Current navigation mode
  items: Ref<any[]> // Current items array
  getItemProps: (item: any, index: number) => Record<string, any> // Generate item props
  rootProps: ComputedRef<Record<string, any>> // Root container props
}

/**
 * Injection key for the command palette context
 * Ensures type safety and prevents naming conflicts
 */
export const VCommandPaletteContextKey: InjectionKey<VCommandPaletteContext> = Symbol.for('vuetify:command-palette')

/**
 * Provides command palette context to child components
 * Sets up the context with all necessary state and functions
 */
export function provideCommandPaletteContext (options: {
  items: Ref<any[]>
  selectedIndex: Ref<number>
  activeDescendantId: ComputedRef<string | undefined>
  onKeydown?: (event: KeyboardEvent) => void
  navigationMode?: Ref<'list' | 'grid'>
}) {
  const {
    items,
    selectedIndex,
    activeDescendantId,
    onKeydown,
    navigationMode = shallowRef('list'), // Default to list mode
  } = options

  // Track registered items for custom layouts
  // Uses shallowRef for performance with Map objects
  const registeredItems = shallowRef<Map<string, CommandPaletteItem>>(new Map())

  /**
   * Registers an item with the context
   * Used by VCommandPaletteItem components to make themselves known
   */
  function registerItem (id: string, element: Ref<HTMLElement | undefined>, data: any) {
    registeredItems.value.set(id, { id, element, data })
    // Trigger reactivity by creating a new Map instance
    registeredItems.value = new Map(registeredItems.value)
  }

  /**
   * Unregisters an item from the context
   * Used when VCommandPaletteItem components unmount
   */
  function unregisterItem (id: string) {
    registeredItems.value.delete(id)
    // Trigger reactivity by creating a new Map instance
    registeredItems.value = new Map(registeredItems.value)
  }

  /**
   * Generates props for individual items
   * Provides consistent ARIA attributes and styling classes
   */
  function getItemProps (item: any, index: number) {
    const isSelected = selectedIndex.value === index
    const itemId = `command-palette-item-${index}`

    return {
      id: itemId, // For ARIA relationships
      role: 'option', // ARIA role for listbox items
      'aria-selected': isSelected, // ARIA selection state
      class: {
        'v-list-item--active': isSelected, // Vuetify active class
      },
      tabindex: -1, // Not directly focusable (parent manages focus)
    }
  }

  /**
   * Computes root container props based on navigation mode and state
   * Provides proper ARIA attributes for the container element
   */
  const rootProps = computed(() => {
    const baseProps: Record<string, any> = {
      // Set appropriate ARIA role based on navigation mode
      role: navigationMode.value === 'grid' ? 'grid' : 'listbox',
      tabindex: 0, // Make container focusable
    }

    // Add aria-activedescendant if there's a selected item
    if (activeDescendantId.value) {
      baseProps['aria-activedescendant'] = activeDescendantId.value
    }

    // Add keydown handler if provided
    if (onKeydown) {
      baseProps.onKeydown = onKeydown
    }

    return baseProps
  })

  // Create the context object
  const context: VCommandPaletteContext = {
    registerItem,
    unregisterItem,
    selectedIndex,
    navigationMode,
    items,
    getItemProps,
    rootProps,
  }

  // Provide the context to child components
  provide(VCommandPaletteContextKey, context)

  return context
}

/**
 * Consumes the command palette context
 * Used by child components to access the context
 *
 * @throws Error if used outside of a VCommandPalette component
 */
export function useCommandPaletteContext () {
  const context = inject(VCommandPaletteContextKey)

  if (!context) {
    throw new Error('useCommandPaletteContext must be used within a VCommandPalette component')
  }

  return context
}
