import Vue from 'vue'
import { Lang } from '../../../services/lang'
import VTimePicker from '../VTimePicker'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { createBoundingRect } from './VTimePickerClock.spec'
import { touch, mouse } from '../../../../test'
import VTimePickerClock from '../VTimePickerClock'

Vue.prototype.$vuetify = {
  lang: new Lang(),
}

describe('VTimePicker.ts', () => {
  type Instance = InstanceType<typeof VTimePicker>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTimePicker, options)
    }
  })

  it('should render a time', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '09:12:34',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a time with seconds', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '09:12:34',
        useSeconds: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a time in 24hr format', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '09:12:34',
        format: '24hr',
      },
    })

    expect(wrapper.find('.v-time-picker-clock__ampm').exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a time in landscape', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '09:12:34',
        landscape: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should hide title', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '09:12:34',
        noTitle: true,
      },
    })

    expect(wrapper.find('.v-time-picker-title').exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should accept Date as value', () => {
    const wrapper = mountFunction({
      propsData: {
        value: new Date(2019, 5, 21, 9, 12, 34),
        useSeconds: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update am/pm state when value changes', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '9:00am',
      },
    })

    expect(wrapper.find('.v-time-picker-clock__ampm .v-picker__title__btn--active').text()).toBe('AM')

    wrapper.setProps({
      value: '9:00pm',
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-time-picker-clock__ampm .v-picker__title__btn--active').text()).toBe('PM')
  })

  it('should render colored time picker', async () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render colored time picker, header', async () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'primary',
        headerColor: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render dark time picker', async () => {
    const wrapper = mountFunction({
      propsData: {
        dark: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change time based on format', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '3:00pm',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      format: '24hr',
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change clock when clicking in title', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '9:00am',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const hour = wrapper.findAll('.v-time-picker-title__time .v-picker__title__btn').at(1)
    hour.element.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '01:23pm',
      },
      listeners: {
        input,
      },
    })

    const clock = wrapper.find(VTimePickerClock)

    createBoundingRect(clock)

    mouse(clock.find('.v-time-picker-clock__outer')).mousedown(250, 240).mouseup(250, 240)
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith('16:23')
  })

  it('should only emit when full time has been selected', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      listeners: {
        input,
      },
    })

    const hours = wrapper.find(VTimePickerClock)
    createBoundingRect(hours)

    touch(hours.find('.v-time-picker-clock__outer')).start(250, 250).end(0, 0)
    await wrapper.vm.$nextTick()

    expect(input).not.toHaveBeenCalled()

    const minutes = wrapper.find(VTimePickerClock)
    createBoundingRect(minutes)

    touch(minutes.find('.v-time-picker-clock__outer')).start(250, 250).end(0, 0)
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith('05:23')
  })
})
