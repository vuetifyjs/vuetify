import Vue from 'vue'
import { test } from '@/test'
import VTreeview from '@/components/VTreeview/VTreeview'

const singleRootTwoChildren = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }, { id: 2, name: 'Child 2'}]}
]

const threeLevels = [
  { id: 0, name: 'Root', children: [{ id: 1, name: 'Child', children: [{ id: 2, name: 'Grandchild' }] }, { id: 3, name: 'Child' }] }
]

test('VTreeView.ts', ({ mount }) => {
  it('should render items', async () => {
    const wrapper = mount(VTreeview, {
      propsData: {
        items: singleRootTwoChildren
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should select all descendants', async () => {
    const wrapper = mount(VTreeview, {
      propsData: {
        items: threeLevels,
        selectable: true
      }
    })

    const fn = jest.fn()
    wrapper.vm.$on('change', fn)

    wrapper.find('.v-treeview-node__checkbox')[0].trigger('click')
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([0, 1, 2, 3])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should load children when expanding', async () => {
    const loadChildren = (item) => {
      item.children = [{ id: 1, name: 'Child' }]
    }

    const wrapper = mount(VTreeview, {
      propsData: {
        items: [{ id: 0, name: 'Root', children: [] }],
        loadChildren
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-treeview-node__toggle')[0].trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should load children when selecting, but not render', async () => {
    const loadChildren = (item) => {
      item.children = [{ id: 1, name: 'Child' }]
    }

    const wrapper = mount(VTreeview, {
      propsData: {
        items: [{ id: 0, name: 'Root', children: [] }],
        selectable: true,
        loadChildren
      }
    })

    const fn = jest.fn()
    wrapper.vm.$on('change', fn)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-treeview-node__checkbox')[0].trigger('click')
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([0, 1])
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit active node when clicking on it', async () => {
    const wrapper = mount(VTreeview, {
      propsData: {
        items: [{ id: 0, name: 'Root' }, { id: 1, name: 'Root' }]
      }
    })

    const fn = jest.fn()
    wrapper.vm.$on('update:active', fn)

    wrapper.find('.v-treeview-node__root')[0].trigger('click')
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([0])
  })

  it('should allow multiple active nodes with prop multipleActive', async () => {
    const wrapper = mount(VTreeview, {
      propsData: {
        items: [{ id: 0, name: 'Root' }, { id: 1, name: 'Root' }],
        multipleActive: true
      }
    })

    const fn = jest.fn()
    wrapper.vm.$on('update:active', fn)

    wrapper.find('.v-treeview-node__root').forEach(vm => vm.trigger('click'))
    await wrapper.vm.$nextTick()

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith([0, 1])
  })

  it('should update selection when selected prop changes', async () => {
    const wrapper = mount(VTreeview, {
      propsData: {
        items: [{ id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }] }],
        value: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-treeview-node__toggle')[0].trigger('click')
    wrapper.setProps({ value: [1] })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-treeview-node').length).toBe(2)
    expect(wrapper.find('.v-treeview-node--selected').length).toBe(2)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
