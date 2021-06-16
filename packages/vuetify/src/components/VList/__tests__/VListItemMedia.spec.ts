// Components
import { VListItemMedia } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VListItemMedia', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VListItemMedia, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
