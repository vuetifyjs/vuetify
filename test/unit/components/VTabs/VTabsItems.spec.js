import { test, touch } from '@/test'
import { createRange } from '@/util/helpers'
import VTabItem from '@/components/VTabs/VTabItem'
import VTabsItems from '@/components/VTabs/VTabsItems'

test('VTabsItems', ({ mount, shallow }) => {
  it('should have no active item with no children', () => {
    const wrapper = mount(VTabsItems)

    expect(wrapper.vm.activeItem).toBe(undefined)
  })

  it('should return currently active item', async () => {
    const wrapper = shallow(VTabsItems, {
      propsData: {
        value: 'foo'
      },
      slots: {
        default: [{
          render: h => h(VTabItem, {
            props: { id: 'foo' }
          })
        }]
      }
    })

    expect(wrapper.vm.activeIndex).toBe(0)
    expect(wrapper.vm.activeItem).toBeTruthy()
  })

  it('should return lazy value', () => {
    const wrapper = mount(VTabsItems)

    expect(wrapper.vm.inputValue).toBe(undefined)
    wrapper.setProps({ value: 'foo' })
    expect(wrapper.vm.inputValue).toBe('foo')
    expect(wrapper.vm.lazyValue).toBe('foo')
  })

  it('should emit input value when registerItems is not provided', () => {
    const wrapper = mount(VTabsItems)
    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.vm.inputValue = 'foo'
    expect(input).toHaveBeenCalled()
  })

  it('should react to touch', () => {
    const wrapper = mount(VTabsItems, {
      propsData: { value: '1' },
      slots: {
        default: createRange(5).map(x => ({
          render: h => h(VTabItem, {
            props: { id: x.toString() }
          })
        }))
      }
    })

    expect(wrapper.vm.inputValue).toBe('1')
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.inputValue).toBe('0')
    // Without cycle, should stay on this index
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.inputValue).toBe('0')

    touch(wrapper).start(200, 0).end(0, 0)
    expect(wrapper.vm.inputValue).toBe('1')

    wrapper.setProps({ value: '4' })
    touch(wrapper).start(200, 0).end(0, 0)
    expect(wrapper.vm.inputValue).toBe('4')

    wrapper.setProps({ cycle: true })
    wrapper.setProps({ value: '4' })
    touch(wrapper).start(200, 0).end(0, 0)
    expect(wrapper.vm.inputValue).toBe('0')

    wrapper.setProps({ value: '0' })
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.inputValue).toBe('4')
  })
})
