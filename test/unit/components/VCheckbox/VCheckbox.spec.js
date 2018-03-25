import { test } from '@/test'
import VCheckbox from '@/components/VCheckbox'

test('VCheckbox.js', ({ mount }) => {
  it('should return true when clicked', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    })

    const input = wrapper.first('input')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    input.trigger('click')
    expect(change).toBeCalledWith(true)
  })

  it('should return a value when toggled on with a specified value', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: 'John',
        inputValue: null
      }
    })

    const input = wrapper.first('input')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    input.trigger('click')
    expect(change).toBeCalledWith('John')
  })

  it('should return null when toggled off with a specified value', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: 'John',
        inputValue: 'John'
      }
    })

    const ripple = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith(null)
  })

  it('should toggle when label is clicked', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        label: 'Label',
        value: null
      },
      attrs: {}
    })

    const label = wrapper.find('label')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    label.trigger('click')
    expect(change).toBeCalled()
  })

  it('should render role and aria-checked attributes on input group', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    })

    const input = wrapper.first('input')

    expect(input.getAttribute('role')).toBe('checkbox')
    expect(input.getAttribute('aria-checked')).toBe('false')

    wrapper.setProps({ 'inputValue': true })
    expect(input.getAttribute('aria-checked')).toBe('true')

    wrapper.setProps({ 'indeterminate': true })
    expect(input.getAttribute('aria-checked')).toBe('mixed')
  })

  it('should render aria-label attribute with label value on input group', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    })

    const inputGroup = wrapper.first('input')
    expect(inputGroup.getAttribute('aria-label')).toBe('Test')
  })

  it('should not render aria-label attribute with no label value on input group', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        label: null
      }
    })

    const inputGroup = wrapper.first('input')
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
  })

  it('should toggle on space and enter with default toggleKeys', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    const input = wrapper.first('input')

    input.trigger('keydown.enter')
    input.trigger('keydown.space')

    expect(change.mock.calls).toHaveLength(2)
  })

  it('should not toggle on space or enter with blank toggleKeys', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        toggleKeys: []
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.trigger('keydown.enter')
    wrapper.trigger('keydown.space')

    expect(change).not.toBeCalled()
  })

  it('should toggle only on custom toggleKeys', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        toggleKeys: [32] // space
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    const input = wrapper.first('input')

    input.trigger('keydown.enter')
    expect(change).not.toBeCalled()

    input.trigger('keydown.space')
    expect(change).toBeCalled()
  })

  it('should enable ripple based on disabled state', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        disabled: false
      }
    })

    const ripple = wrapper.first('.v-input--selection-controls__ripple')

    expect(ripple.element._ripple.enabled).toBe(true)
    expect(ripple.element._ripple.centered).toBe(true)

    wrapper.setProps({ disabled: true })

    expect(ripple.element._ripple.enabled).toBe(false)
  })

  it('should set ripple centered property when enabled', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        disabled: true
      }
    })

    const ripple = wrapper.first('.v-input--selection-controls__ripple')

    expect(ripple.element._ripple.enabled).toBe(false)

    wrapper.setProps({ disabled: false })

    expect(ripple.element._ripple.enabled).toBe(true)
    expect(ripple.element._ripple.centered).toBe(true)
  })

  it('should not render ripple when ripple prop is false', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        ripple: false
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    expect(ripple).toHaveLength(0)
  })

  it('should render ripple when ripple prop is true', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        ripple: true
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    expect(ripple.element._ripple.enabled).toBe(true)
    expect(ripple.element._ripple.centered).toBe(true)
  })
})
