// Styles
import './VDataTable.sass'

// Components
import { VTable } from '@/components/VTable'
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
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, propsFactory, useRender } from '@/util'
import { makeFilterProps, useFilter } from '@/composables/filter'

// Types
import type { DataTableItem } from './types'

export const makeVDataTableProps = propsFactory({
  ...makeDataTableItemProps(),
  ...makeDataTableHeaderProps(),
  hideNoData: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  height: [String, Number],
  width: [String, Number],
  fixedHeader: Boolean,
  fixedFooter: Boolean,
}, 'v-data-table')

export const VDataTable = defineComponent({
  name: 'VDataTable',

  props: {
    search: String,

    ...makeVDataTableProps(),
    ...makeDataTableExpandProps(),
    ...makeDataTableGroupProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeDataTablePaginateProps(),
    ...makeFilterProps(),
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
    'update:groupBy': (value: any) => true,
    'update:expanded': (value: any) => true,
    'click:row': (event: Event, value: { item: DataTableItem }) => true,
  },

  setup (props, { emit, slots }) {
    const groupBy = useProxiedModel(props, 'groupBy')

    const { columns } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })

    const { items } = useDataTableItems(props, columns)

    const { filteredItems, getMatches } = useFilter<DataTableItem>(props, items, toRef(props, 'search'))

    const { sortBy } = createSort(props)
    const { sortByWithGroups, opened, extractRows } = createGroupBy(props, groupBy, sortBy)

    const { sortedItems } = useSortedItems(filteredItems, sortByWithGroups, columns)
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

    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(props, 'hideNoData'),
        noDataText: toRef(props, 'noDataText'),
      },
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
          default: slots.default ?? (() => (
            <>
              { slots.colgroup?.({ columns }) }
              <thead>
                { slots.headers ? slots.headers() : (
                  <VDataTableHeaders
                    sticky={ props.fixedHeader }
                    multiSort={ props.multiSort }
                    v-slots={ slots }
                  />
                ) }
              </thead>
              { slots.thead?.() }
              <tbody>
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    items={ paginatedItems.value }
                    getMatches={ getMatches }
                    onClick:row={ (event, value) => emit('click:row', event, value) }
                    v-slots={ slots }
                  />
                ) }
              </tbody>
              { slots.tbody?.() }
              { slots.tfoot?.() }
            </>
          )),
          bottom: slots.bottom ?? (() => (
            <VDataTableFooter
              v-slots={{
                prepend: slots['footer.prepend'],
              }}
            />
          )),
        }}
      </VTable>
    ))

    return {}
  },
})

export type VDataTable = InstanceType<typeof VDataTable>
