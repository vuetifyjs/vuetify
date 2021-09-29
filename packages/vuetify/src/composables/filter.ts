
// Utilities
import { getPropertyFromItem, propsFactory, wrapInArray } from '@/util'
import { computed } from 'vue'

// Types
import type { PropType, Ref } from 'vue'

export type FilterFunction = typeof defaultFilter

export interface FilterProps {
  filterFn?: FilterFunction
  filterMode?: 'intersection' | 'union'
}

// Composables
export function defaultFilter (text: string, query?: string) {
  if (typeof query !== 'string') return true
  if (typeof text !== 'string') return false

  return text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
}

export const makeFilterProps = propsFactory({
  filterFn: Function as PropType<FilterFunction>,
  filterMode: {
    type: String as PropType<'intersection' | 'union'>,
    default: 'intersection',
  },
}, 'filter')

export function filterItems (
  items: any[],
  filterKeys: (string | string[]),
  filterMode: 'intersection' | 'union' = 'intersection',
  query?: string,
  filter?: FilterFunction,
  filterKeyFns?: Record<string, FilterFunction>
) {
  const keys = wrapInArray(filterKeys)

  if (!query || !keys.length) return items

  const array: (typeof items) = []
  const method = filterMode === 'intersection' ? 'some' : 'every'

  for (const item of items) {
    const matched = keys[method](key => {
      const value = getPropertyFromItem(item, key, item)
      const handler = filterKeyFns?.[key] ?? filter ?? defaultFilter

      return handler(value, query)
    })

    if (matched) array.push(item)
  }

  return array
}

export function useFilter (
  props: FilterProps,
  items: Ref<any[]>,
  filterKeys: (string | string[]),
  query?: Ref<string>,
  filterKeyFns?: Record<string, FilterFunction>
) {
  const strQuery = computed(() => (
    typeof query?.value !== 'string' &&
    typeof query?.value !== 'number'
  ) ? '' : String(query.value))

  const filteredItems = computed(() => filterItems(
    items.value,
    filterKeys,
    props.filterMode,
    strQuery.value,
    props.filterFn,
    filterKeyFns,
  ))

  return { filteredItems }
}
