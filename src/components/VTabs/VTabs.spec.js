import { test } from '~util/testing'
import VTabs from './VTabs'
import VTabsBar from './VTabsBar'
import VTabsItem from './VTabsItem'
import Vue from 'vue/dist/vue.common'

function createBar (options = {}) {
  return Vue.component('test', {
    components: {
      VTabsBar,
      VTabsItem
    },
    render (h) {
      return h('v-tabs-bar', {}, [
        h('v-tabs-item', { props: { href: 'foo' } }),
        h('v-tabs-item', { props: { href: 'bar' } })
      ])
    }
  })
}

test('VTabs.vue', ({ mount }) => {
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
})
