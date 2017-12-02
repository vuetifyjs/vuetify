import Vue from 'vue'
import { test } from '~util/testing'
import Ripple from '~directives/ripple'

test('VRipple', ({ mount }) => {
  it('Ripple with no value should render data attribute true', () => {
    const testComponent = Vue.component('test', {
      directives: {
        Ripple
      },
      render (h){
        const data = {
          directives: [{
            name: 'ripple'
          }]
        }
        return h('div', data)
      }
    })

    const wrapper = mount(testComponent)

    const div = wrapper.find('div')[0]
    expect(div.getAttribute('data-ripple')).toBe('true')
  })

  it('Ripple should update data attribute reactively', () => {
    const testComponent = Vue.component('test', {
      directives: {
        Ripple
      },
      props: {
        ripple: Boolean,
        default: false
      },
      render (h){
        const data = {
          directives: [{
            name: 'ripple',
            value: this.ripple
          }]
        }
        return h('div', data)
      }
    })

    const wrapper = mount(testComponent, {
      propsData: {
        ripple: true
      }
    })

    const div = wrapper.find('div')[0]
    expect(div.getAttribute('data-ripple')).toBe('true')

    wrapper.setProps({ ripple: false })
    expect(div.getAttribute('data-ripple')).toBe('false')

    wrapper.setProps({ ripple: true })
    expect(div.getAttribute('data-ripple')).toBe('true')
  })
})
