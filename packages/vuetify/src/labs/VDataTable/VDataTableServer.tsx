// Components
import { VTable } from '@/components/VTable'
import { VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

// Composables
import { createExpanded, makeDataTableExpandProps } from './composables/expand'
import { createHeaders, makeDataTableHeaderProps } from './composables/headers'
import { makeDataTableItemProps, useDataTableItems } from './composables/items'
import { createSort, makeDataTableSortProps } from './composables/sort'
import { createPagination, makeDataTablePaginateProps } from './composables/paginate'
import { createSelection, makeDataTableSelectProps } from './composables/select'
import { useOptions } from './composables/options'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { provide, toRef } from 'vue'
import { defineComponent, useRender } from '@/util'
import { makeVDataTableProps } from './VDataTable'

// Types
import type { DataTableItem } from './types'

export const VDataTableServer = defineComponent({
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
  },

  emits: {
    'update:modelValue': (value: any[]) => true,
    'update:page': (page: number) => true,
    'update:itemsPerPage': (page: number) => true,
    'update:sortBy': (sortBy: any) => true,
    'update:options': (options: any) => true,
    'update:expanded': (options: any) => true,
    'click:row': (event: Event, value: { item: DataTableItem }) => true,
  },

  setup (props, { emit, slots }) {
    createExpanded(props)

    const { columns } = createHeaders(props, {
      showSelect: toRef(props, 'showSelect'),
      showExpand: toRef(props, 'showExpand'),
    })

    const { items } = useDataTableItems(props, columns)

    const { sortBy, toggleSort } = createSort(props)

    const { page, itemsPerPage, startIndex, stopIndex, pageCount } = createPagination(props, items)

    createSelection(props, items)

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      startIndex,
      stopIndex,
      pageCount,
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
                  />
                ) }
              </thead>
              { slots.thead?.() }
              <tbody class="v-data-table__tbody" role="rowgroup">
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    items={ items.value }
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
  },
})

export type VDataTableServer = InstanceType<typeof VDataTableServer>
