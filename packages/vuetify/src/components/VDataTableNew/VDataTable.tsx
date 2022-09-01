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
  createGroupBy,
  createHeaders,
  createSelection,
  createSort,
  useDataTableItems,
  useGroupedItems,
  useOptions,
  usePaginatedItems,
  usePagination,
  useSortedItems,
} from './composables'

// Utilities
import { computed, provide, toRef } from 'vue'
import { defineComponent, propsFactory, useRender } from '@/util'

// Typse
import type { PropType } from 'vue'
import type { DataTableHeader } from './types'
import type { SortItem } from './composables'
import { useProxiedModel } from '@/composables/proxiedModel'

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
  fixedFooter: Boolean,
  groupBy: {
    type: Array as PropType<SortItem[]>,
    default: () => ([]),
  },
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
    expandOnClick: Boolean,
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:groupBy': (value: any) => true,
  },

  setup (props, { slots }) {
    const groupBy = useProxiedModel(props, 'groupBy')

    const { headers, columns } = createHeaders(props, groupBy)

    const { items } = useDataTableItems(props, columns)

    const { sortBy } = createSort(props)
    const { sortByWithGroups, opened, extractRows } = createGroupBy(props, groupBy, sortBy)

    const { sortedItems } = useSortedItems(items, sortByWithGroups)

    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)

    const { page, itemsPerPage, startIndex, stopIndex, itemsLength, pageCount } = usePagination(props, flatItems)
    const { paginatedItems } = usePaginatedItems(flatItems, startIndex, stopIndex, itemsPerPage)

    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value))

    createSelection(props, paginatedItemsWithoutGroups)

    createExpanded(props)

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
        class={[
          'v-data-table',
          {
            'v-data-table--show-select': props.showSelect,
          },
        ]}
        fixedHeader={ props.fixedHeader }
        fixedFooter={ props.fixedFooter }
        height={ props.height }
      >
        {{
          top: slots.top,
          default: slots.default ? slots.default() : () => (
            <>
              <thead>
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
              <tbody>
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    items={ paginatedItems.value }
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
