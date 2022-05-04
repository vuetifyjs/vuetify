export type DataTableHeader = {
  value: string
  title: string
  colspan?: number
  rowspan?: number
  width?: number
  minWidth?: string
  maxWidth?: string
  sticky?: boolean
  stickyWidth?: number
  sortable?: boolean
}

export type Column = DataTableHeader & {
  style: any
}
