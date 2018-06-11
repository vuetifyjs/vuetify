import Vue from 'vue'
import { test } from '@/test'
import VSelect from '@/components/VSelect/VSelect'
import {
  VListTile,
  VListTileTitle,
  VListTileContent
} from '@/components/VList'
import VAutocomplete from '@/components/VAutocomplete'

test('VSelect', ({ mount, compileToFunctions }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  it('should return numeric 0', async () => {
    const item = { value: 0, text: '0' }
    const wrapper = mount(VSelect, {
      propsData: {
        value: null,
        items: [item],
        multiple: true
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    wrapper.vm.selectItem(item)

    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith([0])
  })

  it('should disable list items', () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: [{
          text: 'item',
          disabled: true
        }]
      }
    })

    const item = wrapper.first('div.v-list--disabled')

    expect(item.element.getAttribute('disabled')).toBe('disabled')
  })

  it('should render v-select correctly when using v-list-tile in item scope slot', async () => {
    const items = Array.from({ length: 2 }, (x, i) => ({ value: i, text: `Text ${i}` }))

    const vm = new Vue({
      components: {
        VListTile
      }
    })
    const itemSlot = ({ item, tile }) => vm.$createElement('v-list-tile', {
      on: tile.on,
      props: tile.props,
      class: item.value % 2 === 0 ? '' : 'red lighten-1'
    }, [
      item.text
    ])
    const selectionSlot = ({ item }) => vm.$createElement('v-list-tile', item.value)
    const component = Vue.component('test', {
      render (h) {
        return h(VSelect, {
          props: { items, value: 1 },
          scopedSlots: {
            item: itemSlot,
            selection: selectionSlot
          }
        })
      }
    })

    const wrapper = mount(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render v-select correctly when not using v-list-tile in item scope slot', async () => {
    const items = Array.from({ length: 2 }, (x, i) => ({ value: i, text: `Text ${i}` }))

    const vm = new Vue({
      components: {
        VListTileTitle,
        VListTileContent
      }
    })
    const itemSlot = ({ item }) => vm.$createElement('v-list-tile-content', {
      class: item.value % 2 === 0 ? '' : 'red lighten-1'
    }, [
      vm.$createElement('v-list-tile-title', [item.value])
    ])
    const component = Vue.component('test', {
      render (h) {
        return h(VSelect, {
          props: { items },
          scopedSlots: { item: itemSlot }
        })
      }
    })

    const wrapper = mount(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render v-select correctly when not using scope slot', async () => {
    const items = Array.from({ length: 2 }, (x, i) => ({ value: i, text: `Text ${i}` }))

    const component = Vue.component('test', {
      render (h) {
        return h(VSelect, {
          props: { items }
        })
      }
    })

    const wrapper = mount(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not close menu when using multiple prop', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [1, 2, 3, 4],
        multiple: true
      }
    })

    const blur = jest.fn()
    wrapper.vm.$on('blur', blur)

    const menu = wrapper.first('.v-input__slot')

    menu.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.vm.isMenuActive).toBe(true)

    const item = wrapper.find('div a.v-list__tile')[0]
    item.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  it('should render aria-hidden=true on arrow icon', async () => {
    const wrapper = mount(VSelect)

    const icon = wrapper.first('.v-icon')
    expect(icon.hasAttribute('aria-hidden')).toBe(true)
  })

  it('should only show items if they are in items', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        value: 'foo',
        items: ['foo']
      }
    })

    expect(wrapper.vm.internalValue).toEqual('foo')
    expect(wrapper.vm.selectedItems).toEqual(['foo'])
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: 'bar' })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toEqual('bar')
    expect(wrapper.vm.selectedItems).toEqual([])
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ items: ['foo', 'bar'] })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toEqual('bar')
    expect(wrapper.vm.selectedItems).toEqual(['bar'])
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: ['foo', 'bar'], multiple: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toEqual(['foo', 'bar'])
    expect(wrapper.vm.selectedItems).toEqual(['foo', 'bar'])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update the displayed value when items changes', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        value: 1,
        items: []
      }
    })

    wrapper.setProps({ items: [{ text: 'foo', value: 1 }] })
    expect(wrapper.vm.selectedItems).toContainEqual({ text: 'foo', value: 1 })
  })

  it('should render select menu with content class', async () => {
    const items = ['abc']

    const wrapper = mount(VSelect, {
      propsData: {
        contentClass: 'v-menu-class',
        items
      }
    })

    const menu = wrapper.find('.v-menu__content')[0]
    expect(menu.element.classList).toContain('v-menu-class')
  })

  it('should have deletable chips', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        chips: true,
        deletableChips: true,
        items: ['foo', 'bar'],
        value: 'foo'
      }
    })

    await wrapper.vm.$nextTick()
    const chip = wrapper.first('.v-chip')

    expect(!!chip).toBe(true)
  })

  it('should escape items in menu', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: ['<strong>foo</strong>']
      }
    })

    const tileTitle = wrapper.find('.v-list__tile__title')[0]
    expect(tileTitle.html()).toMatchSnapshot()
  })

  it('should use value comparator', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        multiple: true,
        items: [
          {text: 'one', value: 1},
          {text: 'two', value: 2},
          {text: 'three', value: 3}
        ],
        itemText: 'text',
        itemValue: 'value',
        valueComparator: (a, b) => Math.round(a) === Math.round(b),
        value: [3.1]
      }
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper.vm.selectedItems[0].value).toBe(3)
  })

  it('should not open if readonly', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        readonly: true,
        items: ['foo', 'bar']
      }
    })

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)

    wrapper.first('.v-input__append-inner').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('can use itemValue as function', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        multiple: true,
        items: [
          {text: 'one', v1: "prop v1"},
          {text: 'two', v2: "prop v2"},
          {text: 'three', v1: "also prop v1"}
        ],
        itemText: 'text',
        itemValue: item => item.hasOwnProperty('v1') ? item.v1 : item.v2,
        value: ["prop v1", "prop v2"]
      }
    })

    expect(wrapper.vm.selectedItems).toHaveLength(2)
    expect(wrapper.vm.getValue(wrapper.vm.selectedItems[0])).toBe("prop v1")
    expect(wrapper.vm.getValue(wrapper.vm.selectedItems[1])).toBe("prop v2")
  })

  it('should work correctly with return-object', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        multiple: false,
        returnObject: true,
        items: [
          {text: 'one', value: {x: [1, 2], y: ["a", "b"]}},
          {text: 'two', value: {x: [3, 4], y: ["a", "b"]}},
          {text: 'three', value: {x: [1, 2], y: ["a", "c"]}}
        ],
        itemText: 'text',
        itemValue: 'value',
        value: {text: 'two', value: {x: [3, 4], y: ["a", "b"]}}
      }
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper.vm.internalValue).toEqual({text: 'two', value: {x: [3, 4], y: ["a", "b"]}})
  })

  it('should work correctly with return-object [multiple]', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        multiple: true,
        returnObject: true,
        items: [
          {text: 'one', value: {x: [1, 2], y: ["a", "b"]}},
          {text: 'two', value: {x: [3, 4], y: ["a", "b"]}},
          {text: 'three', value: {x: [1, 2], y: ["a", "c"]}}
        ],
        itemText: 'text',
        itemValue: 'value',
        value: [
          {text: 'two', value: {x: [3, 4], y: ["a", "b"]}},
          {text: 'one', value: {x: [1, 2], y: ["a", "b"]}}
        ]
      }
    })

    expect(wrapper.vm.selectedItems).toHaveLength(2)
    expect(wrapper.vm.internalValue[0]).toEqual({text: 'two', value: {x: [3, 4], y: ["a", "b"]}})
    expect(wrapper.vm.internalValue[1]).toEqual({text: 'one', value: {x: [1, 2], y: ["a", "b"]}})
  })

  it('should provide the correct default value', () => {
    const wrapper = mount(VSelect)

    expect(wrapper.vm.internalValue).toBe(undefined)

    const wrapper2 = mount(VSelect, {
      propsData: { multiple: true }
    })

    expect(wrapper2.vm.internalValue).toEqual([])
  })

  it('should use slotted no-data', () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: ['foo']
      },
      slots: {
        'no-data': [{
          render: h => h('div', 'foo')
        }]
      }
    })

    const list = wrapper.first('.v-list')

    expect(wrapper.vm.$slots['no-data']).toBeTruthy()
    expect(list.html()).toMatchSnapshot()
  })

  it('should assign self as activator when solo or box', () => {
    const wrapper = mount(VSelect, {
      propsData: { solo: true }
    })

    wrapper.trigger('click')

    expect(wrapper.vm.$refs.menu.activator).toEqual(wrapper.vm.$el)
  })

  it('should use scoped slot for selection generation', () => {
    const wrapper = mount({
      render (h) {
        return h(VSelect, {
          attrs: {
            items: ['foo', 'bar'],
            value: 'foo'
          },
          scopedSlots: {
            selection: ({ item }) => {
              return h('div', item + ' - from slot')
            }
          }
        })
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle menu on icon click', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: ['foo', 'bar'],
        offsetY: true
      }
    })

    const icon = wrapper.first('.v-icon')
    const slot = wrapper.first('.v-input__slot')

    expect(wrapper.vm.isMenuActive).toBe(false)

    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)

    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)

    // Mock mouseup event with a target of
    // the inner icon element
    const event = new Event('mouseup')
    Object.defineProperty(event, 'target', { writable: false, value: icon.element })

    wrapper.element.dispatchEvent(event)

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })
})
