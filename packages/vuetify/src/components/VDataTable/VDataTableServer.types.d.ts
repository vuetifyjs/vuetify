// Types
import type { Component, DeepReadonly, StyleValue, TransitionProps } from 'vue'
import type { GroupKeyFunction } from '@/components/VDataTable/composables/group.types'
import type { MultiSortProps, SortItem } from '@/components/VDataTable/composables/sort.types'
import type { CellProps, DataTableCompareFunction, DataTableHeader, DataTableItem, RowProps } from '@/components/VDataTable/types.types'
import type { VDataTableSlots } from '@/components/VDataTable/VDataTable.types'
import type { Gridlines, Striped } from '@/components/VTable/VTable.types'
import type { Density } from '@/composables/density.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { FilterMatchArrayMultiple } from '@/composables/filter.types'
import type { IconValue } from '@/composables/icons.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { ItemType, JSXComponent, SelectItemKey, ValueComparator } from '@/util/shared.types'

export interface VDataTableServerProps {
  cellProps?: CellProps<any>
  class?: any
  collapseIcon?: IconValue
  color?: string
  customKeySort?: Record<string, DataTableCompareFunction>
  density?: Density
  disableSort?: boolean
  expanded?: readonly string[]
  expandIcon?: IconValue
  expandOnClick?: boolean
  expandStrategy?: 'multiple' | 'single'
  expandTransition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | null
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
  initialSortOrder?: 'asc' | 'desc'
  items?: any[]
  itemSelectable?: SelectItemKey
  itemsLength: string | number
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

type VDataTableServerDefaultKeys =
  | 'collapseIcon'
  | 'density'
  | 'disableSort'
  | 'expanded'
  | 'expandIcon'
  | 'expandOnClick'
  | 'expandStrategy'
  | 'expandTransition'
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

export declare const VDataTableServer: VuetifyComponent<
  VDataTableServerProps,
  VDataTableServerDefaultKeys,
  {
    'update:modelValue': (value: any[]) => true
    'update:page': (page: number) => true
    'update:itemsPerPage': (page: number) => true
    'update:sortBy': (sortBy: any) => true
    'update:options': (options: any) => true
    'update:expanded': (options: any) => true
    'update:groupBy': (value: any) => true
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
    slots: VDataTableSlots<ItemType<T>>,
  ) => GenericProps<typeof props, typeof slots>
>
export type VDataTableServer = InstanceType<typeof VDataTableServer>

export {}
