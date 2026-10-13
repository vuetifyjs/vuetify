// Types
import type { GroupableItem } from '@/components/VDataTable/composables/group.types'
import type { SelectableItem } from '@/components/VDataTable/composables/select.types'
import type { ItemSlotBase } from '@/components/VDataTable/types'
import type { FilterFunction, InternalItem } from '@/composables/filter.types'
import type { SelectItemKey } from '@/util/shared.types'

export interface DataTableItem<T = any> extends Omit<InternalItem<T>, 'type'>, GroupableItem<T>, SelectableItem {
  key: any
  index: number
  virtualIndex?: number
  columns: {
    [key: string]: any
  }
}

export type CellProps<T> = Record<string, any> | CellPropsFunction<T>

export type CellPropsFunction<T> = (
  data: Pick<ItemKeySlot<T>, 'index' | 'item' | 'internalItem' | 'value' | 'column'>
) => Record<string, any>

export type RowProps<T> = Record<string, any> | RowPropsFunction<T>

export type RowPropsFunction<T> = (
  data: Pick<ItemSlot<T>, 'index' | 'item' | 'internalItem' | 'isExpanded' | 'isSelected'>
) => Record<string, any>

export type DataTableHeader<T = Record<string, any>> = {
  key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {})
  value?: SelectItemKey<T>
  title?: string

  fixed?: boolean | 'start' | 'end'
  align?: 'start' | 'end' | 'center'

  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  nowrap?: boolean
  indent?: number

  headerProps?: Record<string, any>
  cellProps?: HeaderCellProps

  sortable?: boolean
  sort?: DataTableCompareFunction
  sortRaw?: DataTableCompareFunction
  filter?: FilterFunction

  children?: DataTableHeader<T>[]
}

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number | null

export type DataTableLoading =
  | boolean
  | string
  | { side?: DataTableLoadingSide, color?: string }

export type DataTableLoadingSide = 'start' | 'end' | 'both'

export type ItemKeySlot<T> = ItemSlotBase<T> & {
  value: any
  column: InternalDataTableHeader
}

export type ItemSlot<T> = ItemSlotBase<T> & {
  columns: InternalDataTableHeader[]
}

export type HeaderCellProps = Record<string, any> | HeaderCellPropsFunction

export type InternalDataTableHeader = Omit<DataTableHeader, 'key' | 'value' | 'children'> & {
  key: string | null
  value: SelectItemKey | null
  sortable: boolean
  fixedOffset?: number
  fixedEndOffset?: number
  lastFixed?: boolean
  firstFixedEnd?: boolean
  nowrap?: boolean
  colspan?: number
  rowspan?: number
  children?: InternalDataTableHeader[]
}

export type HeaderCellPropsFunction = (
  data: Pick<ItemKeySlot<any>, 'index' | 'item' | 'internalItem' | 'value'>
) => Record<string, any>
