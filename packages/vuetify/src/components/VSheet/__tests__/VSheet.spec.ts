// Components
import VSheet from '..'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables'
import { mount } from '@vue/test-utils'
import { VuetifySymbol } from '@/framework'

describe('VSheet', () => {
  function mountFunction (options = {}) {
    return mount(VSheet, {
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
