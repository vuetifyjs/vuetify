// Components
import VTabs from '../VTabs'
import VTab from '../VTab'
import VTabItem from '../VTabItem'
import VTabsItems from '../VTabsItems'
import VTabsSlider from '../VTabsSlider'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

// Types
import { ExtractVue } from './../../../util/mixins'
import Vue, { VueConstructor } from 'vue'

const Component = (items = ['foo', 'bar']): VueConstructor<Vue> => Vue.extend({
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
})

const ssrBootable = () => new Promise(resolve => requestAnimationFrame(resolve))

// Avoriaz does not like extended
// components with no render fn
const TabsItemsMock = {
  name: 'v-tabs-items',
  render: () => {}
}

describe('VTabs.ts', () => {
  type Instance = ExtractVue<typeof VTabs>
  let mountFunction: (options?: object) => Wrapper<Instance>
  (global as any).requestAnimationFrame = cb => cb && cb()

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VTabs, {
        mocks: {
          $vuetify: {
            application: { left: 0, right: 0 }
          }
        },
        ...options
      })
    }
  })

  it('should call slider on application resize', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.resizeTimeout).toBe(0)
    wrapper.vm.$vuetify.application.left = 100
    expect(wrapper.vm.resizeTimeout).toBeTruthy()
    wrapper.setData({ resizeTimeout: 0 })
    expect(wrapper.vm.resizeTimeout).toBe(0)
    wrapper.vm.$vuetify.application.right = 100
    expect(wrapper.vm.resizeTimeout).toBeTruthy()
  })

  it('should use a slotted slider', () => {
    const wrapper = mountFunction({
      slots: {
        default: [{
          name: 'v-tabs-slider',
          render: h => h(VTabsSlider, {
            props: { color: 'pink' }
          })
        }]
      }
    })

    const slider = wrapper.find(VTabsSlider)
    expect(slider.classes('pink')).toBe(true)
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

    expect(wrapper.findAll(TabsItemsMock)).toHaveLength(1)
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

    const slider = wrapper.findAll('.v-tabs__slider')
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
})
