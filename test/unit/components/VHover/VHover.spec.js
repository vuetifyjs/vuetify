import Vue from 'vue'
import { test } from '@/test'
import VHover from '@/components/VHover'

test('VHover', ({ mount }) => {
  it('should change class when hovered', async () => {
    const vm = new Vue()
    const item = props => vm.$createElement('div', {
      staticClass: 'foobar',
      class: { 'fizzbuzz': props.hover }
    })

    const component = Vue.component('test', {
      render (h) {
        return h(VHover, {
          scopedSlots: {
            default: item
          }
        })
      }
    })

    const wrapper = mount(component)

    const div = wrapper.first('.foobar')

    div.trigger('mouseenter')

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(div.element.classList.contains('fizzbuzz')).toBe(true)

    div.trigger('mouseleave')

    // Wait for runDelay
    await new Promise(resolve => setTimeout(resolve, 200))

    expect(div.element.classList.contains('fizzbuzz')).toBe(false)
  })

  it('should warn when missing scoped slot', () => {
    mount(VHover)

    expect('v-hover is missing a default scopedSlot').toHaveBeenTipped()
  })
})
