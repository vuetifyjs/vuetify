// Libraries
import Vue from 'vue'

// Plugins
import Router from 'vue-router'

// Components
import VBtn from '../VBtn'

// Utilities
import {
  createLocalVue,
  shallowMount,
  mount,
  Wrapper
} from '@vue/test-utils'
import { compileToFunctions } from 'vue-template-compiler'

describe('VBtn.js', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let router: Router
  let localVue: typeof Vue

  beforeEach(() => {
    router = new Router()
    localVue = createLocalVue()
    localVue.use(Router)

    mountFunction = (options = {}) => {
      return shallowMount(VBtn, {
        localVue,
        router,
        ...options
      })
    }
  })

  it('should render component and match snapshot', () => {
    expect(mountFunction().html()).toMatchSnapshot()
  })

  it('should render component with color prop and match snapshot', () => {
    expect(mountFunction({
      propsData: {
        color: 'green darken-1'
      }
    }).html()).toMatchSnapshot()

    expect(mountFunction({
      propsData: {
        color: 'green darken-1',
        flat: true
      }
    }).html()).toMatchSnapshot()
  })

  it('should render component with loader slot and match snapshot', () => {
    const wrapper = mountFunction({
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
    const wrapper = mountFunction({
      propsData: {
        href: 'http://www.google.com'
      }
    })

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.vm.$el.getAttribute('href')).toBe('http://www.google.com')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render specified tag when using tag prop', () => {
    const wrapper = mountFunction({
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

    const wrapper = mountFunction({
      provide: {
        btnToggle: {
          register,
          unregister
        }
      }
    })

    expect(register).toHaveBeenCalled()
    wrapper.destroy()
    expect(unregister).toHaveBeenCalled()
  })

  it('should emit a click event', async () => {
    const wrapper = mountFunction({
      propsData: {
        href: '#!'
      }
    })

    const click = jest.fn()
    wrapper.vm.$on('click', click)
    wrapper.trigger('click')

    wrapper.setProps({ href: undefined, to: '/foo' })
    wrapper.trigger('click')

    expect(click.mock.calls.length).toBe(2)
  })

  it('should use custom active-class', () => {
    const wrapper = mountFunction({
      propsData: {
        inputValue: true,
        activeClass: 'foo'
      }
    })

    expect(wrapper.classes('foo')).toBe(true)
  })

  it('should have v-btn--depressed class when using depressed prop', () => {
    const wrapper = mountFunction({
      propsData: {
        depressed: true
      }
    })

    expect(wrapper.classes('v-btn--depressed')).toBe(true)
  })

  it('should have v-btn--flat class when using flat and depressed props', () => {
    const wrapper = mountFunction({
      propsData: {
        depressed: true,
        flat: true
      }
    })

    expect(wrapper.classes('v-btn--flat')).toBe(true)
  })

  it('should have v-btn--outline and v-btn--depressed classes when using outline prop', () => {
    const wrapper = mountFunction({
      propsData: {
        outline: true
      }
    })

    expect(wrapper.classes('v-btn--outline')).toBe(true)
    expect(wrapper.classes('v-btn--depressed')).toBe(true)
  })
})
