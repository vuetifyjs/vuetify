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
    expect(change).toHaveBeenCalledTimes(1)
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

  it('should toggle on keypress', async () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    const input = wrapper.first('input')

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.trigger('change')
    await wrapper.vm.$nextTick()
    input.trigger('change')

    expect(change.mock.calls).toEqual([[true], [false]])
  })

  it('should enable ripple', () => {
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

    expect(wrapper.contains('.v-input--selection-controls__ripple')).toBe(true)
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

  it('should return a value when toggled on with a specified object value', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: {x: 1, y: 2},
        inputValue: null
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith({x: 1, y: 2})
  })

  it('should return a value when toggled on with a specified array value', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: [1, "2", {x: 1, y: 2}],
        inputValue: null
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith([1, "2", {x: 1, y: 2}])
  })

  it('should push value to array when toggled on and is multiple', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: 'John',
        inputValue: []
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith(['John'])
  })

  it('should push array value to array when toggled on and is multiple', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: [1, 2, {x: 1, y: 2}],
        inputValue: ['Existing']
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith(['Existing', [1, 2, {x: 1, y: 2}]])
  })

  it('should return null when toggled off with a specified array value', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        multiple: false, // must use multiple flag for array values
        value: ['John'],
        inputValue: ['John']
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith(null)
  })

  it('should remove value(s) from array when toggled off and multiple', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: 1,
        inputValue: [1, 2, 1, 3]
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith([2, 3])
  })

  it('should remove value(s) from array when toggled off and multiple - with objects', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        value: {a: 1},
        inputValue: [{a: 1}, {b: 1}, {a: 1}, {c: 1}]
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith([{b: 1}, {c: 1}])
  })

  it('should work with custom true- and false-value', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        trueValue: 'on',
        falseValue: 'off',
        inputValue: null
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toBeCalledWith('on')

    ripple.trigger('click')
    expect(change).toBeCalledWith('off')

    expect(change).toHaveBeenCalledTimes(2)
  })

  // https://github.com/vuetifyjs/vuetify/issues/2119
  it('should put id on internal input', () => {
    const wrapper = mount(VCheckbox, {
      propsData: { id: 'foo' }
    })

    const input = wrapper.first('input')
    expect(input.element.id).toBe('foo')
  })

  it('should use custom icons', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        indeterminateIcon: 'fizzbuzz',
        onIcon: 'foo',
        offIcon: 'bar',
        indeterminate: true,
        value: 'fizz'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setData({ value: 'fizz'})
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setData({ value: 'buzz'})
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render themed component', () => {
    const wrapper = mount(VCheckbox, {
      propsData: {
        light: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be disabled', () => {
    const wrapper = mount(VCheckbox, {
      propsData: { disabled: true }
    })
    const input = wrapper.first('input')

    expect(input.html()).toMatchSnapshot()
  })
})
