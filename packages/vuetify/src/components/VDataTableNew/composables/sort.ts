import { useProxiedModel } from '@/composables/proxiedModel'
import { getObjectValueByPath, propsFactory } from '@/util'
import type { InjectionKey, PropType, Ref } from 'vue'
import { computed, inject, provide } from 'vue'
import type { DataTableItem } from '../types'

export const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array as PropType<SortItem[]>,
    default: () => ([]),
  },
}, 'v-data-table-sort')

const VDataTableSortSymbol: InjectionKey<{
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

export function useSortedItems (items: Ref<DataTableItem[]>, sortBy: Ref<readonly SortItem[]>) {
  const sortedItems = computed(() => {
    if (!sortBy.value?.length) return items.value

    return sortItems(items.value, sortBy.value, 'en')
  })

  return { sortedItems }
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
