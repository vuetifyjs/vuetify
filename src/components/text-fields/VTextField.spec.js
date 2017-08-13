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

  it('should start out as invalid', () => {
    const wrapper = mount(VTextField, {})

    expect(wrapper.data().valid).toEqual(false)
  })

  it('should start validating on input', async () => {
    const wrapper = mount(VTextField, {})

    const input = wrapper.find('input')[0]
    expect(wrapper.data().shouldValidate).toEqual(false)
    wrapper.setProps({ value: 'asd' })
    await wrapper.vm.$nextTick()
    expect(wrapper.data().shouldValidate).toEqual(true)
  })

  it('should start validating on blur', async () => {
    const wrapper = mount(VTextField, {})

    const input = wrapper.find('input')[0]
    expect(wrapper.data().shouldValidate).toEqual(false)
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.data().shouldValidate).toEqual(true)
  })

  it('should not start validating on input if validate-on-blur prop is set', async () => {
    const wrapper = mount(VTextField, {
      propsData: {
        validateOnBlur: true
      }
    })

    const input = wrapper.find('input')[0]
    expect(wrapper.data().shouldValidate).toEqual(false)
    wrapper.setProps({ value: 'asd' })
    await wrapper.vm.$nextTick()
    expect(wrapper.data().shouldValidate).toEqual(false)
  })
})
