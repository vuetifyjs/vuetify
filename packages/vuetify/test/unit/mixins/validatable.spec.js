import { test } from '@/test'
import Validatable from '@/mixins/validatable'

const Mock = {
  mixins: [Validatable],

  render: h => h('div')
}

test('validatable.js', ({ mount }) => {
  it('should register/unregister with injected form is available', () => {
    const form = {
      register: jest.fn(),
      unregister: jest.fn()
    }

    const wrapper = mount(Mock, {
      provide: { form }
    })

    expect(form.register).toBeCalled()

    wrapper.destroy()

    expect(form.unregister).toBeCalled()
  })

  it('should manually set isResetting', () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.isResetting).toBe(false)

    wrapper.vm.resetValidation()

    expect(wrapper.vm.isResetting).toBe(true)
  })

  it('should manually validate', () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.errorBucket).toEqual([])

    // Function failing
    wrapper.setProps({ rules: [() => false || 'fizzbuzz'] })

    wrapper.vm.validate()

    expect(wrapper.vm.errorBucket).toEqual(['fizzbuzz'])

    // Function passing
    wrapper.setProps({ rules: [val => val.length > 3 || 'fizzbuzz'] })

    wrapper.vm.validate(false, 'foo')

    expect(wrapper.vm.errorBucket).toEqual(['fizzbuzz'])

    wrapper.vm.validate(false, 'foobar')

    expect(wrapper.vm.errorBucket).toEqual([])

    // Boolean
    wrapper.setProps({ rules: [false] })

    wrapper.vm.validate()

    expect(wrapper.vm.errorBucket).toEqual([])

    // Boolean true sets no messages
    wrapper.setProps({ rules: [true] })

    wrapper.vm.validate()

    expect(wrapper.vm.errorBucket).toEqual([])

    // String
    wrapper.setProps({ rules: ['foobar'] })

    wrapper.vm.validate()

    expect(wrapper.vm.errorBucket).toEqual(['foobar'])

    // Warning
    wrapper.setProps({ rules: [undefined] })

    wrapper.vm.validate()

    expect(`Rules should return a string or boolean, received 'undefined' instead`).toHaveBeenWarned()

    // Force validation state
    wrapper.setProps({ rules: [false] })

    expect(wrapper.vm.hasInput).toBe(false)
    expect(wrapper.vm.hasFocused).toBe(false)

    wrapper.vm.validate(true)

    expect(wrapper.vm.hasInput).toBe(true)
    expect(wrapper.vm.hasFocused).toBe(true)
  })

  // https://github.com/vuetifyjs/vuetify/issues/5362
  it('should not validate on blur readonly or disabled when blurring', async () => {
    const focusBlur = async (wrapper) => {
      wrapper.setData({ isFocused: true })
      await wrapper.vm.$nextTick()
      wrapper.setData({ isFocused: false })
    }

    const validate = jest.fn()
    const wrapper = mount(Mock, {
      propsData: {
        readonly: true,
        validateOnBlur: true
      },
      methods: { validate }
    })

    // Initial state from beforeMount
    expect(validate).toHaveBeenCalledTimes(1)

    // Readonly - no validation
    expect(wrapper.vm.isFocused).toBe(false)

    await focusBlur(wrapper)

    expect(validate).toHaveBeenCalledTimes(1)

    // Disabled - no validation
    wrapper.setProps({ readonly: false, disabled: true })

    await focusBlur(wrapper)

    expect(validate).toHaveBeenCalledTimes(1)

    // Validation!
    wrapper.setProps({ disabled: false })

    await focusBlur(wrapper)

    expect(validate).toHaveBeenCalledTimes(2)
  })

  it('should have success', () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.hasSuccess).toBe(false)

    wrapper.setProps({ success: true })

    expect(wrapper.vm.hasSuccess).toBe(true)

    wrapper.setProps({ success: false, successMessages: ['foobar'] })

    expect(wrapper.vm.hasSuccess).toBe(true)

    wrapper.setProps({ successMessages: [] })

    expect(wrapper.vm.hasSuccess).toBe(false)
  })

  it('should have messages', () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.hasMessages).toBe(false)

    // String message
    wrapper.setProps({ messages: 'foo' })
    expect(wrapper.vm.hasMessages).toBe(true)

    // Array message
    wrapper.setProps({ messages: ['foo'] })
    expect(wrapper.vm.hasMessages).toBe(true)
    wrapper.setProps({ messages: [] }) // Reset

    // String error
    wrapper.setProps({ errorMessages: 'bar' })
    expect(wrapper.vm.hasMessages).toBe(true)

    // Array error
    wrapper.setProps({ errorMessages: ['bar'] })
    expect(wrapper.vm.hasMessages).toBe(true)
    wrapper.setProps({ errorMessages: [] }) // Reset

    // String error
    wrapper.setProps({ successMessages: 'fizz' })
    expect(wrapper.vm.hasMessages).toBe(true)

    // Array error
    wrapper.setProps({ successMessages: ['fizz'] })
    expect(wrapper.vm.hasMessages).toBe(true)
    wrapper.setProps({ successMessages: [] }) // Reset

    // Error bucket
    wrapper.setProps({ rules: [() => 'fizzbuzz']})
    expect(wrapper.vm.shouldValidate).toBe(false)

    wrapper.setData({ hasInput: true })

    expect(wrapper.vm.shouldValidate).toBe(true)
    expect(wrapper.vm.hasMessages).toBe(true)

    wrapper.setData({ hasInput: false, hasFocused: true })

    expect(wrapper.vm.shouldValidate).toBe(true)
    expect(wrapper.vm.hasMessages).toBe(true)

    wrapper.setData({ isResetting: true })

    expect(wrapper.vm.shouldValidate).toBe(false)

    wrapper.setData({ isResetting: false })
    wrapper.setProps({ validateOnBlur: true })

    expect(wrapper.vm.shouldValidate).toBe(true)
  })

  it('should have state', () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.hasState).toBe(false)

    wrapper.setData({ success: true })

    expect(wrapper.vm.hasState).toBe(true)

    wrapper.setData({ success: false, error: true })

    expect(wrapper.vm.hasState).toBe(true)

    wrapper.setData({ error: false })

    expect(wrapper.vm.hasState).toBe(false)
  })

  it('should return validation state', () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.validationState).toBe(undefined)

    wrapper.setProps({ error: true })
    expect(wrapper.vm.validationState).toBe('error')

    wrapper.setProps({ error: false, success: true  })
    expect(wrapper.vm.validationState).toBe('success')

    wrapper.setProps({ success: false, color: 'blue' })
    wrapper.setData({ hasColor: true })
    expect(wrapper.vm.validationState).toBe('blue')
  })

  it('should return a sliced amount based on error count', () => {
    const wrapper = mount(Mock, {
      propsData: {
        errorMessages: [
          'foobar',
          'fizzbuzz'
        ]
      }
    })

    expect(wrapper.vm.validations.length).toBe(1)

    wrapper.setProps({ errorCount: 2 })

    expect(wrapper.vm.validations.length).toBe(2)
  })

  it('should validate when internalValue changes', async () => {
    const validate = jest.fn()
    const wrapper = mount(Mock, {
      methods: { validate }
    })

    expect(wrapper.vm.hasInput).toBe(false)
    wrapper.setData({ lazyValue: 'foo' })

    // Wait for watcher's $nextTick call
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasInput).toBe(true)
    expect(validate).toBeCalled()
  })

  it('should update values when resetting after timeout', async () => {
    const wrapper = mount(Mock)

    wrapper.setData({
      hasInput: true,
      hasFocused: true,
      isResetting: true
    })

    expect(wrapper.vm.hasInput).toBe(true)
    expect(wrapper.vm.hasFocused).toBe(true)
    expect(wrapper.vm.isResetting).toBe(true)

    // Wait for timeout
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(wrapper.vm.hasInput).toBe(false)
    expect(wrapper.vm.hasFocused).toBe(false)
    expect(wrapper.vm.isResetting).toBe(false)
  })

  it('should emit error update when value changes and shouldValidate', async () => {
    const wrapper = mount(Mock)

    const onError = jest.fn()

    wrapper.vm.$on('update:error', onError)

    wrapper.setProps({ error: true })

    await wrapper.vm.$nextTick()

    wrapper.setProps({ error: false })

    await wrapper.vm.$nextTick()

    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('should reset validation and internalValue', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        value: 'foobar'
      }
    })

    wrapper.vm.reset()

    expect(wrapper.vm.isResetting).toBe(true)
    expect(wrapper.internalValue).toBe(undefined)

    wrapper.setProps({ value: ['foobar'] })

    await wrapper.vm.$nextTick()

    wrapper.vm.reset()
    expect(wrapper.vm.isResetting).toBe(true)
    expect(wrapper.vm.internalValue).toEqual([])
  })
})
