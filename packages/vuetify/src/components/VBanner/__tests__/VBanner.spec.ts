// Components
import { VBanner } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('VBanner', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VBanner, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    ['actions'],
    ['avatar'],
  ])('should generate slot content', slot => {
    const wrapper = mountFunction({
      slots: { [slot]: '<div>foobar</div>' },
    })

    expect(wrapper.html()).toContain('<div>foobar</div>')
  })

  it.each([
    [{}, false],
    [{ avatar: 'foobar' }, true],
    [{ icon: 'foobar' }, true],
  ])('should generate actions slot', (props, expected) => {
    const wrapper = mountFunction({ props })
    const avatar = wrapper.find('.v-banner-avatar')

    expect(avatar.exists()).toBe(expected)
  })
})
