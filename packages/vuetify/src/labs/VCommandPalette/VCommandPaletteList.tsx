/**
 * VCommandPaletteList Component and Type System
 *
 * This file contains the default list rendering component for the command palette
 * along with a comprehensive type system that defines all possible item types.
 * The component handles complex item flattening, accessibility, and rendering
 * for hierarchical data structures.
 *
 * Key Responsibilities:
 * - Defines the complete type system for command palette items
 * - Flattens hierarchical items (groups, parents, children) into a renderable list
 * - Manages selection state and keyboard navigation
 * - Provides proper ARIA attributes for accessibility
 * - Handles different item types with appropriate rendering
 *
 * Type System Overview:
 * - BaseItemProps: Common properties for all items
 * - VCommandPaletteItemDefinition: Leaf items (action or link)
 * - VCommandPaletteParentDefinition: Items with navigable children
 * - VCommandPaletteGroupDefinition: Visual grouping with non-navigable header
 * - Type guards for runtime type checking
 *
 * Why this complexity exists:
 * The command palette supports rich hierarchical data with different behaviors:
 * - Groups provide visual organization without navigation
 * - Parents provide drill-down navigation
 * - Items provide actions or links
 * This requires a sophisticated type system and rendering logic.
 */

// Styles
import '@/labs/VCommandPalette/VCommandPalette.scss'

// Components
import { VDivider } from '@/components/VDivider'
import { VList, VListItem, VListSubheader } from '@/components/VList'
import { makeVListProps } from '@/components/VList/VList'
import { VHotkey } from '@/labs/VHotkey'

// Composables
import { useLocale } from '@/composables/locale' // For default no-data text

// Utilities
import { computed, nextTick, ref, watch } from 'vue'
import { genericComponent, omit, onlyDefinedProps, propsFactory, useRender } from '@/util'

