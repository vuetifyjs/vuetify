// Utilities
import { capitalize, inject, provide, ref, watchEffect } from 'vue'
import { consoleError, isString, propsFactory } from '@/util'

// Types
import type { DeepReadonly, InjectionKey, PropType, Ref } from 'vue'
import type { SortItem } from './sort'
import type { DataTableCompareFunction, DataTableHeader, InternalDataTableHeader } from '../types'
import type { FilterKeyFunctions } from '@/composables/filter'

export const makeDataTableHeaderProps = propsFactory({
  headers: Array as PropType<DeepReadonly<DataTableHeader[]>>,
}, 'DataTable-header')

export const VDataTableHeadersSymbol: InjectionKey<{
  headers: Ref<InternalDataTableHeader[][]>
  columns: Ref<InternalDataTableHeader[]>
}> = Symbol.for('vuetify:data-table-headers')

type HeaderProps = {
  headers: DeepReadonly<DataTableHeader[]> | undefined
  items: any[]
}

const defaultHeader = { title: '', sortable: false }
const defaultActionHeader = { ...defaultHeader, width: 48 }

function extractLeaves (item: InternalDataTableHeader, columns: InternalDataTableHeader[] = []) {
  if (!item.children) {
    columns.push(item)
  } else {
    for (const child of item.children) {
      extractLeaves(child, columns)
    }
  }

  return columns
}

function extractKeys (headers: DeepReadonly<DataTableHeader[]>, keys = new Set<string>()) {
  for (const item of headers) {
    if (item.key) keys.add(item.key)

    if (item.children) {
      extractKeys(item.children, keys)
    }
  }

  return keys
}

function getDefaultItem (item: DeepReadonly<DataTableHeader>) {
  if (!item.key) return undefined
  if (item.key === 'data-table-group') return defaultHeader
  if (['data-table-expand', 'data-table-select'].includes(item.key)) return defaultActionHeader
  return undefined
}

function getDepth (item: InternalDataTableHeader, depth = 0): number {
  if (!item.children) return depth

  return Math.max(depth, ...item.children.map(child => getDepth(child, depth + 1)))
}

