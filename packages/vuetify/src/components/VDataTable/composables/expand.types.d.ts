// Types
import type { DataTableItem } from '@/components/VDataTable/types.types'

export type ExpandActions = {
  isExpanded: (item: DataTableItem) => boolean
  toggleExpand: (item: DataTableItem) => void
}

export {}
