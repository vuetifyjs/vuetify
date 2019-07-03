// Components
import VSwitch from '../VSwitch'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { touch } from '../../../../test'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VSwitch.ts', () => {
  type Instance = ExtractVue<typeof VSwitch>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VSwitch, options)
    }
  })

  it('should set ripple data attribute based on ripple prop state', async () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
        ripple: false,
      },
    })

    expect(wrapper.findAll('.v-input--selection-controls__ripple').wrappers).toHaveLength(0)

    wrapper.setProps({ ripple: true })

    await wrapper.vm.$nextTick()

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    expect((ripple.element as any)._ripple.enabled).toBe(true)
    expect((ripple.element as any)._ripple.centered).toBe(true)
  })

  it('should emit change event on swipe', async () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    touch(wrapper.find('.v-input--selection-controls__ripple')).start(0, 0).end(20, 0)
    expect(change).toHaveBeenCalledWith(true)
    expect(change).toHaveBeenCalledTimes(1)

    wrapper.setProps({ inputValue: true })
    touch(wrapper.find('.v-input--selection-controls__ripple')).start(0, 0).end(-20, 0)
    expect(change).toHaveBeenCalledWith(false)
    expect(change).toHaveBeenCalledTimes(2)
  })

  it('should emit change event on key events', async () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
      },
    })

    const change = jest.fn()
    const input = wrapper.find('input')
    wrapper.vm.$on('change', change)

    input.trigger('keydown.left')
    expect(change).not.toHaveBeenCalled()

    input.trigger('keydown.right')
    expect(change).toHaveBeenCalledWith(true)
    expect(change).toHaveBeenCalledTimes(1)

    input.trigger('keydown.right')
    expect(change).toHaveBeenCalledTimes(1)

    input.trigger('keydown.left')
    expect(change).toHaveBeenCalledWith(false)
    expect(change).toHaveBeenCalledTimes(2)
  })

  it('should not emit change event on swipe when not active', async () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    touch(wrapper.find('.v-input--selection-controls__ripple')).start(0, 0).end(-20, 0)
    expect(change).not.toHaveBeenCalled()

    wrapper.setProps({ inputValue: true })
    touch(wrapper.find('.v-input--selection-controls__ripple')).start(0, 0).end(20, 0)
    expect(change).not.toHaveBeenCalled()
  })

  it('should render element with loader and match the snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        loading: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
