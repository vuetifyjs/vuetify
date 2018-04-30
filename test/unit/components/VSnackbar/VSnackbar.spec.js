import { test } from '@/test'
import VSnackbar from '@/components/VSnackbar'

test('VSnackbar.vue', ({ mount }) => {
  it('should have a v-snack class', () => {
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: true
      }
    })

    expect(wrapper.hasClass('v-snack')).toBe(true)
  })

  it('should have a v-snack__wrapper with a color class', () => {
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: true,
        color: 'orange lighten-2'
      }
    })

    expect(wrapper.find('.v-snack__wrapper.orange')).toHaveLength(1)
    expect(wrapper.find('.v-snack__wrapper.lighten-2')).toHaveLength(1)
  })

  it('should have a v-snack__content class only when active', async () => {
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: false,
        timeout: 1000
      }
    })

    expect(wrapper.find('div .v-snack__content')).toHaveLength(0)

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('div .v-snack__content')).toHaveLength(1)
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

    await wrapper.vm.$nextTick()

    expect(wrapper.data().isActive).toBe(false)
    expect(value).toBeCalledWith(false)
  })
})
