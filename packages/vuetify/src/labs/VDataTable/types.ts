// Types
import type { GroupableItem } from './composables/group'
import type { SelectableItem } from './composables/select'
import type { SelectItemKey } from '@/util'

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number

export type DataTableHeader = {
  key: string
  value?: SelectItemKey
  title: string

  colspan?: number
  rowspan?: number

  fixed?: boolean
  align?: 'start' | 'end' | 'center'

  width?: number | string
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

export interface DataTableItem<T = any> extends GroupableItem<T>, SelectableItem {
  index: number
  columns: {
    [key: string]: any
  }
}
