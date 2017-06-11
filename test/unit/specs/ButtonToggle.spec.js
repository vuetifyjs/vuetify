import { mount } from 'avoriaz'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue/dist/vue.common'
import ButtonToggle from 'src/components/buttons/ButtonToggle'
import Button from 'src/components/buttons/Button'
import Icon from 'src/components/icons/Icon'
import ripple from 'src/directives/ripple'

ButtonToggle.components = {
  'v-icon': Icon,
  'v-btn': Button
}

Button.directives = {
  ripple
}

const toggle_text = [
  { text: 'Left', value: 1 },
  { text: 'Center', value: 2 },
  { text: 'Right', value: 3 },
  { text: 'Justify', value: 4 },
]

describe('ButtonToggle.vue', () => {
  it('should not allow empty value when mandatory prop is used', () => {
    const wrapper = mount(ButtonToggle, {
      propsData: {
        value: 1,
        options: toggle_text,
        mandatory: true
      }
    })

    const input = jest.fn()
    wrapper.instance().$on('input', input)

    wrapper.instance().updateValue(toggle_text[0])

    expect(input).not.toBeCalled()
  })

  it('should allow new value when mandatory prop is used', () => {
    const wrapper = mount(ButtonToggle, {
      propsData: {
        value: 1,
        options: toggle_text,
        mandatory: true
      }
    })

    const input = jest.fn()
    wrapper.instance().$on('input', input)

    wrapper.instance().updateValue(toggle_text[1])

    expect(input).toBeCalledWith(2)
  })

  it('should not allow empty value when mandatory prop is used with multiple prop', () => {
    const wrapper = mount(ButtonToggle, {
      propsData: {
        value: [1],
        options: toggle_text,
        mandatory: true,
        multiple: true
      }
    })

    const input = jest.fn()
    wrapper.instance().$on('input', input)

    wrapper.instance().updateValue(toggle_text[0])

    expect(input).toBeCalledWith([1])
  })

  it('should allow new value when mandatory prop is used with multiple prop', () => {
    const wrapper = mount(ButtonToggle, {
      propsData: {
        value: [1],
        options: toggle_text,
        mandatory: true,
        multiple: true
      }
    })

    const input = jest.fn()
    wrapper.instance().$on('input', input)

    wrapper.instance().updateValue(toggle_text[1])

    expect(input).toBeCalledWith([1, 2])
  })
})
