// Types
import type { ComputedRef, InjectionKey } from 'vue'
import type { ToggleListItemSlot } from './shared.types'

export type { ToggleListItemSlot }

export interface TreeViewProvide {
  visibleIds: ComputedRef<Set<unknown> | null>
}

export const VTreeviewSymbol: InjectionKey<TreeViewProvide> = Symbol.for('vuetify:v-treeview')
