// Composables
import { useLocale } from '@/composables'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide, toRef } from 'vue'
import { getObjectValueByPath, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { DataTableCompareFunction, InternalDataTableHeader } from '../types'

export const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array as PropType<readonly SortItem[]>,
    default: () => ([]),
  },
  customKeySort: Object as PropType<Record<string, DataTableCompareFunction>>,
  multiSort: Boolean,
  mustSort: Boolean,
}, 'v-data-table-sort')

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

export function useSortedItems <T extends Record<string, any>> (
  props: { customKeySort?: Record<string, DataTableCompareFunction> },
  items: Ref<T[]>,
  sortBy: Ref<readonly SortItem[]>,
) {
  const locale = useLocale()
  const sortedItems = computed(() => {
    if (!sortBy.value.length) return items.value

    return sortItems(items.value, sortBy.value, locale.current.value, props.customKeySort)
  })

  return { sortedItems }
}

export function sortItems<T extends Record<string, any>> (
  items: T[],
  sortByItems: readonly SortItem[],
  locale: string,
  customSorters?: Record<string, DataTableCompareFunction>
): T[] {
  const stringCollator = new Intl.Collator(locale, { sensitivity: 'accent', usage: 'sort' })

  return [...items].sort((a, b) => {
    for (let i = 0; i < sortByItems.length; i++) {
      const sortKey = sortByItems[i].key
      const sortOrder = sortByItems[i].order ?? 'asc'

      if (sortOrder === false) continue

      let sortA = getObjectValueByPath(a.raw, sortKey)
      let sortB = getObjectValueByPath(b.raw, sortKey)

      if (sortOrder === 'desc') {
        [sortA, sortB] = [sortB, sortA]
      }

      if (customSorters?.[sortKey]) {
        const customResult = customSorters[sortKey](sortA, sortB)

        if (!customResult) continue

        return customResult
      }

      // Dates should be compared numerically
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime()
      }

      [sortA, sortB] = [sortA, sortB].map(s => s != null ? s.toString().toLocaleLowerCase() : s)

      if (sortA !== sortB) {
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
        return stringCollator.compare(sortA, sortB)
      }
    }

    return 0
  })
}
