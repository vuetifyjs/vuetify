import type { SelectItemKey } from '@/util'
import type { GroupableItem } from './composables/group'

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

export interface DataTableItem<T = any> extends GroupableItem<T> {
  value: any
  columns: {
    [key: string]: any
  }
}
