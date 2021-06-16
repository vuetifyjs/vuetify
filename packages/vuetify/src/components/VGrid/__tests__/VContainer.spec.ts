// Components
import VContainer from '../VContainer'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VContainer', () => {
  const vuetify = createVuetify()

  function mountFunction (template: string) {
    return mount(VContainer, {
      global: { plugins: [vuetify] },
    })
  }

  it('should work', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toBe('<div class="v-container"></div>')
  })
})
