import Vue from 'vue'
import { test } from '@/test'
import VTreeviewNode from '@/components/VTreeview/VTreeviewNode'

const vm = new Vue()
const defaultSlot = () => vm.$createElement('div', 'foobar')

const Mock = {
  name: 'test',

  render: h => h(VTreeviewNode, {
    scopedSlots: {
      prepend: defaultSlot,
      append: defaultSlot
    }
  })
}

test('VTreeViewNode.ts', ({ mount }) => {
  let treeview

  beforeEach(() => {
    treeview = {
      register: jest.fn(),
      unregister: jest.fn()
    }
  })

  it('should return indeterminate icon', async () => {
    const wrapper = mount(VTreeviewNode, {
      provide: { treeview }
    })

    expect(wrapper.vm.computedIcon).toBe('$vuetify.icons.checkboxOff')

    wrapper.setData({ isIndeterminate: true })

    expect(wrapper.vm.computedIcon).toBe('$vuetify.icons.checkboxIndeterminate')
  })

  it('should use scoped slots', () => {
    const wrapper = mount(Mock, {
      provide: { treeview }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should generate a transition element', () => {
    const wrapper = mount(VTreeviewNode, {
      propsData: { transition: true },
      provide: { treeview }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
