/**
 * VCommandPaletteItems Component
 *
 * Purpose: This component serves as a container wrapper for custom command palette
 * layouts. It provides the necessary ARIA attributes and styling classes for
 * different navigation modes (list vs grid) while allowing complete flexibility
 * in how items are rendered within it.
 *
 * Why it exists:
 * - Provides proper ARIA container attributes for accessibility compliance
 * - Handles different navigation modes (list/grid) with appropriate styling
 * - Serves as the root container for custom layouts using VCommandPaletteItem
 * - Maintains consistency with Vuetify's component architecture patterns
 *
 * Scope justification: While this component is simple, it encapsulates the
 * complex ARIA and styling logic needed for proper accessibility and theming,
 * reducing the burden on developers creating custom layouts.
 */

// Styles
import './VCommandPaletteItems.scss'

// Composables
import { useCommandPaletteContext } from './composables/useCommandPaletteContext'
import { makeComponentProps } from '@/composables/component'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

/**
 * Props factory for VCommandPaletteItems
 * Minimal props since most configuration comes from the context
 */
export const makeVCommandPaletteItemsProps = propsFactory({
  // The HTML tag to render as the root element
  tag: {
    type: String,
    default: 'div',
  },
  ...makeComponentProps(),
}, 'VCommandPaletteItems')

/**
 * VCommandPaletteItems Component
 *
 * A container component that provides the proper ARIA attributes and styling
 * for custom command palette item layouts. Works in conjunction with
 * VCommandPaletteItem to create accessible custom layouts.
 */
export const VCommandPaletteItems = genericComponent()({
  name: 'VCommandPaletteItems',

  props: makeVCommandPaletteItemsProps(),

  setup (props, { slots }) {
    // Get the command palette context for navigation mode and root props
    const context = useCommandPaletteContext()

    // Compute the root props including ARIA attributes and styling classes
    const rootProps = computed(() => ({
      // Spread the context's root props (includes ARIA attributes)
      ...context.rootProps.value,
      class: [
        'v-command-palette-items', // Base container class
        {
          // Apply navigation mode-specific classes for styling
          'v-command-palette-items--grid': context.navigationMode.value === 'grid',
          'v-command-palette-items--list': context.navigationMode.value === 'list',
        },
        props.class, // User-provided classes
      ],
      style: props.style,
    }))

    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag { ...rootProps.value }>
          { /* Render child VCommandPaletteItem components */ }
          { slots.default?.() }
        </Tag>
      )
    })
  },
})

export type VCommandPaletteItems = InstanceType<typeof VCommandPaletteItems>
