// Vue
import Vue from 'vue'

// Directives
import Border from '../'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('color.ts', () => {
  let mountFunction: () => Wrapper<Vue>

  beforeEach(() => {
    mountFunction = (directive = {}) => {
      return mount(Vue.component('test', {
        directives: { Border },
        data: () => ({
          color: '',
        }),
        render (h) {
          return h('div', {
            directives: [{
              ...directive,
              name: 'border',
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
    }
  })

  it('should set border color', async () => {
    const wrapper = mountFunction()

    wrapper.setData({ color: '#01f' })
    expect(wrapper.element.style.borderColor).toEqual('#01f')

    wrapper.setData({ color: 'rgb(255, 255, 0)' })
    expect(wrapper.element.style.borderColor).toEqual('rgb(255, 255, 0)')

    wrapper.setData({ color: 'red' })
    expect(wrapper.element.style.borderColor).toEqual('#f44336')

    wrapper.setData({ color: 'red lighten-1' })
    expect(wrapper.element.style.borderColor).toEqual('#ef5350')

    wrapper.setData({ color: 'primary' })
    expect(wrapper.element.style.borderColor).toEqual('#1976d2')
  })

  it('should respect border sides modifiers', async () => {
    const wrapper = mountFunction({
      modifiers: { top: true, right: true, left: true },
    })

    wrapper.setData({ color: '#fff' })
    expect(wrapper.element.style.borderTopColor).toEqual('#fff')
    expect(wrapper.element.style.borderRightColor).toEqual('#fff')
    expect(wrapper.element.style.borderLeftColor).toEqual('#fff')
    expect(wrapper.element.style.borderBottomColor).toEqual('')
    expect(wrapper.element.style.borderColor).toEqual('')
  })
})
