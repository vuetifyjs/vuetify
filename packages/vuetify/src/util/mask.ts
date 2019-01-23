export interface MaskItem {
  test: (char: string) => boolean
  convert?: (char: string) => string
}
export type MaskType = '#' | 'A' | 'a' | 'N' | 'n' | 'X'

export const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/

export const isMaskDelimiter = (char: string): boolean => char ? defaultDelimiters.test(char) : false

const allowedMasks: Dictionary<MaskItem> = {
  '#': {
    test: char => /[0-9]/.test(char)
  },
  'A': {
    test: char => /[A-Z]/i.test(char),
    convert: char => char.toUpperCase()
  },
  'a': {
    test: char => /[a-z]/i.test(char),
    convert: char => char.toLowerCase()
  },
  'N': {
    test: char => /[0-9A-Z]/i.test(char),
    convert: char => char.toUpperCase()
  },
  'n': {
    test: char => /[0-9a-z]/i.test(char),
    convert: char => char.toLowerCase()
  },
  'X': {
    test: isMaskDelimiter
  }
}

const isMask = (char: string): boolean => allowedMasks.hasOwnProperty(char)

const convert = (mask: MaskType, char: string): string => {
  return allowedMasks[mask].convert ? allowedMasks[mask].convert!(char) : char
}

const maskValidates = (mask: MaskType, char: string): boolean => {
  if (char == null || !isMask(mask)) return false
  return allowedMasks[mask].test(char)
}

export const maskText = (text: string | null | undefined, masked: string | string[], dontFillMaskBlanks: boolean): string => {
  if (text == null) return ''
  text = String(text)
  if (!masked.length || !text.length) return text
  if (!Array.isArray(masked)) masked = masked.split('')

  let textIndex = 0
  let maskIndex = 0
  let newText = ''

  while (maskIndex < masked.length) {
    const mask = masked[maskIndex]

    // Assign the next character
    const char = text[textIndex]

    // Check if mask is delimiter
    // and current char matches
    if (!isMask(mask) && char === mask) {
      newText += mask
      textIndex++
    // Check if not mask
    } else if (!isMask(mask) && !dontFillMaskBlanks) {
      newText += mask
    // Check if is mask and validates
    } else if (maskValidates(mask as MaskType, char)) {
      newText += convert(mask as MaskType, char)
      textIndex++
    } else {
      return newText
    }

    maskIndex++
  }

  return newText
}

export const unmaskText = (text: string): string => {
  return text ? String(text).replace(new RegExp(defaultDelimiters, 'g'), '') : text
}
