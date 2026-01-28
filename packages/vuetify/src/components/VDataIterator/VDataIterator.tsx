// Components
import { VFadeTransition } from '@/components/transitions'
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
import { LoaderSlot } from '@/composables/loader'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTagProps } from '@/composables/tag'
import { useToggleScope } from '@/composables/toggleScope'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, shallowRef, toRef, watchEffect } from 'vue'
import { genericComponent, isEmpty, propsFactory, renderSlot, useRender } from '@/util'

// Types
import type { Component } from 'vue'
import type { DataIteratorItem } from './composables/items'
import type { Group, GroupSummary } from '@/components/VDataTable/composables/group'
import type { SortItem } from '@/components/VDataTable/composables/sort'
import type { LoaderSlotProps } from '@/composables/loader'
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

export const makeVDataIteratorProps = propsFactory({
  search: String,
  loading: Boolean,
  itemsLength: [Number, String],

  ...makeComponentProps(),
  ...makeDataIteratorItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeDataTablePaginateProps({ itemsPerPage: 5 }),
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeFilterProps(),
  ...makeTagProps(),
  ...makeTransitionProps({
    transition: {
      component: VFadeTransition as Component,
      hideOnLeave: true,
    },
  }),
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
    const search = toRef(() => props.search)

    const { items } = useDataIteratorItems(props)
    const { filteredItems } = useFilter(props, items, search, { transform: item => item.raw })

    const { initialSortOrder, sortBy, multiSort, mustSort } = createSort(props)
    const { page, itemsPerPage } = createPagination(props)

    const { toggleSort } = provideSort({ initialSortOrder, sortBy, multiSort, mustSort, page })
    const { sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup } = provideGroupBy({ groupBy, sortBy })

    const { sortedItems } = useSortedItems(props, filteredItems, sortByWithGroups, { transform: item => item.raw })
    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened, false)

    const manualPagination = toRef(() => !isEmpty(props.itemsLength))
    const itemsLength = toRef(() => manualPagination.value ? Number(props.itemsLength) : flatItems.value.length)

    const {
      startIndex,
      stopIndex,
      pageCount,
      prevPage,
      nextPage,
      setItemsPerPage,
      setPage,
    } = providePagination({ page, itemsPerPage, itemsLength })

    const paginatedItems = shallowRef<typeof flatItems.value>([])
    const currentItems = computed(() => manualPagination.value ? flatItems.value : paginatedItems.value)

    useToggleScope(() => !manualPagination.value, () => {
      const { paginatedItems: items } = usePaginatedItems({ items: flatItems, startIndex, stopIndex, itemsPerPage })

      watchEffect(() => {
        paginatedItems.value = items.value
      })
    })

    const currentItemsWithoutGroups = computed(() => extractRows(currentItems.value))

    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
    } = provideSelection(props, { allItems: items, currentPage: currentItemsWithoutGroups })
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
      items: currentItemsWithoutGroups.value,
      itemsCount: filteredItems.value.length,
      groupedItems: currentItems.value,
    }))

    useRender(() => (
      <props.tag
        class={[
          'v-data-iterator',
          {
            'v-data-iterator--loading': props.loading,
          },
          props.class,
        ]}
        style={ props.style }
      >
        { renderSlot(slots, 'header', slotProps.value) }

        <MaybeTransition transition={ props.transition }>
          { props.loading ? (
            <LoaderSlot key="loader" name="v-data-iterator" active>
              { slotProps => renderSlot(slots, 'loader', slotProps) }
            </LoaderSlot>
          ) : (
            <div key="items">
              { !currentItems.value.length
                ? renderSlot(slots, 'no-data')
                : renderSlot(slots, 'default', slotProps.value)
              }
            </div>
          )}
        </MaybeTransition>

        { renderSlot(slots, 'footer', slotProps.value) }
      </props.tag>
    ))

    return {}
  },
})

export type VDataIterator = InstanceType<typeof VDataIterator>
