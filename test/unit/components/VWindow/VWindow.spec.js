import VWindow from '@/components/VWindow/VWindow'
import VWindowItem from '@/components/VWindow/VWindowItem'
import { test, touch } from '@/test'

test('VWindow.ts', ({ mount }) => {
  it('it should return the correct transition', async () => {
    const wrapper = mount(VWindow)
    // Force booted
    wrapper.setData({ isBooted: true })

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

    // Reverse implicitly set by changed index
    wrapper.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalReverse).toBe(false)

    // Reverse implicitly set by changed index
    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalReverse).toBe(true)

    // Reverse explicit prop override
    wrapper.setProps({ reverse: false })
    expect(wrapper.vm.internalReverse).toBe(false)

    // Reverse explicit prop override
    wrapper.setProps({ reverse: true })
    expect(wrapper.vm.internalReverse).toBe(true)

    // Reverts back to local isReverse
    wrapper.setProps({ reverse: undefined })
    expect(wrapper.vm.internalReverse).toBe(true)
  })

  it('should increment and decrement current value', async () => {
    const wrapper = mount(VWindow, {
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
          VWindowItem
        ]
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.vm.next()
    expect(wrapper.vm.internalValue).toBe(1)

    wrapper.vm.next()
    expect(wrapper.vm.internalValue).toBe(2)

    wrapper.vm.next()
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.vm.prev()
    expect(wrapper.vm.internalValue).toBe(2)

    wrapper.vm.prev()
    expect(wrapper.vm.internalValue).toBe(1)

    wrapper.vm.prev()
    expect(wrapper.vm.internalValue).toBe(0)
  })

  it('should update model when internal index is greater than item count', async () => {
    const wrapper = mount(VWindow, {
      propsData: {
        value: 2
      },
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
          VWindowItem
        ]
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(2)

    const [item1, item2, item3] = wrapper.find(VWindowItem.options)

    item3.destroy()
    expect(wrapper.vm.internalValue).toBe(1)

    item2.destroy()
    expect(wrapper.vm.internalValue).toBe(0)

    item1.destroy()
    expect(wrapper.vm.internalValue).toBe(undefined)
  })

  it('should react to touch', async () => {
    const wrapper = mount(VWindow, {
      propsData: { value: 1 },
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
          VWindowItem,
          VWindowItem,
          VWindowItem
        ]
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(1)
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.internalValue).toBe(0)

    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.internalValue).toBe(4)

    touch(wrapper).start(200, 0).end(0, 0)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.setProps({ value: 4 })
    touch(wrapper).start(200, 0).end(0, 0)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.setProps({ value: 0 })
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.internalValue).toBe(4)
  })

  it('should accept a custom touch object', async () => {
    const left = jest.fn()
    const right = jest.fn()
    const fns = { left, right }
    const wrapper = mount(VWindow, {
      propsData: {
        touch: fns,
        value: 1
      },
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
          VWindowItem,
          VWindowItem,
          VWindowItem
        ]
      }
    })

    await wrapper.vm.$nextTick()

    touch(wrapper).start(200, 0).end(0, 0)
    touch(wrapper).start(0, 0).end(200, 0)
    expect(left).toBeCalled()
    expect(right).toBeCalled()
  })
})
