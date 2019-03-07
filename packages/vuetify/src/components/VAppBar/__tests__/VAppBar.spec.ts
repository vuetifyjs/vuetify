
// Libraries
import Vue from 'vue'

// Plugins
import Router from 'vue-router'

// Components
import VAppBar from '../VAppBar'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper
} from '@vue/test-utils'
import { compileToFunctions } from 'vue-template-compiler'
import { resizeWindow } from '../../../../test'

const scrollWindow = y => {
  global.pageYOffset = y
  global.dispatchEvent(new Event('scroll'))

  return new Promise(resolve => setTimeout(resolve, 200))
}

describe('AppBar.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>

  beforeEach(() => {

    mountFunction = (options = {}) => {
      return mount(VAppBar, {
        ...options
      })
    }
  })

  it('should calculate paddings ', () => {
    const wrapper = mount(VToolbar)

    wrapper.vm.$vuetify.application.left = 42
    wrapper.vm.$vuetify.application.right = 84

    wrapper.setProps({ app: false, clippedLeft: false, clippedRight: false })
    expect(wrapper.vm.computedPaddingLeft).toBe(0)
    expect(wrapper.vm.computedPaddingRight).toBe(0)
    wrapper.setProps({ app: false, clippedLeft: true, clippedRight: true })
    expect(wrapper.vm.computedPaddingLeft).toBe(0)
    expect(wrapper.vm.computedPaddingRight).toBe(0)
    wrapper.setProps({ app: true, clippedLeft: false, clippedRight: false })
    expect(wrapper.vm.computedPaddingLeft).toBe(42)
    expect(wrapper.vm.computedPaddingRight).toBe(84)
    wrapper.setProps({ app: true, clippedLeft: true, clippedRight: true })
    expect(wrapper.vm.computedPaddingLeft).toBe(0)
    expect(wrapper.vm.computedPaddingRight).toBe(0)
  })

  it('should scroll off screen', async () => {
    const wrapper = mount(VToolbar, {
      attachToDocument: true,
      propsData: { scrollOffScreen: true }
    })

    expect(wrapper.vm.isActive).toBe(true)

    await scrollWindow(100)

    expect(wrapper.vm.currentScroll).toBe(100)

    await scrollWindow(500)

    expect(wrapper.vm.currentScroll).toBe(500)
    expect(wrapper.vm.isActive).toBe(false)

    await scrollWindow(0)

    expect(wrapper.vm.isScrollingUp).toBe(true)
    expect(wrapper.vm.isActive).toBe(true)

    wrapper.setProps({ invertedScroll: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(false)

    await scrollWindow(500)

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should return different heights for scroll-{toolbar}-off-screen', async () => {
    const app = mount(VApp)
    const wrapper = mount(VToolbar, {
      propsData: {
        app: true,
        extended: true
      }
    })

    expect(wrapper.vm.computedTransform).toBe(0)

    wrapper.setData({ isActive: false })

    expect(wrapper.vm.computedTransform).toBe(-112)

    wrapper.setProps({ scrollToolbarOffScreen: true })

    expect(wrapper.vm.computedTransform).toBe(-56)
  })

  it('should update the application content height if screen size changes', async () => {
    const app = mount(VApp)
    const wrapper = mount(VToolbar, {
      propsData: {
        app: true
      }
    })

    await resizeWindow(1920)
    expect(wrapper.vm.$vuetify.application.top).toBe(64)

    await resizeWindow(200)
    expect(wrapper.vm.$vuetify.application.top).toBe(56)
  })

  it.skip('should set isScrollingUp', async () => {
    const wrapper = mount(VToolbar)

    await scrollWindow(100)
    expect(wrapper.vm.isScrollingUp).toBe(false)
    await scrollWindow(0)
    expect(wrapper.vm.isScrollingUp).toBe(true)
  })

  it.skip('should set a custom target', async () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        target: 'body'
      }
    })

    wrapper.vm.onScroll()
    expect(wrapper.vm.target).toBe('body')
  })

  it('should set active based on manual scroll', async () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        scrollOffScreen: true
      }
    })

    expect(wrapper.vm.isActive).toBe(true)
    wrapper.setProps({ manualScroll: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should set margin top', () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        app: true
      }
    })

    Vue.set(wrapper.vm.$vuetify.application, 'bar', 24)
    expect(wrapper.vm.computedMarginTop).toBe(24)
  })

  it('should calculate application top', async () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        app: true,
        fixed: true,
        height: 21
      }
    })

    expect(wrapper.vm.$vuetify.application.top).toBe(21)
    wrapper.setProps({
      height: 42
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.top).toBe(42)

    wrapper.setProps({
      invertedScroll: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.top).toBe(0)

    wrapper.setProps({
      invertedScroll: false
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.top).toBe(42)

    wrapper.setProps({
      manualScroll: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.top).toBe(0)
  })
})
