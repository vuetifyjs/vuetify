import { test } from '~util/testing'
import VFlex from '~components/VGrid/VFlex'

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
