// Components
import VBannerContent from '../VBannerContent'
import VBannerThumbnail from '../VBannerThumbnail'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { mount } from '@vue/test-utils'
import { VuetifySymbol } from '@/framework'

describe('VBannerContent', () => {
  function mountFunction (options = {}) {
    return mount(VBannerContent, {
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

  it('should generate thumbnail slot', () => {
    const wrapper = mountFunction({
      slots: { thumbnail: '<div>foobar</div>' },
    })

    expect(wrapper.html()).toContain('<div>foobar</div>')
  })

  it.each([
    [{}, false],
    [{ avatar: 'foobar' }, true],
    [{ icon: 'foobar' }, true],
  ])('should generate actions slot', (props, expected) => {
    const wrapper = mountFunction({ props })
    const thumbnail = wrapper.findComponent(VBannerThumbnail)

    expect(thumbnail.exists()).toBe(expected)
  })
})
