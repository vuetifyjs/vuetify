// Libraries
import Vue from 'vue'

// Components
import VSimpleBtn from '../VSimpleBtn'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper,
  createWrapper,
} from '@vue/test-utils'
import { compileToFunctions } from 'vue-template-compiler'

describe('VSimpleBtn', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let localVue: typeof Vue

  beforeEach(() => {
    localVue = createLocalVue()

    mountFunction = (options = {}) => {
      return mount(VSimpleBtn, {
        localVue,
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    expect(mountFunction().html()).toMatchSnapshot()
  })

  it('should render component with a color prop and match snapshot', () => {
    expect(mountFunction({
      propsData: {
        color: 'red',
      },
    }).html()).toMatchSnapshot()

    expect(mountFunction({
      propsData: {
        color: 'red lighten-1',
        text: true,
      },
    }).html()).toMatchSnapshot()
  })

  it('should render component with tile prop and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tile: true,
      },
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
          unregister,
        },
      },
    })

    expect(register).toHaveBeenCalled()
    wrapper.destroy()
    expect(unregister).toHaveBeenCalled()
  })

  it('should emit a click event', () => {
    const wrapper = mountFunction()
    const click = jest.fn()

    wrapper.vm.$on('click', click)
    wrapper.trigger('click')

    expect(click).toHaveBeenCalled()
  })

  it('should have v-simple-btn--depressed class when using depressed prop', () => {
    const wrapper = mountFunction({
      propsData: {
        depressed: true,
      },
    })

    expect(wrapper.classes('v-simple-btn--depressed')).toBe(true)
  })

  it('should have v-simple-btn--flat class when using text and depressed props', () => {
    const wrapper = mountFunction({
      propsData: {
        depressed: true,
        text: true,
      },
    })

    expect(wrapper.classes('v-simple-btn--flat')).toBe(true)
  })

  it('should have v-simple-btn--outlined and v-simple-btn--depressed when using outlined prop', () => {
    const wrapper = mountFunction({
      propsData: {
        outlined: true,
      },
    })

    expect(wrapper.classes('v-simple-btn--outlined')).toBe(true)
    expect(wrapper.classes('v-simple-btn--depressed')).toBe(true)
  })

  it('should have the correct elevation', () => {
    const wrapper = mountFunction()

    wrapper.setProps({ disabled: true })
    expect(wrapper.classes('elevation-2')).toBe(false)
    expect(wrapper.classes('v-simple-btn--disabled')).toBe(true)

    wrapper.setProps({ disabled: false, elevation: 24 })
    expect(wrapper.classes('elevation-24')).toBe(true)

    wrapper.setProps({ elevation: 2 })
    expect(wrapper.classes('elevation-2')).toBe(true)
  })

  it('should not add color classes if disabled', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'red lighten-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      disabled: true,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should stringify non string|number values', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'foo',
      },
    })

    expect(wrapper.attributes('value')).toBe('foo')

    wrapper.setProps({ value: 2 })
    expect(wrapper.attributes('value')).toBe('2')

    wrapper.setProps({ value: { foo: 'bar' } })
    expect(wrapper.attributes('value')).toBe('{"foo":"bar"}')
  })

  it('should call toggle when used in button group', () => {
    const register = jest.fn()
    const unregister = jest.fn()
    const toggle = jest.fn()
    const wrapper = mountFunction({
      provide: {
        btnToggle: { register, unregister },
      },
      methods: { toggle },
    })

    wrapper.trigger('click')
    expect(toggle).toHaveBeenCalled()
  })

  it('should retain focus when clicked', () => {
    const wrapper = mountFunction({
      propsData: {
        retainFocusOnClick: true,
      },
    })
    const event = new MouseEvent('click', { detail: 1 })
    const blur = jest.fn()

    wrapper.element.blur = blur
    wrapper.element.dispatchEvent(event)

    expect(blur).not.toHaveBeenCalled()

    wrapper.setProps({ retainFocusOnClick: false })
    wrapper.element.dispatchEvent(event)

    expect(blur).toHaveBeenCalled()
  })

  it('should not ripple when disabled', () => {
    const wrapper = mountFunction()

    expect((wrapper.vm as any).computedRipple).toBe(true)

    wrapper.setProps({ disabled: true })
    expect((wrapper.vm as any).computedRipple).toBe(false)

    wrapper.setProps({ disabled: false, ripple: 'circle' })
    expect((wrapper.vm as any).computedRipple).toBe('circle')
  })
})
