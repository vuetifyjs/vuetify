import Vue from 'vue'
import VTextField from '../VTextField'
import VProgressLinear from '../../VProgressLinear'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { waitAnimationFrame } from '../../../../test'

describe('VTextField.ts', () => { // eslint-disable-line max-statements
  type Instance = InstanceType<typeof VTextField>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTextField, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            rtl: false,
          },
        },
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should pass required attr to the input', () => {
    const wrapper = mountFunction({
      attrs: {
        required: true,
      },
    })

    const input = wrapper.findAll('input').at(0)
    expect(input.element.getAttribute('required')).toBe('required')
  })

  it('should pass events to internal input field', () => {
    const keyup = jest.fn()
    const component = {
      render (h) {
        return h(VTextField, { on: { keyUp: keyup }, props: { download: '' }, attrs: {} })
      },
    }
    const wrapper = mount(component)

    const input = wrapper.findAll('input').at(0)
    input.trigger('keyUp', { keyCode: 65 })

    expect(keyup).toHaveBeenCalled()
  })

  it('should not render aria-label attribute on text field element with no label value or id', () => {
    const wrapper = mountFunction({
      propsData: {
        label: null,
      },
      attrs: {},
    })

    const inputGroup = wrapper.findAll('input').at(0)
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
  })

  it('should not render aria-label attribute on text field element with id', () => {
    const wrapper = mountFunction({
      propsData: {
        label: 'Test',
      },
      attrs: {
        id: 'Test',
      },
    })

    const inputGroup = wrapper.findAll('input').at(0)
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
  })

  it('should start out as invalid', () => {
    const wrapper = mountFunction({
      propsData: {
        rules: [v => !!v || 'Required'],
      },
    })

    expect(wrapper.vm.valid).toEqual(false)
  })

  it('should start validating on input', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.shouldValidate).toEqual(false)
    wrapper.setProps({ value: 'asd' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.shouldValidate).toEqual(true)
  })

  it('should not start validating on input if validate-on-blur prop is set', async () => {
    const wrapper = mountFunction({
      propsData: {
        validateOnBlur: true,
      },
    })

    expect(wrapper.vm.shouldValidate).toEqual(false)
    wrapper.setProps({ value: 'asd' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.shouldValidate).toEqual(false)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should not display counter when set to false/undefined/null', async () => {
    const wrapper = mountFunction({
      propsData: {
        counter: true,
      },
      attrs: {
        maxlength: 50,
      },
    })

    expect(wrapper.findAll('.v-counter').wrappers[0]).not.toBeUndefined()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ counter: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.v-counter').wrappers[0]).toBeUndefined()

    wrapper.setProps({ counter: undefined })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.v-counter').wrappers[0]).toBeUndefined()

    wrapper.setProps({ counter: null })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.v-counter').wrappers[0]).toBeUndefined()
  })

  it('should have readonly attribute', () => {
    const wrapper = mountFunction({
      propsData: {
        readonly: true,
      },
    })

    const input = wrapper.findAll('input').at(0)

    expect(input.element.getAttribute('readonly')).toBe('readonly')
  })

  it('should clear input value', async () => {
    const wrapper = mountFunction({
      propsData: {
        clearable: true,
        value: 'foo',
      },
    })

    const clear = wrapper.findAll('.v-input__icon--clear .v-icon').at(0)
    const input = jest.fn()
    wrapper.vm.$on('input', input)

    expect(wrapper.vm.internalValue).toBe('foo')

    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(null)
  })

  it('should not clear input if not clearable and has appended icon (with callback)', async () => {
    const click = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: 'foo',
        appendIcon: 'block',
      },
      listeners: {
        'click:append': click,
      },
    })

    const icon = wrapper.findAll('.v-input__icon--append .v-icon').at(0)
    icon.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe('foo')
    expect(click).toHaveBeenCalledTimes(1)
  })

  it('should not clear input if not clearable and has appended icon (without callback)', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'foo',
        appendIcon: 'block',
      },
    })

    const icon = wrapper.findAll('.v-input__icon--append .v-icon').at(0)
    icon.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe('foo')
  })

  it('should start validating on blur', async () => {
    const rule = jest.fn().mockReturnValue(true)
    const wrapper = mountFunction({
      propsData: {
        rules: [rule],
        validateOnBlur: true,
      },
    })

    const input = wrapper.find('input')
    expect(wrapper.vm.shouldValidate).toEqual(false)

    // Rules are called once on mount
    expect(rule).toHaveBeenCalledTimes(1)

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.element.value = 'f'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    expect(rule).toHaveBeenCalledTimes(1)

    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.shouldValidate).toEqual(true)
    expect(rule).toHaveBeenCalledTimes(2)
  })

  it('should keep its value on blur', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'asd',
      },
    })

    const input = wrapper.findAll('input').at(0)

    input.element.value = 'fgh'
    input.trigger('input')
    input.trigger('blur')

    expect(input.element.value).toBe('fgh')
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should update if value is changed externally', async () => {
    const wrapper = mountFunction({})

    const input = wrapper.findAll('input').at(0)

    wrapper.setProps({ value: 'fgh' })
    expect(input.element.value).toBe('fgh')

    input.trigger('focus')
    wrapper.setProps({ value: 'jkl' })
    expect(input.element.value).toBe('jkl')
  })

  it('should fire a single change event on blur', async () => {
    let value = 'asd'
    const change = jest.fn()

    const component = {
      render (h) {
        return h(VTextField, {
          on: {
            input: i => value = i,
            change,
          },
          props: { value },
        })
      },
    }
    const wrapper = mount(component)

    const input = wrapper.findAll('input').at(0)

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.element.value = 'fgh'
    input.trigger('input')

    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith('fgh')
    expect(change.mock.calls).toHaveLength(1)
  })

  // TODO: this fails without sync
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should not make prepend icon clearable', () => {
    const wrapper = mountFunction({
      propsData: {
        prependIcon: 'check',
        appendIcon: 'check',
        value: 'test',
        clearable: true,
      },
    })

    const prepend = wrapper.findAll('.v-input__icon--append .v-icon').at(0)
    expect(prepend.text()).toBe('check')
    expect(prepend.element.classList).not.toContain('input-group__icon-cb')
  })

  // TODO: this fails even without sync for some reason
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should not emit change event if value has not changed', async () => {
    const change = jest.fn()
    let value = 'test'
    const component = {
      // eslint-disable-next-line sonarjs/no-identical-functions
      render (h) {
        return h(VTextField, {
          on: {
            input: i => value = i,
            change,
          },
          props: { value },
        })
      },
    }
    const wrapper = mount(component, { sync: false })

    const input = wrapper.findAll('input').at(0)

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(change.mock.calls).toHaveLength(0)
  })

  it('should render component with async loading and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        loading: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with async loading and custom progress and match snapshot', () => {
    Vue.prototype.$vuetify = {
      rtl: false,
    }
    const progress = Vue.component('test', {
      render (h) {
        return h(VProgressLinear, {
          props: {
            indeterminate: true,
            height: 7,
            color: 'orange',
          },
        })
      },
    })

    const wrapper = mountFunction({
      sync: false,
      propsData: {
        loading: true,
      },
      slots: {
        progress: [progress],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display the number 0', async () => {
    const wrapper = mountFunction({
      propsData: { value: 0 },
    })

    expect(wrapper.vm.$refs.input.value).toBe('0')
  })

  it('should autofocus', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        autofocus: true,
      },
    })

    const focus = jest.fn()
    wrapper.vm.$on('focus', focus)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(true)
    wrapper.vm.onClick()

    expect(focus.mock.calls).toHaveLength(0)

    wrapper.setData({ isFocused: false })

    wrapper.vm.onClick()
    expect(focus.mock.calls).toHaveLength(1)

    wrapper.setProps({ disabled: true })

    wrapper.setData({ isFocused: false })

    wrapper.vm.onClick()
    expect(focus.mock.calls).toHaveLength(1)

    wrapper.setProps({ disabled: false })

    wrapper.vm.onClick()
    expect(focus.mock.calls).toHaveLength(2)

    delete wrapper.vm.$refs.input

    wrapper.vm.onFocus()
    expect(focus.mock.calls).toHaveLength(2)
  })

  it('should have prefix and suffix', () => {
    const wrapper = mountFunction({
      propsData: {
        prefix: '$',
        suffix: '.com',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use a custom clear callback', async () => {
    const clear = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        clearable: true,
        value: 'foo',
      },
      listeners: {
        'click:clear': clear,
      },
    })

    wrapper.vm.$on('click:clear', clear)

    wrapper.find('.v-input__icon--clear .v-icon').trigger('click')

    expect(clear).toHaveBeenCalled()
  })

  it('should not generate label', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.genLabel()).toBeNull()

    wrapper.setProps({ singleLine: true })

    expect(wrapper.vm.genLabel()).toBeNull()

    wrapper.setProps({ placeholder: 'foo' })

    expect(wrapper.vm.genLabel()).toBeNull()

    wrapper.setProps({
      placeholder: undefined,
      value: 'bar',
    })

    expect(wrapper.vm.genLabel()).toBeNull()

    wrapper.setProps({
      label: 'bar',
      value: undefined,
    })

    expect(wrapper.vm.genLabel()).toBeTruthy()
  })

  it('should propagate id to label for attribute', () => {
    const wrapper = mountFunction({
      propsData: {
        label: 'foo',
        id: 'bar',
      },
      attrs: {
        id: 'bar',
      },
      domProps: {
        id: 'bar',
      },
    })

    const label = wrapper.find('label')

    expect(label.element.getAttribute('for')).toBe('bar')
  })

  it('should render an appended outer icon', () => {
    const wrapper = mountFunction({
      propsData: {
        appendOuterIcon: 'search',
      },
    })

    expect(wrapper.find('.v-input__icon--append-outer .v-icon').element.innerHTML).toBe('search')
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should have correct max value', async () => {
    const wrapper = mountFunction({
      attrs: {
        maxlength: 25,
      },
      propsData: {
        counter: true,
      },
    })

    const counter = wrapper.find('.v-counter')

    expect(counter.element.innerHTML).toBe('0 / 25')

    wrapper.setProps({ counter: '50' })

    await wrapper.vm.$nextTick()

    expect(counter.element.innerHTML).toBe('0 / 50')
  })

  it('should use counter value function', async () => {
    const wrapper = mountFunction({
      attrs: {
        maxlength: 25,
      },
      propsData: {
        counter: true,
        counterValue: (value?: string): number => (value || '').replace(/\s/g, '').length,
      },
    })

    const counter = wrapper.find('.v-counter')

    expect(counter.element.innerHTML).toBe('0 / 25')

    wrapper.setProps({ value: 'foo bar baz' })

    await wrapper.vm.$nextTick()

    expect(counter.element.innerHTML).toBe('9 / 25')

    wrapper.setProps({ counter: '50' })

    await wrapper.vm.$nextTick()

    expect(counter.element.innerHTML).toBe('9 / 50')

    wrapper.setProps({
      counterValue: (value?: string): number => (value || '').replace(/ba/g, '').length,
    })

    await wrapper.vm.$nextTick()

    expect(counter.element.innerHTML).toBe('7 / 50')
  })

  it('should set bad input on input', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.badInput).toBeFalsy()

    wrapper.vm.onInput({
      target: {},
    })

    expect(wrapper.vm.badInput).toBeFalsy()

    wrapper.vm.onInput({
      target: { validity: { badInput: false } },
    })

    expect(wrapper.vm.badInput).toBeFalsy()

    wrapper.vm.onInput({
      target: { validity: { badInput: true } },
    })

    expect(wrapper.vm.badInput).toBe(true)
  })

  it('should not apply id to root element', () => {
    const wrapper = mountFunction({
      attrs: { id: 'foo' },
    })

    const input = wrapper.find('input')
    expect(wrapper.element.id).toBe('')
    expect(input.element.id).toBe('foo')
  })

  it('should fire change event when pressing enter', () => {
    const wrapper = mountFunction()
    const input = wrapper.find('input')
    const change = jest.fn()

    wrapper.vm.$on('change', change)

    input.trigger('focus')
    input.element.value = 'foo'
    input.trigger('input')
    input.trigger('keydown.enter')
    input.trigger('keydown.enter')

    expect(change).toHaveBeenCalledTimes(2)
  })

  it('should have focus and blur methods', async () => {
    const wrapper = mountFunction()
    const onBlur = jest.spyOn(wrapper.vm.$refs.input, 'blur')
    const onFocus = jest.spyOn(wrapper.vm.$refs.input, 'focus')

    wrapper.vm.focus()

    expect(onFocus).toHaveBeenCalledTimes(1)

    wrapper.vm.blur()

    // https://github.com/vuetifyjs/vuetify/issues/5913
    // Blur waits a requestAnimationFrame
    // to resolve a bug in MAC / Safari
    await waitAnimationFrame()

    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should activate label when using dirtyTypes', async () => {
    const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']
    const wrapper = mountFunction({
      propsData: {
        label: 'Foobar',
      },
    })
    const label = wrapper.find('.v-label')

    for (const type of dirtyTypes) {
      wrapper.setProps({ type })

      await wrapper.vm.$nextTick()

      expect(label.element.classList).toContain('v-label--active')
      expect(wrapper.vm.$el.classList).toContain('v-input--is-label-active')

      wrapper.setProps({ type: undefined })

      await wrapper.vm.$nextTick()

      expect(label.element.classList).not.toContain('v-label--active')
      expect(wrapper.vm.$el.classList).not.toContain('v-input--is-label-active')
    }
  })

  it('should apply theme to label, counter, messages and icons', () => {
    const wrapper = mountFunction({
      propsData: {
        counter: true,
        label: 'foo',
        hint: 'bar',
        persistentHint: true,
        light: true,
        prependIcon: 'prepend',
        appendIcon: 'append',
        prependInnerIcon: 'prepend-inner',
        appendOuterIcon: 'append-outer',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/5018
  it('should not focus input when mousedown did not originate from input', () => {
    const focus = jest.fn()
    const wrapper = mountFunction({
      methods: { focus },
    })

    const input = wrapper.find('.v-input__slot')
    input.trigger('mousedown')
    input.trigger('mouseup')
    input.trigger('mouseup')

    expect(focus).toHaveBeenCalledTimes(1)
  })

  it('should hide messages if no messages and hide-details is auto', async () => {
    const wrapper = mountFunction({
      propsData: {
        hideDetails: 'auto',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ counter: 7 })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ counter: null, errorMessages: 'required' })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8268
  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should recalculate prefix width on prefix change', async () => {
    const setPrefixWidth = jest.fn()
    const wrapper = mountFunction({
      methods: { setPrefixWidth },
    })

    wrapper.setProps({ prefix: 'foobar' })

    await wrapper.vm.$nextTick()

    expect(setPrefixWidth).toHaveBeenCalledTimes(2)
  })

  // https://github.com/vuetifyjs/vuetify/pull/8724
  it('should fire events in correct order when clear icon is clicked and input is not focused', async () => {
    const calls: string[] = []
    const change = jest.fn(() => calls.push('change'))
    const blur = jest.fn(() => calls.push('blur'))
    const focus = jest.fn(() => calls.push('focus'))
    const input = jest.fn(() => calls.push('input'))

    const component = {
      render (h) {
        return h(VTextField, {
          on: {
            change,
            blur,
            focus,
            input,
          },
          props: {
            value: 'test',
            clearable: true,
          },
        })
      },
    }
    const wrapper = mount(component)

    const inputElement = wrapper.findAll('input').at(0)
    const clearIcon = wrapper.find('.v-input__icon--clear .v-icon')

    clearIcon.trigger('click')
    await wrapper.vm.$nextTick()

    inputElement.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(calls).toEqual([
      'focus',
      'input',
      'change',
      'blur',
    ])
    expect(inputElement.element.value).toBe('')
  })

  // https://material.io/components/text-fields/#filled-text-field
  it('should be single if using the filled prop with no label', () => {
    const wrapper = mountFunction({
      propsData: { filled: true },
    })

    expect(wrapper.vm.isSingle).toBe(true)

    wrapper.setProps({ label: 'Foobar ' })

    expect(wrapper.vm.isSingle).toBe(false)
  })

  it('should autofocus text-field when intersected', async () => {
    const wrapper = mountFunction({
      propsData: { autofocus: true },
    })
    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    expect(document.activeElement === element).toBe(true)

    element.blur()

    expect(document.activeElement === element).toBe(false)

    // Simulate observe firing that is visible
    wrapper.vm.onObserve([], [], true)
    expect(document.activeElement === element).toBe(true)

    element.blur()

    // Simulate observe firing that is not visible
    wrapper.vm.onObserve([], [], false)
    expect(document.activeElement === element).toBe(false)

    element.blur()

    wrapper.setProps({ autofocus: false })

    // Simulate observe firing with no autofocus
    wrapper.vm.onObserve([], [], true)
    expect(document.activeElement === element).toBe(false)
  })

  it('should use the correct icon color when using the solo inverted prop', () => {
    const wrapper = mountFunction({
      propsData: { soloInverted: true },
      mocks: {
        $vuetify: {
          theme: { dark: false },
        },
      },
      provide: {
        theme: { isDark: true },
      },
    })

    expect(wrapper.vm.computedColor).toBe('white')

    wrapper.vm.focus()

    expect(wrapper.vm.computedColor).toBe('primary')
  })

  it('should keep -0 in input when type is number', async () => {
    const wrapper = mountFunction({
      propsData: { type: 'number', value: -0 },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('-0')
  })
})
