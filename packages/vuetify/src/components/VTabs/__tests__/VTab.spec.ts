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

  it('should toggle on click, keydown.enter, and keydown.space', () => {
    const eventNames = ['click', 'keydown.enter', 'keydown.space']
    const disableds = [true, false]
    const hrefs = [undefined, '#foo']
    for (const eventName of eventNames) {
      for (const disabled of disableds) {
        for (const href of hrefs) {
          const event = { preventDefault: jest.fn() }
          const toggle = jest.fn()
          const wrapper = mountFunction({
            propsData: {
              disabled,
              href
            },
            methods: {toggle},
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
            expect(event.preventDefault).not.toHaveBeenCalled()
            expect(toggle).toHaveBeenCalled()
          }
        }
      }
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

  it('should focus and possibly click tab on keydown depending on activation mode', () => {
    const keydowns = ['keydown.home', 'keydown.end', 'keydown.right', 'keydown.left', 'keydown.down', 'keydown.up']
    const activationModes = ['automatic', 'manual']
    const verticals = [true, false]
    for (const keydown of keydowns) {
      for (const activationMode of activationModes) {
        for (const vertical of verticals) {
          const getFirstTab = jest.fn()
          const getLastTab = jest.fn()
          const getNextTab = jest.fn()
          const getPrevTab = jest.fn()
          const tab = {
            $el: {
              focus: jest.fn(),
            },
            click: jest.fn(),
          }
          getFirstTab.mockReturnValue(tab)
          getLastTab.mockReturnValue(tab)
          getNextTab.mockReturnValue(tab)
          getPrevTab.mockReturnValue(tab)
          const wrapper = mountFunction({
            provide: {
              activationMode,
              vertical,
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
          if (keydown === 'keydown.right' && !vertical || keydown === 'keydown.down' && vertical) {
            expect(getNextTab).toHaveBeenCalled()
          } else {
            expect(getNextTab).not.toHaveBeenCalled()
          }
          if (keydown === 'keydown.left' && !vertical || keydown === 'keydown.up' && vertical) {
            expect(getPrevTab).toHaveBeenCalled()
          } else {
            expect(getPrevTab).not.toHaveBeenCalled()
          }

          const horizontalKeys = ['keydown.right', 'keydown.left']
          const verticalKeys = ['keydown.down', 'keydown.up']
          if (horizontalKeys.includes(keydown) && vertical || verticalKeys.includes(keydown) && !vertical) return

          expect(tab.$el.focus).toHaveBeenCalled()
          if (activationMode === 'automatic') {
            expect(tab.click).toHaveBeenCalled()
          } else {
            expect(tab.click).not.toHaveBeenCalled()
          }
        }
      }
    }
  })
})
