
// Utilities
import { getPropertyFromItem, propsFactory, wrapInArray } from '@/util'
import { computed } from 'vue'

// Types
import type { PropType, Ref } from 'vue'

export type FilterFunction = typeof defaultFilter

export interface FilterProps {
  filterFn?: FilterFunction
}

// Composables
export function defaultFilter (text: string, query?: string) {
  if (typeof query !== 'string') return true
  if (typeof text !== 'string') return false

  return text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
}

export const makeFilterProps = propsFactory({
  filterFn: Function as PropType<FilterFunction>,
}, 'filter')

export function filterItems (
  items: any[],
  filterKeys: (string | string[]),
  query?: string,
  filter?: FilterFunction,
  filterKeyFns?: Record<string, FilterFunction>
) {
  const keys = wrapInArray(filterKeys)

  if (!query || !keys.length) return items

  const array: (typeof items) = []

  for (const item of items) {
    for (const key of keys) {
      const value = getPropertyFromItem(item, key, item)
      const handler = filterKeyFns?.[key] ?? filter ?? defaultFilter

      if (handler(value, query)) {
        array.push(item)

        break
      }
    }
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
    strQuery.value,
    props.filterFn,
    filterKeyFns,
  ))

  return { filteredItems }
}
