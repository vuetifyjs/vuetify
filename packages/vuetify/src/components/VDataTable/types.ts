// Types
import type { provideExpanded } from './composables/expand'
import type { Group, GroupSummary, provideGroupBy } from './composables/group'
import type { provideSelection } from './composables/select'
import type {
  CellProps,
  CellPropsFunction,
  DataTableCompareFunction,
  DataTableHeader,
  DataTableItem,
  DataTableLoading,
  DataTableLoadingSide,
  HeaderCellProps,
  HeaderCellPropsFunction,
  InternalDataTableHeader,
  ItemKeySlot,
  ItemSlot,
  RowProps,
  RowPropsFunction,
} from './types.types'

export type {
  CellProps,
  CellPropsFunction,
  DataTableCompareFunction,
  DataTableHeader,
  DataTableItem,
  DataTableLoading,
  DataTableLoadingSide,
  HeaderCellProps,
  HeaderCellPropsFunction,
  InternalDataTableHeader,
  ItemKeySlot,
  ItemSlot,
  RowProps,
  RowPropsFunction,
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

export type GroupSummarySlot = {
  index: number
  item: GroupSummary
  columns: InternalDataTableHeader[]
  toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup']
}

export type ItemSlotBase<T> = {
  index: number
  item: T
  internalItem: DataTableItem<T>
  isExpanded: ReturnType<typeof provideExpanded>['isExpanded']
  toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand']
  isSelected: ReturnType<typeof provideSelection>['isSelected']
  toggleSelect: ReturnType<typeof provideSelection>['toggleSelect']
}
