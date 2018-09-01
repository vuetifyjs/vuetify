import Vue from 'vue'
import { test } from '@/test'
import VItemGroup from '@/components/VItemGroup'
import Groupable from '@/mixins/groupable'

test('VItemGroup.ts', ({ mount }) => {
  it('should warn if using multiple prop without an array value', () => {
    const wrapper = mount(VItemGroup, {
      propsData: {
        multiple: true,
        value: ''
      }
    })

    expect('Model must be bound to an array if the multiple property is true').toHaveBeenTipped()
  })

  it('should register elements', () => {
    const wrapper = mount(VItemGroup)
    const el = document.createElement('div')
    el.setAttribute('data-value', 'bar')

    wrapper.vm.register(el)

    expect(wrapper.vm.items.length).toBe(1)

    wrapper.vm.unregister(el)

    expect(wrapper.vm.items.length).toBe(0)
  })

  it('should return the items value', () => {
    const wrapper = mount(VItemGroup)

    const el = document.createElement('div')
    const el2 = document.createElement('div')
    el2.setAttribute('data-value', 'foo')

    expect(wrapper.vm.getValue(null)).toBe(null)
    expect(wrapper.vm.getValue(el)).toBe(null)
    expect(wrapper.vm.getValue(el2)).toBe('foo')
  })

  it('should update state from child clicks', () => {
    const change = jest.fn()
    const wrapper = mount(VItemGroup, {
      slots: {
        default: [
          { render: h => h('div') },
          {
            render: h => h('div', {
              attrs: { 'data-value': 'foo' }
            })
          }
        ]
      }
    })

    wrapper.vm.$on('change', change)

    expect(wrapper.vm.items.length).toBe(2)

    const [ child1, child2 ] = wrapper.vm.$el.children

    child1.click()
    expect(change).toBeCalledWith('0')
    expect(wrapper.vm.internalValue).toBe('0')

    child2.click()
    expect(change).toBeCalledWith('foo')
    expect(wrapper.vm.internalValue).toBe('foo')

    child2.click()
    expect(wrapper.vm.internalValue).toBe(undefined)

    wrapper.setProps({
      value: [],
      multiple: true
    })

    child1.click()
    expect(change).toBeCalledWith(['0'])

    child2.click()
    expect(change).toBeCalledWith(['0', 'foo'])

    child1.click()
    expect(change).toBeCalledWith(['foo'])
  })

  it('should have a conditional method for toggling items', () => {
    const wrapper = mount(VItemGroup)

    expect(wrapper.vm.toggleMethod('0')).toBe(false)

    wrapper.setProps({ value: '0' })

    expect(wrapper.vm.toggleMethod('0')).toBe(true)

    wrapper.setProps({
      multiple: true,
      value: []
    })

    expect(wrapper.vm.toggleMethod('0')).toBe(false)

    wrapper.setProps({ value: ['0'] })

    expect(wrapper.vm.toggleMethod('0')).toBe(true)

    wrapper.setProps({ value: '0' })

    expect(wrapper.vm.toggleMethod('0')).toBe(false)
  })

  it('should add active class to children', async () => {
    const wrapper = mount(VItemGroup, {
      slots: {
        default: [
          { render: h => h('div', { staticClass: 'foobar' }) },
          { render: h => h('div', { staticClass: 'foobar' }) }
        ]
      }
    })

    const [first, second] = wrapper.find('.foobar')

    expect(first.element.classList.contains('v-item--active')).toBe(false)

    first.trigger('click')

    await wrapper.vm.$nextTick()

    expect(first.element.classList.contains('v-item--active')).toBe(true)

    expect(wrapper.vm.selectedItems).toEqual([first.element])

    second.trigger('click')

    await wrapper.vm.$nextTick()

    expect(second.element.classList.contains('v-item--active')).toBe(true)

    expect(wrapper.vm.selectedItems).toEqual([second.element])
  })

  it('should select the first item if mandatory and no value', async () => {
    const wrapper = mount(VItemGroup, {
      propsData: { mandatory: true },
      slots: {
        default: [
          { render: h => h('div', { staticClass: 'foobar' }) }
        ]
      }
    })

    expect(wrapper.vm.selectedItems.length).toBe(1)
    expect(wrapper.vm.internalValue).toBe('0')

    wrapper.setProps({ multiple: true })

    // Manually update selected items
    wrapper.vm.updateItemsState()

    expect(wrapper.vm.selectedItems.length).toBe(1)
    expect(wrapper.vm.internalValue).toEqual(['0'])
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
})
