// Utilities
import { onBeforeMount, onMounted } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

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

function getInputElement (el: HTMLElement) {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector('input')

  if (!inputElement) {
    throw new Error('[Vuetify] mask directive requires an input element')
  }

  return inputElement
}

export function useMask (props: MaskProps) {
  onMounted(() => {
    console.log('-composable onMounted-', props.mask)
  })

  onBeforeMount(() => {
    console.log('-composable onBeforeMount-')
  })
}
