import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { convertToUnit, defineComponent } from '@/util'
import { VDataTableHeaders } from './VDataTableHeaders'
import './VDataTable.sass'

import type { PropType } from 'vue'
import { VDataTableRows } from './VDataTableRows'
import { useHeaders } from './VDataTable'

type DataTableHeader = {
  id: string
  name: string
  colspan?: number
  rowspan?: number
  minWidth?: string
  maxWidth?: string
}

export type Column = DataTableHeader & {
  style: any
}

const useVirtual = (props: { items?: any[], height?: string | number, rowHeight: string | number }) => {
  const tableRef = ref<HTMLElement>()
  const allItems = computed(() => props.items ?? [])
  const totalHeight = computed(() => allItems.value.length * parseInt(props.rowHeight, 10))
  const scrollTop = ref(0)
  const chunkSize = ref(20)
  const scrollIndex = computed(() => Math.floor(scrollTop.value / parseInt(props.rowHeight, 10)))
  const chunkIndex = computed(() => Math.floor(scrollIndex.value / chunkSize.value))
  const startIndex = computed(() => Math.max(0, (chunkIndex.value * chunkSize.value) - chunkSize.value))
  const stopIndex = computed(() => Math.min(startIndex.value + (chunkSize.value * 3), allItems.value.length))
  const offsetStart = computed(() => Math.max(0, startIndex.value * parseInt(props.rowHeight, 10)))
  const items = computed(() => allItems.value.slice(startIndex.value, stopIndex.value))

  function tableScroll () {
    scrollTop.value = tableRef.value?.scrollTop ?? 0
  }

  onMounted(() => {
    if (!tableRef.value) return
    tableRef.value.addEventListener('scroll', tableScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    if (!tableRef.value) return
    tableRef.value.removeEventListener('scroll', tableScroll)
  })

  return {
    items,
    totalHeight,
    tableRef,
    offsetStart,
  }
}

export const VVirtualDataTable = defineComponent({
  name: 'VDataTable',

  props: {
    headers: {
      type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
    height: [String, Number],
    rowHeight: {
      type: [String, Number],
      default: 48,
    },
    stickyHeader: Boolean,
  },

  setup (props, { slots }) {
    const { rowColumns, headerRows, tableGridStyles } = useHeaders(props)

    const { items, totalHeight, tableRef, offsetStart } = useVirtual(props)

    return () => (
      <div
        ref={tableRef}
        class="v-data-table v-virtual-data-table"
        style={{
          height: convertToUnit(props.height),
        }}
      >
        <table
          class="v-data-table__table"
          style={{
            ...tableGridStyles.value,
            height: convertToUnit(totalHeight.value),
          }}
          role="table"
        >
          <thead class="v-data-table__thead" role="rowgroup">
            <VDataTableHeaders rows={ headerRows.value } rowHeight={ parseInt(props.rowHeight, 10) } sticky={ props.stickyHeader }/>
          </thead>
          <tbody class="v-data-table__tbody" role="rowgroup">
            <VDataTableRows
              columns={ rowColumns.value }
              items={ items.value }
              rowHeight={ parseInt(props.rowHeight, 10) }
              offsetStart={ offsetStart.value }
            />
          </tbody>
        </table>
      </div>
    )
  },
})
