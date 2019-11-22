import { compareFn } from '@components/VData/types'

export type FilterFn = (value: any, search: string | null, item: any) => boolean

export interface TableHeader {
  text: string
  value: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  filterable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  filter?: (value: any, search: string | null, item: any) => boolean
  sort?: compareFn
}
