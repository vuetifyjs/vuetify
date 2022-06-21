import VOtpInput from '../VOtpInput'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VOtpInput.ts', () => {
  type Instance = InstanceType<typeof VOtpInput>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VOtpInput, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        ...options,
      })
    }
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

  it('should trigger focus events', async () => {
    // const updateValue = jest.fn()
    const wrapper = mountFunction(
      {
        propsData: {
          type: 'number',
        },
      }
    )

    wrapper.vm.focus(null, 0)

    const focus = jest.fn()
    wrapper.vm.$on('focus', focus)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(true)
    wrapper.setProps({ value: 'foo' })
    await wrapper.vm.$nextTick()
    wrapper.setData({ isFocused: false })
    wrapper.vm.onFocus()
  })

  it('should fire change event when pressing enter', async () => {
    const wrapper = mountFunction()
    const input = wrapper.findAll('input').at(0)
    const element = input.element as HTMLInputElement
    const change = jest.fn()

    wrapper.vm.$on('change', change)

    input.trigger('focus')
    element.value = 'a'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.space')
    input.trigger('keydown.enter')
    input.trigger('keydown.enter')

    expect(change).toHaveBeenCalledTimes(2)
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

    const slot = wrapper.findAll('.v-input__slot').at(0)

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

  it('should call the correct event for different click locations 2', () => {
    const onMouseDown = jest.fn()
    const wrapper = mountFunction()

    const slot = wrapper.findAll('.v-input__slot').at(0)
    const input = slot.find('input')

    wrapper.trigger('click')
    wrapper.trigger('mousedown')
    slot.trigger('click')
    slot.trigger('mousedown')
    slot.trigger('click')
    input.trigger('mousedown')

    expect(onMouseDown).toHaveBeenCalledTimes(0)
  })

  it('should not focus input when mousedown did not originate from input', () => {
    const focus = jest.fn()
    const wrapper = mountFunction({
      methods: { focus },
    })

    const input = wrapper.findAll('.v-input__slot').at(0)
    const element = input.find('input').element as HTMLInputElement
    input.trigger('mousedown')
    input.trigger('mouseup')
    input.trigger('mouseup')

    expect(wrapper.vm.$refs.input[0]).toBe(element)
    expect(focus).toHaveBeenCalledTimes(1)
  })

  it('should pass events to internal input field', () => {
    const keyup = jest.fn()
    const component = {
      render (h) {
        return h(VOtpInput, { on: { keyUp: keyup }, props: { }, attrs: {} })
      },
    }
    const wrapper = mount(component)

    const input = wrapper.findAll('input').at(0)
    input.trigger('keyUp', { keyCode: 65 })

    expect(keyup).toHaveBeenCalled()
  })

  it('should fire event when pressing keyboard defined keys', () => {
    const wrapper = mountFunction()
    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement
    const change = jest.fn()

    wrapper.vm.$on('change', change)

    input.trigger('focus')
    element.value = '1'
    input.trigger('input')
    input.trigger('keydown.enter')
    input.trigger('keydown.enter')
    const keys = ['Tab', 'Shift', 'Meta', 'Control', 'Alt', 'Delete', 'ArrowRight', 'Backspace']
    keys.forEach(key => {
      input.trigger('keyup', { key })
    })

    expect(change).toHaveBeenCalledTimes(2)
  })

  it('should process input on paste', async () => {
    const wrapper = mountFunction({})

    const input = wrapper.findAll('input').at(0)

    const element = input.element as HTMLInputElement
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    expect(document.activeElement === element).toBe(true)

    element.value = '1337078'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.otp).toStrictEqual('133707'.split(''))
  })

  it('should clear cursor when input typing is done', async () => {
    const onFinish = jest.fn()
    const clearFocus = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '',
        length: 2,
      },
      methods: {
        clearFocus,
      },
    })

    wrapper.vm.$on('finish', onFinish)

    const input = wrapper.findAll('input').at(0)
    const input2 = wrapper.findAll('input').at(1)
    const element = input.element as HTMLInputElement
    const element2 = input2.element as HTMLInputElement

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    element.value = 'a'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    expect(document.activeElement === element2).toBe(true)

    await wrapper.vm.$nextTick()
    element2.value = 'b'
    input2.trigger('input')
    await wrapper.vm.$nextTick()

    const onFocus = jest.spyOn(wrapper.vm.$refs.input[0], 'focus')
    expect(onFocus).toHaveBeenCalledTimes(0)
    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(clearFocus).toHaveBeenCalledTimes(1)
  })

  it('should run onComplete when input cursor reached end without full OTP value', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '',
        length: 2,
      },
      methods: {
      },
    })

    const input = wrapper.findAll('input').at(1)
    const element = input.element as HTMLInputElement
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('input')
    await wrapper.vm.$nextTick()
    element.value = 'b'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    const onFocus = jest.spyOn(wrapper.vm.$refs.input[0], 'focus')
    expect(onFocus).toHaveBeenCalledTimes(0)
  })

  it('should change cursor left when input focus and keyup left', async () => {
    const wrapper = mountFunction()

    const input = wrapper.findAll('input').at(1)
    const input2 = wrapper.findAll('input').at(0)
    const element = input2.element as HTMLInputElement
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('keyup', {
      key: 'ArrowLeft',
    })
    await wrapper.vm.$nextTick()

    expect(document.activeElement === element).toBe(true)
  })
})
