import VVirtualTable from '../VVirtualTable'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import Vue from 'vue'

describe('VVirtualTable.ts', () => {
  type Instance = InstanceType<typeof VVirtualTable>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VVirtualTable, options)
    }
  })

  it('should render', () => {
    const vm = new Vue()

    const wrapper = mountFunction({
      propsData: {
        items: ['a', 'b', 'c'],
      },
      scopedSlots: {
        items: props => vm.$createElement('div', { staticClass: 'test' }, [JSON.stringify(props)]),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should re-render when items change', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['a', 'b', 'c'],
      },
      scopedSlots: {
        items (props) {
          return this.$createElement('div', props.items.map(i => this.$createElement('div', [i])))
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      items: ['d', 'e', 'f'],
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
