import VWindow from '@/components/VWindow/VWindow'
import VWindowItem from '@/components/VWindow/VWindowItem'
import { test } from '@/test'

test('VWindow.ts', ({ mount }) => {
  it('it should return the correct transition', async () => {
    const wrapper = mount(VWindow)
    // Wait for booted
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.computedTransition).toBe('v-window-x-transition')

    wrapper.setData({ isReverse: true })
    expect(wrapper.vm.computedTransition).toBe('v-window-x-reverse-transition')

    wrapper.setProps({ vertical: true })
    expect(wrapper.vm.computedTransition).toBe('v-window-y-reverse-transition')

    wrapper.setData({ isReverse: false })
    expect(wrapper.vm.computedTransition).toBe('v-window-y-transition')
  })

  it('should set reverse', async () => {
    const wrapper = mount(VWindow, {
      propsData: {
        value: 0
      },
      slots: {
        default: [
          VWindowItem,
          VWindowItem
        ]
      }
    })

    wrapper.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isReverse).toBe(false)

    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isReverse).toBe(true)
  })
})
