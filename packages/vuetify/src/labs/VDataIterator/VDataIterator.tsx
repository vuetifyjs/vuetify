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

export const VDataIterator = defineComponent({
  name: 'VDataIterator',

  props: {
    ...makeTagProps(),
    ...makeItemsProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeDataTablePaginateProps(),
    ...makeDataTableExpandProps(),
    ...makeFilterProps(),
    search: String,
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:expanded': (value: any) => true,
  },

  setup (props, { slots }) {
    const { items } = useItems(props)

    const { filteredItems } = useFilter<InternalItem>(props, items, toRef(props, 'search'))

    const { sortBy, toggleSort } = createSort(props)
    const { sortedItems } = useSortedItems(props, filteredItems, sortBy)

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

    const { isSelected, select, selectAll, toggleSelect } = createSelection(props, items)

    const { isExpanded, toggleExpand } = createExpanded(props)

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      pageCount,
      startIndex,
      stopIndex,
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
    }))

    useRender(() => (
      <props.tag class="v-data-iterator">
        { slots.header?.(slotProps.value) }
        { !paginatedItems.value.length
          ? slots['no-data']?.()
          : slots.default
            ? slots.default({ items: paginatedItems.value, ...slotProps.value })
            : undefined
        }
        { slots.footer?.(slotProps.value) }
      </props.tag>
    ))

    return {}
  },
})

export type VDataIterator = InstanceType<typeof VDataIterator>
