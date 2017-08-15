import VChip from '~components/VChip'
import { test } from '~util/testing'

test('VChip.js', ({ mount }) => {
  it('should have a chip class', () => {
    const wrapper = mount(VChip)

    expect(wrapper.hasClass('chip')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
