// Utilities
import { shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useLink } from '../router'

describe('useLink', () => {
  const TestComponent = defineComponent({
    props: {
      href: String,
      replace: Boolean,
      to: [String, Object],
      exact: Boolean,
    },
    setup (props, { attrs }) {
      return useLink(props, attrs)
    },
    render () {
      return h('div')
    },
  })

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: {
          setup: () => () => h('div', 'home'),
        },
      },
      {
        path: '/page1',
        name: 'page1',
        component: {
          setup: () => () => h('div', 'page1'),
        },
      },
      {
        path: '/page2',
        name: 'page2',
        component: {
          setup: () => () => h('div', 'page2'),
        },
      },
    ],
  })

  it('works with "to"', async () => {
    const wrapper = shallowMount(TestComponent, {
      props: {
        to: { name: 'page1' },
        exact: true,
      },
      global: {
        plugins: [router],
      },
    })

    const vm = wrapper.vm

    expect(vm.isLink).toBe(true)
    expect(vm.isClickable).toBe(true)
    expect(vm.href).toBe('/page1')
    expect(vm.linkProps.href).toBe('/page1')
    expect(vm.route?.fullPath).toBe('/page1')
    expect(vm.navigate).toBeDefined()
  })

  it('works with "href"', async () => {
    const wrapper = shallowMount(TestComponent, {
      props: {
        href: '/page2',
      },
    })

    const vm = wrapper.vm

    expect(vm.isLink).toBe(true)
    expect(vm.isClickable).toBe(true)
    expect(vm.href).toBe('/page2')
    expect(vm.linkProps.href).toBe('/page2')
    expect(vm.route).toBeUndefined()
    expect(vm.navigate).toBeUndefined()
  })

  it('navigates to correct route', async () => {
    const wrapper = shallowMount(TestComponent, {
      props: {
        to: { name: 'page1' },
        exact: true,
      },
      global: {
        plugins: [router],
      },
    })

    const vm = wrapper.vm

    await vm.navigate!()

    expect(router.currentRoute.value.fullPath).toBe('/page1')
  })

  it('handles to property changes', async () => {
    const wrapper = shallowMount(TestComponent, {
      props: {
        to: { name: 'page1' },
        exact: true,
      },
      global: {
        plugins: [router],
      },
    })

    const vm = wrapper.vm

    expect(vm.route?.fullPath).toBe('/page1')
    await vm.navigate!()

    expect(router.currentRoute.value.fullPath).toBe('/page1')

    await wrapper.setProps({
      to: { name: 'page2' },
    })
    expect(vm.route?.fullPath).toBe('/page2')
    await vm.navigate!()

    expect(router.currentRoute.value.fullPath).toBe('/page2')
  })

  it('handles when no to property is set initially, then set', async () => {
    const wrapper = shallowMount(TestComponent, {
      global: {
        plugins: [router],
      },
    })

    const vm = wrapper.vm

    expect(vm.route).toBeUndefined()

    await wrapper.setProps({
      to: { name: 'page1' },
      exact: true,
    })

    expect(vm.route?.fullPath).toBe('/page1')
    await vm.navigate!()

    expect(router.currentRoute.value.fullPath).toBe('/page1')
  })
  it('correctly sets isActive property', async () => {
    const wrapper = shallowMount(TestComponent, {
      props: {
        to: { name: 'page1' },
        exact: true,
      },
      global: {
        plugins: [router],
      },
    })

    const vm = wrapper.vm

    await vm.navigate!()
    expect(vm.isActive).toBe(true)

    await wrapper.setProps({ to: { name: 'page2' } })
    expect(vm.isActive).toBe(false)
  })
})
