// Utilities
import { parseKeyCombination } from '../hotkey-parsing'

describe('hotkey-parsing', () => {
  describe('combinations', () => {
    // Basic combinations
    it('should split simple combinations with +', () => {
      const result = parseKeyCombination('ctrl+k')
      expect(result).toEqual({
        type: 'combo',
        parts: ['ctrl', 'k'],
      })
    })

    it('should split simple combinations with _', () => {
      const result = parseKeyCombination('shift_tab')
      expect(result).toEqual({
        type: 'combo',
        parts: ['shift', 'tab'],
      })
    })

    it('should split simple combinations with /', () => {
      const result = parseKeyCombination('up/down')
      expect(result).toEqual({
        type: 'alternate',
        parts: ['arrowup', 'arrowdown'],
      })
    })

    // Multiple modifiers and keys
    it('should handle multiple modifiers', () => {
      const result = parseKeyCombination('ctrl+shift+k')
      expect(result).toEqual({
        type: 'combo',
        parts: ['ctrl', 'shift', 'k'],
      })
    })

    it('should handle multiple primary keys', () => {
      const result = parseKeyCombination('k+j')
      expect(result).toEqual({
        type: 'combo',
        parts: ['k', 'j'],
      })
    })

    it('should handle mixed separators', () => {
      const result = parseKeyCombination('alt_shift+t')
      expect(result).toEqual({
        type: 'combo',
        parts: ['alt', 'shift', 't'],
      })
    })

    // Literal keys
    it('should handle single literal keys', () => {
      expect(parseKeyCombination('-')).toBe('-')
      expect(parseKeyCombination('+')).toBe('+')
      expect(parseKeyCombination('/')).toBe('/')
      expect(parseKeyCombination('_')).toBe('_')
      expect(parseKeyCombination(' ')).toBe(' ')
    })

    // Combinations with doubled literals
    it('should handle doubled literal +', () => {
      expect(parseKeyCombination('ctrl++')).toEqual({
        type: 'combo',
        parts: ['ctrl', '+'],
      })
    })

    it('should handle doubled literal _', () => {
      expect(parseKeyCombination('ctrl__')).toEqual({
        type: 'combo',
        parts: ['ctrl', '_'],
      })
    })

    it('should handle doubled literal /', () => {
      expect(parseKeyCombination('ctrl//')).toEqual({
        type: 'alternate',
        parts: ['ctrl', '/'],
      })
    })

    it('should handle doubled literal -', () => {
      const result = parseKeyCombination('shift--')
      expect(result).toEqual({
        type: 'sequence',
        parts: ['shift', '-'],
      })
    })

    it('should handle combination with literal minus', () => {
      const result = parseKeyCombination('ctrl+-')
      expect(result).toEqual({
        type: 'combo',
        parts: ['ctrl', '-'],
      })
    })

    it('should handle combination with literal space', () => {
      const result = parseKeyCombination('ctrl+ ')
      expect(result).toEqual({
        type: 'combo',
        parts: ['ctrl', ' '],
      })
    })

    // Invalid combinations
    it('should return empty string for empty string', () => {
      expect(parseKeyCombination('')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()
    })

    it('should return empty string for leading separators', () => {
      expect(parseKeyCombination('+a')).toBe('')
      expect('Unexpected separator \'+\' at position 0').toHaveBeenTipped()

      expect(parseKeyCombination('/a')).toBe('')
      expect('Unexpected separator \'/\' at position 0').toHaveBeenTipped()

      expect(parseKeyCombination('_a')).toBe('')
      expect('Unexpected separator \'_\' at position 0').toHaveBeenTipped()
    })

    it('should return empty string for trailing separators', () => {
      expect(parseKeyCombination('a+')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()

      expect(parseKeyCombination('a/')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()

      expect(parseKeyCombination('a_')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()
    })

    it('should return empty string for extraneous spaces', () => {
      expect(parseKeyCombination('shift + ')).toBe('')
      expect('Unexpected character \' \' at position 5').toHaveBeenTipped()
    })

    it('should return empty string for standalone doubled separators', () => {
      expect(parseKeyCombination('++')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()

      expect(parseKeyCombination('//')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()

      expect(parseKeyCombination('--')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()

      expect(parseKeyCombination('__')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()
    })

    // Combinations starting with doubled literal separators
    it('should parse combinations starting with doubled + literal', () => {
      expect(parseKeyCombination('++k')).toEqual({
        type: 'combo',
        parts: ['+', 'k'],
      })
    })

    // Key aliases from centralized key-aliases.ts
    it('should handle all key aliases consistently', () => {
      // Modifier aliases
      expect(parseKeyCombination('control')).toBe('ctrl')
      expect(parseKeyCombination('command')).toBe('cmd')
      expect(parseKeyCombination('option')).toBe('alt')

      // Arrow key aliases
      expect(parseKeyCombination('up')).toBe('arrowup')
      expect(parseKeyCombination('down')).toBe('arrowdown')
      expect(parseKeyCombination('left')).toBe('arrowleft')
      expect(parseKeyCombination('right')).toBe('arrowright')

      // Common key aliases
      expect(parseKeyCombination('esc')).toBe('escape')
      expect(parseKeyCombination('return')).toBe('enter')
      expect(parseKeyCombination('del')).toBe('delete')
      expect(parseKeyCombination('space')).toBe(' ')
      expect(parseKeyCombination('spacebar')).toBe(' ')

      // Symbol aliases
      expect(parseKeyCombination('plus')).toBe('+')
      expect(parseKeyCombination('slash')).toBe('/')
      expect(parseKeyCombination('underscore')).toBe('_')
      expect(parseKeyCombination('minus')).toBe('-')
      expect(parseKeyCombination('hyphen')).toBe('-')
    })

    it('should handle key aliases in complex combinations', () => {
      const result1 = parseKeyCombination('control+option+up')
      expect(typeof result1 === 'object' && result1.type === 'combo' && result1.parts).toEqual(['ctrl', 'alt', 'arrowup'])

      const result2 = parseKeyCombination('command+shift+esc')
      expect(typeof result2 === 'object' && result2.type === 'combo' && result2.parts).toEqual(['cmd', 'shift', 'escape'])

      const result3 = parseKeyCombination('control+return')
      expect(typeof result3 === 'object' && result3.type === 'combo' && result3.parts).toEqual(['ctrl', 'enter'])

      const result4 = parseKeyCombination('alt+del')
      expect(typeof result4 === 'object' && result4.type === 'combo' && result4.parts).toEqual(['alt', 'delete'])

      const result5 = parseKeyCombination('shift+plus')
      expect(typeof result5 === 'object' && result5.type === 'combo' && result5.parts).toEqual(['shift', '+'])

      const result6 = parseKeyCombination('shift+slash')
      expect(typeof result6 === 'object' && result6.type === 'combo' && result6.parts).toEqual(['shift', '/'])

      const result7 = parseKeyCombination('shift+underscore')
      expect(typeof result7 === 'object' && result7.type === 'combo' && result7.parts).toEqual(['shift', '_'])

      const result8 = parseKeyCombination('shift+minus')
      expect(typeof result8 === 'object' && result8.type === 'combo' && result8.parts).toEqual(['shift', '-'])
    })

    it('should handle case insensitive key aliases', () => {
      const result1 = parseKeyCombination('CONTROL+K')
      expect(typeof result1 === 'object' && result1.type === 'combo' && result1.parts).toEqual(['ctrl', 'k'])

      const result2 = parseKeyCombination('Command+S')
      expect(typeof result2 === 'object' && result2.type === 'combo' && result2.parts).toEqual(['cmd', 's'])

      const result3 = parseKeyCombination('OPTION+TAB')
      expect(typeof result3 === 'object' && result3.type === 'combo' && result3.parts).toEqual(['alt', 'tab'])

      expect(parseKeyCombination('UP')).toBe('arrowup')
      expect(parseKeyCombination('ESC')).toBe('escape')
      expect(parseKeyCombination('PLUS')).toBe('+')
      expect(parseKeyCombination('SLASH')).toBe('/')
      expect(parseKeyCombination('UNDERSCORE')).toBe('_')
      expect(parseKeyCombination('MINUS')).toBe('-')
    })

    it('should handle mixed case aliases in combinations', () => {
      const result1 = parseKeyCombination('Control+Option+Up')
      expect(typeof result1 === 'object' && result1.type === 'combo' && result1.parts).toEqual(['ctrl', 'alt', 'arrowup'])

      const result2 = parseKeyCombination('COMMAND+shift+ESC')
      expect(typeof result2 === 'object' && result2.type === 'combo' && result2.parts).toEqual(['cmd', 'shift', 'escape'])
    })

    it('should handle meta key correctly for cross-platform use', () => {
      const result1 = parseKeyCombination('meta+s')
      expect(typeof result1 === 'object' && result1.type === 'combo' && result1.parts).toEqual(['meta', 's'])

      const result2 = parseKeyCombination('meta+shift+z')
      expect(typeof result2 === 'object' && result2.type === 'combo' && result2.parts).toEqual(['meta', 'shift', 'z'])

      const result3 = parseKeyCombination('meta+alt+p')
      expect(typeof result3 === 'object' && result3.type === 'combo' && result3.parts).toEqual(['meta', 'alt', 'p'])
    })
  })

  describe('sequences', () => {
    // Basic sequences
    it('should split simple sequences', () => {
      const result1 = parseKeyCombination('a-b')
      expect(result1).toEqual({
        type: 'sequence',
        parts: ['a', 'b'],
      })

      const result2 = parseKeyCombination('g-g')
      expect(result2).toEqual({
        type: 'sequence',
        parts: ['g', 'g'],
      })
    })

    it('should handle ctrl-b as a valid sequence', () => {
      const result = parseKeyCombination('ctrl-b')
      expect(result).toEqual({
        type: 'sequence',
        parts: ['ctrl', 'b'],
      })
    })

    it('should handle long sequences', () => {
      const result = parseKeyCombination('a-b-c-d')
      expect(result).toEqual({
        type: 'sequence',
        parts: ['a', 'b', 'c', 'd'],
      })
    })

    // Sequences with combinations
    it('should split sequences with combinations', () => {
      const result = parseKeyCombination('ctrl+k-p')
      expect(result).toEqual({
        type: 'sequence',
        parts: [
          {
            type: 'combo',
            parts: ['ctrl', 'k'],
          },
          'p',
        ],
      })
    })

    // Single combinations (no sequence)
    it('should handle single combinations', () => {
      const result = parseKeyCombination('ctrl+k')
      expect(result).toEqual({
        type: 'combo',
        parts: ['ctrl', 'k'],
      })
    })

    // Edge cases and literals
    it('should handle literal minus in a sequence', () => {
      const result = parseKeyCombination('ctrl+a-shift+-')
      expect(result).toEqual({
        type: 'sequence',
        parts: [
          {
            type: 'combo',
            parts: ['ctrl', 'a'],
          },
          {
            type: 'combo',
            parts: ['shift', '-'],
          },
        ],
      })
    })

    it('should handle standalone literal minus in a sequence', () => {
      expect(parseKeyCombination('-')).toBe('-')
    })

    it('should correctly parse meta+--k', () => {
      const result = parseKeyCombination('meta+--k')
      expect(result).toEqual({
        type: 'sequence',
        parts: [
          {
            type: 'combo',
            parts: ['meta', '-'],
          },
          'k',
        ],
      })
    })

    it('should correctly parse --+', () => {
      expect(parseKeyCombination('--+')).toEqual({
        type: 'sequence',
        parts: ['-', '+'],
      })
    })

    it('should correctly parse ---', () => {
      const result = parseKeyCombination('---')
      expect(result).toEqual({
        type: 'sequence',
        parts: ['-', '-'],
      })
    })

    it('should handle shift---alt++', () => {
      const result = parseKeyCombination('shift---alt++')
      expect(result).toEqual({
        type: 'sequence',
        parts: [
          'shift',
          '-',
          {
            type: 'combo',
            parts: ['alt', '+'],
          },
        ],
      })
    })

    it('should handle alt+++b+h', () => {
      const result = parseKeyCombination('alt+++b+h')
      expect(result).toEqual({
        type: 'combo',
        parts: ['alt', '+', 'b', 'h'],
      })
    })

    // Invalid sequences
    it('should return empty string for empty string', () => {
      expect(parseKeyCombination('')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()
    })

    it('should return empty string for leading sequence separator', () => {
      expect(parseKeyCombination('-a')).toBe('')
      expect('Unexpected separator \'-\' at position 0').toHaveBeenTipped()
    })

    it('should return empty string for trailing sequence separator', () => {
      expect(parseKeyCombination('a-')).toBe('')
      expect('Unexpected end of input').toHaveBeenTipped()
    })

    it('should return empty string for invalid parts', () => {
      expect(parseKeyCombination('a-ctrl+-b')).toBe('')
      expect(`Unexpected separator '-' at position 7`).toHaveBeenTipped()
    })

    // Sequences with combinations that start with doubled literal
    it('should handle cmd+shift-++k', () => {
      const result = parseKeyCombination('cmd+shift-++k')
      expect(result).toEqual({
        type: 'sequence',
        parts: [
          {
            type: 'combo',
            parts: ['cmd', 'shift'],
          },
          {
            type: 'combo',
            parts: ['+', 'k'],
          },
        ],
      })
    })

    it('should handle cmd+shift++-k', () => {
      const result = parseKeyCombination('cmd+shift++-k')
      expect(result).toEqual({
        type: 'sequence',
        parts: [
          {
            type: 'combo',
            parts: ['cmd', 'shift', '+'],
          },
          'k',
        ],
      })
    })
  })

  it('should correctly parse a complex sequence', () => {
    const sequence = 'ctrl+shift+a-alt+--k'
    const result = parseKeyCombination(sequence)
    expect(result).toEqual({
      type: 'sequence',
      parts: [
        {
          type: 'combo',
          parts: ['ctrl', 'shift', 'a'],
        },
        {
          type: 'combo',
          parts: ['alt', '-'],
        },
        'k',
      ],
    })
  })
})
