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

  it('should move slider', async () => {
    // const wrapper = mount(component, {
    //   attachToDocument: true,
    //   propsData: {
    //     value: 'foo'
    //   }
    // })
    // const tabs = wrapper.find(VTabs)[0]

    // await wrapper.vm.$nextTick()
    // console.log(tabs.vm.activeIndex)
    // console.log(tabs.html())
  })

  it('should change tab when model changes', async () => {
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
