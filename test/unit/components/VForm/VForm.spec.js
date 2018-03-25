import Vue from 'vue'
import { test } from '@/test'
import VTextField from '@/components/VTextField'
import VBtn from '@/components/VBtn'
import VForm from '@/components/VForm'

const inputOne = Vue.component('input-one', {
  render (h) {
    return h(VTextField, {
      propsData: [(v) => !!v || 'Required']
    })
  }
})

test('VForm.js', ({ mount }) => {
  it('should pass on listeners to form element', async () => {
    const submit = jest.fn()
    const component = Vue.component('test', {
      render (h) {
        return h(VForm, {
          on: {
            submit
          }
        }, [
          h(VBtn, {
            props: {
              type: 'submit'
            },
            slot: 'default'
          }, ['Submit'])
        ])
      }
    })

    const wrapper = mount(component)

    const btn = wrapper.find('button')[0]

    btn.trigger('click')

    expect(submit).toBeCalled()
  })

  it('should watch the error bag', async () => {
    const wrapper = mount(VForm)

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    Vue.set(wrapper.vm.errorBag, 'foo', true)
    await Vue.nextTick()
    expect(input).toBeCalledWith(false)

    Vue.set(wrapper.vm.errorBag, 'foo', false)
    await Vue.nextTick()
    expect(input).toBeCalledWith(true)
  })

  it('should register input child', async () => {
    const wrapper = mount(VForm, {
      slots: {
        default: [VTextField]
      }
    })

    expect(wrapper.vm.inputs.length).toBe(1)
    wrapper.vm.watchInputs()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputs.length).toBe(1)
  })

  it.skip('should only watch children if not lazy', async () => {
    const wrapper = mount(VForm, {
      propsData: {
        lazyValidation: true
      },
      slots: {
        default: [VTextField]
      }
    })

    const input = wrapper.vm.getInputs()[0]
    wrapper.vm.watchChild(input)
    input.shouldValidate = true
    wrapper.vm.watchChild(input)
    await wrapper.vm.$nextTick()

    // beware, depends on number of computeds in VTextField
    const watchers = 28
    expect(input._watchers.length).toBe(watchers)
    input.shouldValidate = false
    wrapper.vm.watchChild(input)
    await wrapper.vm.$nextTick()

    expect(input._watchers.length).toBe(watchers + 1)
    input.shouldValidate = true
    await wrapper.vm.$nextTick()

    expect(Object.keys(wrapper.vm.errorBag).length).toBe(1)
  })

  it.skip('should validate all inputs', async () => {
    const wrapper = mount(VForm, {
      slots: {
        default: [{
          render (h) {
            return h(VTextField, {
              props: {
                rules: [v => v === 1 || 'Error']
              }
            })
          }
        }]
      }
    })

    expect(wrapper.vm.validate()).toBe(false)
  })

  it.skip('should reset all inputs', async () => {
    const wrapper = mount(VForm, {
      slots: {
        default: [VTextField]
      }
    })

    const event = jest.fn()
    const input = wrapper.find(VTextField)[0]
    input.vm.$on('input', event)

    expect(Object.keys(wrapper.vm.errorBag).length).toBe(1)
    wrapper.vm.reset()

    expect(Object.keys(wrapper.vm.errorBag).length).toBe(1)
    expect(event).toHaveBeenCalledWith(null)

    wrapper.setProps({ lazyValidation: true })
    expect(Object.keys(wrapper.vm.errorBag).length).toBe(1)

    wrapper.vm.reset()
    expect(Object.keys(wrapper.vm.errorBag).length).toBe(0)
  })

  it.skip('should update inputs when updated lifecycle hook is called', async () => {
    const wrapper = mount(VForm, {
      slots: {
        default: [VTextField]
      }
    })

    const input = wrapper.find(VTextField)[0]
    expect(wrapper.vm.inputs.length).toBe(1)
    input.vm.$destroy()
    wrapper.update()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputs.length).toBe(0)
  })
})
