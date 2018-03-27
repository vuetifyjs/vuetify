import { test } from '@/test'
import VTab from '@/components/VTabs/VTab'
import Vue from 'vue'

const tabClick = 'Injection "tabClick" not found'
const tabsWarning = '[Vuetify] The v-tab component must be used inside a v-tabs'
const stub = {
  name: 'router-link',

  props: {
    to: [String, Object]
  },

  render (h) {
    return h('a', {
      domProps: { href: this.to }
    })
  }
}

test('VTab', ({ mount }) => {
  it('should render a div when disabled', async () => {
    const wrapper = mount(VTab, {
      propsData: {
        href: '#foo'
      }
    })

    expect(wrapper.find('.tabs__item')[0].vNode.elm.tagName).toBe('A')
    wrapper.setProps({ disabled: true })
    expect(wrapper.find('.tabs__item')[0].vNode.elm.tagName).toBe('DIV')

    expect(tabClick).toHaveBeenWarned()
    expect(tabsWarning).toHaveBeenTipped()
  })

  it('should register and unregister', async () => {
    const register = jest.fn()
    const unregister = jest.fn()
    const wrapper = mount({
      provide: {
        tabs: {
          register,
          unregister
        }
      },
      render (h) {
        return h('div', this.$slots.default)
      }
    }, {
      slots: {
        default: [VTab]
      }
    })

    const item = wrapper.find(VTab)[0]
    item.destroy()

    expect(register).toHaveBeenCalled()
    expect(unregister).toHaveBeenCalled()
    expect(tabClick).toHaveBeenWarned()
  })

  it('should emit click event and prevent default', async () => {
    const click = jest.fn()
    const wrapper = mount({
      provide: {
        tabClick: click
      },
      render (h) { return h('div', this.$slots.default) }
    }, {
      slots: {
        default: [{
          render: h => h(VTab, {
            props: { href: '#foo' }
          })
        }]
      }
    })

    const tab = wrapper.find(VTab)[0]
    tab.vm.$on('click', click)
    const event = new Event('click')
    tab.vm.click(event)
    await wrapper.vm.$nextTick()
    // Cannot figure out how to ensure this actually happens
    // expect(event.defaultPrevented).toBe(false)
    expect(click).toHaveBeenCalled()
    expect(tabsWarning).toHaveBeenTipped()
  })

  it('should toggle isActive', () => {
    const wrapper = mount(VTab, {
      propsData: { href: '#foo' }
    })

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.vm.toggle('foo')
    expect(wrapper.vm.isActive).toBe(true)
    expect(tabClick).toHaveBeenWarned()
    expect(tabsWarning).toHaveBeenTipped()
  })

  it('should not call tabClick', async () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)
    const wrapper = mount(VTab, {
      instance
    })
    const mockClick = jest.fn()
    const click = jest.fn()

    wrapper.vm.$on('click', click)
    wrapper.setMethods({ tabClick: mockClick })
    wrapper.vm.onRouteChange()
    await wrapper.vm.$nextTick()
    expect(mockClick).not.toHaveBeenCalled()

    wrapper.vm.click(new Event('click'))
    expect(mockClick.mock.calls.length).toBe(1)

    wrapper.setProps({ href: '/foo' })
    wrapper.vm.click(new Event('click'))
    await wrapper.vm.$nextTick()
    expect(mockClick.mock.calls.length).toBe(2)

    wrapper.setProps({ href: null, to: '/foo' })
    wrapper.vm.click(new Event('click'))
    await wrapper.vm.$nextTick()
    expect(mockClick.mock.calls.length).toBe(2)

    expect(tabClick).toHaveBeenWarned()
    expect(tabsWarning).toHaveBeenTipped()
  })


  // This can no longer be accurately tested due
  // to limitations with mocking tests for vue-router
  // and the changes for https://github.com/vuetifyjs/vuetify/issues/3010
  //
  // Current conversation on vue-router tests
  // https://github.com/vuejs/vue-router/issues/1768
  it('should call tabClick', async () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)
    const wrapper = mount(VTab, {
      propsData: {
        to: '/foo'
      },
      globals: {
        $route: { path: '/foo' }
      },
      instance
    })

    const mockClick = jest.fn()
    wrapper.setMethods({ tabClick: mockClick })

    wrapper.vm.onRouteChange()
    await wrapper.vm.$nextTick()
    expect(mockClick).not.toHaveBeenCalled()

    // Mock the actions that would normally
    // happen with a route-link
    wrapper.vm.isActive = true
    wrapper.vm.$el.firstChild.classList.add('tabs__item--active')
    await wrapper.vm.$nextTick()

    // Mock on route change
    wrapper.vm.onRouteChange()
    await wrapper.vm.$nextTick()

    // expect(mockClick).toHaveBeenCalled()
    expect(tabClick).toHaveBeenWarned()
    expect(tabsWarning).toHaveBeenTipped()
  })

  it('should have the correct actions', () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)
    const wrapper = mount(VTab, {
      propsData: {
        href: '#foo'
      },
      instance,
      globals: {
        $route: { path: '/' },
        $router: {
          resolve: (to, route, append) => {
            let href
            if (to.path) href = to.path

            return { href }
          }
        }
      }
    })

    expect(wrapper.vm.action).toBe('foo')
    wrapper.setProps({ href: null, to: '/foo' })
    expect(wrapper.vm.action).toBe('/foo')
    wrapper.setProps({ to: null })
    expect(wrapper.vm.action).toBe(wrapper.vm)
    wrapper.setProps({ to: { path: 'bar' }})
    expect(wrapper.vm.action).toBe('bar')

    expect(tabClick).toHaveBeenWarned()
    expect(tabsWarning).toHaveBeenTipped()
  })
})
