import { mount } from 'avoriaz'
import { test } from '~util/testing'
import VTextField from '~components/text-fields/VTextField'

test('VTextField.js', () => {
  it('should pass events to internal input field', () => {
    const keyup = jest.fn()
    const component = {
      render (h) {
        return h(VTextField, { on: { keyUp: keyup }, props: { download: '' } })
      }
    }
    const wrapper = mount(component)

    const input = wrapper.find('input')[0]
    input.trigger('keyUp', { keyCode: 65 })

    expect(keyup).toBeCalled()
  })

  it('should only emit change on blur if value changed', async () => {
    const change = jest.fn()
    const wrapper = mount(VTextField, {
      propsData: { value: null },
    })

    wrapper.instance().$on('change', change)
    wrapper.instance().focus()
    await wrapper.instance().$nextTick()
    wrapper.instance().blur()

    expect(change).not.toBeCalled()
  })
})
