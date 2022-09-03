// Styles
import './VDataTable.sass'

// Components
import { VTable } from '@/components'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'
import { VDataTableFooter } from './VDataTableFooter'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { createSort, makeDataTableSortProps, useSortedItems } from './composables/sort'
import { createGroupBy, makeDataTableGroupProps, useGroupedItems } from './composables/group'
import { createPagination, makeDataTablePaginateProps, usePaginatedItems } from './composables/paginate'
import { createSelection, makeDataTableSelectProps } from './composables/select'
import { createExpanded, makeDataTableExpandProps } from './composables/expand'
import { useOptions } from './composables/options'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, propsFactory, useRender } from '@/util'

export const makeVDataTableProps = propsFactory({
  ...makeDataTableItemProps(),
  ...makeDataTableHeaderProps(),
  height: [String, Number],
  width: [String, Number],
  fixedHeader: Boolean,
  fixedFooter: Boolean,
}, 'v-data-table')

export const VDataTable = defineComponent({
  name: 'VDataTable',

  props: {
    ...makeVDataTableProps(),
    ...makeDataTableExpandProps(),
    ...makeDataTableGroupProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeDataTablePaginateProps(),
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

    const { columns } = createHeaders(props, { groupBy, showSelect: toRef(props, 'showSelect') })

    const { items } = useDataTableItems(props, columns)

    const { sortBy } = createSort(props)
    const { sortByWithGroups, opened, extractRows } = createGroupBy(props, groupBy, sortBy)

    const { sortedItems } = useSortedItems(items, sortByWithGroups)
    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)

    const { page, itemsPerPage, startIndex, stopIndex, pageCount } = createPagination(props, flatItems)
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
          top: slots.head,
          default: slots.default ? slots.default() : () => (
            <>
              <thead>
                { slots.headers ? slots.headers() : (
                  <VDataTableHeaders
                    sticky={ props.fixedHeader }
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
