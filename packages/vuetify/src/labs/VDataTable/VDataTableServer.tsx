// Components
import { makeVDataTableFooterProps, VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'
import { VTable } from '@/components/VTable'

// Composables
import { createGroupBy, provideGroupBy, useGroupedItems } from './composables/group'
import { createHeaders } from './composables/headers'
import { createPagination, makeDataTablePaginateProps, providePagination } from './composables/paginate'
import { createSort, provideSort } from './composables/sort'
import { makeDataTableProps } from './VDataTable'
import { provideDefaults } from '@/composables/defaults'
import { provideExpanded } from './composables/expand'
import { provideSelection } from './composables/select'
import { useDataTableItems } from './composables/items'
import { useOptions } from './composables/options'

// Utilities
import { computed, provide, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { DataTableItem } from './types'
import type { VDataTableSlots } from './VDataTable'

export const makeVDataTableServerProps = propsFactory({
  itemsLength: {
    type: [Number, String],
    required: true,
  },

  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeVDataTableFooterProps(),
}, 'v-data-table-server')

export const VDataTableServer = genericComponent<VDataTableSlots>()({
  name: 'VDataTableServer',

  props: makeVDataTableServerProps(),

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (page: number) => true,
    'update:itemsPerPage': (page: number) => true,
    'update:sortBy': (sortBy: any) => true,
    'update:options': (options: any) => true,
    'update:expanded': (options: any) => true,
    'update:groupBy': (value: any) => true,
    'click:row': (e: Event, value: { item: DataTableItem }) => true,
  },

  setup (props, { emit, slots }) {
    const { groupBy } = createGroupBy(props)
    const { sortBy, multiSort, mustSort } = createSort(props)
    const { page, itemsPerPage } = createPagination(props)
    const itemsLength = computed(() => parseInt(props.itemsLength, 10))

    provideExpanded(props)

    const { columns } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })

    const { items } = useDataTableItems(props, columns)

    const { toggleSort } = provideSort({ sortBy, multiSort, mustSort, page })

    const { opened } = provideGroupBy({ groupBy, sortBy })

    providePagination({ page, itemsPerPage, itemsLength })

    const { flatItems } = useGroupedItems(items, groupBy, opened)

    provideSelection(props, items)

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search: toRef(props, 'search'),
    })

    provide('v-data-table', {
      toggleSort,
      sortBy,
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
                <thead class="v-data-table__thead" role="rowgroup">
                  <VDataTableHeaders
                    { ...dataTableHeadersProps }
                    sticky={ props.fixedHeader }
                    v-slots={ slots }
                  />
                </thead>
                { slots.thead?.() }
                <tbody class="v-data-table__tbody" role="rowgroup">
                  { slots.body ? slots.body() : (
                    <VDataTableRows
                      { ...dataTableRowsProps }
                      items={ flatItems.value }
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
  },
})

export type VDataTableServer = InstanceType<typeof VDataTableServer>
