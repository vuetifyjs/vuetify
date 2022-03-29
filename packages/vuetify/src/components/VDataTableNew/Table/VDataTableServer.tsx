// Components
import { VTable } from '@/components'
import { VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

// Utilities
import { provide } from 'vue'
import { defineComponent } from '@/util'
import { useHeaders, useOptions, usePagination, useSort } from '../composables'

// Types
import type { PropType } from 'vue'

export const VDataTableServer = defineComponent({
  name: 'VDataTableServer',

  props: {
    headers: {
      type: Array as PropType<any[]>,
      required: true,
    },
    loading: Boolean,
    items: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
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
    sortBy: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
  },

  emits: {
    'update:page': (page: number) => true,
    'update:itemsPerPage': (page: number) => true,
    'update:sortBy': (sortBy: any) => true,
    'update:options': (options: any) => true,
  },

  setup (props, { slots, emit }) {
    const { columns, headers } = useHeaders(props)

    const { sortBy, toggleSort } = useSort(props)

    const { page, itemsPerPage, startIndex, stopIndex, pageCount, itemsLength } = usePagination(props)

    useOptions(page, itemsPerPage, sortBy)

    provide('v-data-table', {
      toggleSort,
    })

    return () => (
      <VTable
        class={{
          'v-data-table-regular--loading': props.loading,
        }}
      >
        {{
          default: () => (
            <>
              <thead class="v-data-table-regular__thead" role="rowgroup">
                { slots.headers ? slots.headers() : (
                  <VDataTableHeaders
                    headers={ headers.value }
                    rowHeight={ 48 }
                    sticky={ props.fixedHeader }
                    sortBy={ sortBy.value }
                  />
                ) }
              </thead>
              <tbody class="v-data-table-regular__tbody" role="rowgroup">
                { slots.body ? slots.body() : (
                  <VDataTableRows
                    columns={ columns.value }
                    items={ props.items }
                    v-slots={ slots }
                  />
                ) }
              </tbody>
            </>
          ),
          bottom: () => (
            <VDataTableFooter
              itemsLength={itemsLength.value}
              itemsPerPage={itemsPerPage.value}
              startIndex={startIndex.value}
              stopIndex={stopIndex.value}
              page={ page.value }
              onPreviousPage={() => {
                page.value = Math.max(1, page.value - 1)
              }}
              onNextPage={() => {
                page.value = Math.min(pageCount.value, page.value + 1)
              }}
            />
          ),
        }}
      </VTable>
    )
  },
})
