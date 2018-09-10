import { test } from '@/test'
import VTimeline from '@/components/VTimeline/VTimeline'

test('VTimeline.js', ({ mount }) => {
  it('should match snapshot', () => {
    const wrapper = mount(VTimeline)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
