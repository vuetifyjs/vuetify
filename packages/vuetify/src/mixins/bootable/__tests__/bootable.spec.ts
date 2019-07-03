// Components
import Bootable from '../index'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('Bootable.ts', () => {
  type Instance = InstanceType<typeof Bootable>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount({
        mixins: [Bootable],
        render: h => h('div'),
      }, {
        ...options,
      })
    }
  })

  it('should be booted after activation', async () => {
    const wrapper = mountFunction({
      data: () => ({
        isActive: false,
      }),
    })

    expect(wrapper.vm.isBooted).toBe(false)
    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isBooted).toBe(true)
  })

  it('should return lazy content', async () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
      },
    })

    expect(wrapper.vm.showLazyContent('content')).toBe('content')

    const wrapperLazy = mountFunction({
      data: () => ({
        isActive: false,
      }),
    })

    expect(wrapperLazy.vm.showLazyContent('content')).toBeUndefined()
    wrapperLazy.vm.isActive = true
    await wrapper.vm.$nextTick()
    expect(wrapperLazy.vm.showLazyContent('content')).toBe('content')
    wrapperLazy.vm.isActive = false
    await wrapper.vm.$nextTick()
    expect(wrapperLazy.vm.showLazyContent('content')).toBe('content')
  })

  it('should show if lazy and active at boot', async () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
      },
    })

    expect(wrapper.vm.showLazyContent('content')).toBe('content')
  })

  it('should boot', async () => {
    const wrapper = mountFunction({
      data: () => ({ isActive: false }),
    })

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.isBooted).toBe(false)

    wrapper.setData({ isActive: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isBooted).toBe(true)
  })
})
