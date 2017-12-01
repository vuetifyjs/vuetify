import Vue from 'vue'
import { test } from '~util/testing'
import VTextField from '~components/VTextField'
import VBtn from '~components/VBtn'
import VForm from './VForm'

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
})
