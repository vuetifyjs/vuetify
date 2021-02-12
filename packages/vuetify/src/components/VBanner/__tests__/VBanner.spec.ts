// Components
import VBanner from '../VBanner'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { mount } from '@vue/test-utils'
import { VuetifySymbol } from '@/framework'

describe('VBanner', () => {
  function mountFunction (options = {}) {
    return mount(VBanner, {
      global: {
        provide: {
          [VuetifySymbol as symbol]: { defaults: { global: {} } },
          [VuetifyThemeSymbol as symbol]: createTheme(),
        },
      },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    ['actions'],
    ['thumbnail'],
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
    const thumbnail = wrapper.find('.v-banner__thumbnail')

    expect(thumbnail.exists()).toBe(expected)
  })
})
