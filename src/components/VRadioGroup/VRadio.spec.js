import { test } from '~util/testing'
import { VRadioGroup, VRadio } from '~components/VRadioGroup'

test('VRadio.vue', ({ mount }) => {
  it('should advise about v-radio-group being necessary', () => {
    mount(VRadio, {
      provide: {
        name: () => 'name',
        registerChild: () => {},
        unregisterChild: () => {},
        isMandatory: () => false,
      }
    })

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
  })

  // TODO: Enable test when there's a way to test $parent.$vnode.tag
  it.skip('should not advise about v-radio-group being necessary in VRadioGroup', () => {
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
        registerChild: () => {},
        unregisterChild: () => {},
        isMandatory: () => false
      }
    })

    let inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.getAttribute('role')).toBe('radio')
    expect(inputGroup.getAttribute('aria-checked')).toBe('false')

    wrapper.setData({ 'isActive': true })
    inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.getAttribute('aria-checked')).toBe('true')
    expect(wrapper.html()).toMatchSnapshot()

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
  })

  it('should render aria-label attribute with label value on input group', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        label: 'Test'
      },
      attrs: {},
      provide: {
        name: () => 'name',
        registerChild: () => {},
        unregisterChild: () => {},
        isMandatory: () => false
      }
    })

    const inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.getAttribute('aria-label')).toBe('Test')
    expect(wrapper.html()).toMatchSnapshot()

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
  })

  it('should not render aria-label attribute with no label value on input group', () => {
    const wrapper = mount(VRadio, {
      propsData: {
        label: null
      },
      provide: {
        name: () => 'name',
        registerChild: () => {},
        unregisterChild: () => {},
        isMandatory: () => false
      }
    })

    const inputGroup = wrapper.find('.input-group')[0]
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
  })

  it('should render proper input name', () => {
    const wrapper = mount(VRadio, {
      provide: {
        name: () => 'name',
        registerChild: () => {},
        unregisterChild: () => {},
        isMandatory: () => false
      }
    })

    const input = wrapper.find('input')[0]
    expect(input.getAttribute('name')).toBe('name')
    expect(wrapper.html()).toMatchSnapshot()

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
  })

  it('should register and unregister', () => {
    const register = jest.fn()
    const unregister = jest.fn()

    const wrapper = mount(VRadio, {
      provide: {
        name: () => 'name',
        registerChild: register,
        unregisterChild: unregister,
        isMandatory: () => false
      }
    })

    expect(register).toHaveBeenCalled()
    wrapper.destroy()
    expect(unregister).toHaveBeenCalled()

    expect('immediate parent of v-radio-group').toHaveBeenTipped()
  })
})
