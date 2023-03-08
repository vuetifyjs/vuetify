// Components
import { VTable } from '@/components/VTable'
import { VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { useProxiedModel } from '@/composables/proxiedModel'
import { createExpanded, makeDataTableExpandProps } from './composables/expand'
import { createGroupBy, makeDataTableGroupProps, useGroupedItems } from './composables/group'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
import { useOptions } from './composables/options'
import { createPagination, makeDataTablePaginateProps } from './composables/paginate'
import { createSelection, makeDataTableSelectProps } from './composables/select'
import { createSort, makeDataTableSortProps } from './composables/sort'

// Utilities
import { provide, toRef } from 'vue'
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
    itemsLength: [Number, String],

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
    'click:row': (event: Event, value: { item: DataTableItem }) => true,
  },

  setup (props, { emit, slots }) {
    const groupBy = useProxiedModel(props, 'groupBy')

    createExpanded(props)

    const { columns } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })

    const { items } = useDataTableItems(props, columns)

    const { sortBy, toggleSort } = createSort(props)

    const { opened } = createGroupBy(props, groupBy, sortBy)

    const { page, itemsPerPage } = createPagination(props, items)

    const { flatItems } = useGroupedItems(items, groupBy, opened)

    createSelection(props, items)

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
      >
        {{
          top: slots.top,
          default: slots.default ?? (() => (
            <>
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
                    onClick:row={ (event, value) => emit('click:row', event, value) }
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
