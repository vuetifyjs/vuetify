// Libraries
import Vue from 'vue'

// Directives
import Ripple from '../'

// Utilities
import {
  mount,
} from '@vue/test-utils'

describe('ripple.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>

  beforeEach(() => {
    jest.useFakeTimers()

    mountFunction = (options = {}) => {
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

      return mount(testComponent, options)
    }
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render element with ripple enabled if no value is passed', () => {
    const wrapper = mountFunction()

    const div = wrapper.find('div')
    expect(div.element['_ripple'].enabled).toBe(true)
  })

  it('should update element property reactively', () => {
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

  it('should trigger ripple on mousedown', () => {
    const wrapper = mountFunction()

    const mousedownEvent = new MouseEvent('mousedown', { detail: 1 })
    wrapper.element.dispatchEvent(mousedownEvent)

    expect(wrapper.find('.v-ripple__container').exists()).toBe(true)

    const mouseupEvent = new MouseEvent('mouseup', { detail: 1 })
    wrapper.element.dispatchEvent(mouseupEvent)

    jest.runAllTimers()
    expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  })

  it('should trigger ripple on enter key press', () => {
    const wrapper = mountFunction()

    const keydownEvent = new KeyboardEvent('keydown', { keyCode: 13 })
    wrapper.element.dispatchEvent(keydownEvent)

    expect(wrapper.find('.v-ripple__container').exists()).toBe(true)

    const keyupEvent = new KeyboardEvent('keyup')
    wrapper.element.dispatchEvent(keyupEvent)

    jest.runAllTimers()
    expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  })

  it('should trigger ripple on space key press', () => {
    const wrapper = mountFunction()

    const keydownEvent = new KeyboardEvent('keydown', { keyCode: 32 })
    wrapper.element.dispatchEvent(keydownEvent)

    expect(wrapper.find('.v-ripple__container').exists()).toBe(true)

    const keyupEvent = new KeyboardEvent('keyup')
    wrapper.element.dispatchEvent(keyupEvent)

    jest.runAllTimers()
    expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  })
})
