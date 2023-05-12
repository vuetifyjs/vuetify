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

export type DataTableItem<T = any> = {
  type: 'item'
  value: any
  columns: {
    [key: string]: any
  }
  raw: T
}

export type GroupHeaderItem<T extends DataTableItem> = {
  type: 'group-header'
  id: string
  key: string
  value: string
  depth: number
  items: (GroupHeaderItem<T> | T)[]
}
