// Components
import VOverlay from '../VOverlay'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VOverlay.ts', () => {
  type Instance = InstanceType<typeof VOverlay>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VOverlay, {
        ...options,
      })
    }
  })

  it('should have a conditional opacity', async () => {
    const wrapper = mountFunction({
      propsData: { value: false },
    })

    expect(wrapper.vm.computedOpacity).toBe(0)

    wrapper.setProps({ value: true })
    expect(wrapper.vm.computedOpacity).toBe(0.46)

    wrapper.setProps({ opacity: 0.55 })
    expect(wrapper.vm.computedOpacity).toBe(0.55)

    wrapper.setProps({ value: false })
    expect(wrapper.vm.computedOpacity).toBe(0)
  })
})
