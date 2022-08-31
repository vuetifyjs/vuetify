// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useItems } from '@/composables/items'

// Utilities
import { computed, inject, onBeforeMount, onBeforeUnmount, onMounted, provide, ref, toRef, watch } from 'vue'
import { createRange, debounce, getCurrentInstance, getObjectValueByPath, getPropertyFromItem } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { DataTableHeader } from './types'
import type { InternalItem, ItemProps } from '@/composables/items'

export type DataTableItem = InternalItem & { type: 'item', columns: Record<string, unknown> }
export type GroupHeaderItem = { type: 'group-header', groupBy: string, groupByValue: string, items: any[] }
export type ExpandedItem = { type: 'expanded-item' }
export type InternalDataTableItem = DataTableItem | GroupHeaderItem | ExpandedItem

export function useDataTableItems (props: ItemProps, columns: Ref<DataTableHeader[]>) {
  const { items } = useItems(props)

  const dataTableItems = computed<DataTableItem[]>(() => items.value.map(item => {
    return {
      ...item,
      type: 'item',
      columns: columns.value.reduce((obj, column) => {
        obj[column.id] = getPropertyFromItem(item.raw, column.value ?? column.id)
        return obj
      }, {} as Record<string, unknown>),
    }
  }))

  return { items: dataTableItems }
}

export const useVirtual = (props: { height?: string | number, itemHeight: string | number }, itemsLength: Ref<number>) => {
  const vm = getCurrentInstance('useVirtual')

  const itemHeight = computed(() => parseInt(props.itemHeight, 10))
  const totalHeight = computed(() => itemsLength.value * itemHeight.value)
  const { resizeRef: containerRef, contentRect } = useResizeObserver()
  const windowSize = computed(() => {
    return contentRect.value?.height ?? 0
  })
  const visibleItems = computed(() => (windowSize.value / itemHeight.value) * 3)
  const startIndex = ref(0)
  const stopIndex = computed(() => Math.min(startIndex.value + visibleItems.value, itemsLength.value))
  const visibleItemsHeight = computed(() => (stopIndex.value - startIndex.value) * itemHeight.value)
  const topOffset = computed(() => Math.max(0, startIndex.value * itemHeight.value))
  const bottomOffset = computed(() => Math.min(itemsLength.value * itemHeight.value, stopIndex.value * itemHeight.value))
  const visibleItemsMidPoint = computed(() => bottomOffset.value - (visibleItemsHeight.value / 3))
  const beforeHeight = computed(() => topOffset.value)
  const afterHeight = computed(() => Math.max(0, totalHeight.value - visibleItemsHeight.value - beforeHeight.value))
  const offsetStart = computed(() => Math.max(0, startIndex.value * itemHeight.value))
  const isScrolling = ref(false)

  const startOffset = computed(() => itemHeight.value * startIndex.value)

  let scrollTimeout: any = null

  watch(startIndex, val => {
    vm.emit('load', { startIndex: startIndex.value, stopIndex: stopIndex.value })
  }, {
    immediate: true,
  })

  let scrollTop: number

  const updateIndex = debounce(() => {
    if (!containerRef.value) return
    const direction = containerRef.value.scrollTop < scrollTop ? -1 : 1
    scrollTop = containerRef.value.scrollTop
    const windowMidPoint = scrollTop + (windowSize.value / 2)

    if (direction === 1 && windowMidPoint > visibleItemsMidPoint.value) {
      startIndex.value = Math.max(0, Math.floor((scrollTop - (visibleItemsHeight.value / 3)) / itemHeight.value))
    } else if (direction === -1 && scrollTop - startOffset.value < visibleItemsHeight.value / 3) {
      startIndex.value = Math.max(0, Math.floor((scrollTop - visibleItemsHeight.value / 2) / itemHeight.value))
    }
  }, 5)

  function tableScroll () {
    isScrolling.value = true

    updateIndex()

    clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
      isScrolling.value = false
    }, 100)
  }

  onMounted(() => {
    if (!containerRef.value) return

    const el = containerRef.value
    el.addEventListener('scroll', tableScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    if (!containerRef.value) return
    containerRef.value.removeEventListener('scroll', tableScroll)
  })

  return {
    totalHeight,
    containerRef,
    offsetStart,
    startIndex,
    stopIndex,
    isScrolling,
    itemHeight,
    afterHeight,
    beforeHeight,
  }
}

export const VDataTableExpandedKey: InjectionKey<{
  expand: (item: any, value: boolean) => void
  expanded: Ref<Set<string>>
  expandOnClick: Ref<boolean | undefined>
}> = Symbol.for('vuetify:datatable:expanded')

export const createExpanded = (props: { expandOnClick?: boolean }) => {
  const expandOnClick = toRef(props, 'expandOnClick')
  const expanded = ref(new Set<string>())

  function expand (item: any, value: boolean) {
    console.log(item, value)
    if (!value) {
      expanded.value.delete(item.value)
    } else {
      expanded.value.add(item.value)
    }
  }

  const data = { expand, expanded, expandOnClick }

  provide(VDataTableExpandedKey, data)

  return data
}

