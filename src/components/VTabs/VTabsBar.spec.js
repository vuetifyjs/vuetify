import { test } from '@util/testing'
import VTabsBar from './VTabsBar'
import VTabsItem from './VTabsItem'
import { createRange } from '@util/helpers'

const tabsWarning = 'The v-tabs-bar component must be used inside a v-tabs.'
const tabClickWarning = '[Vue warn]: Injection "tabClick" not found'

function barProvide (
  register = () => {},
  unregister = () => {},
  tabClick = () => {}
) {
  return {
    provide: {
      tabs: {
        register,
        unregister
      },
      tabClick
    },

    render (h) {
      return h('div', this.$slots.default)
    }
  }
}

test('VTabs', ({ mount }) => {
  it('should validate height is a number and have default values', async () => {
    const wrapper = mount(VTabsBar, {
      propsData: {
        height: 'auto'
      }
    })

    expect('Invalid prop: custom validator check failed for prop "height"').toHaveBeenWarned()
    wrapper.setProps({ height: null })
    expect(wrapper.vm.computedHeight).toBe(48)
    wrapper.setProps({ iconsAndText: true })
    expect(wrapper.vm.computedHeight).toBe(72)
    wrapper.setProps({ height: 112 })
    expect(wrapper.vm.computedHeight).toBe(112)

    expect(tabsWarning).toHaveBeenTipped()
  })

  it('should register and unregister when mounted and destroyed', async () => {
    const register = jest.fn()
    const unregister = jest.fn()

    const wrapper = mount(barProvide(register, unregister), {
      attachToDocument: true,
      slots: {
        default: [VTabsBar]
      }
    })

    const bar = wrapper.find(VTabsBar)[0]
    bar.destroy()
    await wrapper.vm.$nextTick()
    expect(register).toBeCalled()
    expect(unregister).toBeCalled()
  })

  it('should set overflowing on resize', async () => {
    const wrapper = mount(VTabsBar)

    wrapper.setData({ isOverflowing: true })
    wrapper.vm.onResize()
    expect(wrapper.vm.isOverflowing).toBe(false)

    wrapper.setData({ isOverflowing: true })

    // Should not set overflow after being destroyed
    wrapper.destroy()
    wrapper.vm.onResize()
    expect(wrapper.vm.isOverflowing).toBe(true)

    expect(tabsWarning).toHaveBeenTipped()
  })
})
