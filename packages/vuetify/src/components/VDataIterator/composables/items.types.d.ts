// Types
import type { GroupableItem } from '@/components/VDataTable/composables/group.types'
import type { SelectableItem } from '@/components/VDataTable/composables/select.types'
import type { InternalItem } from '@/composables/filter.types'

export interface DataIteratorItem<T = any> extends Omit<InternalItem<T>, 'type'>, GroupableItem<T>, SelectableItem {
  value: unknown
}
