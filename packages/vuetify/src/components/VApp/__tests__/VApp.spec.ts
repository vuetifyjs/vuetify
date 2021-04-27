// Components
import VApp from '../VApp'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VApp', () => {
  const vuetify = createVuetify()
  const mountFunction = (options?: any) => mount(VApp, {
    ...options,
    global: {
      plugins: [vuetify],
    },
  })

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have data-app attribute', () => {
    const wrapper = mountFunction()

    const app = wrapper.find('.v-application')
    expect(app.attributes()['data-app']).toBe('true')
  })

  it('should allow a custom id', () => {
    const wrapper = mountFunction({
      attrs: {
        id: 'inspire',
      },
    })

    const app = wrapper.find('.v-application')
    expect(app.attributes().id).toBe('inspire')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
