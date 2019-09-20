import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import VCheckbox from '../VCheckbox'

describe('VCheckbox.ts', () => { // eslint-disable-line max-statements
  type Instance = InstanceType<typeof VCheckbox>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCheckbox, options)
    }
  })

  it('should return true when clicked', () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
      },
    })

    const input = wrapper.find('input')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    input.trigger('click')
    expect(change).toHaveBeenCalledTimes(1)
    expect(change).toHaveBeenCalledWith(true)
  })

  it('should return a value when toggled on with a specified value', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'John',
        inputValue: null,
      },
    })

    const input = wrapper.find('input')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    input.trigger('click')
    expect(change).toHaveBeenCalledWith('John')
  })

  it('should return null when toggled off with a specified value', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'John',
        inputValue: 'John',
      },
    })

    const ripple = wrapper.find('input')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith(null)
  })

  it('should toggle when label is clicked', () => {
    const wrapper = mountFunction({
      propsData: {
        label: 'Label',
        value: null,
      },
      attrs: {},
    })

    const label = wrapper.find('label')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    label.trigger('click')
    expect(change).toHaveBeenCalled()
  })

  it('should render role and aria-checked attributes on input group', async () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
      },
    })

    const input = wrapper.find('input')

    expect(input.element.getAttribute('role')).toBe('checkbox')
    expect(input.element.getAttribute('aria-checked')).toBe('false')

    wrapper.setProps({ inputValue: true })
    expect(input.element.getAttribute('aria-checked')).toBe('true')

    wrapper.setProps({ indeterminate: true })
    await wrapper.vm.$nextTick()
    expect(input.element.getAttribute('aria-checked')).toBe('mixed')
  })

  it('should toggle on keypress', async () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    const input = wrapper.find('input')

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.trigger('change')
    await wrapper.vm.$nextTick()
    input.trigger('change')

    expect(change.mock.calls).toEqual([[true], [false]])
  })

  it('should enable ripple', () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
        disabled: false,
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    expect((ripple.element as any)._ripple.enabled).toBeTruthy()
    expect((ripple.element as any)._ripple.centered).toBeTruthy()

    wrapper.setProps({ disabled: true })

    expect(wrapper.contains('.v-input--selection-controls__ripple')).toBeTruthy()
  })

  it('should not render ripple when ripple prop is false', () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: false,
        ripple: false,
      },
    })

    const ripple = wrapper.findAll('.v-input--selection-controls__ripple')

    expect(ripple.wrappers).toHaveLength(0)
  })

  it('should render ripple when ripple prop is true', () => {
    const wrapper = mountFunction({
      propsData: {
        ripple: true,
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    expect((ripple.element as any)._ripple.enabled).toBeTruthy()
    expect((ripple.element as any)._ripple.centered).toBeTruthy()
  })

  it('should return a value when toggled on with a specified object value', () => {
    const wrapper = mountFunction({
      propsData: {
        value: { x: 1, y: 2 },
        inputValue: null,
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith({ x: 1, y: 2 })
  })

  it('should return a value when toggled on with a specified array value', () => {
    const wrapper = mountFunction({
      propsData: {
        value: [1, '2', { x: 1, y: 2 }],
        inputValue: null,
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith([1, '2', { x: 1, y: 2 }])
  })

  it('should push value to array when toggled on and is multiple', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'John',
        inputValue: [],
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith(['John'])
  })

  it('should push array value to array when toggled on and is multiple', () => {
    const wrapper = mountFunction({
      propsData: {
        value: [1, 2, { x: 1, y: 2 }],
        inputValue: ['Existing'],
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith(['Existing', [1, 2, { x: 1, y: 2 }]])
  })

  it('should return null when toggled off with a specified array value', () => {
    const wrapper = mountFunction({
      propsData: {
        multiple: false, // must use multiple flag for array values
        value: ['John'],
        inputValue: ['John'],
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith(null)
  })

  it('should remove value(s) from array when toggled off and multiple', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 1,
        inputValue: [1, 2, 1, 3],
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith([2, 3])
  })

  it('should remove value(s) from array when toggled off and multiple - with objects', () => {
    const wrapper = mountFunction({
      propsData: {
        value: { a: 1 },
        inputValue: [{ a: 1 }, { b: 1 }, { a: 1 }, { c: 1 }],
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith([{ b: 1 }, { c: 1 }])
  })

  it('should work with custom true- and false-value', () => {
    const wrapper = mountFunction({
      propsData: {
        trueValue: 'on',
        falseValue: 'off',
        inputValue: null,
      },
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith('on')

    ripple.trigger('click')
    expect(change).toHaveBeenCalledWith('off')

    expect(change).toHaveBeenCalledTimes(2)
  })

  // https://github.com/vuetifyjs/vuetify/issues/2119
  it('should put id on internal input', () => {
    const wrapper = mountFunction({
      propsData: { id: 'foo' },
    })

    const input = wrapper.find('input')
    expect(input.element.id).toBe('foo')
  })

  it('should use custom icons', () => {
    const wrapper = mountFunction({
      propsData: {
        indeterminateIcon: 'fizzbuzz',
        onIcon: 'foo',
        offIcon: 'bar',
        indeterminate: true,
        value: 'fizz',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setProps({ inputValue: true })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setProps({ inputValue: false })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render themed component', () => {
    const wrapper = mountFunction({
      propsData: {
        light: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be disabled', () => {
    const wrapper = mountFunction({
      propsData: { disabled: true },
    })
    const input = wrapper.find('input')

    expect(input.html()).toMatchSnapshot()
  })
})
