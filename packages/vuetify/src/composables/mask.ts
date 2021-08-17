// Utilites
import { propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'
export interface MaskProps {
  fillBlanks?: boolean
  mask?: string
}

export type MaskType = keyof typeof allowedMasks | undefined

export const makeMaskProps = propsFactory({
  fillBlanks: Boolean,
  mask: String,
}, 'mask')

function isAlphaNumeric (val: string | number) {
  return /^[a-z0-9]/gi.test(String(val))
}

function isDelimiter (char: any) {
  return ['#', 'A', 'a', 'N', 'n'].includes(char)
}

function toDelimiter (char: any): MaskType {
  if (isDelimiter(char)) return char

  if (!isAlphaNumeric(char)) return undefined

  if (!isNaN(parseInt(char))) return '#'

  if (/^[A-Z]/i.test(char)) return 'A'

  if (/^[a-z]/i.test(char)) return 'a'

  if (/^[0-9A-Z]/i.test(char)) return 'N'

  if (/^[0-9a-z]/i.test(char)) return 'n'

  return undefined
}

const allowedMasks = {
  '#': {
    test: (char: any) => /[0-9]/.test(char),
    convert: null,
  },
  A: {
    test: (char: any) => /[A-Z]/i.test(char),
    convert: (char: any) => char.toUpperCase(),
  },
  a: {
    test: (char: any) => /[a-z]/i.test(char),
    convert: (char: any) => char.toLowerCase(),
  },
  N: {
    test: (char: any) => /[0-9A-Z]/i.test(char),
    convert: (char: any) => char.toUpperCase(),
  },
  n: {
    test: (char: any) => /[0-9a-z]/i.test(char),
    convert: (char: any) => char.toLowerCase(),
  },
  X: {
    test: isDelimiter,
    convert: null,
  },
} as const

function getMask (char: string) {
  const key = toDelimiter(char)

  return key ? allowedMasks[key] : undefined
}

export function useMask (props: MaskProps) {
  function mask (value: Ref<string>) {
    const maskSplit = props.mask?.split('') ?? []
    const valueSplit = value.value.replace(/[^a-z0-9]/gi, '').split('')
    const valueNew = []

    for (let i = 0; i < maskSplit.length; i++) {
      const char = maskSplit[i]
      const mask = getMask(char)

      if (mask?.test(valueSplit[0])) {
        const replace = valueSplit.shift()

        valueNew.push(mask?.convert?.(replace) ?? replace)
      } else if (valueSplit.length || props.fillBlanks) {
        valueNew.push(char)
      }

      if (!valueSplit.length && !props.fillBlanks) break
    }

    return valueNew.join('')
  }

  return { mask }
}
