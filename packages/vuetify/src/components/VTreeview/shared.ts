// Types
import type { ComputedRef, InjectionKey } from 'vue'
import type { ListItemSlot } from '@/components/VList/VListItem'

export interface TreeViewProvide {
  visibleIds: ComputedRef<Set<unknown> | null>
}

export type ToggleListItemSlot = ListItemSlot & {
  props: { onClick: (e: PointerEvent) => void }
}

export const VTreeviewSymbol: InjectionKey<TreeViewProvide> = Symbol.for('vuetify:v-treeview')
