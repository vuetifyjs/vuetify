import { mount } from 'avoriaz'
import { test } from '~util/testing'
import { createRenderer } from 'vue-server-renderer'
import TextField from '~components/text-fields/TextField'
import ripple from '~directives/ripple'

test('TextField.js', () => {
  it('should pass events to internal input field', () => {
    const keyup = jest.fn()
    const component = {
      render (h) {
        return h(TextField, { on: { keyUp: keyup }, props: { download: '' } })
      }
    }
    const wrapper = mount(component)

    const input = wrapper.find('input')[0]
    input.trigger('keyUp', { keyCode: 65 })

    expect(keyup).toBeCalled()
  })
})
