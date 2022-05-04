import { computed, onBeforeUnmount, onMounted, provide, ref, toRef, watch } from 'vue'
import { convertToUnit, defineComponent, getCurrentInstance, propsFactory } from '@/util'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'
import './VDataTable.sass'

import type { PropType } from 'vue'
import type { DataTableHeader } from '../types'
import { createExpanded, useGroupBy, useHeaders, useOptions, usePagination, useSelection, useSort, useSortedItems } from '../composables'
import { VDataTableFooter } from './VDataTableFooter'
import { VTable } from '@/components'

export const makeVDataTableProps = propsFactory({
  headers: {
    type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
    required: true,
  },
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  height: [String, Number],
  width: [String, Number],
  fixedHeader: Boolean,
  groupBy: String,
  sortBy: {
    type: Array as PropType<{ key: string, order: string }[]>,
    default: () => ([]),
  },
  showSelect: Boolean,
}, 'v-data-table')

export const VDataTable = defineComponent({
  name: 'VDataTable',

  props: {
    ...makeVDataTableProps(),
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    itemValue: String,
  },

  emits: {
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
  },

  setup (props, { slots }) {
    const { expanded } = createExpanded()

    const { headers, columns } = useHeaders(props)
    const { sortBy, toggleSort } = useSort(props)
    const { sortedItems } = useSortedItems(toRef(props, 'items'), sortBy)
    const { page, itemsPerPage, startIndex, stopIndex, itemsLength, pageCount } = usePagination(props)

    const paginatedItems = computed(() => {
      return itemsPerPage.value > 0 ? sortedItems.value.slice(startIndex.value, stopIndex.value) : sortedItems.value
    })

    const { toggleSelect, selectAll, isSelected, someSelected, allSelected } = useSelection(props, paginatedItems)

    const { items, toggleGroup, opened } = useGroupBy(paginatedItems, toRef(props, 'groupBy'))

    provide('v-data-table', {
      toggleGroup,
      toggleSort,
      sortBy,
      opened,
      toggleSelect,
      isSelected,
      someSelected,
      allSelected,
      selectAll,
    })

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      pageCount,
      startIndex,
      stopIndex,
      itemsLength,
    })

    return () => (
      <VTable
        class="v-data-table"
        height={ props.height }
        fixedHeader={ props.fixedHeader }
      >
        {{
          default: () => (
            <>
              <thead class="v-data-table__thead" role="rowgroup">
                { slots.headers ? slots.headers() : (
                  <VDataTableHeaders
                    headers={ headers.value }
                    sticky={ props.fixedHeader }
                    sortBy={ sortBy.value }
                  />
                ) }
              </thead>
              { slots.thead?.() }
              <tbody class="v-data-table__tbody" role="rowgroup">
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    columns={ columns.value }
                    items={ items.value }
                    v-slots={ slots }
                  />
                ) }
              </tbody>
            </>
          ),
          bottom: () => (
            <VDataTableFooter
              startIndex={ startIndex.value }
              stopIndex={ stopIndex.value }
              itemsLength={ itemsLength.value }
              page={ page.value }
              pageCount={ pageCount.value }
              itemsPerPage={ itemsPerPage.value }
              onUpdate:itemsPerPage={ v => itemsPerPage.value = v }
              onUpdate:page={ v => page.value = v }
            />
          ),
        }}
      </VTable>
    )
  },
})
