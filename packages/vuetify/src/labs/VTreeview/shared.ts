// Types
import { ListItemSlot } from '@/components/VList/VListItem'
import type { ComputedRef, InjectionKey } from 'vue'

export interface TreeViewProvide {
  visibleIds: ComputedRef<Set<unknown> | null>
}

export type ToggleListItemSlot = ListItemSlot & {
  props: { onClick: (e: PointerEvent) => void }
}

export const VTreeviewSymbol: InjectionKey<TreeViewProvide> = Symbol.for('vuetify:v-treeview')
