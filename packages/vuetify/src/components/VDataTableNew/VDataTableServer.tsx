// Components
import { VTable } from '@/components'
import { VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

// Utilities
import { provide, toRef } from 'vue'
import { defineComponent } from '@/util'
import { createExpanded, useDataTableItems, useGroupBy, useHeaders, useOptions, usePagination, useSort } from './composables'

// Types
import type { PropType } from 'vue'
import { VProgressLinear } from '@/components/VProgressLinear'
import { makeItemsProps } from '@/composables/items'

export const VDataTableServer = defineComponent({
  name: 'VDataTableServer',

  props: {
    color: String,
    headers: {
      type: Array as PropType<any[]>,
      required: true,
    },
    loading: Boolean,
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
    itemsLength: Number,
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    height: [String, Number],
    sortBy: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
    groupBy: String,
    ...makeItemsProps({
      itemValue: 'id',
    }),
  },

  emits: {
    'update:page': (page: number) => true,
    'update:itemsPerPage': (page: number) => true,
    'update:sortBy': (sortBy: any) => true,
    'update:options': (options: any) => true,
  },

  setup (props, { slots, emit }) {
    const { expanded } = createExpanded()

    const { columns, headers } = useHeaders(props)

    const { items } = useDataTableItems(props, columns)

    const { sortBy, toggleSort } = useSort(props)

    const { page, itemsPerPage, startIndex, stopIndex, pageCount, itemsLength } = usePagination(props)

    useOptions({
      page,
      itemsPerPage,
      sortBy,
      startIndex,
      stopIndex,
      pageCount,
      itemsLength,
    })

    provide('v-data-table', {
      toggleSort,
      sortBy,
    })

    return () => (
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
                    columns={ columns.value }
                    headers={ headers.value }
                    sticky={ props.fixedHeader }
                    sortBy={ sortBy.value }
                    loading={ props.loading }
                    color={ props.color }
                  />
                ) }
              </thead>
              { slots.thead?.() }
              <tbody class="v-data-table__tbody" role="rowgroup">
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    columns={ columns.value }
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
    )
  },
})
