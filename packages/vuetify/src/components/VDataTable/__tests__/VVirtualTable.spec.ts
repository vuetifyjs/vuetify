import VVirtualTable from '../VVirtualTable'
import {
  mount,
  Wrapper,
  MountOptions
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
        itemsLength: 10
      },
      scopedSlots: {
        items: props => vm.$createElement('div', { staticClass: 'test' }, [ JSON.stringify(props) ])
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update on scroll', () => {
    const scrollTop = jest.fn()
    const wrapper = mountFunction({
      scopedSlots: {
        items: '<div></div>'
      }
    })
    wrapper.vm.$watch('scrollTop', scrollTop)

    wrapper.vm.onScroll({ target: { scrollTop: 1337 } } as any)
    expect(scrollTop).toHaveBeenLastCalledWith(1337, 0)
    wrapper.vm.onScroll({ target: { scrollTop: 123 } } as any)
    expect(scrollTop).toHaveBeenLastCalledWith(123, 1337)
  })

  it('should compute height', () => {
    const wrapper = mountFunction({
      propsData: {
        itemsLength: 10
      },
      scopedSlots: {
        items: '<div></div>'
      }
    })

    expect(wrapper.vm.totalHeight).toBe(528)
  })
})
