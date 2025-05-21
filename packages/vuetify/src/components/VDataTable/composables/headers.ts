// Utilities
import { capitalize, inject, provide, ref, watchEffect } from 'vue'
import { consoleError, propsFactory } from '@/util'

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

function priorityQueue <T> (arr: T[] = []) {
  const queue: { element: T, priority: number }[] = arr.map(element => ({ element, priority: 0 }))

  return {
    enqueue: (element: T, priority: number) => {
      let added = false
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i]
        if (item.priority > priority) {
          queue.splice(i, 0, { element, priority })
          added = true
          break
        }
      }

      if (!added) queue.push({ element, priority })
    },
    size: () => queue.length,
    count: () => {
      let count = 0

      if (!queue.length) return 0

      const whole = Math.floor(queue[0].priority)
      for (let i = 0; i < queue.length; i++) {
        if (Math.floor(queue[i].priority) === whole) count += 1
      }

      return count
    },
    dequeue: () => {
      return queue.shift()
    },
  }
}

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
  function setFixed (item: InternalDataTableHeader, parentFixed = false) {
    if (!item) return

    if (parentFixed) {
      item.fixed = true
    }

    if (item.fixed) {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i], true)
        }
      } else {
        if (!seenFixed) {
          item.lastFixed = true
        } else if (isNaN(Number(item.width))) {
          consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`)
        } else {
          item.minWidth = Math.max(Number(item.width) || 0, Number(item.minWidth) || 0)
        }
        seenFixed = true
      }
    } else {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i])
        }
      } else {
        seenFixed = false
      }
    }
  }

  for (let i = items.length - 1; i >= 0; i--) {
    setFixed(items[i])
  }

  function setFixedOffset (item: InternalDataTableHeader, fixedOffset = 0) {
    if (!item) return fixedOffset

    if (item.children) {
      item.fixedOffset = fixedOffset
      for (const child of item.children) {
        fixedOffset = setFixedOffset(child, fixedOffset)
      }
    } else if (item.fixed) {
      item.fixedOffset = fixedOffset
      fixedOffset += parseFloat(item.width || '0') || 0
    }

    return fixedOffset
  }

  let fixedOffset = 0
  for (const item of items) {
    fixedOffset = setFixedOffset(item, fixedOffset)
  }
}

function parse (items: InternalDataTableHeader[], maxDepth: number) {
  const headers: InternalDataTableHeader[][] = []
  let currentDepth = 0
  const queue = priorityQueue(items)

  while (queue.size() > 0) {
    let rowSize = queue.count()
    const row: InternalDataTableHeader[] = []
    let fraction = 1
    while (rowSize > 0) {
      const { element: item, priority } = queue.dequeue()!
      const diff = maxDepth - currentDepth - getDepth(item)

      row.push({
        ...item,
        rowspan: diff ?? 1,
        colspan: item.children ? extractLeaves(item).length : 1,
      })

      if (item.children) {
        for (const child of item.children) {
          // This internally sorts items that are on the same priority "row"
          const sort = priority % 1 + (fraction / Math.pow(10, currentDepth + 2))
          queue.enqueue(child, currentDepth + diff + sort)
        }
      }

      fraction += 1
      rowSize -= 1
    }
    currentDepth += 1
    headers.push(row)
  }

  const columns = items.map(item => extractLeaves(item)).flat()

  return { columns, headers }
}

function convertToInternalHeaders (items: DeepReadonly<DataTableHeader[]>) {
  const internalHeaders: InternalDataTableHeader[] = []
  for (const item of items) {
    const defaultItem = { ...getDefaultItem(item), ...item }
    const key = defaultItem.key ?? (typeof defaultItem.value === 'string' ? defaultItem.value : null)
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
