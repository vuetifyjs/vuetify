import type { InternalItem } from '@/composables/items'
import type { SelectItemKey } from '@/util'

export type DataTableHeader = {
  id: string
  value?: SelectItemKey
  title: string
  colspan?: number
  rowspan?: number
  width?: number
  minWidth?: string
  maxWidth?: string
  fixed?: boolean
  sortable?: boolean
}

export type Column = DataTableHeader & {
  style: any
}

export type DataTableItem = InternalItem & { type: 'item', columns: Record<string, unknown> }

export type GroupHeaderItem = {
  type: 'group-header'
  id: string
  key: string
  value: string
  depth: number
  items: (GroupHeaderItem | DataTableItem)[]
}

export type InternalDataTableItem = DataTableItem | GroupHeaderItem
