import Vue from 'vue'
import { test } from '@util/testing'
import VSelect from '@components/VSelect'
import {
  VListTile,
  VListTileTitle,
  VListTileContent
} from '@components/VList'

test('VSelect', ({ mount, compileToFunctions }) => {
  it('should return numeric 0', () => {
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

    expect(change).toBeCalledWith([0])
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should be in an error state', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        value: null,
        items: [0, 1, 2],
        rules: [(v) => !!v || 'Required']
      }
    })

    wrapper.trigger('focus')
    await wrapper.vm.$nextTick()
    wrapper.vm.blur()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasError).toBe(true)
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should disable list items', () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [{
          text: 'item',
          disabled: true
        }]
      }
    })

    const item = wrapper.find('li')[0]

    expect(item.element.getAttribute('disabled')).toBe('disabled')
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should warn when using incorrect item together with segmented prop', async () => {
    const items = [
      { text: 'Hello', callback: () => {} },
      { text: 'Hello' }
    ]

    const wrapper = mount(VSelect, {
      propsData: {
        segmented: true,
        items
      }
    })

    wrapper.vm.inputValue = items[1]

    await wrapper.vm.$nextTick()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
    expect('items must contain both a text and callback property').toHaveBeenTipped()
  })

  it('should render buttons correctly when using items array with segmented prop', async () => {
    const items = [
      { text: 'Hello', callback: () => {} }
    ]

    const wrapper = mount(VSelect, {
      propsData: {
        segmented: true,
        items
      }
    })

    wrapper.vm.inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render buttons correctly when using slot with segmented prop', async () => {
    const items = [
      { text: 'Hello' }
    ]

    const vm = new Vue()
    const selection = props => vm.$createElement('div', [props.item])
    const component = Vue.component('test', {
      components: {
        VSelect
      },
      render (h) {
        return h('v-select', {
          props: {
            segmented: true,
            items
          },
          scopedSlots: {
            selection
          }
        })
      }
    })

    const wrapper = mount(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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
    const component = Vue.component('test', {
      components: {
        VSelect
      },
      render (h) {
        return h('v-select', {
          props: {
            items
          },
          scopedSlots: {
            item: itemSlot
          }
        })
      }
    })

    const wrapper = mount(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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
      vm.$createElement('v-list-tile-title', item.value)
    ])
    const component = Vue.component('test', {
      components: {
        VSelect
      },
      render (h) {
        return h('v-select', {
          props: {
            items
          },
          scopedSlots: {
            item: itemSlot
          }
        })
      }
    })

    const wrapper = mount(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render v-select correctly when not using scope slot', async () => {
    const items = Array.from({ length: 2 }, (x, i) => ({ value: i, text: `Text ${i}` }))

    const component = Vue.component('test', {
      components: {
        VSelect
      },
      render (h) {
        return h('v-select', {
          props: {
            items
          }
        })
      }
    })

    const wrapper = mount(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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

    wrapper.trigger('click')
    wrapper.trigger('blur')

    await wrapper.vm.$nextTick()

    const item = wrapper.find('li')[0]
    item.trigger('click')

    await wrapper.vm.$nextTick()

    expect(blur).not.toBeCalled()
    expect(wrapper.vm.isActive).toBe(true)
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render aria-hidden=true on arrow icon', async () => {
    const wrapper = mount(VSelect)

    const icon = wrapper.find('.input-group__append-icon')[0]
    expect(icon.hasAttribute('aria-hidden')).toBe(true)
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should display a default value', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        value: 'foo',
        items: ['foo']
      }
    })

    expect(wrapper.vm.selectedItems).toEqual(['foo'])
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should not display a default value that is not in items', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        value: 'foo',
        items: ['bar']
      }
    })

    expect(wrapper.vm.selectedItems).toHaveLength(0)
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render select menu with content class', async () => {
    const items = ['abc']

    const wrapper = mount(VSelect, {
      propsData: {
        contentClass: 'menu-class',
        items
      }
    })

    const menu = wrapper.find('.menu__content')[0]
    expect(menu.element.classList).toContain('menu-class')
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should have deletable chips', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        chips: true,
        deletableChips: true,
        tags: true,
        items: ['foo', 'bar'],
        value: ['foo']
      }
    })

    await wrapper.vm.$nextTick()
    const chip = wrapper.find('.chip')[0]

    expect(!!chip).toBe(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should escape items in menu', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        autocomplete: true,
        items: ['<strong>foo</strong>']
      }
    })

    const tileTitle = wrapper.find('.list__tile__title')[0]
    expect(tileTitle.html()).toMatchSnapshot()

    wrapper.setProps({ searchInput: 'str' })
    await wrapper.vm.$nextTick()
    expect(tileTitle.html()).toMatchSnapshot()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should have the proper nudge', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        hideDetails: true,
        items: ['foo', 'bar']
      }
    })

    expect(wrapper.vm.nudgeTop).toBe(-18)

    wrapper.setProps({ autocomplete: true })

    expect(wrapper.vm.nudgeTop).toBe(0)

    wrapper.setProps({ autocomplete: false, overflow: true })

    expect(wrapper.vm.nudgeTop).toBe(2)

    wrapper.setProps({ auto: true, overflow: false })

    expect(wrapper.vm.nudgeTop).toBe(-18)

    wrapper.setProps({ auto: false, overflow: true, hideDetails: false })

    expect(wrapper.vm.nudgeTop).toBe(26)

    wrapper.setProps({ hideDetails: true })

    expect(wrapper.vm.nudgeTop).toBe(2)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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
    expect(wrapper.vm.menuIsActive).toBe(false)

    wrapper.find('.input-group__append-icon')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.menuIsActive).toBe(false)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
