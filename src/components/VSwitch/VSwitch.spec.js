import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VSwitch from '~components/VSwitch'

test('VSwitch.js', () => {
  it('should set ripple data attribute based on ripple prop state', () => {
    const wrapper = mount(VSwitch, {
      propsData: {
        inputValue: false,
        ripple: false
      }
    })

    const ripple = wrapper.find('.input-group--selection-controls__ripple')[0]

    expect(ripple.getAttribute('data-ripple')).toBe('false')

    wrapper.setProps({ ripple: true })

    expect(ripple.getAttribute('data-ripple')).toBe('true')
  })
})
