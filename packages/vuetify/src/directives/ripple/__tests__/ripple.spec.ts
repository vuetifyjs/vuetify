// Libraries
import Vue from 'vue'

// Directives
import Ripple from '../'

// Utilities
import {
  mount,
} from '@vue/test-utils'

describe('ripple.ts', () => {
  it('Ripple with no value should render element with ripple enabled', () => {
    const testComponent = Vue.component('test', {
      directives: {
        Ripple,
      },
      render (h) {
        const data = {
          directives: [{
            name: 'ripple',
          }],
        }
        return h('div', data)
      },
    })

    const wrapper = mount(testComponent)

    const div = wrapper.find('div')
    expect(div.element['_ripple'].enabled).toBe(true)
  })

  it('Ripple should update element property reactively', () => {
    const testComponent = Vue.component('test', {
      directives: {
        Ripple,
      },
      props: {
        ripple: Boolean,
        default: () => false,
      },
      render (h) {
        const data = {
          directives: [{
            name: 'ripple',
            value: this.ripple,
          }],
        }
        return h('div', data)
      },
    })

    const wrapper = mount(testComponent, {
      propsData: {
        ripple: true,
      },
    })

    const div = wrapper.find('div')
    expect(div.element['_ripple'].enabled).toBe(true)

    wrapper.setProps({ ripple: false })
    expect(div.element['_ripple'].enabled).toBe(false)

    wrapper.setProps({ ripple: true })
    expect(div.element['_ripple'].enabled).toBe(true)
  })
})
