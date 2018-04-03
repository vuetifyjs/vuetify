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
      slots: { 'prepend-icon': [el('prepend-icon')] }
    })
    const wrapper2 = mount(VInput, {
      slots: { 'append-icon': [el('append-icon')] }
    })
    const wrapper3 = mount(VInput, {
      slots: { 'prepend': [el('prepend')] }
    })
    const wrapper4 = mount(VInput, {
      slots: { 'append': [el('append')] }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper2.html()).toMatchSnapshot()
    expect(wrapper3.html()).toMatchSnapshot()
    expect(wrapper4.html()).toMatchSnapshot()
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

  it('should emit a click event', () => {
    const wrapper = mount(VInput)

    const click = jest.fn()
    wrapper.vm.$on('click', click)

    wrapper.trigger('click')
    expect(click).toHaveBeenCalled()
  })

  it('should invoke callback', () => {
    const cb = jest.fn()
    const wrapper = mount(VInput, {
      propsData: {
        prependIcon: 'list',
        prependIconCb: cb,
        appendIcon: 'search',
        appendIconCb: cb
      }
    })

    const click = jest.fn()
    wrapper.vm.$on('click', click)

    const prepend = wrapper.find('.icon')[0]
    const append = wrapper.find('.icon')[1]

    prepend.trigger('click')
    expect(cb.mock.calls.length).toBe(1)
    append.trigger('click')
    expect(cb.mock.calls.length).toBe(2)
    expect(click).not.toHaveBeenCalled()
  })

  it('should accept a custom height', () => {
    const wrapper = mount(VInput)

    const inputWrapper = wrapper.find('.v-input__slot')[0]
    expect(inputWrapper.element.style.height).toBe('32px')
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
})
