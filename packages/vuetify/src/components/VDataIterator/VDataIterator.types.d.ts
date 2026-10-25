// Types
import type { IgnoreAccents } from '@vuetify/v0'
import type { Component, StyleValue, TransitionProps } from 'vue'
import type { DataIteratorItem } from '@/components/VDataIterator/composables/items.types'
import type { ExpandActions } from '@/components/VDataTable/composables/expand.types'
import type { Group, GroupActions, GroupKeyFunction, GroupSummary } from '@/components/VDataTable/composables/group.types'
import type { SelectionActions } from '@/components/VDataTable/composables/select.types'
import type { MultiSortProps, SortActions, SortItem } from '@/components/VDataTable/composables/sort.types'
import type { DataTableCompareFunction } from '@/components/VDataTable/types.types'
import type { FilterFunction, FilterKeyFunctions, FilterKeys, FilterMode } from '@/composables/filter.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, SelectItemKey, ValueComparator } from '@/util/shared.types'

export type VDataIteratorSlotProps<T> = {
  page: number
  itemsPerPage: number
  sortBy: readonly SortItem[]
  pageCount: number
  toggleSort: SortActions['toggleSort']
  prevPage: () => void
  nextPage: () => void
  setPage: (value: number) => void
  setItemsPerPage: (value: number) => void
  isSelected: SelectionActions['isSelected']
  select: SelectionActions['select']
  selectAll: SelectionActions['selectAll']
  toggleSelect: SelectionActions['toggleSelect']
  isExpanded: ExpandActions['isExpanded']
  toggleExpand: ExpandActions['toggleExpand']
  isGroupOpen: GroupActions['isGroupOpen']
  toggleGroup: GroupActions['toggleGroup']
  items: readonly DataIteratorItem<T>[]
  itemsCount: number
  groupedItems: readonly (DataIteratorItem<T> | Group<DataIteratorItem<T>> | GroupSummary<DataIteratorItem<T>>)[]
}

export type VDataIteratorSlots<T> = {
  default: VDataIteratorSlotProps<T>
  header: VDataIteratorSlotProps<T>
  footer: VDataIteratorSlotProps<T>
  loader: LoaderSlotProps
  'no-data': never
}

export interface VDataIteratorProps {
  class?: any
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  customKeySort?: Record<string, DataTableCompareFunction>
  expanded?: readonly string[]
  expandOnClick?: boolean
  expandStrategy?: 'multiple' | 'single'
  filterKeys?: FilterKeys
  filterMode?: FilterMode
  groupBy?: readonly SortItem[]
  groupKey?: GroupKeyFunction
  ignoreAccents?: IgnoreAccents
  initialSortOrder?: 'asc' | 'desc'
  items?: any[]
  itemSelectable?: SelectItemKey
  itemsLength?: string | number
  itemsPerPage?: string | number
  itemValue?: SelectItemKey
  loading?: boolean
  modelValue?: readonly any[]
  multiSort?: boolean | MultiSortProps
  mustSort?: boolean
  noFilter?: boolean
  openAll?: boolean
  opened?: readonly string[]
  page?: string | number
  pageBy?: 'item' | 'auto' | 'any'
  returnObject?: boolean
  search?: string
  selectStrategy?: 'single' | 'page' | 'filtered' | 'all'
  showExpand?: boolean
  showSelect?: boolean
  sortBy?: readonly SortItem[]
  style?: StyleValue
  tag?: string | JSXComponent
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | { component: Component, hideOnLeave: boolean } | null
  valueComparator?: ValueComparator
}

type VDataIteratorDefaultKeys =
  | 'expanded'
  | 'expandOnClick'
  | 'expandStrategy'
  | 'filterMode'
  | 'groupBy'
  | 'initialSortOrder'
  | 'items'
  | 'itemSelectable'
  | 'itemsPerPage'
  | 'itemValue'
  | 'loading'
  | 'modelValue'
  | 'multiSort'
  | 'mustSort'
  | 'noFilter'
  | 'openAll'
  | 'opened'
  | 'page'
  | 'pageBy'
  | 'returnObject'
  | 'selectStrategy'
  | 'showExpand'
  | 'showSelect'
  | 'sortBy'
  | 'style'
  | 'tag'
  | 'transition'

export declare const VDataIterator: VuetifyComponent<
  VDataIteratorProps,
  VDataIteratorDefaultKeys,
  {
    'update:modelValue': (value: any[]) => true
    'update:groupBy': (value: any) => true
    'update:page': (value: number) => true
    'update:itemsPerPage': (value: number) => true
    'update:sortBy': (value: any) => true
    'update:options': (value: any) => true
    'update:expanded': (value: any) => true
    'update:opened': (value: string[]) => true
    'update:currentItems': (value: any) => true
  },
  new <T> (
    props: {
      items?: readonly T[]
    },
    slots: VDataIteratorSlots<T>,
  ) => GenericProps<typeof props, typeof slots>
>
export type VDataIterator = InstanceType<typeof VDataIterator>

export {}
