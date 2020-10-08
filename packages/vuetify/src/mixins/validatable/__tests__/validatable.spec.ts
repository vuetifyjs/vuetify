import Validatable from '../'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { wait } from '../../../../test'

describe('validatable.ts', () => {
  const Mock = Validatable.extend({
    render: h => h('div'),
  })

  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Mock, {
        mocks: {
          $vuetify: {
            theme: { dark: false },
          },
        },
        ...options,
      })
    }
  })

  it('should register/unregister with injected form is available', () => {
    const form = {
      register: jest.fn(),
      unregister: jest.fn(),
    }

    const wrapper = mountFunction({
      provide: { form },
    })

    expect(form.register).toHaveBeenCalled()

    wrapper.destroy()

    expect(form.unregister).toHaveBeenCalled()
  })

  it('should manually set isResetting', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isResetting).toBe(false)

    wrapper.vm.resetValidation()

    expect(wrapper.vm.isResetting).toBe(true)
  })

  ;[true, false].forEach(returns => {
    it('should reset valid flag on resetValidation - ' + String(returns), async () => {
      jest.useFakeTimers()
      const wrapper = mountFunction({
        propsData: {
          rules: [() => returns || String(returns)],
        },
      })

      expect(wrapper.vm.valid).toBe(returns)

      wrapper.setData({ valid: !returns })

      wrapper.vm.resetValidation()
      await wrapper.vm.$nextTick()
      jest.runAllTimers()
      expect(wrapper.vm.valid).toBe(returns)
      jest.useRealTimers()
    })
  })

  /* eslint-disable-next-line max-statements */
  it('should manually validate', () => {
    const wrapper = mountFunction()

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

    // https://github.com/vuetifyjs/vuetify/issues/9976
    expect(wrapper.vm.errorBucket).toEqual([''])

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
    const focusBlur = async wrapper => {
      wrapper.setData({ isFocused: true })
      await wrapper.vm.$nextTick()
      wrapper.setData({ isFocused: false })
    }

    const validate = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        validateOnBlur: true,
      },
      methods: { validate },
    })

    // Initial state from beforeMount
    expect(validate).toHaveBeenCalledTimes(1)

    // Readonly - no validation
    expect(wrapper.vm.isFocused).toBe(false)

    await focusBlur(wrapper)

    expect(validate).toHaveBeenCalledTimes(2)

    // Disabled - no validation
    wrapper.setProps({ disabled: true })

    await focusBlur(wrapper)

    expect(validate).toHaveBeenCalledTimes(2)

    // Validation!
    wrapper.setProps({ disabled: false })

    await focusBlur(wrapper)

    expect(validate).toHaveBeenCalledTimes(3)
  })

  it('should have success', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.hasSuccess).toBe(false)

    wrapper.setProps({ success: true })

    expect(wrapper.vm.hasSuccess).toBe(true)

    wrapper.setProps({ success: false, successMessages: ['foobar'] })

    expect(wrapper.vm.hasSuccess).toBe(true)

    wrapper.setProps({ successMessages: [] })

    expect(wrapper.vm.hasSuccess).toBe(false)

    wrapper.setProps({ successMessages: null })

    expect(wrapper.vm.hasSuccess).toBe(false)
  })

  /* eslint-disable-next-line max-statements */
  it('should have messages', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.hasMessages).toBe(false)

    // Null message
    wrapper.setProps({ messages: null })
    expect(wrapper.vm.hasMessages).toBe(false)

    // String message
    wrapper.setProps({ messages: 'foo' })
    expect(wrapper.vm.hasMessages).toBe(true)

    // Array message
    wrapper.setProps({ messages: ['foo'] })
    expect(wrapper.vm.hasMessages).toBe(true)
    wrapper.setProps({ messages: [] }) // Reset

    // Null error
    wrapper.setProps({ errorMessages: null })
    expect(wrapper.vm.hasMessages).toBe(false)

    // String error
    wrapper.setProps({ errorMessages: 'bar' })
    expect(wrapper.vm.hasMessages).toBe(true)

    // Array error
    wrapper.setProps({ errorMessages: ['bar'] })
    expect(wrapper.vm.hasMessages).toBe(true)
    wrapper.setProps({ errorMessages: [] }) // Reset

    // Null success
    wrapper.setProps({ successMessages: null })
    expect(wrapper.vm.hasMessages).toBe(false)

    // String success
    wrapper.setProps({ successMessages: 'fizz' })
    expect(wrapper.vm.hasMessages).toBe(true)

    // Array success
    wrapper.setProps({ successMessages: ['fizz'] })
    expect(wrapper.vm.hasMessages).toBe(true)
    wrapper.setProps({ successMessages: [] }) // Reset

    // Error bucket
    wrapper.setProps({ rules: [() => 'fizzbuzz'] })
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
    const wrapper = mountFunction()

    expect(wrapper.vm.hasState).toBe(false)

    wrapper.setProps({ success: true })

    expect(wrapper.vm.hasState).toBe(true)

    wrapper.setProps({ success: false, error: true })

    expect(wrapper.vm.hasState).toBe(true)

    wrapper.setProps({ error: false })

    expect(wrapper.vm.hasState).toBe(false)
  })

  it('should return validation state', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.validationState).toBeUndefined()

    wrapper.setProps({ error: true })
    expect(wrapper.vm.validationState).toBe('error')

    wrapper.setProps({ error: false, success: true })
    expect(wrapper.vm.validationState).toBe('success')

    wrapper.setProps({ success: false, color: 'blue' })
    wrapper.setData({ hasColor: true })
    expect(wrapper.vm.validationState).toBe('blue')
  })

  it('should return a sliced amount based on error count', () => {
    const wrapper = mountFunction({
      propsData: {
        errorMessages: [
          'foobar',
          'fizzbuzz',
        ],
      },
    })

    expect(wrapper.vm.validations).toHaveLength(1)

    wrapper.setProps({ errorCount: 2 })

    expect(wrapper.vm.validations).toHaveLength(2)
  })

  it('should validate when internalValue changes', async () => {
    const validate = jest.fn()
    const wrapper = mountFunction({
      methods: { validate },
    })

    expect(wrapper.vm.hasInput).toBe(false)
    wrapper.setProps({ value: 'foo' })

    // Wait for watcher's $nextTick call
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasInput).toBe(true)
    expect(validate).toHaveBeenCalled()
  })

  it('should update values when resetting after timeout', async () => {
    const wrapper = mountFunction()

    wrapper.setData({
      hasInput: true,
      hasFocused: true,
      isResetting: true,
    })

    expect(wrapper.vm.hasInput).toBe(true)
    expect(wrapper.vm.hasFocused).toBe(true)
    expect(wrapper.vm.isResetting).toBe(true)

    // Wait for watcher
    await wrapper.vm.$nextTick()

    // Wait for watcher's timeout
    await wait()

    expect(wrapper.vm.hasInput).toBe(false)
    expect(wrapper.vm.hasFocused).toBe(false)
    expect(wrapper.vm.isResetting).toBe(false)
  })

  it('should emit error update when value changes and shouldValidate', async () => {
    const wrapper = mountFunction()

    const onError = jest.fn()

    wrapper.vm.$on('update:error', onError)

    wrapper.setProps({ error: true })

    await wrapper.vm.$nextTick()

    wrapper.setProps({ error: false })

    await wrapper.vm.$nextTick()

    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('should reset validation and internalValue', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'foobar',
      },
    })

    wrapper.vm.reset()

    expect(wrapper.vm.isResetting).toBe(true)
    expect(wrapper.vm.internalValue).toBeUndefined()

    wrapper.setProps({ value: ['foobar'] })

    await wrapper.vm.$nextTick()

    wrapper.vm.reset()
    expect(wrapper.vm.isResetting).toBe(true)
    expect(wrapper.vm.internalValue).toEqual([])
  })

  // https://github.com/vuetifyjs/vuetify/issues/6025
  it('should accept null for external messages', () => {
    const wrapper = mountFunction({
      propsData: {
        errorMessages: ['Foobar'],
      },
    })

    expect(wrapper.vm.externalError).toBe(true)

    wrapper.setProps({ errorMessages: [] })
    expect(wrapper.vm.externalError).toBe(false)

    wrapper.setProps({ errorMessages: 'Fizzbuzz' })
    expect(wrapper.vm.externalError).toBe(true)

    wrapper.setProps({ errorMessages: null })
    expect(wrapper.vm.externalError).toBe(false)
  })

  it('should return white when no color and isDark', () => {
    const wrapper = mountFunction({
      computed: { rootIsDark: () => false },
      propsData: { dark: true },
    })

    expect(wrapper.vm.computedColor).toBe('white')

    wrapper.setProps({ color: 'blue' })
    expect(wrapper.vm.computedColor).toBe('blue')

    wrapper.setProps({ color: undefined, dark: undefined })
    expect(wrapper.vm.computedColor).toBe('primary')

    const wrapper2 = mountFunction({
      computed: { rootIsDark: () => true },
    })

    expect(wrapper2.vm.computedColor).toBe('primary')

    wrapper2.setProps({ color: 'blue' })
    expect(wrapper2.vm.computedColor).toBe('blue')

    wrapper2.setProps({ color: undefined, light: true })
    expect(wrapper2.vm.computedColor).toBe('primary')
  })

  it('should return undefined for color and validation state if disabled', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'blue',
        dark: true,
        disabled: true,
      },
    })

    expect(wrapper.vm.computedColor).toBeUndefined()
    expect(wrapper.vm.validationState).toBeUndefined()
    expect(wrapper.vm.hasState).toBe(false)
  })

  // https://github.com/vuetifyjs/vuetify/issues/10174
  it('should validate correct value when blurring', async () => {
    const wrapper = mountFunction({
      propsData: {
        rules: [v => !!v || 'Mandatory Field'],
        validateOnBlur: true,
        value: 'Foo',
      },
    })

    wrapper.setData({ isFocused: true })

    wrapper.setProps({ value: '' })
    await wrapper.vm.$nextTick()

    wrapper.setData({ isFocused: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasError).toBe(true)

    wrapper.setData({ isFocused: true })

    wrapper.setProps({ value: 'Bar' })
    await wrapper.vm.$nextTick()

    wrapper.setData({ isFocused: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasError).toBe(false)
  })
})
