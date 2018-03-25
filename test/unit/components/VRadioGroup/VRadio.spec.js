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
})
