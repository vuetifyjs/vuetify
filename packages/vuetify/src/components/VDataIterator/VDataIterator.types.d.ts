// Types
import type { IgnoreAccents } from '@vuetify/v0'
import type { Component, StyleValue, TransitionProps } from 'vue'
import type { VDataIteratorSlotProps } from '@/components/VDataIterator/VDataIterator'
import type { GroupKeyFunction } from '@/components/VDataTable/composables/group.types'
import type { MultiSortProps, SortItem } from '@/components/VDataTable/composables/sort.types'
import type { DataTableCompareFunction } from '@/components/VDataTable/types.types'
import type { FilterFunction, FilterKeyFunctions, FilterKeys, FilterMode } from '@/composables/filter.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent, SelectItemKey, ValueComparator } from '@/util/shared.types'

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
  selectStrategy?: 'single' | 'page' | 'all'
  showExpand?: boolean
  showSelect?: boolean
  sortBy?: readonly SortItem[]
  style?: StyleValue
  tag?: string | JSXComponent
  transition?: string | boolean | (TransitionProps & { component?: Component | undefined }) | { component: Component, hideOnLeave: boolean } | null
  valueComparator?: ValueComparator
}

export type VDataIteratorDefaultKeys =
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
