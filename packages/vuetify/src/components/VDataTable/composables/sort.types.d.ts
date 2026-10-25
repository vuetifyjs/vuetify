// Types
import type { InternalDataTableHeader } from '@/components/VDataTable/types.types'

export type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }

export type MultiSortProps = {
  key?: 'ctrl'
  mode?: MultiSortMode
  modifier?: 'alt' | 'shift'
}

export type MultiSortMode = 'append' | 'prepend'

export type SortActions = {
  toggleSort: (column: InternalDataTableHeader, event?: KeyboardEvent | PointerEvent, mandatory?: boolean) => void
  isSorted: (column: InternalDataTableHeader) => boolean
}

export {}
