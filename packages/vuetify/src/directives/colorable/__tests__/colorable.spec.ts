// Libraries
import Vue from 'vue'

// Directives
import Colorable from '../'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

interface BorderModifiers {
  top?: Boolean
  right?: Boolean
  bottom?: Boolean
  left?: Boolean
}

describe('colorable.ts', () => {
  let mountFunction: () => Wrapper<Instance>

  describe('Color', () => {
    beforeEach(() => {
      mountFunction = () => {
        return mount(Vue.component('test', {
          directives: { ...Colorable },
          data: () => ({
            color: '',
          }),
          render (h) {
            const data = {
              directives: [{
                name: 'color',
                value: this.color,
              }],
            }
            return h('div', data)
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

    it('should update element styles reactively', async () => {
      const wrapper = mountFunction()

      wrapper.setData({ color: '#01f' })
      expect(wrapper.element.style.color).toEqual('rgb(0, 17, 255)')
      expect(wrapper.element.style.caretColor).toEqual('#01f')

      wrapper.setData({ color: 'rgba(0, 1, 2, 0.5)' })
      expect(wrapper.element.style.color).toEqual('rgba(0, 1, 2, 0.5)')
      expect(wrapper.element.style.caretColor).toEqual('rgba(0, 1, 2, 0.5)')
    })

    it('should set element styles with theme color', async () => {
      const wrapper = mountFunction()

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

  describe('BgColor', () => {
    beforeEach(() => {
      mountFunction = () => {
        return mount(Vue.component('test', {
          directives: { ...Colorable },
          data: () => ({
            color: '',
          }),
          render (h) {
            const data = {
              directives: [{
                name: 'bgColor',
                value: this.color,
              }],
            }
            return h('div', data)
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

    it('should update element styles reactively', async () => {
      const wrapper = mountFunction()

      wrapper.setData({ color: '#01f' })
      expect(wrapper.element.style.backgroundColor).toEqual('rgb(0, 17, 255)')
      expect(wrapper.element.style.borderColor).toEqual('#01f')

      wrapper.setData({ color: 'rgb(255, 255, 0)' })
      expect(wrapper.element.style.backgroundColor).toEqual('rgb(255, 255, 0)')
      expect(wrapper.element.style.borderColor).toEqual('rgb(255, 255, 0)')
    })

    it('should set element styles with theme color', async () => {
      const wrapper = mountFunction()

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

  describe('BorderColor', () => {
    beforeEach(() => {
      mountFunction = (modifiers?: BorderModifiers) => {
        return mount(Vue.component('test', {
          directives: { ...Colorable },
          data: () => ({
            color: '',
          }),
          render (h) {
            const data = {
              directives: [{
                name: 'borderColor',
                value: this.color,
                modifiers,
              }],
            }
            return h('div', data)
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

    it('should update element styles reactively', async () => {
      const wrapper = mountFunction()

      wrapper.setData({ color: '#01f' })
      expect(wrapper.element.style.borderColor).toEqual('#01f')

      wrapper.setData({ color: 'rgb(255, 255, 0)' })
      expect(wrapper.element.style.borderColor).toEqual('rgb(255, 255, 0)')
    })

    it('should set element styles with theme color', async () => {
      const wrapper = mountFunction()

      wrapper.setData({ color: 'red' })
      expect(wrapper.element.style.borderColor).toEqual('#f44336')

      wrapper.setData({ color: 'red lighten-1' })
      expect(wrapper.element.style.borderColor).toEqual('#ef5350')

      wrapper.setData({ color: 'primary' })
      expect(wrapper.element.style.borderColor).toEqual('#1976d2')
    })

    it('should respect border top modifier', async () => {
      const wrapper = mountFunction({ top: true })

      wrapper.setData({ color: '#fff' })
      expect(wrapper.element.style.borderTopColor).toEqual('#fff')
      expect(wrapper.element.style.borderColor).toEqual('')
    })

    it('should respect border right modifier', async () => {
      const wrapper = mountFunction({ right: true })

      wrapper.setData({ color: '#fff' })
      expect(wrapper.element.style.borderRightColor).toEqual('#fff')
      expect(wrapper.element.style.borderColor).toEqual('')
    })

    it('should respect border bottom modifier', async () => {
      const wrapper = mountFunction({ bottom: true })

      wrapper.setData({ color: '#fff' })
      expect(wrapper.element.style.borderBottomColor).toEqual('#fff')
      expect(wrapper.element.style.borderColor).toEqual('')
    })

    it('should respect border left modifier', async () => {
      const wrapper = mountFunction({ left: true })

      wrapper.setData({ color: '#fff' })
      expect(wrapper.element.style.borderLeftColor).toEqual('#fff')
      expect(wrapper.element.style.borderColor).toEqual('')
    })

    it('should respect a combination of border modifiers', async () => {
      const wrapper = mountFunction({ top: true, right: true, left: true })

      wrapper.setData({ color: '#fff' })
      expect(wrapper.element.style.borderTopColor).toEqual('#fff')
      expect(wrapper.element.style.borderRightColor).toEqual('#fff')
      expect(wrapper.element.style.borderLeftColor).toEqual('#fff')
      expect(wrapper.element.style.borderBottomColor).toEqual('')
      expect(wrapper.element.style.borderColor).toEqual('')
    })
  })
})
