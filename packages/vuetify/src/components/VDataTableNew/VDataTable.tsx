// Styles
import './VDataTable.sass'

// Components
import { VTable } from '@/components'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'
import { VDataTableFooter } from './VDataTableFooter'

// Composables
import { makeItemsProps } from '@/composables/items'
import {
  createExpanded,
  useDataTableItems,
  useGroupBy,
  useHeaders,
  useOptions,
  usePaginatedItems,
  usePagination,
  useSelection,
  useSort,
  useSortedItems,
} from './composables'

// Utilities
import { provide, toRef } from 'vue'
import { defineComponent, propsFactory, useRender } from '@/util'

// Typse
import type { PropType } from 'vue'
import type { DataTableHeader } from './types'
import type { SortItem } from './composables'

// const { itemChildren, ...itemProps } = makeItemsProps()

export const makeVDataTableProps = propsFactory({
  headers: {
    type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
    required: true,
  },
  ...makeItemsProps({
    itemValue: 'id',
  }), // TODO: Remove itemChildren, itemTitle since they are not used in data table
  height: [String, Number],
  width: [String, Number],
  fixedHeader: Boolean,
  groupBy: String,
  sortBy: {
    type: Array as PropType<SortItem[]>,
    default: () => ([]),
  },
  showSelect: Boolean,
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => ([]),
  },
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
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
  },

  setup (props, { slots }) {
    const { headers, columns } = useHeaders(props)

    const { items } = useDataTableItems(props, columns)

    const { sortBy, toggleSort } = useSort(props)
    const { sortedItems } = useSortedItems(items, sortBy)

    const { page, itemsPerPage, startIndex, stopIndex, itemsLength, pageCount } = usePagination(props)
    const { paginatedItems } = usePaginatedItems(sortedItems, startIndex, stopIndex, itemsPerPage)

    const { flatItems, toggleGroup, opened } = useGroupBy(paginatedItems, toRef(props, 'groupBy'))

    const { toggleSelect, selectAll, isSelected, someSelected, allSelected } = useSelection(props, paginatedItems)

    const { expanded } = createExpanded()

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

    useRender(() => (
      <VTable
        class="v-data-table"
        height={ props.height }
        fixedHeader={ props.fixedHeader }
      >
        {{
          default: slots.default ? slots.default() : () => (
            <>
              <thead class="v-data-table__thead">
                { slots.headers ? slots.headers() : (
                  <VDataTableHeaders
                    columns={ columns.value }
                    headers={ headers.value }
                    sticky={ props.fixedHeader }
                    sortBy={ sortBy.value }
                  />
                ) }
              </thead>
              { slots.thead?.() }
              <tbody class="v-data-table__tbody">
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    columns={ columns.value }
                    items={ flatItems.value }
                    v-slots={ slots }
                  />
                ) }
              </tbody>
              { slots.tbody?.() }
              { slots.tfoot?.() }
            </>
          ),
          bottom: slots.footer ? slots.footer() : () => (
            <VDataTableFooter
              startIndex={ startIndex.value }
              stopIndex={ stopIndex.value }
              itemsLength={ itemsLength.value }
              page={ page.value }
              pageCount={ pageCount.value }
              itemsPerPage={ itemsPerPage.value }
              onUpdate:itemsPerPage={ v => itemsPerPage.value = v }
              onUpdate:page={ v => page.value = v }
              v-slots={{
                prepend: slots['footer.prepend'],
              }}
            />
          ),
        }}
      </VTable>
    ))

    return {}
  },
})
