// Components
import Selectable from '../index'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('Selectable.ts', () => {
  const Mock = Selectable.extend({
    render: h => h('div'),
  })

  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Mock, {
        ...options,
      })
    }
  })

  it('should update lazyValue and hasColor data when value changes', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.lazyValue).toBeUndefined()
    expect(wrapper.vm.hasColor).toBeUndefined()

    wrapper.setProps({ inputValue: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.lazyValue).toBe(true)
    expect(wrapper.vm.hasColor).toBe(true)
  })
})
