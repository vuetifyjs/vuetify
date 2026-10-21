// Utilities
import { computed, shallowRef, unref, watchEffect } from 'vue'
import {
  findMatchRanges,
  getPropertyFromItem,
  isBoolean,
  isFunction,
  isNullOrUndefined,
  isNumber,
  isObject,
  isString,
  isUndefined,
  propsFactory,
  wrapInArray,
} from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { IgnoreAccents, MaybeRef } from '@/util'

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
export type FilteredOrder = 'none' | 'prefix'

export interface FilterProps {
  customFilter?: FilterFunction
  customKeyFilter?: FilterKeyFunctions
  filterKeys?: FilterKeys
  filterMode?: FilterMode
  filteredOrder?: FilteredOrder
  ignoreAccents?: IgnoreAccents
  noFilter?: boolean
}

export interface InternalItem<T = any> {
  value: any
  raw: T
  type?: string
}

type FilterResult = {
  index: number
  matches: Record<string, FilterMatchArrayMultiple | undefined>
  type?: 'divider' | 'subheader'
}

// Composables
function getSpans (value: unknown) {
  let offset = 0
  return (Array.isArray(value) ? value : [value]).map(part => {
    const text = String(part ?? '')
    const start = offset
    offset += text.length + 1
    return { text, start, end: start + text.length }
  })
}

export function createDefaultFilter (ignoreAccents?: IgnoreAccents): FilterFunction {
  const options = { ignoreCase: true, ignoreAccents, matchAll: true }

  return (value, query) => {
    if (isNullOrUndefined(value) || isNullOrUndefined(query)) return -1
    if (!query.length) return 0

    const search = query.toString()
    const ranges = Array.isArray(value)
      ? getSpans(value).flatMap(({ text, start }) => (
        findMatchRanges(text, search, options).map(([from, to]) => [from + start, to + start] as const)
      ))
      : findMatchRanges(value.toString(), search, options)

    return ranges.length ? ranges : -1
  }
}

export const defaultFilter: FilterFunction = createDefaultFilter()

function normaliseMatch (match: FilterMatch, query: string): FilterMatchArrayMultiple | undefined {
  if (isNullOrUndefined(match) || isBoolean(match) || match === -1) return
  if (isNumber(match)) return [[match, match + query.length]]
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
  ignoreAccents: [Boolean, String] as PropType<IgnoreAccents>,
  noFilter: Boolean,
}, 'filter')

// eslint-disable-next-line complexity
export function filterItems (
  items: readonly (readonly [item: InternalItem, transformed: {}])[] | readonly InternalItem[],
  query: string,
  options?: {
    customKeyFilter?: FilterKeyFunctions
    default?: FilterFunction
    filterKeys?: FilterKeys
    filterMode?: FilterMode
    ignoreAccents?: IgnoreAccents
    noFilter?: boolean
  },
) {
  const array: FilterResult[] = []
  // always ensure we fall back to a functioning filter
  const filter = options?.default ?? createDefaultFilter(options?.ignoreAccents)
  const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false
  const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length

  if (!items?.length) return array

  let lookAheadItems: FilterResult[] = []

  loop:
  for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]) as readonly [InternalItem, {}]
    const customMatches: Record<string, FilterMatchArrayMultiple | undefined> = {}
    const defaultMatches: Record<string, FilterMatchArrayMultiple | undefined> = {}
    let match: FilterMatch = -1

    if ((query || customFiltersLength > 0) && !options?.noFilter) {
      let hasOnlyCustomFilters = false

      if (isObject(item)) {
        if (item.type === 'divider' || item.type === 'subheader') {
          if (lookAheadItems.at(-1)?.type !== 'divider' || item.type !== 'subheader') {
            // clear unless, divider appears before subheader
            lookAheadItems = []
          }

          lookAheadItems.push({ index: i, matches: { }, type: item.type })
          continue
        }

        const filterKeys = keys || Object.keys(transformed)
        hasOnlyCustomFilters = filterKeys.length === customFiltersLength

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
          (!defaultMatchesLength && customFiltersLength > 0 && !hasOnlyCustomFilters)
        )
      ) continue
    }

    if (lookAheadItems.length) {
      array.push(...lookAheadItems)
      lookAheadItems = []
    }

    array.push({ index: i, matches: { ...defaultMatches, ...customMatches } })
  }

  return array
}

const WORD_BOUNDARY = /[^\p{L}\p{M}\p{N}]/u

function prefixRank (value: unknown, ranges: FilterMatchArrayMultiple) {
  const spans = getSpans(value)
  if (ranges.some(([start, end]) => spans.some(span => span.start === start && span.end === end))) return 0
  if (ranges.some(([start]) => spans.some(span => span.start === start))) return 1
  const text = String(value)
  return ranges.some(([start]) => WORD_BOUNDARY.test(text[start - 1])) ? 2 : 3
}

function sortByPrefix (
  results: FilterResult[],
  items: Parameters<typeof filterItems>[0],
  filterKeys?: FilterKeys,
) {
  let group = 0
  return results
    .map(result => {
      if (result.type) return { result, group: ++group, rank: -1, keyIndex: 0 }

      const [item, transformed = item] = wrapInArray(items[result.index]) as readonly [InternalItem, {}]
      const keys = !isObject(item) ? ['title']
        : filterKeys ? wrapInArray(filterKeys)
        : Object.keys(transformed)
      const [rank, keyIndex] = keys.reduce<[number, number]>((best, key, index) => {
        const ranges = result.matches[key]
        if (!ranges) return best
        const keyRank = prefixRank(isObject(item) ? getPropertyFromItem(transformed, key) : item, ranges)
        return keyRank < best[0] ? [keyRank, index] : best
      }, [4, keys.length])

      return { result, group, rank, keyIndex }
    })
    .sort((a, b) => a.group - b.group || a.rank - b.rank || a.keyIndex - b.keyIndex)
    .map(({ result }) => result)
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
    const _query = isFunction(query) ? query() : unref(query)
    const strQuery = (
      !isString(_query) &&
      !isNumber(_query)
    ) ? '' : String(_query)

    let results = filterItems(
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
        ignoreAccents: props.ignoreAccents,
        noFilter: props.noFilter,
      },
    )

    if (strQuery && props.filteredOrder === 'prefix') {
      results = sortByPrefix(results, transformedItems.value, props.filterKeys)
    }

    const originalItems = unref(items)

    const _filteredItems: typeof filteredItems['value'] = []
    const _filteredMatches: typeof filteredMatches['value'] = new Map()
    results.forEach(({ index, matches }) => {
      const item = originalItems[index]
      _filteredItems.push(item)
      if (!isUndefined(item.value)) {
        _filteredMatches.set(item.value, matches)
      }
    })
    filteredItems.value = _filteredItems
    filteredMatches.value = _filteredMatches
  })

  function getMatches (item: T) {
    return filteredMatches.value.get(item.value)
  }

  return { filteredItems, filteredMatches, getMatches }
}
