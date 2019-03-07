
// Libraries
import Vue from 'vue'

// Plugins
import Router from 'vue-router'

// Components
import VApp from '../../VApp/VApp'
import VAppBar from '../VAppBar'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'
import { rafPolyfill, resizeWindow } from '../../../../test'

const scrollWindow = (y: number) => {
  (global as any).pageYOffset = y
  ;(global as any).dispatchEvent(new Event('scroll'))

  return new Promise(resolve => setTimeout(resolve, 200))
}

describe('AppBar.ts', () => {
  type Instance = ExtractVue<typeof VAppBar>
  let mountFunction: (options?: object) => Wrapper<Instance>

  rafPolyfill(window)

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VAppBar, {
        mocks: {
          $vuetify: {
            application: {
              top: 0,
              register: () => {},
              unregister: () => {}
            },
            breakpoint: {}
          }
        },
        ...options
      })
    }
  })

  it('should calculate paddings ', () => {
    const wrapper = mountFunction()

    wrapper.vm.$vuetify.application.left = 42
    wrapper.vm.$vuetify.application.right = 84

    wrapper.setProps({ app: false, clippedLeft: false, clippedRight: false })
    expect(wrapper.vm.computedLeft).toBe(0)
    expect(wrapper.vm.computedRight).toBe(0)
    wrapper.setProps({ app: false, clippedLeft: true, clippedRight: true })
    expect(wrapper.vm.computedLeft).toBe(0)
    expect(wrapper.vm.computedRight).toBe(0)
    wrapper.setProps({ app: true, clippedLeft: false, clippedRight: false })
    expect(wrapper.vm.computedLeft).toBe(42)
    expect(wrapper.vm.computedRight).toBe(84)
    wrapper.setProps({ app: true, clippedLeft: true, clippedRight: true })
    expect(wrapper.vm.computedLeft).toBe(0)
    expect(wrapper.vm.computedRight).toBe(0)
  })

  it('should scroll off screen', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: { hideOnScroll: true }
    })

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.currentScroll).toBe(0)

    await scrollWindow(100)

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.currentScroll).toBe(100)

    await scrollWindow(500)

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.currentScroll).toBe(500)

    await scrollWindow(475)
    await scrollWindow(0)

    expect(wrapper.vm.currentScroll).toBe(0)

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.currentScroll).toBe(0)

    wrapper.setProps({ invertedScroll: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(false)

    await scrollWindow(500)

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should set isScrollingUp', async () => {
    const wrapper = mountFunction({
      propsData: {
        hideOnScroll: true
      }
    })

    await scrollWindow(1000)
    expect(wrapper.vm.isScrollingUp).toBe(false)
    await scrollWindow(0)
    expect(wrapper.vm.isScrollingUp).toBe(true)
  })

  it('should set a custom target', async () => {
    const wrapper = mountFunction({
      propsData: {
        scrollTarget: 'body'
      }
    })

    wrapper.vm.onScroll()
    expect(wrapper.vm.target).toBe(document.body)
  })

  it('should set active based on manual scroll', async () => {
    const wrapper = mountFunction({
      propsData: {
        hideOnScroll: true
      }
    })

    expect(wrapper.vm.isActive).toBe(true)
    wrapper.setProps({ value: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should set margin top', () => {
    const wrapper = mountFunction({
      propsData: {
        app: true
      }
    })

    Vue.set(wrapper.vm.$vuetify.application, 'bar', 24)
    expect(wrapper.vm.computedMarginTop).toBe(24)
  })
})
