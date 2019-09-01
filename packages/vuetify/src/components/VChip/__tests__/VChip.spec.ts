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
  Wrapper,
} from '@vue/test-utils'

describe('VChip.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let router: Router
  let localVue: typeof Vue

  beforeEach(() => {
    router = new Router()
    localVue = createLocalVue()
    localVue.use(Router)

    mountFunction = (options = {}) => {
      return mount(VChip, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        localVue,
        router,
        ...options,
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
      propsData: { close: true },
    })

    const close = wrapper.find('.v-chip__close')

    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('click:close', input)

    expect(wrapper.html()).toMatchSnapshot()

    close.trigger('click')
    expect(input).toHaveBeenCalled()
  })

  it('should render a colored chip', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'blue',
        textColor: 'green',
      },
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('green--text')
  })

  it('should render a disabled chip', async () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.element.classList).toContain('v-chip--disabled')

    wrapper.setProps({
      close: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.v-chip__close')).toHaveLength(1)
  })

  it('should render a colored outline chip', () => {
    const wrapper = mountFunction({
      propsData: {
        outlined: true,
        color: 'blue',
      },
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('blue--text')
  })

  it('should render a colored outline chip with text color', () => {
    const wrapper = mountFunction({
      propsData: {
        outlined: true,
        color: 'blue',
        textColor: 'green',
      },
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('green--text')
  })

  it('should render a chip with filter', () => {
    const wrapper = mountFunction({
      propsData: {
        filter: true,
        inputValue: true,
      },
    })

    expect(wrapper.findAll('.v-chip__filter')).toHaveLength(1)
  })

  it('should call toggle event when used in the group', () => {
    const register = jest.fn()
    const unregister = jest.fn()
    const toggle = jest.fn()
    const wrapper = mountFunction({
      provide: {
        chipGroup: { register, unregister },
      },
      methods: { toggle },
    })

    wrapper.trigger('click')
    expect(toggle).toHaveBeenCalled()
  })

  it('should conditionally show based on active prop', async () => {
    const active = jest.fn()
    const wrapper = mountFunction({
      propsData: { close: true },
    })
    const close = wrapper.find('.v-chip__close')

    wrapper.vm.$on('update:active', active)

    expect(wrapper.isVisible()).toBe(true)

    close.trigger('click')

    expect(active).toHaveBeenCalledTimes(1)

    // Simulate active.sync behavior
    wrapper.setProps({ active: false })

    await wrapper.vm.$nextTick()

    expect(wrapper.isVisible()).toBe(false)
  })
})
