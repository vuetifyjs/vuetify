// Utilities
import { computed, ref } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

export interface MaskProps {
  mask: string | undefined
  returnMaskedValue: Boolean
}

export const makeMaskProps = propsFactory({
  mask: String,
  returnMaskedValue: Boolean,
}, 'mask')

export interface MaskItem {
  test: (char: string) => boolean
  convert?: (char: string) => string
}

export const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/

export type MaskType = '#' | 'A' | 'a' | 'N' | 'n' | 'X'

const preDefinedMap: Record<string, string> = {
  'credit-card': '#### - #### - #### - ####',
  date: '##/##/####',
  'date-with-time': '##/##/#### ##:##',
  phone: '(###) ### - ####',
  social: '###-##-####',
  time: '##:##',
  'time-with-seconds': '##:##:##',
}

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

export function useMask (props: MaskProps, inputRef: Ref<HTMLInputElement | undefined>) {
  const rawMask = computed(() => {
    const preDefined = props.mask ? preDefinedMap[props.mask] : undefined
    return preDefined ?? (props.mask ?? props.mask)
  })
  const masks = computed(() => rawMask.value ? rawMask.value.split('') : [])
  const selection = ref(0)
  const lazySelection = ref(0)

  const maskText = (text: string | null | undefined): string => {
    if (text == null) return ''

    if (!masks.value.length || !text.length) return text

    let textIndex = 0
    let maskIndex = 0
    let newText = ''

    while (maskIndex < masks.value.length) {
      const mask = masks.value[maskIndex]

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
  function setCaretPosition (newSelection: number) {
    selection.value = newSelection
    inputRef.value && inputRef.value.setSelectionRange(selection.value, selection.value)
  }

  function resetSelections () {
    if (!inputRef.value?.selectionEnd) return

    selection.value = inputRef.value.selectionEnd
    lazySelection.value = 0

    for (let index = 0; index < selection.value; index++) {
      isMaskDelimiter(inputRef.value.value[index]) || lazySelection.value++
    }
  }

  function updateRange () {
    if (!inputRef.value) return
    resetSelections()

    let selection = 0
    const newValue = inputRef.value.value

    if (newValue) {
      for (let index = 0; index < newValue.length; index++) {
        if (lazySelection.value <= 0) break
        isMaskDelimiter(newValue[index]) || lazySelection.value--
        selection++
      }
    }
    setCaretPosition(selection)
  }

  return {
    updateRange,
    maskText,
    unmaskText,
  }
}
