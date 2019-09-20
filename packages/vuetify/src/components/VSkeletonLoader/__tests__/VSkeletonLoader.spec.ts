// Components
import VSkeletonLoader from '../VSkeletonLoader'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VSkeletonLoader.ts', () => {
  type Instance = InstanceType<typeof VSkeletonLoader>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VSkeletonLoader, {
        ...options,
      })
    }
  })

  it('should generate an array of elements based upon @ value', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.genBones('text@4')).toHaveLength(4)
    expect(wrapper.vm.genBones('text@2')).toHaveLength(2)
  })

  it('should generate a skeleton recursive tree', () => {
    const wrapper = mountFunction()

    for (const key in wrapper.vm.rootTypes) {
      const type = wrapper.vm.rootTypes[key]

      const iteration = mountFunction({ propsData: { type } })

      expect(iteration.html()).toMatchSnapshot()
    }
  })
})
