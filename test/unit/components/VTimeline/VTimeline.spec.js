import { test } from '@/test'
import Vue from 'vue'
import { VTimeline, VTimelineItem } from '@/components/VTimeline'

test('VTimeline.js', ({ mount, compileToFunctions }) => {
  it('should render a div with class timeline', () => {
    const wrapper = mount(VTimeline)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.hasClass('v-timeline')).toBe(true)
  })

  it('should render one ul with timeline__container class and match snapshot', () => {
    const wrapper = mount(VTimeline)
    const listElements = wrapper.find('.v-timeline ul')

    expect(listElements).toHaveLength(1)

    const ul = wrapper.first('ul')

    expect(ul.is('ul')).toBe(true)
    expect(ul.hasClass('v-timeline__container')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a light component', () => {
    const wrapper = mount(VTimeline, {
      propsData: {
        light: true
      }
    })
    const div = wrapper.find('.v-timeline')[0]
    expect(div.hasClass('theme--light')).toBe(true)
  })

  it('should render a dark component', () => {
    const wrapper = mount(VTimeline, {
      propsData: {
        dark: true
      }
    })
    const div = wrapper.find('.v-timeline')[0]
    expect(div.hasClass('theme--dark')).toBe(true)
  })
})
