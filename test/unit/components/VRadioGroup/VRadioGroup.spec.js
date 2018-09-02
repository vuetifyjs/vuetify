import { test } from '@/test'
import { VRadioGroup, VRadio } from '@/components/VRadioGroup'

test('VRadioGroup.vue', ({ mount }) => {
  it('should render role on radio group', () => {
    const wrapper = mount(VRadioGroup)

    expect(wrapper.html()).toMatchSnapshot()

    const radioGroup = wrapper.find('.v-input--radio-group__input')[0]
    expect(radioGroup.getAttribute('role')).toBe('radiogroup')
  })

  // TODO: Test ability to toggle multiple data types

  it('should be in error when v-radio-group is', async () => {
    const wrapper = mount(VRadioGroup, {
      propsData: {
        error: false
      },
      slots: {
        default: [VRadio]
      }
    })

    const radio = wrapper.vm.radios[0]

    wrapper.setProps({ error: true })
    await wrapper.vm.$nextTick()
    expect(radio.parentError).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ error: false })
    await wrapper.vm.$nextTick()
    expect(radio.parentError).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should provide isMandatory', () => {
    const stub = {
      name: 'stub',
      inject: ['radio'],
      render: h => null
    }
    const wrapper = mount(VRadioGroup, {
      slots: {
        default: [stub]
      }
    })

    const child = wrapper.first(stub)

    expect(child.vm.radio.mandatory).toBe(true)

    wrapper.setProps({ mandatory: false })

    expect(child.vm.radio.mandatory).toBe(false)
  })

  it('should toggle radio', async () => {
    const stub = value => ({
      extends: VRadio,
      props: {
        value: {
          default: value
        }
      }
    })
    const wrapper = mount(VRadioGroup, {
      attachToDocument: true,
      slots: {
        default: [stub('foo'), stub('bar')]
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    expect(wrapper.vm.radios.length).toBe(2)

    const radios = wrapper.find(VRadio)
    const one = radios[0]
    const two = radios[1]
    const inputOne = one.first('input')
    const inputTwo = two.first('input')

    inputOne.trigger('focus')
    inputOne.trigger('change')

    expect(one.vm.isActive).toBe(true)

    wrapper.setProps({ disabled: true })

    inputTwo.trigger('focus')
    inputTwo.trigger('change')

    await wrapper.vm.$nextTick()

    expect(one.vm.isActive).toBe(true)
    expect(two.vm.isActive).toBe(false)
    expect(change).toHaveBeenCalledTimes(1)
    expect(change).toHaveBeenCalledWith('foo')
  })

  it('should toggle radio - objects', async () => {
    const stub = value => ({
      extends: VRadio,
      props: {
        value: {
          default: value
        }
      }
    })
    const wrapper = mount(VRadioGroup, {
      attachToDocument: true,
      slots: {
        default: [stub(() => ({a: 1})), stub(() => ({b: 2}))]
      }
    })

    expect(wrapper.vm.radios.length).toBe(2)

    const radios = wrapper.find(VRadio)
    const one = radios[0]
    const two = radios[1]

    expect(wrapper.vm.internalValue).toBe(null)
    expect(one.vm.isActive).toBe(false)
    expect(two.vm.isActive).toBe(false)

    wrapper.setProps({ value: {a: 1} })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual({a: 1})
    expect(one.vm.isActive).toBe(true)
    expect(two.vm.isActive).toBe(false)

    wrapper.setProps({ value: {b: 2} })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual({b: 2})
    expect(one.vm.isActive).toBe(false)
    expect(two.vm.isActive).toBe(true)

    wrapper.setProps({ value: {a: 1, b: 2} })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual({a: 1, b: 2})
    expect(one.vm.isActive).toBe(false)
    expect(two.vm.isActive).toBe(false)
  })

  it('should change selected radio', async () => {
    const wrapper = mount(VRadioGroup, {
      attachToDocument: true,
      slots: {
        default: [{
          functional: true,

          render: h => h(VRadio, {
            props: { value: 'foo' }
          })
        }]
      }
    })

    const radio = wrapper.first(VRadio)

    expect(wrapper.vm.internalValue).toBe(null)
    expect(radio.vm.isActive).toBe(false)

    wrapper.setProps({ value: 'foo' })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe('foo')
    expect(radio.vm.isActive).toBe(true)
  })

  it('should have custom tabindex', () => {
    const wrapper = mount(VRadioGroup, {
      slots: {
        default: [{
          functional: true,

          render: h => h(VRadio, {
            attrs: {
              tabindex: 2
            }
          })
        }]
      }
    })

    const input = wrapper.first('input')

    expect(input.element.tabIndex).toBe(2)
  })

  it('should unregister radios that are removed', () => {
    const wrapper = mount(VRadioGroup, {
      slots: {
        default: [{
          functional: true,
          render: h => h(VRadio)
        }]
      }
    })

    const radio = wrapper.first(VRadio)

    expect(wrapper.vm.radios.length).toBe(1)

    radio.vm.$destroy()

    expect(wrapper.vm.radios.length).toBe(0)
  })

  it('should validate on blur', async () => {
    const wrapper = mount(VRadioGroup, {
      slots: {
        default: [{
          extends: VRadio
        }]
      }
    })

    const blur = jest.fn()
    const event = jest.fn()
    const input = wrapper.first('input')
    wrapper.vm.$on('blur', blur)
    wrapper.vm.$on('input', event)

    expect(wrapper.vm.shouldValidate).toBe(false)

    input.trigger('focus')
    input.trigger('blur')

    expect(blur).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.shouldValidate).toBe(true)

    wrapper.setData({ hasInput: false })

    wrapper.vm.onRadioBlur({
      relatedTarget: {
        classList: {
          contains: () => false
        }
      }
    })

    expect(blur).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.shouldValidate).toBe(true)

    wrapper.setData({ hasInput: false })

    wrapper.vm.onRadioBlur({
      relatedTarget: {
        classList: {
          contains: () => true
        }
      }
    })

    expect(blur).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.shouldValidate).toBe(false)
  })

  // https://github.com/vuetifyjs/vuetify/issues/3299
  it('should call/update validation for dynamic model', async () => {
    const wrapper = mount(VRadioGroup, {
      propsData: {
        rules: [v => !!v || 'Foobar'],
        value: null
      },
      slots: {
        default: [
          {
            extends: VRadio,
            props: {
              value: {
                default: 'Single'
              }
            }
          },
          {
            extends: VRadio,
            props: {
              value: {
                default: 'Double'
              }
            }
          }
        ]
      }
    })

    const radio = wrapper.first(VRadio)
    const input = radio.first('input')

    expect(wrapper.vm.shouldValidate).toBe(false)

    input.trigger('focus')
    input.trigger('blur')

    expect(wrapper.vm.shouldValidate).toBe(true)
  })

  it('should make radios disabled', async () => {
    const wrapper = mount(VRadioGroup, {
      propsData: {
        disabled: true
      },
      slots: {
        default: [VRadio]
      }
    })

    const onChange = jest.fn()
    const radio = wrapper.first(VRadio)
    const input = radio.first('input')
    radio.vm.$on('change', onChange)
    radio.first('input').trigger('change')
    expect(onChange).not.toBeCalled()
    expect(input.html()).toMatchSnapshot()
  })

  it('should make radios readonly', async () => {
    const wrapper = mount(VRadioGroup, {
      propsData: {
        readonly: true
      },
      slots: {
        default: [VRadio]
      }
    })

    const onChange = jest.fn()
    const radio = wrapper.first(VRadio)
    radio.vm.$on('change', onChange)
    radio.first('input').trigger('change')
    expect(onChange).not.toBeCalled()
  })

  it('should reset', async () => {
    const wrapper = mount(VRadioGroup, {
      propsData: {
        value: '0'
      },
      slots: {
        default: [VRadio]
      }
    })
    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.vm.reset()
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledTimes(1)
    expect(change).toHaveBeenCalledWith(undefined)
  })
})
