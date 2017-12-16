import { test } from '~util/testing'
import VSnackbar from '~components/VSnackbar'

test('VSnackbar.vue', ({ mount }) => {
  it('should have a snack class', async () => {
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: true
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.hasClass('snack')).toBe(true)

    wrapper.vm.close()
    wrapper.vm.afterLeave()
  })

  it('should have a color class', async () => {
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: true,
        color: 'orange lighten-2'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.hasClass('orange')).toBe(true)
    expect(wrapper.hasClass('lighten-2')).toBe(true)

    wrapper.vm.close()
    wrapper.vm.afterLeave()
  })

  it('should have a snack__content class only when active', async () => {
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: false
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('div .snack__content')).toHaveLength(0)

    wrapper.setProps({ value: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('div .snack__content')).toHaveLength(1)

    wrapper.vm.close()
    wrapper.vm.afterLeave()
  })

  it('should timeout correctly', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: false,
        timeout: 3141
      }
    })

    const value = jest.fn()

    wrapper.instance().$on('input', value)
    wrapper.setProps({ value: true })
    wrapper.update()

    await wrapper.vm.$nextTick()

    expect(setTimeout.mock.calls).toHaveLength(1)
    expect(setTimeout.mock.calls[0][1]).toBe(3141)

    jest.runAllTimers()
    wrapper.vm.afterLeave()
    await wrapper.vm.$nextTick()

    expect(wrapper.data().isActive).toBe(false)
    expect(value).toBeCalledWith(false)
  })

  it('should timeout correctly when initial value is true', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: true,
        timeout: 3141
      }
    })

    const value = jest.fn()

    wrapper.instance().$on('input', value)

    await wrapper.vm.$nextTick()

    expect(setTimeout.mock.calls).toHaveLength(1)
    expect(setTimeout.mock.calls[0][1]).toBe(3141)

    jest.runAllTimers()
    wrapper.vm.afterLeave()
    await wrapper.vm.$nextTick()

    expect(wrapper.data().isActive).toBe(false)
    expect(value).toBeCalledWith(false)
  })

  it('should stack correctly', async () => {
    const wrapper_a = mount(VSnackbar)
    const wrapper_b = mount(VSnackbar)

    wrapper_a.setProps({ value: true })
    wrapper_b.setProps({ value: true })
    await wrapper_a.vm.$nextTick()
    expect(wrapper_a.data().isVisible).toBe(true)
    expect(wrapper_b.data().isVisible).toBe(false)

    wrapper_a.vm.close()
    wrapper_a.vm.afterLeave()
    await wrapper_a.vm.$nextTick()
    expect(wrapper_a.data().isVisible).toBe(false)
    expect(wrapper_b.data().isVisible).toBe(true)

    wrapper_b.vm.close()
    wrapper_b.vm.afterLeave()
    await wrapper_a.vm.$nextTick()
    expect(wrapper_a.data().isVisible).toBe(false)
    expect(wrapper_b.data().isVisible).toBe(false)
  })
})
