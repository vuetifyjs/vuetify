import {
  addGrouping,
  processGroupedInput,
  processPlainInput,
  stripGrouping,
  toDisplayPosition,
  toLogicalPosition,
} from '../typing'

// Types
import type { GroupedInputOptions } from '../typing'

const defaults: GroupedInputOptions = {
  groupSeparator: ',',
  decimalSeparator: '.',
  precision: 0,
  grouping: 'always',
  locale: 'en-US',
}

function opts (overrides: Partial<GroupedInputOptions> = {}): GroupedInputOptions {
  return { ...defaults, ...overrides }
}

describe('typing', () => {
  describe('stripGrouping', () => {
    it.each([
      ['1,234', ',', '1234'],
      ['1,234,567', ',', '1234567'],
      ['-1,234', ',', '-1234'],
      ['1.234.567', '.', '1234567'],
      ['1234', ',', '1234'],
      ['', ',', ''],
      ['-1,234.56', ',', '-1234.56'],
    ])('stripGrouping(%s, %s) → %s', (text, sep, expected) => {
      expect(stripGrouping(text, sep)).toBe(expected)
    })
  })

  describe('addGrouping', () => {
    it.each([
      ['1234', ',', '.', 'always', '1,234'],
      ['12345', ',', '.', 'always', '12,345'],
      ['123', ',', '.', 'always', '123'],
      ['1234567', ',', '.', 'always', '1,234,567'],
      ['-1234', ',', '.', 'always', '-1,234'],
      ['-1234567', ',', '.', 'always', '-1,234,567'],
      ['1234.56', ',', '.', 'always', '1,234.56'],
      ['-1234567.89', ',', '.', 'always', '-1,234,567.89'],
      ['12', ',', '.', 'always', '12'],
      ['', ',', '.', 'always', ''],
      ['-', ',', '.', 'always', '-'],
      // min2: only group when > 4 digits
      ['1234', ',', '.', 'min2', '1234'],
      ['12345', ',', '.', 'min2', '12,345'],
      // false: no grouping
      ['1234567', ',', '.', false, '1234567'],
      // true: same as always
      ['1234', ',', '.', true, '1,234'],
      // custom separators
      ['1234,56', '.', ',', 'always', '1.234,56'],
    ] as const)('addGrouping(%s, %s, %s, %s) → %s', (raw, groupSep, decSep, grouping, expected) => {
      expect(addGrouping(raw, groupSep, decSep, grouping)).toBe(expected)
    })

    it.each([
      // en-US: standard 3-digit groups
      ['1234', ',', '.', 'always', 'en-US', '1,234'],
      ['1234', ',', '.', 'auto', 'en-US', '1,234'],
      ['1234', ',', '.', 'min2', 'en-US', '1234'],
      ['12345', ',', '.', 'min2', 'en-US', '12,345'],
      // hi-IN: 3-digit primary group, then 2-digit groups
      ['1234567890', ',', '.', 'auto', 'hi-IN', '1,23,45,67,890'],
      ['1234567890', ',', '.', 'always', 'hi-IN', '1,23,45,67,890'],
      ['-1234567890.5', ',', '.', 'always', 'hi-IN', '-1,23,45,67,890.5'],
      // custom separator with locale
      ['1234567890', "'", '.', 'always', 'hi-IN', "1'23'45'67'890"],
    ] as const)('addGrouping(%s, %s, %s, %s, %s) → %s', (raw, groupSep, decSep, grouping, locale, expected) => {
      expect(addGrouping(raw, groupSep, decSep, grouping, locale)).toBe(expected)
    })
  })

  describe('toLogicalPosition', () => {
    // "1,234" positions: 0=before "1", 1=after "1", 2=after ",", 3=after "2", 4=after "3", 5=after "4"
    it.each([
      ['1,234', ',', 0, 0],
      ['1,234', ',', 1, 1],
      ['1,234', ',', 2, 1], // after comma → same as after "1"
      ['1,234', ',', 3, 2],
      ['1,234', ',', 4, 3],
      ['1,234', ',', 5, 4],
      ['1,234,567', ',', 5, 4],
      ['1,234,567', ',', 6, 4], // after second comma
      ['1,234,567', ',', 9, 7],
      ['', ',', 0, 0],
    ])('toLogicalPosition(%s, %s, %d) → %d', (text, sep, displayPos, expected) => {
      expect(toLogicalPosition(text, sep, displayPos)).toBe(expected)
    })
  })

  describe('toDisplayPosition', () => {
    it.each([
      ['1,234', ',', 0, 0],
      ['1,234', ',', 1, 1],
      ['1,234', ',', 2, 3], // logical 2 = after "12" = display 3 (skips comma)
      ['1,234', ',', 3, 4],
      ['1,234', ',', 4, 5],
      ['12,345', ',', 2, 2],
      ['12,345', ',', 3, 4],
      ['1,234,567', ',', 1, 1],
      ['1,234,567', ',', 4, 5],
      ['1,234,567', ',', 7, 9],
      ['', ',', 0, 0],
    ])('toDisplayPosition(%s, %s, %d) → %d', (text, sep, logicalPos, expected) => {
      expect(toDisplayPosition(text, sep, logicalPos)).toBe(expected)
    })
  })

  describe('processGroupedInput', () => {
    describe('insertText', () => {
      it('appends digit at end, triggers grouping', () => {
        // "123" + "4" at end → "1,234"
        const result = processGroupedInput('insertText', '4', '123', 3, 3, opts())
        expect(result).toEqual({ text: '1,234', cursor: 5 })
      })

      it('appends digit to already grouped', () => {
        // "1,234" + "5" at end → "12,345"
        const result = processGroupedInput('insertText', '5', '1,234', 5, 5, opts())
        expect(result).toEqual({ text: '12,345', cursor: 6 })
      })

      it('inserts digit in the middle', () => {
        // "1,234" cursor after "1" (display 1) + "0" → raw "10234" → "10,234", cursor after "0"
        const result = processGroupedInput('insertText', '0', '1,234', 1, 1, opts())
        expect(result).toEqual({ text: '10,234', cursor: 2 })
      })

      it('inserts digit after group separator', () => {
        // "1,234" cursor at display 2 (after comma, logical 1) + "0" → raw "10234" → "10,234"
        const result = processGroupedInput('insertText', '0', '1,234', 2, 2, opts())
        expect(result).toEqual({ text: '10,234', cursor: 2 })
      })

      it('rejects non-numeric characters', () => {
        const result = processGroupedInput('insertText', 'a', '1,234', 5, 5, opts())
        // "1234a" is invalid → extractNumber → "1234" → no change
        expect(result).toEqual({ text: '1,234', cursor: 5 })
      })

      it('allows minus at start', () => {
        const result = processGroupedInput('insertText', '-', '', 0, 0, opts())
        expect(result).toEqual({ text: '-', cursor: 1 })
      })

      it('allows decimal separator with precision', () => {
        const result = processGroupedInput('insertText', '.', '1234', 4, 4, opts({ precision: 2 }))
        expect(result).toEqual({ text: '1,234.', cursor: 6 })
      })

      it('rejects decimal separator when precision=0', () => {
        const result = processGroupedInput('insertText', '.', '1234', 4, 4, opts({ precision: 0 }))
        expect(result).toEqual({ text: '1,234', cursor: 5 })
      })

      it('replaces selection with digit', () => {
        // "1,234" select "23" (display 2-4 → logical 1-3) + "0" → raw "104" → "104"
        const result = processGroupedInput('insertText', '0', '1,234', 2, 4, opts())
        expect(result).toEqual({ text: '104', cursor: 2 })
      })

      it('enforces precision on decimal digits', () => {
        // "1,234.56" + "7" at end, precision=2 → reject extra digit
        const result = processGroupedInput('insertText', '7', '1,234.56', 8, 8, opts({ precision: 2 }))
        expect(result).toEqual({ text: '1,234.56', cursor: 8 })
      })
    })

    describe('insertFromPaste', () => {
      it('pastes clean number', () => {
        const result = processGroupedInput('insertFromPaste', '5678', '', 0, 0, opts())
        expect(result).toEqual({ text: '5,678', cursor: 5 })
      })

      it('cleans dirty pasted text', () => {
        const result = processGroupedInput('insertFromPaste', 'abc123def', '', 0, 0, opts())
        expect(result).toEqual({ text: '123', cursor: 3 })
      })

      it('pastes into existing value', () => {
        const result = processGroupedInput('insertFromPaste', '56', '1,234', 5, 5, opts())
        expect(result).toEqual({ text: '123,456', cursor: 7 })
      })
    })

    describe('deleteContentBackward', () => {
      it('deletes last digit', () => {
        // "1,234" backspace at end → raw "123" → "123"
        const result = processGroupedInput('deleteContentBackward', null, '1,234', 5, 5, opts())
        expect(result).toEqual({ text: '123', cursor: 3 })
      })

      it('deletes digit before group separator', () => {
        // "1,234" cursor at display 1 (after "1", logical 1) → delete "1" → "234"
        const result = processGroupedInput('deleteContentBackward', null, '1,234', 1, 1, opts())
        expect(result).toEqual({ text: '234', cursor: 0 })
      })

      it('deletes digit when cursor is right after group separator', () => {
        // "1,234" cursor at display 2 (after comma, logical 1) → delete char at logical 0 = "1" → "234"
        const result = processGroupedInput('deleteContentBackward', null, '1,234', 2, 2, opts())
        expect(result).toEqual({ text: '234', cursor: 0 })
      })

      it('no-op at start', () => {
        const result = processGroupedInput('deleteContentBackward', null, '1,234', 0, 0, opts())
        expect(result).toEqual({ text: '1,234', cursor: 0 })
      })

      it('deletes selection', () => {
        // "1,234,567" select "234," (display 2-6) → delete → "1567" → "1,567"
        const result = processGroupedInput('deleteContentBackward', null, '1,234,567', 2, 6, opts())
        expect(result).toEqual({ text: '1,567', cursor: 1 })
      })

      it('removes separator when digit count crosses threshold', () => {
        // "1,000" backspace at end → "100"
        const result = processGroupedInput('deleteContentBackward', null, '1,000', 5, 5, opts())
        expect(result).toEqual({ text: '100', cursor: 3 })
      })
    })

    describe('deleteContentForward', () => {
      it('deletes digit at cursor', () => {
        // "1,234" cursor at display 0 → delete "1" → "234"
        const result = processGroupedInput('deleteContentForward', null, '1,234', 0, 0, opts())
        expect(result).toEqual({ text: '234', cursor: 0 })
      })

      it('deletes digit after group separator', () => {
        // "1,234" cursor at display 2 (after comma, logical 1) → delete char at logical 1 = "2" → "134"
        const result = processGroupedInput('deleteContentForward', null, '1,234', 2, 2, opts())
        expect(result).toEqual({ text: '134', cursor: 1 })
      })

      it('no-op at end', () => {
        const result = processGroupedInput('deleteContentForward', null, '1,234', 5, 5, opts())
        expect(result).toEqual({ text: '1,234', cursor: 5 })
      })
    })

    describe('deleteByCut', () => {
      it('cuts selection', () => {
        const result = processGroupedInput('deleteByCut', null, '1,234,567', 2, 6, opts())
        expect(result).toEqual({ text: '1,567', cursor: 1 })
      })
    })

    describe('deleteWordBackward', () => {
      it('deletes digits backward to non-digit boundary', () => {
        // "1,234.56" cursor at end (display 8, logical 7) → skip "56" (digits), stop at "." → "1,234."
        const result = processGroupedInput('deleteWordBackward', null, '1,234.56', 8, 8, opts({ precision: 2 }))
        expect(result).toEqual({ text: '1,234.', cursor: 6 })
      })

      it('deletes across decimal separator', () => {
        // "1,234.56" cursor at display 6 (after ".", logical 5) → skip "." (non-digit) then "1234" → "56"
        const result = processGroupedInput('deleteWordBackward', null, '1,234.56', 6, 6, opts({ precision: 2 }))
        expect(result).toEqual({ text: '56', cursor: 0 })
      })
    })

    describe('deleteWordForward', () => {
      it('deletes digits forward to non-digit boundary', () => {
        // "1,234.56" cursor at start → skip "1234" → ".56"
        const result = processGroupedInput('deleteWordForward', null, '1,234.56', 0, 0, opts({ precision: 2 }))
        expect(result).toEqual({ text: '.56', cursor: 0 })
      })
    })

    describe('unknown inputType', () => {
      it('returns null for historyUndo', () => {
        expect(processGroupedInput('historyUndo', null, '1,234', 0, 0, opts())).toBeNull()
      })

      it('returns null for historyRedo', () => {
        expect(processGroupedInput('historyRedo', null, '1,234', 0, 0, opts())).toBeNull()
      })
    })

    describe('custom separators', () => {
      it('works with period as group separator and comma as decimal', () => {
        const o = opts({ groupSeparator: '.', decimalSeparator: ',', precision: 2 })
        const result = processGroupedInput('insertText', '5', '1.234', 5, 5, o)
        expect(result).toEqual({ text: '12.345', cursor: 6 })
      })

      it('handles backspace with custom separators', () => {
        const o = opts({ groupSeparator: '.', decimalSeparator: ',', precision: 2 })
        const result = processGroupedInput('deleteContentBackward', null, '1.234', 5, 5, o)
        expect(result).toEqual({ text: '123', cursor: 3 })
      })
    })

    describe('min2 grouping', () => {
      it('does not group 4 digits', () => {
        const o = opts({ grouping: 'min2' })
        const result = processGroupedInput('insertText', '4', '123', 3, 3, o)
        expect(result).toEqual({ text: '1234', cursor: 4 })
      })

      it('groups 5 digits', () => {
        const o = opts({ grouping: 'min2' })
        const result = processGroupedInput('insertText', '5', '1234', 4, 4, o)
        expect(result).toEqual({ text: '12,345', cursor: 6 })
      })
    })
  })

  describe('processPlainInput', () => {
    const plain = (overrides: Partial<{ decimalSeparator: string, precision: number | null }> = {}) => ({
      decimalSeparator: '.',
      precision: 0 as number | null,
      ...overrides,
    })

    describe('valid input passthrough', () => {
      it('returns null for valid digit', () => {
        expect(processPlainInput('5', '12', 2, 2, plain())).toBeNull()
      })

      it('returns null for minus at start', () => {
        expect(processPlainInput('-', '', 0, 0, plain())).toBeNull()
      })

      it('returns null for valid decimal input', () => {
        expect(processPlainInput('3', '1.2', 3, 3, plain({ precision: 2 }))).toBeNull()
      })

      it('returns null when precision is null', () => {
        expect(processPlainInput('.', '123', 3, 3, plain({ precision: null }))).toBeNull()
      })
    })

    describe('rejects invalid characters', () => {
      it.each([
        { data: 'a', value: '12', sel: 2, expected: '12' },
        { data: '+', value: '12', sel: 2, expected: '12' },
        { data: ' ', value: '12', sel: 2, expected: '12' },
      ])('rejects "$data" in "$value"', ({ data, value, sel, expected }) => {
        const result = processPlainInput(data, value, sel, sel, plain())
        expect(result).not.toBeNull()
        expect(result!.text).toBe(expected)
      })

      it('extracts digits from mixed input (paste-like)', () => {
        // "12" + "ab3c" at end → "12ab3c" → extractNumber → "123"
        const result = processPlainInput('ab3c', '12', 2, 2, plain())
        expect(result).not.toBeNull()
        expect(result!.text).toBe('123')
      })

      it('rejects second minus sign', () => {
        const result = processPlainInput('-', '-5', 2, 2, plain())
        expect(result).not.toBeNull()
        expect(result!.text).toBe('-5')
      })

      it('rejects second decimal separator', () => {
        const result = processPlainInput('.', '1.2', 3, 3, plain({ precision: 2 }))
        expect(result).not.toBeNull()
        expect(result!.text).toBe('1.2')
      })
    })

    describe('precision enforcement', () => {
      it('rejects decimal separator when precision=0', () => {
        const result = processPlainInput('.', '42', 2, 2, plain({ precision: 0 }))
        expect(result).not.toBeNull()
        expect(result!.text).toBe('42')
      })

      it('rejects digit beyond precision limit', () => {
        // "1.23" + "4" at end, precision=2 → "1.234" → exceeds → cleaned "1.23"
        const result = processPlainInput('4', '1.23', 4, 4, plain({ precision: 2 }))
        expect(result).not.toBeNull()
        expect(result!.text).toBe('1.23')
        expect(result!.cursor).toBe(5) // selectionStart(4) + data.length(1)
      })

      it('allows digit within precision limit', () => {
        expect(processPlainInput('3', '1.2', 3, 3, plain({ precision: 2 }))).toBeNull()
      })
    })

    describe('custom decimal separator', () => {
      it('returns null for valid comma-separated input', () => {
        expect(processPlainInput('5', '1,2', 3, 3, plain({ decimalSeparator: ',', precision: 2 }))).toBeNull()
      })

      it('rejects period when comma is the decimal separator', () => {
        const result = processPlainInput('.', '12', 2, 2, plain({ decimalSeparator: ',' }))
        expect(result).not.toBeNull()
        expect(result!.text).toBe('12')
      })
    })

    describe('selection replacement', () => {
      it('returns null when replacing selection with valid digit', () => {
        // "123" select "2" (pos 1-2), type "4" → "143" — valid
        expect(processPlainInput('4', '123', 1, 2, plain())).toBeNull()
      })
    })
  })
})
