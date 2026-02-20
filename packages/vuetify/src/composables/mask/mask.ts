// Utilities
import { computed } from 'vue'
import { isObject, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export type MaskValue = string | MaskOptions

export interface MaskProps {
  mask: MaskValue | MaskValue[] | undefined
}

export interface MaskOptions {
  mask: string
  tokens: Record<string, MaskItem>
}

interface MaskResult {
  output: string
  consumed: number
  complete: boolean
}

interface SelectionResult {
  result: MaskResult
  pattern: string
  tokens: Record<string, MaskItem>
}

export const makeMaskProps = propsFactory({
  mask: [String, Object, Array] as PropType<MaskValue | MaskValue[]>,
}, 'mask')

export type MaskItem = {
  convert?: (char: string) => string
} & ({
  pattern?: never
  test: (char: string) => boolean
} | {
  pattern: RegExp
  test?: never
})

export const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/

const presets: Record<string, string> = {
  'credit-card': '#### - #### - #### - ####',
  date: '##/##/####',
  'date-time': '##/##/#### ##:##',
  'iso-date': '####-##-##',
  'iso-date-time': '####-##-## ##:##',
  phone: '(###) ### - ####',
  social: '###-##-####',
  time: '##:##',
  'time-with-seconds': '##:##:##',
}

export function isMaskDelimiter (char: string): boolean {
  return char ? defaultDelimiters.test(char) : false
}

const defaultTokens: Record<string, MaskItem> = {
  '#': {
    pattern: /[0-9]/,
  },
  A: {
    pattern: /[A-Z]/i,
    convert: v => v.toUpperCase(),
  },
  a: {
    pattern: /[a-z]/i,
    convert: v => v.toLowerCase(),
  },
  N: {
    pattern: /[0-9A-Z]/i,
    convert: v => v.toUpperCase(),
  },
  n: {
    pattern: /[0-9a-z]/i,
    convert: v => v.toLowerCase(),
  },
  X: {
    pattern: defaultDelimiters,
  },
}

function normalizeMaskValue (value: MaskValue): string {
  if (typeof value === 'string') {
    return value in presets ? presets[value] : value
  }
  return value?.mask ?? ''
}

function getTokensFromMaskValue (value: MaskValue | undefined): Record<string, MaskItem> {
  return {
    ...defaultTokens,
    ...(isObject(value) && 'tokens' in value ? value.tokens : null),
  }
}

export function useMask (props: MaskProps) {
  const masks = computed(() => {
    if (props.mask == null) return []
    if (Array.isArray(props.mask)) {
      return props.mask.map(m => ({
        pattern: normalizeMaskValue(m),
        tokens: getTokensFromMaskValue(m),
      }))
    }
    return [{
      pattern: normalizeMaskValue(props.mask),
      tokens: getTokensFromMaskValue(props.mask),
    }]
  })

  function isMask (char: string, tokens: Record<string, MaskItem>): boolean {
    return char in tokens
  }

  function maskValidates (mask: string, char: string, tokens: Record<string, MaskItem>): boolean {
    if (char == null || !isMask(mask, tokens)) return false
    const item = tokens[mask]
    if (item.pattern) return item.pattern.test(char)
    return item.test(char)
  }

  function convert (mask: string, char: string, tokens: Record<string, MaskItem>): string {
    const item = tokens[mask]
    return item.convert ? item.convert(char) : char
  }

  function applyMaskWithInfo (text: string, pattern: string, tokens: Record<string, MaskItem>): MaskResult {
    if (!pattern.length) {
      return { output: text, consumed: text.length, complete: true }
    }
    if (!text.length) {
      return { output: '', consumed: 0, complete: false }
    }

    let textIndex = 0
    let maskIndex = 0
    let newText = ''

    while (maskIndex < pattern.length) {
      const mchar = pattern[maskIndex]
      const tchar = text[textIndex]

      // Escaped character in mask, the next mask character is inserted
      if (mchar === '\\') {
        newText += pattern[maskIndex + 1]
        maskIndex += 2
        continue
      }

      if (!isMask(mchar, tokens)) {
        newText += mchar
        if (tchar === mchar) {
          textIndex++
        }
      } else if (maskValidates(mchar, tchar, tokens)) {
        newText += convert(mchar, tchar, tokens)
        textIndex++
      } else {
        break
      }

      maskIndex++
    }

    return {
      output: newText,
      consumed: textIndex,
      complete: newText.length === pattern.length,
    }
  }

  function applyMask (text: string, pattern: string, tokens: Record<string, MaskItem>): string {
    return applyMaskWithInfo(text, pattern, tokens).output
  }

  function applyUnmask (text: string, pattern: string, tokens: Record<string, MaskItem>): string {
    if (!pattern.length || !text.length) return text

    let textIndex = 0
    let maskIndex = 0
    let newText = ''

    while (true) {
      const mchar = pattern[maskIndex]
      const tchar = text[textIndex]

      if (tchar == null) break

      if (mchar == null) {
        newText += tchar
        textIndex++
        continue
      }

      // Escaped character in mask, skip the next input character
      if (mchar === '\\') {
        if (tchar === pattern[maskIndex + 1]) {
          textIndex++
        }
        maskIndex += 2
        continue
      }

      if (maskValidates(mchar, tchar, tokens)) {
        // masked char
        newText += tchar
        textIndex++
        maskIndex++
        continue
      } else if (mchar !== tchar) {
        // input doesn't match mask, skip forward until it does
        while (true) {
          const mchar = pattern[maskIndex++]
          if (mchar == null || maskValidates(mchar, tchar, tokens)) break
        }
        continue
      }

      textIndex++
      maskIndex++
    }
    return newText
  }

  function isValidForMask (text: string, pattern: string, tokens: Record<string, MaskItem>): boolean {
    if (!text) return false
    const masked = applyMask(text, pattern, tokens)
    const unmasked = applyUnmask(text, pattern, tokens)
    const unmaskedFromMasked = applyUnmask(masked, pattern, tokens)
    return unmasked === unmaskedFromMasked
  }

  function isCompleteForMask (text: string, pattern: string, tokens: Record<string, MaskItem>): boolean {
    if (!text) return false
    const masked = applyMask(text, pattern, tokens)
    return masked.length === pattern.length && isValidForMask(text, pattern, tokens)
  }

  // based on: consumed > complete > first
  function isBestMask (candidate: MaskResult, current: MaskResult): boolean {
    return candidate.consumed > current.consumed ||
      (candidate.consumed === current.consumed && candidate.complete && !current.complete)
  }

  function selectBestMask (text: string): SelectionResult | null {
    if (masks.value.length === 0) return null

    let best: SelectionResult | null = null

    for (const { pattern, tokens } of masks.value) {
      const result = applyMaskWithInfo(text, pattern, tokens)
      if (!best || isBestMask(result, best.result)) {
        best = { result, pattern, tokens }
      }
    }

    return best
  }

  function maskText (text: string | null | undefined): string {
    const trimmedText = text?.trim().replace(/\s+/g, ' ')
    if (trimmedText == null) return ''

    const best = selectBestMask(trimmedText)
    return best?.result.output ?? trimmedText
  }

  function getBestMask (text: string | null | undefined): string | null {
    const trimmedText = text?.trim().replace(/\s+/g, ' ')
    if (trimmedText == null) return null

    return selectBestMask(trimmedText)?.pattern ?? null
  }

  function unmaskText (text: string | null): string | null {
    if (text == null) return null
    if (masks.value.length === 0) return text

    let best: SelectionResult | null = null

    for (const { pattern, tokens } of masks.value) {
      const unmasked = applyUnmask(text, pattern, tokens)
      const result = applyMaskWithInfo(unmasked, pattern, tokens)
      if (!best || isBestMask(result, best.result)) {
        best = { result, pattern, tokens }
      }
    }

    return best ? applyUnmask(text, best.pattern, best.tokens) : text
  }

  function isValid (text: string): boolean {
    if (!text) return false

    if (masks.value.length === 0) return true

    return masks.value.some(({ pattern, tokens }) =>
      isValidForMask(text, pattern, tokens)
    )
  }

  function isComplete (text: string): boolean {
    if (!text) return false

    if (masks.value.length === 0) return false

    return masks.value.some(({ pattern, tokens }) =>
      isCompleteForMask(text, pattern, tokens)
    )
  }

  return {
    isValid,
    isComplete,
    mask: maskText,
    unmask: unmaskText,
    getMask: getBestMask,
  }
}
