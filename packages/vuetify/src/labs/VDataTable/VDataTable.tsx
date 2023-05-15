// Styles
import './VDataTable.sass'

// Components
import { makeVDataTableFooterProps, VDataTableFooter } from './VDataTableFooter'
import { makeVDataTableHeadersProps, VDataTableHeaders } from './VDataTableHeaders'
import { makeVDataTableRowsProps, VDataTableRows } from './VDataTableRows'
import { makeVTableProps, VTable } from '@/components/VTable/VTable'

// Composables
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems } from './composables/group'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { createPagination, makeDataTablePaginateProps, providePagination, usePaginatedItems } from './composables/paginate'
import { createSort, makeDataTableSortProps, provideSort, useSortedItems } from './composables/sort'
import { makeDataTableExpandProps, provideExpanded } from './composables/expand'
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
import { makeDataTableSelectProps, provideSelection } from './composables/select'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { provideDefaults } from '@/composables/defaults'
import { useOptions } from './composables/options'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Ref } from 'vue'
import type { DataTableItem, InternalDataTableHeader } from './types'
import type { VDataTableRowsSlots } from './VDataTableRows'

export type VDataTableSlots = VDataTableRowsSlots & {
  colgroup: [{ columns: Ref<InternalDataTableHeader[]> }]
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

export const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),

  width: [String, Number],
  search: String,

  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps(),
}, 'data-table')

export const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps(),
}, 'v-data-table')

export const VDataTable = genericComponent<VDataTableSlots>()({
  name: 'VDataTable',

  props: makeVDataTableProps(),

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

    useRender(() => {
      const [dataTableFooterProps] = VDataTableFooter.filterProps(props)
      const [dataTableHeadersProps] = VDataTableHeaders.filterProps(props)
      const [dataTableRowsProps] = VDataTableRows.filterProps(props)
      const [tableProps] = VTable.filterProps(props)

      return (
        <VTable
          class={[
            'v-data-table',
            {
              'v-data-table--show-select': props.showSelect,
              'v-data-table--loading': props.loading,
            },
            props.class,
          ]}
          style={ props.style }
          { ...tableProps }
        >
          {{
            top: slots.top,
            default: slots.default ?? (() => (
              <>
                { slots.colgroup?.({ columns }) }
                <thead>
                  <VDataTableHeaders
                    { ...dataTableHeadersProps }
                    v-slots={ slots }
                  />
                </thead>
                { slots.thead?.() }
                <tbody>
                  { slots.body ? slots.body() : (
                    <VDataTableRows
                      { ...dataTableRowsProps }
                      items={ paginatedItems.value }
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
                { ...dataTableFooterProps }
                v-slots={{
                  prepend: slots['footer.prepend'],
                }}
              />
            )),
          }}
        </VTable>
      )
    })

    return {}
  },
})

export type VDataTable = InstanceType<typeof VDataTable>
