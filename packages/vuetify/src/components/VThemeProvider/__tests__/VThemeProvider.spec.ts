// Components
import { VThemeProvider } from '..'

// Utilities
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { VuetifySymbol } from '@/framework'

describe('VThemeProvider.ts', () => {
  function mountFunction (options = {}) {
    return mount(VThemeProvider, {
      global: {
        provide: {
          [VuetifySymbol as symbol]: { defaults: { global: {} } },
          [VuetifyThemeSymbol as symbol]: createTheme(),
        },
      },
      ...options,
    })
  }

  it('should use theme defined in prop', async () => {
    const wrapper = mountFunction({
      props: { theme: 'dark' },
    })

    expect(wrapper.classes('v-theme--dark')).toBeTruthy()
  })

  it('should use default theme from options', async () => {
    const wrapper = mountFunction()

    expect(wrapper.classes('v-theme--light')).toBeTruthy()
  })

  it('should not use parent value if nested', async () => {
    const Test = defineComponent({
      setup () {
        return () => h(VThemeProvider, () =>
          h(VThemeProvider, { theme: 'dark' })
        )
      },
    })

    const wrapper = mount(Test, {
      global: {
        provide: {
          [VuetifySymbol as symbol]: { defaults: { global: {} } },
          [VuetifyThemeSymbol as symbol]: createTheme({
            defaultTheme: 'contrast',
          }),
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
