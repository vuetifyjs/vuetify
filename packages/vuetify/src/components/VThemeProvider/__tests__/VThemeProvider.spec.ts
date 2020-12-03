// Components
import { VThemeProvider } from '../VThemeProvider'

// Utilities
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { createTheme, VuetifyThemeSymbol } from '@/composables'
import { createMockVuetifyInstance } from '../../../../test'

describe('VThemeProvider.ts', () => {
  it('should use theme defined in prop', async () => {
    const wrapper = mount(VThemeProvider, {
      props: {
        theme: 'dark',
      },
      global: {
        provide: {
          ...createMockVuetifyInstance(),
          [VuetifyThemeSymbol as symbol]: createTheme(),
        },
      },
    })

    expect(wrapper.classes('theme--dark')).toBeTruthy()
  })

  it('should use default theme from options', async () => {
    const wrapper = mount(VThemeProvider, {
      props: {},
      global: {
        provide: {
          ...createMockVuetifyInstance(),
          [VuetifyThemeSymbol as symbol]: createTheme(),
        },
      },
    })

    expect(wrapper.classes('theme--light')).toBeTruthy()
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
          ...createMockVuetifyInstance(),
          [VuetifyThemeSymbol as symbol]: createTheme({
            defaultTheme: 'contrast',
          }),
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
