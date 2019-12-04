// Libraries
import Vue from 'vue'

// Components
import VAppBar from '../VAppBar'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'
import { scrollWindow } from '../../../../test'

describe('AppBar.ts', () => {
  type Instance = ExtractVue<typeof VAppBar>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VAppBar, {
        mocks: {
          $vuetify: {
            application: {
              top: 0,
              register: () => {},
              unregister: () => {},
            },
            breakpoint: {},
          },
        },
        ...options,
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
      propsData: { hideOnScroll: true, scrollThreshold: 300 },
    })

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.currentScroll).toBe(0)

    await scrollWindow(100)

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.currentScroll).toBe(100)

    await scrollWindow(600)

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.currentScroll).toBe(600)

    await scrollWindow(475)
    await scrollWindow(0)

    expect(wrapper.vm.currentScroll).toBe(0)

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.currentScroll).toBe(0)

    wrapper.setProps({ invertedScroll: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(false)

    await scrollWindow(0)
    await scrollWindow(475)

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should set active based on value', async () => {
    const wrapper = mountFunction({
      propsData: {
        hideOnScroll: true,
      },
    })

    expect(wrapper.vm.isActive).toBe(true)
    wrapper.setProps({ value: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should set margin top', () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
      },
    })

    Vue.set(wrapper.vm.$vuetify.application, 'bar', 24)
    expect(wrapper.vm.computedMarginTop).toBe(24)
  })

  it('should set isActive false when created and vertical-scroll', () => {
    const wrapper = mountFunction({
      propsData: {
        invertedScroll: true,
      },
    })

    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should hide shadow when using elevate-on-scroll', () => {
    const wrapper = mountFunction({
      propsData: {
        elevateOnScroll: true,
      },
    })

    expect(wrapper.vm.hideShadow).toBe(true)

    wrapper.setData({ currentScroll: 100 })

    expect(wrapper.vm.hideShadow).toBe(false)
  })

  it('should collapse-on-scroll', () => {
    const wrapper = mountFunction({
      propsData: {
        collapseOnScroll: true,
      },
    })

    wrapper.setData({ currentScroll: 0 })
    expect(wrapper.vm.isCollapsed).toBeFalsy()
    wrapper.setData({ currentScroll: 100 })
    expect(wrapper.vm.isCollapsed).toBeTruthy()
  })

  it('should calculate font size', () => {
    const wrapper = mountFunction({
      propsData: {
        shrinkOnScroll: false,
        prominent: false,
      },
    })

    expect(wrapper.vm.computedFontSize).toBeUndefined()
    wrapper.setProps({
      shrinkOnScroll: true,
      prominent: true,
    })
    expect(wrapper.vm.computedFontSize).toBeDefined()
    expect(wrapper.vm.computedFontSize).toBe(1.5)
  })

  it('should render with background', () => {
    const wrapper = mountFunction({
      propsData: {
        src: '/test.jpg',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should calculate opacity', () => {
    const wrapper = mountFunction({
      propsData: {
        src: '/test.jpg',
        fadeImgOnScroll: true,
      },
    })

    expect(wrapper.vm.computedOpacity).toBe(1)

    wrapper.setProps({ fadeImgOnScroll: true })
    expect(wrapper.vm.computedOpacity).toBe(1)

    wrapper.setData({ currentScroll: 5 })
    expect(wrapper.vm.computedOpacity).toBe(0.38)

    wrapper.setData({ currentScroll: 100 })
    expect(wrapper.vm.computedOpacity).toBe(0)
  })

  // https://github.com/vuetifyjs/vuetify/issues/4985
  // https://github.com/vuetifyjs/vuetify/issues/8337
  it('should scroll toolbar and extension completely off screen', async () => {
    const wrapper = mountFunction({
      propsData: {
        hideOnScroll: true,
        extended: true,
      },
    })

    expect(wrapper.vm.computedTransform).toBe(0)

    await scrollWindow(500)

    expect(wrapper.vm.computedTransform).toBe(-64)

    wrapper.setProps({ bottom: true, scrollOffScreen: true })

    expect(wrapper.vm.computedTransform).toBe(112)
    expect(wrapper.vm.hideShadow).toBe(true)

    wrapper.setProps({ scrollOffScreen: false })

    expect(wrapper.vm.hideShadow).toBe(false)
  })

  it('should work with hide-on-scroll and elevate-on-scroll', async () => {
    const wrapper = mountFunction({
      propsData: {
        hideOnScroll: true,
        elevateOnScroll: true,
      },
    })

    expect(wrapper.vm.computedTransform).toBe(0)
    expect(wrapper.vm.hideShadow).toBe(true)

    await scrollWindow(1000)

    expect(wrapper.vm.computedTransform).toBe(-64)
    expect(wrapper.vm.hideShadow).toBe(true)

    await scrollWindow(600)

    expect(wrapper.vm.computedTransform).toBe(0)
    expect(wrapper.vm.hideShadow).toBe(false)
  })

  it('should show shadow when hide-on-scroll and elevate-on-scroll and extended are all true', async () => {
    const wrapper = mountFunction({
      propsData: {
        hideOnScroll: true,
        elevateOnScroll: true,
        extended: true,
      },
    })

    expect(wrapper.vm.computedTransform).toBe(0)
    expect(wrapper.vm.hideShadow).toBe(true)

    await scrollWindow(1000)

    expect(wrapper.vm.computedTransform).toBe(-64)
    expect(wrapper.vm.hideShadow).toBe(false)

    await scrollWindow(600)

    expect(wrapper.vm.computedTransform).toBe(0)
    expect(wrapper.vm.hideShadow).toBe(false)

    await scrollWindow(0)

    expect(wrapper.vm.computedTransform).toBe(0)
    expect(wrapper.vm.hideShadow).toBe(true)
  })

  // https://github.com/vuetifyjs/vuetify/issues/8583
  it('when scroll position is 0, v-model should be able to be control visibility regardless of other props', () => {
    const wrapper = mountFunction({
      propsData: {
        elevateOnScroll: true,
      },
    })

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.computedTransform).toBe(0)

    wrapper.setProps({ value: false })

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.computedTransform).not.toBe(0)
  })
})
