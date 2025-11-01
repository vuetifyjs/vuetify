/**
 * VCommandPaletteItem Component
 *
 * Purpose: This specialized component exists to provide a consistent item wrapper
 * for custom command palette layouts. While the default VCommandPaletteList handles
 * most use cases, this component allows developers to build completely custom
 * layouts (like grid views) while maintaining proper accessibility, selection state,
 * and integration with the command palette's navigation system.
 *
 * Why it exists:
 * - Provides automatic registration with the parent context for navigation
 * - Handles selection state and ARIA attributes consistently
 * - Allows custom layouts beyond the standard list view
 * - Maintains accessibility compliance across different layout patterns
 */

// Styles
import './VCommandPaletteItem.scss'

// Composables
import { useCommandPaletteContext } from './composables/useCommandPaletteContext'
import { makeComponentProps } from '@/composables/component'

// Utilities
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

/**
 * Slot scope for the default slot
 * Provides all necessary data for rendering custom item layouts
 */
export type VCommandPaletteItemSlots = {
  default: {
    item: any // The raw item data
    index: number // The item's index in the list
    selected: boolean // Whether this item is currently selected
    props: Record<string, any> // Computed props for accessibility and styling
  }
}

/**
 * Props factory for VCommandPaletteItem
 */
export const makeVCommandPaletteItemProps = propsFactory({
  // The item data to render
  item: {
    type: Object as PropType<any>,
    required: true,
  },
  // The item's index in the selectable items list
  index: {
    type: Number,
    required: true,
  },
  // The HTML tag to render as the root element
  tag: {
    type: String,
    default: 'div',
  },
  ...makeComponentProps(),
}, 'VCommandPaletteItem')

/**
 * VCommandPaletteItem Component
 *
 * A wrapper component that handles item registration, selection state,
 * and accessibility attributes for custom command palette layouts.
 */
export const VCommandPaletteItem = genericComponent<VCommandPaletteItemSlots>()({
  name: 'VCommandPaletteItem',

  props: makeVCommandPaletteItemProps(),

  setup (props, { slots }) {
    // Get the command palette context for registration and state management
    const context = useCommandPaletteContext()
    const elementRef = ref<HTMLElement>()

    // Generate a unique ID for this item (used for ARIA attributes)
    const itemId = computed(() => `command-palette-item-${props.index}`)

    // Compute selection state based on the context's selected index
    const isSelected = computed(() => context.selectedIndex.value === props.index)

    // Track the current registered ID to handle re-registration
    let currentRegisteredId: string | null = null

    // Register this item with the parent context initially
    onMounted(() => {
      currentRegisteredId = itemId.value
      context.registerItem(currentRegisteredId, elementRef, props.item)
    })

    // Watch for changes in itemId and re-register when it changes
    // This handles cases where the item's position in the list changes
    watch(itemId, (newId, oldId) => {
      if (oldId && currentRegisteredId) {
        // Unregister the old key
        context.unregisterItem(currentRegisteredId)
      }
      // Register with the new key
      currentRegisteredId = newId
    })

    // Re-register with new ID
    watch(itemId, (newId, oldId) => {
      if (oldId) context.unregisterItem(oldId)
      context.registerItem(newId, elementRef, props.item)
    })

    onMounted(() => {
      context.registerItem(itemId.value, elementRef, props.item)
    })

    // Clean up registration when component unmounts
    onBeforeUnmount(() => {
      context.unregisterItem(itemId.value)
    })

    // Get computed props from the context (includes ARIA attributes, classes, etc.)
    const itemProps = computed(() => context.getItemProps(props.item, props.index))

    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag
          ref={ elementRef }
          { ...itemProps.value }
          class={[
            'v-command-palette-item', // Base styling class
            {
              'v-command-palette-item--selected': isSelected.value, // Selection state class
            },
            props.class, // User-provided classes
          ]}
          style={ props.style }
        >
          { /* Render the default slot with all necessary data */ }
          { slots.default?.({
            item: props.item,
            index: props.index,
            selected: isSelected.value,
            props: itemProps.value,
          })}
        </Tag>
      )
    })
  },
})

export type VCommandPaletteItem = InstanceType<typeof VCommandPaletteItem>
