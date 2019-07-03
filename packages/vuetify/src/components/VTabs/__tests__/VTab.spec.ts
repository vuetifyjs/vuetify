// Components
import VTab from '../VTab'

// Utilities
import {
  mount,
  RouterLinkStub,
  Wrapper,
} from '@vue/test-utils'

// Types
import { ExtractVue } from './../../../util/mixins'

describe('VTab.ts', () => {
  type Instance = ExtractVue<typeof VTab>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VTab, {
        ...options,
      })
    }
  })

  it('should have the correct value', () => {
    const wrapper = mountFunction({
      propsData: {
        href: '#foo',
      },
      mocks: {
        $route: { path: '/' },
        $router: {
          resolve: to => {
            let href
            if (to.path) href = to.path

            return { href }
          },
        },
      },
    })

    expect(wrapper.vm.value).toBe('foo')
    wrapper.setProps({ href: null, to: '/foo' })
    expect(wrapper.vm.value).toBe('/foo')
    wrapper.setProps({ to: { path: 'bar' } })
    expect(wrapper.vm.value).toBe('bar')
  })

  // Still unsure how to test actual implementation
  it('should react to route change', async () => {
    const toggle = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        activeClass: 'bar',
        to: 'foo',
      },
      methods: { toggle },
      mocks: {
        $route: { path: '/' },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    })

    // Mock route change being called
    wrapper.vm.onRouteChange()
    await wrapper.vm.$nextTick()

    expect(toggle).not.toHaveBeenCalled()

    // explicitly mock class added
    // by vue router
    ;(wrapper.vm.$refs.link as any)._vnode.data = {
      class: { 'bar v-tab--active': true },
    }
    ;(wrapper.vm as any).$route.path = '/foo'

    wrapper.vm.onRouteChange()
    await wrapper.vm.$nextTick()

    wrapper.setProps({ to: undefined })

    wrapper.vm.onRouteChange()
    await wrapper.vm.$nextTick()

    expect(toggle).toHaveBeenCalledTimes(1)
  })

  it('should respond to clicks and mousedown.enter', () => {
    const event = { preventDefault: jest.fn() }
    const toggle = jest.fn()
    const wrapper = mountFunction({
      methods: { toggle },
    })

    wrapper.trigger('click', event)

    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(toggle).toHaveBeenCalled()

    wrapper.setProps({ href: '#foo' })

    wrapper.trigger('click', event)

    expect(event.preventDefault).toHaveBeenCalled()

    wrapper.trigger('keydown.enter', event)
    wrapper.trigger('keydown.space', event)

    expect(event.preventDefault).toHaveBeenCalledTimes(2)
    expect(toggle).toHaveBeenCalledTimes(3)
  })
})
