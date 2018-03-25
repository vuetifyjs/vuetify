import Vue from 'vue'
import { test } from '@/test'
import VTimeline from '@/components/VTimeline'

test('VTimeline.vue', ({ mount, compileToFunctions }) => {
  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<h1>this is a timeline component</h1>')
  })
})
