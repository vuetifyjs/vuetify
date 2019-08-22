import VColorPicker from '../VColorPicker'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VColorPicker.ts', () => {
  type Instance = InstanceType<typeof VColorPicker>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  let el

  beforeEach(() => {
    el = document.createElement('div')
    el.setAttribute('data-app', 'true')
    document.body.appendChild(el)

    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VColorPicker, {
        ...options,
        mocks: {
          $vuetify: {
            rtl: false,
          },
        },
        sync: false,
      })
    }
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should render color picker', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change canvas height', () => {
    const wrapper = mountFunction({
      propsData: {
        canvasHeight: 200,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('canvas').attributes().height).toBe('200')
  })

  it('should show swatches', () => {
    const wrapper = mountFunction({
      propsData: {
        showSwatches: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-color-picker__swatches').exists()).toBe(true)
  })

  it('should hide canvas', () => {
    const wrapper = mountFunction({
      propsData: {
        hideCanvas: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-color-picker__canvas').exists()).toBe(false)
  })

  it('should hide inputs', () => {
    const wrapper = mountFunction({
      propsData: {
        hideInputs: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-color-picker__edit').exists()).toBe(false)
  })

  it('should return hex if given hex', async () => {
    const fn = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '#00FF00',
      },
      listeners: {
        input: fn,
      },
    })

    // Get first input (red)
    const input = wrapper.find('.v-color-picker__input input')
    const el = input.element as HTMLInputElement

    el.value = '255'
    input.trigger('input')

    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenLastCalledWith('#FFFF00')
  })

  it('should return rgb if given rgb', async () => {
    const fn = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: { r: 0, g: 0, b: 255 },
      },
      listeners: {
        input: fn,
      },
    })

    // Get first input (red)
    const input = wrapper.find('.v-color-picker__input input')
    const el = input.element as HTMLInputElement

    el.value = '255'
    input.trigger('input')

    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenLastCalledWith({ r: 255, g: 0, b: 255, a: 1 })
  })

  it('should not show alpha controls if given hex value without alpha', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '#00FF00',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
