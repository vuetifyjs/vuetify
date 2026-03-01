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

  describe('multi-mask support', () => {
    describe('mask with array', () => {
      it.each([
        // First mask matches letters, second matches numbers - input has letters so first wins
        [{ mask: ['(AA)-###', '(##)-AAA'], modelValue: 'AB123' }, '(AB)-123'],
        // Input starts with numbers, second mask consumes more (5 vs 0)
        [{ mask: ['(AA)-###', '(##)-AAA'], modelValue: '12ABC' }, '(12)-ABC'],
        // Both consume 4, but #### is complete so it wins
        [{ mask: ['####', '##-##-##'], modelValue: '1234' }, '1234'],
        // First mask consumes more (5 vs 4)
        [{ mask: ['#####', '##-##'], modelValue: '12345' }, '12345'],
        // Single-item array behaves like single mask
        [{ mask: ['(###) #'], modelValue: '4567' }, '(456) 7'],
        // Empty array returns input as-is (no mask applied)
        [{ mask: [], modelValue: '1234' }, '1234'],
      ])('should select best matching mask %#', (props, expected) => {
        const { mask } = useMask(props as MaskProps)
        expect(mask(props.modelValue)).toEqual(expected)
      })

      it('should handle partial input with multiple masks', () => {
        const { mask } = useMask({ mask: ['(AA)-###', '(##)-AAA'] })
        // Partial letter input - first mask matches
        expect(mask('A')).toBe('(A')
        // Partial number input - second mask matches
        expect(mask('1')).toBe('(1')
      })
    })

    describe('unmask with array', () => {
      it.each([
        // Unmask value that matches first mask pattern
        [{ mask: ['(AA)-###', '(##)-AAA'], modelValue: '(AB)-123' }, 'AB123'],
        // Unmask value that matches second mask pattern
        [{ mask: ['(AA)-###', '(##)-AAA'], modelValue: '(12)-ABC' }, '12ABC'],
        // Single-item array behaves like single mask
        [{ mask: ['(###) #'], modelValue: '(456) 7' }, '4567'],
        // Empty array returns input as-is
        [{ mask: [], modelValue: '(123)' }, '(123)'],
      ])('should unmask correctly with multiple masks %#', (props, expected) => {
        const { unmask } = useMask(props as MaskProps)
        expect(unmask(props.modelValue)).toEqual(expected)
      })
    })

    describe('isValid with array', () => {
      it.each([
        // Valid for first mask
        [{ mask: ['(AA)-###', '(##)-AAA'], text: 'AB123' }, true],
        // Valid for second mask
        [{ mask: ['(AA)-###', '(##)-AAA'], text: '12ABC' }, true],
        // Invalid for both masks
        [{ mask: ['(AA)-###', '(##)-AAA'], text: '!!!' }, false],
        // Valid for one of many masks
        [{ mask: ['####', 'AAAA', '##AA'], text: 'ABCD' }, true],
        // Single-item array
        [{ mask: ['####'], text: '1234' }, true],
        // Empty array - any non-empty text is valid
        [{ mask: [], text: '1234' }, true],
      ])('should return true if ANY mask validates %#', (props, expected) => {
        const { isValid } = useMask(props as MaskProps)
        expect(isValid(props.text)).toEqual(expected)
      })
    })

    describe('isComplete with array', () => {
      it.each([
        // Complete for first mask
        [{ mask: ['(AA)-###', '(##)-AAA'], text: 'AB123' }, true],
        [{ mask: ['(AA)-###', '(##)-AAA'], text: '(AB)-123' }, true],
        // Complete for second mask
        [{ mask: ['(AA)-###', '(##)-AAA'], text: '12ABC' }, true],
        [{ mask: ['(AA)-###', '(##)-AAA'], text: '(12)-ABC' }, true],
        // Incomplete - doesn't fully match any mask
        [{ mask: ['(AA)-###', '(##)-AAA'], text: 'AB12' }, false],
        // Single-item array
        [{ mask: ['####'], text: '1234' }, true],
        [{ mask: ['####'], text: '123' }, false],
        // Empty array - never complete (no mask to complete)
        [{ mask: [], text: '1234' }, false],
      ])('should return true if ANY mask is complete %#', (props, expected) => {
        const { isComplete } = useMask(props as MaskProps)
        expect(isComplete(props.text)).toEqual(expected)
      })
    })
  })
})
