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
      inject: ['isMandatory'],
      render: h => null
    }
    const wrapper = mount(VRadioGroup, {
      slots: {
        default: [stub]
      }
    })

    const find = wrapper.first(stub)

    expect(find.vm.isMandatory()).toBe(true)

    wrapper.setProps({ mandatory: false })

    expect(find.vm.isMandatory()).toBe(false)
  })

  it('should toggle radio', async () => {
    const stub = value => ({
      functional: true,

      render: h => h(VRadio, {
        props: { value }
      })
    })
    const wrapper = mount(VRadioGroup, {
      attachToDocument: true,
      slots: {
        default: [stub('foo'), stub('bar')]
      }
    })

    expect(wrapper.vm.radios.length).toBe(2)

    const radios = wrapper.find(VRadio)
    const one = radios[0]
    const two = radios[1]
    const inputOne = one.first('input')
    const inputTwo = two.first('input')

    inputOne.trigger('focus')
    inputOne.trigger('keydown.enter')

    expect(one.vm.isActive).toBe(true)

    wrapper.setProps({ disabled: true })

    inputTwo.trigger('focus')
    inputTwo.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(one.vm.isActive).toBe(true)
    // expect(two.vm.isActive).toBe(false) // fix this
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

    expect(wrapper.vm.internalValue).toBe(undefined)
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
})
