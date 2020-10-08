import VColorPickerCanvas from '../VColorPickerCanvas'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { fromRGBA } from '../util'

function createMouseEvent (x: number, y: number): MouseEvent {
  return {
    preventDefault: () => {},
    clientX: x,
    clientY: y,
  } as any
}

const rectMock: DOMRect = {
  bottom: 0,
  height: 100,
  width: 100,
  left: 0,
  right: 0,
  top: 0,
  x: 0,
  y: 0,
}

describe('VColorPickerCanvas.ts', () => {
  type Instance = InstanceType<typeof VColorPickerCanvas>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VColorPickerCanvas, options)
    }
  })

  it('should emit event on click', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        width: 100,
        height: 100,
      },
      listeners: {
        'update:color': update,
      },
    })
    wrapper.vm.$el.getBoundingClientRect = () => rectMock

    wrapper.vm.handleClick(createMouseEvent(10, 10))
    expect(update).toHaveBeenCalledTimes(1)
    expect(update.mock.calls[0][0]).toMatchSnapshot()
  })

  it('should emit event on mouse move', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        width: 100,
        height: 100,
      },
      listeners: {
        'update:color': update,
      },
    })
    wrapper.vm.$el.getBoundingClientRect = () => rectMock
    const addEventListener = jest.spyOn(window, 'addEventListener')
    const removeEventListener = jest.spyOn(window, 'removeEventListener')

    wrapper.vm.handleMouseDown(createMouseEvent(0, 0))
    expect(update).toHaveBeenCalledTimes(0)
    expect(addEventListener).toHaveBeenCalledTimes(2)

    wrapper.vm.handleMouseMove(createMouseEvent(10, 10))
    expect(update).toHaveBeenCalledTimes(1)
    expect(update.mock.calls[0][0]).toMatchSnapshot()

    wrapper.vm.handleMouseMove(createMouseEvent(100, 100))
    expect(update).toHaveBeenCalledTimes(2)
    expect(update.mock.calls[1][0]).toMatchSnapshot()

    wrapper.vm.handleMouseUp()
    expect(removeEventListener).toHaveBeenCalledTimes(2)
  })

  it('should ignore mouse events when disabled', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
        width: 100,
        height: 100,
        disabled: true,
      },
      listeners: {
        'update:color': update,
      },
    })
    wrapper.vm.$el.getBoundingClientRect = () => rectMock

    wrapper.vm.handleClick(createMouseEvent(10, 10))
    wrapper.vm.handleMouseDown(createMouseEvent(0, 0))
    wrapper.vm.handleMouseMove(createMouseEvent(10, 10))
    wrapper.vm.handleMouseMove(createMouseEvent(100, 100))
    expect(update).toHaveBeenCalledTimes(0)
  })
})
