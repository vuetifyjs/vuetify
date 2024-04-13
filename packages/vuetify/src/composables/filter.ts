/* eslint-disable max-statements */
/* eslint-disable no-labels */

// Utilities
import { computed, ref, unref, watchEffect } from 'vue'
import { getPropertyFromItem, propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { MaybeRef } from '@/util'

/**
 * - match without highlight
 * - single match (index), length already known
 * - single match (start, end)
 * - multiple matches (start, end), probably shouldn't overlap
 */
export type FilterMatch = boolean | number | [number, number] | [number, number][]
export type FilterFunction = (value: string, query: string, item?: InternalItem) => FilterMatch
export type FilterKeyFunctions = Record<string, FilterFunction>
export type FilterKeys = string | string[]
export type FilterMode = 'some' | 'every' | 'union' | 'intersection'

export interface FilterProps {
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  filterKeys?: FilterKeys
  filterMode?: FilterMode
  noFilter?: boolean
}

export interface InternalItem<T = any> {
  value: any
  raw: T
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

export function filterItems (
  items: readonly (readonly [item: InternalItem, transformed: {}])[] | readonly InternalItem[],
  query: string,
  options?: {
    customKeyFilter?: FilterKeyFunctions
    default?: FilterFunction
    filterKeys?: FilterKeys
    filterMode?: FilterMode
    noFilter?: boolean
  },
) {
  const array: { index: number, matches: Record<string, FilterMatch> }[] = []
  // always ensure we fall back to a functioning filter
  const filter = options?.default ?? defaultFilter
  const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false
  const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length

  if (!items?.length) return array

  loop:
  for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]) as readonly [InternalItem, {}]
    const customMatches: Record<string, FilterMatch> = {}
    const defaultMatches: Record<string, FilterMatch> = {}
    let match: FilterMatch = -1

    if (query && !options?.noFilter) {
      if (typeof item === 'object') {
        const filterKeys = keys || Object.keys(transformed)

        for (const key of filterKeys) {
          const value = getPropertyFromItem(transformed, key)
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
      } else {
        match = filter(item, query, item)
        if (match !== -1 && match !== false) {
          defaultMatches.title = match
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

    array.push({ index: i, matches: { ...defaultMatches, ...customMatches } })
  }

  return array
}

export function useFilter <T extends InternalItem> (
  props: FilterProps,
  items: MaybeRef<T[]>,
  query: Ref<string | undefined> | (() => string | undefined),
  options?: {
    transform?: (item: T) => {}
    customKeyFilter?: MaybeRef<FilterKeyFunctions | undefined>
  }
) {
  const filteredItems: Ref<T[]> = ref([])
  const filteredMatches: Ref<Map<unknown, Record<string, FilterMatch>>> = ref(new Map())
  const transformedItems = computed(() => (
    options?.transform
      ? unref(items).map(item => ([item, options.transform!(item)] as const))
      : unref(items)
  ))

  watchEffect(() => {
    const _query = typeof query === 'function' ? query() : unref(query)
    const strQuery = (
      typeof _query !== 'string' &&
      typeof _query !== 'number'
    ) ? '' : String(_query)

    const results = filterItems(
      transformedItems.value,
      strQuery,
      {
        customKeyFilter: {
          ...props.customKeyFilter,
          ...unref(options?.customKeyFilter),
        },
        default: props.customFilter,
        filterKeys: props.filterKeys,
        filterMode: props.filterMode,
        noFilter: props.noFilter,
      },
    )

    const originalItems = unref(items)

    const _filteredItems: typeof filteredItems['value'] = []
    const _filteredMatches: typeof filteredMatches['value'] = new Map()
    results.forEach(({ index, matches }) => {
      const item = originalItems[index]
      _filteredItems.push(item)
      _filteredMatches.set(item.value, matches)
    })
    filteredItems.value = _filteredItems
    filteredMatches.value = _filteredMatches
  })

  function getMatches (item: T) {
    return filteredMatches.value.get(item.value)
  }

  return { filteredItems, filteredMatches, getMatches }
}
