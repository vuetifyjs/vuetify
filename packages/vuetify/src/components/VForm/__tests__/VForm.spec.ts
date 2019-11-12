import Vue from 'vue'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import VTextField from '../../VTextField'
import VBtn from '../../VBtn'
import VForm from '../VForm'

const inputOne = Vue.component('input-one', {
  render (h) {
    return h(VTextField, {
      props: [v => !!v || 'Required'],
    })
  },
})

describe('VForm.ts', () => {
  type Instance = InstanceType<typeof VForm>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VForm, options)
    }
  })

  // TODO: event not bubbling or something
  it.skip('should pass on listeners to form element', async () => {
    const submit = jest.fn()
    const component = Vue.component('test', {
      render (h) {
        return h(VForm, {
          on: {
            submit,
          },
        }, [
          h('button', ['Submit']),
        ])
      },
    })

    const wrapper = mount(component)

    const btn = wrapper.find('button')

    btn.trigger('click')

    expect(submit).toHaveBeenCalled()
  })

  it('should watch the error bag', async () => {
    const wrapper = mountFunction()

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    Vue.set(wrapper.vm.errorBag, 'foo', true)
    await Vue.nextTick()
    expect(input).toHaveBeenCalledWith(false)

    Vue.set(wrapper.vm.errorBag, 'foo', false)
    await Vue.nextTick()
    expect(input).toHaveBeenCalledWith(true)
  })

  it('should register input child', async () => {
    const wrapper = mountFunction({
      slots: {
        default: [VTextField],
      },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputs).toHaveLength(1)
    expect(Object.keys(wrapper.vm.errorBag)).toHaveLength(1)
  })

  // TODO: Figure out how to test this with the updated v-form
  /*
  it.skip('should only watch children if not lazy', async () => {
    const wrapper = mountFunction({
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
    expect(input._watchers).toHaveLength(watchers)
    input.shouldValidate = false
    wrapper.vm.watchChild(input)
    await wrapper.vm.$nextTick()

    expect(input._watchers).toHaveLength(watchers + 1)
    input.shouldValidate = true
    await wrapper.vm.$nextTick()

    expect(Object.keys(wrapper.vm.errorBag)).toHaveLength(1)
  })
  */

  it('should emit input when calling validate on lazy-validated form', async () => {
    const wrapper = mountFunction({
      propsData: {
        lazyValidation: true,
      },
      slots: {
        default: [{
          render (h) {
            return h(VTextField, {
              props: {
                rules: [v => v === 1 || 'Error'],
              },
            })
          },
        }],
      },
    })

    const value = jest.fn()
    wrapper.vm.$on('input', value)

    expect(wrapper.vm.validate()).toBe(false)

    await wrapper.vm.$nextTick()

    expect(value).toHaveBeenCalledWith(false)
  })

  it('resetValidation should work', async () => {
    const wrapper = mountFunction({
      slots: {
        default: [VTextField],
      },
    })

    expect(Object.keys(wrapper.vm.errorBag)).toHaveLength(1)
    wrapper.vm.reset()

    expect(Object.keys(wrapper.vm.errorBag)).toHaveLength(1)

    wrapper.setProps({ lazyValidation: true })
    expect(Object.keys(wrapper.vm.errorBag)).toHaveLength(1)

    wrapper.vm.reset()
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(Object.keys(wrapper.vm.errorBag)).toHaveLength(0)
  })

  it('should register and unregister items', () => {
    const wrapper = mountFunction({
      slots: {
        default: [VTextField],
      },
    })

    expect(wrapper.vm.inputs).toHaveLength(1)

    const input = wrapper.vm.inputs[0]

    // Should not modify inputs if
    // does not exist
    wrapper.vm.unregister({ _uid: input._uid + 1 })

    expect(wrapper.vm.inputs).toHaveLength(1)

    wrapper.vm.unregister(input)

    expect(wrapper.vm.inputs).toHaveLength(0)

    // Add back input
    wrapper.vm.register(input)

    expect(wrapper.vm.inputs).toHaveLength(1)

    const shouldValidate = jest.fn()
    wrapper.vm.watchers[0].shouldValidate = shouldValidate

    wrapper.vm.unregister(input)

    expect(shouldValidate).toHaveBeenCalled()
  })

  it('should reset validation', async () => {
    const resetErrorBag = jest.fn()
    const wrapper = mountFunction({
      methods: { resetErrorBag },
      slots: {
        default: [VTextField],
      },
    })

    const spy = jest.spyOn(wrapper.vm.inputs[0], 'resetValidation')

    wrapper.vm.resetValidation()

    expect(spy).toHaveBeenCalled()
    expect(resetErrorBag).toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/7999
  it('should validate all inputs', async () => {
    const validate = jest.fn(() => false)
    const wrapper = mountFunction({
      slots: {
        default: [
          {
            render (h) {
              return h(VTextField, {
                props: {
                  rules: [v => v === 1 || 'Error'],
                },
              })
            },
          },
          {
            render (h) {
              return h(VTextField, {
                props: {
                  rules: [v => v === 1 || 'Error'],
                },
              })
            },
          },
        ],
      },
    })

    wrapper.vm.inputs.forEach(input => input.validate = validate)

    wrapper.vm.validate()

    await wrapper.vm.$nextTick()

    expect(validate).toHaveBeenCalledTimes(2)
  })
})
