import { mount } from 'avoriaz'
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

const TOGGLE_TEST = [
  { text: 'Left', value: 1 },
  { text: 'Center', value: 2 },
  { text: 'Right', value: 3 },
  { text: 'Justify', value: 4 }
]

describe('ButtonToggle.vue', () => {
  it('should not allow empty value when mandatory prop is used', () => {
    const wrapper = mount(ButtonToggle, {
      propsData: {
        inputValue: 1,
        items: TOGGLE_TEST,
        mandatory: true
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(TOGGLE_TEST[0])

    expect(change).not.toBeCalled()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow new value when mandatory prop is used', () => {
    const wrapper = mount(ButtonToggle, {
      propsData: {
        inputValue: 1,
        items: TOGGLE_TEST,
        mandatory: true
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(TOGGLE_TEST[1])

    expect(change).toBeCalledWith(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not allow empty value when mandatory prop is used with multiple prop', () => {
    const wrapper = mount(ButtonToggle, {
      propsData: {
        inputValue: [1],
        items: TOGGLE_TEST,
        mandatory: true,
        multiple: true
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(TOGGLE_TEST[0])

    expect(change).toBeCalledWith([1])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow new value when mandatory prop is used with multiple prop', () => {
    const wrapper = mount(ButtonToggle, {
      propsData: {
        inputValue: [1],
        items: TOGGLE_TEST,
        mandatory: true,
        multiple: true
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)

    wrapper.instance().updateValue(TOGGLE_TEST[1])

    expect(change).toBeCalledWith([1, 2])
    expect(wrapper.html()).toMatchSnapshot()
  })
})
