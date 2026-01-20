// Utilities
import { splitKeyCombination, splitKeySequence } from '../hotkey-parsing'

describe('hotkey-parsing.ts', () => {
  describe('splitKeyCombination', () => {
    // Basic combinations
    it('should split simple combinations with +', () => {
      expect(splitKeyCombination('ctrl+k')).toEqual({ keys: ['ctrl', 'k'], separators: ['+'] })
    })

    it('should split simple combinations with _', () => {
      expect(splitKeyCombination('shift_tab')).toEqual({ keys: ['shift', 'tab'], separators: ['_'] })
    })

    it('should split simple combinations with /', () => {
      expect(splitKeyCombination('up/down')).toEqual({ keys: ['arrowup', 'arrowdown'], separators: ['/'] })
    })

    // Multiple modifiers and keys
    it('should handle multiple modifiers', () => {
      expect(splitKeyCombination('ctrl+shift+k').keys).toEqual(['ctrl', 'shift', 'k'])
    })

    it('should handle multiple primary keys', () => {
      expect(splitKeyCombination('k+j').keys).toEqual(['k', 'j'])
    })

    it('should handle mixed separators', () => {
      expect(splitKeyCombination('alt_shift+t').keys).toEqual(['alt', 'shift', 't'])
    })

    // Literal keys
    it('should handle single literal keys', () => {
      // '-' is the only reachable literal key
      expect(splitKeyCombination('-').keys).toEqual(['-'])

      // '+' and '_' are not reachable literal keys and should be invalid
      expect(splitKeyCombination('+').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "+" has invalid structure').toHaveBeenTipped()

      expect(splitKeyCombination('_').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "_" has invalid structure').toHaveBeenTipped()
    })

    // Combinations with doubled literals
    it('should treat doubled literal + as invalid', () => {
      expect(splitKeyCombination('ctrl++').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "ctrl++" has invalid structure').toHaveBeenTipped()
    })

    it('should treat doubled literal _ as invalid', () => {
      expect(splitKeyCombination('ctrl__').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "ctrl__" has invalid structure').toHaveBeenTipped()
    })

    it('should handle doubled literal -', () => {
      expect(splitKeyCombination('shift--').keys).toEqual(['shift', '-'])
    })

    it('should handle combination with literal minus', () => {
      expect(splitKeyCombination('ctrl+-').keys).toEqual(['ctrl', '-'])
    })

    // Invalid combinations
    it('should return empty array for empty string', () => {
      expect(splitKeyCombination('').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: empty string provided').toHaveBeenTipped()
    })

    it('should return empty array for leading separators', () => {
      expect(splitKeyCombination('+a').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "+a" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('_a').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "_a" has invalid structure').toHaveBeenTipped()
    })

    it('should return empty array for trailing separators', () => {
      expect(splitKeyCombination('a+').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "a+" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('a_').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "a_" has invalid structure').toHaveBeenTipped()
    })

    it('should return empty array for standalone doubled separators', () => {
      expect(splitKeyCombination('++').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "++" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('--').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "--" has invalid structure').toHaveBeenTipped()
      expect(splitKeyCombination('__').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "__" has invalid structure').toHaveBeenTipped()
    })

    // Combinations starting with doubled literal separators
    it('should treat combinations starting with doubled + literal as invalid', () => {
      expect(splitKeyCombination('++k').keys).toEqual([])
      expect('[Vue warn]: Vuetify: Invalid hotkey combination: "++k" has invalid structure').toHaveBeenTipped()
    })

    // Key aliases from centralized key-aliases.ts
    it('should handle centralized key aliases', () => {
      expect(splitKeyCombination('control+k').keys).toEqual(['ctrl', 'k'])
      expect(splitKeyCombination('command+s').keys).toEqual(['cmd', 's'])
      expect(splitKeyCombination('option+tab').keys).toEqual(['alt', 'tab'])
      expect(splitKeyCombination('up').keys).toEqual(['arrowup'])
      expect(splitKeyCombination('esc').keys).toEqual(['escape'])
      expect(splitKeyCombination('minus').keys).toEqual(['-'])
      expect(splitKeyCombination('hyphen').keys).toEqual(['-'])
    })

    it('should handle all key aliases consistently', () => {
      // Modifier aliases
      expect(splitKeyCombination('control').keys).toEqual(['ctrl'])
      expect(splitKeyCombination('command').keys).toEqual(['cmd'])
      expect(splitKeyCombination('option').keys).toEqual(['alt'])

      // Arrow key aliases
      expect(splitKeyCombination('up').keys).toEqual(['arrowup'])
      expect(splitKeyCombination('down').keys).toEqual(['arrowdown'])
      expect(splitKeyCombination('left').keys).toEqual(['arrowleft'])
      expect(splitKeyCombination('right').keys).toEqual(['arrowright'])

      // Common key aliases
      expect(splitKeyCombination('esc').keys).toEqual(['escape'])
      expect(splitKeyCombination('return').keys).toEqual(['enter'])
      expect(splitKeyCombination('del').keys).toEqual(['delete'])
      expect(splitKeyCombination('space').keys).toEqual([' '])
      expect(splitKeyCombination('spacebar').keys).toEqual([' '])

      // Symbol aliases
      expect(splitKeyCombination('minus').keys).toEqual(['-'])
      expect(splitKeyCombination('hyphen').keys).toEqual(['-'])
    })

    it('should handle key aliases in complex combinations', () => {
      expect(splitKeyCombination('control+option+up').keys).toEqual(['ctrl', 'alt', 'arrowup'])
      expect(splitKeyCombination('command+shift+esc').keys).toEqual(['cmd', 'shift', 'escape'])
      expect(splitKeyCombination('control+return').keys).toEqual(['ctrl', 'enter'])
      expect(splitKeyCombination('alt+del').keys).toEqual(['alt', 'delete'])
      expect(splitKeyCombination('shift+minus').keys).toEqual(['shift', '-'])
    })

    it('should handle case insensitive key aliases', () => {
      expect(splitKeyCombination('CONTROL+K').keys).toEqual(['ctrl', 'k'])
      expect(splitKeyCombination('Command+S').keys).toEqual(['cmd', 's'])
      expect(splitKeyCombination('OPTION+TAB').keys).toEqual(['alt', 'tab'])
      expect(splitKeyCombination('UP').keys).toEqual(['arrowup'])
      expect(splitKeyCombination('ESC').keys).toEqual(['escape'])
      expect(splitKeyCombination('MINUS').keys).toEqual(['-'])
    })

    it('should handle mixed case aliases in combinations', () => {
      expect(splitKeyCombination('Control+Option+Up').keys).toEqual(['ctrl', 'alt', 'arrowup'])
      expect(splitKeyCombination('COMMAND+shift+ESC').keys).toEqual(['cmd', 'shift', 'escape'])
    })

    it('should handle meta key correctly for cross-platform use', () => {
      expect(splitKeyCombination('meta+s').keys).toEqual(['meta', 's'])
      expect(splitKeyCombination('meta+shift+z').keys).toEqual(['meta', 'shift', 'z'])
      expect(splitKeyCombination('meta+alt+p').keys).toEqual(['meta', 'alt', 'p'])
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
      expect(first.keys).toEqual(['ctrl', 'shift', 'a'])

      const second = splitKeyCombination(combinations[1])
      expect(second.keys).toEqual(['alt', '-'])

      const third = splitKeyCombination(combinations[2])
      expect(third.keys).toEqual(['k'])
    })
  })
})
