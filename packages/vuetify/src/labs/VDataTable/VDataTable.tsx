// Styles
import './VDataTable.sass'

// Components
import { VTable } from '@/components/VTable'
import { VDataTableHeaders } from './VDataTableHeaders'
import type { VDataTableRowsSlots } from './VDataTableRows'
import { VDataTableRows } from './VDataTableRows'
import { VDataTableFooter } from './VDataTableFooter'

// Composables
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { createSort, makeDataTableSortProps, provideSort, useSortedItems } from './composables/sort'
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems } from './composables/group'
import { createPagination, makeDataTablePaginateProps, providePagination, usePaginatedItems } from './composables/paginate'
import { makeDataTableSelectProps, provideSelection } from './composables/select'
import { makeDataTableExpandProps, provideExpanded } from './composables/expand'
import { useOptions } from './composables/options'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'
import { makeFilterProps, useFilter } from '@/composables/filter'

// Types
import type { PropType } from 'vue'
import type { DataTableItem, InternalDataTableHeader } from './types'

export type VDataTableSlots = VDataTableRowsSlots & {
  colgroup: [InternalDataTableHeader]
  default: []
  top: []
  headers: []
  body: []
  tbody: []
  thead: []
  tfoot: []
  bottom: []
  'footer.prepend': []
}

export const makeVDataTableProps = propsFactory({
  ...makeDataTableItemProps(),
  ...makeDataTableHeaderProps(),
  hideNoData: Boolean,
  hover: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  height: [String, Number],
  width: [String, Number],
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: '$vuetify.dataIterator.loadingText',
  },
  'onClick:row': Function as PropType<(e: Event, value: { item: DataTableItem }) => void>,
  search: String,
}, 'v-data-table')

export const VDataTable = genericComponent<VDataTableSlots>()({
  name: 'VDataTable',

  props: {
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
  },

  setup (props, { emit, slots }) {
    const { groupBy } = createGroupBy(props)
    const { sortBy, multiSort, mustSort } = createSort(props)
    const { page, itemsPerPage } = createPagination(props)

    const { columns } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })

    const { items } = useDataTableItems(props, columns)

    const filterKeys = computed(() => columns.value.map(c => 'columns.' + c.key))
    const search = toRef(props, 'search')
    const { filteredItems } = useFilter<DataTableItem>(props, items, search, { filterKeys })

    provideSort({ sortBy, multiSort, mustSort, page })
    const { sortByWithGroups, opened, extractRows } = provideGroupBy({ groupBy, sortBy })

    const { sortedItems } = useSortedItems(filteredItems, sortByWithGroups, columns)
    const { flatItems } = useGroupedItems(sortedItems, groupBy, opened)
    const itemsLength = computed(() => flatItems.value.length)

    const { startIndex, stopIndex } = providePagination({ page, itemsPerPage, itemsLength })
    const { paginatedItems } = usePaginatedItems({ items: flatItems, startIndex, stopIndex, itemsPerPage })

    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value))

    provideSelection(props, paginatedItemsWithoutGroups)

    provideExpanded(props)

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search,
    })

    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(props, 'hideNoData'),
        noDataText: toRef(props, 'noDataText'),
        loading: toRef(props, 'loading'),
        loadingText: toRef(props, 'loadingText'),
      },
    })

    useRender(() => (
      <VTable
        class={[
          'v-data-table',
          {
            'v-data-table--show-select': props.showSelect,
            'v-data-table--loading': props.loading,
          },
        ]}
        fixedHeader={ props.fixedHeader }
        fixedFooter={ props.fixedFooter }
        height={ props.height }
        hover={ props.hover }
      >
        {{
          top: slots.top,
          default: slots.default ?? (() => (
            <>
              { slots.colgroup?.({ columns }) }
              <thead>
                <VDataTableHeaders
                  sticky={ props.fixedHeader }
                  loading={ props.loading }
                  multiSort={ props.multiSort }
                  v-slots={ slots }
                />
              </thead>
              { slots.thead?.() }
              <tbody>
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    items={ paginatedItems.value }
                    onClick:row={ props['onClick:row'] }
                    v-slots={ slots }
                  />
                )}
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
