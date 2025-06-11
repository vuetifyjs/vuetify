// Components
import { VHotkey } from '../VHotkey'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

const vuetify = createVuetify()

// Helper function to mount VHotkey with proper Vuetify context
function mountVHotkey (props: any = {}) {
  return mount(VHotkey, {
    props,
    global: {
      plugins: [vuetify],
    },
  })
}

describe('VHotkey', () => {
  describe('Key Parsing', () => {
    it('should parse simple key combinations with + separator', () => {
      const wrapper = mountVHotkey({ keys: 'ctrl+k' })

      // Should render ctrl and k keys with + separator
      expect(wrapper.find('.v-hotkey__combination').exists()).toBe(true)
      expect(wrapper.findAll('.v-hotkey__key')).toHaveLength(2)
      expect(wrapper.find('.v-hotkey__divider').text()).toBe('+')
    })

    it('should parse key sequences with - separator', () => {
      const wrapper = mountVHotkey({ keys: 'ctrl+a-ctrl+b' })

      // Should render two key combinations with "then" separator
      const combinations = wrapper.findAll('.v-hotkey__combination')
      expect(combinations).toHaveLength(1) // Single combination with internal separators

      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys).toHaveLength(4) // ctrl, a, ctrl, b

      const dividers = wrapper.findAll('.v-hotkey__divider')
      expect(dividers).toHaveLength(3) // +, then, +
    })

        it('should correctly handle literal minus key (shift+-)', () => {
      const wrapper = mountVHotkey({ keys: 'shift+-', displayMode: 'text' })

      // Should render shift and minus keys with + separator, NOT treat - as sequence separator
      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys).toHaveLength(2) // shift and -

      const dividers = wrapper.findAll('.v-hotkey__divider')
      expect(dividers).toHaveLength(1) // Only the + separator
      expect(dividers[0].text()).toBe('+')

      // The second key should be the minus key
      expect(keys[1].text()).toBe('-')
    })

            it('should handle minus key with alternative names', () => {
      const wrapperMinus = mountVHotkey({ keys: 'alt+minus', displayMode: 'text' })

      const wrapperHyphen = mountVHotkey({ keys: 'ctrl+hyphen', displayMode: 'text' })

      // Both should render the minus key
      expect(wrapperMinus.findAll('.v-hotkey__key')).toHaveLength(2)
      expect(wrapperHyphen.findAll('.v-hotkey__key')).toHaveLength(2)

      // Both should display the minus symbol
      const minusKey = wrapperMinus.findAll('.v-hotkey__key')[1]
      const hyphenKey = wrapperHyphen.findAll('.v-hotkey__key')[1]
      expect(minusKey.text()).toBe('-')
      expect(hyphenKey.text()).toBe('-')
    })

    it('should not treat - as separator when not between alphanumeric characters', () => {
      const wrapper = mountVHotkey({ keys: 'ctrl+-' })

      // Should parse as ctrl + literal minus, not as a sequence
      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys).toHaveLength(2)

      const dividers = wrapper.findAll('.v-hotkey__divider')
      expect(dividers).toHaveLength(1)
      expect(dividers[0].text()).toBe('+')
    })

    it('should treat - as separator when between alphanumeric characters', () => {
      const wrapper = mountVHotkey({ keys: 'a-b' })

      // Should parse as sequence: a then b
      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys).toHaveLength(2)

      const dividers = wrapper.findAll('.v-hotkey__divider')
      expect(dividers).toHaveLength(1)
      // Should contain "then" text (localized)
      expect(dividers[0].text()).toContain('then')
    })

    it('should handle complex combinations with both + and - separators', () => {
      const wrapper = mountVHotkey({ keys: 'ctrl+shift+a-alt+b' })

      // Should parse as: ctrl+shift+a then alt+b
      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys).toHaveLength(5) // ctrl, shift, a, alt, b

      const dividers = wrapper.findAll('.v-hotkey__divider')
      // Should have: +, +, then, +
      expect(dividers).toHaveLength(4)
    })

    it('should handle edge case with trailing minus', () => {
      const wrapper = mountVHotkey({ keys: 'ctrl+k-' })

      // Should parse as: ctrl+k then (empty), which should be handled gracefully
      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys.length).toBeGreaterThanOrEqual(2)
    })

    it('should handle edge case with leading minus', () => {
      const wrapper = mountVHotkey({ keys: '-ctrl+k' })

      // Should parse as: (empty) then ctrl+k, which should be handled gracefully
      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys.length).toBeGreaterThanOrEqual(2)
    })
  })

    describe('Display Modes', () => {
    it('should render minus key in text mode', () => {
      const wrapper = mountVHotkey({
        keys: 'shift+-',
        displayMode: 'text',
      })

      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys[1].text()).toBe('-')
      expect(keys[1].classes()).toContain('v-hotkey__key-text')
    })

        it('should render minus key in symbol mode', () => {
      const wrapper = mountVHotkey({
        keys: 'shift+-',
        displayMode: 'symbol',
      })

      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys[1].text()).toBe('−') // Minus symbol (different from hyphen)
      expect(keys[1].classes()).toContain('v-hotkey__key-symbol')
    })

        it('should render minus key in icon mode', () => {
      const wrapper = mountVHotkey({
        keys: 'shift+-',
        displayMode: 'icon',
      })

      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys[1].classes()).toContain('v-hotkey__key-icon')
      expect(keys[1].find('.v-icon').exists()).toBe(true)
    })
  })

  describe('Multiple Key Combinations', () => {
    it('should handle multiple space-separated combinations', () => {
      const wrapper = mountVHotkey({ keys: 'ctrl+k meta+p' })

      // Should render two separate combinations
      const combinations = wrapper.findAll('.v-hotkey__combination')
      expect(combinations).toHaveLength(2)

      // Each combination should have 2 keys
      const allKeys = wrapper.findAll('.v-hotkey__key')
      expect(allKeys).toHaveLength(4)
    })
  })

    describe('Custom Key Mapping', () => {
    it('should use custom key mapping when provided', () => {
      const customKeyMap = {
        '-': (mode: any, isMac: boolean) => ['text', 'MINUS'] as ['text', string],
      }

      const wrapper = mountVHotkey({
        keys: 'shift+-',
        keyMap: customKeyMap,
      })

      const keys = wrapper.findAll('.v-hotkey__key')
      expect(keys[1].text()).toBe('MINUS')
    })
  })

  describe('Error Handling', () => {
    it('should handle empty keys prop gracefully', () => {
      const wrapper = mountVHotkey({ keys: '' })

      expect(wrapper.find('.v-hotkey').exists()).toBe(true)
      expect(wrapper.findAll('.v-hotkey__key')).toHaveLength(0)
    })

    it('should handle undefined keys prop gracefully', () => {
      const wrapper = mountVHotkey({})

      expect(wrapper.find('.v-hotkey').exists()).toBe(true)
      expect(wrapper.findAll('.v-hotkey__key')).toHaveLength(0)
    })
  })
})
