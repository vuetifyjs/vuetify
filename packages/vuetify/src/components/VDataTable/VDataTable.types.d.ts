// Types
import type { IgnoreAccents } from '@vuetify/v0'
import type { Component, DeepReadonly, StyleValue, TransitionProps } from 'vue'
import type { ExpandActions } from '@/components/VDataTable/composables/expand.types'
import type { Group, GroupActions, GroupKeyFunction, GroupSummary } from '@/components/VDataTable/composables/group.types'
import type { SelectionActions } from '@/components/VDataTable/composables/select.types'
import type { MultiSortProps, SortActions, SortItem } from '@/components/VDataTable/composables/sort.types'
import type { CellProps, DataTableCompareFunction, DataTableHeader, DataTableItem, InternalDataTableHeader, RowProps } from '@/components/VDataTable/types.types'
import type { VDataTableHeadersSlots } from '@/components/VDataTable/VDataTableHeaders.types'
import type { VDataTableRowsSlots } from '@/components/VDataTable/VDataTableRows.types'
import type { Gridlines, Striped } from '@/components/VTable/VTable.types'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { FilterFunction, FilterKeyFunctions, FilterKeys, FilterMatchArrayMultiple, FilterMode } from '@/composables/filter.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, SelectItemKey, ValueComparator } from '@/util/shared.types'

export type VDataTableSlotProps<T> = {
  page: number
  itemsPerPage: number
  itemsLength: number
  sortBy: readonly SortItem[]
  pageCount: number
  toggleSort: SortActions['toggleSort']
  setItemsPerPage: (value: number) => void
  prevPage: () => void
  nextPage: () => void
  setPage: (value: number) => void
  someSelected: boolean
  allSelected: boolean
  isSelected: SelectionActions['isSelected']
  select: SelectionActions['select']
  selectAll: SelectionActions['selectAll']
  toggleSelect: SelectionActions['toggleSelect']
  isExpanded: ExpandActions['isExpanded']
  toggleExpand: ExpandActions['toggleExpand']
  isGroupOpen: GroupActions['isGroupOpen']
  toggleGroup: GroupActions['toggleGroup']
  items: readonly T[]
  internalItems: readonly DataTableItem[]
  groupedItems: readonly (DataTableItem<T> | Group<DataTableItem<T>> | GroupSummary<DataTableItem<T>>)[]
  columns: InternalDataTableHeader[]
  headers: InternalDataTableHeader[][]
}

export type ItemType<T> = T extends readonly (infer U)[] ? U : never

export type VDataTableSlots<T> = VDataTableRowsSlots<T> & VDataTableHeadersSlots & {
  default: VDataTableSlotProps<T>
  caption: never
  colgroup: VDataTableSlotProps<T>
  top: VDataTableSlotProps<T>
  body: VDataTableSlotProps<T>
  tbody: VDataTableSlotProps<T>
  thead: VDataTableSlotProps<T>
  tfoot: VDataTableSlotProps<T>
  bottom: VDataTableSlotProps<T>
  'body.prepend': VDataTableSlotProps<T>
  'body.append': VDataTableSlotProps<T>
  'footer.prepend': never
}

