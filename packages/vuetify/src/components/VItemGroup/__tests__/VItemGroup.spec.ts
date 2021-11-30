// Libraries
import Vue from 'vue'

// Components
import VItem from '../VItem'
import VItemGroup from '../VItemGroup'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper,
} from '@vue/test-utils'
import { ExtractVue } from './../../../util/mixins'

const vm = new Vue()
const defaultSlot = ({ toggle }) => vm.$createElement('div', { on: { click: toggle } }, 'foobar')

const Mock = {
  name: 'test',

  render: h => h(VItem, {
    scopedSlots: {
      default: defaultSlot,
    },
  }),
}

describe('VItemGroup', () => {
  type Instance = ExtractVue<typeof VItemGroup>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let localVue: typeof Vue

  beforeEach(() => {
    localVue = createLocalVue()

    mountFunction = (options = {}) => {
      return mount(VItemGroup, {
        localVue,
        ...options,
      })
    }
  })

  it('should warn if using multiple prop without an array value', () => {
    mountFunction({
      propsData: {
        multiple: true,
        value: '',
      },
    })

    expect('Model must be bound to an array if the multiple property is true').toHaveBeenTipped()
  })

  it('should return the correct value', () => {
    const wrapper = mountFunction()

    const getValue = wrapper.vm.getValue

    expect(getValue({ value: null }, 0)).toBeNull()
    expect(getValue({ value: undefined }, 1)).toBe(1)
    expect(getValue({ value: '' }, 2)).toBe('')
    expect(getValue({ value: 'foo' }, 'foo')).toBe('foo')
  })

  it('should register elements', () => {
    const wrapper = mountFunction({
      slots: {
        default: [Mock],
      },
    })

    expect(wrapper.vm.items).toHaveLength(1)

    const item = wrapper.find(Mock)

    item.destroy()

    expect(wrapper.vm.items).toHaveLength(0)
  })

  it('should register and activate elements', () => {
    const wrapper = mountFunction({
      propsData: { value: 0 },
      slots: { default: [Mock] },
    })

    expect(wrapper.vm.items).toHaveLength(1)

    // Avoriaz doesn't like
    // components without
    // a render function
    const item = wrapper.find({
      name: 'v-item',
      render: () => null,
    })

    expect(item.vm.isActive).toBe(true)
  })

  it('should update state from child clicks', () => {
    const change = jest.fn()
    const wrapper = mountFunction({
      slots: {
        default: [
          Mock,
          Mock,
        ],
      },
    })

    wrapper.vm.$on('change', change)

    expect(wrapper.vm.items).toHaveLength(2)

    const [child1, child2] = wrapper.vm.$el.children

    child1.click()
    expect(change).toHaveBeenCalledWith(0)
    expect(wrapper.vm.internalValue).toBe(0)

    child2.click()
    expect(change).toHaveBeenCalledWith(1)
    expect(wrapper.vm.internalValue).toBe(1)

    child2.click()
    expect(wrapper.vm.internalValue).toBeUndefined()

    wrapper.setProps({
      value: [],
      multiple: true,
    })

    child1.click()
    expect(change).toHaveBeenCalledWith([0])

    child2.click()
    expect(change).toHaveBeenCalledWith([0, 1])

    child1.click()
    expect(change).toHaveBeenCalledWith([1])
  })

  it('should have a conditional method for toggling items', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.toggleMethod(0)).toBe(false)

    wrapper.setProps({ value: 0 })

    expect(wrapper.vm.toggleMethod(0)).toBe(true)

    wrapper.setProps({
      multiple: true,
      value: [],
    })

    expect(wrapper.vm.toggleMethod(0)).toBe(false)

    wrapper.setProps({ value: [0] })

    expect(wrapper.vm.toggleMethod(0)).toBe(true)

    wrapper.setProps({ value: 0 })

    expect(wrapper.vm.toggleMethod(0)).toBe(false)
  })

  it('should correctly be active with objects having different references', () => {
    const wrapper = mountFunction()

    wrapper.setProps({ value: { a: 1 } })
    expect(wrapper.vm.toggleMethod({ a: 1 })).toBe(true)
    expect(wrapper.vm.toggleMethod({ a: 2 })).toBe(false)
  })

  it('should have a customizable comparator function', () => {
    const wrapper = mountFunction()

    wrapper.setProps({ valueComparator: (a: any, b: any) => a === b + 1, value: 0 })

    expect(wrapper.vm.toggleMethod(0)).toBe(false)
    expect(wrapper.vm.toggleMethod(-1)).toBe(true)
  })

  it('should select the first item if mandatory and no value', async () => {
    const wrapper = mountFunction({
      propsData: { mandatory: true },
      slots: {
        default: [Mock],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.setProps({ multiple: true })

    // Manually update selected items
    wrapper.vm.updateItemsState()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper.vm.internalValue).toEqual([0])
  })

  it('should update a single item group', () => {
    const wrapper = mountFunction()

    // Toggling on and off
    wrapper.vm.updateSingle('foo')
    expect(wrapper.vm.internalValue).toBe('foo')
    wrapper.vm.updateSingle('foo')
    expect(wrapper.vm.internalValue).toBeUndefined()

    wrapper.setProps({ mandatory: true })

    // Toggling off single mandatory
    wrapper.vm.updateSingle('foo')
    expect(wrapper.vm.internalValue).toBe('foo')
    wrapper.vm.updateSingle('foo')
    expect(wrapper.vm.internalValue).toBe('foo')
  })

  it('should update a multiple item group', () => {
    const wrapper = mountFunction({
      propsData: { multiple: true },
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
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: [3],
      },
      slots: {
        default: [
          Mock,
          Mock,
          Mock,
          Mock,
        ],
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    const [first, second, third, fourth] = wrapper.findAll(Mock).wrappers

    fourth.destroy()

    expect(change).toHaveBeenCalledWith([])

    wrapper.setProps({ mandatory: true, value: [2] })

    third.destroy()

    expect(change).toHaveBeenCalledWith([1])

    wrapper.setProps({ multiple: false, value: 1 })

    second.destroy()

    expect(change).toHaveBeenCalledWith(0)

    first.destroy()

    expect(change).toHaveBeenCalledWith(undefined)
  })

  // https://github.com/vuetifyjs/vuetify/issues/5384
  it('should not unregister children when is destroyed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 0,
      },
      slots: {
        default: [Mock],
      },
    })

    const change = jest.fn()

    wrapper.vm.$on('change', change)

    wrapper.destroy()

    expect(change).not.toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/5000
  it('should update mandatory to first non-disabled item', () => {
    const Mock2 = {
      name: 'mock2',

      render (h) {
        return h(VItem, {
          props: {
            disabled: true,
          },
          scopedSlots: {
            default: defaultSlot,
          },
        })
      },
    }

    const wrapper = mountFunction({
      propsData: {
        mandatory: true,
      },
      slots: {
        default: [
          Mock2,
          Mock,
          Mock,
        ],
      },
    })

    expect(wrapper.vm.internalValue).toBe(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/6278
  it('should infer index dynamically', () => {
    const wrapper = mount(VItemGroup, {
      propsData: { value: 0 },
      slots: {
        default: [
          Mock,
          Mock,
          Mock,
        ],
      },
    })

    const items = wrapper.findAll(Mock)
    const item2 = items.at(1)
    const item3 = items.at(2)

    item2.destroy()

    item3.trigger('click')

    expect(wrapper.vm.internalValue).toBe(1)
  })

  it('should have the correct selected index, item and items', () => {
    const wrapper = mountFunction({
      slots: {
        default: [Mock, Mock, Mock],
      },
    })

    expect(wrapper.vm.items).toHaveLength(3)

    wrapper.setProps({ value: 1 })

    expect(wrapper.vm.selectedIndex).toBe(1)
    expect(wrapper.vm.selectedItem).toEqual(wrapper.vm.items[1])

    wrapper.setProps({ value: 2 })

    expect(wrapper.vm.selectedIndex).toBe(2)
    expect(wrapper.vm.selectedItem).toEqual(wrapper.vm.items[2])
  })

  it('should render with a specified tag when the tag prop is provided with a value', () => {
    const wrapper = mountFunction({
      propsData: {
        tag: 'button',
      },
    })

    expect(wrapper.is('button')).toBe(true)
  })
})
