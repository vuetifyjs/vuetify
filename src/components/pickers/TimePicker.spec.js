import Card from '~components/cards/Card'
import Transitions from '~components/transitions/_index'
import TimePicker from '~components/pickers/TimePicker'
import { test } from '~util/testing'

TimePicker.components = {
  'v-card': Card,
  'v-fade-transition': Transitions.FadeTransition
}

test('TimePicker.js', ({ mount }) => {
  it('should accept a value', () => {
    const wrapper = mount(TimePicker, {
      propsData: {
        value: '09:00:00'
      }
    })

    expect(wrapper.vm.inputTime).toBe('09:00:00')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should accept a date object for a value', () => {
    const now = new Date(2017, 7, 1, 0, 0, 0, 0)
    const wrapper = mount(TimePicker, {
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
    const wrapper = mount(TimePicker, {
      propsData: {
        value: '9:00am'
      }
    })

    wrapper.setProps({ value: '9:00pm' })

    expect(wrapper.data().period).toBe('pm')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
