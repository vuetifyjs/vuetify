// Utilities
import { splitKeyCombination, splitKeySequence } from '../hotkey-parsing'

describe('hotkey-parsing.ts', () => {
  describe('splitKeySequence', () => {
    it('should split simple sequences', () => {
      expect(splitKeySequence('a-b')).toEqual(['a', 'b'])
      expect(splitKeySequence('ctrl+k-p')).toEqual(['ctrl+k', 'p'])
      expect(splitKeySequence('g-g')).toEqual(['g', 'g'])
    })

    it('should handle single combinations', () => {
      expect(splitKeySequence('ctrl+k')).toEqual(['ctrl+k'])
      expect(splitKeySequence('shift+tab')).toEqual(['shift+tab'])
    })

    it('should handle literal minus keys', () => {
      expect(splitKeySequence('ctrl+-')).toEqual(['ctrl+-'])
      expect(splitKeySequence('shift+--')).toEqual(['shift+--'])
      expect(splitKeySequence('alt---')).toEqual([]) // INVALID PATTERN! Last dash is a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "alt---" has invalid trailing pattern').toHaveBeenTipped()
    })

    it('should handle complex sequences with literal minus', () => {
      expect(splitKeySequence('ctrl+a-shift+-')).toEqual(['ctrl+a', 'shift+-'])
      expect(splitKeySequence('meta+--k')).toEqual(['meta+-', 'k'])
    })

    it('should handle mixed separators correctly', () => {
      expect(splitKeySequence('ctrl_k-p')).toEqual(['ctrl_k', 'p'])
      expect(splitKeySequence('alt+-k')).toEqual([]) // INVALID PATTERN! K has no preceding separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "alt+" has invalid structure').toHaveBeenTipped()
      // Additional warning emitted for the full invalid combination
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "alt+-k" contains invalid patterns').toHaveBeenTipped()
      // Final validation warning from the sequence parser
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "alt+-k" contains invalid key combinations').toHaveBeenTipped()
    })

    it('should handle edge cases', () => {
      expect(splitKeySequence('')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: empty string provided').toHaveBeenTipped()
      expect(splitKeySequence('-')).toEqual(['-']) // Valid pattern
      expect(splitKeySequence('--')).toEqual([]) // INVALID PATTERN! Last dash is a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "--" is not a valid sequence').toHaveBeenTipped()
      expect(splitKeySequence('---')).toEqual(['---']) // Valid pattern, user presses minus key twice
    })

    it('should handle long sequences', () => {
      expect(splitKeySequence('ctrl+k-p-s')).toEqual(['ctrl+k', 'p', 's'])
      expect(splitKeySequence('a-b-c-d')).toEqual(['a', 'b', 'c', 'd'])
    })

    it('should not split when dash is not between valid characters', () => {
      expect(splitKeySequence('ctrl++-')).toEqual([]) // INVALID PATTERN! Last dash is a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "ctrl++-" contains invalid separator patterns').toHaveBeenTipped()
      expect(splitKeySequence('meta---')).toEqual([]) // INVALID PATTERN! Last dash is a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "meta---" has invalid trailing pattern').toHaveBeenTipped()
      expect(splitKeySequence('shift+_-')).toEqual([]) // INVALID PATTERN! Last dash is a separator
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "shift+_-" could not be parsed').toHaveBeenTipped()
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "shift+_-" contains invalid key combinations').toHaveBeenTipped()
    })
  })

  describe('splitKeyCombination', () => {
    it('should split simple combinations', () => {
      expect(splitKeyCombination('ctrl+k')).toEqual(['ctrl', 'k'])
      expect(splitKeyCombination('shift+tab')).toEqual(['shift', 'tab'])
      expect(splitKeyCombination('alt+f4')).toEqual(['alt', 'f4'])
    })

    it('should handle multiple modifiers', () => {
      expect(splitKeyCombination('ctrl+shift+k')).toEqual(['ctrl', 'shift', 'k'])
      expect(splitKeyCombination('ctrl+alt+delete')).toEqual(['ctrl', 'alt', 'delete'])
      expect(splitKeyCombination('meta+shift+z')).toEqual(['meta', 'shift', 'z'])
    })

    it('should reject invalid literal separator patterns', () => {
      expect(splitKeyCombination('ctrl+--')).toEqual([]) // INVALID PATTERN! Last dash is a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "ctrl+--" contains invalid patterns').toHaveBeenTipped()
      expect(splitKeyCombination('shift+__')).toEqual([]) // INVALID PATTERN! Last underscore is a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "shift+__" contains invalid patterns').toHaveBeenTipped()
    })

    it('should handle mixed separators', () => {
      expect(splitKeyCombination('ctrl_k')).toEqual(['ctrl', 'k'])
      expect(splitKeyCombination('alt_shift_tab')).toEqual(['alt', 'shift', 'tab'])
    })

    it('should handle literal minus key', () => {
      expect(splitKeyCombination('ctrl+-')).toEqual(['ctrl', '-'])
      expect(splitKeyCombination('shift+-')).toEqual(['shift', '-'])
      expect(splitKeyCombination('alt+minus')).toEqual(['alt', 'minus'])
    })

    it('should return empty array for invalid combinations', () => {
      expect(splitKeyCombination('')).toEqual([]) // INVALID PATTERN! No keys.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: empty string provided').toHaveBeenTipped()
      // Single plus and underscore keys are valid literal keys, so they should not be in this invalid list
      expect(splitKeyCombination('ctrl+')).toEqual([]) // INVALID PATTERN! Every even key must be a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "ctrl+" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('+ctrl')).toEqual([]) // INVALID PATTERN! Every even key must be a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "+ctrl" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('_shift')).toEqual([]) // INVALID PATTERN! Every even key must be a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "_shift" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('ctrl++')).toEqual(['ctrl', '+'])
      expect(splitKeyCombination('meta_+')).toEqual([]) // INVALID PATTERN! Every even key must be a separator.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "meta_+" has invalid structure').toHaveBeenTipped()
    })

    it('should validate combinations correctly', () => {
      // Valid combinations
      expect(splitKeyCombination('k')).toEqual(['k'])
      expect(splitKeyCombination('ctrl+k')).toEqual(['ctrl', 'k'])
      expect(splitKeyCombination('ctrl+shift')).toEqual(['ctrl', 'shift']) // Two modifiers OK

      // Invalid combinations (multiple primary keys)
      expect(splitKeyCombination('k+j')).toEqual(['k', 'j']) // Allowed multiple primaries separated by +
      expect(splitKeyCombination('ctrl+k+j')).toEqual(['ctrl', 'k', 'j'])
    })

    it('should handle repeated separators correctly', () => {
      expect(splitKeyCombination('---')).toEqual(['-']) // Valid: user presses minus key
      expect(splitKeyCombination('+++')).toEqual([]) // Invalid pattern. It is impossible for a user to press the plus button twice AND simultaneously.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "+++" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('___')).toEqual([]) // Invalid pattern. It is impossible for a user to press the underscore button twice AND simultaneously.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "___" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('ctrl---')).toEqual([]) // INVALID PATTERN! It is impossible for a user to press the minus button twice AND simultaneously.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "ctrl---" contains invalid patterns').toHaveBeenTipped()
      expect(splitKeyCombination('shift++++')).toEqual([]) // INVALID PATTERN! It is impossible for a user to press the plus button twice AND simultaneously.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "shift++++" contains invalid patterns').toHaveBeenTipped()
      expect(splitKeyCombination('alt____')).toEqual([]) // INVALID PATTERN! It is impossible for a user to press the underscore button twice AND simultaneously.
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "alt____" contains invalid patterns').toHaveBeenTipped()
    })

    it('should handle single keys', () => {
      expect(splitKeyCombination('k')).toEqual(['k'])
      expect(splitKeyCombination('escape')).toEqual(['escape'])
      expect(splitKeyCombination('f1')).toEqual(['f1'])
      expect(splitKeyCombination('+')).toEqual(['+'])
      expect(splitKeyCombination('-')).toEqual(['-'])
      expect(splitKeyCombination('_')).toEqual(['_'])
    })
  })

  describe('integration tests', () => {
    it('should work together for simple patterns', () => {
      // Test the full parsing pipeline
      const sequence = 'ctrl+shift+a-alt+k-escape'
      const groups = splitKeySequence(sequence)
      expect(groups).toEqual(['ctrl+shift+a', 'alt+k', 'escape'])

      const firstGroup = splitKeyCombination(groups[0])
      expect(firstGroup).toEqual(['ctrl', 'shift', 'a'])

      const secondGroup = splitKeyCombination(groups[1])
      expect(secondGroup).toEqual(['alt', 'k'])

      const thirdGroup = splitKeyCombination(groups[2])
      expect(thirdGroup).toEqual(['escape'])
    })

    it('should handle real-world examples correctly', () => {
      // Valid literal minus key
      const sequence1 = 'meta+-'
      const groups1 = splitKeySequence(sequence1)
      expect(groups1).toEqual(['meta+-'])

      const combination1 = splitKeyCombination(groups1[0])
      expect(combination1).toEqual(['meta', '-'])

      // Simple sequences
      const sequence2 = 'ctrl+k-p'
      const groups2 = splitKeySequence(sequence2)
      expect(groups2).toEqual(['ctrl+k', 'p'])

      const firstGroup2 = splitKeyCombination(groups2[0])
      expect(firstGroup2).toEqual(['ctrl', 'k'])

      const secondGroup2 = splitKeyCombination(groups2[1])
      expect(secondGroup2).toEqual(['p'])
    })

    it('should handle literal separators correctly', () => {
      // Single dash doesn't sequence split because it's just one character
      const sequence = '-'
      const groups = splitKeySequence(sequence)
      expect(groups).toEqual(['-'])

      const combination = splitKeyCombination(groups[0])
      expect(combination).toEqual(['-'])
    })

    it('should handle sequences with only symbols', () => {
      // Test what --+ should parse to
      const sequence = '--+' // THIS IS VALID! It becomes `-` then `+`
      const groups = splitKeySequence(sequence)

      // This should be invalid because --+ has invalid structure
      expect(groups).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "--+" has invalid structure').toHaveBeenTipped()
      // Final validation warning from the sequence parser
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "--+" contains invalid key combinations').toHaveBeenTipped()

      // Both individual combinations should be valid
      expect(splitKeyCombination('-')).toEqual(['-'])
      expect(splitKeyCombination('+')).toEqual(['+'])
    })
  })
})
