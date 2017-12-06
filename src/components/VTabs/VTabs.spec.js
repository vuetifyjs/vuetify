import { test } from '~util/testing'
import VTabs from './VTabs'
import VTabsBar from './VTabsBar'
import VTabsItem from './VTabsItem'
import Vue from 'vue'
import { createRange } from '~util/helpers'

function createBar (items = ['foo', 'bar']) {
  return Vue.extend({
    render (h) {
      return h(VTabsBar, items.map(i => (
        h(VTabsItem, { props: { href: `${i}` } })
      )))
    }
  })
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
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isBooted).toBe(true)
  })

  /* TODO: Don't know how to dynamically change slots after wrapper created??
  it('should add navigation if dynamically added tabs result in overflow', async () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [createBar(createRange(2))]
      },
      attachToDocument: true
    })

    console.log(wrapper.html())
  })
  */
})
