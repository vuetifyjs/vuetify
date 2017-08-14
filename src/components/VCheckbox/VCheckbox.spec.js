import { test } from '~util/testing'
import VCheckbox from '~components/VCheckbox'

test('VCheckbox.js', ({ mount }) => {
  it('should return true when clicked', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)
    wrapper.find('.input-group--selection-controls__ripple')[0].trigger('click')

    expect(change).toBeCalledWith(true)
  })

  it('should return a value when clicked with a specified value', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: 'John',
        inputValue: null
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)
    wrapper.find('.input-group--selection-controls__ripple')[0].trigger('click')

    expect(change).toBeCalledWith('John')
  })

  it('should return null when clicked with a specified value', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: 'John',
        inputValue: 'John'
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)
    wrapper.find('.input-group--selection-controls__ripple')[0].trigger('click')

    expect(change).toBeCalledWith(null)
  })

  it('should toggle when label is clicked', () => {
    const change = jest.fn()
    const wrapper = mount(VCheckbox, {
      propsData: {
        label: 'Label',
        value: null
      },
      attrs: {}
    })

    const label = wrapper.find('label')[0]
    wrapper.instance().$on('change', change)
    label.trigger('click')

    expect(change).toBeCalled()
    expect('$attrs is readonly').toHaveBeenWarned()
  })

  it('should render role and aria-checked attributes on input group', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    })

    let inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.hasAttribute('role', 'checkbox')).toBe(true)
    expect(inputGroup.hasAttribute('aria-checked', 'false')).toBe(true)

    wrapper.setProps({ 'inputValue': true })
    inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.hasAttribute('aria-checked', 'true')).toBe(true)

    wrapper.setProps({ 'indeterminate': true })
    inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.hasAttribute('aria-checked', 'mixed')).toBe(true)
  })

  it('should render aria-label attribute with label value on input group', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    })

    const inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.hasAttribute('aria-label', 'Test')).toBe(true)
    expect(`$attrs is readonly`).toHaveBeenWarned()
  })

  it('should not render aria-label attribute with no label value on input group', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        label: null
      }
    })

    const inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
  })
})
