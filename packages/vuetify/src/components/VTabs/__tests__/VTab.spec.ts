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

  it.each([
    ['click', true, undefined],
    ['click', true, '#foo'],
    ['click', false, undefined],
    ['click', false, '#foo'],
    ['keydown.enter', true, undefined],
    ['keydown.enter', true, '#foo'],
    ['keydown.enter', false, undefined],
    ['keydown.enter', false, '#foo'],
    ['keydown.space', true, undefined],
    ['keydown.space', true, '#foo'],
    ['keydown.space', false, undefined],
    ['keydown.space', false, '#foo'],
    // eslint-disable-next-line max-statements
  ])('should (not) toggle (%s, %s, %s)', (eventName, disabled, href) => {
    const event = { preventDefault: jest.fn() }
    const toggle = jest.fn()
    const wrapper = mountFunction({
      provide: {
        tabsBar: {
          register: () => {},
          unregister: () => {},
        },
      },
      propsData: {
        disabled,
        href,
      },
      methods: { toggle },
    })

    wrapper.trigger(eventName, event)

    if (href) {
      expect(event.preventDefault).toHaveBeenCalled()
      if (disabled) {
        expect(toggle).not.toHaveBeenCalled()
      } else {
        expect(toggle).toHaveBeenCalled()
      }
    } else if (disabled) {
      expect(event.preventDefault).toHaveBeenCalled()
      expect(toggle).not.toHaveBeenCalled()
    } else {
      expect(event.preventDefault).toHaveBeenCalled()
      expect(toggle).toHaveBeenCalled()
    }
  })

  it('should get first, last, next, and previous tabs', () => {
    const firstTab = { value: 1 }
    const prevTab = { value: 2 }
    const focusedTab = { value: 3 }
    const nextTab = { value: 4 }
    const lastTab = { value: 5 }
    const getFocusedTab = jest.fn()
    getFocusedTab.mockReturnValue(focusedTab)
    const wrapper = mountFunction({
      provide: {
        items: [firstTab, prevTab, focusedTab, nextTab, lastTab],
      },
      methods: { getFocusedTab },
    })

    expect(wrapper.vm.getFirstTab()).toBe(firstTab)
    expect(wrapper.vm.getLastTab()).toBe(lastTab)
    expect(wrapper.vm.getNextTab()).toBe(nextTab)
    expect(wrapper.vm.getPrevTab()).toBe(prevTab)
  })

  it.each([
    ['keydown.home', 'automatic', true],
    ['keydown.home', 'automatic', false],
    ['keydown.home', 'manual', true],
    ['keydown.home', 'manual', false],
    ['keydown.end', 'automatic', true],
    ['keydown.end', 'automatic', false],
    ['keydown.end', 'manual', true],
    ['keydown.end', 'manual', false],
    ['keydown.right', 'automatic', true],
    ['keydown.right', 'automatic', false],
    ['keydown.right', 'manual', true],
    ['keydown.right', 'manual', false],
    ['keydown.left', 'automatic', true],
    ['keydown.left', 'automatic', false],
    ['keydown.left', 'manual', true],
    ['keydown.left', 'manual', false],
    ['keydown.down', 'automatic', true],
    ['keydown.down', 'automatic', false],
    ['keydown.down', 'manual', true],
    ['keydown.down', 'manual', false],
    ['keydown.up', 'automatic', true],
    ['keydown.up', 'automatic', false],
    ['keydown.up', 'manual', true],
    ['keydown.up', 'manual', false],
    // eslint-disable-next-line max-statements
  ])('should focus and possibly click tab on keydown depending on activation mode (%s, %s, %s)', (keydown, activationMode, vertical) => {
    const getFirstTab = jest.fn()
    const getLastTab = jest.fn()
    const getNextTab = jest.fn()
    const getPrevTab = jest.fn()
    const tab = {
      $el: {
        click: jest.fn(),
        focus: jest.fn(),
      },
    }
    getFirstTab.mockReturnValue(tab)
    getLastTab.mockReturnValue(tab)
    getNextTab.mockReturnValue(tab)
    getPrevTab.mockReturnValue(tab)
    const wrapper = mountFunction({
      provide: {
        tabsBar: {
          activationMode,
          register: () => {},
          unregister: () => {},
          vertical,
        },
      },
      methods: {
        getFirstTab,
        getLastTab,
        getNextTab,
        getPrevTab,
      },
    })

    expect(wrapper.emitted().keydown).not.toBeDefined()

    wrapper.trigger(keydown)

    expect(wrapper.emitted().keydown).toBeDefined()

    if (keydown === 'keydown.home') {
      expect(getFirstTab).toHaveBeenCalled()
    } else {
      expect(getFirstTab).not.toHaveBeenCalled()
    }
    if (keydown === 'keydown.end') {
      expect(getLastTab).toHaveBeenCalled()
    } else {
      expect(getLastTab).not.toHaveBeenCalled()
    }
    if ((keydown === 'keydown.right' && !vertical) || (keydown === 'keydown.down' && vertical)) {
      expect(getNextTab).toHaveBeenCalled()
    } else {
      expect(getNextTab).not.toHaveBeenCalled()
    }
    if ((keydown === 'keydown.left' && !vertical) || (keydown === 'keydown.up' && vertical)) {
      expect(getPrevTab).toHaveBeenCalled()
    } else {
      expect(getPrevTab).not.toHaveBeenCalled()
    }

    const horizontalKeys = ['keydown.right', 'keydown.left']
    const verticalKeys = ['keydown.down', 'keydown.up']
    if ((horizontalKeys.includes(keydown) && vertical) || (verticalKeys.includes(keydown) && !vertical)) return

    expect(tab.$el.focus).toHaveBeenCalled()
    if (activationMode === 'automatic') {
      expect(tab.$el.click).toHaveBeenCalled()
    } else {
      expect(tab.$el.click).not.toHaveBeenCalled()
    }
  })
})
