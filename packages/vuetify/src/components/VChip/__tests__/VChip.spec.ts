// Libraries
import Vue from 'vue'

// Plugins
import Router from 'vue-router'

// Components
import VChip from '../VChip'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VBtn.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let router: Router
  let localVue: typeof Vue

  beforeEach(() => {
    router = new Router()
    localVue = createLocalVue()
    localVue.use(Router)

    mountFunction = (options = {}) => {
      return mount(VChip, {
        localVue,
        router,
        ...options
      })
    }
  })

  it('should have a v-chip class', () => {
    const wrapper = mountFunction()

    expect(wrapper.classes()).toContain('v-chip')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be removable', () => {
    const wrapper = mountFunction({
      propsData: { close: true }
    })

    const close = wrapper.find('.v-chip__close')

    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('input', input)

    expect(wrapper.html()).toMatchSnapshot()

    close.trigger('click')
    expect(input).toBeCalledWith(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a colored chip', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'blue',
        textColor: 'green'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('green--text')
  })

  it('should render a clickable chip', () => {
    const wrapper = mountFunction({
      on: {
        click: () => {}
      }
    })

    expect(wrapper.element.classList).toContain('clickable')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a disabled chip', () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.element.classList).toContain('v-chip--disabled')

    wrapper.setProps({
      close: true
    })
    expect(wrapper.findAll('.v-chip__close')).toHaveLength(1)
  })

  it('should render a colored outline chip', () => {
    const wrapper = mountFunction({
      propsData: {
        outline: true,
        color: 'blue'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('blue--text')
  })

  it('should render a colored outline chip with text color', () => {
    const wrapper = mountFunction({
      propsData: {
        outline: true,
        color: 'blue',
        textColor: 'green'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('green--text')
  })
})
