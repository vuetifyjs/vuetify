// Components
import { VBreadcrumbs } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('VBreadcrumbs', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VBreadcrumbs, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it.each([
    ['text'],
    ['divider'],
  ])('should generate slot content', slot => {
    const wrapper = mountFunction({
      props: { items: ['fizz', 'buzz'] },
      slots: { [slot]: '<div>foobar</div>' },
    })

    expect(wrapper.html()).toContain('<div>foobar</div>')
  })
})
