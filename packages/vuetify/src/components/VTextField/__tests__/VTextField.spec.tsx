import { VTextField } from '../VTextField'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { ref } from 'vue'

describe('VTextField', () => {
  const vuetify = createVuetify()

  function mountFunction (component: any, options = {}) {
    return mount(component, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  it('has affixed icons', () => {
    const wrapper = mountFunction(
      <VTextField
        prependIcon="$vuetify"
        prependInnerIcon="$vuetify"
        appendInnerIcon="$vuetify"
        appendIcon="$vuetify"
      />
    )

    let el = wrapper.find('.v-input__prepend .v-icon')
    expect(el.attributes('aria-hidden')).toBe('true')
    expect(el.attributes('aria-label')).toBeUndefined()

    el = wrapper.find('.v-field__prepend-inner .v-icon')
    expect(el.attributes('aria-hidden')).toBe('true')
    expect(el.attributes('aria-label')).toBeUndefined()

    el = wrapper.find('.v-field__append-inner .v-icon')
    expect(el.attributes('aria-hidden')).toBe('true')
    expect(el.attributes('aria-label')).toBeUndefined()

    el = wrapper.find('.v-input__append .v-icon')
    expect(el.attributes('aria-hidden')).toBe('true')
    expect(el.attributes('aria-label')).toBeUndefined()
  })

  it('has affixed icons with actions', () => {
    const onClickPrepend = vi.fn()
    const onClickPrependInner = vi.fn()
    const onClickAppendInner = vi.fn()
    const onClickAppend = vi.fn()

    const wrapper = mountFunction(
      <VTextField
        prependIcon="$vuetify"
        prependInnerIcon="$vuetify"
        appendInnerIcon="$vuetify"
        appendIcon="$vuetify"
        onClick:prepend={ onClickPrepend }
        onClick:prependInner={ onClickPrependInner }
        onClick:appendInner={ onClickAppendInner }
        onClick:append={ onClickAppend }
      />
    )

    expect(onClickPrepend).toHaveBeenCalledTimes(0)
    expect(onClickPrependInner).toHaveBeenCalledTimes(0)
    expect(onClickAppendInner).toHaveBeenCalledTimes(0)
    expect(onClickAppend).toHaveBeenCalledTimes(0)

    let el = wrapper.find('.v-input__prepend .v-icon')
    expect(el.attributes('aria-hidden')).toBe('false')
    expect(el.attributes('aria-label')).toBeTruthy()
    el.trigger('click')
    expect(onClickPrepend).toHaveBeenCalledTimes(1)

    el = wrapper.find('.v-field__prepend-inner .v-icon')
    expect(el.attributes('aria-hidden')).toBe('false')
    expect(el.attributes('aria-label')).toBeTruthy()
    el.trigger('click')
    expect(onClickPrependInner).toHaveBeenCalledTimes(1)

    el = wrapper.find('.v-field__append-inner .v-icon')
    expect(el.attributes('aria-hidden')).toBe('false')
    expect(el.attributes('aria-label')).toBeTruthy()
    el.trigger('click')
    expect(onClickAppendInner).toHaveBeenCalledTimes(1)

    el = wrapper.find('.v-input__append .v-icon')
    expect(el.attributes('aria-hidden')).toBe('false')
    expect(el.attributes('aria-label')).toBeTruthy()
    el.trigger('click')
    expect(onClickAppend).toHaveBeenCalledTimes(1)

    expect(onClickPrepend).toHaveBeenCalledTimes(1)
    expect(onClickPrependInner).toHaveBeenCalledTimes(1)
    expect(onClickAppendInner).toHaveBeenCalledTimes(1)
  })

  describe('hide-details behavior', () => {
    it('should not have aria-describedby when hide-details is true', () => {
      const wrapper = mountFunction(
        <VTextField hideDetails />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBeUndefined()

      // Should not have details section
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(false)
    })

    it('should have aria-describedby when hide-details is false or undefined', () => {
      const wrapper = mountFunction(
        <VTextField id="input-1" />
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
        <VTextField
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
        <VTextField
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
        <VTextField
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

    it('should have aria-describedby when hide-details is "auto" and has counter', () => {
      const wrapper = mountFunction(
        <VTextField
          id="input-5"
          counter={ 10 }
          hideDetails="auto"
        />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('input-5-messages')

      // Should have details section with counter
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(true)
      expect(details.attributes('id')).toBe('input-5-messages')
    })

    it('should have aria-describedby when hide-details is "auto" and has details slot', () => {
      const wrapper = mountFunction(
        <VTextField
          id="input-6"
          hideDetails="auto"
          v-slots={{
            details: () => <div>Custom details</div>,
          }}
        />
      )

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('input-6-messages')

      // Should have details section with custom content
      const details = wrapper.find('.v-input__details')
      expect(details.exists()).toBe(true)
      expect(details.attributes('id')).toBe('input-6-messages')
      expect(details.text()).toContain('Custom details')
    })
  })

  describe('placeholder slot', () => {
    it('should render placeholder slot when input is empty', () => {
      const wrapper = mountFunction(
        <VTextField v-slots={{
          placeholder: () => <div class="custom-placeholder">Custom Placeholder</div>,
        }} />
      )

      const placeholder = wrapper.find('.v-field__placeholder')
      expect(placeholder.exists()).toBe(true)
      expect(placeholder.text()).toBe('Custom Placeholder')
    })

    it('should not render placeholder slot when input has value', () => {
      const wrapper = mountFunction(
        <VTextField modelValue="hello" v-slots={{
          placeholder: () => <div class="custom-placeholder">Custom Placeholder</div>,
        }} />
      )

      const placeholder = wrapper.find('.v-field__placeholder')
      expect(placeholder.exists()).toBe(false)
    })

    it('should not set native placeholder when slot is provided', () => {
      const wrapper = mountFunction(
        <VTextField
          placeholder="Native placeholder"
          v-slots={{
            placeholder: () => <div>Custom Placeholder</div>,
          }}
        />
      )

      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBeUndefined()
    })

    it('should fallback to placeholder prop when no slot is provided', () => {
      const wrapper = mountFunction(
        <VTextField placeholder="Native placeholder" />
      )

      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('Native placeholder')
    })

    it('should pass placeholder prop in slot scope', () => {
      let slotPlaceholder: string | undefined
      mountFunction(
        <VTextField
          placeholder="test-placeholder"
          v-slots={{
            placeholder: (slotProps: any) => {
              slotPlaceholder = slotProps.placeholder
              return <div>Placeholder</div>
            },
          }}
        />
      )

      expect(slotPlaceholder).toBe('test-placeholder')
    })

    it('should render placeholder slot when dirty but not focused', () => {
      const wrapper = mountFunction(
        <VTextField
          modelValue="hello"
          v-slots={{
            placeholder: () => <div>Custom Placeholder</div>,
          }}
        />
      )

      const placeholder = wrapper.find('.v-field__placeholder')
      expect(placeholder.exists()).toBe(false)
    })

    it('should show placeholder when persistentPlaceholder is true and focused', async () => {
      const wrapper = mountFunction(
        <VTextField
          persistentPlaceholder
          v-slots={{
            placeholder: () => <div>Custom Placeholder</div>,
          }}
        />
      )

      const input = wrapper.find('input')
      await input.trigger('focus')

      const placeholder = wrapper.find('.v-field__placeholder')
      expect(placeholder.exists()).toBe(true)
    })
  })
})
