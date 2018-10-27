import Vue from 'vue'
import { test } from '@/test'
import VItem from '@/components/VItemGroup/VItem'
import VItemGroup from '@/components/VItemGroup/VItemGroup'

const vm = new Vue()
const defaultSlot = ({ toggle }) => vm.$createElement('div', { on: { click: toggle } }, 'foobar')

const Mock = {
  name: 'test',

  render: h => h(VItem, {
    scopedSlots: {
      default: defaultSlot
    }
  })
}

test('VItemGroup.ts', ({ mount }) => {
  it('should warn if using multiple prop without an array value', () => {
    mount(VItemGroup, {
      propsData: {
        multiple: true,
        value: ''
      }
    })

    expect('Model must be bound to an array if the multiple property is true').toHaveBeenTipped()
  })

  it('should return the correct value', () => {
    const wrapper = mount(VItemGroup)

    const getValue = wrapper.vm.getValue

    expect(getValue({ value: null }, 0)).toBe(0)
    expect(getValue({ value: undefined }, 1)).toBe(1)
    expect(getValue({ value: '' }, 2)).toBe(2)
    expect(getValue({ value: 'foo' }, 'foo')).toBe('foo')
  })

  it('should register elements', () => {
    const wrapper = mount(VItemGroup, {
      slots: {
        default: [Mock]
      }
    })

    expect(wrapper.vm.items.length).toBe(1)

    const item = wrapper.first(Mock)

    item.destroy()

    expect(wrapper.vm.items.length).toBe(0)
  })

  it('should register and activate elements', () => {
    const wrapper = mount(VItemGroup, {
      propsData: { value: 0 },
      slots: { default: [Mock] }
    })

    expect(wrapper.vm.items.length).toBe(1)

    // Avoriaz doesn't like
    // components without
    // a render function
    const item = wrapper.first({
      name: 'v-item',
      render: () => null
    })

    expect(item.vm.isActive).toBe(true)
  })

  it('should update state from child clicks', () => {
    const change = jest.fn()
    const wrapper = mount(VItemGroup, {
      slots: {
        default: [
          Mock,
          Mock
        ]
      }
    })

    wrapper.vm.$on('change', change)

    expect(wrapper.vm.items.length).toBe(2)

    const [ child1, child2 ] = wrapper.vm.$el.children

    child1.click()
    expect(change).toBeCalledWith(0)
    expect(wrapper.vm.internalValue).toBe(0)

    child2.click()
    expect(change).toBeCalledWith(1)
    expect(wrapper.vm.internalValue).toBe(1)

    child2.click()
    expect(wrapper.vm.internalValue).toBe(undefined)

    wrapper.setProps({
      value: [],
      multiple: true
    })

    child1.click()
    expect(change).toBeCalledWith([0])

    child2.click()
    expect(change).toBeCalledWith([0, 1])

    child1.click()
    expect(change).toBeCalledWith([1])
  })

  it('should have a conditional method for toggling items', () => {
    const wrapper = mount(VItemGroup)

    expect(wrapper.vm.toggleMethod(0)).toBe(false)

    wrapper.setProps({ value: 0 })

    expect(wrapper.vm.toggleMethod(0)).toBe(true)

    wrapper.setProps({
      multiple: true,
      value: []
    })

    expect(wrapper.vm.toggleMethod(0)).toBe(false)

    wrapper.setProps({ value: [0] })

    expect(wrapper.vm.toggleMethod(0)).toBe(true)

    wrapper.setProps({ value: 0 })

    expect(wrapper.vm.toggleMethod(0)).toBe(false)
  })

  it('should select the first item if mandatory and no value', async () => {
    const wrapper = mount(VItemGroup, {
      propsData: { mandatory: true },
      slots: {
        default: [Mock]
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems.length).toBe(1)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.setProps({ multiple: true })

    // Manually update selected items
    wrapper.vm.updateItemsState()

    expect(wrapper.vm.selectedItems.length).toBe(1)
    expect(wrapper.vm.internalValue).toEqual([0])
  })

  it('should update a single item group', () => {
    const wrapper = mount(VItemGroup)

    // Toggling on and off
    wrapper.vm.updateSingle('foo')
    expect(wrapper.vm.internalValue).toBe('foo')
    wrapper.vm.updateSingle('foo')
    expect(wrapper.vm.internalValue).toBe(undefined)

    wrapper.setProps({ mandatory: true })

    // Toggling off single mandatory
    wrapper.vm.updateSingle('foo')
    expect(wrapper.vm.internalValue).toBe('foo')
    wrapper.vm.updateSingle('foo')
    expect(wrapper.vm.internalValue).toBe('foo')
  })

  it('should update a multiple item group', () => {
    const wrapper = mount(VItemGroup, {
      propsData: { multiple: true }
    })

    // Toggling on and off
    wrapper.vm.updateMultiple('foo')
    expect(wrapper.vm.internalValue).toEqual(['foo'])
    wrapper.vm.updateMultiple('foo')
    expect(wrapper.vm.internalValue).toEqual([])

    wrapper.setProps({ mandatory: true })

    // Toggling off single mandatory
    wrapper.vm.updateMultiple('foo')
    expect(wrapper.vm.internalValue).toEqual(['foo'])
    wrapper.vm.updateMultiple('foo')
    expect(wrapper.vm.internalValue).toEqual(['foo'])

    wrapper.setProps({ max: 3 })

    // Should enforce maximum selection
    wrapper.vm.updateMultiple('bar')
    expect(wrapper.vm.internalValue).toEqual(['foo', 'bar'])
    wrapper.vm.updateMultiple('fizz')
    expect(wrapper.vm.internalValue).toEqual(['foo', 'bar', 'fizz'])
    wrapper.vm.updateMultiple('buzz')
    expect(wrapper.vm.internalValue).toEqual(['foo', 'bar', 'fizz'])
  })

  it('should update value if mandatory and dynamic items', async () => {
    const wrapper = mount(VItemGroup, {
      propsData: {
        multiple: true,
        value: [3]
      },
      slots: {
        default: [
          Mock,
          Mock,
          Mock,
          Mock
        ]
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    const [first, second, third, fourth] = wrapper.find(Mock)

    fourth.destroy()

    expect(change).toBeCalledWith([])

    wrapper.setProps({ mandatory: true, value: [2] })

    third.destroy()

    expect(change).toBeCalledWith([1])

    wrapper.setProps({ multiple: false, value: 1 })

    second.destroy()

    expect(change).toBeCalledWith(0)

    first.destroy()

    expect(change).toBeCalledWith(undefined)
  })

  // https://github.com/vuetifyjs/vuetify/issues/5384
  it('should not unregister children when is destroyed', () => {
    const wrapper = mount(VItemGroup, {
      propsData: {
        value: 0
      },
      slots: {
        default: [Mock]
      }
    })

    const change = jest.fn()

    wrapper.vm.$on('change', change)

    wrapper.destroy()

    expect(change).not.toBeCalled()
  })
})
