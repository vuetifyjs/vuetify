// Vue
import Vue from 'vue'

// Directives
import Color from '../'

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
        directives: { Color },
        data: () => ({
          color: '',
        }),
        render (h) {
          return h('div', {
            directives: [{
              ...directive,
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

  it('should set background color', async () => {
    const wrapper = mountFunction({
      name: 'color',
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

  it('should set text color', async () => {
    const wrapper = mountFunction({
      name: 'color',
      arg: 'text',
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

  it('should set border color', async () => {
    const wrapper = mountFunction({
      name: 'color',
      arg: 'border',
    })

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
      name: 'color',
      arg: 'border',
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
