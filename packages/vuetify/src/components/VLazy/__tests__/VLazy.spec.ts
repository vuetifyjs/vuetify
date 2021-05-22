// Components
import { VLazy } from '..'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VuetifySymbol } from '@/framework'

describe('VLazy', () => {
  function mountFunction (options = {}) {
    return mount(VLazy, {
      global: {
        provide: {
          [VuetifySymbol as symbol]: { defaults: { global: {} } },
          [VuetifyThemeSymbol as symbol]: createTheme(),
        },
      },
      ...options,
    })
  }

  it('should match a snapshot', async () => {
    const wrapper = mountFunction({
      slots: {
        default: '<div>foobar</div>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ modelValue: true })

    await nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ modelValue: false })

    await nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
