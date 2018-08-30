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

  it('should register components and elements', () => {
    const wrapper = mount(VItemGroup)
    const Mock = Vue.extend({
      mixins: [Groupable],
      data: () => ({ value: 'foo' })
    })
    const component = new Mock()
    const el = document.createElement('div')
    el.setAttribute('data-value', 'bar')

    wrapper.vm.register(component)

    expect(wrapper.vm.items.length).toBe(1)

    wrapper.vm.unregister(component)

    expect(wrapper.vm.items.length).toBe(0)

    wrapper.vm.register(el)

    expect(wrapper.vm.items.length).toBe(1)

    wrapper.vm.unregister(el)

    expect(wrapper.vm.items.length).toBe(0)
  })

  it('should return the items value', () => {
    const wrapper = mount(VItemGroup)

    expect(wrapper.vm.getValue({}, 0)).toBe(0)
    expect(wrapper.vm.getValue({ value: null }, 1)).toBe(1)
    expect(wrapper.vm.getValue({ value: undefined }, 2)).toBe(2)
    expect(wrapper.vm.getValue({ value: '' }, 3)).toBe(3)
    expect(wrapper.vm.getValue({ value: 'foo' })).toBe('foo')
  })

  it('should update state from child clicks', () => {
    const change = jest.fn()
    const wrapper = mount(VItemGroup, {
      propsData: {
        registerChildren: true
      },
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

    const container = wrapper.first('.v-item-group__container')
    const [ child1, child2 ] = container.element.children

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
})
