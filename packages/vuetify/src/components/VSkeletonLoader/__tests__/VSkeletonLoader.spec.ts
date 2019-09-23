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

  it('should dynamically render content', () => {
    const wrapper = mountFunction({
      slots: {
        default: '<div>foobar</div>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ loading: true })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have the correct a11y attributes when loading', () => {
    const wrapper = mountFunction({
      propsData: { loading: true },
      slots: {
        // Add a default slot to allow
        // toggling the loading prop
        default: '<div>foobar</div>',
      },
    })

    expect(wrapper.element.getAttribute('aria-busy')).toBe('true')
    expect(wrapper.element.getAttribute('aria-live')).toBe('polite')
    expect(wrapper.element.getAttribute('role')).toBe('alert')

    wrapper.setProps({ loading: false })

    expect(wrapper.element.getAttribute('aria-busy')).toBeNull()
    expect(wrapper.element.getAttribute('aria-live')).toBeNull()
    expect(wrapper.element.getAttribute('role')).toBeNull()
  })

  it('should not render aria attributes when using boilerplate', () => {
    const wrapper = mountFunction({
      propsData: { boilerplate: true },
    })

    expect(wrapper.vm.attrs).toEqual({})
  })
})
