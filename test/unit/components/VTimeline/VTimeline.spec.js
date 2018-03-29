import { test } from '@/test'
import VTimeline from '@/components/VTimeline/VTimeline'

test('VTimeline.js', ({ mount }) => {
  it('renders a div with class timeline', () => {
    const wrapper = mount(VTimeline)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.hasClass('timeline')).toBe(true)
  })

  it('renders one ul element inside timeline', () => {
    const wrapper = mount(VTimeline)
    const listElements = wrapper.find('.timeline ul')
    expect(listElements).toHaveLength(1)
  })

  it('ul class must be timeline__container', () => {
    const wrapper = mount(VTimeline)
    const ul = wrapper.first('ul')
    expect(ul.is('ul')).toBe(true)
    expect(ul.hasClass('timeline__container')).toBe(true)
  })

  it('line size prop shold be in range of 0 to 12', () => {
    const wrapper = mount(VTimeline)

    expect(wrapper.vm.$props.lineSize).toBeGreaterThanOrEqual(0)
    expect(wrapper.vm.$props.lineSize).toBeLessThanOrEqual(12)
  })

  it('circleFillColor prop default value should be white', () => {
    const wrapper = mount(VTimeline)

    expect(wrapper.vm.$props.circleFillColor).toBe('white')
  })

  it('lineColor and circleOutlineColor prop default value should be grey lighten-2', () => {
    const wrapper = mount(VTimeline)

    expect(wrapper.vm.$props.lineColor).toBe('grey lighten-2')
    expect(wrapper.vm.$props.circleOutlineColor).toBe('grey lighten-2')
  })

})
