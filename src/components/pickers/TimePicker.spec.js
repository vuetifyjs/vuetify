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
  })

  it('should accept a date object for a value', () => {
    const now = new Date()
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
  })

  it('should change am/pm when updated from model', () => {
    let value = '9:00am'
    const wrapper = mount(TimePicker, {
      propsData: {
        value: value
      }
    })
    
    wrapper.setProps({ value: '9:00pm' })

    expect(wrapper.data().period).toBe('pm')
  })
})
