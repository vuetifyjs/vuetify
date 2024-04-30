// Types
import type { provideExpanded } from './composables/expand'
import type { provideGroupBy } from './composables/group'
import type { provideSelection } from './composables/select'
import type { FilterFunction, InternalItem } from '@/composables/filter'
import type { deepEqual, EventProp, SelectItemKey } from '@/util'

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number | null

export type DataTableHeader<T = Record<string, any>> = {
  key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {})
  value?: SelectItemKey<T>
  title?: string

  fixed?: boolean
  align?: 'start' | 'end' | 'center'

  width?: number | string
  minWidth?: string
  maxWidth?: string
  nowrap?: boolean

  headerProps?: Record<string, any>
  cellProps?: HeaderCellProps

  sortable?: boolean
  sort?: DataTableCompareFunction
  sortRaw?: DataTableCompareFunction
  filter?: FilterFunction

  mobile?: boolean

  children?: DataTableHeader<T>[]
}

export type InternalDataTableHeader = Omit<DataTableHeader, 'key' | 'value' | 'children'> & {
  key: string | null
  value: SelectItemKey | null
  sortable: boolean
  fixedOffset?: number
  lastFixed?: boolean
  nowrap?: boolean
  colspan?: number
  rowspan?: number
  children?: InternalDataTableHeader[]
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

type ItemSlotBase<T> = {
  index: number
  item: T
  internalItem: DataTableItem<T>
  isExpanded: ReturnType<typeof provideExpanded>['isExpanded']
  toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand']
  isSelected: ReturnType<typeof provideSelection>['isSelected']
  toggleSelect: ReturnType<typeof provideSelection>['toggleSelect']
}

export type ItemSlot<T> = ItemSlotBase<T> & {
  columns: InternalDataTableHeader[]
}

export type ItemKeySlot<T> = ItemSlotBase<T> & {
  value: any
  column: InternalDataTableHeader
}

export type RowProps<T> =
  | Record<string, any>
  | ((data: Pick<ItemKeySlot<T>, 'index' | 'item' | 'internalItem'>) => Record<string, any>)

export type CellProps<T> =
  | Record<string, any>
  | ((data: Pick<ItemKeySlot<T>, 'index' | 'item' | 'internalItem' | 'value' | 'column'>) => Record<string, any>)

export type HeaderCellProps =
  | Record<string, any>
  | ((data: Pick<ItemKeySlot<any>, 'index' | 'item' | 'internalItem' | 'value'>) => Record<string, any>)

export interface GroupableItem<T = any> {
  type: 'item'
  raw: T
}

export interface Group<T = any> {
  type: 'group'
  depth: number
  id: string
  key: string
  value: any
  items: readonly (T | Group<T>)[]
}

export interface DataTableItemProps {
  items: any[]
  itemValue: SelectItemKey
  itemSelectable: SelectItemKey
  returnObject: boolean
}

export type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }

export type SortProps = {
  sortBy: readonly SortItem[]
  'onUpdate:sortBy': ((value: any) => void) | undefined
  mustSort: boolean
  multiSort: boolean
}

export type PaginationProps = {
  page: number | string
  'onUpdate:page': EventProp | undefined
  itemsPerPage: number | string
  'onUpdate:itemsPerPage': EventProp | undefined
  itemsLength?: number | string
}

export interface SelectableItem {
  value: any
  selectable: boolean
}

export interface DataTableSelectStrategy {
  showSelectAll: boolean
  allSelected: (data: {
    allItems: SelectableItem[]
    currentPage: SelectableItem[]
  }) => SelectableItem[]
  select: (data: {
    items: SelectableItem[]
    value: boolean
    selected: Set<unknown>
  }) => Set<unknown>
  selectAll: (data: {
    value: boolean
    allItems: SelectableItem[]
    currentPage: SelectableItem[]
    selected: Set<unknown>
  }) => Set<unknown>
}

export type SelectionProps = Pick<DataTableItemProps, 'itemValue'> & {
  modelValue: readonly any[]
  selectStrategy: 'single' | 'page' | 'all'
  valueComparator: typeof deepEqual
  'onUpdate:modelValue': EventProp<[any[]]> | undefined
}
