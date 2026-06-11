/**
 * Fold accents before matching:
 * - `'query'` — only the query (typing `café` finds plain `cafe`)
 * - `'target'` — only the target (typing `cafe` finds accented `café`)
 * - `true` — both sides, `false` — neither
 */
export type IgnoreAccents = boolean | 'query' | 'target'

const COMBINING_MARKS = /[̀-ͯ]/g

// Letters that carry no combining mark, so NFD leaves them untouched.
const SPECIAL_LETTERS: Record<string, string> = {
  ł: 'l',
  ø: 'o',
  đ: 'd',
  ð: 'd',
  þ: 'th',
  ħ: 'h',
  ŧ: 't',
  ŋ: 'n',
  ß: 'ss',
  æ: 'ae',
  œ: 'oe',
  ı: 'i',
  Ł: 'L',
  Ø: 'O',
  Đ: 'D',
  Ð: 'D',
  Þ: 'Th',
  Ħ: 'H',
  Ŧ: 'T',
  Ŋ: 'N',
  ẞ: 'Ss',
  Æ: 'Ae',
  Œ: 'Oe',
}

const SPECIAL_LETTER = new RegExp(`[${Object.keys(SPECIAL_LETTERS).join('')}]`, 'g')

function fold (str: string) {
  return str
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(SPECIAL_LETTER, char => SPECIAL_LETTERS[char])
}

// Fold per character and record each output unit's source index, so ranges can
// map back to the original. Decomposition and lowercasing both change length,
// so a straight indexOf on the folded string would otherwise misalign.
function foldWithMap (str: string, lowerCase: boolean) {
  let folded = ''
  const map: number[] = []

  for (let i = 0; i < str.length; i++) {
    const chunk = fold(lowerCase ? str[i].toLocaleLowerCase() : str[i])

    for (let j = 0; j < chunk.length; j++) {
      folded += chunk[j]
      map.push(i)
    }
  }

  map.push(str.length)

  return { folded, map }
}

function collectRanges (haystack: string, needle: string, matchAll: boolean) {
  const ranges: [number, number][] = []
  let index = haystack.indexOf(needle)

  while (~index) {
    ranges.push([index, index + needle.length])

    if (!matchAll) break

    index = haystack.indexOf(needle, index + needle.length)
  }

  return ranges
}

export function findMatchRanges (
  text: string,
  query: string,
  options: {
    ignoreCase?: boolean
    ignoreAccents?: IgnoreAccents
    all?: boolean
  } = {},
): [number, number][] {
  const { ignoreCase = false, ignoreAccents = false, all = false } = options

  const foldQuery = ignoreAccents === true || ignoreAccents === 'query'
  const foldTarget = ignoreAccents === true || ignoreAccents === 'target'

  let needle = foldQuery ? fold(query) : query
  if (ignoreCase) needle = needle.toLocaleLowerCase()

  if (!needle.length) return []

  // Fast path: the target is untouched, so folded and lowercased indices line
  // up with the original and no mapping is required.
  if (!foldTarget) {
    const haystack = ignoreCase ? text.toLocaleLowerCase() : text

    return collectRanges(haystack, needle, all)
  }

  const { folded, map } = foldWithMap(text, ignoreCase)

  return collectRanges(folded, needle, all).map(([start, end]) => [map[start], map[end]])
}
