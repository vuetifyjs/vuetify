// Components
import { VHotkey } from '../VHotkey'

// Utilities
import { render, screen } from '@test'

describe('VHotkey.tsx', () => {
  describe('Key Parsing', () => {
    it('should parse simple key combinations with + separator', () => {
      render(() => <VHotkey keys="ctrl+k" />)

      // Should render ctrl and k keys with + separator
      expect(screen.getByCSS('.v-hotkey__combination')).toBeInTheDocument()
      expect(screen.getAllByCSS('.v-hotkey__key')).toHaveLength(2)
      expect(screen.getByCSS('.v-hotkey__divider')).toHaveTextContent('+')
    })

    it('should parse key sequences with - separator', () => {
      render(() => <VHotkey keys="ctrl+a-ctrl+b" />)

      // Should render two key combinations with "then" separator
      const combinations = screen.getAllByCSS('.v-hotkey__combination')
      expect(combinations).toHaveLength(1) // Single combination with internal separators

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(4) // ctrl, a, ctrl, b

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(3) // +, then, +
    })

    it('should correctly handle literal minus key (shift+-)', () => {
      render(() => <VHotkey keys="shift+-" displayMode="text" />)

      // Should render shift and minus keys with + separator, NOT treat - as sequence separator
      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2) // shift and -

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(1) // Only the + separator
      expect(dividers[0]).toHaveTextContent('+')

      // The second key should be the minus key
      expect(keys[1]).toHaveTextContent('-')
    })

    it('should handle minus key with alternative names', () => {
      // Test both variations in a single isolated render
      const { rerender } = render(() => <VHotkey keys="alt+minus" displayMode="text" />)

      let keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2)
      expect(keys[1]).toHaveTextContent('-')

      // Rerender with different keys
      rerender(() => <VHotkey keys="ctrl+hyphen" displayMode="text" />)
      keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2)
      expect(keys[1]).toHaveTextContent('-')
    })

    it('should not treat - as separator when not between alphanumeric characters', () => {
      render(() => <VHotkey keys="ctrl+-" />)

      // Should parse as ctrl + literal minus, not as a sequence
      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2)

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(1)
      expect(dividers[0]).toHaveTextContent('+')
    })

    it('should treat - as separator when between alphanumeric characters', () => {
      render(() => <VHotkey keys="a-b" />)

      // Should parse as sequence: a then b
      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2)

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(1)
      // Should contain "then" text (localized)
      expect(dividers[0]).toHaveTextContent(/then/i)
    })

    it('should handle complex combinations with both + and - separators', () => {
      render(() => <VHotkey keys="ctrl+shift+a-alt+b" />)

      // Should parse as: ctrl+shift+a then alt+b
      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(5) // ctrl, shift, a, alt, b

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      // Should have: +, +, then, +
      expect(dividers).toHaveLength(4)
    })

    it('should handle edge case with trailing minus', () => {
      render(() => <VHotkey keys="ctrl+k-" />)

      // Should parse as: ctrl+k then (empty), which should be handled gracefully
      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys.length).toBeGreaterThanOrEqual(2)
    })

    it('should handle edge case with leading minus', () => {
      render(() => <VHotkey keys="-ctrl+k" />)

      // Should parse as: (empty) then ctrl+k, which should be handled gracefully
      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys.length).toBeGreaterThanOrEqual(2)
    })

    it('should handle "then" keyword in key combinations correctly', () => {
      render(() => <VHotkey keys="meta+k-then-z" displayMode="text" />)

      // Should parse as: meta+k then z (NOT meta+k then THEN then z)
      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(3) // meta, k, z (NOT meta, k, then, z)

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(2) // +, then

      // Should have + between meta and k, then "then" separator, then z
      expect(dividers[0]).toHaveTextContent('+')
      expect(dividers[1]).toHaveTextContent(/then/i)

      // Keys should be meta/ctrl (platform dependent), k, z
      const firstKeyText = keys[0].textContent?.toUpperCase()
      expect(['META', 'CTRL', 'CMD', 'COMMAND']).toContain(firstKeyText)
      expect(keys[1]).toHaveTextContent('K')
      expect(keys[2]).toHaveTextContent('Z')
    })

    it('should handle various "then" keyword patterns correctly', () => {
      // Test the exact pattern from the user's screenshot issue
      render(() => <VHotkey keys="k-then-z" displayMode="text" />)

      const keys1 = screen.getAllByCSS('.v-hotkey__key')
      expect(keys1).toHaveLength(2) // k, z (NOT k, then, z)
      expect(keys1[0]).toHaveTextContent('K')
      expect(keys1[1]).toHaveTextContent('Z')

      const dividers1 = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers1).toHaveLength(1) // just "then"
      expect(dividers1[0]).toHaveTextContent(/then/i)
    })

    it('should handle case-insensitive "then" keyword patterns', () => {
      // Test case-insensitive matching
      render(() => <VHotkey keys="a-THEN-b" displayMode="text" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      const dividers = screen.getAllByCSS('.v-hotkey__divider')

      expect(keys).toHaveLength(2) // a, b
      expect(keys[0]).toHaveTextContent('A')
      expect(keys[1]).toHaveTextContent('B')
      expect(dividers).toHaveLength(1)
      expect(dividers[0]).toHaveTextContent(/then/i)
    })
  })

  describe('Display Modes', () => {
    it('should render minus key in text mode', () => {
      render(() => <VHotkey keys="shift+-" displayMode="text" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys[1]).toHaveTextContent('-')
      expect(keys[1]).toHaveClass('v-hotkey__key-text')
    })

    it('should render minus key in symbol mode', () => {
      render(() => <VHotkey keys="shift+-" displayMode="symbol" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys[1]).toHaveTextContent('-') // Minus symbol (different from hyphen)
      expect(keys[1]).toHaveClass('v-hotkey__key-symbol')
    })

    it('should render minus key in icon mode', () => {
      render(() => <VHotkey keys="shift+-" displayMode="icon" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys[1]).toHaveClass('v-hotkey__key-icon')
      // Use getAllByCSS since there are multiple icons (shift and minus)
      const icons = screen.getAllByCSS('.v-icon')
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe('Multiple Key Combinations', () => {
    it('should handle multiple space-separated combinations', () => {
      render(() => <VHotkey keys="ctrl+k meta+p" />)

      // Should render two separate combinations
      const combinations = screen.getAllByCSS('.v-hotkey__combination')
      expect(combinations).toHaveLength(2)

      // Each combination should have 2 keys
      const allKeys = screen.getAllByCSS('.v-hotkey__key')
      expect(allKeys).toHaveLength(4)
    })
  })

  describe('Custom Key Mapping', () => {
    it('should use custom key mapping when provided', () => {
      const customKeyMap = {
        '-': (mode: any, isMac: boolean) => ['text', 'MINUS'] as ['text', string],
      }

      render(() => <VHotkey keys="shift+-" keyMap={ customKeyMap } />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys[1]).toHaveTextContent('MINUS')
    })
  })

  describe('Error Handling', () => {
    it('should handle empty keys prop gracefully', () => {
      render(() => <VHotkey keys="" />)

      expect(screen.getByCSS('.v-hotkey')).toBeInTheDocument()
      expect(screen.queryAllByCSS('.v-hotkey__key')).toHaveLength(0)
    })

    it('should handle undefined keys prop gracefully', () => {
      render(() => <VHotkey />)

      expect(screen.getByCSS('.v-hotkey')).toBeInTheDocument()
      expect(screen.queryAllByCSS('.v-hotkey__key')).toHaveLength(0)
    })
  })

  describe('Text-only Key Configuration', () => {
    it('should render text value when only text is provided in key config (text mode)', () => {
      render(() => <VHotkey keys="escape" displayMode="text" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(1)
      expect(keys[0]).toHaveTextContent(/Escape/i) // Should show localized text
      expect(keys[0]).toHaveClass('v-hotkey__key-text')
    })

    it('should fallback to text when only text is provided in key config (symbol mode)', () => {
      render(() => <VHotkey keys="escape" displayMode="symbol" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(1)
      // Should fallback to text when symbol is not available
      expect(keys[0]).toHaveTextContent(/Escape/i)
      expect(keys[0]).toHaveClass('v-hotkey__key-text') // Should use text CSS class when fallback occurs
    })

    it('should fallback to text when only text is provided in key config (icon mode)', () => {
      render(() => <VHotkey keys="escape" displayMode="icon" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(1)
      // Should fallback to text when icon is not available
      expect(keys[0]).toHaveTextContent(/Escape/i)
      expect(keys[0]).toHaveClass('v-hotkey__key-text') // Should use text CSS class when fallback occurs
    })

    it('should handle custom key with only text config in all display modes', () => {
      const customKeyMap = {
        customkey: (mode: any, isMac: boolean) => ['text', 'CUSTOM'] as ['text', string],
      }

      // Test all modes in sequence using rerender to avoid interference
      const { rerender } = render(() => <VHotkey keys="customkey" displayMode="text" keyMap={ customKeyMap } />)
      expect(screen.getAllByCSS('.v-hotkey__key')[0]).toHaveTextContent('CUSTOM')
      expect(screen.getAllByCSS('.v-hotkey__key')[0]).toHaveClass('v-hotkey__key-text')

      // Test symbol mode - should fallback to text since custom key only provides text
      rerender(() => <VHotkey keys="customkey" displayMode="symbol" keyMap={ customKeyMap } />)
      expect(screen.getAllByCSS('.v-hotkey__key')[0]).toHaveTextContent('CUSTOM')
      expect(screen.getAllByCSS('.v-hotkey__key')[0]).toHaveClass('v-hotkey__key-text')

      // Test icon mode - should fallback to text since custom key only provides text
      rerender(() => <VHotkey keys="customkey" displayMode="icon" keyMap={ customKeyMap } />)
      expect(screen.getAllByCSS('.v-hotkey__key')[0]).toHaveTextContent('CUSTOM')
      expect(screen.getAllByCSS('.v-hotkey__key')[0]).toHaveClass('v-hotkey__key-text')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for screen readers', () => {
      render(() => <VHotkey keys="ctrl+k" />)
      const container = screen.getByCSS('.v-hotkey')

      // Should have role="img" for semantic meaning
      expect(container).toHaveAttribute('role', 'img')

      // Should have aria-label with readable description
      expect(container).toHaveAttribute('aria-label')
      expect(container.getAttribute('aria-label')).toMatch(/Keyboard shortcut/i)
    })

    it('should hide visual elements from screen readers', () => {
      render(() => <VHotkey keys="ctrl+k" />)

      // Individual keys should be hidden from screen readers
      const keys = screen.getAllByCSS('.v-hotkey__key')
      keys.forEach(key => {
        expect(key).toHaveAttribute('aria-hidden', 'true')
      })

      // Dividers should be hidden from screen readers
      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      dividers.forEach(divider => {
        expect(divider).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should handle empty state gracefully', () => {
      render(() => <VHotkey keys="" />)
      const container = screen.getByCSS('.v-hotkey')

      // Should not have aria-describedby for empty state
      expect(container).not.toHaveAttribute('aria-describedby')

      // Should have an empty aria-label for empty state
      expect(container).toHaveAttribute('aria-label', '')
    })

    it('should generate readable text for complex shortcuts', () => {
      render(() => <VHotkey keys="ctrl+shift+k-then-p" />)
      const container = screen.getByCSS('.v-hotkey')
      const ariaLabel = container.getAttribute('aria-label')

      // Should contain readable text representation
      expect(ariaLabel).toMatch(/Keyboard shortcut/i)
      // The locale keys start with $, so we check for those patterns
      expect(ariaLabel).toMatch(/CTRL/i)
      expect(ariaLabel).toMatch(/SHIFT/i)
      expect(ariaLabel).toMatch(/then/i)
    })
  })

  describe('Visual Rendering', () => {
    it('should render key combinations visually correctly', () => {
      render(() => <VHotkey keys="ctrl+shift+a" displayMode="text" />)

      const hotkeyContainer = screen.getByCSS('.v-hotkey')
      expect(hotkeyContainer).toBeVisible()

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(3)

      // Check that keys are visually present
      keys.forEach(key => {
        expect(key).toBeVisible()
      })

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(2)

      // Check that dividers are visually present
      dividers.forEach(divider => {
        expect(divider).toBeVisible()
        expect(divider).toHaveTextContent('+')
      })
    })

    it('should apply correct CSS classes for different display modes', () => {
      // Test all modes in sequence using rerender
      const { rerender } = render(() => <VHotkey keys="ctrl+k" displayMode="text" />)
      const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      expect(textKeys.length).toBeGreaterThan(0)

      // Test symbol mode - keys that have symbols should render with symbol class
      // For ctrl+k, ctrl has a symbol but k doesn't, so k will fallback to text
      rerender(() => <VHotkey keys="shift+k" displayMode="symbol" />)
      const shiftSymbolKeys = screen.queryAllByCSS('.v-hotkey__key-symbol')
      const textFallbackKeys = screen.queryAllByCSS('.v-hotkey__key-text')
      // Either we have symbol keys or text fallback keys (or both)
      expect(shiftSymbolKeys.length + textFallbackKeys.length).toBeGreaterThan(0)

      // Test icon mode - use keys that have icon representations
      rerender(() => <VHotkey keys="shift+enter" displayMode="icon" />)
      const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
      const iconTextKeys = screen.queryAllByCSS('.v-hotkey__key-text')
      // Should have either icon keys or fallback to text keys
      expect(iconKeys.length + iconTextKeys.length).toBeGreaterThan(0)
    })

    it('should handle sequence separators correctly in visual output', () => {
      render(() => <VHotkey keys="ctrl+a-escape" displayMode="text" />)

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(2)

      // First divider should be +
      expect(dividers[0]).toHaveTextContent('+')

      // Second divider should be "then" (localized)
      expect(dividers[1]).toHaveTextContent(/then/i)
    })
  })
})
