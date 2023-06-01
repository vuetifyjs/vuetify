import VInput from '../VInput'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VInput.ts', () => {
  type Instance = InstanceType<typeof VInput>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VInput, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            lang: {
              t: (val: string) => val,
            },
          },
        },
        ...options,
      })
    }
  })

  it('should have hint', () => {
    const wrapper = mountFunction({
      propsData: {
        hint: 'foo',
      },
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
    const wrapper = mountFunction()

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    expect(wrapper.vm.lazyValue).toBeUndefined()
    wrapper.vm.internalValue = 'foo'
    expect(input).toHaveBeenCalledWith('foo')
    expect(wrapper.vm.lazyValue).toBe('foo')
  })

  it('should generate append and prepend slots', () => {
    const el = slot => ({
      render: h => h('div', slot),
    })
    const wrapper = mountFunction({
      slots: { append: [el('append')] },
    })
    const wrapper2 = mountFunction({
      slots: { prepend: [el('prepend')] },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper2.html()).toMatchSnapshot()
  })

  it('should generate an icon and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        prependIcon: 'list',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      prependIcon: undefined,
      appendIcon: 'list',
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not generate input details', () => {
    const wrapper = mountFunction({
      propsData: {
        hideDetails: true,
      },
    })

    expect(wrapper.vm.genMessages()).toBeNull()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should invoke callback', () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        prependIcon: 'list',
        appendIcon: 'search',
      },
      listeners: {
        'click:prepend': cb,
        'click:append': cb,
      },
    })

    const click = jest.fn()
    wrapper.vm.$on('click', click)

    const prepend = wrapper.findAll('.v-icon').at(0)
    const append = wrapper.findAll('.v-icon').at(1)
    const slot = wrapper.find('.v-input__slot')

    prepend.trigger('click')
    expect(cb).toHaveBeenCalledTimes(1)
    append.trigger('click')
    expect(cb).toHaveBeenCalledTimes(2)
    expect(click).not.toHaveBeenCalled()

    slot.trigger('click')
    expect(click).toHaveBeenCalled()
  })

  it('should accept a custom height', async () => {
    const wrapper = mountFunction()

    const inputWrapper = wrapper.find('.v-input__slot')
    expect(inputWrapper.element.style.height).toBe('')
    expect(wrapper.vm.height).toBeUndefined()

    wrapper.setProps({ height: 10 })
    await wrapper.vm.$nextTick()
    expect(inputWrapper.element.style.height).toBe('10px')
    wrapper.setProps({ height: '20px' })
    await wrapper.vm.$nextTick()
    expect(inputWrapper.element.style.height).toBe('20px')
  })

  it('should update lazyValue when value is updated', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'foo',
      },
    })

    expect(wrapper.vm.lazyValue).toBe('foo')

    wrapper.setProps({ value: 'bar' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.lazyValue).toBe('bar')
  })

  it('should call the correct event for different click locations', () => {
    const onClick = jest.fn()
    const onMouseDown = jest.fn()
    const onMouseUp = jest.fn()
    const wrapper = mountFunction({
      methods: {
        onClick,
        onMouseDown,
        onMouseUp,
      },
    })

    const slot = wrapper.find('.v-input__slot')

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
    const wrapper = mountFunction({
      propsData: { error: true },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ errorMessages: 'required', error: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should hide messages if no messages and hide-details is auto', () => {
    const wrapper = mountFunction({
      propsData: {
        hideDetails: 'auto',
      },
    })

    expect(wrapper.vm.genMessages()).toBeNull()

    wrapper.setProps({ error: true })
    expect(wrapper.vm.genMessages()).toBeNull()

    wrapper.setProps({ errorMessages: 'required' })
    expect(wrapper.vm.genMessages()).not.toBeNull()
  })

  it('should be disabled', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isInteractive).toBe(true)

    wrapper.setProps({ disabled: true })

    expect(wrapper.vm.isInteractive).toBe(false)

    wrapper.setProps({
      disabled: false,
      readonly: true,
    })

    expect(wrapper.vm.isInteractive).toBe(false)

    wrapper.setProps({ readonly: false })

    expect(wrapper.vm.isInteractive).toBe(true)
  })

  it('should render a label', () => {
    const wrapper = mountFunction({
      propsData: { label: 'foo' },
    })

    expect(wrapper.vm.hasLabel).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()

    const wrapper2 = mountFunction({
      slots: {
        label: [{ render: h => h('div', 'foo') }],
      },
    })

    expect(wrapper2.html()).toMatchSnapshot()
  })

  it('should apply theme to label, counter, messages and icons', () => {
    const wrapper = mountFunction({
      propsData: {
        label: 'foo',
        hint: 'bar',
        persistentHint: true,
        light: true,
        prependIcon: 'prepend',
        appendIcon: 'append',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not apply attrs to element', () => {
    const wrapper = mountFunction({
      propsData: {
        foo: 'bar',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.attributes()).not.toHaveProperty('foobar')
  })
})
