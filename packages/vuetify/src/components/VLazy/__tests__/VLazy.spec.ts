// Components
import VLazy from '../VLazy'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VLazy.ts', () => {
  type Instance = InstanceType<typeof VLazy>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VLazy, {
        ...options,
      })
    }
  })

  it('should conditionally render content', async () => {
    const wrapper = mountFunction({
      slots: {
        default: '<div>foobar</div>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set a minimum height', () => {
    const wrapper = mountFunction({
      propsData: {
        minHeight: 200,
      },
    })

    expect(wrapper.element.style.minHeight).toBe('200px')
  })

  it('should activate the slot when element is intersected', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isActive).toBeFalsy()

    const entries = [] as IntersectionObserverEntry[]
    const observer = {} as IntersectionObserver

    wrapper.vm.onObserve(entries, observer, false)

    expect(wrapper.vm.isActive).toBeFalsy()

    wrapper.vm.onObserve(entries, observer, true)

    expect(wrapper.vm.isActive).toBeTruthy()

    wrapper.vm.onObserve(entries, observer, false)

    expect(wrapper.vm.isActive).toBeTruthy()
  })
})
