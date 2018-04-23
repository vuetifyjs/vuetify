import { test } from '@/test'
import VTimelineItem from '@/components/VTimeline/VTimelineItem'

test('VTimelineItem.js', ({ mount }) => {
  it('renders a li with class timeline__item', () => {
    const wrapper = mount(VTimelineItem)

    const li = wrapper.first('li')
    expect(li.is('li')).toBe(true)
    expect(li.hasClass('v-timeline-item')).toBe(true)
  })
})
