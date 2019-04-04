import VData from '../VData'
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'

describe('VData.ts', () => {
  type Instance = InstanceType<typeof VData>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VData, options)
    }
  })

  it('should render with scopedProps', async () => {
    const wrapper = mountFunction({
      computed: {
        scopedProps: () => 'test'
      },
      scopedSlots: {
        default (data) {
          return this.$createElement('div', [ data ])
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should compute length', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [ 'foo', 'bar' ]
      }
    })

    expect(wrapper.vm.itemsLength).toBe(2)

    wrapper.setProps({
      serverItemsLength: 10
    })

    expect(wrapper.vm.itemsLength).toBe(10)
  })
})
