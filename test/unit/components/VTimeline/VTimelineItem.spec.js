import { test } from '@/test'
import VTimelineItem from '@/components/VTimeline/VTimelineItem'

test('VTimelineItem.js', ({ mount }) => {
  function timelineItemProvideData () {
    const provideData = {
      provide: {
        iconParent: 'event',
        iconSizeParent: 24,
        noIconParent: false,
        hoverParent: false,
        raisedParent: false,
        lineColorParent: 'grey lighten-2',
        circleFillColorParent: 'white',
        circleOutlineColorParent: 'grey lighten-2',
        lineSizeParent: 8,
        hideCircleOutlineParent: false
      }
    }
    return provideData.provide
  }
  it('renders a li with class timeline__item', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      provide
    })

    const li = wrapper.first('li')
    expect(li.is('li')).toBe(true)
    expect(li.hasClass('timeline__item')).toBe(true)
  })

  it('should render timeline body with timeline--raised class when raised prop', () => {
    const provide = timelineItemProvideData()

    const wrapper = mount(VTimelineItem, {
      propsData: {
        raised: true
      },
      provide
    })

    const div = wrapper.find('.timeline__item--body')[0]
    expect(div.hasClass('timeline--raised')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render timeline body with timeline--hover class when hover prop', () => {
    const provide = timelineItemProvideData()

    const wrapper = mount(VTimelineItem, {
      propsData: {
        hover: true
      },
      provide
    })
    const div = wrapper.find('.timeline__item--body')[0]
    expect(div.hasClass('timeline--hover')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a custom icon', async () => {
    const provide = timelineItemProvideData()

    const wrapper = mount(VTimelineItem, {
      propsData: {
        icon: 'list'
      },
      provide
    })
    const div = wrapper.find('.timeline__icon')[0]
    expect(div.text()).toBe('list')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a custom icon without interference from parent', () => {
    const provide = timelineItemProvideData()

    const wrapper = mount(VTimelineItem, {
      propsData: {
        iconParent: 'event',
        icon: 'list'
      },
      provide
    })
    const div = wrapper.find('.timeline__icon')[0]
    expect(div.text()).toBe('list')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a custom icon size', () => {
    const provide = timelineItemProvideData()

    const wrapper = mount(VTimelineItem, {
      propsData: {
        iconSize: 48
      },
      provide
    })
    const div = wrapper.find('.timeline__icon .icon')[0]
    expect(div.hasStyle('fint-size', '48px')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a custom size without interference from parent', () => {
    const provide = timelineItemProvideData()

    const wrapper = mount(VTimelineItem, {
      propsData: {
        iconSizeParent: 48,
        iconSize: 58
      },
      provide
    })
    const div = wrapper.find('.timeline__icon .icon')[0]
    expect(div.hasStyle('fint-size', '58px')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a no icon', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        noIcon: true
      },
      provide
    })

    const div = wrapper.find('.timeline__icon .icon')
    expect(div.length).toBe(0)

    wrapper.setProps({ noIcon: false })
    const div2 = wrapper.find('.timeline__icon .icon')
    expect(div2.length).toBe(1)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a no icon without parent interference', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        noIconParent: false,
        noIcon: true
      },
      provide
    })

    const div = wrapper.find('.timeline__icon .icon')
    expect(div.length).toBe(0)

    wrapper.setProps({ noIconParent: true, noIcon: false })
    const div2 = wrapper.find('.timeline__icon .icon')
    expect(div2.length).toBe(1)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a cutom line color', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        lineColor: 'red lighten-1'
      },
      provide
    })

    const div = wrapper.find('.timeline__line')[0]

    expect(div.hasClass('red--text', 'text--lighten-1')).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a cutom line color without parent interference', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        lineColorParent: 'red lighten-2',
        lineColor: 'red lighten-1'
      },
      provide
    })

    const div = wrapper.find('.timeline__line')[0]

    expect(div.hasClass('red--text', 'text--lighten-1')).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have cutom circle outline color', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        circleOutlineColor: 'red'
      },
      provide
    })
    const div = wrapper.find('.timeline__item--head')[0]
    expect(div.hasClass('red--text')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have cutom circle outline color without parent interference', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        circleOutlineColorParent: 'blue',
        circleOutlineColor: 'red'
      },
      provide
    })
    const div = wrapper.find('.timeline__item--head')[0]
    expect(div.hasClass('red--text')).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have cutom circle fill color', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        circleFillColor: 'red'
      },
      provide
    })
    const div = wrapper.find('.timeline__item--head')[0]
    expect(div.hasClass('red')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have cutom circle fill color without parent interference', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        circleFillColorParent: 'blue',
        circleFillColor: 'red'
      },
      provide
    })
    const div = wrapper.find('.timeline__item--head')[0]
    expect(div.hasClass('red')).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should hide circle outline', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        hideCircleOutline: true
      },
      provide
    })
    const div = wrapper.find('.timeline__icon')[0]
    expect(div.hasStyle('box-shadow', 'none')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should hide circle outline without parent interference', () => {
    const provide = timelineItemProvideData()
    const wrapper = mount(VTimelineItem, {
      propsData: {
        hideCircleOutlineParent: false,
        hideCircleOutline: true
      },
      provide
    })
    const div = wrapper.find('.timeline__icon')[0]
    expect(div.hasStyle('box-shadow', 'none')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
