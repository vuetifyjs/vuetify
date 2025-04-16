/* eslint-disable max-statements */
/* eslint-disable no-labels */

// Utilities
import { computed, shallowRef, unref, watchEffect } from 'vue'
import { getPropertyFromItem, propsFactory, wrapInArray } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { MaybeRef } from '@/util'

/**
 * - boolean: match without highlight
 * - number: single match (index), length already known
 * - []: single match (start, end)
 * - [][]: multiple matches (start, end), shouldn't overlap
 */
export type FilterMatchArraySingle = readonly [number, number]
export type FilterMatchArrayMultiple = readonly FilterMatchArraySingle[]
export type FilterMatchArray = FilterMatchArraySingle | FilterMatchArrayMultiple
export type FilterMatch = boolean | number | FilterMatchArray
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
  if (!query.length) return 0

  value = value.toString().toLocaleLowerCase()
  query = query.toString().toLocaleLowerCase()

  const result = []
  let idx = value.indexOf(query)
  while (~idx) {
    result.push([idx, idx + query.length] as const)

    idx = value.indexOf(query, idx + query.length)
  }

  return result.length ? result : -1
}

function normaliseMatch (match: FilterMatch, query: string): FilterMatchArrayMultiple | undefined {
  if (match == null || typeof match === 'boolean' || match === -1) return
  if (typeof match === 'number') return [[match, match + query.length]]
  if (Array.isArray(match[0])) return match as FilterMatchArrayMultiple
  return [match] as FilterMatchArrayMultiple
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
  const array: { index: number, matches: Record<string, FilterMatchArrayMultiple | undefined> }[] = []
  // always ensure we fall back to a functioning filter
  const filter = options?.default ?? defaultFilter
  const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false
  const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length

  if (!items?.length) return array

  loop:
  for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]) as readonly [InternalItem, {}]
    const customMatches: Record<string, FilterMatchArrayMultiple | undefined> = {}
    const defaultMatches: Record<string, FilterMatchArrayMultiple | undefined> = {}
    let match: FilterMatch = -1

    if ((query || customFiltersLength > 0) && !options?.noFilter) {
      if (typeof item === 'object') {
        const filterKeys = keys || Object.keys(transformed)

        for (const key of filterKeys) {
          const value = getPropertyFromItem(transformed, key)
          const keyFilter = options?.customKeyFilter?.[key]

          match = keyFilter
            ? keyFilter(value, query, item)
            : filter(value, query, item)

          if (match !== -1 && match !== false) {
            if (keyFilter) customMatches[key] = normaliseMatch(match, query)
            else defaultMatches[key] = normaliseMatch(match, query)
          } else if (options?.filterMode === 'every') {
            continue loop
          }
        }
      } else {
        match = filter(item, query, item)
        if (match !== -1 && match !== false) {
          defaultMatches.title = normaliseMatch(match, query)
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
  const filteredItems = shallowRef<T[]>([])
  const filteredMatches = shallowRef(new Map<unknown, Record<string, FilterMatchArrayMultiple | undefined>>())
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

export function highlightResult (name: string, text: string, matches: FilterMatchArrayMultiple | undefined) {
  if (matches == null || !matches.length) return text

  return matches.map((match, i) => {
    const start = i === 0 ? 0 : matches[i - 1][1]
    const result = [
      <span class={ `${name}__unmask` }>{ text.slice(start, match[0]) }</span>,
      <span class={ `${name}__mask` }>{ text.slice(match[0], match[1]) }</span>,
    ]
    if (i === matches.length - 1) {
      result.push(<span class={ `${name}__unmask` }>{ text.slice(match[1]) }</span>)
    }
    return <>{ result }</>
  })
}
