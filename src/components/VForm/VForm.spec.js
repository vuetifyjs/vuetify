import Vue from 'vue'
import { mount } from 'avoriaz'
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

test('VForm.js', () => {
  it('test', () => {
    // eslint-disable-next-line
    const wrapper = mount(VForm, {
      slots: {
        default: [inputOne]
      }
    })
  })

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
})
