import { test, touch } from '@util/testing'
import { createRange } from '@util/helpers'
import VTabs from './VTabs'
import VTab from './VTab'
import VTabItem from './VTabItem'
import VTabsItems from './VTabsItems'
import VTabsSlider from './VTabsSlider'

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
          props: { id: item }
        })))
      ])
    }
  }
}

const ssrBootable = () => new Promise(resolve => setTimeout(resolve, 200))

test('VTabs', ({ mount, shallow }) => {
  it('should provide', () => {
    const wrapper = mount(Component())

    const tab = wrapper.find(VTab)[0]
    expect(typeof tab.vm.tabClick).toBe('function')
    expect(typeof tab.vm.tabs.register).toBe('function')
    expect(typeof tab.vm.tabs.unregister).toBe('function')

    const items = wrapper.find(VTabsItems)[0]
    expect(typeof items.vm.registerItems).toBe('function')
    expect(typeof items.vm.unregisterItems).toBe('function')
  })

  it('should register tabs and items', async () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [VTab, VTabsItems]
      }
    })

    const tab = wrapper.find(VTab)[0]
    expect(wrapper.vm.tabs.length).toBe(1)
    tab.destroy()
    expect(wrapper.vm.tabs.length).toBe(0)

    const items = wrapper.find(VTabsItems)[0]
    expect(typeof wrapper.vm.tabItems).toBe('function')
    items.destroy()
    expect(wrapper.vm.tabItems).toBe(null)
  })

  it('should change tab and content when model changes', async () => {
    const wrapper = mount(Component(), {
      attachToDocument: true
    })

    const tabs = wrapper.find(VTabs)[0]
    const tab = wrapper.find(VTab)[0]
    const item = wrapper.find(VTabItem)[0]

    expect(tabs.vm.activeIndex).toBe(-1)
    expect(tab.vm.isActive).toBe(false)
    expect(item.vm.isActive).toBe(false)
    await ssrBootable()
    expect(tabs.vm.activeIndex).toBe(0)
    expect(tab.vm.isActive).toBe(true)
    expect(item.vm.isActive).toBe(true)
  })

  it('should not call slider if no active tab', () => {
    const wrapper = mount(VTabs)

    expect(wrapper.vm.callSlider()).toBe(false)
  })

  it('should call slider on application resize', async () => {
    const wrapper = mount(Component())

    const tabs = wrapper.find(VTabs)[0]

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

    const tabs = wrapper.find(VTabs)[0]

    tabs.setData({ scrollOffset: 1 })
    tabs.vm.onResize()
    await tabs.vm.$nextTick()
    expect(tabs.vm.scrollOffset).toBe(0)
    tabs.setData({ scrollOffset: 2 })
    await tabs.vm.$nextTick()
    tabs.destroy()
    tabs.vm.onResize()
    expect(tabs.vm.scrollOffset).toBe(2)
  })

  it('should update model when route changes', async () => {
    const $route = { path: 'bar' }
    const wrapper = mount(Component(), {
      attachToDocument: true,
      globals: {
        $route
      }
    })

    await ssrBootable()
    
    const tabs = wrapper.find(VTabs)[0]
    const tab = wrapper.find(VTab)[1]
    const input = jest.fn()

    tabs.vm.$on('input', input)
    tab.vm.click(new Event('click'))
    await wrapper.vm.$nextTick()
    
    expect(input).toHaveBeenCalled()
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

    wrapper.vm.scrollTo('append')
    wrapper.vm.scrollTo('prepend')
    expect(newOffset.mock.calls.length).toBe(2)

    wrapper.setMethods({ newOffset: () => ({
      offset: 5,
      index: 1
    })})
    await wrapper.vm.$nextTick()

    wrapper.vm.scrollTo('prepend')
    expect(wrapper.vm.scrollOffset).toBe(5)
    expect(wrapper.vm.itemOffset).toBe(1)
  })

  it('should return the correct height', async () => {
    const wrapper = mount(VTabs, {
      propsData: { height: 'auto' }
    })

    expect('Invalid prop: custom validator check failed for prop "height"').toHaveBeenWarned()
    wrapper.setProps({ height: null })
    expect(wrapper.vm.computedHeight).toBe(48)
    wrapper.setProps({ height: 112 })
    expect(wrapper.vm.computedHeight).toBe(112)
    wrapper.setProps({ height: null, iconsAndText: true })
    expect(wrapper.vm.computedHeight).toBe(72)
  })

  it('should return lazy value when accessing input', async () => {
    const wrapper = mount(VTabs)

    expect(wrapper.vm.inputValue).toBe(undefined)
    wrapper.setData({ lazyValue: 'foo' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputValue).toBe('foo')
  })

  it('should show tabs arrows', async () => {
    const wrapper = mount(VTabs, {
      propsData: { showArrows: true }
    })

    wrapper.setData({ isOverflowing: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.hasClass('tabs--show-arrows')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a null target with no activeTab', () => {
    const wrapper = mount(VTabs)

    expect(wrapper.vm.target).toBe(null)
  })

  it('should not conditionally render append and prepend icons', async () => {
    const scrollTo = jest.fn()
    const wrapper = mount(VTabs, {
      attachToDocument: true,
      propsData: { showArrows: true }
    })

    expect(wrapper.vm.genIcon('prepend')).toBe(null)

    // Mock display state
    wrapper.setData({ isOverflowing: true })
    wrapper.vm.$vuetify.breakpoint.width = 800
    await ssrBootable()
    wrapper.setProps({ mobileBreakPoint: 1200 })

    expect(wrapper.vm.genIcon('prepend')).toBeTruthy()
    await wrapper.vm.$nextTick()

    wrapper.setMethods({ scrollTo })

    const next = wrapper.find('.icon--append')[0]
    next.trigger('click')
    await wrapper.vm.$nextTick()
    expect(scrollTo).toHaveBeenCalledWith('append')
  })

  it('should call on touch methods', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true
    })

    wrapper.setData({ isOverflowing: true })

    const onTouch = jest.fn()
    wrapper.setMethods({
      onTouchStart: onTouch,
      onTouchMove: onTouch,
      onTouchEnd: onTouch
    })
    await ssrBootable()

    const tabsWrapper = wrapper.find('.tabs__wrapper')[0]

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

  it('should call append or prepend offset method', () => {
    const wrapper = mount(VTabs)
    const offsetFn = jest.fn()

    wrapper.setMethods({
      newOffsetPrepend: offsetFn,
      newOffsetAppend: offsetFn
    })

    wrapper.vm.newOffset('append')
    wrapper.vm.newOffset('prepend')

    expect(offsetFn.mock.calls.length).toBe(2)
  })

  it('should return object or null when calling new offset', async () => {
    const wrapper = mount(VTabs)
    const mockEls = createRange(25).map(x => ({ clientWidth: 50 }))

    await ssrBootable()

    // Mocking container and children
    expect(wrapper.vm.newOffsetAppend(
      { clientWidth: 400 },
      mockEls,
      0
    )).toEqual({ offset: 400, index: 8 })

    // Mock offset
    wrapper.setData({ itemOffset: 10 })

    // Mocking container and children
    expect(wrapper.vm.newOffsetPrepend(
      { clientWidth: 200 },
      mockEls,
      50
    )).toEqual({ offset: -150, index: 8 })

    wrapper.setData({ itemOffset: 0 })
    // Mocking container and children
    expect(wrapper.vm.newOffsetPrepend(
      { clientWidth: 0 },
      [{ clientWidth: 50 }]
    )).toEqual({ offset: 0, index: 0 })
  })

  it('should handle touch events and remove container transition', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true
    })

    wrapper.setData({ isOverflowing: true })
    const container = wrapper.find('.tabs__container')[0]

    await ssrBootable()

    expect(wrapper.vm.startX).toBe(0)
    wrapper.vm.onTouchStart({ touchstartX: 0 })
    expect(container.hasStyle('transition', 'none')).toBe(true)

    wrapper.vm.onTouchMove({ touchmoveX: -100 })
    expect(wrapper.vm.scrollOffset).toBe(100)

    wrapper.vm.onTouchEnd()
    expect(wrapper.vm.scrollOffset).toBe(0)

    wrapper.setData({ isOverflowing: false })    
    wrapper.vm.onTouchEnd()
    expect(wrapper.vm.scrollOffset).toBe(0)
  })
})
