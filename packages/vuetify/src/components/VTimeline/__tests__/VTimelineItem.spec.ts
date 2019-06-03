import VTimelineItem from '../VTimelineItem'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VTimelineItem.ts', () => {
  type Instance = InstanceType<typeof VTimelineItem>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTimelineItem, options)
    }
  })

  it('should conditionally render dot', () => {
    const wrapper = mountFunction({
      propsData: {
        hideDot: true,
      },
      provide: {
        timeline: {
          reverse: false,
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ hideDot: false })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should conditionally render an icon or icon slot', () => {
    expect(mountFunction({
      slots: {
        icon: [{
          render: h => h('div', 'foo'),
        }],
      },
      provide: {
        timeline: {
          reverse: false,
        },
      },
    }).html()).toMatchSnapshot()

    expect(mountFunction({
      propsData: { icon: 'foo' },
      provide: {
        timeline: {
          reverse: false,
        },
      },
    }).html()).toMatchSnapshot()
  })

  it('should render opposite slot', () => {
    const wrapper = mountFunction({
      slots: {
        opposite: [{
          render: h => h('div', 'foo'),
        }],
      },
      provide: {
        timeline: {
          reverse: false,
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
