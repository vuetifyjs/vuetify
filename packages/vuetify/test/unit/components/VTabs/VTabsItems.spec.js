import { test } from '@/test'
import VTabItem from '@/components/VTabs/VTabItem'
import VTabsItems from '@/components/VTabs/VTabsItems'

test('VTabsItems', ({ mount, shallow }) => {
  it('should pass internal value changes to tabProxy', async () => {
    const tabProxy = jest.fn()
    const wrapper = mount(VTabsItems, {
      provide: { tabProxy }
    })

    wrapper.vm.internalValue = 'foo'

    await wrapper.vm.$nextTick()

    expect(tabProxy).toBeCalledWith('foo')
  })

  it('should conditionally skip next and prev', async () => {
    const wrapper = mount(VTabsItems, {
      propsData: {
        value: 2
      },
      slots: {
        default: [
          VTabItem,
          VTabItem,
          VTabItem
        ]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalIndex).toBe(2)

    wrapper.vm.next()
    expect(wrapper.vm.internalIndex).toBe(2)

    wrapper.setProps({ value: 0 })

    expect(wrapper.vm.internalIndex).toBe(0)

    wrapper.vm.prev()
    expect(wrapper.vm.internalIndex).toBe(0)

    wrapper.setProps({ cycle: true })

    wrapper.vm.prev()
    expect(wrapper.vm.internalIndex).toBe(2)

    wrapper.vm.next()
    expect(wrapper.vm.internalIndex).toBe(0)
  })
})
