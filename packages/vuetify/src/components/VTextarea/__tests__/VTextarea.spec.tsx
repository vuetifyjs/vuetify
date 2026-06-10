import { VTextarea } from '../VTextarea'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VTextarea', () => {
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
      <VTextarea
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
      <VTextarea
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

  describe('placeholder slot', () => {
    it('should render placeholder slot when input is empty', () => {
      const wrapper = mountFunction(
        <VTextarea v-slots={{
          placeholder: () => <div class="custom-placeholder">Custom Placeholder</div>,
        }} />
      )

      const placeholder = wrapper.find('.v-field__placeholder')
      expect(placeholder.exists()).toBe(true)
      expect(placeholder.text()).toBe('Custom Placeholder')
    })

    it('should not render placeholder slot when input has value', () => {
      const wrapper = mountFunction(
        <VTextarea modelValue="hello" v-slots={{
          placeholder: () => <div class="custom-placeholder">Custom Placeholder</div>,
        }} />
      )

      const placeholder = wrapper.find('.v-field__placeholder')
      expect(placeholder.exists()).toBe(false)
    })

    it('should not set native placeholder when slot is provided', () => {
      const wrapper = mountFunction(
        <VTextarea
          placeholder="Native placeholder"
          v-slots={{
            placeholder: () => <div>Custom Placeholder</div>,
          }}
        />
      )

      const textarea = wrapper.find('textarea')
      expect(textarea.attributes('placeholder')).toBeUndefined()
    })

    it('should fallback to placeholder prop when no slot is provided', () => {
      const wrapper = mountFunction(
        <VTextarea placeholder="Native placeholder" />
      )

      const textarea = wrapper.find('textarea')
      expect(textarea.attributes('placeholder')).toBe('Native placeholder')
    })

    it('should pass placeholder prop in slot scope', () => {
      let slotPlaceholder: string | undefined
      mountFunction(
        <VTextarea
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

    it('should not render placeholder slot when dirty', () => {
      const wrapper = mountFunction(
        <VTextarea
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
        <VTextarea
          persistentPlaceholder
          v-slots={{
            placeholder: () => <div>Custom Placeholder</div>,
          }}
        />
      )

      const textarea = wrapper.find('textarea')
      await textarea.trigger('focus')

      const placeholder = wrapper.find('.v-field__placeholder')
      expect(placeholder.exists()).toBe(true)
    })
  })
})
