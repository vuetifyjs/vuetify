/* eslint-disable max-statements */
/* eslint-disable no-labels */

// Utilities
import { getPropertyFromItem, propsFactory, wrapInArray, wrapInRef } from '@/util'
import { computed } from 'vue'

// Types
import type { PropType, Ref } from 'vue'

export type FilterFunction = (value: string, query: string, item?: any) => FilterMatch
export type FilterKeyFunctions = Record<string, FilterFunction>
export type FilterKeys = string | string[]
export type FilterMatch = number | [number, number] | [number, number][] | boolean
export type FilterMode = 'some' | 'every' | 'union' | 'intersection'

export interface FilterProps {
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  filterKeys?: FilterKeys
  filterMode?: FilterMode
}

// Composables
export const defaultFilter: FilterFunction = (value, query, item) => {
  if (value == null || query == null) return -1

  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase())
}

export const makeFilterProps = propsFactory({
  customFilter: Function as PropType<FilterFunction>,
  customKeyFilter: Object as PropType<FilterKeyFunctions>,
  filterKeys: [Array, String] as PropType<FilterKeys>,
  filterMode: {
    type: String as PropType<FilterMode>,
    default: 'intersection',
  },
}, 'filter')

export function filterItems (
  items: (Record<string, any> | string)[],
  query: string,
  options?: {
    customKeyFilter?: FilterKeyFunctions
    default?: FilterFunction
    filterKeys?: FilterKeys
    filterMode?: FilterMode
  },
) {
  const array: (typeof items) = []
  // always ensure we fallback
  // to a functioning filter
  const filter = options?.default ?? defaultFilter
  const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false
  const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length

  if (!items?.length) return array

  loop:
  for (const item of items) {
    const customMatches: Record<string, FilterMatch> = {}
    let defaultMatches: Record<string, FilterMatch> | FilterMatch[] = {}
    let match: FilterMatch = -1

    if (typeof item === 'object') {
      const filterKeys = keys || Object.keys(item)

      for (const key of filterKeys) {
        const value = getPropertyFromItem(item, key, item)
        const keyFilter = options?.customKeyFilter?.[key]

        match = keyFilter
          ? keyFilter(value, query, item)
          : filter(value, query, item)

        if (match !== -1 && match !== false) {
          if (keyFilter) customMatches[key] = match
          else defaultMatches[key] = match
        } else if (options?.filterMode === 'every') {
          continue loop
        }
      }

      const defaultMatchesLength = Object.keys(defaultMatches).length
      const customMatchesLength = Object.keys(customMatches).length

      if (!defaultMatchesLength && !customMatchesLength) continue

      if (
        options?.filterMode === 'union' &&
        customMatchesLength !== customFiltersLength &&
        !defaultMatchesLength
      ) continue

      if (
        options?.filterMode === 'intersection' &&
        (
          customMatchesLength !== customFiltersLength ||
          !defaultMatchesLength
        )
      ) continue
    } else if (typeof item === 'string') {
      match = filter(item, query, item)

      if (match === -1 || match === false) continue

      defaultMatches = wrapInArray(match)
    }

    array.push({ item, matches: { ...defaultMatches, ...customMatches } })
  }

  return array
}

export function useFilter (
  props: FilterProps,
  items: Ref<any[]> | any[],
  query?: Ref<string>,
) {
  const strQuery = computed(() => (
    typeof query?.value !== 'string' &&
    typeof query?.value !== 'number'
  ) ? '' : String(query.value))

  const filteredItems = computed(() => {
    return filterItems(
      wrapInRef(items).value,
      strQuery.value,
      {
        customKeyFilter: props.customKeyFilter,
        default: props.customFilter,
        filterKeys: props.filterKeys,
        filterMode: props.filterMode,
      },
    )
  })

  return { filteredItems }
}
