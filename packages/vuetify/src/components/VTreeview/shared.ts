// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { ListItemSlot } from '@/components/VList/VListItem'

export interface TreeViewProvide {
  visibleIds: ComputedRef<Set<unknown> | null>
  hoverable: Ref<boolean>
  hovered: Ref<unknown>
}

export type ToggleListItemSlot = ListItemSlot & {
  props: { onClick: (e: PointerEvent) => void }
}

export const VTreeviewSymbol: InjectionKey<TreeViewProvide> = Symbol.for('vuetify:v-treeview')
