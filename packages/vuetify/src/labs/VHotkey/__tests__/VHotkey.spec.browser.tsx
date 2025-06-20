// Components
import { VHotkey } from '../VHotkey'

// Utilities
import { render, screen } from '@test'
import { ref, defineComponent } from 'vue'

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

  describe('Platform-specific Rendering', () => {
    const originalUserAgent = navigator.userAgent

    afterEach(() => {
      // Restore original userAgent after each test
      Object.defineProperty(window.navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true,
      })
    })

    it('should fall back to text when displayMode is "icon" on non-Mac platforms', () => {
      // Simulate a Windows environment (non-Mac)
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows NT 10.0',
        configurable: true,
      })

      render(() => <VHotkey keys="ctrl+k" />) // displayMode defaults to 'icon'

      // On Windows, no icon should be rendered for the Ctrl key
      const icons = screen.queryAllByCSS('.v-icon')
      expect(icons).toHaveLength(0)

      // The component should instead render text for the keys
      const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      expect(textKeys.length).toBeGreaterThanOrEqual(1)
      expect(textKeys[0]).toHaveTextContent(/ctrl/i)
    })

    it('should render icons when displayMode is "icon" on Mac platforms', () => {
      // Simulate a Mac environment
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        configurable: true,
      })

      render(() => <VHotkey keys="cmd+k" />) // displayMode defaults to 'icon'

      // On Mac, icons should be rendered for keys that have icon configurations
      const icons = screen.queryAllByCSS('.v-icon')
      expect(icons.length).toBeGreaterThan(0)

      // Should have icon keys, not text keys
      const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
      expect(iconKeys.length).toBeGreaterThan(0)
    })

    it('should render plain "Ctrl" text without "$" prefix on non-Mac platforms', () => {
      // Simulate a Windows environment (non-Mac)
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows NT 10.0',
        configurable: true,
      })

      render(() => <VHotkey keys="ctrl+k" />)

      const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      expect(textKeys[0]).toHaveTextContent('Ctrl')
      expect(textKeys[0]).not.toHaveTextContent('$ctrl')
    })

    it('should handle icon tokens in text mode gracefully', () => {
      // Simulate a Windows environment (non-Mac)
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows NT 10.0',
        configurable: true,
      })

      // Create a keyMap that has an incomplete text configuration (simulating the docs bug)
      const problematicKeyMap = {
        ctrl: (mode: any, isMac: boolean) => {
          // This simulates a keyMap where text mode accidentally returns an icon token
          if (mode === 'text') return ['text', '$ctrl'] as ['text', string] // Bug: icon token in text mode
          if (mode === 'icon') return ['icon', '$ctrl'] as ['icon', any]
          return ['text', '$ctrl'] as ['text', string]
        },
      }

      render(() => <VHotkey keys="ctrl" keyMap={ problematicKeyMap } displayMode="text" />)

      const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      expect(textKeys).toHaveLength(1)

      // After the fix, should render "CTRL" instead of "$ctrl"
      expect(textKeys[0]).toHaveTextContent('CTRL') // Should be converted from $ctrl to CTRL
      expect(textKeys[0]).not.toHaveTextContent('$ctrl') // Should not contain the icon token
    })

    it('should preserve valid localization keys starting with $vuetify', () => {
      // Simulate a Windows environment (non-Mac)
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows NT 10.0',
        configurable: true,
      })

      // Create a keyMap that uses proper localization keys
      const localizationKeyMap = {
        ctrl: (mode: any, isMac: boolean) => {
          if (mode === 'text') return ['text', '$vuetify.hotkey.ctrl'] as ['text', string] // Valid localization key
          return ['text', '$vuetify.hotkey.ctrl'] as ['text', string]
        },
      }

      render(() => <VHotkey keys="ctrl" keyMap={ localizationKeyMap } displayMode="text" />)

      const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      expect(textKeys).toHaveLength(1)

      // Should preserve the localization key and let the translation system handle it
      expect(textKeys[0]).toHaveTextContent('Ctrl') // Should be translated by the locale system
    })

    it('should force mac rendering when overridePlatform="mac" is set on non-Mac platform', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows NT 10.0',
        configurable: true,
      })

      render(() => <VHotkey keys="cmd+k" overridePlatform="mac" />)

      // Expect icons present due to forced mac
      const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
      expect(iconKeys.length).toBeGreaterThan(0)
    })

    it('should force non-Mac rendering when overridePlatform is any string other than "mac"', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', // Mac user agent
        configurable: true,
      })

      // Test various non-'mac' strings
      const nonMacValues = ['pc', 'windows', 'linux', 'android', 'chrome', 'whatever']

      for (const platform of nonMacValues) {
        const { unmount } = render(() => <VHotkey keys="cmd+k" overridePlatform={ platform } />)

        // Should not render icons (Mac behavior) despite being on Mac
        const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys).toHaveLength(0)

        // Should render text instead (non-Mac behavior)
        const textKeys = screen.queryAllByCSS('.v-hotkey__key-text')
        expect(textKeys.length).toBeGreaterThan(0)

        unmount()
      }
    })
  })

  describe('Platform Override Behavior with cmd+k', () => {
    const originalUserAgent = navigator.userAgent

    afterEach(() => {
      // Restore original userAgent after each test
      Object.defineProperty(window.navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true,
      })
    })

    describe('overridePlatform undefined, displayMode undefined (defaults to icon)', () => {
      it('should show command icon on Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" />)

        // Should have command icon
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)

        // Should not show "Ctrl" text
        const textKeys = screen.queryAllByCSS('.v-hotkey__key-text')
        const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
        expect(ctrlText).toBeUndefined()
      })

      it('should show Ctrl text on non-Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" />)

        // Should not have icons (non-Mac fallback to text)
        const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys).toHaveLength(0)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
        expect(ctrlText).toBeDefined()
      })
    })

    describe('overridePlatform undefined, displayMode icon', () => {
      it('should show command icon on Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" displayMode="icon" />)

        // Should have command icon
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)
      })

      it('should show Ctrl text on non-Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" displayMode="icon" />)

        // Should fallback to text (no icons on non-Mac)
        const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys).toHaveLength(0)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
        expect(ctrlText).toBeDefined()
      })
    })

    describe('overridePlatform mac, displayMode undefined (defaults to icon)', () => {
      it('should show command icon on Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="mac" />)

        // Should have command icon
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)
      })

      it('should show command icon on non-Mac (forced Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="mac" />)

        // Should have command icon (forced Mac behavior)
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)

        // Should not show "Ctrl" text
        const textKeys = screen.queryAllByCSS('.v-hotkey__key-text')
        const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
        expect(ctrlText).toBeUndefined()
      })
    })

    describe('overridePlatform mac, displayMode icon', () => {
      it('should show command icon on Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="mac" displayMode="icon" />)

        // Should have command icon
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)
      })

      it('should show command icon on non-Mac (forced Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="mac" displayMode="icon" />)

        // Should have command icon (forced Mac behavior)
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)
      })
    })

    describe('overridePlatform non-mac string, displayMode undefined (defaults to icon)', () => {
      it('should show Ctrl text on Mac (forced non-Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="pc" />)

        // Should not have icons (forced non-Mac behavior)
        const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys).toHaveLength(0)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
        expect(ctrlText).toBeDefined()
      })

      it('should show Ctrl text on non-Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="pc" />)

        // Should not have icons
        const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys).toHaveLength(0)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
        expect(ctrlText).toBeDefined()
      })
    })

    describe('overridePlatform mac, displayMode symbol', () => {
      it('should show command symbol on Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="mac" displayMode="symbol" />)

        // Should have command symbol
        const symbolKeys = screen.getAllByCSS('.v-hotkey__key-symbol')
        expect(symbolKeys.length).toBeGreaterThan(0)

        // Should contain the command symbol ⌘
        const commandSymbol = symbolKeys.find(key => key.textContent?.includes('⌘'))
        expect(commandSymbol).toBeDefined()
      })

      it('should show command symbol on non-Mac (forced Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="mac" displayMode="symbol" />)

        // Should have command symbol (forced Mac behavior)
        const symbolKeys = screen.getAllByCSS('.v-hotkey__key-symbol')
        expect(symbolKeys.length).toBeGreaterThan(0)

        // Should contain the command symbol ⌘
        const commandSymbol = symbolKeys.find(key => key.textContent?.includes('⌘'))
        expect(commandSymbol).toBeDefined()
      })
    })

    describe('overridePlatform non-mac string, displayMode text', () => {
      it('should show Ctrl text on Mac (forced non-Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="pc" displayMode="text" />)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
        expect(ctrlText).toBeDefined()
      })

      it('should show Ctrl text on non-Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" overridePlatform="pc" displayMode="text" />)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
        expect(ctrlText).toBeDefined()
      })
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

  describe('Reactivity', () => {
    const originalUserAgent = navigator.userAgent

    afterEach(() => {
      // Restore original userAgent after each test
      Object.defineProperty(window.navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true,
      })
    })

    it('should react to overridePlatform prop changes', async () => {
      // Start on a Windows machine
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows NT 10.0',
        configurable: true,
      })

      const TestWrapper = defineComponent({
        setup () {
          const overridePlatform = ref<string | undefined>(undefined)
          return { overridePlatform }
        },
        render () {
          return <VHotkey keys="cmd+k" overridePlatform={this.overridePlatform} />
        },
      })

      const wrapper = render(TestWrapper)

      // Initially should show Ctrl (Windows auto-detection)
      let textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      let ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
      expect(ctrlText).toBeDefined()
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)

      // Change to mac override
      await wrapper.rerender({ overridePlatform: 'mac' })

      // Should now show command icon (forced Mac behavior)
      const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
      expect(iconKeys.length).toBeGreaterThan(0)
      textKeys = screen.queryAllByCSS('.v-hotkey__key-text')
      ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
      expect(ctrlText).toBeUndefined()

      // Change to pc override
      await wrapper.rerender({ overridePlatform: 'pc' })

      // Should go back to Ctrl text (forced PC behavior)
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)
      textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
      expect(ctrlText).toBeDefined()

      // Change back to undefined (auto-detection)
      await wrapper.rerender({ overridePlatform: undefined })

      // Should show Ctrl again (Windows auto-detection)
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)
      textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
      expect(ctrlText).toBeDefined()
    })

    it('should react to displayMode prop changes while maintaining platform behavior', async () => {
      // Start on a Mac
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        configurable: true,
      })

      const TestWrapper = defineComponent({
        setup () {
          const displayMode = ref<'icon' | 'symbol' | 'text'>('icon')
          const overridePlatform = ref<string>('mac')
          return { displayMode, overridePlatform }
        },
        render () {
          return <VHotkey keys="cmd+k" displayMode={this.displayMode} overridePlatform={this.overridePlatform} />
        },
      })

      const wrapper = render(TestWrapper)

      // Initially should show command icon
      const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
      expect(iconKeys.length).toBeGreaterThan(0)

      // Change to symbol mode
      await wrapper.rerender({ displayMode: 'symbol', overridePlatform: 'mac' })

      // Should show command symbol
      const symbolKeys = screen.getAllByCSS('.v-hotkey__key-symbol')
      expect(symbolKeys.length).toBeGreaterThan(0)
      const commandSymbol = symbolKeys.find(key => key.textContent?.includes('⌘'))
      expect(commandSymbol).toBeDefined()

      // Change platform to PC while keeping symbol mode
      await wrapper.rerender({ displayMode: 'symbol', overridePlatform: 'pc' })

      // Should show Ctrl text (PC doesn't have command symbols)
      expect(screen.queryAllByCSS('.v-hotkey__key-symbol')).toHaveLength(0)
      const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      const ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
      expect(ctrlText).toBeDefined()

      // Change back to icon mode while on PC
      await wrapper.rerender({ displayMode: 'icon', overridePlatform: 'pc' })

      // Should still show Ctrl text (PC doesn't use icons for modifiers)
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)
      const textKeys2 = screen.getAllByCSS('.v-hotkey__key-text')
      const ctrlText2 = textKeys2.find(key => key.textContent?.includes('Ctrl'))
      expect(ctrlText2).toBeDefined()
    })

    it('should react to both overridePlatform and displayMode changes simultaneously', async () => {
      const TestWrapper = defineComponent({
        setup () {
          const displayMode = ref<'icon' | 'symbol' | 'text'>('icon')
          const overridePlatform = ref<string | undefined>('pc')
          return { displayMode, overridePlatform }
        },
        render () {
          return <VHotkey keys="cmd+k" displayMode={this.displayMode} overridePlatform={this.overridePlatform} />
        },
      })

      const wrapper = render(TestWrapper)

      // Initially PC + icon should show Ctrl text
      let textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      let ctrlText = textKeys.find(key => key.textContent?.includes('Ctrl'))
      expect(ctrlText).toBeDefined()
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)

      // Change both to Mac + symbol simultaneously
      await wrapper.rerender({ displayMode: 'symbol', overridePlatform: 'mac' })

      // Should show command symbol
      const symbolKeys = screen.getAllByCSS('.v-hotkey__key-symbol')
      expect(symbolKeys.length).toBeGreaterThan(0)
      const commandSymbol = symbolKeys.find(key => key.textContent?.includes('⌘'))
      expect(commandSymbol).toBeDefined()

      // Change both to undefined platform + text mode
      await wrapper.rerender({ displayMode: 'text', overridePlatform: undefined })

      // Should auto-detect platform and show appropriate text
      // (This will depend on the test environment's navigator.userAgent)
      textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      expect(textKeys.length).toBeGreaterThan(0)
      // Should show either Ctrl or Command depending on auto-detection
      const hasCtrl = textKeys.some(key => key.textContent?.includes('Ctrl'))
      const hasCommand = textKeys.some(key => key.textContent?.includes('Command'))
      expect(hasCtrl || hasCommand).toBe(true)
    })
  })
})
