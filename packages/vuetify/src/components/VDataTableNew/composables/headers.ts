// Utilities
import { inject, provide, ref, watch } from 'vue'
import { createRange, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { DataTableHeader } from '../types'
import type { SortItem } from './sort'

export const makeDataTableHeaderProps = propsFactory({
  headers: {
    type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
    required: true,
  },
}, 'v-data-table-header')

export const VDataTableHeadersSymbol: InjectionKey<{
  headers: Ref<DataTableHeader[][]>
  columns: Ref<DataTableHeader[]>
}> = Symbol.for('vuetify:data-table-headers')

type HeaderProps = {
  headers: DataTableHeader[] | DataTableHeader[][]
}

export function createHeaders (
  props: HeaderProps,
  options?: {
    groupBy?: Ref<readonly SortItem[]>
    showSelect?: Ref<boolean>
    showExpand?: Ref<boolean>
  }
) {
  const headers = ref<DataTableHeader[][]>([])
  const columns = ref<DataTableHeader[]>([])

  watch(() => props.headers, () => {
    const wrapped = Array.isArray(props.headers[0]) ? props.headers as DataTableHeader[][] : [props.headers as DataTableHeader[]]
    const flat = wrapped.flatMap((row, index) => row.map(column => ({ column, row: index })))

    const rowCount = wrapped.length
    const defaultHeader = { title: '', sortable: false }

    if (options?.groupBy?.value.length) {
      const index = flat.findIndex(({ column }) => column.id === 'data-table-group')
      if (index < 0) flat.unshift({ column: { ...defaultHeader, id: 'data-table-group', title: 'Group', rowspan: rowCount }, row: 0 })
      else flat.splice(index, 1, { column: { ...defaultHeader, ...flat[index].column }, row: flat[index].row })
    }

    if (options?.showSelect?.value) {
      const index = flat.findIndex(({ column }) => column.id === 'data-table-select')
      if (index < 0) flat.unshift({ column: { ...defaultHeader, id: 'data-table-select', width: 1, rowspan: rowCount }, row: 0 })
      else flat.splice(index, 1, { column: { ...defaultHeader, ...flat[index].column, width: 1 }, row: flat[index].row })
    }

    if (options?.showExpand?.value) {
      const index = flat.findIndex(({ column }) => column.id === 'data-table-expand')
      if (index < 0) flat.push({ column: { ...defaultHeader, id: 'data-table-expand', width: 1, rowspan: rowCount }, row: 0 })
      else flat.splice(index, 1, { column: { ...defaultHeader, ...flat[index].column, width: 1 }, row: flat[index].row })
    }

    const rows = flat.reduce((arr, item) => {
      arr[item.row].push(item.column)
      return arr
    }, createRange(rowCount).map(() => []) as DataTableHeader[][])

    headers.value = rows
    columns.value = rows.flatMap(row => row.filter(col => col.id != null))
  }, {
    deep: true,
    immediate: true,
  })

  const data = { headers, columns }

  provide(VDataTableHeadersSymbol, data)

  return data
}

export function useHeaders () {
  const data = inject(VDataTableHeadersSymbol)

  if (!data) throw new Error('Missing headers!')

  return data
}