export const useExpanded = () => {
  const data = inject(VDataTableExpandedKey)

  if (!data) throw new Error('foo')

  return data
}

export const VDataTableHeadersSymbol: InjectionKey<{
  headers: Ref<DataTableHeader[][]>
  columns: Ref<DataTableHeader[]>
}> = Symbol.for('vuetify:data-table-headers')

export function createHeaders (props: { headers: DataTableHeader[] | DataTableHeader[][], showSelect?: boolean }) {
  const headers = ref<DataTableHeader[][]>([])
  const columns = ref<DataTableHeader[]>([])

  watch(() => props.headers, () => {
    const wrapped = Array.isArray(props.headers[0]) ? props.headers as DataTableHeader[][] : [props.headers as DataTableHeader[]]
    const flat = wrapped.flatMap((row, index) => row.map(column => ({ column, row: index })))

    const rowCount = wrapped.length
    const defaultHeader = { title: '', sortable: false, width: 1 }

    if (props.showSelect) {
      const index = flat.findIndex(({ column }) => column.id === 'data-table-select')
      if (index < 0) flat.unshift({ column: { ...defaultHeader, id: 'data-table-select', rowspan: rowCount }, row: 0 })
      else flat.splice(index, 1, { column: { ...defaultHeader, ...flat[index].column }, row: flat[index].row })
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

function sortItems<T extends any, K extends keyof T> (
  items: DataTableItem[],
  sortBy: readonly {
    key: string
    order: string
  }[],
  locale: string,
  // customSorters?: Record<K, DataTableCompareFunction<T[K]>>
): DataTableItem[] {
  if (sortBy === null || !sortBy.length) return items
  const stringCollator = new Intl.Collator(locale, { sensitivity: 'accent', usage: 'sort' })

  return [...items].sort((a, b) => {
    for (let i = 0; i < sortBy.length; i++) {
      const { key, order } = sortBy[i]

      let sortA = getObjectValueByPath(a.raw, key)
      let sortB = getObjectValueByPath(b.raw, key)

      if (order === 'desc') {
        [sortA, sortB] = [sortB, sortA]
      }

      // if (customSorters?.[sortKey as K]) {
      //   const customResult = customSorters[sortKey as K](sortA, sortB)

      //   if (!customResult) continue

      //   return customResult
      // }

      // Check if both cannot be evaluated
      if (sortA === null && sortB === null) {
        continue
      }

      // Dates should be compared numerically
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime()
      }

      [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString().toLocaleLowerCase())

      if (sortA !== sortB) {
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
        return stringCollator.compare(sortA, sortB)
      }
    }

    return 0
  })
}

export const VDataTableSortSymbol: InjectionKey<{
  sortBy: Ref<readonly SortItem[]>
  toggleSort: (key: string) => void
}> = Symbol.for('vuetify:data-table-sort')

export type SortItem = { key: string, order: 'asc' | 'desc' }

export function createSort (props: {
  sortBy: SortItem[]
  'onUpdate:sortBy': ((value: any) => void) | undefined
  mustSort?: boolean
  multiSort?: boolean
}) {
  const sortBy = useProxiedModel(props, 'sortBy')

  const toggleSort = (key: string) => {
    let newSortBy = sortBy.value?.map(x => ({ ...x })) ?? []
    const item = newSortBy.find(x => x.key === key)

    if (!item) {
      if (props.multiSort) newSortBy = [...newSortBy, { key, order: 'asc' }]
      else newSortBy = [{ key, order: 'asc' }]
    } else if (item.order === 'desc') {
      if (props.mustSort) {
        item.order = 'asc'
      } else {
        newSortBy = newSortBy.filter(x => x.key !== key)
      }
    } else {
      item.order = 'desc'
    }

    sortBy.value = newSortBy
  }

  const data = { sortBy, toggleSort }

  provide(VDataTableSortSymbol, data)

  return data
}

export function useSort () {
  const data = inject(VDataTableSortSymbol)

  if (!data) throw new Error('Missing sort!')

  return data
}

export const useSortedItems = (items: Ref<DataTableItem[]>, sortBy: Ref<readonly SortItem[]>) => {
  const sortedItems = computed(() => {
    if (!sortBy.value?.length) return items.value

    return sortItems(items.value, sortBy.value, 'en')
  })

  return { sortedItems }
}

export const usePagination = (props: {
  items: any[]
  page: number
  'onUpdate:page': ((val: any) => void) | undefined
  itemsPerPage: number
  'onUpdate:itemsPerPage': ((val: any) => void) | undefined
  itemsLength?: number
}) => {
  const page = useProxiedModel(props, 'page')
  const itemsPerPage = useProxiedModel(props, 'itemsPerPage')

  const startIndex = computed(() => itemsPerPage.value * (page.value - 1))
  const stopIndex = computed(() => startIndex.value + itemsPerPage.value)

  const itemsLength = computed(() => props.itemsLength ?? props.items.length)
  const pageCount = computed(() => Math.floor(itemsLength.value / itemsPerPage.value))

  return { page, itemsPerPage, startIndex, stopIndex, pageCount, itemsLength }
}

export const usePaginatedItems = (
  items: Ref<DataTableItem[]>,
  startIndex: Ref<number>,
  stopIndex: Ref<number>,
  itemsPerPage: Ref<number>
) => {
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return items.value

    return items.value.slice(startIndex.value, stopIndex.value)
  })

  return { paginatedItems }
}

export const useOptions = ({
  page,
  itemsPerPage,
  sortBy,
  startIndex,
  stopIndex,
  pageCount,
  itemsLength,
}: {
  page: Ref<number>
  itemsPerPage: Ref<number>
  sortBy: Ref<readonly SortItem[]>
  startIndex: Ref<number>
  stopIndex: Ref<number>
  pageCount: Ref<number>
  itemsLength: Ref<number>
}) => {
  const vm = getCurrentInstance('VDataTable')

  const options = computed(() => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    startIndex: startIndex.value,
    stopIndex: stopIndex.value,
    pageCount: pageCount.value,
    sortBy: sortBy.value,
  }))

  // Reset page when sorting changes
  watch(sortBy, () => {
    page.value = 1
  }, { deep: true })

  // Reset page when items-per-page changes
  watch(itemsPerPage, () => {
    page.value = 1
  })

  watch(options, () => {
    vm.emit('update:options', options.value)
  }, { deep: true })
}

