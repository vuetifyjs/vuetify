import { test } from '@/test'
import Vue from 'vue'
import VBtn from '@/components/VBtn'
import VProgressCircular from '@/components/VProgressCircular'

const stub = {
  name: 'router-link',
  render: h => h('button')
}

test('VBtn.js', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VBtn)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color prop and match snapshot', () => {
    const wrapper1 = mount(VBtn, {
      propsData: {
        color: 'green darken-1'
      }
    })

    expect(wrapper1.html()).toMatchSnapshot()

    const wrapper2 = mount(VBtn, {
      propsData: {
        color: 'green darken-1',
        flat: true
      }
    })

    expect(wrapper2.html()).toMatchSnapshot()
  })

  it('should render component with loader slot and match snapshot', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        loading: true
      },
      slots: {
        loader: [compileToFunctions('<span>loader</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with loader and match snapshot', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        loading: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an <a> tag when using href prop', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        href: 'http://www.google.com'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.getAttribute('href')).toBe('http://www.google.com')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a <button> tag when using to prop', () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)

    const wrapper = mount(VBtn, {
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
    const wrapper = mount(VBtn, {
      propsData: {
        tag: 'a'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should register and unregister', () => {
    const register = jest.fn()
    const unregister = jest.fn()

    const wrapper = mount(VBtn, {
      provide: {
        btnToggle: {
          register: register,
          unregister: unregister
        }
      }
    })

    expect(register).toHaveBeenCalled()
    wrapper.destroy()
    expect(unregister).toHaveBeenCalled()
  })

  it('should emit a click event', async () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)

    const wrapper = mount(VBtn, {
      propsData: {
        href: '#!'
      },
      instance
    })

    const click = jest.fn()
    wrapper.vm.$on('click', click)
    wrapper.trigger('click')

    wrapper.setProps({ href: undefined, to: '/foo' })
    wrapper.trigger('click')

    expect(click.mock.calls.length).toBe(2)
  })

  it('should use custom active-class', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        inputValue: true,
        activeClass: 'foo'
      }
    })

    expect(wrapper.hasClass('foo')).toBe(true)
  })

  it('should have v-btn--depressed class when using depressed prop', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        depressed: true
      }
    })

    expect(wrapper.hasClass('v-btn--depressed')).toBe(true)
  })

  it('should have v-btn--flat class when using flat and depressed props', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        depressed: true,
        flat: true
      }
    })

    expect(wrapper.hasClass('v-btn--flat')).toBe(true)
  })

  it('should have v-btn--outline and v-btn--depressed classes when using outline prop', () => {
    const wrapper = mount(VBtn, {
      propsData: {
        outline: true
      }
    })

    expect(wrapper.hasClass('v-btn--outline')).toBe(true)
    expect(wrapper.hasClass('v-btn--depressed')).toBe(true)
  })
})
