import { test } from '@/test'
import { VWindow, VWindowItem } from '@/components/VWindow'

test('VWindowItem.ts', ({ mount }) => {
  it('should transition content', async () => {
    const wrapper = mount(VWindow, {
      slots: {
        default: [VWindowItem]
      }
    })

    const item = wrapper.first(VWindowItem.options)
    // Before enter
    expect(wrapper.vm.isActive).toBe(false)
    item.vm.onBeforeEnter()
    expect(wrapper.vm.isActive).toBe(true)

    // Enter
    const el = document.createElement('div')
    expect(wrapper.vm.height).toBe(undefined)
    item.vm.onEnter(el)
    await new Promise(resolve => window.requestAnimationFrame(resolve))
    expect(wrapper.vm.height).toBe('0px')

    // After enter
    item.vm.onAfterEnter()
    await new Promise(resolve => window.requestAnimationFrame(resolve))
    expect(wrapper.vm.height).toBe(undefined)
    expect(wrapper.vm.isActive).toBe(false)

    // Before leave
    item.vm.onBeforeLeave(el)
    expect(wrapper.vm.height).toBe('0px')
  })
})
