// Components
import { VTable } from '@/components/VTable'
import { VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeDataTableExpandProps, provideExpanded } from './composables/expand'
import { createGroupBy, makeDataTableGroupProps, provideGroupBy, useGroupedItems } from './composables/group'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
import { useOptions } from './composables/options'
import { createPagination, makeDataTablePaginateProps, providePagination } from './composables/paginate'
import { makeDataTableSelectProps, provideSelection } from './composables/select'
import { createSort, makeDataTableSortProps, provideSort } from './composables/sort'

// Utilities
import { computed, provide, toRef } from 'vue'
import { genericComponent, useRender } from '@/util'
import { makeVDataTableProps } from './VDataTable'

// Types
import type { DataTableItem } from './types'
import type { VDataTableSlots } from './VDataTable'

export const VDataTableServer = genericComponent<VDataTableSlots>()({
  name: 'VDataTableServer',

  props: {
    color: String,
    loading: [Boolean, String],
    loadingText: {
      type: String,
      default: '$vuetify.dataIterator.loadingText',
    },
    itemsLength: {
      type: [Number, String],
      required: true,
    },

    ...makeVDataTableProps(),
    ...makeDataTableExpandProps(),
    ...makeDataTableHeaderProps(),
    ...makeDataTableItemProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeDataTablePaginateProps(),
    ...makeDataTableGroupProps(),
  },

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

    useRender(() => (
      <VTable
        class={[
          'v-data-table',
          {
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
              <thead class="v-data-table__thead" role="rowgroup">
                { slots.headers ? slots.headers() : (
                  <VDataTableHeaders
                    sticky={ props.fixedHeader }
                    loading={ props.loading }
                    color={ props.color }
                    v-slots={ slots }
                  />
                )}
              </thead>
              { slots.thead?.() }
              <tbody class="v-data-table__tbody" role="rowgroup">
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    items={ flatItems.value }
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
  },
})

export type VDataTableServer = InstanceType<typeof VDataTableServer>
