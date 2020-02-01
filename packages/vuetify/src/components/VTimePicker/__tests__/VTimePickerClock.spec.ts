import VTimePickerClock from '../VTimePickerClock'
import { touch } from '../../../../test'
import { mount } from '@vue/test-utils'

const CLOCK_SIZE = 300
const INNER_SIZE = 246

describe('VTimePickerClock.js', () => {
  (window as any).TouchEvent = Event

  function anglePosition (angle: number): [number, number] {
    return [
      CLOCK_SIZE / 2 + INNER_SIZE / 2 * Math.sin(angle / (180 / Math.PI)),
      CLOCK_SIZE / 2 - INNER_SIZE / 2 * Math.cos(angle / (180 / Math.PI)),
    ]
  }

  function createBoundingRect (wrapper) {
    wrapper.vm.$refs.clock.getBoundingClientRect = () => {
      return {
        width: CLOCK_SIZE,
        height: CLOCK_SIZE,
        top: 0,
        left: 0,
        right: CLOCK_SIZE,
        bottom: CLOCK_SIZE,
        x: 0,
        y: 0,
      }
    }

    wrapper.vm.$refs.innerClock.getBoundingClientRect = () => {
      return {
        width: INNER_SIZE,
        height: INNER_SIZE,
        top: 0,
        left: 0,
        right: INNER_SIZE,
        bottom: INNER_SIZE,
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

  it('should calculate position from angle', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        min: 0,
        max: 6,
      },
    })

    createBoundingRect(wrapper)

    const degreesPerUnit = wrapper.vm.degreesPerUnit
    const input = jest.fn()

    touch(wrapper).start(0, 0)
    wrapper.vm.$on('input', input)

    for (let i = 0; i <= 6; i++) {
      touch(wrapper).move(...anglePosition(i * degreesPerUnit))
      expect(input).toHaveBeenCalledWith(i)
    }
  })

  it('should not emit input event when clicked disabled value (#5897)', () => {
    const ALLOWED_VALUE = 15
    const ACCURACY_ANGLE = 15
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        allowedValues: value => value === ALLOWED_VALUE || value === 60 - ALLOWED_VALUE,
        min: 0,
        max: 59,
      },
    })

    createBoundingRect(wrapper)

    const degreesPerUnit = wrapper.vm.degreesPerUnit
    const input = jest.fn()

    touch(wrapper).start(0, 0)
    wrapper.vm.$on('input', input)

    // Click on disabled value and more than 15 degrees away from the allowed value
    touch(wrapper).move(...anglePosition(ALLOWED_VALUE * degreesPerUnit + ACCURACY_ANGLE + 1))
    expect(input).not.toHaveBeenCalled()
    touch(wrapper).move(...anglePosition(ALLOWED_VALUE * degreesPerUnit - ACCURACY_ANGLE - 1))
    expect(input).not.toHaveBeenCalled()

    // Click on disabled value and less than 15 degrees away from the allowed value
    touch(wrapper).move(...anglePosition(ALLOWED_VALUE * degreesPerUnit + ACCURACY_ANGLE - 1))
    expect(input).toHaveBeenCalledTimes(1)
    expect(input).toHaveBeenCalledWith(ALLOWED_VALUE)
    touch(wrapper).move(...anglePosition((60 - ALLOWED_VALUE) * degreesPerUnit + ACCURACY_ANGLE - 1))
    expect(input).toHaveBeenCalledTimes(2)
    expect(input).toHaveBeenCalledWith(60 - ALLOWED_VALUE)
    touch(wrapper).move(...anglePosition(ALLOWED_VALUE * degreesPerUnit - ACCURACY_ANGLE + 1))
    expect(input).toHaveBeenCalledTimes(3)
    expect(input).toHaveBeenCalledWith(ALLOWED_VALUE)
  })

  it('should change with touch move', () => {
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        min: 0,
        max: 7,
        value: 0,
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
