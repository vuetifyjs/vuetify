import Vue from 'vue'
import { test } from '@/test'
import VTimePicker from '@/components/VTimePicker/VTimePicker'

test('VTimePicker.js', ({ mount }) => {
  it('should accept a value', async () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectingHour).toBe(true)
    expect(wrapper.vm.inputHour).toBe(9)
    expect(wrapper.vm.inputMinute).toBe(12)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render landscape component', async () => {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34',
        landscape: true
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without a title', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34',
        noTitle: true
      }
    })

    expect(wrapper.find('.v-picker__title')).toHaveLength(0)
  })

  it('should accept a date object for a value', async () => {
    const now = new Date('2017-01-01 12:00 AM')
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: now
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputHour).toBe(0)
    expect(wrapper.vm.inputMinute).toBe(0)
    expect(wrapper.vm.period).toBe('am')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change am/pm when updated from model', async () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '9:00am'
      }
    })

    await wrapper.vm.$nextTick()
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

  it('should render colored time picker', async () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render dark time picker', async () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        dark: true
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render colored time picker', async () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00',
        color: 'orange darken-1'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
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

    wrapper.vm.setInputData(new Date('2001-01-01 17:35'))
    expect(wrapper.vm.inputHour).toBe(17)
    expect(wrapper.vm.inputMinute).toBe(35)

    wrapper.vm.setInputData(null)
    expect(wrapper.vm.inputHour).toBe(null)
    expect(wrapper.vm.inputMinute).toBe(null)
    
    wrapper.vm.setInputData('')
    expect(wrapper.vm.inputHour).toBe(null)
    expect(wrapper.vm.inputMinute).toBe(null)

    wrapper.vm.setInputData('12:34am')
    expect(wrapper.vm.inputHour).toBe(0)
    expect(wrapper.vm.inputMinute).toBe(34)

    wrapper.vm.setInputData('7:34am')
    expect(wrapper.vm.inputHour).toBe(7)

    wrapper.vm.setInputData('12:34pm')
    expect(wrapper.vm.inputHour).toBe(12)

    wrapper.vm.setInputData('7:34pm')
    expect(wrapper.vm.inputHour).toBe(19)
  })

  it('should update hour when changing period', async () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '15:34'
      }
    })

    wrapper.vm.setPeriod('am')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputHour).toBe(3)
    wrapper.vm.setPeriod('pm')
    await wrapper.vm.$nextTick()
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
    expect(wrapper.vm.selectingHour).toBe(false)
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
      render (h) {
        return h(VTimePicker, {
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
    expect(wrapper.find('.v-picker__actions .scoped-slot')).toHaveLength(1)
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

    wrapper.vm.inputHour = 8
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)

    wrapper.vm.inputHour = 9
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(true)

    wrapper.vm.inputHour = 10
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(true)
    expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(true)

    wrapper.vm.inputHour = 11
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)

    wrapper.vm.inputHour = 12
    expect(wrapper.vm.isAllowedMinuteCb(30)).toBe(true)
    expect(wrapper.vm.isAllowedMinuteCb(31)).toBe(false)
    expect(wrapper.vm.isAllowedMinuteCb(35)).toBe(false)
  })
})
