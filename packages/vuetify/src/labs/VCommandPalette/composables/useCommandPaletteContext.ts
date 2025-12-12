// Utilities
import { inject, provide } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { VCommandPaletteItem } from '../types'

export interface VCommandPaletteContextType {
  items: Ref<VCommandPaletteItem[]>
  filteredItems: Ref<VCommandPaletteItem[]>
  selectedIndex: Ref<number>
  search: Ref<string>
  setSelectedIndex: (index: number) => void
}

export const VCommandPaletteContextKey: InjectionKey<VCommandPaletteContextType> = Symbol.for('vuetify:command-palette-context')

export function provideCommandPaletteContext (context: VCommandPaletteContextType) {
  provide(VCommandPaletteContextKey, context)
  return context
}

export function useCommandPaletteContext (): VCommandPaletteContextType {
  const context = inject(VCommandPaletteContextKey)

  if (!context) {
    throw new Error('useCommandPaletteContext must be used within a VCommandPalette component')
  }

  return context
}
