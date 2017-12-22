import { test } from '@util/testing'
import VTabs from './VTabs'
import VTabsBar from './VTabsBar'
import VTabsItem from './VTabsItem'
import VTabsItems from './VTabsItems'
import VTabsContent from './VTabsContent'

function createBar (items = ['foo', 'bar']) {
  return {
    render (h) {
      return h(VTabsBar, items.map(i => (
        h(VTabsItem, { props: { href: `${i}` } })
      )))
    }
  }
}

function createItems (items = ['foo', 'bar']) {
  return {
    render (h) {
      return h(VTabsItems, items.map(i => {
        return h(VTabsContent, { props: { id: `${i}` } }, i)
      }))
    }
  }
}

test('VTabs', ({ mount }) => {
  it('should change model when tab is clicked', async () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [
          createBar()
        ]
      }
    })

    await wrapper.vm.$nextTick()

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const item1 = wrapper.find('.tabs__item')[0]
    const item2 = wrapper.find('.tabs__item')[1]

    item1.trigger('click')
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith('foo')

    item2.trigger('click')
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith('bar')
  })

  it('should change tab when model changes', async () => {
    const wrapper = mount(VTabs, {
      propsData: {
        value: 'bar'
      },
      slots: {
        default: [
          createBar()
        ]
      }
    })

    await wrapper.vm.$nextTick()

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    expect(wrapper.vm.value).toBe('bar')

    wrapper.setProps({ value: 'foo' })
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith('foo')
  })

  it('should mount with booted false then activate to remove transition', async () => {
    const wrapper = mount(VTabs, {
      propsData: {
        value: 'bar'
      },
      slots: {
        default: [
          createBar()
        ]
      }
    })

    expect(wrapper.vm.isBooted).toBe(false)

    wrapper.vm.activeIndex = 0
    await new Promise(resolve => setTimeout(resolve, 200))

    expect(wrapper.vm.isBooted).toBe(true)
  })

  it('should re-evaluate activeTab when removing tabs', async () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [createBar()]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeTab.id).toBe('foo')
    wrapper.vm.tabItems.shift()
    expect(wrapper.vm.activeTab.id).toBe('bar')
    wrapper.vm.tabItems.shift()
    expect(wrapper.vm.activeTab).toBe(undefined)
  })

  it('should not set active index if there are no items', async () => {
    const wrapper = mount(VTabs)

    expect(wrapper.vm.activeIndex).toBe(null)
  })

  it('change activeIndex on next', async () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [createBar()]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(0)
    wrapper.vm.next()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(1)
    wrapper.vm.next()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(1)
    wrapper.vm.next(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(0)
  })

  it('change activeIndex on prev', async () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [createBar()]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(0)
    wrapper.vm.prev()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(0)
    wrapper.vm.prev(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(1)
    wrapper.vm.prev()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(0)
  })

  it('should react to window resize', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true,
      slots: {
        default: [createBar()]
      }
    })

    const callBar = jest.fn()
    wrapper.setData({ transitionTime: 0 })
    wrapper.setMethods({ callBar })
    await wrapper.vm.$nextTick()
    wrapper.vm.$vuetify.application.left = 1
    await new Promise(resolve => setTimeout(resolve, 50))
    wrapper.vm.$vuetify.application.right = 1
    await new Promise(resolve => setTimeout(resolve, 50))
    expect(callBar.mock.calls.length).toBe(2)
  })

  it('should unregister tabs and content', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true,
      slots: {
        default: [
          createBar(),
          createItems()
        ]
      }
    })

    await wrapper.vm.$nextTick()
    const item = wrapper.find(VTabsItem)[0]

    expect(wrapper.vm.tabItems.length).toBe(2)
    item.vm.tabs.unregister('tabItems', item.vm.action)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tabItems.length).toBe(1)
  })

  it('should select previous sibling if active tab is removed', async () => {
    const wrapper = mount(VTabs, {
      attachToDocument: true,
      propsData: {
        value: 'baz'
      },
      slots: {
        default: [
          createBar(['foo', 'bar', 'biz', 'baz']),
          createItems()
        ]
      }
    })

    await wrapper.vm.$nextTick()
    wrapper.vm.unregister('tabItems', 'baz')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(2)
    // wrapper.setProps({ value: 'biz' })
    wrapper.setData({ target: 'biz' })
    // wrapper.vm.tabClick('biz')
    await wrapper.vm.$nextTick()
    wrapper.vm.unregister('tabItems', 'biz')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeIndex).toBe(1)
  })

  it('should toggle content when activeIndex changes', async () => {
    const wrapper = mount(VTabs, {
      propsData: {
        value: 'foo'
      },
      slots: {
        default: [createBar(), createItems()]
      }
    })

    await wrapper.vm.$nextTick()

    const content = wrapper.find('#bar')[0]
    expect(content.vNode.elm.style.display).toBe('none')
    wrapper.setProps({ value: 'bar' })
    await wrapper.vm.$nextTick()
    expect(content.vNode.elm.style.display).toBe("")
  })

  // Just satisfying coverage
  it('should not call bar if none exists', () => {
    const wrapper = mount(VTabs)

    wrapper.vm.callBar()
  })
})
