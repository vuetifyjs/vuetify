import { test } from '@util/testing'
import VTabs from './VTabs'
import VTab from './VTab'
import VTabItem from './VTabItem'
import VTabsItems from './VTabsItems'

const component = {
  inheritAttrs: false,

  render (h) {
    return h(VTabs, {
      attrs: this.$attrs
    }, [
      h(VTab, {
        props: { href: '#foo' }
      }),
      h(VTabsItems, [
        h(VTabItem, {
          props: { id: 'foo' }
        })
      ])
    ])
  }
}

const ssrBootable = () => new Promise(resolve => setTimeout(resolve, 200))

test('VTabs', ({ mount, shallow }) => {
  it('should provide', () => {
    const wrapper = mount(component)

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
    const wrapper = mount(component, {
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
    const wrapper = mount(component)

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
    const wrapper = mount(component, {
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

  it('should mount with booted false then activate to remove transition', async () => {
  })

  it('should re-evaluate activeTab when removing tabs', async () => {
  })

  it('should not set active index if there are no items', async () => {
  })

  it('change activeIndex on next', async () => {
  })

  it('change activeIndex on prev', async () => {
  })

  it('should react to window resize', async () => {
  })

  it('should unregister tabs and content', async () => {
  })

  it('should select previous sibling if active tab is removed', async () => {
  })

  it('should toggle content when activeIndex changes', async () => {
  })

  it('should not change activeIndex if no tabs', () => {
  })

  it('should validate height is a number and have default values', async () => {
  })

  it('should set overflowing on resize', async () => {
  })
})
