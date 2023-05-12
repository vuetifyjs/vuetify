// Composables
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeItemsProps, useItems } from '@/composables/items'
import { makeTagProps } from '@/composables/tag'
import { createPagination, makeDataTablePaginateProps, usePaginatedItems } from '../VDataTable/composables/paginate'
import { createSelection, makeDataTableSelectProps } from '../VDataTable/composables/select'
import { createSort, makeDataTableSortProps, useSortedItems } from '../VDataTable/composables/sort'
import { createExpanded, makeDataTableExpandProps } from '../VDataTable/composables/expand'
import { useOptions } from '../VDataTable/composables/options'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import type { InternalItem } from '@/composables/items'
import { createGroupBy, makeDataTableGroupProps, useGroupedItems } from '../VDataTable/composables/group'
import { useProxiedModel } from '@/composables/proxiedModel'

export const VDataIterator = defineComponent({
  name: 'VDataIterator',

  props: {
    ...makeTagProps(),
    ...makeItemsProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeDataTablePaginateProps(),
    ...makeDataTableExpandProps(),
    ...makeDataTableGroupProps(),
    ...makeFilterProps(),
    search: String,
    loading: Boolean,
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:groupBy': (value: any) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:expanded': (value: any) => true,
  },

  setup (props, { slots }) {
    const groupBy = useProxiedModel(props, 'groupBy')

    const { items } = useItems(props)

    const { filteredItems } = useFilter<InternalItem>(props, items, toRef(props, 'search'))

    const { sortBy, toggleSort } = createSort(props)
    const { sortByWithGroups, opened, isGroupOpen, toggleGroup } = createGroupBy(props, groupBy, sortBy)
    const { sortedItems } = useSortedItems(props, filteredItems, sortByWithGroups)

    const {
      page,
      itemsPerPage,
      startIndex,
      stopIndex,
      pageCount,
      prevPage,
      nextPage,
      setPage,
      setItemsPerPage,
    } = createPagination(props, sortedItems)
    const { paginatedItems } = usePaginatedItems(sortedItems, startIndex, stopIndex, itemsPerPage)

    const { flatItems } = useGroupedItems(paginatedItems, groupBy, opened)

    const { isSelected, select, selectAll, toggleSelect } = createSelection(props, items)

    const { isExpanded, toggleExpand } = createExpanded(props)

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      pageCount,
      startIndex,
      stopIndex,
      groupBy,
    })

    const slotProps = computed(() => ({
      page,
      itemsPerPage,
      sortBy,
      pageCount,
      startIndex,
      stopIndex,
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
      items: paginatedItems.value,
      groupedItems: flatItems.value,
    }))

    useRender(() => (
      <props.tag class="v-data-iterator">
        { slots.header?.(slotProps.value) }
        { !paginatedItems.value.length
          ? slots['no-data']?.()
          : slots.default
            ? slots.default(slotProps.value)
            : undefined
        }
        { slots.footer?.(slotProps.value) }
      </props.tag>
    ))

    return {}
  },
})

export type VDataIterator = InstanceType<typeof VDataIterator>
