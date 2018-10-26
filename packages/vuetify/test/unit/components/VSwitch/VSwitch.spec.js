import { test, touch } from '@/test'
import VSwitch from '@/components/VSwitch'

test('VSwitch.js', ({ mount }) => {
  it('should set ripple data attribute based on ripple prop state', async () => {
    const wrapper = mount(VSwitch, {
      propsData: {
        inputValue: false,
        ripple: false
      }
    })

    let ripple = wrapper.find('.v-input--selection-controls__ripple')

    expect(ripple.length).toBe(0)

    wrapper.setProps({ ripple: true })

    ripple = wrapper.first('.v-input--selection-controls__ripple')

    await wrapper.vm.$nextTick()

    expect(ripple.element._ripple.enabled).toBe(true)
    expect(ripple.element._ripple.centered).toBe(true)
  })

  it('should emit change event on swipe', async () => {
    const wrapper = mount(VSwitch, {
      props: {
        inputValue: false
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    touch(wrapper.first('.v-input--selection-controls__ripple')).start(0, 0).end(20, 0)
    expect(change).toBeCalledWith(true)
    expect(change).toHaveBeenCalledTimes(1)

    wrapper.setProps({ inputValue: true })
    touch(wrapper.first('.v-input--selection-controls__ripple')).start(0, 0).end(-20, 0)
    expect(change).toBeCalledWith(false)
    expect(change).toHaveBeenCalledTimes(2)
  })

  it('should not emit change event on swipe when not active', async () => {
    const wrapper = mount(VSwitch, {
      props: {
        inputValue: false
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    touch(wrapper.first('.v-input--selection-controls__ripple')).start(0, 0).end(-20, 0)
    expect(change).not.toBeCalled()

    wrapper.setProps({ inputValue: true })
    touch(wrapper.first('.v-input--selection-controls__ripple')).start(0, 0).end(20, 0)
    expect(change).not.toBeCalled()
  })
})
