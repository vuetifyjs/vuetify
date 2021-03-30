// Components
import { VAvatar } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VAvatar', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VAvatar, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
