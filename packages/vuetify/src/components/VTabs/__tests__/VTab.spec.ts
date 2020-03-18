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
    const event = { preventDefault: jest.fn() }
    const toggle = jest.fn()
    const wrapper = mountFunction({
      methods: { toggle },
    })
    const eventNames = ['click', 'keydown.enter', 'keydown.space']

    eventNames.forEach((eventName: string) => {
      wrapper.trigger(eventName, event)
      expect(event.preventDefault).not.toHaveBeenCalled()
      expect(toggle).toHaveBeenCalled()
    })

    wrapper.setProps({ href: '#foo' })

    eventNames.forEach((eventName: string) => {
      wrapper.trigger(eventName, event)
      expect(event.preventDefault).toHaveBeenCalled()
      expect(toggle).toHaveBeenCalled()
    })
  })

  it('should not toggle on click, keydown.enter, and keydown.space if disabled', () => {
    const event = { preventDefault: jest.fn() }
    const toggle = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
      methods: { toggle },
    })
    const eventNames = ['click', 'keydown.enter', 'keydown.space']

    eventNames.forEach((eventName: string) => {
      wrapper.trigger(eventName, event)
      expect(event.preventDefault).toHaveBeenCalled()
      expect(toggle).not.toHaveBeenCalled()
    })
  })

  it('should getFirstTab with no disabled tabs', () => {
    const firstItem = { first: 'item', disabled: false }
    const secondItem = { second: 'item', disabled: false }
    const wrapper = mountFunction({
      provide: {
        items: [firstItem, secondItem],
      },
    })

    expect(wrapper.vm.getFirstTab()).toBe(firstItem)
  })

  it('should getFirstTab with disabled tabs', () => {
    const firstItem = { first: 'item', disabled: true }
    const secondItem = { second: 'item', disabled: false }
    const wrapper = mountFunction({
      provide: {
        items: [firstItem, secondItem],
      },
    })

    expect(wrapper.vm.getFirstTab()).toBe(secondItem)
  })

  it('should getLastTab with no disabled tabs', () => {
    const lastItem = { first: 'item', disabled: false }
    const secondToLastItem = { second: 'item', disabled: false }
    const wrapper = mountFunction({
      provide: {
        items: [secondToLastItem, lastItem],
      },
    })

    expect(wrapper.vm.getLastTab()).toBe(lastItem)
  })

  it('should getLastTab with disabled tabs', () => {
    const lastItem = { first: 'item', disabled: true }
    const secondToLastItem = { second: 'item', disabled: false }
    const wrapper = mountFunction({
      provide: {
        items: [secondToLastItem, lastItem],
      },
    })

    expect(wrapper.vm.getLastTab()).toBe(secondToLastItem)
  })

  it('should getNextTab with no disabled tabs', () => {
    const firstItem = { value: 1, disabled: false }
    const currentItem = { value: 2, disabled: false }
    const lastItem = { value: 3, disabled: false }
    const getFocusedTab = jest.fn()
    getFocusedTab.mockReturnValue(currentItem)
    const wrapper = mountFunction({
      provide: {
        items: [firstItem, currentItem, lastItem],
      },
      methods: { getFocusedTab },
    })

    expect(wrapper.vm.getNextTab()).toBe(lastItem)
  })

  it('should getNextTab with disabled tabs', () => {
    const firstItem = { value: 1, disabled: false }
    const currentItem = { value: 2, disabled: false }
    const lastItem = { value: 3, disabled: true }
    const getFocusedTab = jest.fn()
    getFocusedTab.mockReturnValue(currentItem)
    const wrapper = mountFunction({
      provide: {
        items: [firstItem, currentItem, lastItem],
      },
      methods: { getFocusedTab },
    })

    expect(wrapper.vm.getNextTab()).toBe(firstItem)
  })

  it('should getPrevTab with no disabled tabs', () => {
    const firstItem = { value: 1, disabled: false }
    const currentItem = { value: 2, disabled: false }
    const lastItem = { value: 3, disabled: false }
    const getFocusedTab = jest.fn()
    getFocusedTab.mockReturnValue(currentItem)
    const wrapper = mountFunction({
      provide: {
        items: [firstItem, currentItem, lastItem],
      },
      methods: { getFocusedTab },
    })

    expect(wrapper.vm.getPrevTab()).toBe(firstItem)
  })

  it('should getPrevTab with disabled tabs', () => {
    const firstItem = { value: 1, disabled: true }
    const currentItem = { value: 2, disabled: false }
    const lastItem = { value: 3, disabled: false }
    const getFocusedTab = jest.fn()
    getFocusedTab.mockReturnValue(currentItem)
    const wrapper = mountFunction({
      provide: {
        items: [firstItem, currentItem, lastItem],
      },
      methods: { getFocusedTab },
    })

    expect(wrapper.vm.getPrevTab()).toBe(lastItem)
  })

  it('should emit keydown', async () => {
    const wrapper = mountFunction()

    expect(wrapper.emitted().keydown).not.toBeDefined()

    wrapper.trigger('keydown')

    expect(wrapper.emitted().keydown).toBeDefined()
  })

  it('should invoke getFirstTab on keydown.home', () => {
    Array.from([true, false]).forEach(vertical => {
      const getFirstTab = jest.fn()
      const wrapper = mountFunction({
        provide: {
          vertical,
        },
        methods: { getFirstTab },
      })

      wrapper.trigger('keydown.home')

      expect(getFirstTab).toHaveBeenCalled()
    })
  })

  it('should invoke getLastTab on keydown.end', () => {
    Array.from([true, false]).forEach(vertical => {
      const getLastTab = jest.fn()
      const wrapper = mountFunction({
        provide: {
          vertical,
        },
        methods: { getLastTab },
      })

      wrapper.trigger('keydown.end')

      expect(getLastTab).toHaveBeenCalled()
    })
  })

  it('should invoke getPrevTab on keydown.left when horizontal', () => {
    Array.from([true, false]).forEach(vertical => {
      const getPrevTab = jest.fn()
      const wrapper = mountFunction({
        provide: {
          vertical,
        },
        methods: { getPrevTab },
      })

      wrapper.trigger('keydown.left')

      if (!vertical) {
        expect(getPrevTab).toHaveBeenCalled()
      } else {
        expect(getPrevTab).not.toHaveBeenCalled()
      }
    })
  })

  it('should invoke getPrevTab on keydown.up when vertical', () => {
    Array.from([true, false]).forEach(vertical => {
      const getPrevTab = jest.fn()
      const wrapper = mountFunction({
        provide: {
          vertical,
        },
        methods: { getPrevTab },
      })

      wrapper.trigger('keydown.up')

      if (vertical) {
        expect(getPrevTab).toHaveBeenCalled()
      } else {
        expect(getPrevTab).not.toHaveBeenCalled()
      }
    })
  })

  it('should invoke getNextTab on keydown.right when horizontal', () => {
    Array.from([true, false]).forEach(vertical => {
      const getNextTab = jest.fn()
      const wrapper = mountFunction({
        provide: {
          vertical,
        },
        methods: { getNextTab },
      })

      wrapper.trigger('keydown.right')

      if (!vertical) {
        expect(getNextTab).toHaveBeenCalled()
      } else {
        expect(getNextTab).not.toHaveBeenCalled()
      }
    })
  })

  it('should invoke getNextTab on keydown.down when vertical', () => {
    Array.from([true, false]).forEach(vertical => {
      const getNextTab = jest.fn()
      const wrapper = mountFunction({
        provide: {
          vertical,
        },
        methods: { getNextTab },
      })

      wrapper.trigger('keydown.down')

      if (!vertical) {
        expect(getNextTab).not.toHaveBeenCalled()
      } else {
        expect(getNextTab).toHaveBeenCalled()
      }
    })
  })

  it('should only focus tab on keydown if activation mode is not automatic', () => {
    const activationMode = 'manual'
    const getLastTab = jest.fn()
    const tab = {
      $el: {
        focus: jest.fn(),
      },
      click: jest.fn(),
    }
    getLastTab.mockReturnValue(tab)
    const wrapper = mountFunction({
      provide: {
        activationMode,
      },
      methods: { getLastTab },
    })

    wrapper.trigger('keydown.end')

    expect(tab.$el.focus).toHaveBeenCalled()
    expect(tab.click).not.toHaveBeenCalled()
  })

  it('should focus and click tab on keydown if activation mode is automatic', () => {
    const activationMode = 'automatic'
    const getLastTab = jest.fn()
    const tab = {
      $el: {
        focus: jest.fn(),
      },
      click: jest.fn(),
    }
    getLastTab.mockReturnValue(tab)
    const wrapper = mountFunction({
      provide: {
        activationMode,
      },
      methods: { getLastTab },
    })

    wrapper.trigger('keydown.end')

    expect(tab.$el.focus).toHaveBeenCalled()
    expect(tab.click).toHaveBeenCalled()
  })
})
