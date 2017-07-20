import { mount } from 'avoriaz'
import VBtnToggle from 'src/components/buttons/VBtnToggle'
import VBtn from 'src/components/buttons/VBtn'
import VIcon from 'src/components/icons/VIcon'
import ripple from 'src/directives/ripple'

VBtnToggle.components = {
  VIcon,
  VBtn
}

VBtn.directives = {
  ripple
}

const TOGGLE_TEST = [
  { text: 'Left', value: 1 },
  { text: 'Center', value: 2 },
  { text: 'Right', value: 3 },
  { text: 'Justify', value: 4 }
]

describe('VBtnToggle.vue', () => {
  it('should not allow empty value when mandatory prop is used', () => {
    const wrapper = mount(VBtnToggle, {
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
    const wrapper = mount(VBtnToggle, {
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
    const wrapper = mount(VBtnToggle, {
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
    const wrapper = mount(VBtnToggle, {
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