// Types
import type { MaybeRef, PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { ListItem as VuetifyListItem } from '@/composables/list-items'

/**
 * Common properties that all command palette items must have.
 * These form the foundation for all item types.
 */
interface BaseItemProps {
  id?: string // Optional unique identifier (auto-generated if not provided)
  title: string // Display title (required for all items)
  visible?: MaybeRef<boolean> // Whether the item should be shown
  keywords?: string[] // Additional search terms for enhanced discoverability
}

/**
 * A subset of VListItem props used for visual display.
 * These props control the appearance of items in the list.
 */
type VListDisplayTypes = {
  appendAvatar?: string
  appendIcon?: string
  prependAvatar?: string
  prependIcon?: string
  subtitle?: string | number | boolean
}

/**
 * Standard navigation properties for items that can navigate.
 * Supports both Vue Router navigation and external links.
 */
type VListNavigableTypes = {
  to?: RouteLocationRaw // Vue Router navigation target
  href?: string // External URL
}

/**
 * The base for all command palette items. Defaults to `type: 'item'`.
 * This is the foundation that other item types extend.
 */
type VCommandPaletteItemBase<TValue = unknown> = BaseItemProps & VListDisplayTypes & {
  type?: 'item' // Type discriminator (defaults to 'item' if omitted)
  hotkey?: string // Keyboard shortcut for this item
}

/**
 * An item that performs an action when triggered.
 * These items execute JavaScript functions and can carry data.
 */
export interface VCommandPaletteActionItem<TValue = unknown> extends VCommandPaletteItemBase<TValue> {
  handler?: (params?: TValue) => void // Function to execute
  value?: TValue // Data to pass to the handler
  // Explicitly exclude navigation and children properties
  to?: never
  href?: never
  children?: never
}

/**
 * An item that navigates to a URL when triggered.
 * These items use browser/router navigation instead of JavaScript handlers.
 */
export interface VCommandPaletteLinkItem extends VCommandPaletteItemBase, VListNavigableTypes {
  // Explicitly exclude action and children properties
  handler?: never
  value?: never
  children?: never
}

/**
 * A union of all possible leaf-node item types.
 * These are items that can be selected and executed.
 */
export type VCommandPaletteItemDefinition<TValue = unknown> =
  | VCommandPaletteActionItem<TValue>
  | VCommandPaletteLinkItem

/**
 * An item that contains other items and allows drilling down into them.
 * When selected, these items navigate to show their children instead of executing.
 */
export interface VCommandPaletteParentDefinition extends BaseItemProps, VListDisplayTypes {
  type: 'parent' // Required type discriminator
  children: VCommandPaletteItemDefinition[] // Child items to navigate to
  // Explicitly exclude properties that would make it a leaf item
  handler?: never
  value?: never
  to?: never
  href?: never
}

/**
 * An item that visually groups other items under a non-clickable header.
 * These provide organization without navigation - the header is not selectable.
 */
export interface VCommandPaletteGroupDefinition extends BaseItemProps {
  type: 'group' // Required type discriminator
  divider?: 'start' | 'end' | 'none' | 'both' // Divider placement (default: none)
  children: Array<VCommandPaletteItemDefinition | VCommandPaletteParentDefinition> // Grouped items
  // Explicitly exclude properties that would make it a leaf or parent item
  handler?: never
  value?: never
  to?: never
  href?: never
  hotkey?: never // Groups can't have hotkeys since they're not selectable
}

// --- Type Guards ---
// These functions provide runtime type checking for the different item types

/**
 * Checks if an item is a leaf-node item (action or link).
 * These are items that can be selected and executed.
 */
export function isItemDefinition (item: VCommandPaletteItem): item is VCommandPaletteItemDefinition {
  return item.type === 'item' || item.type === undefined
}

/**
 * Checks if an item is an action item.
 * These items have handlers or values but no navigation properties.
 */
export function isActionItem (item: VCommandPaletteItem): item is VCommandPaletteActionItem {
  return (item.type === 'item' || item.type === undefined) &&
         ('handler' in item || 'value' in item) &&
         !('to' in item) && !('href' in item)
}

/**
 * Checks if an item is a link item.
 * These items have navigation properties but no handlers or values.
 */
export function isLinkItem (item: VCommandPaletteItem): item is VCommandPaletteLinkItem {
  return (item.type === 'item' || item.type === undefined) &&
         ('to' in item || 'href' in item) &&
         !('handler' in item) && !('value' in item)
}

/**
 * Checks if an item is a parent item.
 * These items have children and provide drill-down navigation.
 */
export function isParentDefinition (item: VCommandPaletteItem): item is VCommandPaletteParentDefinition {
  return item.type === 'parent'
}

/**
 * Checks if an item is a group item.
 * These items provide visual grouping with non-selectable headers.
 */
export function isGroupDefinition (item: VCommandPaletteItem): item is VCommandPaletteGroupDefinition {
  return item.type === 'group'
}

/**
 * A union of all possible item types in the command palette.
 * This represents the complete type system for command palette items.
 */
export type VCommandPaletteItem = VCommandPaletteItemDefinition | VCommandPaletteParentDefinition | VCommandPaletteGroupDefinition

/**
 * Props factory for VCommandPaletteList
 * Defines the configuration options for the list component
 */
export const makeVCommandPaletteListProps = propsFactory({
  /**
   * The list of items to display. This is expected to be an array of `VuetifyListItem`
   * objects, which are produced by the `transformItems` function in the parent component.
  */
  items: {
    type: Array as PropType<Array<VuetifyListItem>>,
    default: () => ([] as Array<VuetifyListItem>),
  },
  // Current selected index for keyboard navigation
  selectedIndex: {
    type: Number,
    default: -1,
  },
  // Inherit VList props but exclude conflicting ones
  ...omit(makeVListProps({
    bgColor: 'transparent',
    density: 'compact' as const,
    nav: true,
  }), [
    'items',
    'itemChildren',
    'itemType',
    'itemValue',
    'itemProps',
  ]),
}, 'VCommandPaletteList')

// Scope for the item slot, should match what VCommandPalette provides
export type VCommandPaletteListItemSlotScope = {
  item: VCommandPaletteItem
  props: Record<string, any>
}

/**
 * Slot definitions for VCommandPaletteList
 * Provides customization points for different parts of the list
 */
export type VCommandPaletteListSlots = {
  item: VCommandPaletteListItemSlotScope // Custom item rendering
  'no-data': never // No data state (no scope needed)
  'prepend-list': never // Content before the list
  'append-list': never // Content after the list
  'item.append': { item: any }
}

/**
 * VCommandPaletteList Component
 *
 * The default list rendering component for the command palette. This component
 * handles the complex task of flattening hierarchical item structures into
 * a linear list while maintaining proper accessibility and selection state.
 *
 * Key Features:
 * - Flattens groups, parents, and children into a single navigable list
 * - Handles different item types with appropriate rendering
 * - Manages selection state and keyboard navigation
 * - Provides proper ARIA attributes for accessibility
 * - Supports custom item rendering via slots
 * - Handles dividers for visual separation
 *
 * The flattening logic is one of the most complex parts of the command palette,
 * as it needs to convert a hierarchical structure into a flat list while
 * maintaining the visual hierarchy and proper selection mapping.
 */
export const VCommandPaletteList = genericComponent<VCommandPaletteListSlots>()({
  name: 'VCommandPaletteList',

  props: makeVCommandPaletteListProps(),

  emits: {
    'click:item': (item: VuetifyListItem, event: MouseEvent | KeyboardEvent) => true,
    /** Emitted when the user hovers a selectable item. Payload is the selectable index */
    hover: (selectableIndex: number) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const vListRef = ref<typeof VList>()
    // Extract VList props while excluding our custom props
    const vListProps = VList.filterProps(omit(props, ['items', 'selectedIndex']))

    /**
     * An adapter function that extracts the necessary props from a `VuetifyListItem`
     * to pass to a VListItem component. It also attaches the click handler.
     *
     * This function bridges the gap between our internal item representation
     * and the props expected by VListItem component.
     */
    function getVListItemProps (item: any, index: number, isSelectable = true) {
      return {
        title: item.title,
        onClick: isSelectable
          ? (e: MouseEvent | KeyboardEvent) => emit('click:item', item, e)
          : undefined,
        ...onlyDefinedProps(VListItem.filterProps(omit(item.props || {}, ['title', 'value']))),
      }
    }

    /**
     * This computed property is the core of the list's rendering logic. It takes the
     * `items` prop (which is a flat list of `VuetifyListItem`s) and transforms it into
     * a structure that can be rendered correctly, including group headers and dividers.
     *
     * Why flatten?
     * - VList expects a flat array to render.
     * - Groups need to be displayed with their children directly beneath them.
     * - This structure makes it possible to map a simple `selectedIndex` to a complex
     *   visual layout for keyboard navigation.
     *
     * The flattening process:
     * 1. Iterate through each top-level item
     * 2. If it's a group, add optional dividers, the group header, and all children
     * 3. If it's a parent or regular item, add it directly
     * 4. Track original indices for proper event handling
     */
    const flattenedItems = computed(() => {
      const result: Array<{ type: 'divider' | 'group' | 'item', originalIndex?: number, item?: any, key: string }> = []

      props.items.forEach((item: any, index) => {
        if (item.raw && isGroupDefinition(item.raw)) {
          const groupItem = item.raw as VCommandPaletteGroupDefinition
          const showStartDivider = groupItem.divider === 'start' || groupItem.divider === 'both'
          const showEndDivider = groupItem.divider === 'end' || groupItem.divider === 'both'

          // Add start divider if requested
          if (showStartDivider) {
            result.push({ type: 'divider', key: `${index}-start-divider`, item: 'start' })
          }

          // Add the group header (non-selectable)
          result.push({ type: 'group', originalIndex: index, item, key: `${index}-group` })

          // Add all group children as selectable items
          groupItem.children.forEach((child: any, childIndex: number) => {
            // Transform raw child into VuetifyListItem format
            const transformedChild = {
              title: child.title,
              value: child.value,
              props: {
                title: child.title,
                subtitle: child.subtitle,
                prependIcon: child.prependIcon,
                appendIcon: child.appendIcon,
                prependAvatar: child.prependAvatar,
                appendAvatar: child.appendAvatar,
                to: child.to,
                href: child.href,
                hotkey: child.hotkey,
              },
              raw: child,
            }
            result.push({ type: 'item', item: transformedChild, key: `${index}-${childIndex}` })
          })

          // Add end divider if requested (after all children have been added)
          if (showEndDivider) {
            result.push({ type: 'divider', key: `${index}-end-divider`, item: 'end' })
          }
        } else {
          // Parent items and regular items - show as clickable items (no children exposed)
          // Parents will be drilled down into when clicked
          result.push({ type: 'item', originalIndex: index, item, key: `${index}` })
        }
      })

      return result
    })

    /**
     * Maps the `selectedIndex` (which only counts selectable items) to the actual index
     * within the `flattenedItems` array (which includes non-selectable headers and dividers).
     * This is essential for correctly applying the '--active' class for styling.
     *
     * The mapping process:
     * 1. Iterate through flattened items
     * 2. Count only selectable items (type: 'item')
     * 3. When the selectable count matches selectedIndex, return the flat index
     * 4. This allows keyboard navigation to work with visual hierarchy
     */
    const actualSelectedIndex = computed(() => {
      if (props.selectedIndex === -1) return -1

      let selectableItemCount = 0
      for (let i = 0; i < flattenedItems.value.length; i++) {
        const flatItem = flattenedItems.value[i]
        if (flatItem.type === 'item') {
          if (selectableItemCount === props.selectedIndex) {
            return i
          }
          selectableItemCount++
        }
      }
      return -1
    })

    /**
     * Calculate the correct activeDescendantId based on the selectedIndex from the composable.
     * This maps the logical selectedIndex (counting only selectable items) to the actual DOM element ID.
     *
     * This is crucial for screen reader accessibility, as it tells assistive technology
     * which item is currently selected.
     */
    const activeDescendantId = computed(() => {
      if (props.selectedIndex === -1) return undefined

      // Use the selectedIndex directly since we're now using sequential IDs for selectable items
      return `command-palette-item-${props.selectedIndex}`
    })

    /**
     * Watches for changes in the selected index and scrolls the active item into view.
     * This ensures that as the user navigates with the keyboard, the selected item is
     * always visible.
     *
     * Uses 'post' flush to ensure DOM updates have completed before scrolling.
     */
    watch([actualSelectedIndex, flattenedItems], async () => {
      if (actualSelectedIndex.value >= 0 && vListRef.value) {
        await nextTick()
        const listElement = vListRef.value.$el
        if (listElement) {
          const selectedElement = listElement.querySelector('.v-list-item--active')
          if (selectedElement) {
            selectedElement.scrollIntoView({
              block: 'nearest', // Only scroll if necessary
              behavior: 'auto', // No smooth scrolling for keyboard navigation
            })
          }
        }
      }
    }, { flush: 'post' })

    // Count selectable items for ARIA label
    const selectableItemsCount = computed(() => {
      return flattenedItems.value.filter(item => item.type === 'item').length
    })

    useRender(() => (
      <VList
        ref={ vListRef }
        { ...vListProps }
        class="v-command-palette__list"
        role="listbox" // ARIA role for keyboard navigation
        tabindex="0" // Make the list focusable
        aria-activedescendant={ activeDescendantId.value } // Current selection for screen readers
        aria-label={ `${selectableItemsCount.value} ${selectableItemsCount.value === 1 ? 'option' : 'options'} available` }
        aria-multiselectable="false" // Single selection only
        slim
      >
        { slots['prepend-list']?.() }
        { flattenedItems.value.length > 0
          ? (() => {
            // Track selectable items for ID generation
            let selectableCounter = -1
            return flattenedItems.value.map((flatItem, flatIndex) => {
              // Increment counter for selectable items
              if (flatItem.type === 'item') {
                selectableCounter++
              }

              // We create a local copy so it can be referenced in events
              const currentSelectableIndex = selectableCounter

              // Render different item types
              if (flatItem.type === 'divider') {
                return (
                <VDivider
                  key={ flatItem.key }
                  class={[flatItem.item === 'start' ? 'v-command-palette__list-divider-start' : 'v-command-palette__list-divider-end']}
                />
                )
              }

              if (flatItem.type === 'group') {
                // Group headers are non-selectable visual elements
                const groupProps = getVListItemProps(flatItem.item!, flatItem.originalIndex!, false)
                const slotProps = { item: flatItem.item, props: groupProps }

                return slots.item
                  ? slots.item(slotProps)
                  : <VListSubheader key={ flatItem.key } { ...groupProps } class="v-command-palette__list-group" role="presentation" />
              }

              if (flatItem.type === 'item') {
                // Selectable items with full accessibility support
                const isActive = flatIndex === actualSelectedIndex.value
                const itemId = `command-palette-item-${currentSelectableIndex}`
                const item = flatItem.item!

                // Enhanced ARIA attributes for better accessibility
                const itemProps = {
                  ...getVListItemProps(item, currentSelectableIndex, true),
                  active: isActive, // Vuetify active state
                  id: itemId, // For ARIA relationships
                  role: 'option', // ARIA role for listbox items
                  'aria-selected': isActive, // ARIA selection state
                  'aria-describedby': item.props?.subtitle ? `${itemId}-description` : undefined,
                  // Comprehensive ARIA label including hotkey information
                  'aria-label': item.props?.hotkey
                    ? `${item.title}. ${item.props.subtitle || ''}. Hotkey: ${item.props.hotkey}`
                    : `${item.title}. ${item.props.subtitle || ''}`,
                }
                const slotProps = { item: flatItem.item, props: itemProps }

                const defaultNode = (
                  <VListItem
                    key={ flatItem.key }
                    { ...itemProps }
                    class="v-command-palette__list-group"
                    onMouseenter={ () => emit('hover', currentSelectableIndex) } // Mouse hover updates selection
                  >
                    {{
                      append: slots['item.append']
                        ? () => slots['item.append']!({ item: item.raw })
                        : item.raw?.hotkey
                          ? () => <VHotkey keys={ item.raw.hotkey } />
                          : undefined,
                    }}
                  </VListItem>
                )

                return slots.item ? slots.item(slotProps) : defaultNode
              }

              return null
            })
          })()
          : (
            // No data state
            slots['no-data']?.() ??
              <VListItem key="no-data-fallback" title={ t('$vuetify.noDataText') } />
          )
        }
        { slots['append-list']?.() }
      </VList>
    ))
  },
})

export type VCommandPaletteList = InstanceType<typeof VCommandPaletteList>
