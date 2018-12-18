import { test } from '@/test'
import VTimelineItem from '@/components/VTimeline/VTimelineItem'

test('VTimelineItem.js', ({ mount }) => {
  it('should conditionally render dot', () => {
    const wrapper = mount(VTimelineItem, {
      propsData: {
        hideDot: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ hideDot: false })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should conditionally render an icon or icon slot', () => {
    expect(mount(VTimelineItem, {
      slots: {
        icon: [{
          render: h => h('div', 'foo')
        }]
      }
    }).html()).toMatchSnapshot()

    expect(mount(VTimelineItem, {
      propsData: { icon: 'foo' }
    }).html()).toMatchSnapshot()
  })

  it('should render opposite slot', () => {
    expect(mount(VTimelineItem, {
      slots: {
        opposite: [{
          render: h => h('div', 'foo')
        }]
      }
    }).html())
  })

  it('should emit hover event', () => {
    const hover = jest.fn()
    const wrapper = mount(VTimelineItem)

    wrapper.vm.$on('hover', hover)
    expect(hover).toHaveBeenCalledTimes(0)

    wrapper.trigger('mouseenter')
    expect(hover).toHaveBeenCalledTimes(1)
  })
})
