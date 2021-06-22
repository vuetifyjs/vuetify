// Components
import { VListItemAvatar } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VListItemAvatar', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VListItemAvatar, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
