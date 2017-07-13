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

  it('should convert current time to 24hr', () => {
    const wrapper = mount(TimePicker, {
      propsData: {
        value: new Date()
      }
    })
    const now = new Date()
    let hour = now.getHours()
    let period = 'am'
    const minutes = now.getMinutes()
    if (hour > 12) {
      hour -= 12
      period = 'pm'
    }

    expect(wrapper.vm.inputTime).toBe(`${hour}:${minutes}${period}`)
  })
})
