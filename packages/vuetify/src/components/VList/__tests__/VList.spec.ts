// Components
import { VList } from '..'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VList', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount<any>(VList, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
