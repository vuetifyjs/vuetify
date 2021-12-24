import { computed, onBeforeUnmount, onMounted, provide, ref, toRef, watch } from 'vue'
import { convertToUnit, defineComponent, getCurrentInstance, propsFactory } from '@/util'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'
import './VDataTable.sass'

import type { PropType, Ref } from 'vue'
import type { DataTableHeader } from '../types'
import { useGroupBy, useHeaders, useOptions, usePagination, useSort, useSortedItems } from '../composables'
import { VDataTableFooter } from './VDataTableFooter'
import { VTable } from '@/components'
import { useProxiedModel } from '@/composables/proxiedModel'

export const makeVDataTableProps = propsFactory({
  headers: {
    type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
    required: true,
  },
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  height: [String, Number],
  width: [String, Number],
  fixedHeader: Boolean,
  groupBy: String,
}, 'v-data-table')

export const VDataTable = defineComponent({
  name: 'VDataTable',

  props: {
    ...makeVDataTableProps(),
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    sortBy: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
  },

  emits: {
    'update:page': (value: number) => true,
    'update:itemsPerPage': (value: number) => true,
    'update:sortBy': (value: any) => true,
    'update:options': (value: any) => true,
  },

  setup (props, { slots }) {
    const { headers, columns } = useHeaders(props)

    const page = useProxiedModel(props, 'page')
    const itemsPerPage = useProxiedModel(props, 'itemsPerPage')

    const { sortBy, toggleSort } = useSort(props)
    const { sortedItems } = useSortedItems(toRef(props, 'items'), sortBy)

    const { items: paginatedItems } = usePagination(sortedItems, itemsPerPage, page)

    const { items, toggleGroup } = useGroupBy(paginatedItems, toRef(props, 'groupBy'))

    // Reset page when sorting changes
    watch(sortBy, () => {
      page.value = 1
    }, { deep: true })

    provide('v-data-table', {
      toggleGroup,
      toggleSort,
    })

    useOptions(page, itemsPerPage, sortBy)

    return () => (
      <VTable
        class="v-data-table-regular"
        height={props.height}
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
                    items={ items.value }
                    v-slots={ slots }
                  />
                ) }
              </tbody>
            </>
          ),
          bottom: () => (
            <VDataTableFooter
              page={ page.value }
              onPreviousPage={() => {
                page.value = Math.max(1, page.value - 1)
              }}
              onNextPage={() => {
                page.value = Math.min(Math.floor(props.items.length / itemsPerPage.value), page.value + 1)
              }}
            />
          ),
        }}
      </VTable>
    )
  },
})
