// Vue
import Vue from 'vue'

// Directives
import Color from '../'

// Utilities
import {
  mount,
} from '@vue/test-utils'

describe('color.ts', () => {
  it('should set text color', async () => {
    const wrapper = mount(Vue.component('test', {
      directives: { Color },
      data: () => ({
        color: '',
      }),
      render (h) {
        return h('div', {
          directives: [{
            name: 'color',
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
    expect(wrapper.element.style.color).toEqual('rgb(0, 17, 255)')
    expect(wrapper.element.style.caretColor).toEqual('#01f')

    wrapper.setData({ color: 'rgba(0, 1, 2, 0.5)' })
    expect(wrapper.element.style.color).toEqual('rgba(0, 1, 2, 0.5)')
    expect(wrapper.element.style.caretColor).toEqual('rgba(0, 1, 2, 0.5)')

    wrapper.setData({ color: 'red' })
    expect(wrapper.element.style.color).toEqual('rgb(244, 67, 54)')
    expect(wrapper.element.style.caretColor).toEqual('#f44336')

    wrapper.setData({ color: 'red lighten-1' })
    expect(wrapper.element.style.color).toEqual('rgb(239, 83, 80)')
    expect(wrapper.element.style.caretColor).toEqual('#ef5350')

    wrapper.setData({ color: 'primary' })
    expect(wrapper.element.style.color).toEqual('rgb(25, 118, 210)')
    expect(wrapper.element.style.caretColor).toEqual('#1976d2')
  })
})
