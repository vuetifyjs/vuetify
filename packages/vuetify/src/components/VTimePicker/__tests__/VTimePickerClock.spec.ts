import VTimePickerClock from '../VTimePickerClock'
import { touch } from '../../../../test'
import { mount } from '@vue/test-utils'

describe('VTimePickerClock.js', () => {
  (window as any).TouchEvent = Event

  function createBoundingRect (wrapper) {
    wrapper.vm.$refs.clock.getBoundingClientRect = () => {
      return {
        width: 300,
        height: 300,
        top: 0,
        left: 0,
        right: 300,
        bottom: 300,
        x: 0,
        y: 0,
      }
    }

    wrapper.vm.$refs.innerClock.getBoundingClientRect = () => {
      return {
        width: 246,
        height: 246,
        top: 0,
        left: 0,
        right: 246,
        bottom: 246,
        x: 0,
        y: 0,
      }
    }
  }

  it('should render component', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        allowedValues: n => n % 2,
        max: 59,
        min: 0,
        step: 5,
        value: 10,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        allowedValues: n => n % 2,
        disabled: true,
        max: 59,
        min: 0,
        step: 5,
        value: 10,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with double prop', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        allowedValues: n => n % 2,
        double: true,
        max: 59,
        min: 0,
        step: 5,
        value: 10,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event on wheel if scrollable', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        max: 59,
        min: 3,
        value: 59,
        scrollable: true,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    wrapper.trigger('wheel')
    expect(input).toHaveBeenCalledWith(3)
  })

  it('should not emit input event on wheel if readonly and scrollable', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        max: 10,
        min: 1,
        value: 6,
        scrollable: true,
        readonly: true,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    wrapper.trigger('wheel')
    expect(input).not.toHaveBeenCalled()
  })

  it('should emit input event on wheel if scrollable and has allowedValues', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        max: 10,
        min: 1,
        value: 6,
        scrollable: true,
        allowedValues: val => !(val % 3),
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    wrapper.trigger('wheel')
    expect(input).toHaveBeenCalledWith(9)
  })

  it('should not emit input event on wheel if not scrollable', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        max: 59,
        min: 3,
        value: 59,
        scrollable: false,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    wrapper.trigger('wheel')
    expect(input).not.toHaveBeenCalled()
  })

  it('should emit change event on mouseup/touchend', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        value: 59,
        min: 0,
        max: 60,
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.vm.valueOnMouseUp = 55
    wrapper.trigger('mouseup')
    expect(change).toHaveBeenCalledWith(55)

    wrapper.trigger('touchend')
    expect(change).toHaveBeenCalledWith(55)
  })

  it('should not emit change event on mouseup/touchend if readonly', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        value: 59,
        min: 0,
        max: 60,
        readonly: true,
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.vm.valueOnMouseUp = 55
    wrapper.trigger('mouseup')
    expect(change).not.toHaveBeenCalled()

    wrapper.trigger('touchend')
    expect(change).not.toHaveBeenCalled()
  })

  it('should emit change event on mouseleave', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        value: 59,
        min: 0,
        max: 60,
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.trigger('mouseleave')
    expect(change).not.toHaveBeenCalled()

    wrapper.vm.isDragging = true
    wrapper.vm.valueOnMouseUp = 58
    wrapper.trigger('mouseleave')
    expect(change).toHaveBeenCalledWith(58)
  })

  it('should calculate angle', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        value: 59,
        min: 0,
        max: 60,
      },
    })

    const center = { x: 1, y: 1 }
    const angle = p => Math.round(wrapper.vm.angle(center, p))
    expect(angle({ x: 2, y: 1 })).toBe(90)
    expect(angle({ x: 2, y: 2 })).toBe(45)
    expect(angle({ x: 0, y: 2 })).toBe(315)
    expect(angle({ x: 0, y: 0 })).toBe(225)
    expect(angle({ x: 2, y: 0 })).toBe(135)
  })

  it('should not emit input event when clicked disabled value (#5897)', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        allowedValues: value => value >= 59 && value <= 60,
        min: 0,
        max: 59,
        size: 320,
      },
    })

    createBoundingRect(wrapper)

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    touch(wrapper).start(0, 0).move(141, 0)

    expect(input).not.toHaveBeenCalled()
  })

  it('should change with touch move', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        min: 0,
        max: 7,
        value: 0,
        size: 320,
        double: true,
      },
    })

    createBoundingRect(wrapper)

    const input = jest.fn()
    const finger = touch(wrapper).start(0, 0)
    wrapper.vm.$on('input', input)

    finger.move(300, 150)
    expect(input).toHaveBeenCalledWith(1)
    finger.move(150, 250)
    expect(input).toHaveBeenCalledWith(2)
    finger.move(150, 249)
    expect(input).toHaveBeenCalledWith(6)

    // edge case
    finger.move(120, 0)
    expect(input).toHaveBeenCalledWith(0)
    finger.move(135, 90)
    expect(input).toHaveBeenCalledWith(4)
    finger.move(90, 135)
    expect(input).toHaveBeenCalledWith(7)
  })
})