export interface VDataTableProps {
  cellProps?: CellProps<any>
  class?: any
  collapseIcon?: IconValue
  color?: string
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  customKeySort?: Record<string, DataTableCompareFunction>
  density?: Density
  disableSort?: boolean
  expanded?: readonly string[]
  expandIcon?: IconValue
  expandOnClick?: boolean
  expandStrategy?: 'multiple' | 'single'
  expandTransition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
  filterKeys?: FilterKeys
  filterMode?: FilterMode
  firstIcon?: IconValue
  firstPageLabel?: string
  fixedFooter?: boolean
  fixedHeader?: boolean
  getMatches?: ((item: DataTableItem<any>) => Record<string, FilterMatchArrayMultiple | undefined> | undefined)
  gridlines?: boolean | Gridlines
  groupBy?: readonly SortItem[]
  groupCollapseIcon?: IconValue
  groupExpandIcon?: IconValue
  groupKey?: GroupKeyFunction
  headerProps?: Record<string, any>
  headers?: DeepReadonly<DataTableHeader[]>
  height?: string | number
  hideDefaultBody?: boolean
  hideDefaultFooter?: boolean
  hideDefaultHeader?: boolean
  hideNoData?: boolean
  hover?: boolean
  ignoreAccents?: IgnoreAccents
  initialSortOrder?: 'asc' | 'desc'
  items?: any[]
  itemSelectable?: SelectItemKey
  itemsPerPage?: string | number
  itemsPerPageOptions?: readonly (number | { title: string, value: number })[]
  itemsPerPageText?: string
  itemValue?: SelectItemKey
  lastIcon?: IconValue
  lastPageLabel?: string
  loading?: string | boolean
  loadingText?: string
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  modelValue?: readonly any[]
  multiSort?: boolean | MultiSortProps
  mustSort?: boolean
  nextIcon?: IconValue
  nextPageLabel?: string
  noDataText?: string
  noFilter?: boolean
  openAll?: boolean
  opened?: readonly string[]
  page?: string | number
  pageBy?: 'item' | 'auto' | 'any'
  pageText?: string
  prevIcon?: IconValue
  prevPageLabel?: string
  returnObject?: boolean
  rowProps?: RowProps<any>
  search?: string
  selectAllLabel?: string
  selectStrategy?: 'single' | 'page' | 'filtered' | 'all'
  showCurrentPage?: boolean
  showExpand?: boolean
  showFirstLastPage?: boolean | 'only-first'
  showSelect?: boolean
  sortAscIcon?: IconValue
  sortBy?: readonly SortItem[]
  sortDescIcon?: IconValue
  sortIcon?: IconValue
  sticky?: boolean
  striped?: Striped
  style?: StyleValue
  tag?: string | JSXComponent
  theme?: string
  valueComparator?: ValueComparator
  width?: string | number
}

export type VDataTableDefaultKeys =
  | 'collapseIcon'
  | 'density'
  | 'disableSort'
  | 'expanded'
  | 'expandIcon'
  | 'expandOnClick'
  | 'expandStrategy'
  | 'expandTransition'
  | 'filterMode'
  | 'firstIcon'
  | 'firstPageLabel'
  | 'fixedFooter'
  | 'fixedHeader'
  | 'gridlines'
  | 'groupBy'
  | 'groupCollapseIcon'
  | 'groupExpandIcon'
  | 'hideDefaultBody'
  | 'hideDefaultFooter'
  | 'hideDefaultHeader'
  | 'hideNoData'
  | 'hover'
  | 'initialSortOrder'
  | 'items'
  | 'itemSelectable'
  | 'itemsPerPage'
  | 'itemsPerPageOptions'
  | 'itemsPerPageText'
  | 'itemValue'
  | 'lastIcon'
  | 'lastPageLabel'
  | 'loadingText'
  | 'mobile'
  | 'modelValue'
  | 'multiSort'
  | 'mustSort'
  | 'nextIcon'
  | 'nextPageLabel'
  | 'noDataText'
  | 'noFilter'
  | 'openAll'
  | 'opened'
  | 'page'
  | 'pageBy'
  | 'pageText'
  | 'prevIcon'
  | 'prevPageLabel'
  | 'returnObject'
  | 'selectAllLabel'
  | 'selectStrategy'
  | 'showCurrentPage'
  | 'showExpand'
  | 'showFirstLastPage'
  | 'showSelect'
  | 'sortAscIcon'
  | 'sortBy'
  | 'sortDescIcon'
  | 'sticky'
  | 'striped'
  | 'style'
  | 'tag'

export declare const VDataTable: VuetifyComponent<
  VDataTableProps,
  VDataTableDefaultKeys,
  {
    'update:modelValue': (value: any[]) => true
    'update:page': (value: number) => true
    'update:itemsPerPage': (value: number) => true
    'update:sortBy': (value: any) => true
    'update:options': (value: any) => true
    'update:groupBy': (value: any) => true
    'update:expanded': (value: any) => true
    'update:opened': (value: string[]) => true
    'update:currentItems': (value: any) => true
  },
  new <T extends readonly any[], V>(
    props: {
      items?: T
      itemValue?: SelectItemKey<ItemType<T>>
      rowProps?: RowProps<ItemType<T>>
      cellProps?: CellProps<ItemType<T>>
      itemSelectable?: SelectItemKey<ItemType<T>>
      headers?: DeepReadonly<DataTableHeader<ItemType<T>>[]>
      modelValue?: V
      'onUpdate:modelValue'?: (value: V) => void
    },
    slots: VDataTableSlots<ItemType<T>>,
  ) => GenericProps<typeof props, typeof slots>
>
export type VDataTable = InstanceType<typeof VDataTable>
