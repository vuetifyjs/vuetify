// Utilities
import { splitKeyCombination, splitKeySequence } from '../hotkey-parsing'

describe('hotkey-parsing.ts', () => {
  describe('splitKeyCombination', () => {
    // Basic combinations
    it('should split simple combinations with +', () => {
      expect(splitKeyCombination('ctrl+k')).toEqual(['ctrl', 'k'])
    })

    it('should split simple combinations with _', () => {
      expect(splitKeyCombination('shift_tab')).toEqual(['shift', 'tab'])
    })

    // Multiple modifiers and keys
    it('should handle multiple modifiers', () => {
      expect(splitKeyCombination('ctrl+shift+k')).toEqual(['ctrl', 'shift', 'k'])
    })

    it('should handle multiple primary keys', () => {
      expect(splitKeyCombination('k+j')).toEqual(['k', 'j'])
    })

    it('should handle mixed separators', () => {
      expect(splitKeyCombination('alt_shift+t')).toEqual(['alt', 'shift', 't'])
    })

    // Literal keys
    it('should handle single literal keys', () => {
      expect(splitKeyCombination('+')).toEqual(['+'])
      expect(splitKeyCombination('-')).toEqual(['-'])
      expect(splitKeyCombination('_')).toEqual(['_'])
    })

    // Combinations with doubled literals
    it('should handle doubled literal +', () => {
      expect(splitKeyCombination('ctrl++')).toEqual(['ctrl', '+'])
    })

    it('should handle doubled literal _', () => {
      expect(splitKeyCombination('ctrl__')).toEqual(['ctrl', '_'])
    })

    it('should handle doubled literal -', () => {
      expect(splitKeyCombination('shift--')).toEqual(['shift', '-'])
    })

    it('should handle combination with literal minus', () => {
      expect(splitKeyCombination('ctrl+-')).toEqual(['ctrl', '-'])
    })

    // Invalid combinations
    it('should return empty array for empty string', () => {
      expect(splitKeyCombination('')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: empty string provided').toHaveBeenTipped()
    })

    it('should return empty array for leading separators', () => {
      expect(splitKeyCombination('+a')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "+a" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('_a')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "_a" has invalid structure').toHaveBeenTipped()
    })

    it('should return empty array for trailing separators', () => {
      expect(splitKeyCombination('a+')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "a+" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('a_')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "a_" has invalid structure').toHaveBeenTipped()
    })

    it('should return empty array for standalone doubled separators', () => {
      expect(splitKeyCombination('++')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "++" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('--')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "--" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('__')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "__" has invalid structure').toHaveBeenTipped()
    })
  })

  describe('splitKeySequence', () => {
    // Basic sequences
    it('should split simple sequences', () => {
      expect(splitKeySequence('a-b')).toEqual(['a', 'b'])
      expect(splitKeySequence('g-g')).toEqual(['g', 'g'])
    })

    it('should handle long sequences', () => {
      expect(splitKeySequence('a-b-c-d')).toEqual(['a', 'b', 'c', 'd'])
    })

    // Sequences with combinations
    it('should split sequences with combinations', () => {
      expect(splitKeySequence('ctrl+k-p')).toEqual(['ctrl+k', 'p'])
    })

    // Single combinations (no sequence)
    it('should handle single combinations', () => {
      expect(splitKeySequence('ctrl+k')).toEqual(['ctrl+k'])
    })

    // Edge cases and literals
    it('should handle literal minus in a sequence', () => {
      expect(splitKeySequence('ctrl+a-shift+-')).toEqual(['ctrl+a', 'shift+-'])
    })

    it('should correctly parse meta+--k', () => {
      expect(splitKeySequence('meta+--k')).toEqual(['meta+-', 'k'])
    })

    it('should correctly parse --+', () => {
      expect(splitKeySequence('--+')).toEqual(['-', '+'])
    })

    it('should correctly parse ---', () => {
      expect(splitKeySequence('---')).toEqual(['-', '-'])
    })

    it('should correctly parse shift---alt++', () => {
      expect(splitKeySequence('shift---alt++')).toEqual(['shift', '-', 'alt++'])
    })

    // Invalid sequences
    it('should return empty array for empty string', () => {
      expect(splitKeySequence('')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: empty string provided').toHaveBeenTipped()
    })

    it('should return empty array for leading sequence separator', () => {
      expect(splitKeySequence('-a')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "-a" contains invalid combinations').toHaveBeenTipped()
    })

    it('should return empty array for trailing sequence separator', () => {
      expect(splitKeySequence('a-')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "a-" contains invalid combinations').toHaveBeenTipped()
    })

    it('should return empty array for invalid parts', () => {
      expect(splitKeySequence('a-ctrl+-b')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "a-ctrl+-b" contains invalid combinations').toHaveBeenTipped()
    })
  })

  describe('integration tests', () => {
    it('should correctly parse a complex sequence', () => {
      const sequence = 'ctrl+shift+a-alt+--k-+'
      const combinations = splitKeySequence(sequence)
      expect(combinations).toEqual(['ctrl+shift+a', 'alt+-', 'k', '+'])

      const first = splitKeyCombination(combinations[0])
      expect(first).toEqual(['ctrl', 'shift', 'a'])

      const second = splitKeyCombination(combinations[1])
      expect(second).toEqual(['alt', '-'])

      const third = splitKeyCombination(combinations[2])
      expect(third).toEqual(['k'])

      const fourth = splitKeyCombination(combinations[3])
      expect(fourth).toEqual(['+'])
    })
  })
})
