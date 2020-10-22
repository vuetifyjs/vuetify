import Vue from 'vue'
import { Lang } from '../../../services/lang'
import VTimePicker, { SelectingTimes } from '../VTimePicker'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

import { preset } from '../../../presets/default'

Vue.prototype.$vuetify = {
  lang: new Lang(preset),
}

describe('VTimePicker.ts', () => {
  type Instance = InstanceType<typeof VTimePicker>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTimePicker, options)
    }
  });

  [true, false].forEach(useSecondsValue => { // eslint-disable-line max-statements
    const useSecondsDesc = (useSecondsValue ? '. with useSeconds' : '')
    it('should accept a value' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          value: '09:12:34',
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.vm.selectingHour).toBe(true)
      expect(wrapper.vm.selectingMinute).toBe(false)
      expect(wrapper.vm.selectingSecond).toBe(false)
      expect(wrapper.vm.selecting).toBe(SelectingTimes.Hour)
      expect(wrapper.vm.inputHour).toBe(9)
      expect(wrapper.vm.inputMinute).toBe(12)
      expect(wrapper.vm.inputSecond).toBe(34)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render landscape component' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          value: '09:12:34',
          landscape: true,
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render disabled component' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          disabled: true,
          value: '09:12:34',
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render flat component' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          flat: true,
          value: '09:12:34',
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render component with elevation' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          elevation: 15,
          value: '09:12:34',
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render component without a title' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: '09:12:34',
          noTitle: true,
          useSeconds: useSecondsValue,
        },
      })
      expect(wrapper.findAll('.v-picker__title').wrappers).toHaveLength(0)
    })

    it('should accept a date object for a value' + useSecondsDesc, async () => {
      const now = new Date('2017-01-01 12:00 AM')
      const wrapper = mountFunction({
        propsData: {
          value: now,
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.vm.inputHour).toBe(0)
      expect(wrapper.vm.inputMinute).toBe(0)
      expect(wrapper.vm.inputSecond).toBe(0)
      expect(wrapper.vm.period).toBe('am')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should change am/pm when updated from model' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          value: '9:00am',
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      wrapper.setProps({ value: '9:00pm' })
      expect(wrapper.vm.period).toBe('pm')
      // with seconds
      wrapper.setProps({ value: '9:00:12am' })
      expect(wrapper.vm.period).toBe('am')
      wrapper.setProps({ value: '9:00:12pm' })
      expect(wrapper.vm.period).toBe('pm')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should set picker to pm when given Date after noon' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: new Date('2017-01-01 12:00 PM'),
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.vm.period).toBe('pm')
      // with seconds
      wrapper.setProps({ value: new Date('2017-01-01 12:00:13 PM') })
      expect(wrapper.vm.period).toBe('pm')
    })

    it('should set picker to pm when given string with PM in it' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: '1:00 PM',
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.vm.period).toBe('pm')
      // with seconds
      wrapper.setProps({ value: '1:00:12 PM' })
      expect(wrapper.vm.period).toBe('pm')
    })

    it('should set picker to pm when given string with pm in it' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: '1:00 pm',
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.vm.period).toBe('pm')
      // with seconds
      wrapper.setProps({ value: '1:00:13 pm' })
      expect(wrapper.vm.period).toBe('pm')
    })

    it('should set picker to am when given Date before noon' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: new Date('2017-01-01 1:00 AM'),
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.vm.period).toBe('am')
      // with seconds
      wrapper.setProps({ value: new Date('2017-01-01 1:00:30 AM') })
      expect(wrapper.vm.period).toBe('am')
    })

    it('should render colored time picker' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          value: '09:00:00',
          color: 'orange darken-1',
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render colored time picker, header' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          value: '09:00:00',
          color: 'primary',
          headerColor: 'orange darken-1',
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render dark time picker' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          dark: true,
          useSeconds: useSecondsValue,
        },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should set input hour when setting hour in 12hr mode' + useSecondsDesc, () => { // eslint-disable-line max-statements
      const wrapper = mountFunction({
        propsData: {
          value: '01:23pm',
          format: 'ampm',
          useSeconds: useSecondsValue,
        },
      })

      wrapper.vm.onInput(7)
      expect(wrapper.vm.inputHour).toBe(19)

      wrapper.setProps({ format: '24hr' })
      wrapper.vm.onInput(8)
      expect(wrapper.vm.inputHour).toBe(8)

      wrapper.vm.selecting = SelectingTimes.Minute
      wrapper.vm.onInput(33)
      expect(wrapper.vm.inputHour).toBe(8)
      expect(wrapper.vm.inputMinute).toBe(33)
      expect(wrapper.vm.inputSecond).toBe(0)

      // with seconds
      wrapper.vm.selecting = SelectingTimes.Hour
      wrapper.setProps({ format: 'ampm' })
      wrapper.setProps({ value: '01:23:45pm' })
      wrapper.vm.onInput(7)
      expect(wrapper.vm.inputHour).toBe(19)

      wrapper.setProps({ format: '24hr' })
      wrapper.vm.onInput(8)
      expect(wrapper.vm.inputHour).toBe(8)

      wrapper.vm.selecting = SelectingTimes.Minute
      wrapper.vm.onInput(33)
      expect(wrapper.vm.inputHour).toBe(8)
      expect(wrapper.vm.inputMinute).toBe(33)
      expect(wrapper.vm.inputSecond).toBe(45)

      wrapper.vm.selecting = SelectingTimes.Second
      wrapper.vm.onInput(44)
      expect(wrapper.vm.inputHour).toBe(8)
      expect(wrapper.vm.inputMinute).toBe(33)
      expect(wrapper.vm.inputSecond).toBe(44)
    })

    it('should set properly input time' + useSecondsDesc, () => { // eslint-disable-line max-statements
      const wrapper = mountFunction({
        propsData: {
          format: '24hr',
          useSeconds: useSecondsValue,
        },
      })

      wrapper.vm.setInputData(new Date('2001-01-01 17:35'))
      expect(wrapper.vm.inputHour).toBe(17)
      expect(wrapper.vm.inputMinute).toBe(35)
      expect(wrapper.vm.inputSecond).toBe(0)

      wrapper.vm.setInputData(null)
      expect(wrapper.vm.inputHour).toBeNull()
      expect(wrapper.vm.inputMinute).toBeNull()
      expect(wrapper.vm.inputSecond).toBeNull()

      wrapper.vm.setInputData('')
      expect(wrapper.vm.inputHour).toBeNull()
      expect(wrapper.vm.inputMinute).toBeNull()
      expect(wrapper.vm.inputSecond).toBeNull()

      wrapper.vm.setInputData('12:34am')
      expect(wrapper.vm.inputHour).toBe(0)
      expect(wrapper.vm.inputMinute).toBe(34)
      expect(wrapper.vm.inputSecond).toBe(0)

      wrapper.vm.setInputData('12:34:28pm')
      expect(wrapper.vm.inputHour).toBe(12)
      expect(wrapper.vm.inputMinute).toBe(34)
      expect(wrapper.vm.inputSecond).toBe(28)

      wrapper.vm.setInputData('7:34am')
      expect(wrapper.vm.inputHour).toBe(7)

      wrapper.vm.setInputData('12:34pm')
      expect(wrapper.vm.inputHour).toBe(12)

      wrapper.vm.setInputData('7:34pm')
      expect(wrapper.vm.inputHour).toBe(19)
    })

    it('should update hour when changing period' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          value: '15:34',
          useSeconds: useSecondsValue,
        },
      })

      wrapper.vm.setPeriod('am')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.inputHour).toBe(3)
      wrapper.vm.setPeriod('pm')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.inputHour).toBe(15)

      // with seconds
      wrapper.setProps({ value: '15:34:14' })
      wrapper.vm.setPeriod('am')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.inputHour).toBe(3)
      wrapper.vm.setPeriod('pm')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.inputHour).toBe(15)
    })

    it('should change selecting when hour/minute/second is selected' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: '01:23pm',
          format: 'ampm',
          useSeconds: useSecondsValue,
        },
      })

      wrapper.vm.onChange(-1)
      expect(wrapper.vm.selecting).toBe(SelectingTimes.Minute)
      expect(wrapper.vm.selectingHour).toBe(false)
      expect(wrapper.vm.selectingMinute).toBe(true)
      expect(wrapper.vm.selectingSecond).toBe(false)
      wrapper.vm.onChange(-1)
      expect(wrapper.vm.selecting).toBe(useSecondsValue ? SelectingTimes.Second : SelectingTimes.Minute)
      expect(wrapper.vm.selectingHour).toBe(false)
      expect(wrapper.vm.selectingMinute).toBe(!useSecondsValue)
      expect(wrapper.vm.selectingSecond).toBe(useSecondsValue)
    })

    it('should emit click:XXX event on change' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: '01:23:45pm',
          format: 'ampm',
          useSeconds: useSecondsValue,
        },
      })

      const clickHour = jest.fn()
      const clickMinute = jest.fn()
      const clickSecond = jest.fn()

      wrapper.vm.$on('click:hour', clickHour)
      wrapper.vm.$on('click:minute', clickMinute)
      wrapper.vm.$on('click:second', clickSecond)

      wrapper.vm.onChange(1)
      expect(clickHour).toHaveBeenCalledTimes(1)
      expect(clickHour).toHaveBeenCalledWith(1)
      expect(clickMinute).toHaveBeenCalledTimes(0)
      expect(clickSecond).toHaveBeenCalledTimes(0)

      wrapper.vm.onChange(59)
      expect(clickHour).toHaveBeenCalledTimes(1)
      expect(clickMinute).toHaveBeenCalledTimes(1)
      expect(clickMinute).toHaveBeenCalledWith(59)
      expect(clickSecond).toHaveBeenCalledTimes(0)

      if (useSecondsValue) {
        wrapper.vm.onChange(45)
        expect(clickHour).toHaveBeenCalledTimes(1)
        expect(clickMinute).toHaveBeenCalledTimes(1)
        expect(clickSecond).toHaveBeenCalledTimes(1)
        expect(clickSecond).toHaveBeenCalledWith(45)
      }
    })

    it('should change selecting when clicked in title' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: '01:23pm',
          format: 'ampm',
          useSeconds: useSecondsValue,
        },
      })

      const title = wrapper.vm.$refs.title

      expect(wrapper.vm.selecting).toBe(SelectingTimes.Hour)
      expect(wrapper.vm.selectingHour).toBe(true)
      expect(wrapper.vm.selectingMinute).toBe(false)
      expect(wrapper.vm.selectingSecond).toBe(false)
      title.$emit('update:selecting', SelectingTimes.Minute)
      expect(wrapper.vm.selecting).toBe(SelectingTimes.Minute)
      expect(wrapper.vm.selectingHour).toBe(false)
      expect(wrapper.vm.selectingMinute).toBe(true)
      expect(wrapper.vm.selectingSecond).toBe(false)
      title.$emit('update:selecting', SelectingTimes.Second)
      expect(wrapper.vm.selecting).toBe(SelectingTimes.Second)
      expect(wrapper.vm.selectingHour).toBe(false)
      expect(wrapper.vm.selectingMinute).toBe(false)
      expect(wrapper.vm.selectingSecond).toBe(true)
    })

    it('should change period when clicked in title' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: '01:23pm',
          format: 'ampm',
          useSeconds: useSecondsValue,
        },
      })

      const title = wrapper.vm.$refs.title

      expect(wrapper.vm.period).toBe('pm')
      title.$emit('update:period', 'am')
      expect(wrapper.vm.period).toBe('am')
      title.$emit('update:period', 'pm')
      expect(wrapper.vm.period).toBe('pm')
    })

    it('should match snapshot with slot' + useSecondsDesc, async () => {
      const vm = new Vue()
      const slot = props => vm.$createElement('div', { class: 'scoped-slot' })
      const component = Vue.component('test', {
        render (h) {
          return h(VTimePicker, {
            props: {
              value: '10:12',
              useSeconds: useSecondsValue,
            },
            scopedSlots: {
              default: slot,
            },
          })
        },
      })

      const wrapper = mount(component)
      expect(wrapper.findAll('.v-picker__actions .scoped-slot').wrappers).toHaveLength(1)
    })

    it('should calculate allowed seconds/minute/hour callback' + useSecondsDesc, async () => { // eslint-disable-line max-statements
      const wrapper = mountFunction({
        propsData: {
          value: '10:00:00',
          allowedSeconds: value => value === 0 || (value >= 30 && value <= 40),
          allowedMinutes: value => value % 5 === 0,
          allowedHours: value => value !== 11,
          min: '9:31',
          max: '12:30',
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.vm.isAllowedHourCb(8)).toBe(false)
      expect(wrapper.vm.isAllowedHourCb(9)).toBe(true)
      expect(wrapper.vm.isAllowedHourCb(10)).toBe(true)
      expect(wrapper.vm.isAllowedHourCb(11)).toBe(false)
      expect(wrapper.vm.isAllowedHourCb(12)).toBe(true)
      expect(wrapper.vm.isAllowedHourCb(13)).toBe(false)

      wrapper.vm.inputHour = 8
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)

      wrapper.vm.inputHour = 9
      wrapper.vm.inputMinute = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(true)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 35
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(true)

      wrapper.vm.inputHour = 10
      wrapper.vm.inputMinute = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(true)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(true)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(true)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(true)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 35
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(true)

      wrapper.vm.inputHour = 11
      wrapper.vm.inputMinute = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 35
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)

      wrapper.vm.inputHour = 12
      wrapper.vm.inputMinute = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(true)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(true)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(0)).toBe(true)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 35
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
    })

    it('should calculate allowed seconds/minute/hour callback from array' + useSecondsDesc, async () => { // eslint-disable-line max-statements
      const allowedHours = [9, 10, 12]
      const allowedMinutes = [30, 35]
      const allowedSeconds = [0, 30]

      const wrapper = mountFunction({
        propsData: {
          value: '10:00:00',
          allowedSeconds,
          allowedMinutes,
          allowedHours,
          min: '9:31',
          max: '12:30',
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.vm.isAllowedHourCb(0)).toBe(false)
      expect(wrapper.vm.isAllowedHourCb(8)).toBe(false)
      expect(wrapper.vm.isAllowedHourCb(9)).toBe(true)
      expect(wrapper.vm.isAllowedHourCb(10)).toBe(true)
      expect(wrapper.vm.isAllowedHourCb(11)).toBe(false)
      expect(wrapper.vm.isAllowedHourCb(12)).toBe(true)
      expect(wrapper.vm.isAllowedHourCb(13)).toBe(false)

      wrapper.vm.inputHour = 8
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)

      wrapper.vm.inputHour = 9
      wrapper.vm.inputMinute = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(true)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 35
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(true)
      expect(wrapper.vm.isAllowedSecondCb(0)).toBe(true)

      wrapper.vm.inputHour = 10
      wrapper.vm.inputMinute = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(true)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(true)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(0)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(true)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 35
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(true)

      wrapper.vm.inputHour = 11
      wrapper.vm.inputMinute = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 35
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)

      wrapper.vm.inputHour = 12
      wrapper.vm.inputMinute = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(true)
      expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(0)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 30
      expect(wrapper.vm.isAllowedSecondCb(0)).toBe(true)
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 31
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
      wrapper.vm.inputMinute = 35
      expect(wrapper.vm.isAllowedSecondCb(29)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)

      wrapper.vm.inputHour = 0
      expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)
      expect(wrapper.vm.isAllowedMinuteCb(50)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(0)).toBe(false)
      expect(wrapper.vm.isAllowedSecondCb(30)).toBe(false)
    })

    it('should update inputSecond when called setInputData' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          useSeconds: useSecondsValue,
        },
      })
      const currentValue = jest.fn()
      wrapper.vm.$on('input', currentValue)
      wrapper.vm.emitValue()

      wrapper.vm.setInputData(useSecondsValue ? '01:23:45' : '01:23')
      expect(wrapper.vm.inputSecond).toBe(useSecondsValue ? 45 : 0)
      wrapper.vm.setInputData(null)
      expect(wrapper.vm.inputSecond).toBeNull()
    })

    it('should update when emit input' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          value: '01:23:45pm',
          format: 'ampm',
          useSeconds: useSecondsValue,
        },
      })
      const currentValue = jest.fn()
      wrapper.vm.$on('input', currentValue)
      wrapper.vm.emitValue()
      expect(currentValue).toHaveBeenCalledWith(useSecondsValue ? '13:23:45' : '13:23')
    })

    it('should update selecting when set selectingSecond/selectingMinute/selectingHour' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          useSeconds: useSecondsValue,
        },
      })
      wrapper.vm.selectingHour = true
      expect(wrapper.vm.selecting).toBe(SelectingTimes.Hour)
      expect(wrapper.vm.selectingMinute).toBe(false)
      expect(wrapper.vm.selectingSecond).toBe(false)

      wrapper.vm.selectingMinute = true
      expect(wrapper.vm.selecting).toBe(SelectingTimes.Minute)
      expect(wrapper.vm.selectingHour).toBe(false)
      expect(wrapper.vm.selectingSecond).toBe(false)

      wrapper.vm.selectingSecond = true
      expect(wrapper.vm.selecting).toBe(SelectingTimes.Second)
      expect(wrapper.vm.selectingHour).toBe(false)
      expect(wrapper.vm.selectingMinute).toBe(false)
    })
  })
})
