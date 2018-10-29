import VInput from '@/components/VInput'
import { test } from '@/test'

test('VInput.js', ({ mount }) => {
  it('should have hint', () => {
    const wrapper = mount(VInput, {
      propsData: {
        hint: 'foo'
      }
    })

    expect(wrapper.vm.hasHint).toBe(false)
    wrapper.setProps({ persistentHint: true })
    expect(wrapper.vm.hasHint).toBe(true)
    wrapper.setProps({ persistentHint: false })
    expect(wrapper.vm.hasHint).toBe(false)
    wrapper.setData({ isFocused: true })
    expect(wrapper.vm.hasHint).toBe(true)
  })

  it('should emit an input update', () => {
    const wrapper = mount(VInput)

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    expect(wrapper.vm.lazyValue).toBe(undefined)
    wrapper.vm.internalValue = 'foo'
    expect(input).toHaveBeenCalledWith('foo')
    expect(wrapper.vm.lazyValue).toBe('foo')
  })

  it('should generate append and prepend slots', () => {
    const el = slot => ({
      render: h => h('div', slot)
    })
    const wrapper = mount(VInput, {
      slots: { 'append': [el('append')] }
    })
    const wrapper2 = mount(VInput, {
      slots: { 'prepend': [el('prepend')] }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper2.html()).toMatchSnapshot()
  })

  it('should generate an icon and match snapshot', () => {
    const wrapper = mount(VInput, {
      propsData: {
        prependIcon: 'list'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      prependIcon: undefined,
      appendIcon: 'list'
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not generate input details', () => {
    const wrapper = mount(VInput, {
      propsData: {
        hideDetails: true
      }
    })

    expect(wrapper.vm.genMessages()).toBe(null)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should invoke callback', () => {
    const cb = jest.fn()
    const wrapper = mount(VInput, {
      propsData: {
        prependIcon: 'list',
        appendIcon: 'search'
      },
      listeners: {
        'click:prepend': cb,
        'click:append': cb
      }
    })

    const click = jest.fn()
    wrapper.vm.$on('click', click)
    wrapper.vm.$on('click:prepend', cb)
    wrapper.vm.$on('click:append', cb)

    const prepend = wrapper.find('.v-icon')[0]
    const append = wrapper.find('.v-icon')[1]
    const slot = wrapper.first('.v-input__slot')

    prepend.trigger('click')
    expect(cb.mock.calls.length).toBe(1)
    append.trigger('click')
    expect(cb.mock.calls.length).toBe(2)
    expect(click).not.toHaveBeenCalled()

    slot.trigger('click')
    expect(click).toBeCalled()
  })

  it('should accept a custom height', () => {
    const wrapper = mount(VInput)

    const inputWrapper = wrapper.first('.v-input__slot')
    expect(inputWrapper.element.style.height).toBe('')
    expect(wrapper.vm.height).toBe(undefined)

    wrapper.setProps({ height: 10 })
    expect(inputWrapper.element.style.height).toBe('10px')
    wrapper.setProps({ height: '20px' })
    expect(inputWrapper.element.style.height).toBe('20px')
  })

  it('should update lazyValue when value is updated', () => {
    const wrapper = mount(VInput, {
      propsData: {
        value: 'foo'
      }
    })

    expect(wrapper.vm.lazyValue).toBe('foo')

    wrapper.setProps({ value: 'bar' })

    expect(wrapper.vm.lazyValue).toBe('bar')
  })

  it('should call the correct event for different click locations', () => {
    const onClick = jest.fn()
    const onMouseDown = jest.fn()
    const onMouseUp = jest.fn()
    const wrapper = mount(VInput, {
      methods: {
        onClick,
        onMouseDown,
        onMouseUp
      }
    })

    const slot = wrapper.first('.v-input__slot')

    wrapper.trigger('click')
    wrapper.trigger('mousedown')
    wrapper.trigger('mouseup')
    slot.trigger('click')
    slot.trigger('mousedown')
    slot.trigger('mouseup')

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onMouseDown).toHaveBeenCalledTimes(1)
    expect(onMouseUp).toHaveBeenCalledTimes(1)
  })

  it('should be in an error state', async () => {
    const wrapper = mount(VInput, {
      propsData: { error: true }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ errorMessages: 'required', error: false })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be disabled', () => {
    const wrapper = mount(VInput)

    expect(wrapper.vm.isDisabled).toBe(false)

    wrapper.setProps({ disabled: true })

    expect(wrapper.vm.isDisabled).toBe(true)

    wrapper.setProps({
      disabled: undefined,
      readonly: true
    })

    expect(wrapper.vm.isDisabled).toBe(true)

    wrapper.setProps({ readonly: undefined })

    expect(wrapper.vm.isDisabled).toBe(false)
  })

  it('should render a label', () => {
    const wrapper = mount(VInput, {
      propsData: { label: 'foo' }
    })

    expect(wrapper.vm.hasLabel).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()

    const wrapper2 = mount(VInput, {
      slots: {
        label: [{ render: h => h('div', 'foo') }]
      }
    })

    expect(wrapper2.html()).toMatchSnapshot()
  })

  it('should apply theme to label, counter, messages and icons', () => {
    const wrapper = mount(VInput, {
      propsData: {
        label: 'foo',
        hint: 'bar',
        persistentHint: true,
        light: true,
        prependIcon: 'prepend',
        appendIcon: 'append'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
