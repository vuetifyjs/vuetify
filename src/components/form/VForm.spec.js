import Vue from 'vue'
import { mount } from 'avoriaz'
import { test } from '~util/testing'
import VTextField from '~components/text-fields/VTextField'
import VForm from '~components/form/VForm'

const inputOne = Vue.component('input-one', {
  render (h) {
    return h(VTextField, {
      propsData: [(v) => !!v || 'Required']
    })
  }
})

/*
test('VForm.js', () => {
})
*/
