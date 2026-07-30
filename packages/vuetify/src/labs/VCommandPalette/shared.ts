// Utilities
import { inject } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { VCommandPaletteItem } from './types'

export interface CommandPaletteProvide {
  items: Ref<VCommandPaletteItem[]>
  filteredItems: Ref<VCommandPaletteItem[]>
  selectedIndex: Ref<number>
  search: Ref<string>
  setSelectedIndex: (index: number) => void
}

export const VCommandPaletteSymbol: InjectionKey<CommandPaletteProvide> = Symbol.for('vuetify:command-palette')

export function useCommandPalette () {
  const commandPalette = inject(VCommandPaletteSymbol)

  if (!commandPalette) {
    throw new Error('[Vuetify] useCommandPalette must be used within VCommandPalette')
  }

  return commandPalette
}
