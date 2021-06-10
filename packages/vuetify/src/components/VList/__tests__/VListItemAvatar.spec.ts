// Components
import { VListItemAvatar } from '..'

// Composables
import { createDefaults, VuetifyDefaultsSymbol } from '@/composables/defaults'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { mount } from '@vue/test-utils'

describe('VListItemAvatar', () => {
  function mountFunction (options = {}) {
    return mount(VListItemAvatar, {
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
