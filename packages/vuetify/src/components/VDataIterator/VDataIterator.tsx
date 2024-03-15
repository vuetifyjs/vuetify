// Components
import { makeDataTableExpandProps, provideExpanded } from '@/components/VDataTable/composables/expand'
import { makeDataTableGroupProps, provideGroupBy, useGroupedItems } from '@/components/VDataTable/composables/group'
import { useOptions } from '@/components/VDataTable/composables/options'
import {
  createPagination,
  makeDataTablePaginateProps,
  providePagination,
  usePaginatedItems,
} from '@/components/VDataTable/composables/paginate'
import { makeDataTableSelectProps, provideSelection } from '@/components/VDataTable/composables/select'
import { createSort, makeDataTableSortProps, provideSort, useSortedItems } from '@/components/VDataTable/composables/sort'

// Composables
import { makeDataIteratorItemsProps, useDataIteratorItems } from './composables/items'
import { makeComponentProps } from '@/composables/component'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { DataIteratorItem } from './composables/items'
import type { Group } from '@/components/VDataTable/composables/group'
import type { SortItem } from '@/components/VDataTable/composables/sort'
import type { GenericProps } from '@/util'

type VDataIteratorSlotProps<T> = {
  page: number
  itemsPerPage: number
  sortBy: readonly SortItem[]
  pageCount: number
  toggleSort: ReturnType<typeof provideSort>['toggleSort']
  prevPage: ReturnType<typeof providePagination>['prevPage']
  nextPage: ReturnType<typeof providePagination>['nextPage']
  setPage: ReturnType<typeof providePagination>['setPage']
  setItemsPerPage: ReturnType<typeof providePagination>['setItemsPerPage']
  isSelected: ReturnType<typeof provideSelection>['isSelected']
  select: ReturnType<typeof provideSelection>['select']
  selectAll: ReturnType<typeof provideSelection>['selectAll']
  toggleSelect: ReturnType<typeof provideSelection>['toggleSelect']
  isExpanded: ReturnType<typeof provideExpanded>['isExpanded']
  toggleExpand: ReturnType<typeof provideExpanded>['toggleExpand']
  isGroupOpen: ReturnType<typeof provideGroupBy>['isGroupOpen']
  toggleGroup: ReturnType<typeof provideGroupBy>['toggleGroup']
  items: readonly DataIteratorItem<T>[]
  groupedItems: readonly (DataIteratorItem<T> | Group<DataIteratorItem<T>>)[]
}

export type VDataIteratorSlots<T> = {
  default: VDataIteratorSlotProps<T>
  header: VDataIteratorSlotProps<T>
  footer: VDataIteratorSlotProps<T>
  'no-data': never
}

export const makeVDataIteratorProps = propsFactory({
  search: String,
  loading: Boolean,

  ...makeComponentProps(),
  ...makeDataIteratorItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeDataTablePaginateProps({ itemsPerPage: 5 }),
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeFilterProps(),
  ...makeTagProps(),
}, 'VDataIterator')

export const VDataIterator = genericComponent<new <T> (
  props: {
    items?: readonly T[]
  },
  slots: VDataIteratorSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDataIterator',

  props: makeVDataIteratorProps(),

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:groupBy': (value: any) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:expanded': (value: any) => true,
    'update:currentItems': (value: any) => true,
  },

  setup (props, { slots }) {
    const groupBy = useProxiedModel(props, 'groupBy')
    const search = toRef(props, 'search')

    const { items } = useDataIteratorItems(props)
    const { filteredItems } = useFilter(props, items, search, { transform: item => item.raw })

    const { sortBy, multiSort, mustSort } = createSort(props)
    const { page, itemsPerPage } = createPagination(props)

    const { toggleSort } = provideSort({ sortBy, multiSort, mustSort, page })
    const { sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup } = provideGroupBy({ groupBy, sortBy })

    const { sortedItems } = useSortedItems(props, filteredItems, sortByWithGroups)
    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)

    const itemsLength = computed(() => flatItems.value.length)

    const {
      startIndex,
      stopIndex,
      pageCount,
      prevPage,
      nextPage,
      setItemsPerPage,
      setPage,
    } = providePagination({ page, itemsPerPage, itemsLength })
    const { paginatedItems } = usePaginatedItems({ items: flatItems, startIndex, stopIndex, itemsPerPage })

    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value))

    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
    } = provideSelection(props, { allItems: items, currentPage: paginatedItemsWithoutGroups })
    const { isExpanded, toggleExpand } = provideExpanded(props)

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search,
    })

    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      prevPage,
      nextPage,
      setPage,
      setItemsPerPage,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
    }))

    useRender(() => (
      <props.tag
        class={[
          'v-data-iterator',
          props.class,
        ]}
        style={ props.style }
      >
        { slots.header?.(slotProps.value) }

        { !paginatedItems.value.length
          ? slots['no-data']?.()
          : slots.default?.(slotProps.value)
        }

        { slots.footer?.(slotProps.value) }
      </props.tag>
    ))

    return {}
  },
})

export type VDataIterator = InstanceType<typeof VDataIterator>
