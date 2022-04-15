// Components
import { VTable } from '@/components'
import { VDataTableFooter } from './VDataTableFooter'
import { VDataTableHeaders } from './VDataTableHeaders'
import { VDataTableRows } from './VDataTableRows'

// Utilities
import { provide, toRef } from 'vue'
import { defineComponent } from '@/util'
import { createExpanded, useGroupBy, useHeaders, useOptions, usePagination, useSort } from '../composables'

// Types
import type { PropType } from 'vue'
import { VProgressLinear } from '@/components/VProgressLinear'

export const VDataTableServer = defineComponent({
  name: 'VDataTableServer',

  props: {
    color: String,
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
    fixedFooter: Boolean,
    height: [String, Number],
    sortBy: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
    groupBy: String,
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

    const { sortBy, toggleSort } = useSort(props)

    const { page, itemsPerPage, startIndex, stopIndex, pageCount, itemsLength } = usePagination(props)

    const { items, toggleGroup, opened } = useGroupBy(toRef(props, 'items'), toRef(props, 'groupBy'))

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
      toggleGroup,
      sortBy,
      opened,
    })

    return () => (
      <VTable
        class={{
          'v-data-table--loading': props.loading,
        }}
        fixedHeader={ props.fixedHeader }
        fixedFooter={ props.fixedFooter }
        height={ props.height }
      >
        {{
          default: () => (
            <>
              <thead class="v-data-table__thead" role="rowgroup">
                { slots.headers ? slots.headers() : (
                  <VDataTableHeaders
                    headers={ headers.value }
                    sticky={ props.fixedHeader }
                    sortBy={ sortBy.value }
                    loading={ props.loading }
                    color={ props.color }
                    columns={ columns.value }
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
            </>
          ),
          bottom: () => (
            <VDataTableFooter
              startIndex={ startIndex.value }
              stopIndex={ stopIndex.value }
              itemsLength={ itemsLength.value }
              page={ page.value }
              pageCount={ pageCount.value }
              itemsPerPage={ itemsPerPage.value }
              onUpdate:itemsPerPage={ v => itemsPerPage.value = v }
              onUpdate:page={ v => page.value = v }
            />
          ),
        }}
      </VTable>
    )
  },
})
