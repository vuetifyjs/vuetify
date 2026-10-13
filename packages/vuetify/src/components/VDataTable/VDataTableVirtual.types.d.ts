// Types
import type { IgnoreAccents } from '@vuetify/v0'
import type { Component, DeepReadonly, StyleValue, TransitionProps } from 'vue'
import type { GroupKeyFunction } from '@/components/VDataTable/composables/group.types'
import type { MultiSortProps, SortItem } from '@/components/VDataTable/composables/sort.types'
import type { CellProps, DataTableCompareFunction, DataTableHeader, DataTableItem, RowProps } from '@/components/VDataTable/types.types'
import type { VDataTableSlotProps } from '@/components/VDataTable/VDataTable'
import type { VDataTableHeadersSlots } from '@/components/VDataTable/VDataTableHeaders.types'
import type { VDataTableRowsSlots } from '@/components/VDataTable/VDataTableRows.types'
import type { Gridlines, Striped } from '@/components/VTable/VTable.types'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { FilterFunction, FilterKeyFunctions, FilterKeys, FilterMatchArrayMultiple, FilterMode } from '@/composables/filter.types'
import type { IconValue } from '@/composables/icons.types'
import type { ScrollToPosition } from '@/composables/virtual.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, SelectItemKey, TemplateRef, ValueComparator } from '@/util/shared.types'

export type ItemType<T> = T extends readonly (infer U)[] ? U : never

export type VDataTableVirtualSlots<T> = VDataTableRowsSlots<T> & VDataTableHeadersSlots & {
  caption: never
  colgroup: VDataTableVirtualSlotProps<T>
  top: VDataTableVirtualSlotProps<T>
  headers: VDataTableHeadersSlots['headers']
  tbody: VDataTableVirtualSlotProps<T>
  thead: VDataTableVirtualSlotProps<T>
  tfoot: VDataTableVirtualSlotProps<T>
  bottom: VDataTableVirtualSlotProps<T>
  'body.prepend': VDataTableVirtualSlotProps<T>
  'body.append': VDataTableVirtualSlotProps<T>
  item: {
    itemRef: TemplateRef
  }
}

export type VDataTableVirtualSlotProps<T> = Omit<
  VDataTableSlotProps<T>,
  | 'setItemsPerPage'
  | 'page'
  | 'pageCount'
  | 'itemsPerPage'
  | 'prevPage'
  | 'nextPage'
  | 'setPage'
>

export interface VDataTableVirtualProps {
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
  hideDefaultHeader?: boolean
  hideNoData?: boolean
  hover?: boolean
  ignoreAccents?: IgnoreAccents
  initialSortOrder?: 'asc' | 'desc'
  itemHeight?: string | number
  itemKey?: SelectItemKey
  items?: any[]
  itemSelectable?: SelectItemKey
  itemValue?: SelectItemKey
  loading?: string | boolean
  loadingText?: string
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  modelValue?: readonly any[]
  multiSort?: boolean | MultiSortProps
  mustSort?: boolean
  noDataText?: string
  noFilter?: boolean
  openAll?: boolean
  opened?: readonly string[]
  returnObject?: boolean
  rowProps?: RowProps<any>
  search?: string
  selectAllLabel?: string
  selectStrategy?: 'single' | 'page' | 'all'
  showExpand?: boolean
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

export type VDataTableVirtualDefaultKeys =
  | 'collapseIcon'
  | 'density'
  | 'disableSort'
  | 'expanded'
  | 'expandIcon'
  | 'expandOnClick'
  | 'expandStrategy'
  | 'expandTransition'
  | 'filterMode'
  | 'fixedFooter'
  | 'fixedHeader'
  | 'gridlines'
  | 'groupBy'
  | 'groupCollapseIcon'
  | 'groupExpandIcon'
  | 'hideDefaultBody'
  | 'hideDefaultHeader'
  | 'hideNoData'
  | 'hover'
  | 'initialSortOrder'
  | 'itemHeight'
  | 'itemKey'
  | 'items'
  | 'itemSelectable'
  | 'itemValue'
  | 'loadingText'
  | 'mobile'
  | 'modelValue'
  | 'multiSort'
  | 'mustSort'
  | 'noDataText'
  | 'noFilter'
  | 'openAll'
  | 'opened'
  | 'returnObject'
  | 'selectAllLabel'
  | 'selectStrategy'
  | 'showExpand'
  | 'showSelect'
  | 'sortAscIcon'
  | 'sortBy'
  | 'sortDescIcon'
  | 'sticky'
  | 'striped'
  | 'style'
  | 'tag'

export declare const VDataTableVirtual: VuetifyComponent<
  VDataTableVirtualProps,
  VDataTableVirtualDefaultKeys,
  {
    'update:modelValue': (value: any[]) => true
    'update:sortBy': (value: any) => true
    'update:options': (value: any) => true
    'update:groupBy': (value: any) => true
    'update:expanded': (value: any) => true
    'update:opened': (value: string[]) => true
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
    slots: VDataTableVirtualSlots<ItemType<T>>,
  ) => GenericProps<typeof props, typeof slots>,
  { calculateVisibleItems: () => void, scrollToIndex: (index: number, position?: ScrollToPosition) => void }
>
export type VDataTableVirtual = InstanceType<typeof VDataTableVirtual>
