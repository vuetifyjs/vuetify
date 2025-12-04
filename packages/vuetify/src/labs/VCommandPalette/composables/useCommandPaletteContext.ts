/**
 * useCommandPaletteContext Composable
 *
 * Provides a context system for the command palette that enables
 * future custom layout support via Vue's provide/inject pattern.
 * Currently used internally for the default list layout.
 */

// Utilities
import { inject, provide } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { VCommandPaletteItem } from '../types'

/**
 * Context interface for the command palette
 * Exposes state and methods for layouts and custom components
 */
export interface VCommandPaletteContextType {
  items: Ref<VCommandPaletteItem[]>
  filteredItems: Ref<VCommandPaletteItem[]>
  selectedIndex: Ref<number>
  search: Ref<string>
  setSelectedIndex: (index: number) => void
}

/**
 * Injection key for command palette context
 */
export const VCommandPaletteContextKey: InjectionKey<VCommandPaletteContextType> = Symbol.for('vuetify:command-palette-context')

/**
 * Provides command palette context to child components
 */
export function provideCommandPaletteContext (context: VCommandPaletteContextType) {
  provide(VCommandPaletteContextKey, context)
  return context
}

/**
 * Inject command palette context (for future use with custom layouts)
 * @throws Error if not used within a VCommandPalette component
 */
export function useCommandPaletteContext (): VCommandPaletteContextType {
  const context = inject(VCommandPaletteContextKey)

  if (!context) {
    throw new Error('useCommandPaletteContext must be used within a VCommandPalette component')
  }

  return context
}
