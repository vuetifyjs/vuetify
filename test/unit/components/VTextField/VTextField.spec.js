import { test } from '@/test'
import Vue from 'vue/dist/vue.common'
import VTextField from '@/components/VTextField/VTextField'
import VProgressLinear from '@/components/VProgressLinear'

test('VTextField.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VTextField)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should pass events to internal input field', () => {
    const keyup = jest.fn()
    const component = {
      render (h) {
        return h(VTextField, { on: { keyUp: keyup }, props: { download: '' }, attrs: {} })
      }
    }
    const wrapper = mount(component)

    const input = wrapper.find('input')[0]
    input.trigger('keyUp', { keyCode: 65 })

    expect(keyup).toBeCalled()
  })

  it('should render aria-label attribute on text field element with label value and no id', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    })

    const inputGroup = wrapper.find('input')[0]
    expect(inputGroup.getAttribute('aria-label')).toBe('Test')
  })

  it('should not render aria-label attribute on text field element with no label value or id', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        label: null
      },
      attrs: {}
    })

    const inputGroup = wrapper.find('input')[0]
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
  })

  it('should not render aria-label attribute on text field element with id', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        label: 'Test'
      },
      attrs: {
        id: 'Test'
      }
    })

    const inputGroup = wrapper.find('input')[0]
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
  })

  it('should start out as invalid', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        rules: [(v) => !!v || 'Required']
      }
    })

    expect(wrapper.data().valid).toEqual(false)
  })

  it('should start validating on input', async () => {
    const wrapper = mount(VTextField, {})

    expect(wrapper.data().shouldValidate).toEqual(false)
    wrapper.setProps({ value: 'asd' })
    await wrapper.vm.$nextTick()
    expect(wrapper.data().shouldValidate).toEqual(true)
  })

  it('should not start validating on input if validate-on-blur prop is set', async () => {
    const wrapper = mount(VTextField, {
      propsData: {
        validateOnBlur: true
      }
    })

    expect(wrapper.data().shouldValidate).toEqual(false)
    wrapper.setProps({ value: 'asd' })
    await wrapper.vm.$nextTick()
    expect(wrapper.data().shouldValidate).toEqual(false)
  })

  it('should not display counter when set to false', async () => {
    const wrapper = mount(VTextField, {
      propsData: {
        counter: true
      },
      attrs: {
        maxlength: 50
      }
    })

    expect(wrapper.find('.v-counter')[0]).not.toBe(undefined)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ counter: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-counter')[0]).toBe(undefined)
  })

  it('should have readonly attribute', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        readonly: true
      }
    })

    const input = wrapper.find('input')[0]

    expect(input.getAttribute('readonly')).toBe('readonly')
  })

  it('should clear input value', async () => {
    const wrapper = mount(VTextField, {
      propsData: {
        clearable: true,
        value: 'foo'
      }
    })

    const clear = wrapper.find('.v-input__icon--clear .icon')[0]
    const input = jest.fn()
    wrapper.vm.$on('input', input)

    expect(wrapper.vm.internalValue).toBe('foo')

    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(null)
  })

  it('should not clear input if not clearable and has appended icon (with callback)', async () => {
    const appendIconCb = jest.fn()
    const wrapper = mount(VTextField, {
      propsData: {
        value: 'foo',
        appendIcon: 'block',
        appendIconCb
      }
    })

    const icon = wrapper.find('.v-input__icon--append .icon')[0]
    icon.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe('foo')
    expect(appendIconCb.mock.calls).toHaveLength(1)
  })

  it('should not clear input if not clearable and has appended icon (without callback)', async () => {
    const wrapper = mount(VTextField, {
      propsData: {
        value: 'foo',
        appendIcon: 'block',
      }
    })

    const icon = wrapper.find('.v-input__icon--append .icon')[0]
    icon.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe('foo')
  })

  it('should start validating on blur', async () => {
    const wrapper = mount(VTextField, {})

    const input = wrapper.find('input')[0]
    expect(wrapper.data().shouldValidate).toEqual(false)
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.data().shouldValidate).toEqual(true)
  })

  it('should keep its value on blur', async () => {
    const wrapper = mount(VTextField, {
      propsData: {
        value: 'asd'
      }
    })

    const input = wrapper.find('input')[0]

    input.element.value = 'fgh'
    input.trigger('input')
    input.trigger('blur')

    expect(input.element.value).toBe('fgh')
  })

  it('should update if value is changed externally', async () => {
    const wrapper = mount(VTextField, {})

    const input = wrapper.find('input')[0]

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
            input: (i) => value = i,
            change
          },
          props: { value }
        })
      }
    }
    const wrapper = mount(component)

    const input = wrapper.find('input')[0]

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.element.value = 'fgh'
    input.trigger('input')

    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith('fgh')
    expect(change.mock.calls).toHaveLength(1)
  })

  it('should not make prepend icon clearable', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        prependIcon: 'check',
        appendIcon: 'check',
        value: 'test',
        clearable: true
      }
    })

    const prepend = wrapper.find('.v-input__icon--append .icon')[0]
    expect(prepend.text()).toBe('check')
    expect(prepend.element.classList).not.toContain('input-group__icon-cb')
  })

  it('should not emit change event if value has not changed', async () => {
    const change = jest.fn()
    let value = 'test'
    const component = {
      render (h) {
        return h(VTextField, {
          on: {
            input: i => value = i,
            change
          },
          props: { value }
        })
      }
    }
    const wrapper = mount(component)

    const input = wrapper.find('input')[0]

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(change.mock.calls).toHaveLength(0)
  })

  it('should render component with async loading and match snapshot', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        loading: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with async loading and custom progress and match snapshot', () => {
    const progress = Vue.component('test', {
      render (h) {
        return h(VProgressLinear, {
          props: {
            indeterminate: true,
            height: 7,
            color: 'orange'
          }
        })
      }
    })

    const wrapper = mount(VTextField, {
      propsData: {
        loading: true
      },
      slots: {
        progress: [progress]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display the number 0', async () => {
    const wrapper = mount(VTextField, {
      propsData: { value: 0 }
    })

    expect(wrapper.vm.$refs.input.value).toBe('0')
  })

  it('should reset internal change on blur', async () => {
    const wrapper = mount(VTextField)

    wrapper.setProps({ value: 'foo' })
    wrapper.vm.internalChange = true
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalChange).toBe(true)
    wrapper.vm.onBlur()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalChange).toBe(false)
  })

  it('should emit input when externally set value was modified internally', async () => {
    let value = '33'
    const input = jest.fn()
    const wrapper = mount(VTextField, {
      propsData: {
        value,
        mask: '##',
        returnMaskedValue: true
      }
    })

    wrapper.vm.$on('input', (v) => {
      value = v
    })
    wrapper.vm.$on('input', input)

    wrapper.setProps({ value: '4444' })
    await wrapper.vm.$nextTick()

    expect(value).toBe('44')
    expect(input).toBeCalled()
  })

  it('should mask value if return-masked-value is true', async () => {
    let value = '44'
    const component = {
      render (h) {
        return h(VTextField, {
          on: {
            input: i => value = i
          },
          props: {
            value,
            returnMaskedValue: true,
            mask: '#-#',
          }
        })
      }
    }

    const wrapper = mount(component)
    const input = wrapper.find('input')[0]

    expect(value).toBe('4-4')

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.element.value = '33'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(value).toBe('3-3')
  })

  it('should not mask value if return-masked-value is false', async () => {
    let value = '44'
    const component = {
      render (h) {
        return h(VTextField, {
          on: {
            input: i => value = i
          },
          props: {
            value,
            returnMaskedValue: false,
            mask: '#-#',
          }
        })
      }
    }

    const wrapper = mount(component)
    const input = wrapper.find('input')[0]

    expect(value).toBe('44')

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.element.value = '33'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(value).toBe('33')
  })

  it('should use pre-defined mask if prop matches', async () => {
    let value = '12311999'
    const component = {
      render (h) {
        return h(VTextField, {
          on: {
            input: i => value = i
          },
          props: {
            value,
            returnMaskedValue: true,
            mask: 'date',
          }
        })
      }
    }

    const wrapper = mount(component)

    expect(value).toBe('12/31/1999')
  })

  it('should allow switching mask', async () => {
    const wrapper = mount(VTextField, {
      propsData: {
        mask: '#-#-#',
        value: '1-2-3'
      }
    })

    const input = wrapper.find('input')[0]

    expect(input.element.value).toBe('1-2-3')

    wrapper.setProps({ mask: '#.#.#'})
    await wrapper.vm.$nextTick()

    expect(input.element.value).toBe('1.2.3')

    wrapper.setProps({ mask: '#,#' })
    await wrapper.vm.$nextTick()

    expect(input.element.value).toBe('1,2')
  })

  it('should autofocus', async () => {
    const wrapper = mount(VTextField, {
      attachToDocument: true,
      propsData: {
        autofocus: true
      }
    })

    const focus = jest.fn()
    wrapper.vm.$on('focus', focus)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(true)
    wrapper.vm.onClick()

    expect(focus.mock.calls.length).toBe(0)

    wrapper.setData({ isFocused: false })

    wrapper.vm.onClick()
    expect(focus.mock.calls.length).toBe(1)

    wrapper.setProps({ disabled: true })

    wrapper.setData({ isFocused: false })

    wrapper.vm.onClick()
    expect(focus.mock.calls.length).toBe(1)

    wrapper.setProps({ disabled: false })

    wrapper.vm.onClick()
    expect(focus.mock.calls.length).toBe(2)

    delete wrapper.vm.$refs.input

    wrapper.vm.onFocus()
    expect(focus.mock.calls.length).toBe(2)
  })

  it('should have prefix and suffix', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        prefix: '$',
        suffix: '.com'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should calculate element height when using auto-grow prop', async () => {
    let value = ''
    const component = {
      render (h) {
        return h(VTextField, {
          on: {
            input: i => value = i
          },
          props: {
            value,
            multiLine: true,
            autoGrow: true
          }
        })
      }
    }

    const wrapper = mount(component)
    const input = wrapper.find('textarea')[0]

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.element.value = 'this is a really long text that should hopefully make auto-grow kick in. maybe?'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(input.element.style.getPropertyValue('height').length).not.toBe(0)
  })

  it.skip('should match multi-line snapshot', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        multiLine: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should match textarea snapshot', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        textarea: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should match auto-grow snapshot', async () => {
    const wrapper = mount(VTextField, {
      propsData: {
        textarea: true,
        autoGrow: true
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should render no-resize the same if already auto-grow', () => {
    const wrappers = [
      { autoGrow:true, multiLine: true },
      { autoGrow:true, textarea: true }
    ].map(propsData => mount(VTextField,{propsData}))

    wrappers.forEach(async wrapper => {
      await wrapper.vm.$nextTick()
      const html1 = wrapper.html()

      wrapper.setProps({ noResize: true })
      // will still pass without this, do not remove
      await wrapper.vm.$nextTick()
      const html2 = wrapper.html()

      expect(html2).toBe(html1)
    })
  })

  it('render active label for dirtyTypes (time/date/color/etc)', () => {
    const wrapper = mount(VTextField, {
      propsData: {
        type: "time"
      }
    })

    expect(wrapper.element.classList).toContain('v-input--is-label-active')
  })
})
