import Vue from 'vue'
import { test } from '@/test'
import Bootable from '@/mixins/bootable'

test('bootable.js', ({ mount }) => {
  it('should be booted after activation', async () => {
    const wrapper = mount({
      data: () => ({
        isActive: false,
      }),
      mixins: [ Bootable ],
      render: h => h('div')
    })

    expect(wrapper.vm.isBooted).toBe(false)
    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isBooted).toBe(true)
  })

  it('should return lazy content', async () => {
    const wrapper = mount({
      mixins: [ Bootable ],
      render: h => h('div')
    })

    expect(wrapper.vm.showLazyContent('content')).toBe('content')

    const wrapperLazy = mount({
      data: () => ({
        isActive: false,
      }),
      mixins: [ Bootable ],
      render: h => h('div')
    }, {
      propsData: {
        lazy: true
      }
    })

    expect(wrapperLazy.vm.showLazyContent('content')).toBe(undefined)
    wrapperLazy.vm.isActive = true
    await wrapper.vm.$nextTick()
    expect(wrapperLazy.vm.showLazyContent('content')).toBe('content')
    wrapperLazy.vm.isActive = false
    await wrapper.vm.$nextTick()
    expect(wrapperLazy.vm.showLazyContent('content')).toBe('content')
  })

  it('should show if lazy and active at boot', async () => {
    const wrapper = mount({
      data: () => ({
        isActive: true
      }),
      mixins: [Bootable],
      render: h => h('div')
    }, {
      propsData: {
        lazy: true
      }
    })

    expect(wrapper.vm.showLazyContent('content')).toBe('content')
  })

  it('should boot', async () => {
    const wrapper = mount({
      data: () => ({ isActive: false }),
      mixins: [Bootable],
      render: h => h('div')
    })

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.isBooted).toBe(false)

    wrapper.setData({ isActive: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isBooted).toBe(true)
  })
})
