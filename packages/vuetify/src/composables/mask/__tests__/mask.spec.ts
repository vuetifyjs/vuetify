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
  ])('apply %#', (props, expected) => {
    const { apply } = useMask(props as MaskProps)
    expect(apply(props.modelValue)).toEqual(expected)
  })

  it.each([
    [{ mask: '(#) (#)', modelValue: ' 5   6 ' }, '(5) (6)'],
  ])('should trim spaces', (props, expected) => {
    const { apply } = useMask(props as MaskProps)
    expect(apply(props.modelValue)).toEqual(expected)
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
  ])('unapply %#', (props, expected) => {
    const { unapply } = useMask(props as MaskProps)
    expect(unapply(props.modelValue)).toEqual(expected)
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
    ])('should validate text with mask %#', (props, expected) => {
      const { test } = useMask(props as MaskProps)
      expect(test(props.text)).toEqual(expected)
    })

    it.each([
      [{ mask: '####', text: '1234', isExact: true }, true],
      [{ mask: '####', text: '123', isExact: true }, false],
      [{ mask: '####', text: '12345', isExact: true }, false],
      [{ mask: '##/##/####', text: '12/34/5678', isExact: true }, true],
      [{ mask: '##/##/####', text: '12345678', isExact: true }, true],
      [{ mask: '##/##/####', text: '12/34/567', isExact: true }, false],
      [{ mask: '##/##/####', text: '123456789', isExact: true }, false],
      [{ mask: '(###) ###-####', text: '(123) 456-7890', isExact: true }, true],
      [{ mask: '(###) ###-####', text: '1234567890', isExact: true }, true],
      [{ mask: '(###) ###-####', text: '(123) 456-789', isExact: true }, false],
      [{ mask: 'A##', text: 'A12', isExact: true }, true],
      [{ mask: 'A##', text: 'a12', isExact: true }, false],
      [{ mask: 'A##', text: 'A1', isExact: true }, false],
      [{ mask: '', text: '', isExact: true }, false],
      [{ mask: '', text: 'abc', isExact: true }, false],
    ])('should validate text with isExact=true %#', (props, expected) => {
      const { test } = useMask(props as MaskProps)
      expect(test(props.text, { isExact: props.isExact })).toEqual(expected)
    })

    it('should handle null and undefined text', () => {
      const { test } = useMask({ mask: '####' })
      expect(test('')).toBe(false)
      expect(test(null as any)).toBe(false)
      expect(test(undefined as any)).toBe(false)
    })
  })
})
