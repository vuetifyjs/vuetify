// Components
import { VBtn } from '@/components/VBtn'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('defaults', () => {
  it('applies global default class and style', () => {
    const vuetify = createVuetify({
      defaults: {
        VBtn: {
          class: 'foobar',
          style: 'color: red;',
        },
      },
    })

    const wrapper = mount<any>(VBtn, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.classes()).toContain('foobar')
    expect(wrapper.attributes('style')).toContain('color: red;')
  })

  it('prefers local styles', () => {
    const vuetify = createVuetify({
      defaults: {
        VBtn: {
          class: 'foobar',
          style: 'color: red; background: red;',
        },
      },
    })

    const wrapper = mount<any>(VBtn, {
      props: {
        class: 'baz',
        style: 'background: blue; caret-color: blue;',
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.classes()).toContain('foobar')
    expect(wrapper.classes()).toContain('baz')
    expect(wrapper.attributes('style')).toContain('color: red;')
    expect(wrapper.attributes('style')).toContain('background: blue;')
    expect(wrapper.attributes('style')).toContain('caret-color: blue;')
  })
})
