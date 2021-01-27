// Components
import { VThemeProvider } from '../VThemeProvider'

// Utilities
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { VuetifySymbol } from '@/framework'

describe('VThemeProvider.ts', () => {
  it('should use theme defined in prop', async () => {
    const wrapper = mount(VThemeProvider, {
      props: {
        theme: 'dark',
      },
      global: {
        provide: {
          [VuetifySymbol as symbol]: { defaults: { global: {} } },
          [VuetifyThemeSymbol as symbol]: createTheme(),
        },
      },
    })

    expect(wrapper.classes('v-theme--dark')).toBeTruthy()
  })

  it('should use default theme from options', async () => {
    const wrapper = mount(VThemeProvider, {
      global: {
        provide: {
          [VuetifySymbol as symbol]: { defaults: { global: {} } },
          [VuetifyThemeSymbol as symbol]: createTheme(),
        },
      },
    })

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