export const VDataTableGroupSymbol: InjectionKey<{
  flatItems: Ref<(DataTableItem | GroupHeaderItem)[]>
  groupedItems: Ref<Map<string, DataTableItem[]>>
  numGroups: Ref<number>
  numHiddenItems: Ref<number>
  opened: Ref<Set<string>>
  toggleGroup: (group: string, value?: boolean) => void
}> = Symbol.for('vuetify:data-table-group')

export function createGroup (items: Ref<DataTableItem[]>, groupBy: Ref<string | undefined>) {
  const opened = ref(new Set<string>())

  const groupedItems = computed(() => {
    const groups = new Map<string, DataTableItem[]>()

    if (!groupBy.value) return groups

    for (const item of items.value) {
      const value = getObjectValueByPath(item.raw, groupBy.value)
      const group = groups.get(value) ?? []
      group.push(item)
      groups.set(value, group)
    }

    return groups
  })

  const flatItems = computed(() => {
    if (!groupBy.value) return items.value

    const flatItems: (DataTableItem | GroupHeaderItem)[] = []

    for (const [key, value] of groupedItems.value.entries()) {
      flatItems.push({ type: 'group-header', groupBy: groupBy.value, groupByValue: key, items: value })
      if (opened.value.has(key)) flatItems.push(...value)
    }

    return flatItems
  })

  const toggleGroup = (group: string, value?: boolean) => {
    const open = value == null ? !opened.value.has(group) : value
    if (open) opened.value.add(group)
    else opened.value.delete(group)
  }

  onBeforeMount(() => {
    for (const key of groupedItems.value.keys()) {
      opened.value.add(key)
    }
  })

  const numGroups = computed(() => [...groupedItems.value.keys()].length)
  const numHiddenItems = computed(() => {
    const hiddenGroups = [...groupedItems.value.keys()].filter(g => !opened.value.has(g))

    return hiddenGroups.reduce((curr, group) => curr + groupedItems.value.get(group)!.length, 0)
  })

  const data = { flatItems, groupedItems, toggleGroup, numGroups, numHiddenItems, opened }

  provide(VDataTableGroupSymbol, data)

  return data
}

export function useGroup () {
  const data = inject(VDataTableGroupSymbol)

  if (!data) throw new Error('Missing group!')

  return data
}

export const VDataTableSelectionSymbol: InjectionKey<{
  toggleSelect: (item: DataTableItem) => void
  select: (item: DataTableItem, value: boolean) => void
  selectAll: (value: boolean) => void
  isSelected: (item: DataTableItem) => boolean
  someSelected: Ref<boolean>
  allSelected: Ref<boolean>
}> = Symbol.for('vuetify:data-table-selection')

type SelectionProps = Pick<ItemProps, 'itemValue'> & { modelValue: any[], 'onUpdate:modelValue': (value: any[]) => void }

export function createSelection (props: SelectionProps, items: Ref<DataTableItem[]>) {
  const selected = useProxiedModel(props, 'modelValue', props.modelValue, v => {
    return new Set(v)
  }, v => {
    return [...v.values()]
  })

  function isSelected (item: DataTableItem) {
    return selected.value.has(item.value)
  }

  function select (item: DataTableItem, value: boolean) {
    if (value) selected.value.add(item.value)
    else selected.value.delete(item.value)
  }

  function toggleSelect (item: DataTableItem) {
    select(item, !isSelected(item))
  }

  function selectAll (value: boolean) {
    items.value.forEach(item => select(item, value))
  }

  const someSelected = computed(() => selected.value.size > 0)
  const allSelected = computed(() => items.value.every(item => isSelected(item)))

  const data = { toggleSelect, select, selectAll, isSelected, someSelected, allSelected }

  provide(VDataTableSelectionSymbol, data)

  return data
}

export function useSelection () {
  const data = inject(VDataTableSelectionSymbol)

  if (!data) throw new Error('Missing selection!')

  return data
}
