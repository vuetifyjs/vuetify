
// Utilities
import { getPropertyFromItem, propsFactory, wrapInArray } from '@/util'
import { computed } from 'vue'

// Types
import type { PropType, Ref } from 'vue'

export type FilterFunction = typeof defaultFilter
export type FilterMode = 'intersection' | 'union'
export type FilterKeys = string | string[]
export type FilterKeysFn = Record<string, FilterFunction>

export interface FilterProps {
  filterFn?: FilterFunction
  filterKeys?: FilterKeys
  filterKeysFn?: FilterKeysFn
  filterMode?: FilterMode
}

// Composables
export function defaultFilter (text: string, query?: string, item?: any) {
  if (typeof query !== 'string') return true
  if (typeof text !== 'string') return false

  return text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
}

export const makeFilterProps = propsFactory({
  filterFn: Function as PropType<FilterFunction>,
  filterKeys: [Array, String] as PropType<FilterKeys>,
  filterKeysFn: Object as PropType<FilterKeysFn>,
  filterMode: {
    type: String as PropType<FilterMode>,
    default: 'intersection',
  },
}, 'filter')

export function filterItems (
  items: (Record<string, any> | string)[],
  query: string,
  options?: {
    default?: FilterFunction
    filterKeys?: FilterKeys
    filterKeysFn?: FilterKeysFn
    mode?: FilterMode
  },
) {
  if (!query) return items

  const array: (typeof items) = []
  const method = options?.mode !== 'union' ? 'some' : 'every'
  const filterFn = options?.default ?? defaultFilter

  for (const item of items) {
    const keys = wrapInArray(options?.filterKeys || Object.keys(item))
    let matched = false

    /* istanbul ignore else */
    if (typeof item === 'object') {
      matched = keys[method](key => {
        const value = getPropertyFromItem(item, key, item)
        const handler = options?.filterKeysFn?.[key] ?? filterFn

        return handler(value, query, item)
      })
    } else if (typeof item === 'string') {
      matched = filterFn(item, query, item)
    }

    if (matched) array.push(item)
  }

  return array
}

export function useFilter (
  props: FilterProps,
  items: Ref<any[]>,
  query?: Ref<string>,
) {
  const strQuery = computed(() => (
    typeof query?.value !== 'string' &&
    typeof query?.value !== 'number'
  ) ? '' : String(query.value))

  const filteredItems = computed(() => filterItems(
    items.value,
    strQuery.value,
    {
      default: props.filterFn,
      filterKeys: props.filterKeys,
      filterKeysFn: props.filterKeysFn,
      mode: props.filterMode,
    },
  ))

  return { filteredItems }
}
