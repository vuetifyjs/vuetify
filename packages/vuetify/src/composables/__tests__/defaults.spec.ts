// Components
import { VBtn } from '@/components/VBtn'

// Utilities
import { createVuetify } from '@/framework'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

describe('defaults.ts', () => {
  it('should apply global default classes', () => {
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
})
