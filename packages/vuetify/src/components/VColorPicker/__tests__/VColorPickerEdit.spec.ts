import VColorPickerEdit from '../VColorPickerEdit'
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'
import { fromRgba, fromHex, fromHsla } from '../util'

describe('VColorPickerEdit.ts', () => {
  type Instance = InstanceType<typeof VColorPickerEdit>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VColorPickerEdit, options)
    }
  })

  it('should work in HEX mode', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRgba([ 0, 0, 0, 0 ]),
        mode: 'hex'
      },
      listeners: {
        'update:color': update
      }
    })

    const input = wrapper.find('input')
    ;(input.element as HTMLInputElement).value = '#12345678'
    input.trigger('change')
    expect(update).toHaveBeenLastCalledWith(fromHex([ '12', '34', '56', '78' ]))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work in RGBA mode', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRgba([ 0, 0, 0, 0 ]),
        mode: 'rgba'
      },
      listeners: {
        'update:color': update
      }
    })

    const inputs = wrapper.findAll('input').wrappers
    ;(inputs[0].element as HTMLInputElement).value = '123'
    inputs[0].trigger('input')
    expect(update).toHaveBeenLastCalledWith(fromRgba([ 123, 0, 0, 0 ]))

    ;(inputs[1].element as HTMLInputElement).value = '456'
    inputs[1].trigger('input')
    expect(update).toHaveBeenLastCalledWith(fromRgba([ 0, 456, 0, 0 ]))

    ;(inputs[2].element as HTMLInputElement).value = '789'
    inputs[2].trigger('input')
    expect(update).toHaveBeenLastCalledWith(fromRgba([ 0, 0, 789, 0 ]))

    ;(inputs[3].element as HTMLInputElement).value = '222'
    inputs[3].trigger('input')
    expect(update).toHaveBeenLastCalledWith(fromRgba([ 0, 0, 0, 222 ]))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work in HSLA mode', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRgba([ 0, 0, 0, 0 ]),
        mode: 'hsla'
      },
      listeners: {
        'update:color': update
      }
    })

    const inputs = wrapper.findAll('input').wrappers
    ;(inputs[0].element as HTMLInputElement).value = '123'
    inputs[0].trigger('input')
    expect(update).toHaveBeenLastCalledWith(fromHsla([ 123, 0, 0, 0 ]))

    ;(inputs[1].element as HTMLInputElement).value = '456'
    inputs[1].trigger('input')
    expect(update).toHaveBeenLastCalledWith(fromHsla([ 0, 456, 0, 0 ]))

    ;(inputs[2].element as HTMLInputElement).value = '789'
    inputs[2].trigger('input')
    expect(update).toHaveBeenLastCalledWith(fromHsla([ 0, 0, 789, 0 ]))

    ;(inputs[3].element as HTMLInputElement).value = '222'
    inputs[3].trigger('input')
    expect(update).toHaveBeenLastCalledWith(fromHsla([ 0, 0, 0, 222 ]))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with disabled', () => {
    const wrapper = mountFunction({
      propsData: {
        color: fromRgba([ 0, 0, 0, 0 ]),
        mode: 'rgba',
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change mode', () => {
    const update = jest.fn()
    const watch = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRgba([ 0, 0, 0, 0 ]),
        mode: 'hex'
      },
      listeners: {
        'update:mode': update
      },
      watch: {
        internalMode: watch
      }
    })

    const changeMode = wrapper.find('.v-btn')

    changeMode.trigger('click')
    expect(update).toHaveBeenLastCalledWith('rgba')
    expect(watch).toHaveBeenLastCalledWith('rgba', 'hex')

    changeMode.trigger('click')
    expect(update).toHaveBeenLastCalledWith('hsla')
    expect(watch).toHaveBeenLastCalledWith('hsla', 'rgba')

    changeMode.trigger('click')
    expect(update).toHaveBeenLastCalledWith('hex')
    expect(watch).toHaveBeenLastCalledWith('hex', 'hsla')

    wrapper.setProps({
      mode: 'hsla'
    })
    expect(watch).toHaveBeenLastCalledWith('hsla', 'hex')
  })
})
