import { test } from '~util/testing'
import Vue from 'vue/dist/vue.common'
import VFlex from 'src/components/VGrid/VFlex'

test('VFlex', ({ mount, functionalContext }) => {
  it('should conditionally apply if boolean is used', () => {
    const wrapper = mount(VFlex, functionalContext({
      attrs: {
        md6: false
      }
    }))

    expect(wrapper.hasClass('md6')).toBe(false)
  })
})
