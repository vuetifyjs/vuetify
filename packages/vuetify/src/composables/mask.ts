// Utilities
import { computed, shallowRef } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

export interface MaskProps {
  mask: string | undefined
  returnMaskedValue?: Boolean
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

export function isMaskDelimiter (char: string): boolean {
  return char ? defaultDelimiters.test(char) : false
}

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

function isMask (char: string): boolean {
  return allowedMasks.hasOwnProperty(char)
}

function maskValidates (mask: MaskType, char: string): boolean {
  if (char == null || !isMask(mask)) return false
  return allowedMasks[mask].test(char)
}

function convert (mask: MaskType, char: string): string {
  return allowedMasks[mask].convert ? allowedMasks[mask].convert!(char) : char
}

export function useMask (props: MaskProps, inputRef: Ref<HTMLInputElement | undefined>) {
  const rawMask = computed(() => {
    const preDefined = props.mask ? preDefinedMap[props.mask] : undefined
    return preDefined ?? props.mask
  })
  const masks = computed(() => rawMask.value ? rawMask.value.split('') : [])
  const selection = shallowRef(0)
  const lazySelection = shallowRef(0)

  function maskText (text: string | null | undefined): string {
    if (text == null) return ''

    if (!masks.value.length || !text.length) return text

    let textIndex = 0
    let maskIndex = 0
    let newText = ''

    while (maskIndex < masks.value.length) {
      const mchar = masks.value[maskIndex]
      const tchar = text[textIndex]

      // Escaped character in mask, the next mask character is inserted
      if (mchar === '\\') {
        newText += masks.value[maskIndex + 1]
        maskIndex += 2
        continue
      }

      if (!isMask(mchar)) {
        newText += mchar
        if (tchar === mchar) {
          textIndex++
        }
      } else if (maskValidates(mchar as MaskType, tchar)) {
        newText += convert(mchar as MaskType, tchar)
        textIndex++
      } else {
        break
      }

      maskIndex++
    }
    return newText
  }
  function unmaskText (text: string | null): string | null {
    if (text == null) return null

    if (!masks.value.length || !text.length) return text

    let textIndex = 0
    let maskIndex = 0
    let newText = ''

    while (true) {
      const mchar = masks.value[maskIndex]
      const tchar = text[textIndex]

      if (tchar == null) break

      if (mchar == null) {
        newText += tchar
        textIndex++
        continue
      }

      // Escaped character in mask, skip the next input character
      if (mchar === '\\') {
        if (tchar === masks.value[maskIndex + 1]) {
          textIndex++
        }
        maskIndex += 2
        continue
      }

      if (mchar !== tchar) {
        newText += tchar
      }

      textIndex++
      maskIndex++
    }
    return newText
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
