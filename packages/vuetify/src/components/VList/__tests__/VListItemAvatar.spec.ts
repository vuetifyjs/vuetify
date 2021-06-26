// Components
import { VListItemAvatar } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

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
