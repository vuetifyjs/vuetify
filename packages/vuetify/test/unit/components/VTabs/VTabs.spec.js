import { test, touch, resizeWindow } from '@/test'
import { createRange } from '@/util/helpers'
import VTabs from '@/components/VTabs/VTabs'
import VTab from '@/components/VTabs/VTab'
import VTabItem from '@/components/VTabs/VTabItem'
import VTabsItems from '@/components/VTabs/VTabsItems'
import VTabsSlider from '@/components/VTabs/VTabsSlider'

const Component = (items = ['foo', 'bar']) => {
  return {
    inheritAttrs: false,

    render (h) {
      return h(VTabs, {
        attrs: this.$attrs
      }, [
        items.map(item => h(VTab, {
          props: { href: `#${item}` }
        })),
        h(VTabsItems, items.map(item => h(VTabItem, {
          props: {
            value: item
          }
        })))
      ])
    }
  }
}

const ssrBootable = () => new Promise(resolve => requestAnimationFrame(resolve))

// Avoriaz does not like extended
// components with no render fn
const TabsMock = {
  name: 'v-tabs',
  render: () => {}
}
const TabsItemsMock = {
  name: 'v-tabs-items',
  render: () => {}
}

test('VTabs', ({ mount }) => {
  it('should provide', () => {
    const wrapper = mount(Component())

    const items = wrapper.first(TabsItemsMock)
    expect(typeof items.vm.tabProxy).toBe('function')
    expect(typeof items.vm.registerItems).toBe('function')
    expect(typeof items.vm.unregisterItems).toBe('function')
  })

  it('should register items', async () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [VTab, VTabsItems]
      }
    })

    const items = wrapper.first(TabsItemsMock)
    expect(typeof wrapper.vm.tabItems).toBe('function')
    items.destroy()
    expect(wrapper.vm.tabItems).toBe(null)
  })

  it('should call slider on application resize', async () => {
    const wrapper = mount(Component())

    const tabs = wrapper.first(TabsMock)

    expect(tabs.vm.resizeTimeout).toBe(null)
    tabs.vm.$vuetify.application.left = 100
    await tabs.vm.$nextTick()
    expect(tabs.vm.resizeTimeout).toBeTruthy()
    tabs.setData({ resizeTimeout: null })
    expect(tabs.vm.resizeTimeout).toBe(null)
    tabs.vm.$vuetify.application.right = 100
    await tabs.vm.$nextTick()
    expect(tabs.vm.resizeTimeout).toBeTruthy()
  })

  it('should reset offset on resize', async () => {
    const wrapper = mount(Component(), {
      attachToDocument: true
    })

    await ssrBootable()

    const tabs = wrapper.first(TabsMock)

    tabs.setData({ scrollOffset: 1 })
    tabs.vm.onResize()

    await new Promise(resolve => setTimeout(resolve, 500))

    expect(tabs.vm.scrollOffset).toBe(0)
    tabs.setData({ scrollOffset: 2 })
    await tabs.vm.$nextTick()
    tabs.destroy()
    tabs.vm.onResize()
    expect(tabs.vm.scrollOffset).toBe(2)
  })

  it('should call method if overflowing', () => {
    const wrapper = mount(VTabs)
    const fn = jest.fn()

    wrapper.vm.overflowCheck(null, fn)
    expect(fn).not.toHaveBeenCalled()
    wrapper.setData({ isOverflowing: true })
    wrapper.vm.overflowCheck(null, fn)
    expect(fn).toHaveBeenCalled()
  })

  it('should update scroll and item offset', async () => {
    const newOffset = jest.fn()
    const wrapper = mount(VTabs, {
      props: {
        showArrows: true
      }
    })

    wrapper.setMethods({ newOffset })

    await ssrBootable()

    wrapper.vm.scrollTo('next')
    wrapper.vm.scrollTo('prev')
    expect(newOffset.mock.calls.length).toBe(2)

    wrapper.setMethods({ newOffset: () => 5 })
    await wrapper.vm.$nextTick()

    wrapper.vm.scrollTo('prev')
    expect(wrapper.vm.scrollOffset).toBe(5)
  })

  it('should validate height prop', async () => {
    const wrapper = mount(VTabs, {
      propsData: { height: 'auto' }
    })

    expect('Invalid prop: custom validator check failed for prop "height"').toHaveBeenWarned()
    wrapper.setProps({ height: null })
    expect(wrapper.vm.containerStyles).toBe(null)
    wrapper.setProps({ height: 112 })
    expect(wrapper.vm.containerStyles.height).toBe('112px')
  })

  it('should show tabs arrows', async () => {
    const wrapper = mount(VTabs, {
      propsData: { showArrows: true }
    })

    wrapper.setData({ isOverflowing: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-tabs__wrapper--show-arrows')).toHaveLength(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not conditionally render prev and next icons', async () => {
    const scrollTo = jest.fn()
    const wrapper = mount(VTabs, {
      attachToDocument: true
    })

    expect(wrapper.vm.genIcon('prev')).toBe(null)

    // // Mock display state
    wrapper.setData({ isOverflowing: true, scrollOffset: 1 })
    wrapper.setProps({ showArrows: true })
    wrapper.vm.$vuetify.breakpoint.width = 800
    await ssrBootable()
    wrapper.setProps({ mobileBreakPoint: 1200 })

    expect(wrapper.vm.genIcon('prev')).toBeTruthy()

    wrapper.setMethods({ scrollTo })
    // Since the elements will have no width
    // trick next icon to show
    wrapper.setData({ scrollOffset: -1 })
    await wrapper.vm.$nextTick()

    const next = wrapper.find('.v-tabs__icon--next')[0]
    next.trigger('click')
    await wrapper.vm.$nextTick()
    expect(scrollTo).toHaveBeenCalledWith('next')
  })

  it('should call on touch methods', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true
    })

    await ssrBootable()

    wrapper.setData({ isOverflowing: true })

    const onTouch = jest.fn()
    wrapper.setMethods({
      onTouchStart: onTouch,
      onTouchMove: onTouch,
      onTouchEnd: onTouch
    })

    const tabsWrapper = wrapper.find('.v-tabs__wrapper')[0]

    touch(tabsWrapper).start(0, 0)
    touch(tabsWrapper).end(0, 0)
    touch(tabsWrapper).move(15, 15)
    expect(onTouch.mock.calls.length).toBe(3)
  })

  it('should use a slotted slider', () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [{
          name: 'v-tabs-slider',
          render: h => h(VTabsSlider, {
            props: { color: 'pink' }
          })
        }]
      }
    })

    const slider = wrapper.find(VTabsSlider)[0]
    expect(slider.hasClass('pink')).toBe(true)
  })

  it('should handle touch events and remove container transition', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true
    })

    wrapper.setData({ isOverflowing: true })
    const container = wrapper.find('.v-tabs__container')[0]

    await ssrBootable()

    expect(wrapper.vm.startX).toBe(0)
    wrapper.vm.onTouchStart({ touchstartX: 0 })
    expect(container.hasStyle('transition', 'none')).toBe(true)

    wrapper.vm.onTouchMove({ touchmoveX: -100 })
    expect(wrapper.vm.scrollOffset).toBe(100)

    wrapper.vm.onTouchEnd()
    expect(wrapper.vm.scrollOffset).toBe(0)

    wrapper.setData({ isOverflowing: false, scrollOffset: 100 })
    wrapper.vm.onTouchEnd()
    expect(wrapper.vm.scrollOffset).toBe(0)
  })

  it('should generate a v-tabs-items if none present and has v-tab-item', async () => {
    const wrapper = mount(VTabs, {
      propsData: { value: 'foo' },
      slots: {
        default: [{
          name: 'v-tab-item',
          render: h => h('div')
        }]
      }
    })

    await ssrBootable()

    expect(wrapper.find(TabsItemsMock).length).toBe(1)
  })

  it('should scroll active item into view if off screen', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true,
      propsData: { value: 'bar' },
      slots: {
        default: [{
          name: 'v-tab',
          render: h => h(VTab, {
            props: { href: 'foo' }
          })
        }]
      }
    })

    await ssrBootable()

    wrapper.vm.scrollIntoView()

    expect(wrapper.vm.scrollOffset).toBe(0)
    expect(wrapper.vm.isOverflowing).toBe(false)

    wrapper.setProps({ value: 'foo' })
    await wrapper.vm.$nextTick()

    // Simulate being scrolled too far to the left
    wrapper.setData({
      isOverflowing: true,
      scrollOffset: 100
    })

    wrapper.vm.scrollIntoView()

    expect(wrapper.vm.scrollOffset).toBe(0)

    // Simulate being scrolled too far to the right
    wrapper.setData({
      isOverflowing: true,
      scrollOffset: -100
    })

    wrapper.vm.scrollIntoView()

    expect(wrapper.vm.scrollOffset).toBe(0)

    wrapper.setData({ isOverflowing: true })

    wrapper.vm.scrollIntoView()

    expect(wrapper.vm.scrollOffset).toBe(0)
  })

  it('should hide slider', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true,
      propsData: { hideSlider: true },
      slots: {
        default: [{
          name: 'v-tab',
          render: h => h(VTab)
        }]
      }
    })

    await ssrBootable()

    const slider = wrapper.find('.v-tabs__slider')
    expect(slider).toHaveLength(0)
  })

  it('should render generic elements in the tab container', async () => {
    const component = {
      render (h) {
        return h(VTabs, {
          props: { hideSlider: true }
        }, [
          h('div', { staticClass: 'test-element' }, ['foobar'])
        ])
      }
    }
    const wrapper = mount(component, {
      attachToDocument: true
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update input value when changed externally', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true,
      propsData: { value: 'foo' }
    })

    wrapper.setProps({ value: 'bar' })

    expect(wrapper.vm.internalValue).toBe('bar')
  })

  it('should not error if processing resize on destroy', () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [{
          functional: true,
          render: h => h(VTab)
        }]
      }
    })

    // Will kill test if fails
    delete wrapper.vm.$refs.bar
    wrapper.vm.setOverflow()
  })

  it('should set dimensions when onResize is called', async () => {
    const setWidths = jest.fn()
    mount(VTabs, {
      propsData: {
        value: 'foo'
      },
      slots: {
        default: [{
          functional: true,
          render: h => h(VTab, {
            props: { href: '#foo' }
          })
        }]
      },
      methods: { setWidths }
    })

    expect(setWidths).not.toBeCalled()

    await ssrBootable()

    expect(setWidths).toHaveBeenCalledTimes(1)

    await resizeWindow(800)

    expect(setWidths).toHaveBeenCalledTimes(2)

    await resizeWindow(1800)

    expect(setWidths).toHaveBeenCalledTimes(3)
  })
})
