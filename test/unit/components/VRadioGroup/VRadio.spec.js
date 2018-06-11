import { test } from '@/test'
import { VRadioGroup, VRadio } from '@/components/VRadioGroup'

const warning = '[Vuetify] The v-radio component must be used inside a v-radio-group'

test('VRadio.vue', ({ mount }) => {
  it('should advise about v-radio-group being necessary', () => {
    mount(VRadio, {
      provide: {
        name: () => 'name',
        isMandatory: () => false,
      }
    })

    expect(warning).toHaveBeenTipped()
  })

  // TODO: Enable test when there's a way to test $parent.$vnode.tag
  it('should not advise about v-radio-group being necessary in VRadioGroup', () => {
    const wrapper = mount(VRadioGroup, {
      slots: {
        default: [VRadio]
      }
    })
    // no expectation other than a lack of tip
  })

  it('should render role and aria-checked attributes on input group', () => {
    const wrapper = mount(VRadio, {
      data: {
        isActive: false
      },
      provide: {
        name: () => 'name',
        isMandatory: () => false
      }
    })

    let inputGroup = wrapper.first('input')
    expect(inputGroup.getAttribute('role')).toBe('radio')
    expect(inputGroup.getAttribute('aria-checked')).toBe('false')

    wrapper.setData({ 'isActive': true })
    inputGroup = wrapper.first('input')
    expect(inputGroup.getAttribute('aria-checked')).toBe('true')
    expect(wrapper.html()).toMatchSnapshot()

    expect(warning).toHaveBeenTipped()
  })

  it('should render aria-label attribute with label value on input group', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        label: 'Test'
      },
      attrs: {},
      provide: {
        name: () => 'name',
        isMandatory: () => false
      }
    })

    const inputGroup = wrapper.first('input')
    expect(inputGroup.getAttribute('aria-label')).toBe('Test')
    expect(wrapper.html()).toMatchSnapshot()

    expect(warning).toHaveBeenTipped()
  })

  it('should not render aria-label attribute with no label value on input group', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        label: null
      },
      provide: {
        name: () => 'name',
        isMandatory: () => false
      }
    })

    const inputGroup = wrapper.first('input')
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()

    expect(warning).toHaveBeenTipped()
  })

  it('should render proper input name', () => {
    const wrapper = mount(VRadio, {
      provide: {
        name: () => 'name',
        isMandatory: () => false
      }
    })

    const input = wrapper.find('input')[0]
    expect(input.getAttribute('name')).toBe('name')
    expect(wrapper.html()).toMatchSnapshot()

    expect(warning).toHaveBeenTipped()
  })

  it('should register and unregister', () => {
    const register = jest.fn()
    const unregister = jest.fn()

    const wrapper = mount(VRadio, {
      attachToDocument: true,
      provide: {
        name: () => 'name',
        radio: {
          register: register,
          unregister: unregister
        },
        isMandatory: () => false
      }
    })

    expect(register).toHaveBeenCalled()
    wrapper.destroy()
    expect(unregister).toHaveBeenCalled()
  })

  it('should not render ripple when ripple prop is false', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        ripple: false
      },
      provide: {
        name: () => 'name',
        isMandatory: () => false
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    expect(ripple).toHaveLength(0)

    expect(warning).toHaveBeenTipped()
  })

  it('should render ripple when ripple prop is true', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        ripple: true
      },
      provide: {
        name: () => 'name',
        isMandatory: () => false
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    expect(ripple.element._ripple.enabled).toBe(true)
    expect(ripple.element._ripple.centered).toBe(true)

    expect(warning).toHaveBeenTipped()
  })

  it('should toggle when space or enter is pressed', () => {
    const wrapper = mount(VRadio)

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    const input = wrapper.first('input')

    input.trigger('focus')
    input.trigger('keydown.enter')

    expect(change).toHaveBeenCalledTimes(1)

    input.trigger('keydown.space')
    expect(change).toHaveBeenCalledTimes(2)

    input.trigger('keydown.tab')
    expect(change).toHaveBeenCalledTimes(2)

    expect(wrapper.vm.isFocused).toBe(true)
    wrapper.vm.onBlur()
    expect(wrapper.vm.isFocused).toBe(false)

    expect(warning).toHaveBeenTipped()
  })

  it('should not generate own colors when parent is in error', async () => {
    const wrapper = mount(VRadio)

    expect(wrapper.vm.classes).toEqual({
      'theme--dark': false,
      'theme--light': false,
      'v-radio--is-disabled': false,
      'v-radio--is-focused': false
    })

    wrapper.setData({ isActive: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.classes).toEqual({
      'accent--text': true,
      'theme--dark': false,
      'theme--light': false,
      'v-radio--is-disabled': false,
      'v-radio--is-focused': false
    })

    expect(warning).toHaveBeenTipped()
  })

  it('should inject isMandatory', () => {
    const wrapper = mount(VRadio, {
      provide: {
        isMandatory: () => true
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    expect(wrapper.vm.internalValue).toBe(undefined)

    wrapper.vm.isActive = true

    wrapper.vm.onChange()

    expect(change).not.toBeCalled()

    wrapper.vm.isActive = false

    wrapper.vm.onChange()

    expect(change).toBeCalled()
    expect(warning).toHaveBeenTipped()
  })


  it('should use custom icons', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        onIcon: 'foo',
        offIcon: 'bar'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setData({ isActive: true })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenTipped()
  })

  it('should check/uncheck the internal input', () => {
    const wrapper = mount(VRadio)

    expect(wrapper.vm.$refs.input.checked).toBe(false)

    wrapper.setData({ isActive: true })

    expect(wrapper.vm.$refs.input.checked).toBe(true)

    wrapper.setData({ isActive: false })

    expect(wrapper.vm.$refs.input.checked).toBe(false)
    expect(warning).toHaveBeenTipped()
  })
})
