// Utilities
import { computed } from 'vue'
import { isObject, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export interface MaskProps {
  mask: string | MaskOptions | undefined
}

export interface MaskOptions {
  mask: string
  tokens: Record<string, MaskItem>
}

export const makeMaskProps = propsFactory({
  mask: [String, Object] as PropType<string | MaskOptions>,
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

export function useMask (props: MaskProps) {
  const mask = computed(() => {
    if (typeof props.mask === 'string') {
      if (props.mask in presets) return presets[props.mask]
      return props.mask
    }
    return props.mask?.mask ?? ''
  })
  const tokens = computed(() => {
    return {
      ...defaultTokens,
      ...(isObject(props.mask) ? props.mask.tokens : null),
    }
  })

  function isMask (char: string): boolean {
    return char in tokens.value
  }

  function maskValidates (mask: string, char: string): boolean {
    if (char == null || !isMask(mask)) return false
    const item = tokens.value[mask]
    if (item.pattern) return item.pattern.test(char)
    return item.test(char)
  }

  function convert (mask: string, char: string): string {
    const item = tokens.value[mask]
    return item.convert ? item.convert(char) : char
  }

  function maskText (text: string | null | undefined): string {
    const trimmedText = text?.trim().replace(/\s+/g, ' ')

    if (trimmedText == null) return ''

    if (!mask.value.length || !trimmedText.length) return trimmedText

    let textIndex = 0
    let maskIndex = 0
    let newText = ''

    while (maskIndex < mask.value.length) {
      const mchar = mask.value[maskIndex]
      const tchar = trimmedText[textIndex]

      // Escaped character in mask, the next mask character is inserted
      if (mchar === '\\') {
        newText += mask.value[maskIndex + 1]
        maskIndex += 2
        continue
      }

      if (!isMask(mchar)) {
        newText += mchar
        if (tchar === mchar) {
          textIndex++
        }
      } else if (maskValidates(mchar, tchar)) {
        newText += convert(mchar, tchar)
        textIndex++
      } else if (textIndex < trimmedText.length) {
        // No match, try the next input character
        textIndex++
        continue
      } else {
        break
      }

      maskIndex++
    }
    return newText
  }

  function unmaskText (text: string | null): string | null {
    if (text == null) return null

    if (!mask.value.length || !text.length) return text

    let result = ''
    const unmaskMap = getUnmaskMap(text)
    for (let i = 0; i < text.length; i++) {
      if (!unmaskMap[i]) result += text[i]
    }
    return result
  }

  function isDelimiter (text: string, index: number): boolean {
    if (!mask.value.length || !text.length) return false
    return !!getUnmaskMap(text)[index]
  }

  function getUnmaskMap (text: string | null): boolean[] {
    if (text == null || !mask.value.length || !text.length) return []

    let textIndex = 0
    let maskIndex = 0
    const result = Array.from({ length: text.length }, () => true)

    while (true) {
      const mchar = mask.value[maskIndex]
      const tchar = text[textIndex]

      if (tchar == null) break

      if (mchar == null) {
        result[textIndex] = false
        textIndex++
        continue
      }

      // Escaped character in mask, skip the next input character
      if (mchar === '\\') {
        if (tchar === mask.value[maskIndex + 1]) {
          textIndex++
        }
        maskIndex += 2
        continue
      }

      if (maskValidates(mchar, tchar)) {
        // masked char
        result[textIndex] = false
        textIndex++
        maskIndex++
        continue
      } else if (mchar !== tchar) {
        // input doesn't match mask, skip forward until it does
        while (true) {
          const mchar = mask.value[maskIndex++]
          if (mchar == null || maskValidates(mchar, tchar)) break
        }
        continue
      }

      textIndex++
      maskIndex++
    }

    return result
  }

  function isValid (text: string): boolean {
    if (!text) return false

    return unmaskText(text) === unmaskText(maskText(text))
  }

  function isComplete (text: string): boolean {
    if (!text) return false

    const maskedText = maskText(text)
    return maskedText.length === mask.value.length && isValid(text)
  }

  return {
    isDelimiter,
    isValid,
    isComplete,
    mask: maskText,
    unmask: unmaskText,
  }
}
