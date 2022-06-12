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
