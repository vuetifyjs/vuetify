// Components
import { VChip } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('VChip', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VChip, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  it('should emit close click event', () => {
    const wrapper = mountFunction({
      props: { closable: true },
    })

    wrapper.find('.v-chip__close').trigger('click')

    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['click:close']).toHaveLength(1)
  })

  it.each([
    ['prepend'],
    ['append'],
    ['close'],
  ])('should generate slot content', slot => {
    const wrapper = mountFunction({
      slots: { [slot]: '<div>foobar</div>' },
    })

    expect(wrapper.html()).toContain('<div>foobar</div>')
  })
})
