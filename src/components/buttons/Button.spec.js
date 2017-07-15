import { mount, shallow } from 'avoriaz'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue/dist/vue.common'
import Button from 'src/components/buttons/Button'
import ripple from 'src/directives/ripple'
import VueRouter from 'vue-router'

Button.directives = {
  ripple
}

const stub = {
  name: 'router-link',
  render: h => h('button'),
}

describe('Button.vue', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(Button)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an <a> tag when using href prop', () => {
    const wrapper = mount(Button, {
      propsData: {
        href: 'http://www.google.com'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.hasAttribute('href', 'http://www.google.com')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a <button> tag when using to prop', () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)

    const wrapper = mount(Button, {
      propsData: {
        to: '/home'
      },
      instance
    })

    expect(wrapper.is('button')).toBe(true)
    expect(wrapper.vm.$props.to).toBe('/home')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render specified tag when using tag prop', () => {
    const wrapper = mount(Button, {
      propsData: {
        tag: 'a'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should throw warning when using deprecated router prop', () => {
    global.console = { warn: jest.fn() }

    const instance = Vue.extend()
    instance.component('router-link', stub)

    const wrapper = mount(Button, {
      propsData: {
        to: '/home',
        router: true
      },
      instance
    })

    expect(console.warn).toBeCalled()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
