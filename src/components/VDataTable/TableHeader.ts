export default interface TableHeader {
  text: string
  value: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  resizable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  type?: 'showExpand' | 'showSelect'
  filter?: (value: any, search: string, item: any) => boolean
  sort?: (a: any, b: any) => number
}
