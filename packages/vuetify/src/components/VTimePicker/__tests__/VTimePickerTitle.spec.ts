import Vue from 'vue'
import VTimePickerTitle from '../VTimePickerTitle'
import { Lang } from '../../../services/lang'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { TimePickerEnum } from '../VTime'

Vue.prototype.$vuetify = {
  lang: new Lang(),
}

describe('VTimePickerTitle.ts', () => {
  type Instance = InstanceType<typeof VTimePickerTitle>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTimePickerTitle, options)
    }
  })

  it('should render component in 24hr', () => {
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
        },
        format: '24hr',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in ampm', () => {
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render seconds', () => {
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
          second: 30,
        },
        useSeconds: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render ampm buttons', () => {
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
        },
        period: 'am',
        showAmPm: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit event when clicking hour, minute, second', async () => {
    const selectMode = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
          second: 30,
        },
        useSeconds: true,
        format: '24hr',
      },
      listeners: {
        'update:selectMode': selectMode,
      },
    })

    const buttons = wrapper.findAll('.v-time-picker-title__time .v-picker__title__btn')

    buttons.at(0).element.click()
    await wrapper.vm.$nextTick()

    expect(selectMode).toHaveBeenCalledWith(TimePickerEnum.Hour)

    buttons.at(1).element.click()
    await wrapper.vm.$nextTick()

    expect(selectMode).toHaveBeenCalledWith(TimePickerEnum.Minute)

    buttons.at(2).element.click()
    await wrapper.vm.$nextTick()

    expect(selectMode).toHaveBeenCalledWith(TimePickerEnum.Second)
  })

  it('should render disabled component', () => {
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
        },
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with selectMode from mount', () => {
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
        },
        selectMode: TimePickerEnum.Minute,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit event when clicking ampm buttons', async () => {
    const period = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
        },
        period: 'am',
        showAmPm: true,
      },
      listeners: {
        'update:period': period,
      },
    })

    const buttons = wrapper.findAll('.v-time-picker-title__ampm .v-picker__title__btn')
    buttons.at(1).element.click()
    await wrapper.vm.$nextTick()

    expect(period).toHaveBeenCalledWith('pm')

    wrapper.setProps({
      period: 'pm',
    })
    await wrapper.vm.$nextTick()

    buttons.at(0).element.click()
    await wrapper.vm.$nextTick()

    expect(period).toHaveBeenCalledWith('am')
  })

  it('should not emit event from ampm buttons when readonly', async () => {
    const period = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
        },
        period: 'am',
        showAmPm: true,
        readonly: true,
      },
      listeners: {
        'update:period': period,
      },
    })

    const buttons = wrapper.findAll('.v-time-picker-title__ampm .v-picker__title__btn')
    buttons.at(1).element.click()
    await wrapper.vm.$nextTick()

    expect(period).not.toHaveBeenCalled()

    wrapper.setProps({
      period: 'pm',
    })
    await wrapper.vm.$nextTick()

    buttons.at(0).element.click()
    await wrapper.vm.$nextTick()

    expect(period).not.toHaveBeenCalled()
  })

  it('should still emit event when clicking hour, minute, second when readonly', async () => {
    const selectMode = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        time: {
          hour: 14,
          minute: 13,
          second: 30,
        },
        readonly: true,
        useSeconds: true,
        format: '24hr',
      },
      listeners: {
        'update:selectMode': selectMode,
      },
    })

    const buttons = wrapper.findAll('.v-time-picker-title__time .v-picker__title__btn')

    buttons.at(0).element.click()
    await wrapper.vm.$nextTick()

    expect(selectMode).toHaveBeenCalledWith(TimePickerEnum.Hour)

    buttons.at(1).element.click()
    await wrapper.vm.$nextTick()

    expect(selectMode).toHaveBeenCalledWith(TimePickerEnum.Minute)

    buttons.at(2).element.click()
    await wrapper.vm.$nextTick()

    expect(selectMode).toHaveBeenCalledWith(TimePickerEnum.Second)
  })
})
