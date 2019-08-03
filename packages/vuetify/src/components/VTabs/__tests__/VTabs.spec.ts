// Components
import VTabs from '../VTabs'
import VTab from '../VTab'
import VTabItem from '../VTabItem'
import VTabsItems from '../VTabsItems'
import VTabsSlider from '../VTabsSlider'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

// Types
import { ExtractVue } from './../../../util/mixins'

// Avoriaz does not like extended
// components with no render fn
const TabsItemsMock = {
  name: 'v-tabs-items',
  render: () => {},
}

describe('VTabs.ts', () => {
  type Instance = ExtractVue<typeof VTabs>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VTabs, {
        mocks: {
          $vuetify: {
            application: { left: 0, right: 0 },
            breakpoint: {},
            theme: { dark: false },
          },
        },
        ...options,
      })
    }
  })

  it('should call slider on application resize', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.resizeTimeout).toBe(0)
    wrapper.vm.$vuetify.application.left = 100
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.resizeTimeout).toBeTruthy()
    wrapper.setData({ resizeTimeout: 0 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.resizeTimeout).toBe(0)
    wrapper.vm.$vuetify.application.right = 100
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.resizeTimeout).toBeTruthy()
  })

  it('should use a slotted slider', () => {
    const wrapper = mountFunction({
      slots: {
        default: [{
          name: 'v-tabs-slider',
          render: h => h(VTabsSlider, {
            props: { color: 'pink' },
          }),
        }],
      },
    })

    const slider = wrapper.find(VTabsSlider)
    expect(slider.classes('pink')).toBe(true)
  })

  it('should generate a v-tabs-items if none present and has v-tab-item', async () => {
    const wrapper = mountFunction({
      propsData: { value: 'foo' },
      slots: {
        default: [VTabItem],
      },
    })

    expect(wrapper.findAll(TabsItemsMock)).toHaveLength(1)
  })

  it('should hide slider', async () => {
    const wrapper = mountFunction({
      propsData: {
        hideSlider: true,
        value: 0,
      },
      slots: {
        default: [VTab],
      },
    })

    const slider = wrapper.findAll('.v-tabs-slider')
    expect(slider).toHaveLength(0)
  })

  it('should render generic elements in the tab container', async () => {
    const component = {
      render (h) {
        return h(VTabs, {
          props: { hideSlider: true },
        }, [
          h('div', { staticClass: 'test-element' }, ['foobar']),
        ])
      },
    }
    const wrapper = mount(component, {
      mocks: {
        $vuetify: {
          breakpoint: {},
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update input value when changed externally', async () => {
    const wrapper = mountFunction({
      propsData: { value: 'foo' },
    })

    wrapper.setProps({ value: 'bar' })

    expect(wrapper.vm.internalValue).toBe('bar')
  })

  it('should reset the tabs slider', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 0,
      },
      data: () => ({
        slider: {
          left: 100,
          width: 100,
        },
      }),
      slots: {
        default: [VTab],
      },
    })

    wrapper.vm.callSlider()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.slider.left).toBe(0)
    expect(wrapper.vm.slider.width).toBe(0)
  })

  it('should adjust slider size', async () => {
    const el = {
      $el: {
        scrollHeight: 99,
        scrollWidth: 99,
      },
    }
    const wrapper = mountFunction({
      propsData: {
        value: 0,
      },
    })
    wrapper.vm.$refs.items.items.push(el)
    wrapper.vm.callSlider()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.slider.height).toBe(2)

    wrapper.setProps({ sliderSize: 4 })
    wrapper.vm.callSlider()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.slider.height).toBe(4)

    wrapper.setProps({ vertical: true })
    wrapper.vm.callSlider()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.slider.height).toBe(99)
    expect(wrapper.vm.slider.width).toBe(4)
  })
})
