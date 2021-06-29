// Components
import { VListItem } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'
import { nextTick } from 'vue'

describe('VListItem', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VListItem, {
      global: { plugins: [vuetify] },
      ...options,
    })
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

  it('should conditionally have the tabindex attribute', async () => {
    const wrapper = mountFunction()

    expect(wrapper.attributes('tabindex')).toBeUndefined()

    wrapper.setProps({ link: true })

    await nextTick()

    expect(wrapper.attributes('tabindex')).toBe('0')

    wrapper.setProps({ disabled: true })

    await nextTick()

    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })
})
