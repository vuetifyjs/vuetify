import Vue from 'vue'
import { test } from '@util/testing'
import VTimePicker from '@components/VTimePicker'
import VMenu from '@components/VMenu'

test('VTimePicker.js', ({ mount }) => {
  it('should accept a value', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34'
      }
    })

    expect(wrapper.vm.selectingHour).toBe(true)
    expect(wrapper.vm.inputHour).toBe(9)
    expect(wrapper.vm.inputMinute).toBe(12)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render landscape component', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34',
        landscape: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without a title', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34',
        noTitle: true
      }
    })

    expect(wrapper.find('.picker__title')).toHaveLength(0)
  })

  it('should accept a date object for a value', () => {
    const now = new Date('2017-01-01 12:00 AM')
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: now
      }
    })

    expect(wrapper.vm.inputHour).toBe(0)
    expect(wrapper.vm.inputMinute).toBe(0)
    expect(wrapper.vm.period).toBe('am')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change am/pm when updated from model', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '9:00am'
      }
    })

    wrapper.setProps({ value: '9:00pm' })

    expect(wrapper.vm.period).toBe('pm')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set picker to pm when given Date after noon', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: new Date('2017-01-01 12:00 PM')
      }
    })

    expect(wrapper.vm.period).toBe('pm')
  })

  it('should set picker to pm when given string with PM in it', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '1:00 PM'
      }
    })

    expect(wrapper.vm.period).toBe('pm')
  })

  it('should set picker to pm when given string with pm in it', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '1:00 pm'
      }
    })

    expect(wrapper.vm.period).toBe('pm')
  })

  it('should set picker to am when given Date before noon', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: new Date('2017-01-01 1:00 AM')
      }
    })

    expect(wrapper.vm.period).toBe('am')
  })

  it('should render colored time picker', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render colored time picker', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00',
        color: 'orange darken-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set input hour when setting hour', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '12:34'
      }
    })

    wrapper.vm.hour = 15
    expect(wrapper.vm.inputHour).toBe(15)
  })

  it('should set input minute when setting minute', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '12:34'
      }
    })

    wrapper.vm.minute = 15
    expect(wrapper.vm.inputMinute).toBe(15)
  })

  it('should set input hour when setting hour in 12hr mode', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '01:23pm',
        format: 'ampm'
      }
    })

    const clock = wrapper.vm.$refs.clock

    clock.$emit('input', 7)
    expect(wrapper.vm.inputHour).toBe(19)

    wrapper.setProps({ format: '24hr' })
    clock.$emit('input', 8)
    expect(wrapper.vm.inputHour).toBe(8)

    wrapper.vm.selectingHour = false
    clock.$emit('input', 33)
    expect(wrapper.vm.inputHour).toBe(8)
    expect(wrapper.vm.inputMinute).toBe(33)
  })

  it('should set properly input time', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        format: '24hr'
      }
    })

    expect(wrapper.vm.getInputTime('12:34am')).toEqual({ inputHour: 0, inputMinute: 34 })
    expect(wrapper.vm.getInputTime('7:34am').inputHour).toBe(7)
    expect(wrapper.vm.getInputTime('12:34pm').inputHour).toBe(12)
    expect(wrapper.vm.getInputTime('7:34pm').inputHour).toBe(19)
  })

  it('should update hour when changing period', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '15:34'
      }
    })

    wrapper.vm.period = 'am'
    expect(wrapper.vm.inputHour).toBe(3)
    wrapper.vm.period = 'pm'
    expect(wrapper.vm.inputHour).toBe(15)
  })

  it('should change selectingHour when hour/minute is selected', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '01:23pm',
        format: 'ampm'
      }
    })

    const clock = wrapper.vm.$refs.clock

    clock.$emit('change')
    expect(wrapper.vm.selectingHour).toBe(false)
    clock.$emit('change')
    expect(wrapper.vm.selectingHour).toBe(true)
  })

  it('should change selectingHour when clicked in title', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '01:23pm',
        format: 'ampm'
      }
    })

    const title = wrapper.vm.$refs.title

    expect(wrapper.vm.selectingHour).toBe(true)
    title.$emit('update:selectingHour', false)
    expect(wrapper.vm.selectingHour).toBe(false)
    title.$emit('update:selectingHour', true)
    expect(wrapper.vm.selectingHour).toBe(true)
  })

  it('should change period when clicked in title', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '01:23pm',
        format: 'ampm'
      }
    })

    const title = wrapper.vm.$refs.title

    expect(wrapper.vm.period).toBe('pm')
    title.$emit('update:period', 'am')
    expect(wrapper.vm.period).toBe('am')
    title.$emit('update:period', 'pm')
    expect(wrapper.vm.period).toBe('pm')
  })

  it('should match snapshot with slot', async () => {
    const vm = new Vue()
    const slot = props => vm.$createElement('div', { class: 'scoped-slot' })
    const component = Vue.component('test', {
      components: {
        VTimePicker
      },
      render (h) {
        return h('v-time-picker', {
          props: {
            value: '10:12'
          },
          scopedSlots: {
            default: slot
          }
        })
      }
    })

    const wrapper = mount(component)
    expect(wrapper.find('.picker__actions .scoped-slot')).toHaveLength(1)
  })

  it('should calculate allowed minute/hour callback', async () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '10:00',
        allowedMinutes: value => value % 5 === 0,
        allowedHours: value => value !== 11,
        min: '9:31',
        max: '12:30'
      }
    })

    expect(wrapper.vm.isAllowedHourCb(8)).toBe(false)
    expect(wrapper.vm.isAllowedHourCb(9)).toBe(true)
    expect(wrapper.vm.isAllowedHourCb(10)).toBe(true)
    expect(wrapper.vm.isAllowedHourCb(11)).toBe(false)
    expect(wrapper.vm.isAllowedHourCb(12)).toBe(true)
    expect(wrapper.vm.isAllowedHourCb(13)).toBe(false)

    wrapper.vm.hour = 8
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)

    wrapper.vm.hour = 9
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(true)

    wrapper.vm.hour = 10
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(true)
    expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(true)

    wrapper.vm.hour = 11
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)

    wrapper.vm.hour = 12
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(true)
    expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)
  })
})
