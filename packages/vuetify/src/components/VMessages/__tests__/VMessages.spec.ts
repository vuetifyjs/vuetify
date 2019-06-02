// Components
import VMessages from '../VMessages'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VMessages.ts', () => {
  type Instance = ExtractVue<typeof VMessages>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VMessages, {
        ...options,
      })
    }
  })

  it('should have a default array', () => {
    const wrapper = mountFunction()

    expect(Array.isArray(wrapper.vm.value)).toBe(true)
  })

  it('should show messages', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: ['foo', 'bar'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: [] })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow HTML', () => {
    const wrapper = mountFunction({
      propsData: {
        value: ['<a href="#">a link</a>'],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
