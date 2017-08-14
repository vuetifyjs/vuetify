import Vue from 'vue'
import { mount } from 'avoriaz'
import { test } from '~util/testing'
import VTextField from '~components/VTextField'
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

  })
})
