import VColorPickerEdit from '../VColorPickerEdit'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { fromRGBA } from '../util'

describe('VColorPickerEdit.ts', () => {
  type Instance = InstanceType<typeof VColorPickerEdit>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VColorPickerEdit, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        ...options,
      })
    }
  })

  it('should emit event when input changes', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        mode: 'hexa',
      },
      listeners: {
        'update:color': update,
      },
    })

    const input = wrapper.find('input')
    const el = input.element as HTMLInputElement
    el.value = '#12345678'
    input.trigger('change')

    expect(update).toHaveBeenCalledTimes(1)
  })

  it('should work in RGBA mode', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        mode: 'rgba',
      },
      listeners: {
        'update:color': update,
      },
    })

    const inputs = wrapper.findAll('input').wrappers

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      const el = input.element as HTMLInputElement

      el.value = `${i}`
      input.trigger('input')
    }

    expect(update).toHaveBeenCalledTimes(4)
  })

  it('should work in HSLA mode', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        mode: 'hsla',
      },
      listeners: {
        'update:color': update,
      },
    })

    const inputs = wrapper.findAll('input').wrappers

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      const el = input.element as HTMLInputElement

      el.value = `${i}`
      input.trigger('input')
    }

    expect(update).toHaveBeenCalledTimes(4)
  })

  it('should render with disabled', () => {
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        mode: 'rgba',
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change mode', async () => {
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        mode: 'hexa',
      },
    })

    const changeMode = wrapper.find('.v-btn')

    changeMode.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    changeMode.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    changeMode.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      mode: 'hsla',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should hide mode switch button', () => {
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        mode: 'rgba',
        hideModeSwitch: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-btn').exists()).toBe(false)
  })
})
