// Components
import { VHotkey } from '../VHotkey'

// Utilities
import { render, screen } from '@test'
import { defineComponent, ref } from 'vue'

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

    it('should handle "then" keyword in key combinations correctly', () => {
      render(() => <VHotkey keys="meta+k-z" displayMode="text" />)

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

    it('should handle various sequence patterns correctly', () => {
      // Test the exact pattern from the user's screenshot issue
      render(() => <VHotkey keys="k-z" displayMode="text" />)

      const keys1 = screen.getAllByCSS('.v-hotkey__key')
      expect(keys1).toHaveLength(2) // k, z (NOT k, then, z)
      expect(keys1[0]).toHaveTextContent('K')
      expect(keys1[1]).toHaveTextContent('Z')

      const dividers1 = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers1).toHaveLength(1) // just "then"
      expect(dividers1[0]).toHaveTextContent(/then/i)
    })

    it('should handle case-insensitive sequence patterns', () => {
      // Test case-insensitive matching
      render(() => <VHotkey keys="a-b" displayMode="text" />)

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
      render(() => <VHotkey keys="shift+-" displayMode="icon" platform="mac" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys[1]).toHaveClass('v-hotkey__key-icon')
      // Use getAllByCSS since there are multiple icons (shift and minus)
      const icons = screen.getAllByCSS('.v-icon')
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe('Variants', () => {
    it('should render standard variants correctly', () => {
      const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const

      for (const variant of variants) {
        const { unmount } = render(() => <VHotkey keys="ctrl+k" variant={ variant } />)

        // Should render individual VKbd elements for standard variants
        const keys = screen.getAllByCSS('.v-hotkey__key')
        expect(keys).toHaveLength(2)

        // Should not have contained wrapper
        expect(screen.queryByCSS('.v-hotkey__contained-wrapper')).not.toBeInTheDocument()
        expect(screen.queryByCSS('.v-hotkey--contained')).not.toBeInTheDocument()

        unmount()
      }
    })

    it('should render contained variant with nested kbd structure', () => {
      render(() => <VHotkey keys="ctrl+k" variant="contained" />)

      // Should have contained modifier class
      expect(screen.getByCSS('.v-hotkey--contained')).toBeInTheDocument()

      // Should have the contained wrapper VKbd
      expect(screen.getByCSS('.v-hotkey__contained-wrapper')).toBeInTheDocument()

      // Should have nested kbd elements (not VKbd components)
      const nestedKbds = screen.getAllByCSS('.v-hotkey__key--nested')
      expect(nestedKbds).toHaveLength(2)

      // Nested elements should be actual kbd tags
      nestedKbds.forEach(kbd => {
        expect(kbd.tagName.toLowerCase()).toBe('kbd')
      })

      // Should still have divider
      expect(screen.getByCSS('.v-hotkey__divider')).toHaveTextContent('+')
    })

    it('should render contained variant with key sequences', () => {
      render(() => <VHotkey keys="ctrl+k-p" variant="contained" />)

      // Should have contained wrapper
      expect(screen.getByCSS('.v-hotkey__contained-wrapper')).toBeInTheDocument()

      // Should have nested kbd elements for all keys
      const nestedKbds = screen.getAllByCSS('.v-hotkey__key--nested')
      expect(nestedKbds).toHaveLength(3) // ctrl, k, p

      // Should have both + and then dividers
      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(2) // +, then
    })

    it('should render contained variant with different display modes', () => {
      // Test text mode first (always works)
      const { unmount: unmountText } = render(() => <VHotkey keys="ctrl+k" variant="contained" displayMode="text" />)

      expect(screen.getByCSS('.v-hotkey__contained-wrapper')).toBeInTheDocument()
      let nestedKbds = screen.getAllByCSS('.v-hotkey__key--nested')
      expect(nestedKbds).toHaveLength(2)
      nestedKbds.forEach(kbd => {
        expect(kbd).toHaveClass('v-hotkey__key-text')
      })
      unmountText()

      // Test symbol mode with keys that have symbols
      const { unmount: unmountSymbol } = render(() => <VHotkey keys="cmd+shift" variant="contained" displayMode="symbol" platform="mac" />)

      expect(screen.getByCSS('.v-hotkey__contained-wrapper')).toBeInTheDocument()
      nestedKbds = screen.getAllByCSS('.v-hotkey__key--nested')
      expect(nestedKbds).toHaveLength(2)
      // Both cmd and shift should have symbols available
      nestedKbds.forEach(kbd => {
        expect(kbd).toHaveClass('v-hotkey__key-symbol')
      })
      unmountSymbol()

      // Test icon mode with keys that have icons
      const { unmount: unmountIcon } = render(() => (
        <VHotkey keys="cmd+shift" variant="contained" displayMode="icon" platform="mac" />
      ))

      expect(screen.getByCSS('.v-hotkey__contained-wrapper')).toBeInTheDocument()
      nestedKbds = screen.getAllByCSS('.v-hotkey__key--nested')
      expect(nestedKbds).toHaveLength(2)
      // On Mac, cmd and shift should have icons available
      nestedKbds.forEach(kbd => {
        expect(kbd).toHaveClass('v-hotkey__key-icon')
      })
      unmountIcon()
    })

    it('should render contained variant inline correctly', () => {
      render(() => <VHotkey keys="ctrl+k" variant="contained" inline />)

      // Should have both contained and inline classes
      const hotkey = screen.getByCSS('.v-hotkey')
      expect(hotkey).toHaveClass('v-hotkey--contained')
      expect(hotkey).toHaveClass('v-hotkey--inline')

      // Should still have contained wrapper
      expect(screen.getByCSS('.v-hotkey__contained-wrapper')).toBeInTheDocument()
    })

    it('should apply variant-specific styling to individual VKbd elements', () => {
      // Test elevated variant has variant class
      const { unmount: unmountElevated } = render(() => <VHotkey keys="ctrl+k" variant="elevated" />)
      const hotkeyWrapper = screen.getByCSS('.v-hotkey')
      expect(hotkeyWrapper).toHaveClass('v-hotkey--variant-elevated')
      unmountElevated()

      // Test flat variant has variant class
      const { unmount: unmountFlat } = render(() => <VHotkey keys="ctrl+k" variant="flat" />)
      const flatWrapper = screen.getByCSS('.v-hotkey')
      expect(flatWrapper).toHaveClass('v-hotkey--variant-flat')
      unmountFlat()

      // Test outlined variant has variant class
      const { unmount: unmountOutlined } = render(() => <VHotkey keys="ctrl+k" variant="outlined" />)
      const outlinedWrapper = screen.getByCSS('.v-hotkey')
      expect(outlinedWrapper).toHaveClass('v-hotkey--variant-outlined')
      unmountOutlined()
    })

    it('should apply text variant styling correctly', () => {
      render(() => <VHotkey keys="ctrl+k" variant="text" />)

      const hotkeyWrapper = screen.getByCSS('.v-hotkey')
      expect(hotkeyWrapper).toHaveClass('v-hotkey--variant-text')

      const kbdElements = screen.getAllByCSS('.v-hotkey__key.v-kbd')
      expect(kbdElements.length).toBeGreaterThan(0)

      kbdElements.forEach(kbd => {
        // Text variant should have transparent background and no border
        expect(kbd).toHaveStyle({ background: 'transparent' })
        expect(kbd).toHaveStyle({ border: 'none' })
        // Text variant should have no horizontal padding and auto min-width
        expect(kbd).toHaveStyle({ paddingLeft: '0px' })
        expect(kbd).toHaveStyle({ paddingRight: '0px' })
        expect(kbd).toHaveStyle({ minWidth: 'auto' })
      })

      // Text variant should have reduced gap between keys
      const combinations = screen.getAllByCSS('.v-hotkey__combination')
      expect(combinations.length).toBeGreaterThan(0)
      combinations.forEach(combo => {
        expect(combo).toHaveStyle({ gap: '1px' })
      })
    })

    it('should apply tonal variant styling correctly', () => {
      render(() => <VHotkey keys="ctrl+k" variant="tonal" />)

      const hotkeyWrapper = screen.getByCSS('.v-hotkey')
      expect(hotkeyWrapper).toHaveClass('v-hotkey--variant-tonal')

      const kbdElements = screen.getAllByCSS('.v-hotkey__key.v-kbd')
      expect(kbdElements.length).toBeGreaterThan(0)

      kbdElements.forEach(kbd => {
        // Tonal variant should have no border and no elevation
        expect(kbd).toHaveStyle({ border: 'unset' })
        expect(kbd).toHaveStyle({ boxShadow: 'unset' })
      })
    })

    it('should apply contained variant wrapper styling correctly', () => {
      render(() => <VHotkey keys="ctrl+k" variant="contained" />)

      const wrapper = screen.getByCSS('.v-hotkey__contained-wrapper')
      expect(wrapper).toBeInTheDocument()

      // Contained wrapper should have proper styling - VKbd uses flex by default
      expect(wrapper).toHaveStyle({ display: 'flex' })
      expect(wrapper).toHaveStyle({ alignItems: 'center' })
      expect(wrapper).toHaveStyle({ gap: '2px' }) // combination gap
      expect(wrapper).toHaveStyle({ background: 'unset' })

      // Nested kbd elements should have minimal styling
      const nestedKbds = screen.getAllByCSS('.v-hotkey__key--nested')
      expect(nestedKbds.length).toBeGreaterThan(0)

      nestedKbds.forEach(kbd => {
        expect(kbd).toHaveStyle({ background: 'none' })
        expect(kbd).toHaveStyle({ border: 'none' })
        expect(kbd).toHaveStyle({ padding: '0px' })
        expect(kbd).toHaveStyle({ margin: '0px' })
        expect(kbd).toHaveStyle({ minWidth: 'auto' })
        expect(kbd).toHaveStyle({ minHeight: 'auto' })
      })
    })

    it('should apply contained variant inline styling correctly', () => {
      render(() => <VHotkey keys="ctrl+k" variant="contained" inline />)

      const wrapper = screen.getByCSS('.v-hotkey__contained-wrapper')
      expect(wrapper).toBeInTheDocument()

      // Should have both contained and inline classes on the main element
      const hotkey = screen.getByCSS('.v-hotkey')
      expect(hotkey).toHaveClass('v-hotkey--contained')
      expect(hotkey).toHaveClass('v-hotkey--inline')

      // Should have nested kbd elements for contained variant
      const nestedKbds = screen.getAllByCSS('.v-hotkey__key--nested')
      expect(nestedKbds.length).toBeGreaterThan(0)

      // Should have combinations
      const combinations = screen.getAllByCSS('.v-hotkey__combination')
      expect(combinations.length).toBeGreaterThan(0)
    })

    it('should apply contained variant with color correctly', () => {
      render(() => <VHotkey keys="ctrl+k" variant="contained" color="primary" />)

      const wrapper = screen.getByCSS('.v-hotkey__contained-wrapper')
      expect(wrapper).toHaveClass('bg-primary')

      // Nested elements should inherit color, not have their own background
      const nestedKbds = screen.getAllByCSS('.v-hotkey__key--nested')
      nestedKbds.forEach(kbd => {
        expect(kbd).not.toHaveClass('bg-primary')
        expect(kbd).toHaveStyle({ background: 'none' })
      })
    })

    it('should not allow contained variant with other variants', () => {
      // This is more of a design constraint - contained should be mutually exclusive
      // We test that when contained is used, it creates the wrapper structure
      render(() => <VHotkey keys="ctrl+k" variant="contained" />)

      expect(screen.getByCSS('.v-hotkey--contained')).toBeInTheDocument()
      expect(screen.getByCSS('.v-hotkey__contained-wrapper')).toBeInTheDocument()

      // Should not have individual VKbd elements with variant styling
      const individualKbds = screen.queryAllByCSS('.v-hotkey__key.v-kbd')
      expect(individualKbds).toHaveLength(0)
    })

    it('should accept all valid variant values', () => {
      const validVariants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain', 'contained'] as const

      for (const variant of validVariants) {
        const { unmount } = render(() => <VHotkey keys="ctrl+k" variant={ variant } />)

        const hotkeyWrapper = screen.getByCSS('.v-hotkey')

        // Check for contained variant or standard variant class
        const expectedClass = variant === 'contained' ? 'v-hotkey--contained' : `v-hotkey--variant-${variant}`
        expect(hotkeyWrapper).toHaveClass(expectedClass)

        unmount()
      }
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
        shift: {
          default: { text: 'Shift', icon: '$shift' },
        },
        '-': {
          default: { text: 'MINUS' },
        },
      }

      render(() => <VHotkey keys="shift+-" keyMap={ customKeyMap } platform="pc" />)

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
        customkey: {
          default: { text: 'CUSTOM' },
        },
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
      render(() => <VHotkey keys="ctrl+shift+k-p" />)
      const container = screen.getByCSS('.v-hotkey')
      const ariaLabel = container.getAttribute('aria-label')

      // Should contain readable text representation
      expect(ariaLabel).toMatch(/Keyboard shortcut/i)
      // The locale keys start with $, so we check for those patterns
      expect(ariaLabel).toMatch(/CTRL/i)
      expect(ariaLabel).toMatch(/SHIFT/i)
      expect(ariaLabel).toMatch(/then/i)
    })

    it('should provide title tooltips for icon mode', () => {
      const originalUserAgent = navigator.userAgent

      try {
        // Test on Mac for better icon/symbol support
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        // Test icon mode - should have title tooltips
        render(() => <VHotkey keys="cmd+shift+k" displayMode="icon" platform="mac" />)

        const keys = screen.getAllByCSS('.v-hotkey__key')
        expect(keys).toHaveLength(3) // cmd, shift, k

        // Icon mode keys should have title attributes with text representations
        keys.forEach(key => {
          expect(key).toHaveAttribute('title')
          const title = key.getAttribute('title')
          expect(title).toBeTruthy()
          expect(title?.length).toBeGreaterThan(0)
        })

        // Check specific expected titles for known keys
        const iconKeys = keys.filter(key => key.querySelector('.v-icon'))
        const textKeys = keys.filter(key => !key.querySelector('.v-icon'))

        // Should have at least 2 icon keys (cmd and shift)
        expect(iconKeys.length).toBeGreaterThanOrEqual(2)

        // Check that icon keys have appropriate titles
        const titles = iconKeys.map(key => key.getAttribute('title'))
        expect(titles.some(title => title && /Command|Cmd/i.test(title))).toBe(true)
        expect(titles.some(title => title && /Shift/i.test(title))).toBe(true)

        // Check text keys (like 'k') have simple uppercase titles
        textKeys.forEach(key => {
          const title = key.getAttribute('title')
          expect(title).toBeTruthy()
          expect(title?.length).toBeGreaterThan(0)
        })
      } finally {
        // Restore original userAgent
        Object.defineProperty(window.navigator, 'userAgent', {
          value: originalUserAgent,
          configurable: true,
        })
      }
    })

    it('should provide title tooltips for symbol mode', () => {
      const originalUserAgent = navigator.userAgent

      try {
        // Test on Mac for better symbol support
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        // Test symbol mode - should have title tooltips
        render(() => <VHotkey keys="cmd+shift+k" displayMode="symbol" platform="mac" />)

        const keys = screen.getAllByCSS('.v-hotkey__key')
        expect(keys).toHaveLength(3)

        // Symbol mode keys should have title attributes
        keys.forEach(key => {
          expect(key).toHaveAttribute('title')
          const title = key.getAttribute('title')
          expect(title).toBeTruthy()
          expect(title?.length).toBeGreaterThan(0)
        })
      } finally {
        // Restore original userAgent
        Object.defineProperty(window.navigator, 'userAgent', {
          value: originalUserAgent,
          configurable: true,
        })
      }
    })

    it('should handle title tooltips for keys with localization fallback', () => {
      const originalUserAgent = navigator.userAgent

      try {
        // Test on Mac for better support
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        // Test with keys that have localization vs keys that don't
        render(() => <VHotkey keys="escape+f1" displayMode="icon" platform="mac" />)

        const keys = screen.getAllByCSS('.v-hotkey__key')
        expect(keys).toHaveLength(2) // escape, f1

        // Both keys should have title attributes
        keys.forEach(key => {
          expect(key).toHaveAttribute('title')
          const title = key.getAttribute('title')
          expect(title).toBeTruthy()
          expect(title?.length).toBeGreaterThan(0)
        })

        // Check that we have the expected titles
        const titles = keys.map(key => key.getAttribute('title')).filter(Boolean)
        expect(titles).toHaveLength(2) // Should have titles for both keys

        // Should have one title containing 'escape' (case insensitive)
        expect(titles.some(title => title && title.toLowerCase().includes('escape'))).toBe(true)

        // Should have one title that is exactly 'F1'
        expect(titles.some(title => title === 'F1')).toBe(true)
      } finally {
        // Restore original userAgent
        Object.defineProperty(window.navigator, 'userAgent', {
          value: originalUserAgent,
          configurable: true,
        })
      }
    })

    it('should handle title tooltips for custom keyMap entries in icon mode', () => {
      const customKeyMap = {
        customkey: {
          default: { text: 'Custom Key', symbol: '★' },
        },
      }

      // Test icon mode with custom key (falls back to text but should still have tooltip)
      render(() => (
        <VHotkey keys="customkey" displayMode="icon" keyMap={ customKeyMap } />
      ))

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(1)

      // Should have title with text representation
      expect(keys[0]).toHaveAttribute('title')
      expect(keys[0].getAttribute('title')).toBe('Custom Key')
    })

    it('should handle title tooltips for custom keyMap entries in symbol mode', () => {
      const customKeyMap = {
        customkey: {
          default: { text: 'Custom Key', symbol: '★' },
        },
      }

      // Test symbol mode with custom key
      render(() => (
        <VHotkey keys="customkey" displayMode="symbol" keyMap={ customKeyMap } />
      ))

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(1)

      // Should have title with text representation
      expect(keys[0]).toHaveAttribute('title')
      expect(keys[0].getAttribute('title')).toBe('Custom Key')
    })

    it('should handle title tooltips for custom keyMap entries in text mode', () => {
      const customKeyMap = {
        customkey: {
          default: { text: 'Custom Key', symbol: '★' },
        },
      }

      // Test text mode with custom key
      render(() => (
        <VHotkey keys="customkey" displayMode="text" keyMap={ customKeyMap } />
      ))

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(1)

      // Should NOT have title in text mode
      const title = keys[0].getAttribute('title')
      expect(title).toBeFalsy()
    })

    it('should NOT provide title tooltips in text mode (simple test)', () => {
      const originalUserAgent = navigator.userAgent

      try {
        // Test on Mac
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        // Test text mode directly - should NOT have title tooltips
        render(() => <VHotkey keys="cmd+shift+k" displayMode="text" platform="mac" />)

        const keys = screen.getAllByCSS('.v-hotkey__key')
        expect(keys).toHaveLength(3)

        // Text mode keys should NOT have title attributes
        keys.forEach((key, index) => {
          const title = key.getAttribute('title')
          expect(title).toBeFalsy() // Should be null, undefined, or empty string
        })
      } finally {
        // Restore original userAgent
        Object.defineProperty(window.navigator, 'userAgent', {
          value: originalUserAgent,
          configurable: true,
        })
      }
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
        ctrl: {
          default: { text: '$ctrl', icon: '$ctrl' }, // Bug: icon token in text field
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
        ctrl: {
          default: { text: '$vuetify.hotkey.ctrl' }, // Valid localization key
        },
      }

      render(() => <VHotkey keys="ctrl" keyMap={ localizationKeyMap } displayMode="text" />)

      const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      expect(textKeys).toHaveLength(1)

      // Should preserve the localization key and let the translation system handle it
      expect(textKeys[0]).toHaveTextContent('Ctrl') // Should be translated by the locale system
    })

    it('should force mac rendering when platform="mac" is set on non-Mac platform', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows NT 10.0',
        configurable: true,
      })

      render(() => <VHotkey keys="cmd+k" platform="mac" />)

      // Expect icons present due to forced mac
      const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
      expect(iconKeys.length).toBeGreaterThan(0)
    })

    it('should force non-Mac rendering when platform="pc" is set on Mac platform', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', // Mac user agent
        configurable: true,
      })

      const { unmount } = render(() => <VHotkey keys="cmd+k" platform="pc" />)

      // Should not render icons (Mac behavior) despite being on Mac
      const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
      expect(iconKeys).toHaveLength(0)

      // Should render text instead (non-Mac behavior)
      const textKeys = screen.queryAllByCSS('.v-hotkey__key-text')
      expect(textKeys.length).toBeGreaterThan(0)

      unmount()
    })
  })

  describe('Platform Behavior with cmd+k', () => {
    const originalUserAgent = navigator.userAgent

    afterEach(() => {
      // Restore original userAgent after each test
      Object.defineProperty(window.navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true,
      })
    })

    describe('platform auto, displayMode undefined (defaults to icon)', () => {
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
        const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
        expect(hasCtrlText).toBe(false)
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
        const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
        expect(hasCtrlText).toBe(true)
      })
    })

    describe('platform auto, displayMode icon', () => {
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
        const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
        expect(hasCtrlText).toBe(true)
      })
    })

    describe('platform mac, displayMode undefined (defaults to icon)', () => {
      it('should show command icon on Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="mac" />)

        // Should have command icon
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)
      })

      it('should show command icon on non-Mac (forced Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="mac" />)

        // Should have command icon (forced Mac behavior)
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)

        // Should not show "Ctrl" text
        const textKeys = screen.queryAllByCSS('.v-hotkey__key-text')
        const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
        expect(hasCtrlText).toBe(false)
      })
    })

    describe('platform mac, displayMode icon', () => {
      it('should show command icon on Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="mac" displayMode="icon" />)

        // Should have command icon
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)
      })

      it('should show command icon on non-Mac (forced Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="mac" displayMode="icon" />)

        // Should have command icon (forced Mac behavior)
        const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys.length).toBeGreaterThan(0)
      })
    })

    describe('platform pc, displayMode undefined (defaults to icon)', () => {
      it('should show Ctrl text on Mac (forced non-Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="pc" />)

        // Should not have icons (forced non-Mac behavior)
        const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys).toHaveLength(0)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
        expect(hasCtrlText).toBe(true)
      })

      it('should show Ctrl text on non-Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="pc" />)

        // Should not have icons
        const iconKeys = screen.queryAllByCSS('.v-hotkey__key-icon')
        expect(iconKeys).toHaveLength(0)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
        expect(hasCtrlText).toBe(true)
      })
    })

    describe('platform mac, displayMode symbol', () => {
      it('should show command symbol on Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="mac" displayMode="symbol" />)

        // Should have command symbol
        const symbolKeys = screen.getAllByCSS('.v-hotkey__key-symbol')
        expect(symbolKeys.length).toBeGreaterThan(0)

        // Should contain the command symbol ⌘
        const hasCommandSymbol = symbolKeys.some(key => key.textContent?.includes('⌘'))
        expect(hasCommandSymbol).toBe(true)
      })

      it('should show command symbol on non-Mac (forced Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="mac" displayMode="symbol" />)

        // Should have command symbol (forced Mac behavior)
        const symbolKeys = screen.getAllByCSS('.v-hotkey__key-symbol')
        expect(symbolKeys.length).toBeGreaterThan(0)

        // Should contain the command symbol ⌘
        const hasCommandSymbol = symbolKeys.some(key => key.textContent?.includes('⌘'))
        expect(hasCommandSymbol).toBe(true)
      })
    })

    describe('platform pc, displayMode text', () => {
      it('should show Ctrl text on Mac (forced non-Mac behavior)', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="pc" displayMode="text" />)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
        expect(hasCtrlText).toBe(true)
      })

      it('should show Ctrl text on non-Mac', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value: 'Windows NT 10.0',
          configurable: true,
        })

        render(() => <VHotkey keys="cmd+k" platform="pc" displayMode="text" />)

        // Should show "Ctrl" text
        const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
        const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
        expect(hasCtrlText).toBe(true)
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

    it('should accept custom class and style props', () => {
      render(() => (
        <VHotkey
          keys="ctrl+k"
          class="custom-class another-class"
          style={{ backgroundColor: 'red', fontSize: '16px' }}
        />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')

      // Check custom classes are applied
      expect(hotkeyElement).toHaveClass('v-hotkey')
      expect(hotkeyElement).toHaveClass('custom-class')
      expect(hotkeyElement).toHaveClass('another-class')

      // Check custom styles are applied
      expect(hotkeyElement).toHaveStyle({ backgroundColor: 'red' })
      expect(hotkeyElement).toHaveStyle({ fontSize: '16px' })
    })

    it('should apply theme classes correctly', () => {
      render(() => (
        <VHotkey
          keys="ctrl+k"
          theme="dark"
        />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')

      // Check theme classes are applied
      expect(hotkeyElement).toHaveClass('v-hotkey')
      expect(hotkeyElement).toHaveClass('v-theme--dark')
    })

    it('should include RTL composable integration', () => {
      // Test that RTL composable is integrated (classes may be empty in LTR mode)
      render(() => (
        <VHotkey keys="ctrl+k" />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')

      // Check that element exists and RTL composable doesn't break rendering
      expect(hotkeyElement).toHaveClass('v-hotkey')
      expect(hotkeyElement).toBeInTheDocument()
    })

    it('should apply border classes correctly', () => {
      render(() => (
        <VHotkey
          keys="ctrl+k"
          border="md"
        />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')
      const kbdElements = screen.getAllByCSS('.v-hotkey__key')

      // Check main element exists
      expect(hotkeyElement).toHaveClass('v-hotkey')

      // Check border classes are applied to individual keys
      expect(kbdElements.length).toBeGreaterThan(0)
      kbdElements.forEach(kbd => {
        expect(kbd).toHaveClass('border-md')
      })
    })

    it('should apply rounded classes correctly', () => {
      render(() => (
        <VHotkey
          keys="ctrl+k"
          rounded="lg"
        />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')
      const kbdElements = screen.getAllByCSS('.v-hotkey__key')

      // Check main element exists
      expect(hotkeyElement).toHaveClass('v-hotkey')

      // Check rounded classes are applied to individual keys
      expect(kbdElements.length).toBeGreaterThan(0)
      kbdElements.forEach(kbd => {
        expect(kbd).toHaveClass('rounded-lg')
      })
    })

    it('should apply color classes correctly', () => {
      render(() => (
        <VHotkey
          keys="ctrl+k"
          color="primary"
        />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')
      const kbdElements = screen.getAllByCSS('.v-hotkey__key')

      // Check main element exists and has variant class but no background color
      expect(hotkeyElement).toHaveClass('v-hotkey')
      expect(hotkeyElement).toHaveClass('v-hotkey--variant-elevated')
      expect(hotkeyElement).not.toHaveClass('bg-primary')

      // Check color classes are applied to individual keys
      expect(kbdElements.length).toBeGreaterThan(0)
      kbdElements.forEach(kbd => {
        expect(kbd).toHaveClass('bg-primary')
      })
    })

    it('should apply elevation classes correctly', () => {
      render(() => (
        <VHotkey
          keys="ctrl+k"
          elevation="4"
        />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')
      const kbdElements = screen.getAllByCSS('.v-hotkey__key')

      // Check main element exists
      expect(hotkeyElement).toHaveClass('v-hotkey')

      // Check elevation classes are applied to individual keys
      expect(kbdElements.length).toBeGreaterThan(0)
      kbdElements.forEach(kbd => {
        expect(kbd).toHaveClass('elevation-4')
      })
    })

    it('should apply disabled classes correctly', () => {
      render(() => (
        <VHotkey
          keys="ctrl+k"
          disabled
        />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')

      // Check disabled classes are applied
      expect(hotkeyElement).toHaveClass('v-hotkey')
      expect(hotkeyElement).toHaveClass('v-hotkey--disabled')
    })

    it('should combine all composable classes together', () => {
      render(() => (
        <VHotkey
          keys="ctrl+k"
          class="custom-class"
          theme="dark"
          border="sm"
          rounded="md"
          elevation="2"
          color="primary"
          disabled
        />
      ))

      const hotkeyElement = screen.getByCSS('.v-hotkey')
      const kbdElements = screen.getAllByCSS('.v-hotkey__key')

      // Check all classes are applied together on main element (no background color)
      expect(hotkeyElement).toHaveClass('v-hotkey')
      expect(hotkeyElement).toHaveClass('custom-class')
      expect(hotkeyElement).toHaveClass('v-theme--dark')
      expect(hotkeyElement).toHaveClass('v-hotkey--variant-elevated')
      expect(hotkeyElement).toHaveClass('v-hotkey--disabled')
      expect(hotkeyElement).not.toHaveClass('bg-primary')

      // Check border, rounded, elevation, and color classes are applied to individual keys
      expect(kbdElements.length).toBeGreaterThan(0)
      kbdElements.forEach(kbd => {
        expect(kbd).toHaveClass('border-sm')
        expect(kbd).toHaveClass('rounded-md')
        expect(kbd).toHaveClass('elevation-2')
        expect(kbd).toHaveClass('bg-primary')
      })
    })

    it('should react to platform prop changes', async () => {
      // Start on a Windows machine
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows NT 10.0',
        configurable: true,
      })

      const TestWrapper = defineComponent({
        setup () {
          const platform = ref<'auto' | 'pc' | 'mac'>('auto')
          return { platform }
        },
        render () {
          return <VHotkey keys="cmd+k" platform={ this.platform } />
        },
      })

      const wrapper = render(TestWrapper)

      // Initially should show Ctrl (Windows auto-detection)
      let textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      let hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
      expect(hasCtrlText).toBe(true)
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)

      // Change to mac
      await wrapper.rerender({ platform: 'mac' })

      // Should now show command icon (forced Mac behavior)
      const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
      expect(iconKeys.length).toBeGreaterThan(0)
      textKeys = screen.queryAllByCSS('.v-hotkey__key-text')
      hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
      expect(hasCtrlText).toBe(false)

      // Change to pc
      await wrapper.rerender({ platform: 'pc' })

      // Should go back to Ctrl text (forced PC behavior)
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)
      textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
      expect(hasCtrlText).toBe(true)

      // Change back to auto (auto-detection)
      await wrapper.rerender({ platform: 'auto' })

      // Should show Ctrl again (Windows auto-detection)
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)
      textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
      expect(hasCtrlText).toBe(true)
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
          const platform = ref<'auto' | 'pc' | 'mac'>('mac')
          return { displayMode, platform }
        },
        render () {
          return <VHotkey keys="cmd+k" displayMode={ this.displayMode } platform={ this.platform } />
        },
      })

      const wrapper = render(TestWrapper)

      // Initially should show command icon
      const iconKeys = screen.getAllByCSS('.v-hotkey__key-icon')
      expect(iconKeys.length).toBeGreaterThan(0)

      // Change to symbol mode
      await wrapper.rerender({ displayMode: 'symbol', platform: 'mac' })

      // Should show command symbol
      const symbolKeys = screen.getAllByCSS('.v-hotkey__key-symbol')
      expect(symbolKeys.length).toBeGreaterThan(0)
      const hasCommandSymbol = symbolKeys.some(key => key.textContent?.includes('⌘'))
      expect(hasCommandSymbol).toBe(true)

      // Change platform to PC while keeping symbol mode
      await wrapper.rerender({ displayMode: 'symbol', platform: 'pc' })

      // Should show Ctrl text (PC doesn't have command symbols)
      expect(screen.queryAllByCSS('.v-hotkey__key-symbol')).toHaveLength(0)
      const textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
      expect(hasCtrlText).toBe(true)

      // Change back to icon mode while on PC
      await wrapper.rerender({ displayMode: 'icon', platform: 'pc' })

      // Should still show Ctrl text (PC doesn't use icons for modifiers)
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)
      const textKeys2 = screen.getAllByCSS('.v-hotkey__key-text')
      const hasCtrlText2 = textKeys2.some(key => key.textContent?.includes('Ctrl'))
      expect(hasCtrlText2).toBe(true)
    })

    it('should react to both platform and displayMode changes simultaneously', async () => {
      const TestWrapper = defineComponent({
        setup () {
          const displayMode = ref<'icon' | 'symbol' | 'text'>('icon')
          const platform = ref<'auto' | 'pc' | 'mac'>('pc')
          return { displayMode, platform }
        },
        render () {
          return <VHotkey keys="cmd+k" displayMode={ this.displayMode } platform={ this.platform } />
        },
      })

      const wrapper = render(TestWrapper)

      // Initially PC + icon should show Ctrl text
      let textKeys = screen.getAllByCSS('.v-hotkey__key-text')
      const hasCtrlText = textKeys.some(key => key.textContent?.includes('Ctrl'))
      expect(hasCtrlText).toBe(true)
      expect(screen.queryAllByCSS('.v-hotkey__key-icon')).toHaveLength(0)

      // Change both to Mac + symbol simultaneously
      await wrapper.rerender({ displayMode: 'symbol', platform: 'mac' })

      // Should show command symbol
      const symbolKeys = screen.getAllByCSS('.v-hotkey__key-symbol')
      expect(symbolKeys.length).toBeGreaterThan(0)
      const hasCommandSymbol = symbolKeys.some(key => key.textContent?.includes('⌘'))
      expect(hasCommandSymbol).toBe(true)

      // Change both to auto platform + text mode
      await wrapper.rerender({ displayMode: 'text', platform: 'auto' })

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

  describe('Disabled State', () => {
    it('should apply disabled styling when disabled prop is true', () => {
      render(() => <VHotkey keys="ctrl+k" disabled />)

      const hotkeyWrapper = screen.getByCSS('.v-hotkey')
      expect(hotkeyWrapper).toHaveClass('v-hotkey--disabled')
    })

    it('should not apply disabled styling when disabled prop is false', () => {
      render(() => <VHotkey keys="ctrl+k" disabled={ false } />)

      const hotkeyWrapper = screen.getByCSS('.v-hotkey')
      expect(hotkeyWrapper).not.toHaveClass('v-hotkey--disabled')
    })

    it('should work with disabled state in contained variant', () => {
      render(() => <VHotkey keys="ctrl+k" variant="contained" disabled />)

      const hotkeyWrapper = screen.getByCSS('.v-hotkey')
      expect(hotkeyWrapper).toHaveClass('v-hotkey--disabled')
      expect(hotkeyWrapper).toHaveClass('v-hotkey--contained')
    })
  })

  describe('Variant Validation', () => {
    it('should accept all valid variant values', () => {
      const validVariants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain', 'contained'] as const

      for (const variant of validVariants) {
        const { unmount } = render(() => <VHotkey keys="ctrl+k" variant={ variant } />)

        const hotkeyWrapper = screen.getByCSS('.v-hotkey')

        // Check for contained variant or standard variant class
        const expectedClass = variant === 'contained' ? 'v-hotkey--contained' : `v-hotkey--variant-${variant}`
        expect(hotkeyWrapper).toHaveClass(expectedClass)

        unmount()
      }
    })
  })

  describe('Component Rendering with Special Keys', () => {
    it('should render literal symbol keys correctly', () => {
      render(() => <VHotkey keys="ctrl+-" displayMode="text" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2) // ctrl and -

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(1) // Only the + separator
      expect(dividers[0]).toHaveTextContent('+')

      // The second key should be the minus key
      expect(keys[1]).toHaveTextContent('-')
    })

    it('should render complex combinations with literal symbols', () => {
      render(() => <VHotkey keys="ctrl+shift+-" displayMode="text" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(3) // ctrl, shift, and -

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(2) // Two + separators
      dividers.forEach(divider => {
        expect(divider).toHaveTextContent('+')
      })

      expect(keys[0]).toHaveTextContent('Ctrl')
      expect(keys[1]).toHaveTextContent('Shift')
      expect(keys[2]).toHaveTextContent('-')
    })

    it('should render sequence with literal symbols', () => {
      render(() => <VHotkey keys="ctrl+a-shift+-" displayMode="text" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(4) // ctrl, a, shift, -

      const dividers = screen.getAllByCSS('.v-hotkey__divider')
      expect(dividers).toHaveLength(3) // +, then, +

      expect(dividers[0]).toHaveTextContent('+')
      expect(dividers[1]).toHaveTextContent(/then/i)
      expect(dividers[2]).toHaveTextContent('+')

      expect(keys[0]).toHaveTextContent('Ctrl')
      expect(keys[1]).toHaveTextContent('A')
      expect(keys[2]).toHaveTextContent('Shift')
      expect(keys[3]).toHaveTextContent('-')
    })
  })

  describe('Space Key Rendering', () => {
    it('should render the word "Space" in text mode, not an empty character', () => {
      render(() => <VHotkey keys="ctrl+space" displayMode="text" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      const spaceKey = keys.find(key => key.textContent?.match(/space/i))

      expect(spaceKey).toBeInTheDocument()
      expect(spaceKey).toHaveTextContent(/space/i)
      expect(spaceKey?.textContent?.trim()).not.toBe('')
    })

    it('should render an icon for space on Mac in icon mode', () => {
      render(() => <VHotkey keys="ctrl+space" displayMode="icon" platform="mac" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      // ctrl, space
      expect(keys).toHaveLength(2)

      // The key for 'space' should be an icon
      const spaceKey = keys[1]
      expect(spaceKey).toHaveClass('v-hotkey__key-icon')
      expect(spaceKey.querySelector('.v-icon')).toBeInTheDocument()
    })

    it('should fall back to text for space on PC in icon mode', () => {
      render(() => <VHotkey keys="ctrl+space" displayMode="icon" platform="pc" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2)

      const spaceKey = keys[1]
      expect(spaceKey).toHaveClass('v-hotkey__key-text')
      expect(spaceKey).toHaveTextContent(/space/i)
      expect(spaceKey.querySelector('.v-icon')).not.toBeInTheDocument()
    })

    it('should render the symbol for space on Mac in symbol mode', () => {
      render(() => <VHotkey keys="ctrl+space" displayMode="symbol" platform="mac" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2)

      const spaceKey = keys[1]
      expect(spaceKey).toHaveClass('v-hotkey__key-symbol')
      expect(spaceKey).toHaveTextContent('␣')
    })

    it('should fall back to text for space on PC in symbol mode', () => {
      render(() => <VHotkey keys="ctrl+space" displayMode="symbol" platform="pc" />)

      const keys = screen.getAllByCSS('.v-hotkey__key')
      expect(keys).toHaveLength(2)

      const spaceKey = keys[1]
      expect(spaceKey).toHaveClass('v-hotkey__key-text')
      expect(spaceKey).toHaveTextContent(/space/i)
    })
  })
})
