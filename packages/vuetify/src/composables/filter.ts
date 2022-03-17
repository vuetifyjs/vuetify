/* eslint-disable max-statements */
/* eslint-disable no-labels */

// Utilities
import { getPropertyFromItem, propsFactory, wrapInArray } from '@/util'
import { computed, unref } from 'vue'

// Types
import type { PropType, Ref } from 'vue'
import type { MaybeRef } from '@/util'

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
  noFilter?: boolean
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
  noFilter: Boolean,
}, 'filter')

export function filterItems<T = Record<string, any>> (
  items: T[],
  query: string,
  options?: {
    customKeyFilter?: FilterKeyFunctions
    default?: FilterFunction
    filterKeys?: FilterKeys
    filterMode?: FilterMode
    noFilter?: boolean
  },
) {
  const array: { item: T, matches: Record<string, FilterMatch> }[] = []
  // always ensure we fall back to a functioning filter
  const filter = options?.default ?? defaultFilter
  const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false
  const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length

  if (!items?.length) return array

  loop:
  for (const item of items) {
    const customMatches: Record<string, FilterMatch> = {}
    const defaultMatches: Record<string, FilterMatch> = {}
    let match: FilterMatch = -1

    if (query && typeof item === 'object' && !options?.noFilter) {
      const filterKeys = keys || Object.keys(item)

      for (const key of filterKeys) {
        const value = getPropertyFromItem(item as any, key, item)
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
    }

    array.push({ item, matches: { ...defaultMatches, ...customMatches } })
  }

  return array
}

export function useFilter<T> (
  props: FilterProps,
  items: MaybeRef<T[]>,
  query?: Ref<string | undefined>,
) {
  const strQuery = computed(() => (
    typeof query?.value !== 'string' &&
    typeof query?.value !== 'number'
  ) ? '' : String(query.value))

  const filteredItems = computed(() => {
    return filterItems(
      unref(items),
      strQuery.value,
      {
        customKeyFilter: props.customKeyFilter,
        default: props.customFilter,
        filterKeys: props.filterKeys,
        filterMode: props.filterMode,
        noFilter: props.noFilter,
      },
    )
  })

  return { filteredItems }
}
