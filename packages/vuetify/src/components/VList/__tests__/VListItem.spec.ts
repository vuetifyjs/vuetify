// Components
import { VListItem } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'
import { nextTick } from 'vue'

describe('VListItem', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount<any>(VListItem, {
      global: { plugins: [vuetify] },
      ...options,
    }) as VueWrapper<VListItem>
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should add active-class when the active prop is true', async () => {
    const activeClass = 'foo'
    const wrapper = mountFunction({ props: { activeClass } })

    expect(wrapper.classes()).not.toContain(activeClass)

    wrapper.setProps({ active: true })

    await nextTick()

    expect(wrapper.classes()).toContain(activeClass)
  })
})
