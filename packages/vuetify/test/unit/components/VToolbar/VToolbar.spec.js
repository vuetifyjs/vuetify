import Vue from 'vue'
import { test, resizeWindow } from '@/test'
import VApp from '@/components/VApp/VApp'
import VToolbar from '@/components/VToolbar/VToolbar'

const scrollWindow = y => {
  global.pageYOffset = y
  global.dispatchEvent(new Event('scroll'))

  return new Promise(resolve => setTimeout(resolve, 200))
}

const deprecateScrollToolbarOffScreen = `'scrollToolbarOffScreen' is deprecated, use 'scrollOffScreen' instead`

test('VToolbar.vue', ({ mount }) => {
  it('should render a colored toolbar', () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })

  it('should render an extended toolbar', () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        extended: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an extended toolbar with specific height', () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        extended: true,
        extensionHeight: 42
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
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

  it('should properly calculate content height', () => {
    const wrapper = mount(VToolbar)

    wrapper.setProps({
      height: 999
    })
    expect(wrapper.vm.computedContentHeight).toBe(999)

    wrapper.setProps({
      height: null,
      dense: true
    })
    expect(wrapper.vm.computedContentHeight).toBe(wrapper.vm.heights.dense)

    wrapper.setProps({
      height: null,
      dense: false,
      prominent: true
    })
    expect(wrapper.vm.computedContentHeight).toBe(wrapper.vm.heights.desktop)

    wrapper.setProps({
      height: null,
      dense: false,
      prominent: false
    })
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'width', 200)
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'height', 100)
    expect(wrapper.vm.computedContentHeight).toBe(wrapper.vm.heights.desktop)
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'width', 100)
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'height', 200)
    expect(wrapper.vm.computedContentHeight).toBe(wrapper.vm.heights.desktop)
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

  it.skip('should set a custom target', async () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        target: 'body'
      }
    })

    wrapper.vm.onScroll()
    expect(wrapper.vm.target).toBe('body')
  })

  it.skip('should set isScrollingUp', async () => {
    const wrapper = mount(VToolbar)

    await scrollWindow(100)
    expect(wrapper.vm.isScrollingUp).toBe(false)
    await scrollWindow(0)
    expect(wrapper.vm.isScrollingUp).toBe(true)
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
    expect(deprecateScrollToolbarOffScreen).toHaveBeenTipped()
  })

  it('should have a custom extension height', () => {
    const wrapper = mount(VToolbar, {
      propsData: { tabs: true }
    })

    expect(wrapper.vm.computedExtensionHeight).toBe(48)
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
})
