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
import { VBtn } from '@/components/VBtn'
import { VIcon } from '@/components/VIcon'
import { VTextField } from '@/components/VTextField'
import { makeVTextFieldProps } from '@/components/VTextField/VTextField'

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
  // ARIA label for accessibility
  ariaLabel: String,
  // ARIA describedby for accessibility (typically points to instructions)
  ariaDescribedby: String,
  // Show back navigation button instead of search icon
  showBackButton: Boolean,
  ...makeVTextFieldProps({
    autofocus: true,
    bgColor: 'transparent',
    hideDetails: true,
    flat: true,
    variant: 'solo' as const,
  }),
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
    // Emitted when the back button is clicked
    'click:back': () => true,
  },

  setup (props, { slots, emit }) {
    const { t } = useLocale()
    // Create a proxied model for two-way binding
    const search = useProxiedModel(props, 'modelValue')
    const textFieldProps = VTextField.filterProps(props)

    function onBackClick () {
      emit('click:back')
    }

    useRender(() => {
      return (
        <>
          { /* Allow complete customization via default slot */ }
          { slots.default?.({
            modelValue: search,
          }) ?? (
            // Default search input implementation
            <VTextField
              { ...textFieldProps }
              v-model={ search.value }
              placeholder={ props.placeholder ?? t('$vuetify.command.placeholder') }
              aria-label={ props.ariaLabel }
              aria-describedby={ props.ariaDescribedby }
            >
              {{
                'prepend-inner': props.showBackButton ? () => (
                  <VBtn
                    icon="$prev"
                    size="small"
                    aria-label="Navigate back"
                    onClick={ onBackClick }
                  />
                ) : () => (
                  <VIcon icon="mdi-magnify" />
                ),
              }}
            </VTextField>
          )}
        </>
      )
    })
  },
})

export type VCommandPaletteSearch = InstanceType<typeof VCommandPaletteSearch>
