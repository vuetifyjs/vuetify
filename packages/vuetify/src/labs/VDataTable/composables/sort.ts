// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide } from 'vue'
import { getObjectValueByPath, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { InternalItem } from '@/composables/items'
import type { DataTableCompareFunction, DataTableItem, InternalDataTableHeader } from '../types'

export const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array as PropType<SortItem[]>,
    default: () => ([]),
  },
  multiSort: Boolean,
  mustSort: Boolean,
}, 'v-data-table-sort')

const VDataTableSortSymbol: InjectionKey<{
  sortBy: Ref<readonly SortItem[]>
  toggleSort: (key: string) => void
}> = Symbol.for('vuetify:data-table-sort')

export type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }

export function createSort (props: {
  sortBy: SortItem[]
  'onUpdate:sortBy': ((value: any) => void) | undefined
  mustSort: boolean
  multiSort: boolean
}) {
  const sortBy = useProxiedModel(props, 'sortBy')

  const toggleSort = (key: string) => {
    let newSortBy = sortBy.value.map(x => ({ ...x })) ?? []
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

export function useSortedItems (items: Ref<DataTableItem[]>, sortBy: Ref<readonly SortItem[]>, columns: Ref<InternalDataTableHeader[]>) {
  // TODO: Put this in separate prop customKeySort to match filter composable?
  const customSorters = computed(() => {
    return columns.value.reduce<Record<string, DataTableCompareFunction>>((obj, item) => {
      if (item.sort) obj[item.key] = item.sort

      return obj
    }, {})
  })

  const sortedItems = computed(() => {
    if (!sortBy.value.length) return items.value

    return sortItems(items.value, sortBy.value, 'en', customSorters.value)
  })

  return { sortedItems }
}

export function sortItems<T extends InternalItem> (
  items: T[],
  sortByItems: readonly SortItem[],
  locale: string,
  customSorters?: Record<string, DataTableCompareFunction>
): T[] {
  const stringCollator = new Intl.Collator(locale, { sensitivity: 'accent', usage: 'sort' })

  return [...items].sort((a, b) => {
    for (let i = 0; i < sortByItems.length; i++) {
      const sortKey = sortByItems[i].key
      const sortOrder = sortByItems[i].order

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

      // Check if both cannot be evaluated
      if (sortA == null || sortB == null) {
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
