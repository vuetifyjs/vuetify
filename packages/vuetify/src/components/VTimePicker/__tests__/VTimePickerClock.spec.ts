import VTimePickerClock from '../VTimePickerClock'
import { touch, mouse } from '../../../../test'
import { mount, MountOptions, Wrapper } from '@vue/test-utils'
import { TimePickerEnum } from '../VTime'

export function createBoundingRect (wrapper, outerRect = { width: 270, top: 10, left: 10 }, innerRect = { width: 216 }) {
  wrapper.vm.$refs.clock.getBoundingClientRect = () => {
    return outerRect
  }

  wrapper.vm.$refs.innerClock.getBoundingClientRect = () => {
    return innerRect
  }
}

describe('VTimePickerClock.ts', () => {
  (window as any).TouchEvent = Event

  type Instance = InstanceType<typeof VTimePickerClock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTimePickerClock, options)
    }
  })

  it('should render hours in 24hr format', () => {
    const wrapper = mountFunction({
      propsData: {
        selectMode: TimePickerEnum.Hour,
        format: '24hr',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render hours in ampm format', async () => {
    const wrapper = mountFunction({
      propsData: {
        selectMode: TimePickerEnum.Hour,
        format: 'ampm',
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event on wheel if scrollable', async () => {
    const time = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 5,
          minute: 4,
          second: 3,
        },
        selectMode: TimePickerEnum.Hour,
      },
      listeners: {
        'update:time': time,
      },
    })

    const clock = wrapper.find('.v-time-picker-clock__outer')
    clock.trigger('wheel')
    await wrapper.vm.$nextTick()

    expect(time).not.toHaveBeenCalled()

    wrapper.setProps({
      scrollable: true,
    })
    await wrapper.vm.$nextTick()

    clock.trigger('wheel')
    await wrapper.vm.$nextTick()

    expect(time).toHaveBeenCalledWith({ hour: 6, minute: 4, second: 3 })
  })

  it('should not emit input event on wheel if scrollable and disabled or readonly', async () => {
    const time = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 5,
          minute: 4,
          second: 3,
        },
        selectMode: TimePickerEnum.Hour,
        scrollable: true,
        disabled: true,
      },
      listeners: {
        'update:time': time,
      },
    })

    const clock = wrapper.find('.v-time-picker-clock__outer')
    clock.trigger('wheel')
    await wrapper.vm.$nextTick()

    wrapper.setProps({
      disabled: false,
      readonly: true,
    })
    await wrapper.vm.$nextTick()

    clock.trigger('wheel')
    await wrapper.vm.$nextTick()

    expect(time).not.toHaveBeenCalled()
  })

  it('should not emit input event when clicked disabled value (#5897)', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        allowed: {
          minute: m => m >= 30,
        },
        selectMode: TimePickerEnum.Minute,
      },
      listeners: {
        'update:time': input,
      },
    })

    createBoundingRect(wrapper)

    const clock = wrapper.find('.v-time-picker-clock__outer')

    mouse(clock).mousedown(270, 270).mouseup(270, 270)
    await wrapper.vm.$nextTick()

    expect(input).not.toHaveBeenCalled()

    mouse(clock).mousedown(10, 150).mouseup(270, 270)
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith({ minute: 45 })
  })

  it('should change with touch move', async () => {
    const input = jest.fn()
    const wrapper = mount(VTimePickerClock, {
      propsData: {
        size: '290',
        selectMode: TimePickerEnum.Minute,
      },
      listeners: {
        'update:time': input,
      },
    })

    createBoundingRect(wrapper)

    const clock = wrapper.find('.v-time-picker-clock__outer')

    const finger = touch(clock).start(255, 145)
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith({ minute: 15 })

    finger.move(200, 240)
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith({ minute: 25 })

    finger.move(66, 66)
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith({ minute: 53 })

    // edge case, to the left of 0
    finger.move(137, 41)
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith({ minute: 59 })
  })
})
