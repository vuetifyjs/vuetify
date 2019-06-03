// Components
import VSnackbar from '../VSnackbar'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VSnackbar.ts', () => {
  type Instance = InstanceType<typeof VSnackbar>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {} as MountOptions<Instance>) => {
      return mount(VSnackbar, options)
    }
  })

  it('should have a v-snack class', () => {
    const wrapper = mountFunction({
      propsData: {
        value: true,
      },
    })

    expect(wrapper.classes()).toContain('v-snack')
  })

  it('should have a v-snack__wrapper with a color class', () => {
    const wrapper = mountFunction({
      propsData: {
        value: true,
        color: 'orange lighten-2',
      },
    })

    expect(wrapper.findAll('.v-snack__wrapper.orange')).toHaveLength(1)
    expect(wrapper.findAll('.v-snack__wrapper.lighten-2')).toHaveLength(1)
  })

  it('should have a v-snack__content class only when active', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
        timeout: 1000,
      },
    })

    expect(wrapper.findAll('div .v-snack__content')).toHaveLength(0)

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('div .v-snack__content')).toHaveLength(1)
  })

  it('should timeout correctly', async () => {
    jest.useFakeTimers()
    const wrapper = mountFunction({
      propsData: {
        value: false,
        timeout: 3141,
      },
    })

    const value = jest.fn()

    wrapper.vm.$on('input', value)
    wrapper.setProps({ value: true })
    // wrapper.update()

    await wrapper.vm.$nextTick()

    expect(setTimeout.mock.calls).toHaveLength(1)
    expect(setTimeout.mock.calls[0][1]).toBe(3141)

    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(false)
    expect(value).toHaveBeenCalledWith(false)
  })

  it('should timeout correctly when initial value is true', async () => {
    jest.useFakeTimers()
    const wrapper = mountFunction({
      propsData: {
        value: true,
        timeout: 3141,
      },
    })

    const value = jest.fn()

    wrapper.vm.$on('input', value)

    await wrapper.vm.$nextTick()

    expect(setTimeout.mock.calls).toHaveLength(1)
    expect(setTimeout.mock.calls[0][1]).toBe(3141)

    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(false)
    expect(value).toHaveBeenCalledWith(false)
  })
})
