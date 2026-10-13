// Types
import type { ListItemSlot } from '@/components/VList/VListItem.types'

export type ToggleListItemSlot = ListItemSlot & {
  props: { onClick: (e: PointerEvent) => void }
}
