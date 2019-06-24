import Vue from 'vue'
import VTreeviewNode from '../VTreeviewNode'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      subgroup: 'arrow_drop_down',
    },
  },
}

const singleRootTwoChildren = { id: 0, name: 'Root', children: [{ id: 1, name: 'Child' }, { id: 2, name: 'Child 2' }] }

const vm = new Vue()
const defaultSlot = () => vm.$createElement('div', 'foobar')

const Mock = {
  name: 'test',

  render: h => h(VTreeviewNode, {
    scopedSlots: {
      prepend: defaultSlot,
      append: defaultSlot,
    },
  }),
}

const MockScopedLabel = {
  name: 'test',

  render: h => h(VTreeviewNode, {
    props: {
      item: singleRootTwoChildren,
    },
    scopedSlots: {
      label: props => vm.$createElement('div', [props.item.name.toUpperCase()]),
    },
  }),
}

describe('VTreeViewNode.ts', () => {
  type Instance = InstanceType<typeof VTreeviewNode>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  let treeview

  beforeEach(() => {
    treeview = {
      register: jest.fn(),
      unregister: jest.fn(),
      isExcluded: () => false,
    }

    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTreeviewNode, options)
    }
  })

  it('should return indeterminate icon', async () => {
    const wrapper = mountFunction({
      provide: { treeview },
    })

    expect(wrapper.vm.computedIcon).toBe('$vuetify.icons.checkboxOff')

    wrapper.setData({ isIndeterminate: true })

    expect(wrapper.vm.computedIcon).toBe('$vuetify.icons.checkboxIndeterminate')
  })

  it('should use scoped slots', () => {
    const wrapper = mount(Mock, {
      provide: { treeview },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should generate a transition element', () => {
    const wrapper = mountFunction({
      propsData: { transition: true },
      provide: { treeview },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use label slot', () => {
    const wrapper = mount(MockScopedLabel, {
      provide: { treeview },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled item', () => {
    const wrapper = mount({
      name: 'test',

      render: h => h(VTreeviewNode, {
        scopedSlots: {
          prepend: defaultSlot,
          append: defaultSlot,
        },
        props: {
          item: { ...singleRootTwoChildren, disabled: true },
        },
      }),
    }, {
      provide: { treeview },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
