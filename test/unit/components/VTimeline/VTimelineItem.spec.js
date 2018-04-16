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
    expect(li.hasClass('v-timeline__item')).toBe(true)
  })
})