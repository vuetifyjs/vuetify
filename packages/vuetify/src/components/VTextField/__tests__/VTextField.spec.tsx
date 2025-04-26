import { VTextField } from '../VTextField'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

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
})
