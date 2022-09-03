// Components
import { VTable } from '@/components'
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

// Utilities
import { provide, toRef } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import { makeVDataTableProps } from './VDataTable'

export const VDataTableServer = defineComponent({
  name: 'VDataTableServer',

  props: {
    color: String,
    loading: Boolean,

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
  },

  setup (props, { slots }) {
    createExpanded(props)

    const { columns } = createHeaders(props, { showSelect: toRef(props, 'showSelect') })

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
          default: slots.default ? slots.default() : () => (
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
  },
})
