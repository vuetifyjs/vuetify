// Composables
import { useLocale } from '@/composables'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide, toRef, watch } from 'vue'
import { getCurrentInstance, isEmpty, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { DataTableCompareFunction, InternalDataTableHeader } from '../types'
import type { InternalItem } from '@/composables/filter'

export const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array as PropType<readonly SortItem[]>,
    default: () => ([]),
  },
  customKeySort: Object as PropType<Record<string, DataTableCompareFunction>>,
  multiSort: Boolean,
  mustSort: Boolean,
}, 'DataTable-sort')

const VDataTableSortSymbol: InjectionKey<{
  sortBy: Ref<readonly SortItem[]>
  toggleSort: (column: InternalDataTableHeader) => void
  isSorted: (column: InternalDataTableHeader) => boolean
}> = Symbol.for('vuetify:data-table-sort')

export type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }

type SortProps = {
  sortBy: readonly SortItem[]
  'onUpdate:sortBy': ((value: any) => void) | undefined
  mustSort: boolean
  multiSort: boolean
}

export function createSort (props: SortProps) {
  const sortBy = useProxiedModel(props, 'sortBy')
  const mustSort = toRef(props, 'mustSort')
  const multiSort = toRef(props, 'multiSort')

  return { sortBy, mustSort, multiSort }
}

export function provideSort (options: {
  sortBy: Ref<readonly SortItem[]>
  mustSort: Ref<boolean>
  multiSort: Ref<boolean>
  page?: Ref<number>
}) {
  const { sortBy, mustSort, multiSort, page } = options

  const toggleSort = (column: InternalDataTableHeader) => {
    if (column.key == null) return

    let newSortBy = sortBy.value.map(x => ({ ...x })) ?? []
    const item = newSortBy.find(x => x.key === column.key)

    if (!item) {
      if (multiSort.value) newSortBy = [...newSortBy, { key: column.key, order: 'asc' }]
      else newSortBy = [{ key: column.key, order: 'asc' }]
    } else if (item.order === 'desc') {
      if (mustSort.value) {
        item.order = 'asc'
      } else {
        newSortBy = newSortBy.filter(x => x.key !== column.key)
      }
    } else {
      item.order = 'desc'
    }

    sortBy.value = newSortBy
    if (page) page.value = 1
  }

  function isSorted (column: InternalDataTableHeader) {
    return !!sortBy.value.find(item => item.key === column.key)
  }

  const data = { sortBy, toggleSort, isSorted }

  provide(VDataTableSortSymbol, data)

  return data
}

export function useSort () {
  const data = inject(VDataTableSortSymbol)

  if (!data) throw new Error('Missing sort!')

  return data
}

// TODO: abstract into project composable
export function useSortedItems <T extends InternalItem> (
  props: { customKeySort: Record<string, DataTableCompareFunction> | undefined },
  items: Ref<T[]>,
  sortBy: Ref<readonly SortItem[]>,
  options?: {
    transform?: (item: T) => {}
    sortFunctions?: Ref<Record<string, DataTableCompareFunction> | undefined>
    sortRawFunctions?: Ref<Record<string, DataTableCompareFunction> | undefined>
  },
) {
  const vm = getCurrentInstance('userSortedItems')
  const locale = useLocale()
  const sortedItems = computed(() => {
    if (!sortBy.value.length) return items.value

    return sortItems(items.value, sortBy.value, locale.current.value, {
      transform: options?.transform,
      sortFunctions: {
        ...props.customKeySort,
        ...options?.sortFunctions?.value,
      },
      sortRawFunctions: options?.sortRawFunctions?.value,
    })
  })

  watch(sortedItems, val => {
    vm.emit('update:sortedItems', val)
  })


  return { sortedItems }
}

export function sortItems<T extends InternalItem> (
  items: T[],
  sortByItems: readonly SortItem[],
  locale: string,
  options?: {
    transform?: (item: T) => Record<string, any>
    sortFunctions?: Record<string, DataTableCompareFunction>
    sortRawFunctions?: Record<string, DataTableCompareFunction>
  },
): T[] {
  const stringCollator = new Intl.Collator(locale, { sensitivity: 'accent', usage: 'sort' })

  const transformedItems = items.map(item => (
    [item, options?.transform ? options.transform(item) : item as never] as const)
  )

  return transformedItems.sort((a, b) => {
    for (let i = 0; i < sortByItems.length; i++) {
      let hasCustomResult = false
      const sortKey = sortByItems[i].key
      const sortOrder = sortByItems[i].order ?? 'asc'

      if (sortOrder === false) continue

      let sortA = a[1][sortKey]
      let sortB = b[1][sortKey]
      let sortARaw = a[0].raw
      let sortBRaw = b[0].raw

      if (sortOrder === 'desc') {
        [sortA, sortB] = [sortB, sortA]
        ;[sortARaw, sortBRaw] = [sortBRaw, sortARaw]
      }

      if (options?.sortRawFunctions?.[sortKey]) {
        const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw)

        if (customResult == null) continue
        hasCustomResult = true
        if (customResult) return customResult
      }

      if (options?.sortFunctions?.[sortKey]) {
        const customResult = options.sortFunctions[sortKey](sortA, sortB)

        if (customResult == null) continue
        hasCustomResult = true
        if (customResult) return customResult
      }

      if (hasCustomResult) continue

      // Dates should be compared numerically
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime()
      }

      [sortA, sortB] = [sortA, sortB].map(s => s != null ? s.toString().toLocaleLowerCase() : s)

      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0
        if (isEmpty(sortA)) return -1
        if (isEmpty(sortB)) return 1
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
        return stringCollator.compare(sortA, sortB)
      }
    }

    return 0
  }).map(([item]) => item)
}
