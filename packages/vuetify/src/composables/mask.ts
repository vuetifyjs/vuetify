// Utilities
import { computed, ref, watch } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

export interface MaskProps {
  mask: string | undefined
}

export const makeMaskProps = propsFactory({
  mask: String,
}, 'mask')

export interface MaskItem {
  test: (char: string) => boolean
  convert?: (char: string) => string
}

export const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/

export type MaskType = '#' | 'A' | 'a' | 'N' | 'n' | 'X'

export const isMaskDelimiter = (char: string): boolean => char ? defaultDelimiters.test(char) : false

const allowedMasks: Record<MaskType, MaskItem> = {
  '#': {
    test: (char: string) => /[0-9]/.test(char),
  },
  A: {
    test: (char: string) => /[A-Z]/i.test(char),
    convert: (char: string) => char.toUpperCase(),
  },
  a: {
    test: (char: string) => /[a-z]/i.test(char),
    convert: (char: string) => char.toLowerCase(),
  },
  N: {
    test: (char: string) => /[0-9A-Z]/i.test(char),
    convert: (char: string) => char.toUpperCase(),
  },
  n: {
    test: (char: string) => /[0-9a-z]/i.test(char),
    convert: (char: string) => char.toLowerCase(),
  },
  X: {
    test: isMaskDelimiter,
  },
}

const isMask = (char: string): boolean => allowedMasks.hasOwnProperty(char)

const maskValidates = (mask: MaskType, char: string): boolean => {
  if (char == null || !isMask(mask)) return false
  return allowedMasks[mask].test(char)
}

const convert = (mask: MaskType, char: string): string => {
  return allowedMasks[mask].convert ? allowedMasks[mask].convert!(char) : char
}

const maskText = (text: string | null | undefined, masked: string | string[]): string => {
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
    if (!isMask(mask)) {
      newText += mask
      if (char === mask) {
        textIndex++
      }
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

const unmaskText = (text: string): string => {
  return text ? String(text).replace(new RegExp(defaultDelimiters.source, 'g'), '') : text
}

export function useMask (props: MaskProps, model: Ref<any>) {
  const maskedValue = ref('')
  const masked = computed(() => props.mask ? props.mask.split('') : [])

  watch(model, val => {
    maskedValue.value = maskText(val, masked.value)
  })

  return {
    maskedValue,
  }
}
