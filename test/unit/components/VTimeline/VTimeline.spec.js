import { test } from '@/test'
import Vue from 'vue'
import VTimeline from '@/components/VTimeline/VTimeline.js'

test('VTimeline.js', ({ mount, compileToFunctions }) => {
  it('should render a ul with class timeline', () => {
    const wrapper = mount(VTimeline)
    expect(wrapper.is('ul')).toBe(true)
    expect(wrapper.hasClass('v-timeline')).toBe(true)
  })

})
