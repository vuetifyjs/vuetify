// Utilities
import { computed, toValue } from 'vue'

// Types
import type { MaybeRefOrGetter } from 'vue'
import type { FilterMatchArrayMultiple } from '@/composables/filter'

export type HighlightChunk = { text: string, match: boolean }

function matchesToChunks (text: string, matches: FilterMatchArrayMultiple): HighlightChunk[] {
  const chunks: HighlightChunk[] = []
  let cursor = 0

  for (const [start, end] of matches) {
    if (cursor < start) chunks.push({ text: text.slice(cursor, start), match: false })
    chunks.push({ text: text.slice(start, end), match: true })
    cursor = end
  }

  if (cursor < text.length) chunks.push({ text: text.slice(cursor), match: false })

  return chunks
}

function queryToMatches (text: string, query: string | string[], matchAll: boolean, ignoreCase: boolean): FilterMatchArrayMultiple {
  const terms = (Array.isArray(query) ? query : [query]).filter(Boolean)
  const haystack = ignoreCase ? text.toLocaleLowerCase() : text
  const spans: [number, number][] = []

  for (const term of terms) {
    const needle = ignoreCase ? term.toLocaleLowerCase() : term
    let i = haystack.indexOf(needle)

    while (~i) {
      spans.push([i, i + term.length])
      if (!matchAll) break
      i = haystack.indexOf(needle, i + term.length)
    }
  }

  spans.sort((a, b) => a[0] - b[0])

  const merged: [number, number][] = []

  for (const span of spans) {
    const last = merged.at(-1)
    if (last && span[0] <= last[1]) last[1] = Math.max(last[1], span[1])
    else merged.push([...span])
  }

  return merged
}

interface UseHighlightProps {
  text: MaybeRefOrGetter<string>
  query?: MaybeRefOrGetter<string | string[] | undefined>
  matches?: MaybeRefOrGetter<FilterMatchArrayMultiple | undefined>
  matchAll?: MaybeRefOrGetter<boolean | undefined>
  ignoreCase?: MaybeRefOrGetter<boolean | undefined>
}

export function useHighlight (props: UseHighlightProps) {
  return computed<HighlightChunk[]>(() => {
    const text = toValue(props.text)
    const matches = toValue(props.matches)
    const query = toValue(props.query)
    const matchAll = toValue(props.matchAll) ?? false
    const ignoreCase = toValue(props.ignoreCase) ?? false

    if (matches?.length) return matchesToChunks(text, matches)

    if (query) {
      const queryMatches = queryToMatches(text, query, matchAll, ignoreCase)
      return queryMatches.length ? matchesToChunks(text, queryMatches) : [{ text, match: false }]
    }

    return [{ text, match: false }]
  })
}
