// Vue
import Vue from 'vue'

// Directives
import Bg from '../'

// Utilities
import {
  mount,
} from '@vue/test-utils'

describe('bg.ts', () => {
  it('should set background color', async () => {
    const wrapper = mount(Vue.component('test', {
      directives: { Bg },
      data: () => ({
        color: '',
      }),
      render (h) {
        return h('div', {
          directives: [{
            name: 'bg',
            value: this.color,
          }],
        })
      },
    }), {
      mocks: {
        $vuetify: {
          theme: {
            currentTheme: {
              primary: '#1976d2',
            },
          },
        },
      },
    })

    wrapper.setData({ color: '#01f' })
    expect(wrapper.element.style.backgroundColor).toEqual('rgb(0, 17, 255)')
    expect(wrapper.element.style.borderColor).toEqual('#01f')

    wrapper.setData({ color: 'rgb(255, 255, 0)' })
    expect(wrapper.element.style.backgroundColor).toEqual('rgb(255, 255, 0)')
    expect(wrapper.element.style.borderColor).toEqual('rgb(255, 255, 0)')

    wrapper.setData({ color: 'red' })
    expect(wrapper.element.style.backgroundColor).toEqual('rgb(244, 67, 54)')
    expect(wrapper.element.style.borderColor).toEqual('#f44336')

    wrapper.setData({ color: 'red lighten-1' })
    expect(wrapper.element.style.backgroundColor).toEqual('rgb(239, 83, 80)')
    expect(wrapper.element.style.borderColor).toEqual('#ef5350')

    wrapper.setData({ color: 'primary' })
    expect(wrapper.element.style.backgroundColor).toEqual('rgb(25, 118, 210)')
    expect(wrapper.element.style.borderColor).toEqual('#1976d2')
  })
})
