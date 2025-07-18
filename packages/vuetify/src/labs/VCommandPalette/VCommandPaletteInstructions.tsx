/**
 * VCommandPaletteInstructions Component
 *
 * Purpose: Displays contextual keyboard shortcuts and instructions at the bottom
 * of the command palette. This component dynamically shows relevant shortcuts
 * based on the current state (has items, has parent navigation, etc.) and
 * provides essential accessibility information for screen readers.
 *
 * Why it exists:
 * - Provides contextual help for keyboard navigation
 * - Improves accessibility by describing available actions
 * - Reduces cognitive load by showing only relevant shortcuts
 * - Maintains consistent instruction formatting across the palette
 */

// Styles
import '@/labs/VCommandPalette/VCommandPalette.scss'

// Components
import { VHotkey } from '@/labs/VHotkey'

// Composables
import { useLocale } from '@/composables/locale'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

/**
 * Props factory for VCommandPaletteInstructions
 * Controls which instructions are shown based on current state
 */
export const makeVCommandPaletteInstructionsProps = propsFactory({
  // Whether there are items to select (shows Enter and arrow key instructions)
  hasItems: Boolean,
  // Whether there's a parent level to navigate back to (shows Backspace instruction)
  hasParent: Boolean,
  // ID for ARIA describedby relationships
  id: String,
  ...makeThemeProps(),
}, 'VCommandPaletteInstructions')

/**
 * VCommandPaletteInstructions Component
 *
 * Renders contextual keyboard shortcuts based on the current command palette state.
 * Always shows the Escape key instruction, and conditionally shows other shortcuts
 * based on available actions.
 */
export const VCommandPaletteInstructions = genericComponent()({
  name: 'VCommandPaletteInstructions',

  props: makeVCommandPaletteInstructionsProps(),

  setup (props) {
    const { t } = useLocale()

    // Apply theme classes for consistent styling
    const { themeClasses } = provideTheme(props)

    useRender(() => (
      <div
        id={ props.id } // For ARIA describedby relationships
        class={[
          'v-command-palette-instructions',
          themeClasses.value,
        ]}
        role="region" // ARIA landmark for screen readers
        aria-label="Keyboard shortcuts" // Describes the purpose of this region
      >
        { /* Show Enter key instruction only when there are items to select */ }
        { props.hasItems && (
          <div key="select-instruction" class="d-flex align-center">
            <VHotkey keys="enter" />
            <span class="ms-2">{ t('$vuetify.command.select') }</span>
          </div>
        )}

        { /* Show navigation instructions only when there are items to navigate */ }
        { props.hasItems && (
          <div key="navigate-instruction" class="d-flex align-center">
            <VHotkey keys="arrowup arrowdown" />
            <span class="ms-2">{ t('$vuetify.command.navigate') }</span>
          </div>
        )}

        { /* Show back navigation instruction only when there's a parent level */ }
        { props.hasParent && (
          <div key="back-instruction" class="d-flex align-center">
            <VHotkey keys="backspace" />
            <span class="ms-2">{ t('$vuetify.command.goBack') }</span>
          </div>
        )}

        { /* Always show the close instruction */ }
        <div class="d-flex align-center">
          <VHotkey keys="escape" />
          <span class="ms-2">{ t('$vuetify.command.close') }</span>
        </div>
      </div>
    ))
  },
})

export type VCommandPaletteInstructions = InstanceType<typeof VCommandPaletteInstructions>
