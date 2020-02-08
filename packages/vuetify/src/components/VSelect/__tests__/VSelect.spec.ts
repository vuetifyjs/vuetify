// Libraries
import Vue from 'vue'

// Components
import VSelect from '../VSelect'
import {
  VListItem,
  VListItemTitle,
  VListItemContent,
} from '../../VList'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VSelect.ts', () => {
  type Instance = InstanceType<typeof VSelect>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let el

  beforeEach(() => {
    el = document.createElement('div')
    el.setAttribute('data-app', 'true')
    document.body.appendChild(el)
    mountFunction = (options = {}) => {
      return mount(VSelect, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            lang: {
              t: (val: string) => val,
            },
            theme: {
              dark: false,
            },
          },
        },
        ...options,
      })
    }
  })

  it('should return numeric 0', async () => {
    const item = { value: 0, text: '0' }
    const wrapper = mountFunction({
      propsData: {
        value: null,
        items: [item],
        multiple: true,
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    wrapper.vm.selectItem(item)

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith([0])
  })

  it('should disable list items', () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
        items: [{
          text: 'item',
          disabled: true,
        }],
      },
    })

    const item = wrapper.find('.v-list-item--disabled')

    expect(item.element.tabIndex).toBe(-1)
  })

  it('should render v-select correctly when using v-list-item in item scope slot', async () => {
    const items = Array.from({ length: 2 }, (x, i) => ({ value: i, text: `Text ${i}` }))

    const vm = new Vue({
      components: {
        VListItem,
      },
    })
    const itemSlot = ({ item, attrs, on }) => vm.$createElement('v-list-item', {
      on,
      ...attrs,
      class: item.value % 2 === 0 ? '' : 'red lighten-1',
    }, [
      item.text,
    ])
    const selectionSlot = ({ item }) => vm.$createElement('v-list-item', item.value)
    const component = Vue.component('test', {
      render (h) {
        return h(VSelect, {
          props: { items, value: 1 },
          scopedSlots: {
            item: itemSlot,
            selection: selectionSlot,
          },
        })
      },
    })
    const wrapper = mountFunction(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render v-select correctly when not using v-list-item in item scope slot', async () => {
    const items = Array.from({ length: 2 }, (x, i) => ({ value: i, text: `Text ${i}` }))

    const vm = new Vue({
      components: {
        VListItemTitle,
        VListItemContent,
      },
    })
    const itemSlot = ({ item }) => vm.$createElement('v-list-item-content', {
      class: item.value % 2 === 0 ? '' : 'red lighten-1',
    }, [
      vm.$createElement('v-list-item-title', [item.value]),
    ])
    const component = Vue.component('test', {
      render (h) {
        return h(VSelect, {
          props: { items },
          scopedSlots: { item: itemSlot },
        })
      },
    })

    const wrapper = mountFunction(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render v-select correctly when not using scope slot', async () => {
    const items = Array.from({ length: 2 }, (x, i) => ({ value: i, text: `Text ${i}` }))

    const component = Vue.component('test', {
      render (h) {
        return h(VSelect, {
          props: { items },
        })
      },
    })

    const wrapper = mountFunction(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not close menu when using multiple prop', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items: [1, 2, 3, 4],
        multiple: true,
      },
    })

    const blur = jest.fn()
    wrapper.vm.$on('blur', blur)

    const menu = wrapper.find('.v-input__slot')

    menu.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.vm.isMenuActive).toBe(true)

    const item = wrapper.find('.v-list-item')
    item.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  it('should render aria-hidden=true on arrow icon', async () => {
    const wrapper = mountFunction()

    const icon = wrapper.find('.v-icon')
    expect(icon.attributes('aria-hidden')).toBe('true')
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should only show items if they are in items', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 'foo',
        items: ['foo'],
      },
    })

    await wrapper.vm.$nextTick()

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

    wrapper.setProps({ multiple: true })
    await wrapper.vm.$nextTick()

    wrapper.setProps({ value: ['foo', 'bar'] })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toEqual(['foo', 'bar'])
    expect(wrapper.vm.selectedItems).toEqual(['foo', 'bar'])
    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should update the displayed value when items changes', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 1,
        items: [],
      },
    })

    wrapper.setProps({ items: [{ text: 'foo', value: 1 }] })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems).toContainEqual({ text: 'foo', value: 1 })
  })

  it('should render select menu with content class', async () => {
    const items = ['abc']

    const wrapper = mountFunction({
      propsData: {
        menuProps: { contentClass: 'v-menu-class', eager: true },
        items,
      },
    })

    const menu = wrapper.find('.v-menu__content')
    expect(menu.element.classList).toContain('v-menu-class')
  })

  it('should have deletable chips', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        chips: true,
        deletableChips: true,
        items: ['foo', 'bar'],
        value: 'foo',
      },
    })

    await wrapper.vm.$nextTick()
    const chip = wrapper.find('.v-chip')

    expect(!!chip).toBe(true)
  })

  it('should escape items in menu', async () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
        items: ['<strong>foo</strong>'],
      },
    })

    const tileTitle = wrapper.find('.v-list-item__title')
    expect(tileTitle.html()).toMatchSnapshot()
  })

  it('should use value comparator', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        multiple: true,
        items: [
          { text: 'one', value: 1 },
          { text: 'two', value: 2 },
          { text: 'three', value: 3 },
        ],
        itemText: 'text',
        itemValue: 'value',
        valueComparator: (a, b) => Math.round(a) === Math.round(b),
        value: [3.1],
      },
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper.vm.selectedItems[0].value).toBe(3)
  })

  it('should not open if readonly', async () => {
    const wrapper = mountFunction({
      propsData: {
        readonly: true,
        items: ['foo', 'bar'],
      },
    })

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)

    wrapper.find('.v-input__append-inner').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('can use itemValue as function', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        multiple: true,
        items: [
          { text: 'one', v1: 'prop v1' },
          { text: 'two', v2: 'prop v2' },
          { text: 'three', v1: 'also prop v1' },
        ],
        itemText: 'text',
        itemValue: item => item.hasOwnProperty('v1') ? item.v1 : item.v2,
        value: ['prop v1', 'prop v2'],
      },
    })

    expect(wrapper.vm.selectedItems).toHaveLength(2)
    expect(wrapper.vm.getValue(wrapper.vm.selectedItems[0])).toBe('prop v1')
    expect(wrapper.vm.getValue(wrapper.vm.selectedItems[1])).toBe('prop v2')
  })

  it('should work correctly with return-object', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        multiple: false,
        returnObject: true,
        items: [
          { text: 'one', value: { x: [1, 2], y: ['a', 'b'] } },
          { text: 'two', value: { x: [3, 4], y: ['a', 'b'] } },
          { text: 'three', value: { x: [1, 2], y: ['a', 'c'] } },
        ],
        itemText: 'text',
        itemValue: 'value',
        value: { text: 'two', value: { x: [3, 4], y: ['a', 'b'] } },
      },
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper.vm.internalValue).toEqual({ text: 'two', value: { x: [3, 4], y: ['a', 'b'] } })
  })

  it('should work correctly with return-object [multiple]', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        multiple: true,
        returnObject: true,
        items: [
          { text: 'one', value: { x: [1, 2], y: ['a', 'b'] } },
          { text: 'two', value: { x: [3, 4], y: ['a', 'b'] } },
          { text: 'three', value: { x: [1, 2], y: ['a', 'c'] } },
        ],
        itemText: 'text',
        itemValue: 'value',
        value: [
          { text: 'two', value: { x: [3, 4], y: ['a', 'b'] } },
          { text: 'one', value: { x: [1, 2], y: ['a', 'b'] } },
        ],
      },
    })

    expect(wrapper.vm.selectedItems).toHaveLength(2)
    expect(wrapper.vm.internalValue[0]).toEqual({ text: 'two', value: { x: [3, 4], y: ['a', 'b'] } })
    expect(wrapper.vm.internalValue[1]).toEqual({ text: 'one', value: { x: [1, 2], y: ['a', 'b'] } })
  })

  it('should provide the correct default value', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.internalValue).toBeUndefined()

    const wrapper2 = mountFunction({
      propsData: { multiple: true },
    })

    expect(wrapper2.vm.internalValue).toEqual([])
  })

  it('should use slotted no-data', () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
        items: ['foo'],
      },
      slots: {
        'no-data': [{
          render: h => h('div', 'foo'),
        }],
      },
    })

    const list = wrapper.find('.v-list')

    expect(wrapper.vm.$slots['no-data']).toBeTruthy()
    expect(list.html()).toMatchSnapshot()
  })

  it('should change autocomplete attribute', () => {
    const wrapper = mountFunction({
      attrs: {
        autocomplete: 'on',
      },
    })

    expect(wrapper.vm.$attrs.autocomplete).toBe('on')
  })
})
