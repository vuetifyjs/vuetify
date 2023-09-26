// Types
import type { provideExpanded } from './composables/expand'
import type { Group, GroupableItem, provideGroupBy } from './composables/group'
import type { provideSelection, SelectableItem } from './composables/select'
import type { InternalItem } from '@/composables/filter'
import type { SelectItemKey } from '@/util'

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number

export type DataTableHeader = {
  key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {})
  value?: SelectItemKey
  title: string

  colspan?: number
  rowspan?: number

  fixed?: boolean
  align?: 'start' | 'end' | 'center'

  width?: number | string
  minWidth?: string
  maxWidth?: string

  sortable?: boolean
  sort?: DataTableCompareFunction
}

export type InternalDataTableHeader = Omit<DataTableHeader, 'key' | 'value'> & {
  key: string | null
  value: SelectItemKey | null
  sortable: boolean
  fixedOffset?: number
  lastFixed?: boolean
}

export interface DataTableItem<T = any> extends InternalItem<T>, GroupableItem<T>, SelectableItem {
  key: any
  index: number
  columns: {
    [key: string]: any
  }
}

export type GroupHeaderSlot = {
  index: number
  item: Group
  columns: InternalDataTableHeader[]
  isExpanded: ReturnType<typeof provideExpanded>['isExpanded']
  toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand']
  isSelected: ReturnType<typeof provideSelection>['isSelected']
  toggleSelect: ReturnType<typeof provideSelection>['toggleSelect']
  toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup']
  isGroupOpen: ReturnType<typeof provideGroupBy>['isGroupOpen']
}

type ItemSlotBase<T = any> = {
  index: number
  item: T
  internalItem: DataTableItem<T>
  isExpanded: ReturnType<typeof provideExpanded>['isExpanded']
  toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand']
  isSelected: ReturnType<typeof provideSelection>['isSelected']
  toggleSelect: ReturnType<typeof provideSelection>['toggleSelect']
}

export type ItemSlot<T = any> = ItemSlotBase<T> & {
  columns: InternalDataTableHeader[]
}

export type ItemKeySlot<T = any> = ItemSlotBase<T> & {
  value: any
  column: InternalDataTableHeader
}
