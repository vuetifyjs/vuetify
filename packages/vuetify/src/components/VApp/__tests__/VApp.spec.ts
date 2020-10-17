// Components
import VApp from '../VApp'

// Utilities
import { mount } from '@vue/test-utils'
import { createMockVuetifyInstance } from '../../../../test'

describe('VApp', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(VApp, {
      global: {
        provide: {
          ...createMockVuetifyInstance(),
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have data-app attribute', () => {
    const wrapper = mount(VApp, {
      global: {
        provide: {
          ...createMockVuetifyInstance(),
        },
      },
    })

    const app = wrapper.find('.v-application')
    expect(app.attributes()['data-app']).toBe('true')
  })

  it('should allow a custom id', () => {
    const wrapper = mount(VApp, {
      attrs: {
        id: 'inspire',
      },
      global: {
        provide: {
          ...createMockVuetifyInstance(),
        },
      },
    })
    const app = wrapper.find('.v-application')
    expect(app.attributes().id).toBe('inspire')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
