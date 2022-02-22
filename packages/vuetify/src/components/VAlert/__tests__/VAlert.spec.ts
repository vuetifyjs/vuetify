// Components
import { VAlert } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('VAlert', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VAlert, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it.each([
    ['prepend'],
    ['close'],
  ])('should generate slot content', slot => {
    const wrapper = mountFunction({
      slots: { [slot]: '<div>foobar</div>' },
    })

    expect(wrapper.html()).toContain('<div>foobar</div>')
  })

  it.each([
    [{}, false],
    [{ icon: 'foobar' }, true],
  ])('should generate actions slot', (props, expected) => {
    const wrapper = mountFunction({ props })
    const icon = wrapper.find('.v-alert__prepend')

    expect(icon.exists()).toBe(expected)
  })
})
