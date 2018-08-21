import { test } from '@/test'
import { VRadioGroup, VRadio } from '@/components/VRadioGroup'
import { setTimeout } from 'timers';

const warning = '[Vuetify] The v-radio component must be used inside a v-radio-group'
const error = 'TypeError: this.radio.register is not a function'

test('VRadio.vue', ({ mount }) => {
  it('should advise about v-radio-group being necessary', () => {
    mount(VRadio)

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
        radio: {
          name: 'name',
          isMandatory: false
        }
      }
    })

    let inputGroup = wrapper.first('input')
    expect(inputGroup.getAttribute('role')).toBe('radio')
    expect(inputGroup.getAttribute('aria-checked')).toBe('false')

    wrapper.setData({ 'isActive': true })
    inputGroup = wrapper.first('input')
    expect(inputGroup.getAttribute('aria-checked')).toBe('true')
    expect(wrapper.html()).toMatchSnapshot()

    expect(error).toHaveBeenWarned()
  })

  it('should render aria-label attribute with label value on input group', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        label: 'Test'
      },
      attrs: {},
      provide: {
        radio: {
          name: 'name',
          isMandatory: false
        }
      }
    })

    const inputGroup = wrapper.first('input')
    expect(inputGroup.getAttribute('aria-label')).toBe('Test')
    expect(wrapper.html()).toMatchSnapshot()

    expect(error).toHaveBeenWarned()
  })

  it('should not render aria-label attribute with no label value on input group', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        label: null
      },
      provide: {
        radio: {
          name: 'name',
          isMandatory: false
        }
      }
    })

    const inputGroup = wrapper.first('input')
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()

    expect(error).toHaveBeenWarned()
  })

  it('should render proper input name', () => {
    const wrapper = mount(VRadio, {
      provide: {
        radio: {
          name: 'name',
          isMandatory: false
        }
      }
    })

    const input = wrapper.find('input')[0]
    expect(input.getAttribute('name')).toBe('name')
    expect(wrapper.html()).toMatchSnapshot()

    expect(error).toHaveBeenWarned()
  })

  it('should register and unregister', () => {
    const register = jest.fn()
    const unregister = jest.fn()

    const wrapper = mount(VRadio, {
      attachToDocument: true,
      provide: {
        radio: {
          name: 'name',
          isMandatory: false,
          register: register,
          unregister: unregister
        }
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
        radio: {
          name: 'name',
          isMandatory: false
        }
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')

    expect(ripple).toHaveLength(0)

    expect(error).toHaveBeenWarned()
  })

  it('should render ripple when ripple prop is true', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        ripple: true
      },
      provide: {
        radio: {
          name: 'name',
          isMandatory: false
        }
      }
    })

    const ripple = wrapper.find('.v-input--selection-controls__ripple')[0]

    expect(ripple.element._ripple.enabled).toBe(true)
    expect(ripple.element._ripple.centered).toBe(true)

    expect(error).toHaveBeenWarned()
  })

  it('should toggle on keypress', () => {
    const wrapper = mount(VRadio)

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    const input = wrapper.first('input')

    input.trigger('change')
    expect(change).toHaveBeenCalledTimes(1)

    input.trigger('keydown.tab')
    expect(change).toHaveBeenCalledTimes(1)

    expect(warning).toHaveBeenTipped()
  })

  it('should not generate own colors when parent is in error', async () => {
    const wrapper = mount(VRadio)

    expect(wrapper.vm.computedData.class).toEqual({
      'theme--dark': false,
      'theme--light': true,
      'v-radio--is-disabled': false,
      'v-radio--is-focused': false
    })

    wrapper.setData({ isActive: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.computedData.class).toEqual({
      'accent--text': true,
      'theme--dark': false,
      'theme--light': true,
      'v-radio--is-disabled': false,
      'v-radio--is-focused': false
    })

    expect(warning).toHaveBeenTipped()
  })

  it('should inject isMandatory', () => {
    const wrapper = mount(VRadio, {
      provide: {
        radio: {
          mandatory: true,
          register: jest.fn()
        }
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

  it('should render themed component', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        light: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenTipped()
  })
})
