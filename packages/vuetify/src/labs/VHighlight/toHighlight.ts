// Utilities
import { toValue } from 'vue'
import { wrapInArray } from '@/util'

// Types
import type { MaybeRefOrGetter } from 'vue'

export type MatchRange = readonly [number, number]

export interface HighlightChunk {
  text: string
  match: boolean
}

export interface ToHighlightOptions {
  matches?: MaybeRefOrGetter<readonly MatchRange[] | undefined>
  matchAll?: MaybeRefOrGetter<boolean>
  ignoreCase?: MaybeRefOrGetter<boolean>
}

function mergeRanges (ranges: readonly MatchRange[]): MatchRange[] {
  const sorted = ranges
    .filter(span => span[0] < span[1])
    .toSorted((a, b) => a[0] - b[0])
  const merged: [number, number][] = []

  for (const span of sorted) {
    const last = merged.at(-1)
    if (last && span[0] <= last[1]) last[1] = Math.max(last[1], span[1])
    else merged.push([span[0], span[1]])
  }

  return merged
}

function chunkText (text: string, ranges: readonly MatchRange[]): HighlightChunk[] {
  const chunks: HighlightChunk[] = []
  let cursor = 0

  for (const [start, end] of ranges) {
    if (cursor < start) chunks.push({ text: text.slice(cursor, start), match: false })
    chunks.push({ text: text.slice(start, end), match: true })
    cursor = end
  }

  if (cursor < text.length) chunks.push({ text: text.slice(cursor), match: false })

  return chunks
}

function findRanges (text: string, query: string | string[], matchAll: boolean, ignoreCase: boolean): MatchRange[] {
  const terms = wrapInArray(query).filter(Boolean)
  const haystack = ignoreCase ? text.toLocaleLowerCase() : text
  const spans: [number, number][] = []

  for (const term of terms) {
    const needle = ignoreCase ? term.toLocaleLowerCase() : term
    let index = haystack.indexOf(needle)

    if (index !== -1) {
      spans.push([index, index + term.length])
      if (matchAll) {
        index = haystack.indexOf(needle, index + term.length)
        while (index !== -1) {
          spans.push([index, index + term.length])
          index = haystack.indexOf(needle, index + term.length)
        }
      }
    }
  }

  return mergeRanges(spans)
}

// mirror of `toHighlight` from `@vuetify/v0`
// temporary shim, to be replaced in v5.0
export function toHighlight (
  text: MaybeRefOrGetter<string>,
  query?: MaybeRefOrGetter<string | string[] | undefined>,
  options: ToHighlightOptions = {},
): HighlightChunk[] {
  const _text = toValue(text)
  const _query = toValue(query)
  const _matches = toValue(options.matches)
  const matchAll = toValue(options.matchAll) ?? false
  const ignoreCase = toValue(options.ignoreCase) ?? false

  if (_matches?.length) return chunkText(_text, mergeRanges(_matches))

  if (_query) {
    const ranges = findRanges(_text, _query, matchAll, ignoreCase)
    return ranges.length > 0 ? chunkText(_text, ranges) : [{ text: _text, match: false }]
  }

  return [{ text: _text, match: false }]
}
