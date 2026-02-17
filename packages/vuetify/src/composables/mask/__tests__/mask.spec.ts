// Composables
import { isMaskDelimiter, useMask } from '../mask'

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
  ])('mask %#', (props, expected) => {
    const { mask } = useMask(props as MaskProps)
    expect(mask(props.modelValue)).toEqual(expected)
  })

  it.each([
    [{ mask: '(#) (#)', modelValue: ' 5   6 ' }, '(5) (6)'],
  ])('should trim spaces', (props, expected) => {
    const { mask } = useMask(props as MaskProps)
    expect(mask(props.modelValue)).toEqual(expected)
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
  ])('unmask %#', (props, expected) => {
    const { unmask } = useMask(props as MaskProps)
    expect(unmask(props.modelValue)).toEqual(expected)
  })

  it.each([
    ['a', false],
    ['-', true],
  ])('isMaskDelimiter', (input, expected) => {
    expect(isMaskDelimiter(input)).toEqual(expected)
  })

  describe('The test method', () => {
    it.each([
      [{ mask: '####', text: '1234' }, true],
      [{ mask: '####', text: '123' }, true],
      [{ mask: '####', text: '12345' }, false],
      [{ mask: '##/##/####', text: '12/34/5678' }, true],
      [{ mask: '##/##/####', text: '12345678' }, true],
      [{ mask: '##/##/####', text: '12/34/567' }, true],
      [{ mask: '##/##/####', text: '123456789' }, false],
      [{ mask: '(###) ###-####', text: '(123) 456-7890' }, true],
      [{ mask: '(###) ###-####', text: '1234567890' }, true],
      [{ mask: '(###) ###-####', text: '(123) 456-789' }, true],
      [{ mask: 'A##', text: 'A12' }, true],
      [{ mask: 'A##', text: 'a12' }, false],
      [{ mask: 'A##', text: 'A1' }, true],
      [{ mask: '', text: '' }, false],
      [{ mask: '', text: 'abc' }, true],
    ])('should check if the text is valid for the mask', (props, expected) => {
      const { isValid } = useMask(props as MaskProps)
      expect(isValid(props.text)).toEqual(expected)
    })

    it.each([
      [{ mask: '####', text: '1234' }, true],
      [{ mask: '####', text: '123' }, false],
      [{ mask: '####', text: '12345' }, false],
      [{ mask: '##/##/####', text: '12/34/5678' }, true],
      [{ mask: '##/##/####', text: '12345678' }, true],
      [{ mask: '##/##/####', text: '12/34/567' }, false],
      [{ mask: '##/##/####', text: '123456789' }, false],
      [{ mask: '(###) ###-####', text: '(123) 456-7890' }, true],
      [{ mask: '(###) ###-####', text: '1234567890' }, true],
      [{ mask: '(###) ###-####', text: '(123) 456-789' }, false],
      [{ mask: 'A##', text: 'A12' }, true],
      [{ mask: 'A##', text: 'a12' }, false],
      [{ mask: 'A##', text: 'A1' }, false],
      [{ mask: '', text: '' }, false],
      [{ mask: '', text: 'abc' }, false],
    ])('should check if the text is complete for the mask', (props, expected) => {
      const { isComplete } = useMask(props as MaskProps)
      expect(isComplete(props.text)).toEqual(expected)
    })

    it('should handle null and undefined text', () => {
      const { isValid } = useMask({ mask: '####' })
      expect(isValid('')).toBe(false)
      expect(isValid(null as any)).toBe(false)
      expect(isValid(undefined as any)).toBe(false)
    })
  })
})
