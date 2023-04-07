import type { InternalItem } from '@/composables/items'
import type { SelectItemKey } from '@/util'

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number

export type DataTableHeader = {
  key: string
  value?: SelectItemKey
  title: string

  colspan?: number
  rowspan?: number

  fixed?: boolean
  align?: 'start' | 'end'

  width?: number
  minWidth?: string
  maxWidth?: string

  sortable?: boolean
  sort?: DataTableCompareFunction
}

export type InternalDataTableHeader = DataTableHeader & {
  sortable: boolean

  fixedOffset?: number
  lastFixed?: boolean
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
