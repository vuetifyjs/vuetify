// Components
import { VList } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('VList', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount<any>(VList, {
      global: { plugins: [vuetify] },
      ...options,
    }) as VueWrapper<VList>
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
