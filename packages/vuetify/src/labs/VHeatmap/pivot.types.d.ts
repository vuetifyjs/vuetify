export interface PivotCell<T = Record<string, any>> {
  value: any
  raw: T
  row: any
  column: any
  groupKey: string
}

export interface PivotGroup<C> {
  key: string
  label: string
  columns: PivotColumn<C>[]
  items: C[]
}

export interface PivotColumn<C> {
  key: string
  cells: (C | null)[]
  items: C[]
}

export {}
