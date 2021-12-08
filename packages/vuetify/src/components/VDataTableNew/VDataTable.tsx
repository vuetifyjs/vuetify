import { computed, inject, provide, ref, watch } from 'vue'
import { convertToUnit, createRange, defineComponent } from '@/util'
import { VDataTableHeaders } from './VDataTableHeaders'
import './VDataTable.sass'

import type { InjectionKey, PropType } from 'vue'
import { VDataTableRows } from './VDataTableRows'

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

function isMultipleHeaders (arr: any): arr is DataTableHeader[][] {
  return arr.length > 0 && Array.isArray(arr[0])
}

export const useHeaders = (props: { headers: DataTableHeader[] | DataTableHeader[][], rowHeight?: number | string }) => {
  const headerRows = ref<Column[][]>([])
  const rowColumns = ref<Column[]>([])

  watch(() => props.headers, () => {
    const rows = isMultipleHeaders(props.headers) ? props.headers : [props.headers]

    const width = rows[rows.length - 1].length + (rows.length > 1 ? rows.slice(0, rows.length - 1).reduce((count, row, index) => {
      return count + row.filter(col => index + (col.rowspan ?? 0) === rows.length ? 1 : 0).length
    }, 0) : 0)

    rowColumns.value = Array(width)

    const rowsWithStyle: Column[][] = []
    let rowStart = 1
    const colStart = createRange(width).map(() => 1)
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const columnsWithStyle: Column[] = []

      for (let colIndex = 0; colIndex < rows[rowIndex].length; colIndex++) {
        const column = rows[rowIndex][colIndex]
        const colEnd = colStart[rowIndex] + (column.colspan ?? 1)
        const rowEnd = rowStart + (column.rowspan ?? 1)

        const newColumn = {
          ...column,
          style: {
            'grid-area': `${rowStart} / ${colStart[rowIndex]} / ${rowEnd} / ${colEnd}`,
          },
        }

        columnsWithStyle.push(newColumn)

        if (newColumn.id) {
          rowColumns.value.splice(colStart[rowIndex] - 1, 1, newColumn)
        }

        colStart[rowIndex] = colEnd

        for (let i = 0; i < (column.rowspan ?? 0); i++) {
          colStart[rowIndex + i + 1] += 1
        }
      }

      rowsWithStyle.push(columnsWithStyle)

      rowStart += 1
    }

    headerRows.value = rowsWithStyle
  }, {
    immediate: true,
  })

  const tableGridStyles = computed(() => ({
    'grid-template-columns': rowColumns.value.map(col => `minmax(${col.minWidth ?? '150px'}, ${col.maxWidth ?? '1fr'})`).join(' '),
  }))

  return {
    tableGridStyles,
    rowColumns,
    headerRows,
  }
}

export const VDataTableExpandedKey: InjectionKey<{
  toggleExpand: (index: number, item: any) => void
}> = Symbol.for('vuetify:datatable:expanded')

export const createExpanded = (props: { items: any[] }) => {
  const expanded = ref(new Map<string, number>())

  function toggleExpand (index: number, item: any) {
    const isExpanded = expanded.value.has(item.id)

    if (isExpanded) {
      expanded.value.delete(item.id)
    } else {
      expanded.value.set(item.id, index)
    }
  }

  const items = computed(() => {
    const incoming = [...props.items]

    for (const index of expanded.value.values()) {
      incoming.splice(index + 1, 0, {
        [VDataTableExpandedKey as symbol]: true,
      })
    }

    return incoming
  })

  provide(VDataTableExpandedKey, { toggleExpand })

  return { items, expanded, toggleExpand }
}

export const useExpanded = () => {
  const data = inject(VDataTableExpandedKey)

  if (!data) throw new Error('foo')

  return data
}

export const VDataTable = defineComponent({
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

    const { items } = createExpanded(props)

    return () => (
      <div
        class="v-data-table"
        style={{
          height: convertToUnit(props.height),
        }}
      >
        <table
          class="v-data-table__table"
          style={{
            ...tableGridStyles.value,
          }}
          role="table"
        >
          <thead class="v-data-table__thead" role="rowgroup">
            <VDataTableHeaders rows={ headerRows.value } rowHeight={ parseInt(props.rowHeight, 10) } sticky={ props.stickyHeader } />
          </thead>
          <tbody class="v-data-table__tbody" role="rowgroup">
            <VDataTableRows
              columns={ rowColumns.value }
              items={ items.value }
              rowHeight={ parseInt(props.rowHeight, 10) }
              v-slots={ slots }
            />
          </tbody>
        </table>
      </div>
    )
  },
})
