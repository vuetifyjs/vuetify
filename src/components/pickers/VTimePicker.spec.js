import VCard from '~components/cards/VCard'
import { VFadeTransition } from '~components/transitions'
import VTimePicker from '~components/pickers/VTimePicker'
import { test } from '~util/testing'

VTimePicker.components = {
  VCard,
  VFadeTransition
}

test('VTimePicker.js', ({ mount }) => {
  it('should accept a value', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00'
      }
    })

    expect(wrapper.vm.inputTime).toBe('09:00:00')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should accept a date object for a value', () => {
    const now = new Date(2017, 7, 1, 0, 0, 0, 0)
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: now
      }
    })
    let hour = now.getHours()
    let period = 'am'
    const minutes = now.getMinutes()
    if (hour > 12) {
      hour -= 12
      period = 'pm'
    }

    expect(wrapper.vm.inputTime).toBe(`${hour}:${minutes}${period}`)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change am/pm when updated from model', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        value: '9:00am'
      }
    })

    wrapper.setProps({ value: '9:00pm' })

    expect(wrapper.data().period).toBe('pm')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not change period with 24hr prop', () => {
    const wrapper = mount(VTimePicker, {
      propsData: {
        format: '24hr',
        value: null
      }
    })

    const ampm = wrapper.instance().inputTime.match(/(am|pm)/)

    expect(ampm).toBe(null)
  })
})
