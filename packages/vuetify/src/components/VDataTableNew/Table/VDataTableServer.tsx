import { VTable } from '@/components'
import { defineComponent } from '@/util'
import { PropType, provide } from 'vue'
import { useHeaders, useOptions, usePagination, useSort } from '../composables'
import { VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

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
    itemCount: Number,
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

    const { page, itemsPerPage, startIndex, stopIndex, pageCount, itemCount } = usePagination(props)

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
                    rows={ headers.value }
                    rowHeight={ 48 }
                    sticky={ props.fixedHeader }
                    sortBy={ sortBy.value }
                    onSort={ sorted => {
                      sortBy.value = sorted
                    } }
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
              itemCount={itemCount.value}
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