function parseFixedColumns (items: InternalDataTableHeader[]) {
  let seenFixed = false

  function setFixed (
    item: InternalDataTableHeader,
    side: 'start' | 'end',
    parentFixedSide: 'start' | 'end' | 'none' = 'none'
  ) {
    if (!item) return

    if (parentFixedSide !== 'none') {
      item.fixed = parentFixedSide
    }

    // normalize to simplify logic below
    if (item.fixed === true) {
      item.fixed = 'start'
    }

    if (item.fixed === side) {
      if (item.children) {
        if (side === 'start') {
          for (let i = item.children.length - 1; i >= 0; i--) {
            setFixed(item.children[i], side, side)
          }
        } else {
          for (let i = 0; i < item.children.length; i++) {
            setFixed(item.children[i], side, side)
          }
        }
      } else {
        if (!seenFixed && side === 'start') {
          item.lastFixed = true
        } else if (!seenFixed && side === 'end') {
          item.firstFixedEnd = true
        } else if (isNaN(Number(item.width))) {
          consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`)
        } else {
          item.minWidth = Math.max(Number(item.width) || 0, Number(item.minWidth) || 0)
        }
        seenFixed = true
      }
    } else {
      if (item.children) {
        if (side === 'start') {
          for (let i = item.children.length - 1; i >= 0; i--) {
            setFixed(item.children[i], side)
          }
        } else {
          for (let i = 0; i < item.children.length; i++) {
            setFixed(item.children[i], side)
          }
        }
      } else {
        seenFixed = false
      }
    }
  }

  for (let i = items.length - 1; i >= 0; i--) {
    setFixed(items[i], 'start')
  }

  for (let i = 0; i < items.length; i++) {
    setFixed(items[i], 'end')
  }

  let fixedOffset = 0
  for (let i = 0; i < items.length; i++) {
    fixedOffset = setFixedOffset(items[i], fixedOffset)
  }

  let fixedEndOffset = 0
  for (let i = items.length - 1; i >= 0; i--) {
    fixedEndOffset = setFixedEndOffset(items[i], fixedEndOffset)
  }
}

function setFixedOffset (item: InternalDataTableHeader, offset = 0) {
  if (!item) return offset

  if (item.children) {
    item.fixedOffset = offset
    for (const child of item.children) {
      offset = setFixedOffset(child, offset)
    }
  } else if (item.fixed && item.fixed !== 'end') {
    item.fixedOffset = offset
    offset += parseFloat(item.width || '0') || 0
  }

  return offset
}

function setFixedEndOffset (item: InternalDataTableHeader, offset = 0) {
  if (!item) return offset

  if (item.children) {
    item.fixedEndOffset = offset
    for (const child of item.children) {
      offset = setFixedEndOffset(child, offset)
    }
  } else if (item.fixed === 'end') {
    item.fixedEndOffset = offset
    offset += parseFloat(item.width || '0') || 0
  }

  return offset
}

function parse (items: InternalDataTableHeader[], maxDepth: number) {
  const headers: InternalDataTableHeader[][] = Array.from({ length: maxDepth }, () => [])

  function walk (item: InternalDataTableHeader, row: number) {
    const diff = maxDepth - row - getDepth(item)

    headers[row].push({
      ...item,
      rowspan: diff,
      colspan: item.children ? extractLeaves(item).length : 1,
    })

    item.children?.forEach(child => walk(child, row + diff))
  }

  items.forEach(item => walk(item, 0))

  const columns = items.map(item => extractLeaves(item)).flat()

  return { columns, headers }
}

function convertToInternalHeaders (items: DeepReadonly<DataTableHeader[]>) {
  const internalHeaders: InternalDataTableHeader[] = []
  for (const item of items) {
    const defaultItem = { ...getDefaultItem(item), ...item }
    const key = defaultItem.key ?? (isString(defaultItem.value) ? defaultItem.value : null)
    const value = defaultItem.value ?? key ?? null
    const internalItem: InternalDataTableHeader = {
      ...defaultItem,
      key,
      value,
      sortable: defaultItem.sortable ?? (defaultItem.key != null || !!defaultItem.sort),
      children: defaultItem.children ? convertToInternalHeaders(defaultItem.children) : undefined,
    }

    internalHeaders.push(internalItem)
  }

  return internalHeaders
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
  const sortFunctions = ref<Record<string, DataTableCompareFunction>>({})
  const sortRawFunctions = ref<Record<string, DataTableCompareFunction>>({})
  const filterFunctions = ref<FilterKeyFunctions>({})

  watchEffect(() => {
    const _headers = props.headers ||
      Object.keys(props.items[0] ?? {}).map(key => ({ key, title: capitalize(key) })) as never

    const items = _headers.slice()
    const keys = extractKeys(items)

    if (options?.groupBy?.value.length && !keys.has('data-table-group')) {
      items.unshift({ key: 'data-table-group', title: 'Group' })
    }

    if (options?.showSelect?.value && !keys.has('data-table-select')) {
      items.unshift({ key: 'data-table-select' })
    }

    if (options?.showExpand?.value && !keys.has('data-table-expand')) {
      items.push({ key: 'data-table-expand' })
    }

    const internalHeaders = convertToInternalHeaders(items)

    parseFixedColumns(internalHeaders)

    const maxDepth = Math.max(...internalHeaders.map(item => getDepth(item))) + 1
    const parsed = parse(internalHeaders, maxDepth)

    headers.value = parsed.headers
    columns.value = parsed.columns

    const flatHeaders = parsed.headers.flat(1)

    sortFunctions.value = {}
    sortRawFunctions.value = {}
    filterFunctions.value = {}

    for (const header of flatHeaders) {
      if (!header.key) continue

      if (header.sortable) {
        if (header.sort) {
          sortFunctions.value[header.key] = header.sort
        }

        if (header.sortRaw) {
          sortRawFunctions.value[header.key] = header.sortRaw
        }
      }

      if (header.filter) {
        filterFunctions.value[header.key] = header.filter
      }
    }
  })

  const data = { headers, columns, sortFunctions, sortRawFunctions, filterFunctions }

  provide(VDataTableHeadersSymbol, data)

  return data
}

export function useHeaders () {
  const data = inject(VDataTableHeadersSymbol)

  if (!data) throw new Error('Missing headers!')

  return data
}
