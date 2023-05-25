// Utilities
import { inject, provide, ref, watch } from 'vue'
import { createRange, propsFactory } from '@/util'

// Types
import type { DeepReadonly, InjectionKey, PropType, Ref } from 'vue'
import type { SortItem } from './sort'
import type { DataTableHeader, InternalDataTableHeader } from '../types'

export const makeDataTableHeaderProps = propsFactory({
  headers: {
    type: Array as PropType<DeepReadonly<DataTableHeader[] | DataTableHeader[][]>>,
    default: () => ([]),
  },
}, 'v-data-table-header')

export const VDataTableHeadersSymbol: InjectionKey<{
  headers: Ref<InternalDataTableHeader[][]>
  columns: Ref<InternalDataTableHeader[]>
}> = Symbol.for('vuetify:data-table-headers')

type HeaderProps = {
  headers: DeepReadonly<DataTableHeader[] | DataTableHeader[][]>
}

export function createHeaders (
  props: HeaderProps,
  options?: {
    groupBy?: Ref<readonly SortItem[]>
    showSelect?: Ref<boolean>
    showExpand?: Ref<boolean>
  }
) {
  const headers = ref<InternalDataTableHeader[][]>([])
  const columns = ref<InternalDataTableHeader[]>([])

  watch(() => props.headers, () => {
    const wrapped = !props.headers.length
      ? []
      : Array.isArray(props.headers[0])
        ? props.headers as DataTableHeader[][]
        : [props.headers as DataTableHeader[]]
    const flat = wrapped.flatMap((row, index) => row.map(column => ({ column, row: index })))

    const rowCount = wrapped.length
    const defaultHeader = { title: '', sortable: false }
    const defaultActionHeader = { ...defaultHeader, width: 48 }

    if (options?.groupBy?.value.length) {
      const index = flat.findIndex(({ column }) => column.key === 'data-table-group')
      if (index < 0) flat.unshift({ column: { ...defaultHeader, key: 'data-table-group', title: 'Group', rowspan: rowCount }, row: 0 })
      else flat.splice(index, 1, { column: { ...defaultHeader, ...flat[index].column }, row: flat[index].row })
    }

    if (options?.showSelect?.value) {
      const index = flat.findIndex(({ column }) => column.key === 'data-table-select')
      if (index < 0) flat.unshift({ column: { ...defaultActionHeader, key: 'data-table-select', rowspan: rowCount }, row: 0 })
      else flat.splice(index, 1, { column: { ...defaultActionHeader, ...flat[index].column }, row: flat[index].row })
    }

    if (options?.showExpand?.value) {
      const index = flat.findIndex(({ column }) => column.key === 'data-table-expand')
      if (index < 0) flat.push({ column: { ...defaultActionHeader, key: 'data-table-expand', rowspan: rowCount }, row: 0 })
      else flat.splice(index, 1, { column: { ...defaultActionHeader, ...flat[index].column }, row: flat[index].row })
    }

    const fixedRows: InternalDataTableHeader[][] = createRange(rowCount).map(() => [])
    const fixedOffsets = createRange(rowCount).fill(0)

    flat.forEach(({ column, row }) => {
      const key = column.key
      for (let i = row; i <= row + (column.rowspan ?? 1) - 1; i++) {
        fixedRows[i].push({
          ...column,
          key,
          fixedOffset: fixedOffsets[i],
          sortable: column.sortable ?? !!column.key,
        })

        fixedOffsets[i] += Number(column.width ?? 0)
      }
    })

    fixedRows.forEach(row => {
      for (let i = row.length; i--; i >= 0) {
        if (row[i].fixed) {
          row[i].lastFixed = true
          return
        }
      }
    })

    const seen = new Set()
    headers.value = fixedRows.map(row => {
      const filtered = []
      for (const column of row) {
        if (!seen.has(column.key)) {
          seen.add(column.key)
          filtered.push(column)
        }
      }

      return filtered
    })

    columns.value = fixedRows.at(-1) ?? []
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
