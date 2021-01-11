// Components
import VContainer from '../VContainer'

// Utilities
import { mount } from '@vue/test-utils'
import * as framework from '@/framework'

function mountFunction (template: string) {
  return mount({
    components: { VContainer },
    template,
  })
}

describe('VContainer', () => {
  beforeEach(() => {
    jest.spyOn(framework, 'useVuetify').mockReturnValue({
      defaults: { global: {} },
    })
  })
  afterEach(() => {
    jest.spyOn(framework, 'useVuetify').mockRestore()
  })

  it('should work', () => {
    const wrapper = mountFunction(`<VContainer />`)

    expect(wrapper.html()).toBe('<div class="v-container"></div>')
  })
})
