import { VCheckbox } from '../VCheckbox'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VCheckbox', () => {
  const vuetify = createVuetify()

  function mountFunction (component: any, options = {}) {
    return mount(component, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  describe('hide-details behavior', () => {
    it('should not have aria-describedby when hide-details is true', () => {
      const wrapper = mountFunction(
        <VCheckbox hideDetails />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBeUndefined()

      // Should not have details section
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(false)
    })

    it('should have aria-describedby when hide-details is false or undefined', () => {
      const wrapper = mountFunction(
        <VCheckbox id="input-1" />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('input-1-messages')

      // Should have details section
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(true)
      expect(details.attributes('id')).toBe('input-1-messages')
    })

    it('should have aria-describedby when hide-details is "auto" and has messages', () => {
      const wrapper = mountFunction(
        <VCheckbox
          id="input-2"
          messages={['Hello World!']}
          hideDetails="auto"
        />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('input-2-messages')

      // Should have details section with messages
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(true)
      expect(details.attributes('id')).toBe('input-2-messages')

      const messages = wrapper.find('.v-messages')
      expect(messages.exists()).toBe(true)
    })

    it('should not have aria-describedby when hide-details is "auto" and no messages', () => {
      const wrapper = mountFunction(
        <VCheckbox
          id="input-3"
          hideDetails="auto"
        />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBeUndefined()

      // Should not have details section
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(false)
    })

    it('should have aria-describedby when hide-details is "auto" and has error messages', () => {
      const wrapper = mountFunction(
        <VCheckbox
          id="input-4"
          errorMessages={['This field is required']}
          hideDetails="auto"
        />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('input-4-messages')

      // Should have details section with error messages
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(true)
      expect(details.attributes('id')).toBe('input-4-messages')
    })

    it('should have aria-describedby when hide-details is "auto" and has details slot', () => {
      const wrapper = mountFunction(
        <VCheckbox
          id="input-5"
          hideDetails="auto"
          v-slots={{
            details: () => <div>Custom details</div>,
          }}
        />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('input-5-messages')

      // Should have details section with custom content
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(true)
      expect(details.attributes('id')).toBe('input-5-messages')
      expect(details.text()).toContain('Custom details')
    })

    it('should handle persistent hint correctly', () => {
      const wrapper = mountFunction(
        <VCheckbox
          id="input-8"
          hint="Persistent hint"
          persistentHint
        />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('input-8-messages')

      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(true)
      expect(details.text()).toContain('Persistent hint')
    })
  })
})
