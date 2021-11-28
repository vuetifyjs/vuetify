import { computed, inject, provide, ref, watch } from 'vue'
import { convertToUnit, defineComponent } from '@/util'
import { VDataTableHeaders } from './VDataTableHeaders'
import './VDataTable.sass'

import type { InjectionKey, PropType, Ref } from 'vue'
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
    const width = Math.max(...rows.map(row => row.length))

    rowColumns.value = Array(width)

    const rowsWithStyle: Column[][] = []
    let rowStart = 1
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const columnsWithStyle: Column[] = []
      let colStart = 1

      for (let colIndex = 0; colIndex < rows[rowIndex].length; colIndex++) {
        const column = rows[rowIndex][colIndex]
        const colEnd = colStart + (column.colspan ?? 1)
        const rowEnd = rowStart + (column.rowspan ?? 1)

        const newColumn = {
          ...column,
          style: {
            'grid-area': `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`,
          },
        }

        columnsWithStyle.push(newColumn)

        if (newColumn.id) {
          rowColumns.value.splice(colStart - 1, 1, newColumn)
        }

        colStart = colEnd
      }

      if (columnsWithStyle.length < width) {
        columnsWithStyle.push(...Array(width - columnsWithStyle.length).fill({}))
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
  expanded: Ref<Set<string>>
  toggleExpand: (index: number, item: any) => void
}> = Symbol.for('vuetify:datatable:expanded')

export const createExpanded = (props: { items: any[] }) => {
  const items = ref([...props.items])
  const expanded = ref(new Set<string>())

  function toggleExpand (index: number, item: any) {
    const isExpanded = expanded.value.has(item.id)

    if (isExpanded) {
      items.value.splice(index + 1, 1)
    } else {
      items.value.splice(index + 1, 0, {
        [VDataTableExpandedKey as symbol]: true,
        item,
      })
    }

    isExpanded ? expanded.value.delete(item.id) : expanded.value.add(item.id)
  }

  provide(VDataTableExpandedKey, { expanded, toggleExpand })

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
