// Components
import { VContainer } from '../VContainer'

// Utilities
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'
import { createVuetify } from '@/framework'

describe('VContainer', () => {
  const vuetify = createVuetify()

  function mountFunction (template: string) {
    return mount({
      components: { VContainer },
      template,
    }, {
      global: { plugins: [vuetify] },
    })
  }

  it('should work', () => {
    const wrapper = mountFunction(`<VContainer />`)

    expect(wrapper.html()).toBe('<div class="v-container"></div>')
  })
})
