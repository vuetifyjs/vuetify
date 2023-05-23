// Components
import { VListItemMedia } from '..'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

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
