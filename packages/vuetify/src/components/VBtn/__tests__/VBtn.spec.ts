// Libraries
import Vue from 'vue'

// Plugins
import Router from 'vue-router'

// Components
import VBtn from '../VBtn'

// Utilities
import {
  createLocalVue,
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
      return mount(VBtn, {
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
        text: true
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

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render specified tag when using tag prop', () => {
    const wrapper = mountFunction({
      propsData: {
        tag: 'a'
      }
    })

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
        text: true
      }
    })

    expect(wrapper.classes('v-btn--text')).toBe(true)
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

  it('should have the correct icon classes', () => {
    const wrapper = mountFunction({
      propsData: {
        icon: 'left'
      }
    })
    expect(wrapper.classes('v-btn--icon')).toBe(true)
    expect(wrapper.classes('v-btn--icon-left')).toBe(true)

    wrapper.setProps({ icon: 'right' })

    expect(wrapper.classes('v-btn--icon')).toBe(true)
    expect(wrapper.classes('v-btn--icon-right')).toBe(true)
  })

  it('should have the correct elevation', async () => {
    const wrapper = mountFunction()
    expect(wrapper.classes('elevation-2')).toBe(true)

    wrapper.setProps({ disabled: true })
    expect(wrapper.classes('elevation-2')).toBe(false)
    expect(wrapper.classes('v-btn--disabled')).toBe(true)

    wrapper.setProps({ disabled: false, elevation: 24 })
    expect(wrapper.classes('elevation-24')).toBe(true)

    wrapper.setProps({ elevation: 2 })
    expect(wrapper.classes('elevation-2')).toBe(true)

    wrapper.trigger('mousedown')
    expect(wrapper.classes('elevation-8')).toBe(true)

    wrapper.trigger('mouseup')
    expect(wrapper.classes('elevation-2')).toBe(true)

    wrapper.trigger('mouseenter')
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(wrapper.classes('elevation-4')).toBe(true)
    expect(wrapper.vm.hasHover).toBe(true)
    wrapper.trigger('mouseleave')
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(wrapper.vm.hasHover).toBe(false)

    wrapper.setProps({ fab: true })
    expect(wrapper.classes('elevation-6')).toBe(true)

    wrapper.trigger('mousedown')
    expect(wrapper.classes('elevation-12')).toBe(true)

    wrapper.trigger('mouseup')
    expect(wrapper.classes('elevation-6')).toBe(true)

    wrapper.trigger('mouseenter')
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(wrapper.classes('elevation-8')).toBe(true)
    wrapper.trigger('mouseleave')
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(wrapper.vm.hasHover).toBe(false)
  })

  it('should toggle on route change if provided a to prop', async () => {
    const toggle = jest.fn()
    const register = jest.fn()
    const unregister = jest.fn()
    const wrapper = mountFunction({
      provide: {
        btnToggle: { register, unregister }
      },
      methods: { toggle },
      ref: 'link'
    })

    router.push('/foobar')

    await wrapper.vm.$nextTick()
    expect(toggle).not.toBeCalled()

    wrapper.setProps({ to: 'fizzbuzz' })

    router.push('/fizzbuzz')

    await wrapper.vm.$nextTick()
    expect(toggle).toBeCalled()
  })

  it('should call toggle when used in button group', () => {
    const register = jest.fn()
    const unregister = jest.fn()
    const toggle = jest.fn()
    const wrapper = mountFunction({
      provide: {
        btnToggle: { register, unregister }
      },
      methods: { toggle }
    })

    wrapper.trigger('click')
    expect(toggle).toBeCalled()
  })

  it('should stringify non string|number values', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'foo'
      }
    })

    expect(wrapper.attributes('value')).toBe('foo')

    wrapper.setProps({ value: 2 })
    expect(wrapper.attributes('value')).toBe('2')

    wrapper.setProps({ value: { foo: 'bar' }})
    expect(wrapper.attributes('value')).toBe("{\"foo\":\"bar\"}")
  })
})
