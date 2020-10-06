import Vue from 'vue'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import VTreeview from '../VTreeview'
import { ExtractVue } from '../../../util/mixins'
import { wait } from '../../../../test'

const singleRootTwoChildren = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }, { id: 2, name: 'Child 2' }] },
]

const threeLevels = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child', children: [{ id: 2, name: 'Grandchild' }] }, { id: 3, name: 'Child' }] },
]

describe('VTreeView.ts', () => { // eslint-disable-line max-statements
  type Instance = ExtractVue<typeof VTreeview>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTreeview, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        ...options,
      })
    }
  })

  it('should render items', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: singleRootTwoChildren,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render items in dense mode', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: singleRootTwoChildren,
        dense: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should select all leaf nodes', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
        selectable: true,
      },
    })

    const fn = jest.fn()
    wrapper.vm.$on('input', fn)

    wrapper.find('.v-treeview-node__checkbox').trigger('click')
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([3, 2])
    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should select only leaf nodes', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
        selectable: true,
      },
    })

    const fn = jest.fn()
    wrapper.vm.$on('input', fn)

    wrapper.find('.v-treeview-node__toggle').trigger('click')
    await wrapper.vm.$nextTick()

    wrapper.findAll('.v-treeview-node__checkbox').at(2).trigger('click')
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([3])
    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should select only root node', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
        selectable: true,
        selectionType: 'independent',
      },
    })

    const fn = jest.fn()
    wrapper.vm.$on('input', fn)

    wrapper.find('.v-treeview-node__checkbox').trigger('click')
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([0])
    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: fails with TS 3.9
  it.skip('should load children when expanding', async () => {
    const loadChildren = item => {
      item.children.push({ id: 1, name: 'Child' })
    }

    const wrapper = mountFunction({
      propsData: {
        items: [{ id: 0, name: 'Root', children: [] }],
        loadChildren,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-treeview-node__toggle').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect('[Vue warn]: Error in created hook: "TypeError: Cannot set property \'vnode\' of undefined"').toHaveBeenWarned()
    expect('TypeError: Cannot set property \'vnode\' of undefined').toHaveBeenWarned()
  })

  it('should load children when selecting, but not render', async () => {
    const loadChildren = item => {
      item.children = [{ id: 1, name: 'Child' }]
    }

    const wrapper = mountFunction({
      propsData: {
        items: [{ id: 0, name: 'Root', children: [] }],
        selectable: true,
        loadChildren,
      },
    })

    const fn = jest.fn()
    wrapper.vm.$on('input', fn)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-treeview-node__checkbox').trigger('click')
    await wait()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([0])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit active node when clicking on it', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [{ id: 0, name: 'Root' }, { id: 1, name: 'Root' }],
        activatable: true,
      },
    })

    const fn = jest.fn()
    wrapper.vm.$on('update:active', fn)

    wrapper.find('.v-treeview-node__root').trigger('click')
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([0])

    wrapper.find('.v-treeview-node__root').trigger('click')
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledWith([])
  })

  it('should allow multiple active nodes with prop multipleActive', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [{ id: 0, name: 'Root' }, { id: 1, name: 'Root' }],
        multipleActive: true,
        activatable: true,
      },
    })

    const fn = jest.fn()
    wrapper.vm.$on('update:active', fn)

    wrapper.findAll('.v-treeview-node__root').wrappers.forEach(vm => vm.trigger('click'))
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith([0, 1])
  })

  // TODO: fails with TS 3.9
  it.skip('should update selection when selected prop changes', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [{ id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }] }],
        value: [],
        selectable: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-treeview-node__toggle').trigger('click')
    wrapper.setProps({ value: [1] })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.v-treeview-node')).toHaveLength(2)
    expect(wrapper.findAll('.v-treeview-node--selected')).toHaveLength(2)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: [] })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open all children when using open-all prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
        openAll: true,
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open/close all children when using updateAll', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
      },
    })

    const updateOpen = jest.fn()
    wrapper.vm.$on('update:open', updateOpen)

    wrapper.vm.updateAll(true)
    expect(updateOpen).toHaveBeenCalledTimes(1)
    expect(updateOpen).toHaveBeenCalledWith([0, 1])

    wrapper.vm.updateAll(false)
    expect(updateOpen).toHaveBeenCalledTimes(2)
    expect(updateOpen).toHaveBeenCalledWith([])
  })

  it('should react to open changes', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
        open: [1],
      },
    })

    const fn = jest.fn()

    wrapper.vm.$on('update:open', fn)
    wrapper.setProps({ open: [0, 1] })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ open: [0] })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ open: [0, 1] })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    expect(fn).toHaveBeenCalledWith([0, 1])

    // Should not update open values that do not exist in the tree
    wrapper.setProps({ open: [7] })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    expect(fn).toHaveBeenCalledWith([])
  })

  it('should update selected and active on created', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
        active: [2],
        value: [1],
      },
    })

    // TODO: I can not find away in avoriaz
    // to catch events being emitted from a
    // lifecycle hook. We should not assert
    // internal state.
    expect([...wrapper.vm.activeCache]).toEqual([2])
    expect([...wrapper.vm.selectedCache]).toEqual([2])
  })

  it('should react to changes for active items', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
        active: [2],
      },
    })

    const active = jest.fn()
    wrapper.vm.$on('update:active', active)

    wrapper.setProps({ active: [] })
    await wrapper.vm.$nextTick()
    expect(active).toHaveBeenCalledWith([])

    // without multiple-active, it will use last value in array
    wrapper.setProps({ active: [1, 3] })
    await wrapper.vm.$nextTick()
    expect(active).toHaveBeenCalledWith([3])

    wrapper.setProps({ multipleActive: true, active: [1, 3] })
    await wrapper.vm.$nextTick()
    expect(active).toHaveBeenCalledWith([1, 3])

    // 7 does not exist, we get nothing back
    wrapper.setProps({ active: [7] })
    await wrapper.vm.$nextTick()
    expect(active).toHaveBeenCalledWith([])

    wrapper.setProps({ active: [0], items: singleRootTwoChildren })
    await wrapper.vm.$nextTick()
    expect(active).toHaveBeenCalledWith([0])
  })

  it('should react to changes for selected items', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: threeLevels,
        value: [2],
      },
    })

    const value = jest.fn()
    wrapper.vm.$on('input', value)

    wrapper.setProps({ value: [] })
    await wrapper.vm.$nextTick()
    expect(value).toHaveBeenCalledWith([])

    wrapper.setProps({ value: [3] })
    await wrapper.vm.$nextTick()
    expect(value).toHaveBeenCalledWith([3])

    // 7 does not exist, we get nothing back
    wrapper.setProps({ value: [7] })
    await wrapper.vm.$nextTick()
    expect(value).toHaveBeenCalledWith([])

    wrapper.setProps({ value: [0] })
    await wrapper.vm.$nextTick()
    expect(value).toHaveBeenLastCalledWith([3, 2])
  })

  it('should accept string value for id', async () => {
    const wrapper = mountFunction({
      propsData: { itemKey: 'name' },
    })

    wrapper.setProps({ items: [{ name: 'Foobar' }] })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.nodes['Foobar']).toBeTruthy()

    wrapper.setProps({ value: ['Foobar'] })

    await wrapper.vm.$nextTick()
  })

  it('should warn developer when using non-scoped slots', () => {
    mountFunction({
      slots: {
        prepend: [{ render: h => h('div') }],
        append: [{ render: h => h('div') }],
      },
    })

    expect('[Vuetify] The prepend and append slots require a slot-scope attribute').toHaveBeenTipped()
  })

  it('should not show expand icon when children is empty', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          {
            text: 'root',
            children: [],
          },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.v-treeview-node__toggle')).toHaveLength(0)
  })

  it('should show expand icon when children is empty and load-children prop used', () => {
    const wrapper = mountFunction({
      propsData: {
        loadChildren: () => {},
        items: [
          {
            text: 'root',
            children: [],
          },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.v-treeview-node__toggle')).toHaveLength(1)
  })

  it('should recalculate tree when loading async children using custom key', async () => {
    const items = [
      {
        id: 1,
        name: 'One',
        __children: [],
      },
    ]

    const wrapper = mountFunction({
      propsData: {
        items,
        itemChildren: '__children',
        loadChildren: () => {
          const newItems = [...items]
          items[0].__children.push({ id: 2, name: 'Two' })
          wrapper.setProps({
            items: newItems,
          })
        },
      },
    })

    wrapper.find('.v-treeview-node__toggle').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should remove old nodes', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          {
            id: 1,
            name: 'one',
          },
          {
            id: 2,
            name: 'two',
          },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ items: [
      {
        id: 1,
        name: 'one',
      },
    ] })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ items: [
      {
        id: 1,
        name: 'one',
      },
      {
        id: 3,
        name: 'three',
      },
    ] })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    expect(Object.keys(wrapper.vm.nodes)).toHaveLength(2)
  })

  it('should filter items', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          {
            id: 1,
            name: 'one',
          },
          {
            id: 2,
            name: 'two',
          },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      search: 'two',
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should filter items using custom item filter', async () => {
    const wrapper = mountFunction({
      propsData: {
        filter: (item, search, textKey) => item.special === search,
        items: [
          {
            id: 1,
            name: 'one',
            special: 'yes',
          },
          {
            id: 2,
            name: 'two',
            special: 'no',
          },
        ],
        search: 'NO',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      search: 'yes',
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: fails with TS 3.9
  it.skip('should emit objects when return-object prop is used', async () => {
    const items = [{ id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }] }]

    const wrapper = mountFunction({
      propsData: {
        items,
        activatable: true,
        selectable: true,
        returnObject: true,
      },
    })

    const active = jest.fn()
    wrapper.vm.$on('update:active', active)
    const selected = jest.fn()
    wrapper.vm.$on('input', selected)
    const open = jest.fn()
    wrapper.vm.$on('update:open', open)

    wrapper.find('.v-treeview-node__root').trigger('click')
    await wrapper.vm.$nextTick()

    expect(active).toHaveBeenCalledTimes(1)
    expect(active).toHaveBeenCalledWith([items[0]])

    wrapper.find('.v-treeview-node__checkbox').trigger('click')
    await wrapper.vm.$nextTick()

    expect(selected).toHaveBeenCalledTimes(1)
    expect(selected).toHaveBeenCalledWith([items[0].children[0]])

    wrapper.find('.v-treeview-node__toggle').trigger('click')
    await wrapper.vm.$nextTick()

    expect(open).toHaveBeenCalledTimes(1)
    expect(open).toHaveBeenCalledWith([items[0]])
  })

  it('should handle replacing items with new array of equal length', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          {
            id: 1,
            name: 'one',
          },
          {
            id: 2,
            name: 'two',
          },
        ],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      items: [
        {
          id: 1,
          name: 'one',
        },
        {
          id: 3,
          name: 'three',
        },
      ],
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8709
  it('should handle initial active/open/selected values when using return-object prop', async () => {
    const one = { id: '1', name: 'One' }
    const three = { id: '3', name: 'Three' }
    const two = { id: '2', name: 'Two', children: [three] }

    const wrapper = mountFunction({
      propsData: {
        returnObject: true,
        selectable: true,
        activatable: true,
        items: [one, two],
        value: [one],
        open: [two],
        active: [three],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set correct state when updating nodes', async () => {
    const children = [
      { id: 2, name: 'Bar' },
      { id: 3, name: 'Fizz' },
      { id: 4, name: 'Buzz' },
    ]
    const item = {
      id: 1,
      name: 'Foo',
    }
    const wrapper = mountFunction({
      propsData: {
        items: [{ ...item, children }],
        value: [4],
      },
    })

    wrapper.setProps({
      items: [{
        ...item,
        children: [
          ...children,
          { id: 5, name: 'FizzBuzz' },
        ],
      }],
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.nodes['5'].isIndeterminate).toBeUndefined()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8720
  it('should set correct selection when updating items', async () => {
    const items = [{
      id: 1,
      name: 'Foo',
      children: [
        { id: 2, name: 'Bar' },
        { id: 3, name: 'Fizz' },
        { id: 4, name: 'Buzz' },
      ],
    }]

    const input = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        items,
        value: [2, 3, 4],
        selectionType: 'leaf',
        selectable: true,
      },
      listeners: {
        input,
      },
    })

    wrapper.setProps({
      items: [{
        id: 1,
        name: 'Foo',
        children: [
          { id: 2, name: 'Bar' },
          { id: 3, name: 'Fizz' },
          { id: 4, name: 'Buzz' },
        ],
      }],
    })

    await wrapper.vm.$nextTick()

    expect(input).not.toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8244
  // TODO: fails with TS 3.9
  it.skip('should not touch disabled items when selecting', async () => {
    const items = [{
      id: 1,
      name: 'Foo',
      children: [
        { id: 2, name: 'Bar', disabled: true },
        { id: 3, name: 'Fizz' },
        { id: 4, name: 'Buzz' },
      ],
    }]

    const input = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        items,
        value: [],
        selectionType: 'leaf',
        selectable: true,
      },
      listeners: {
        input,
      },
    })

    wrapper.find('.v-treeview-node__checkbox').trigger('click')
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenLastCalledWith([3, 4])

    wrapper.setProps({
      value: [2, 3, 4],
      items: [{
        id: 1,
        name: 'Foo',
        children: [
          { id: 2, name: 'Bar', disabled: true },
          { id: 3, name: 'Fizz' },
          { id: 4, name: 'Buzz' },
        ],
      }],
    })
    await wrapper.vm.$nextTick()

    wrapper.find('.v-treeview-node__checkbox').trigger('click')
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenLastCalledWith([2])
  })

  // https://github.com/vuetifyjs/vuetify/issues/10990
  // https://github.com/vuetifyjs/vuetify/issues/10770
  // TODO: fails with TS 3.9
  it.skip('should not disable children of disabled parent when in independent mode', async () => {
    const items = [{
      id: 1,
      name: 'Foo',
      disabled: true,
      children: [
        { id: 2, name: 'Bar' },
        { id: 3, name: 'Fizz', disabled: true },
        { id: 4, name: 'Buzz' },
      ],
    }]

    const input = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        items,
        value: [],
        open: [1],
        selectionType: 'independent',
        selectable: true,
      },
      listeners: {
        input,
      },
    })

    await wrapper.vm.$nextTick()

    wrapper.findAll('.v-treeview-node__checkbox').at(1).trigger('click')
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenLastCalledWith([2])

    wrapper.findAll('.v-treeview-node__checkbox').at(2).trigger('click')
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledTimes(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/9693
  // TODO: fails with TS 3.9
  it.skip('should emit opened node when using open-on-click and load-children', async () => {
    const open = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        items: [{ id: 0, name: 'Root', children: [] }],
        loadChildren: () => wrapper.setProps({
          items: [{ id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }] }],
        }),
        openOnClick: true,
      },
      listeners: {
        'update:open': open,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-treeview-node__root').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(open).toHaveBeenLastCalledWith([0])
  })
})
