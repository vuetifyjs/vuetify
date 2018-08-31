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

    expect(wrapper.vm.getValue(el, 0)).toBe(0)
    expect(wrapper.vm.getValue(el2, 1)).toBe('foo')
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
