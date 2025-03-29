// Composables
import { isMaskDelimiter, useMask } from '../mask'

// Utilities
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
    [{ mask: '\\#(###)', modelValue: '123' }, '#(123)'],
    [{ mask: '\\####', modelValue: '1' }, '#1'],
    [{ mask: '+38(###)', modelValue: '43' }, '+38(43'],
  ])('maskText %#', (props, expected) => {
    const { maskText } = useMask(props as MaskProps, ref(undefined))
    expect(maskText(props.modelValue)).toEqual(expected)
  })

  it.each([
    [{ mask: '(#', modelValue: '(5' }, '5'],
    [{ mask: '####', modelValue: '1111' }, '1111'],
    [{ mask: '(###)#', modelValue: '(123)4' }, '1234'],
    [{ mask: '(###) #)', modelValue: '(456) 7)' }, '4567'],
    [{ mask: '#### - #### - #', modelValue: '4444 - 4444 - 4' }, '444444444'],
    [{ mask: 'NNN - ####', modelValue: 'A31 - 4444' }, 'A314444'],
    [{ mask: '\\#(###)', modelValue: '#(123)' }, '123'],
    [{ mask: '\\#(###)', modelValue: '123' }, '123'],
    [{ mask: '\\####', modelValue: '#(123)' }, '(123)'],
    [{ mask: '\\####', modelValue: '#1' }, '1'],
    [{ mask: '#-#', modelValue: '2-23' }, '223'],
    [{ mask: '+38(###)', modelValue: '+38(43' }, '43'],
    [{ mask: '+38(###)', modelValue: '43' }, '43'],
    [{ mask: '', modelValue: null }, null],
  ])('unmaskText %#', (props, expected) => {
    const { unmaskText } = useMask(props as MaskProps, ref(undefined))
    expect(unmaskText(props.modelValue)).toEqual(expected)
  })

  it.each([
    ['a', false],
    ['-', true],
  ])('isMaskDelimiter', (input, expected) => {
    expect(isMaskDelimiter(input)).toEqual(expected)
  })
})
