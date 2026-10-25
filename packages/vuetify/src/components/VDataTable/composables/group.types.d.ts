export type GroupKeyFunction = (options: { key: string, value: any, parentKey: string | null }) => string

export interface Group<T = any> {
  type: 'group'
  depth: number
  id: string
  key: string
  value: any
  items: readonly (T | Group<T> | GroupSummary<T>)[]
}

export interface GroupSummary<T = any> {
  type: 'group-summary'
  depth: number
  id: string
  key: string
  value: any
  items: readonly (T | Group<T> | GroupSummary<T>)[]
}

export interface GroupableItem<T = any> {
  type: 'item'
  raw: T
}

export type GroupActions = {
  isGroupOpen: (group: Group) => boolean
  toggleGroup: (group: Group) => void
}

export {}
