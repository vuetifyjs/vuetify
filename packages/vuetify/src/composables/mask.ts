// Utilities
import { computed, shallowRef } from 'vue'
import { isObject, propsFactory } from '@/util'

// Types
import type { PropType, Ref } from 'vue'

export interface MaskProps {
  mask: string | MaskOptions | undefined
  returnMaskedValue?: Boolean
}

export interface MaskOptions {
  mask: string
  tokens: Record<string, MaskItem>
}

export const makeMaskProps = propsFactory({
  mask: [String, Object] as PropType<string | MaskOptions>,
  returnMaskedValue: Boolean,
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

export function useMask (props: MaskProps, inputRef: Ref<HTMLInputElement | undefined>) {
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
  const selection = shallowRef(0)
  const lazySelection = shallowRef(0)

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
    if (text == null) return ''

    if (!mask.value.length || !text.length) return text

    let textIndex = 0
    let maskIndex = 0
    let newText = ''

    while (maskIndex < mask.value.length) {
      const mchar = mask.value[maskIndex]
      const tchar = text[textIndex]

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

    let textIndex = 0
    let maskIndex = 0
    let newText = ''

    while (true) {
      const mchar = mask.value[maskIndex]
      const tchar = text[textIndex]

      if (tchar == null) break

      if (mchar == null) {
        newText += tchar
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
