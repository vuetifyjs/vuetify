// Components
import { VFooter } from '..'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { mount } from '@vue/test-utils'
import { VuetifySymbol } from '@/framework'

describe('VFooter', () => {
  function mountFunction (options = {}) {
    return mount(VFooter, {
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
})
