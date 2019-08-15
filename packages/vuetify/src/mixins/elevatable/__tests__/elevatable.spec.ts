// Mixins
import Elevatable from '../'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

const Component = Elevatable.extend({
  render: h => h('div'),
})

describe('elevatable.ts', () => {
  type Instance = InstanceType<typeof Component>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Component, {
        ...options,
      })
    }
  })

  it('generate elevation classes', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.computedElevation).toBeUndefined()
    expect(wrapper.vm.elevationClasses).toEqual({})

    wrapper.setProps({ elevation: 1 })
    expect(wrapper.vm.computedElevation).toBe(1)
    expect(wrapper.vm.elevationClasses).toEqual({
      'elevation-1': true,
    })

    wrapper.setProps({ elevation: '12' })
    expect(wrapper.vm.computedElevation).toBe('12')
    expect(wrapper.vm.elevationClasses).toEqual({
      'elevation-12': true,
    })

    wrapper.setProps({ elevation: 0 })
    expect(wrapper.vm.computedElevation).toBe(0)
    expect(wrapper.vm.elevationClasses).toEqual({
      'elevation-0': true,
    })
  })
})
