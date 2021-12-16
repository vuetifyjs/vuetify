export type DataTableHeader = {
  id: string
  name: string
  colspan?: number
  rowspan?: number
  width?: number
  minWidth?: string
  maxWidth?: string
  sticky?: boolean
  stickyWidth?: number
}

export type Column = DataTableHeader & {
  style: any
}
