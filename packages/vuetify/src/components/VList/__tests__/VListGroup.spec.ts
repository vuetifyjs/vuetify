// Components
import VListGroup from '../VListGroup'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VListGroup.ts', () => {
  type Instance = InstanceType<typeof VListGroup>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VListGroup, {
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open if no value provided and group matches route', async () => {
    const $route = { path: '/foo' }
    const listClick = jest.fn()
    const wrapper = mountFunction({
      provide: {
        list: {
          listClick,
          register: jest.fn(),
          unregister: jest.fn(),
        },
      },
      propsData: {
        group: 'foo',
      },
      mocks: {
        $route,
      },
    })

    await wrapper.vm.$nextTick()
    expect(listClick).toHaveBeenCalledWith(wrapper.vm._uid)
  })

  it('should toggle when clicked', async () => {
    const wrapper = mountFunction()

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    wrapper.vm.click()
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(true)
  })

  it('should register when mounted', () => {
    const register = jest.fn()
    const wrapper = mountFunction({
      provide: {
        list: {
          register,
          unregister: () => {},
        },
      },
    })

    expect(register).toHaveBeenCalledWith(wrapper.vm)
  })

  it('should unregister when destroyed', async () => {
    const unregister = jest.fn()
    const wrapper = mountFunction({
      provide: {
        list: {
          register: () => {},
          unregister,
        },
      },
    })

    wrapper.destroy()
    await wrapper.vm.$nextTick()
    expect(unregister).toHaveBeenCalledWith(wrapper.vm)
  })

  it('should render a custom affix icons', async () => {
    const wrapper = mountFunction({
      slots: {
        appendIcon: {
          render: h => h('span', 'foo'),
        },
        prependIcon: {
          render: h => h('span', 'bar'),
        },
      },
    })

    expect(wrapper.html()).toContain('<span>foo</span>')
    expect(wrapper.html()).toContain('<span>bar</span>')
  })

  it('should respond to keydown.enter on header', () => {
    const click = jest.fn()
    const wrapper = mountFunction({
      methods: { click },
      slots: {
        activator: {
          template: '<span>foo</span>',
        },
      },
    })

    const span = wrapper.find('span')

    span.trigger('keydown.enter')

    expect(click).toHaveBeenCalled()
  })

  it('should set active state if route changes and group present', async () => {
    const listClick = jest.fn()
    const $route = { path: '/bar' }
    const wrapper = mountFunction({
      provide: {
        list: {
          listClick,
          register: () => {},
          unregister: () => {},
        },
      },
      propsData: {
        group: 'foo',
      },
      mocks: { $route },
    })

    expect(wrapper.vm.isActive).toBe(false)

    // Simulate route changing
    wrapper.vm.$route.path = '/foo'
    wrapper.vm.onRouteChange(wrapper.vm.$route)

    expect(wrapper.vm.isActive).toBe(true)
    expect(listClick).toHaveBeenCalledWith(wrapper.vm._uid)
  })

  it('should not react to clicks when disabled', () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
      slots: {
        activator: { template: '<span class="bar">foo</span>' },
      },
    })

    const span = wrapper.find('span.bar')

    expect(wrapper.vm.isActive).toBe(false)
    span.trigger('click')
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should toggle is uid matches', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.vm.toggle(100)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)
    wrapper.vm.toggle(wrapper.vm._uid)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should have the correct a11y attributes', () => {
    const wrapper = mountFunction()
    const header = wrapper.find('.v-list-group__header')

    expect(header.element.tabIndex).toBe(0)
    expect(header.element.getAttribute('aria-expanded')).toBe('false')
    expect(header.element.getAttribute('role')).toBe('button')

    wrapper.setData({ isActive: true })

    expect(header.element.getAttribute('aria-expanded')).toBe('true')
  })
})
