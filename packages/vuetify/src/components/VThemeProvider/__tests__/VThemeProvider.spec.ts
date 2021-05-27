// Components
import { VThemeProvider } from '..'
import { VBtn } from '@/components'

// Utilities
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VThemeProvider.ts', () => {
  function mountFunction (options = {}, vuetifyOptions = {}) {
    const vuetify = createVuetify(vuetifyOptions)
    return mount(VThemeProvider, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  it('should use theme defined in prop', async () => {
    const wrapper = mountFunction({
      props: { theme: 'dark' },
      slots: {
        default: () => h(VBtn, () => 'foo')
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use default theme from options', async () => {
    const wrapper = mountFunction({
      slots: {
        default: () => h(VBtn, () => 'foo')
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render div when using with-background prop', () => {
    const wrapper = mountFunction({
      props: {
        withBackground: true,
      },
      slots: {
        default: () => h(VBtn, () => 'foo')
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
