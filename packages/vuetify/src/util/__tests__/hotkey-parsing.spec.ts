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
      // '-' is the only reachable literal key
      expect(splitKeyCombination('-')).toEqual(['-'])

      // '+' and '_' are not reachable literal keys and should be invalid
      expect(splitKeyCombination('+')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "+" has invalid structure').toHaveBeenTipped()

      expect(splitKeyCombination('_')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "_" has invalid structure').toHaveBeenTipped()
    })

    // Combinations with doubled literals
    it('should treat doubled literal + as invalid', () => {
      expect(splitKeyCombination('ctrl++')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "ctrl++" has invalid structure').toHaveBeenTipped()
    })

    it('should treat doubled literal _ as invalid', () => {
      expect(splitKeyCombination('ctrl__')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "ctrl__" has invalid structure').toHaveBeenTipped()
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

    // Combinations starting with doubled literal separators
    it('should treat combinations starting with doubled + literal as invalid', () => {
      expect(splitKeyCombination('++k')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "++k" has invalid structure').toHaveBeenTipped()
    })

    // Key aliases from centralized key-aliases.ts
    it('should handle centralized key aliases', () => {
      expect(splitKeyCombination('control+k')).toEqual(['ctrl', 'k'])
      expect(splitKeyCombination('command+s')).toEqual(['cmd', 's'])
      expect(splitKeyCombination('option+tab')).toEqual(['alt', 'tab'])
      expect(splitKeyCombination('up')).toEqual(['arrowup'])
      expect(splitKeyCombination('esc')).toEqual(['escape'])
      expect(splitKeyCombination('minus')).toEqual(['-'])
      expect(splitKeyCombination('hyphen')).toEqual(['-'])
    })

    it('should handle all key aliases consistently', () => {
      // Modifier aliases
      expect(splitKeyCombination('control')).toEqual(['ctrl'])
      expect(splitKeyCombination('command')).toEqual(['cmd'])
      expect(splitKeyCombination('option')).toEqual(['alt'])

      // Arrow key aliases
      expect(splitKeyCombination('up')).toEqual(['arrowup'])
      expect(splitKeyCombination('down')).toEqual(['arrowdown'])
      expect(splitKeyCombination('left')).toEqual(['arrowleft'])
      expect(splitKeyCombination('right')).toEqual(['arrowright'])

      // Common key aliases
      expect(splitKeyCombination('esc')).toEqual(['escape'])
      expect(splitKeyCombination('return')).toEqual(['enter'])
      expect(splitKeyCombination('del')).toEqual(['delete'])

      // Symbol aliases
      expect(splitKeyCombination('minus')).toEqual(['-'])
      expect(splitKeyCombination('hyphen')).toEqual(['-'])
    })

    it('should handle key aliases in complex combinations', () => {
      expect(splitKeyCombination('control+option+up')).toEqual(['ctrl', 'alt', 'arrowup'])
      expect(splitKeyCombination('command+shift+esc')).toEqual(['cmd', 'shift', 'escape'])
      expect(splitKeyCombination('control+return')).toEqual(['ctrl', 'enter'])
      expect(splitKeyCombination('alt+del')).toEqual(['alt', 'delete'])
      expect(splitKeyCombination('shift+minus')).toEqual(['shift', '-'])
    })

    it('should handle case insensitive key aliases', () => {
      expect(splitKeyCombination('CONTROL+K')).toEqual(['ctrl', 'k'])
      expect(splitKeyCombination('Command+S')).toEqual(['cmd', 's'])
      expect(splitKeyCombination('OPTION+TAB')).toEqual(['alt', 'tab'])
      expect(splitKeyCombination('UP')).toEqual(['arrowup'])
      expect(splitKeyCombination('ESC')).toEqual(['escape'])
      expect(splitKeyCombination('MINUS')).toEqual(['-'])
    })

    it('should handle mixed case aliases in combinations', () => {
      expect(splitKeyCombination('Control+Option+Up')).toEqual(['ctrl', 'alt', 'arrowup'])
      expect(splitKeyCombination('COMMAND+shift+ESC')).toEqual(['cmd', 'shift', 'escape'])
    })

    it('should handle meta key correctly for cross-platform use', () => {
      expect(splitKeyCombination('meta+s')).toEqual(['meta', 's'])
      expect(splitKeyCombination('meta+shift+z')).toEqual(['meta', 'shift', 'z'])
      expect(splitKeyCombination('meta+alt+p')).toEqual(['meta', 'alt', 'p'])
    })
  })

  describe('splitKeySequence', () => {
    // Basic sequences
    it('should split simple sequences', () => {
      expect(splitKeySequence('a-b')).toEqual(['a', 'b'])
      expect(splitKeySequence('g-g')).toEqual(['g', 'g'])
    })

    it('should handle ctrl-b as a valid sequence', () => {
      expect(splitKeySequence('ctrl-b')).toEqual(['ctrl', 'b'])
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
      expect(splitKeySequence('--+')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "--+" contains invalid combinations').toHaveBeenTipped()
    })

    it('should correctly parse ---', () => {
      expect(splitKeySequence('---')).toEqual(['-', '-'])
    })

    it('should treat shift---alt++ as invalid', () => {
      expect(splitKeySequence('shift---alt++')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "shift---alt++" contains invalid combinations').toHaveBeenTipped()
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

    // Sequences with combinations that start with doubled literal
    it('should treat cmd+shift-++k as invalid', () => {
      expect(splitKeySequence('cmd+shift-++k')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "cmd+shift-++k" contains invalid combinations').toHaveBeenTipped()
    })

    it('should treat cmd+shift++-k as invalid', () => {
      expect(splitKeySequence('cmd+shift++-k')).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey sequence: "cmd+shift++-k" contains invalid combinations').toHaveBeenTipped()
    })
  })

  describe('integration tests', () => {
    it('should correctly parse a complex sequence', () => {
      const sequence = 'ctrl+shift+a-alt+--k'
      const combinations = splitKeySequence(sequence)
      expect(combinations).toEqual(['ctrl+shift+a', 'alt+-', 'k'])

      const first = splitKeyCombination(combinations[0])
      expect(first).toEqual(['ctrl', 'shift', 'a'])

      const second = splitKeyCombination(combinations[1])
      expect(second).toEqual(['alt', '-'])

      const third = splitKeyCombination(combinations[2])
      expect(third).toEqual(['k'])
    })
  })
})
