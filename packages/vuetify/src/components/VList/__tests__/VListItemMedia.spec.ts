// Components
import { VListItemMedia } from '..'

// Composables
import { createDefaults, VuetifyDefaultsSymbol } from '@/composables/defaults'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { mount } from '@vue/test-utils'

describe('VListItemMedia', () => {
  function mountFunction (options = {}) {
    return mount(VListItemMedia, {
      global: {
        provide: {
          [VuetifyDefaultsSymbol as symbol]: createDefaults(),
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
