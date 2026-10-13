export type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }

export type MultiSortProps = {
  key?: 'ctrl'
  mode?: MultiSortMode
  modifier?: 'alt' | 'shift'
}

export type MultiSortMode = 'append' | 'prepend'
