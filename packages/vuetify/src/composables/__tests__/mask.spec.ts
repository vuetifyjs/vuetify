// Composables
import { isMaskDelimiter, useMask } from '../mask'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { ref } from 'vue'

// Types
import type { MaskProps } from '../mask'

describe('mask', () => {
  it.each([
    [{ mask: '(#', modelValue: '5' }, '(5'],
    [{ mask: '(#', modelValue: '(' }, '('],
    [{ mask: '(###) #', modelValue: '4567' }, '(456) 7'],
    [{ mask: '#### - #### - #### - ####', modelValue: '444444444' }, '4444 - 4444 - 4'],
    [{ mask: 'A## - ####', modelValue: 'A314444' }, 'A31 - 4444'],
    [{ mask: '## - ##', modelValue: '55' }, '55 - '],
    [{ mask: '## - ##', modelValue: '' }, ''],
    [{ mask: 'Aa', modelValue: 'aa' }, 'Aa'],
    [{ mask: 'aa', modelValue: 'AA' }, 'aa'],
    [{ mask: 'Aa', modelValue: 'A1' }, 'A'],
    [{ mask: 'NnNnNn', modelValue: '12abAB' }, '12AbAb'],
    [{ mask: '#a', modelValue: 'a' }, ''],
    [{ mask: '#)', modelValue: '1' }, '1)'],
    [{ mask: '(###)!!', modelValue: '123' }, '(123)!!'],
    [{ mask: '##.##', modelValue: '1234' }, '12.34'],
    [{ mask: '#', modelValue: null }, ''],
  ])('maskText', (props, expected) => {
    const { maskText } = useMask(props as MaskProps, ref(undefined))
    expect(maskText(props.modelValue)).toEqual(expected)
  })

  it.each([
    ['(5', '5'],
    ['1111', '1111'],
    ['(123)4', '1234'],
    ['(456) 7)', '4567'],
    ['4444 - 4444 - 4', '444444444'],
    ['A31 - 4444', 'A314444'],
    ['555', '555'],
    [null, null],
  ])('unmaskText', (input, expected) => {
    const { unmaskText } = useMask({} as MaskProps, ref(undefined))
    expect(unmaskText(input)).toEqual(expected)
  })

  it.each([
    ['a', false],
    ['-', true],
  ])('isMaskDelimiter', (input, expected) => {
    expect(isMaskDelimiter(input)).toEqual(expected)
  })
})
