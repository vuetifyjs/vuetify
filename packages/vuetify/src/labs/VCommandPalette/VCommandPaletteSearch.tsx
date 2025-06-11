/**
 * VCommandPaletteSearch Component
 *
 * A specialized search input component designed specifically for the VCommandPalette.
 * This component provides a consistent search interface with proper ARIA attributes
 * for accessibility and integrates seamlessly with the command palette's theming.
 *
 * Purpose: Encapsulates the search functionality to maintain separation of concerns
 * and provide a reusable search interface that can be customized via slots.
 */

// Components
import { VTextField } from '@/components/VTextField'

// Composables
import { useLocale } from '@/composables'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Ref } from 'vue'

/**
 * Props factory for VCommandPaletteSearch
 * Defines the configurable properties for the search component
 */
export const makeVCommandPaletteSearchProps = propsFactory({
  // The search query value (v-model)
  modelValue: String,
  // Placeholder text for the search input
  placeholder: {
    type: String,
  },
  // Whether to show a clear button
  clearable: {
    type: Boolean,
  },
  // ARIA label for accessibility
  ariaLabel: String,
  // ARIA describedby for accessibility (typically points to instructions)
  ariaDescribedby: String,
}, 'VCommandPaletteSearch')

/**
 * Slot definitions for VCommandPaletteSearch
 * Allows complete customization of the search input
 */
export type VCommandPaletteSearchSlots = {
  default: {
    modelValue: Ref<string | undefined>
  }
}

/**
 * VCommandPaletteSearch Component
 *
 * A wrapper around VTextField that provides search functionality for the command palette.
 * Uses the default slot pattern to allow complete customization while providing
 * sensible defaults for the common use case.
 */
export const VCommandPaletteSearch = genericComponent<VCommandPaletteSearchSlots>()({
  name: 'VCommandPaletteSearch',

  props: makeVCommandPaletteSearchProps(),

  emits: {
    // Emitted when the search value changes
    'update:modelValue': (value: string) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    // Create a proxied model for two-way binding
    const search = useProxiedModel(props, 'modelValue')

    useRender(() => {
      return (
        <>
          { /* Allow complete customization via default slot */ }
          { slots.default?.({
            modelValue: search,
          }) ?? (
            // Default search input implementation
            <VTextField
              v-model={ search.value }
              placeholder={ props.placeholder ?? t('$vuetify.command.placeholder') }
              hideDetails // No validation messages needed for search
              variant="solo" // Consistent with command palette design
              flat // Remove elevation for clean look
              clearable={ props.clearable }
              autofocus // Automatically focus when palette opens
              aria-label={ props.ariaLabel }
              aria-describedby={ props.ariaDescribedby }
            />
          )}
        </>
      )
    })
  },
})

export type VCommandPaletteSearch = InstanceType<typeof VCommandPaletteSearch>
